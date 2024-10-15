'use client'
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import clsx from "clsx";
import Cookies from 'js-cookie';
import CodeInput from "./CodeInput";

// Define the shape of the API response state
type State = {
    error?: string;
    errors?: string;
    frontend_token?: string;
};

// Create reusable toast notification handler
const showToast = (message: string, type: "error" | "success") => {
    if (type === "error") {
        toast.error(message, { position: "top-center" });
    } else {
        toast.warn(message, { position: 'top-center', icon: false });
    }
};

export default function SignUpForm({ ref_code }: { ref_code?: string }) {
    const [email, setEmail] = useState<string>("");
    const [confirmationCode, setConfirmationCode] = useState<string>("");
    const [state, setState] = useState<State>({});
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    // Memoize function for creating account
    const createAccount = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const leadData = ref_code
            ? { email, referral_code: ref_code }
            : { email };

        const data = { lead: leadData };
        setLoading(true)
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": window.location.origin,
                },
                body: JSON.stringify(data),
            });
            setLoading(false)
            const jsonResp = await resp.json();
            setState(jsonResp);
            if (jsonResp.error || jsonResp.errors) {
                showToast(jsonResp.error || jsonResp.errors, "error");
            } else if (jsonResp.frontend_token) {
                showToast("Please check your emails and then enter the 6-digit code.", "success");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLoading(false)
            console.log(error)
            showToast("Network error. Please try again later.", "error");
        }
    }, [email, ref_code]);

    // Memoize function for confirming account
    const confirmAccount = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads/confirm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": window.location.origin,
                },
                body: JSON.stringify({
                    lead: {
                        confirmation_token: confirmationCode,
                        frontend_token: state.frontend_token,
                    },
                }),
            });
            setLoading(false)
            const json = await resp.json()
            if (json.login_token) {
                const channel = new BroadcastChannel('auth');
                channel.postMessage('login');
                channel.close();
                Cookies.set('id', json.id, { expires: 365, path: '/', sameSite: 'Strict' })
                Cookies.set('token', json.login_token, { expires: 365, path: '/', sameSite: 'Strict' })
                Cookies.set('referral_code', json.referral_code, { expires: 365, path: '/', sameSite: 'Strict' })
                Cookies.set('email', email, { expires: 365, path: '/', sameSite: 'Strict' })
                router.push("/step-1");
            }
            else {
                showToast("Incorrect Confirmation Token, Please try again.", "error");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLoading(false)
            showToast("Confirmation failed. Please try again.", "error");
        }
    }, [confirmationCode, state.frontend_token, router, email]);

    // Clean up button visibility logic
    const showConfirmationField = Boolean(state.frontend_token) && !state.error && !state.errors;
    const showSignUpButton = !state.frontend_token;

    return (
        <>
            <ToastContainer />
            <form onSubmit={showSignUpButton ? createAccount : confirmAccount} className="flex flex-col w-11/12 md:w-2/3 gap-3 mx-auto items-center">
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={setEmail}
                    hidden={Boolean(state.frontend_token)}
                />
                {showConfirmationField && <CodeInput confirmationCode={confirmationCode} setConfirmationCode={setConfirmationCode} frontend_token={state.frontend_token!} />}
                {showConfirmationField && (
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center"
                    >
                        <ScaleLoader color="#fff" loading={loading} className="h-9 w-1/2 mx-auto" />
                        <span className={clsx({ 'hidden': loading })}>Confirm</span>
                    </button>
                )}
                {showSignUpButton && (
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center"
                    >
                        <ScaleLoader color="#fff" loading={loading} className="h-9 w-1/2 mx-auto" />
                        <span className={clsx({ 'hidden': loading })}>Sign Up</span>
                    </button>
                )}
            </form>
        </>
    );
}


function TextField({ label, value, type, placeholder, hidden, onChange }: { label: string, value: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: string) => void }) {
    return <div className={`relative w-full max-w-sm mx-auto ${hidden && 'hidden'}`}>
        <input type={type ? type : 'text'} value={value}
            className="text-black peer w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-transparent transition-all duration-200"
            placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        <label htmlFor="fancy-input"
            className="absolute left-4 -top-2.5 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white">
            {label}
        </label>
    </div>

}
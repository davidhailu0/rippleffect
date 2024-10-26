'use client'
import { FormEvent, useCallback, useEffect, useState } from "react";
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

export default function SignUpForm({ ref_code, login_token }: { ref_code?: string, login_token?: string }) {
    const [email, setEmail] = useState<string>("");
    const [confirmationCode, setConfirmationCode] = useState<string>("");
    const [state, setState] = useState<State>({});
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        async function verifyLoginToken() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/login_with_token?login_token=${login_token}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': process.env.NEXT_PUBLIC_APP_ORIGIN as string
                }
            })
            const json = await res.json()
            if (json.login_token) {
                Cookies.set('token', json.login_token, { expires: 365, path: '/', sameSite: 'Strict' })
                Cookies.set('referral_code', json.referral_code, { expires: 365, path: '/', sameSite: 'Strict' })
                router.push("/account");
            }
            else {
                router.push('/not-found');
            }
        }
        if (login_token) {
            verifyLoginToken()
        }
    }, [login_token, email, router])

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
                Cookies.set('id', json.id, { expires: 365 * 30, path: '/', sameSite: 'Strict' })
                Cookies.set('token', json.login_token, { expires: 365, path: '/', sameSite: 'Strict' })
                Cookies.set('referral_code', json.referral_code, { expires: 365, path: '/', sameSite: 'Strict' })
                Cookies.set('email', email, { expires: 365 * 30, path: '/', sameSite: 'Strict' })
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
            <form onSubmit={showSignUpButton ? createAccount : confirmAccount} className="flex flex-col md:w-2/3 gap-3 mx-auto items-center bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="JohnDoe@email.com"
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


function TextField({ label, value, placeholder, hidden, onChange }: { label: string, value: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: string) => void }) {
    return <div className={`w-full ${hidden && 'hidden'}`}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type="email" id="email" name="email" autoFocus required placeholder={placeholder}
            className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>

}
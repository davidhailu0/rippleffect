'use client'
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import clsx from "clsx";
import Cookies from 'js-cookie';
import "react-toastify/dist/ReactToastify.css";
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
    const createAccount = useCallback(async (e: FormEvent<HTMLButtonElement>) => {
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
            showToast("Network error. Please try again later.", "error");
        }
    }, [email, ref_code]);

    // Memoize function for confirming account
    const confirmAccount = useCallback(async (e: FormEvent<HTMLButtonElement>) => {
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
                Cookies.set('token', json.login_token, { expires: 1, path: '/', sameSite: 'Strict' })
                Cookies.set('referral_code', json.referral_code, { expires: 1, path: '/', sameSite: 'Strict' })
                Cookies.set('email', email, { expires: 1, path: '/', sameSite: 'Strict' })
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
            <form className="flex flex-col w-11/12 md:w-1/3 gap-4 mx-auto">
                <TextField
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={setEmail}
                    hidden={Boolean(state.frontend_token)}
                />
                {showConfirmationField && <CodeInput confirmationCode={confirmationCode} setConfirmationCode={setConfirmationCode} />}
                {showConfirmationField && (
                    <button
                        type="button"
                        onClick={confirmAccount}
                        className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center"
                    >
                        <ScaleLoader color="#fff" loading={loading} className="h-9 w-1/2 mx-auto" />
                        <span className={clsx({ 'hidden': loading })}>Confirm</span>
                    </button>
                )}
                {showSignUpButton && (
                    <button
                        type="button"
                        onClick={createAccount}
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


function TextField({ name, type, placeholder, hidden, onChange }: { name: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: string) => void }) {
    return <input name={name} type={type ? type : 'text'} onChange={(e) => { onChange(e.target.value); localStorage.setItem(name, e.target.value) }} placeholder={placeholder} className={`h-12 text-white bg-transparent outline-none border-b-[1px] border-b-white focus:outline-1 focus:outline-black focus:border-b-0 placeholder:text-white ${hidden && 'hidden'}`} />
}
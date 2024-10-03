'use client'
import { FormEvent, useCallback, useState } from "react";
import TextField from "./TextField";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success(message, { position: 'top-center' });
    }
};

export default function SignUpForm({ ref_code }: { ref_code?: string }) {
    const [email, setEmail] = useState<string>("");
    const [confirmationCode, setConfirmationCode] = useState<string>("");
    const [state, setState] = useState<State>({});
    const router = useRouter();

    // Memoize function for creating account
    const createAccount = useCallback(async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const leadData = ref_code
            ? { email, referral_code: ref_code }
            : { email };

        const data = { lead: leadData };

        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": process.env.NEXT_PUBLIC_APP_ORIGIN as string,
                },
                body: JSON.stringify(data),
            });

            const jsonResp = await resp.json();
            setState(jsonResp);

            if (jsonResp.error || jsonResp.errors) {
                showToast(jsonResp.error || jsonResp.errors, "error");
            } else if (jsonResp.frontend_token) {
                showToast("Please check your email", "success");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            showToast("Network error. Please try again later.", "error");
        }
    }, [email, ref_code]);

    // Memoize function for confirming account
    const confirmAccount = useCallback(async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads/confirm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": process.env.NEXT_PUBLIC_APP_ORIGIN as string,
                },
                body: JSON.stringify({
                    lead: {
                        confirmation_token: confirmationCode,
                        frontend_token: state.frontend_token,
                    },
                }),
            });
            router.push("/step-2");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            showToast("Confirmation failed. Please try again.", "error");
        }
    }, [confirmationCode, state.frontend_token, router]);

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
                <TextField
                    name="token"
                    type="text"
                    placeholder="Confirmation Token"
                    onChange={setConfirmationCode}
                    hidden={!showConfirmationField}
                />
                {showConfirmationField && (
                    <button
                        type="button"
                        onClick={confirmAccount}
                        className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center"
                    >
                        Confirm
                    </button>
                )}
                {showSignUpButton && (
                    <button
                        type="button"
                        onClick={createAccount}
                        className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center"
                    >
                        Sign Up
                    </button>
                )}
            </form>
        </>
    );
}

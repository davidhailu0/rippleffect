'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import CodeInput from './CodeInput';
import TextField from './TextField';
import { confirmLead, createLead, verifyLoginTokenRequest } from '../services/authService';
import checkFirstTimeLogin from '@/util/CheckLoginStatus';
import directToOtherPages from '@/util/redirectToOtherPage';

// Define the shape of the API response state
type State = {
    error?: string;
    errors?: string;
    frontend_token?: string;
};

// Create reusable toast notification handler
const showToast = (message: string, type: 'error' | 'success') => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    type === 'error' ?
        toast.error(message, { position: 'top-center' })
        : toast.warn(message, { position: 'top-center', icon: false });
};

export default function SignUpForm({ ref_code, login_token }: { ref_code?: string; login_token?: string }) {
    const [email, setEmail] = useState<string>('');
    const [confirmationCode, setConfirmationCode] = useState<string>('');
    const [state, setState] = useState<State>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [signUpBTNText, setSignupBTNText] = useState<string>('Sign Up')
    const router = useRouter();

    // Handle login token verification
    useEffect(() => {
        const verifyLoginToken = async () => {
            const response = await verifyLoginTokenRequest(login_token!);
            if (response.login_token) {
                Cookies.set('token', response.login_token, { expires: 365, path: '/', sameSite: 'Strict' });
                Cookies.set('referral_code', response.referral_code, { expires: 365, path: '/', sameSite: 'Strict' });
                router.push('/account');
            } else {
                router.push('/not-found');
            }
        };

        if (login_token) verifyLoginToken();
        setSignupBTNText(checkFirstTimeLogin())
    }, [login_token, router]);

    // Create account handler
    const createAccount = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (signUpBTNText !== 'Sign Up') {
            directToOtherPages(signUpBTNText, router.replace)
            return
        }
        setLoading(true);

        const leadData = ref_code ? { email, referral_code: ref_code } : { email };
        const data = { lead: leadData };

        try {
            const response = await createLead(data);
            setLoading(false);
            setState(response);

            if (response.error || response.errors) {
                showToast(response.error || response.errors, 'error');
            } else if (response.frontend_token) {
                showToast('Please check your emails and then enter the 6-digit code.', 'success');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setLoading(false);
            showToast('Network error. Please try again later.', 'error');
        }
    }, [email, ref_code, router.replace, signUpBTNText]);

    // Confirm account handler
    const confirmAccount = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            lead: {
                confirmation_token: confirmationCode,
                frontend_token: state.frontend_token,
            },
        };

        try {
            const response = await confirmLead(data);
            setLoading(false);

            if (response.login_token) {
                const channel = new BroadcastChannel('auth');
                channel.postMessage('login');
                channel.close();

                Cookies.set('id', response.id, { expires: 365 * 30, path: '/', sameSite: 'Strict' });
                Cookies.set('token', response.login_token, { expires: 365, path: '/', sameSite: 'Strict' });
                Cookies.set('referral_code', response.referral_code, { expires: 365, path: '/', sameSite: 'Strict' });
                Cookies.set('email', email, { expires: 365 * 30, path: '/', sameSite: 'Strict' });

                router.push('/step-1');
            } else {
                showToast('Incorrect Confirmation Token, Please try again.', 'error');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLoading(false);
            showToast('Confirmation failed. Please try again.', 'error');
        }
    }, [confirmationCode, state.frontend_token, router, email]);

    // Render logic
    const showConfirmationField = Boolean(state.frontend_token) && !state.error && !state.errors;
    const showSignUpButton = !state.frontend_token;

    return (
        <>
            <form
                onSubmit={showSignUpButton ? createAccount : confirmAccount}
                className="flex flex-col md:w-2/3 gap-3 mx-auto items-center bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="JohnDoe@email.com"
                    onChange={setEmail}
                    hidden={Boolean(state.frontend_token) || signUpBTNText !== 'Sign Up'}
                />
                {showConfirmationField && (
                    <CodeInput
                        confirmationCode={confirmationCode}
                        setConfirmationCode={setConfirmationCode}
                        frontend_token={state.frontend_token!}
                    />
                )}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center"
                >
                    <ScaleLoader color="#fff" loading={loading} className="h-9 w-1/2 mx-auto" />
                    <span className={clsx({ hidden: loading })}>
                        {showSignUpButton ? signUpBTNText : 'Confirm'}
                    </span>
                </button>
            </form>
        </>
    );
}

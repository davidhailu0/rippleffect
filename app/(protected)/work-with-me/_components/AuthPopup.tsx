import { FormEvent, useCallback, useState } from "react";
import Cookies from "js-cookie";
import CodeInput from "./CodeInput";
import EmailInput from "./EmailInput";
import { confirmLead, createLead } from "../../../services/authService";
import { useRouter } from "nextjs-toploader/app";

interface AuthPopupProps {
    closePopup: () => void;
    ref_code?: string | null
}

type AuthState = {
    error?: string;
    errors?: string;
    frontend_token?: string;
};
const AuthPopup: React.FC<AuthPopupProps> = ({ closePopup, ref_code }) => {

    const [step, setStep] = useState<number>(1)
    const [email, setEmail] = useState<string>('');
    const [confirmationCode, setConfirmationCode] = useState<string>('');
    const [Authstate, setAuthState] = useState<AuthState>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const router = useRouter()

    const createAccount = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const leadData = ref_code ? { email, referral_code: ref_code } : { email };
        const data = { lead: leadData };

        try {
            const response = await createLead(data);
            setLoading(false);
            setAuthState(response);

            if (response.error || response.errors) {
                setError(response.error || response.errors)
            } else if (response.frontend_token) {
                setStep(2)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setLoading(false);
            setError('Network error. Please try again later.');
        }
    }, [email, ref_code]);
    const confirmAccount = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            lead: {
                confirmation_token: confirmationCode,
                frontend_token: Authstate.frontend_token,
            },
        };

        try {
            const response = await confirmLead(data);
            setLoading(false);
            if (response.login_token) {
                Cookies.set('id', response.id, { expires: 365 * 30, path: '/', sameSite: 'Strict' });
                Cookies.set('token', response.login_token, { expires: 365, path: '/', sameSite: 'Strict' });
                Cookies.set('referral_code', response.referral_code, { expires: 365, path: '/', sameSite: 'Strict' });
                Cookies.set('email', email, { expires: 365 * 30, path: '/', sameSite: 'Strict' });
                router.push('/work-with-me/step-1');
                closePopup()
            } else {
                setError('Incorrect Confirmation Token, Please try again.');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLoading(false);
            setError('Confirmation failed. Please try again.');
        }
    }, [confirmationCode, Authstate.frontend_token, email, closePopup, router]);
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 text-black z-[999]">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative transform transition-transform duration-300 scale-100">

                    {/* Close Button with SVG */}
                    {step == 1 && <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={closePopup}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"  // Larger size for better visibility
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>}

                    {error && <p className="text-red-600">{error}</p>}
                    {/* LeadForm */}
                    {step === 1 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-6 text-center">One more step...</h2>
                            <p className="text-center text-gray-600 mb-4">
                                Please enter your email to continue
                            </p>
                            <EmailInput
                                email={email}
                                setEmail={setEmail}
                                handleSubmit={createAccount}
                                loading={loading}
                                ctaText={"Create"} // Pass buttonCtaText here
                            />

                        </>
                    )}

                    {step === 2 && (
                        <CodeInput
                            confirmationCode={confirmationCode}
                            setConfirmationCode={setConfirmationCode}
                            frontendToken={Authstate.frontend_token!}
                            handleCodeSubmit={confirmAccount}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthPopup;
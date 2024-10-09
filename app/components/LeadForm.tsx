"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from 'react';
import EmailInput from './EmailInput';
import CodeInput from './CodeInput';
import Link from 'next/link';
import Cookies from 'js-cookie'; // Client-only import

interface LeadFormProps {
    buttonCtaText?: string;
    ref_code?: string // Optional prop for CTA text
}

const LeadForm: React.FC<LeadFormProps> = ({ buttonCtaText = 'Get Started', ref_code }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeLoading, setCodeLoading] = useState(false);
    const [step, setStep] = useState(1); // Step 1: Email input, Step 2: Confirmation code input
    const [confirmationCode, setConfirmationCode] = useState('');
    const [frontendToken, setFrontendToken] = useState('');
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false); // Track if the component is on the client-side

    // Ensure the component is only rendered on the client
    useEffect(() => {
        setIsClient(true); // This sets client-side rendering flag to true
        const confirmedEmail = Cookies.get('email');
        if (confirmedEmail) {
            setEmail(confirmedEmail);
            setStep(3); // Move directly to secret content if email is confirmed
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error on new attempt
        const leadData = ref_code
            ? { email, referral_code: ref_code }
            : { email };

        const data = { lead: leadData };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": window.location.origin,
                },
                body: JSON.stringify(data),
            })
            const dataJson = await response.json()

            if (response.status === 200) {
                setStep(2); // Move to confirmation code input
                setFrontendToken(dataJson.frontend_token); // Store frontend token
            } else {
                setError('Failed to create lead. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCodeLoading(true);
        setError(''); // Reset error on new attempt

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads/confirm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": window.location.origin,
                },
                body: JSON.stringify({
                    lead: {
                        confirmation_token: confirmationCode,
                        frontend_token: frontendToken,
                    },
                }),
            });
            const respJson = await response.json()
            if (response.status === 200) {
                // reload whole page
                Cookies.set('token', respJson.login_token, { expires: 1, path: '/', sameSite: 'Strict' })
                Cookies.set('referral_code', respJson.referral_code, { expires: 1, path: '/', sameSite: 'Strict' })
                Cookies.set('email', email, { expires: 7, path: '/', sameSite: 'Strict' })
                setStep(3); // Move to secret content view
                // window.location.reload();
            } else {
                setError('Invalid confirmation code or secret word. Please try again.');
            }
        } catch (error) {
            console.error('Error confirming code:', error);
            setError('An error occurred while confirming. Please try again.');
        } finally {
            setCodeLoading(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove('email');
        setEmail('');
        setStep(1); // Reset to initial step
    };

    // If the component is not yet on the client side, return null to avoid SSR mismatch
    if (!isClient) return null;

    return (
        <div className="mt-8 flex justify-center text-black">
            {error && <p className="text-red-600">{error}</p>}

            {step === 3 ? (
                <div className="bg-gray-800 text-white p-6 rounded-lg m-2">
                    <h2 className="text-2xl mb-4">Thank you for confirming!</h2>
                    <p>In order to apply with your idea, click this button:</p>
                    <Link href="/step-2" className="hover:underline">
                        <span className="text-white bg-indigo-700 px-2 py-1 rounded-full text-sm">To the Application Form</span>
                    </Link>
                    <br />
                    <br />
                    <button
                        className="underline"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    {step === 1 && (
                        <EmailInput
                            email={email}
                            setEmail={setEmail}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            ctaText={buttonCtaText} // Pass buttonCtaText here
                        />
                    )}

                    {step === 2 && (
                        <CodeInput
                            confirmationCode={confirmationCode}
                            setConfirmationCode={setConfirmationCode}
                            frontendToken={frontendToken}
                            handleCodeSubmit={handleCodeSubmit}
                            loading={codeLoading}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default LeadForm;

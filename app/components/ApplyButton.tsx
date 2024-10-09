"use client"; // Ensure this component is a Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LeadForm from '@/app/components/LeadForm'; // Adjust the import based on your file structure

interface ApplyButtonProps {
    text: string;
    styles: string;
    buttonCtaText?: string;
    ref_code?: string; // Optional prop for CTA text
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ text, styles, buttonCtaText = "Get Started", ref_code }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { replace } = useRouter()

    // Check if the user is logged in (has the 'email' cookie)
    useEffect(() => {
        const confirmedEmail = Cookies.get('email');
        if (confirmedEmail) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            replace('/step-1')
        } else {
            setShowPopup(true);
        }
    };

    return (
        <>
            <button
                className={styles}
                onClick={handleButtonClick}
            >
                {isLoggedIn ? 'To the application form' : text}
            </button>

            {/* Display LeadForm in a popup if not logged in */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 text-black">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative transform transition-transform duration-300 scale-100">

                        {/* Close Button with SVG */}
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => setShowPopup(false)}
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
                        </button>

                        {/* LeadForm */}
                        <h2 className="text-2xl font-semibold mb-6 text-center">One more step...</h2>
                        <p className="text-center text-gray-600 mb-4">
                            Please enter your email to continue
                        </p>
                        <LeadForm buttonCtaText={buttonCtaText} ref_code={ref_code} /> {/* Pass the ctaText */}
                    </div>
                </div>
            )}
        </>
    );
};

export default ApplyButton;

'use client'
import { useState } from "react";
import Image from "next/image";

const ReferalComponent = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText('https://rippleeffectfree.com/funnel-2/?aff=Nate');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    };

    return (
        <div className="bg-gradient-to-br from-[#0F2C40] to-[#8A6A60] h-auto w-full rounded-lg text-white flex flex-col justify-between font-sans">
            <Image src={'/brochure.png'} alt="Referal Image" height={300} width={420} unoptimized />
            <div>
                <div className="flex items-center mt-4">
                    <button
                        className="bg-black text-white py-2 px-4 hover:bg-gray-800 transition duration-200 w-1/2"
                    >
                        👁 Click to preview
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 transition duration-200 w-1/2"
                    >
                        📋 Copy Link
                    </button>
                </div>
                {copied && <p className="text-green-400 text-sm mt-2">Link copied!</p>}
                <p className=" text-black font-medium h-12 w-full bg-white self-center pt-2 text-center">
                    https://rippleeffectfree.com/funnel-2/?aff=Nate
                </p>
            </div>
        </div>
    );
};

export default ReferalComponent;
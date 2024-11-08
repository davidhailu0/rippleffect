'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'nextjs-toploader/app';
import Cookies from "js-cookie";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

const ReferalComponent = ({ page }: { page: number }) => {
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('');
    const [referal, setReferal] = useState<string | undefined>('');
    const router = useRouter();

    useEffect(() => {
        setReferal(Cookies.get('referral_code'));
        setOrigin(window.location.origin);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${origin}/landing-pages/page${page}/?ref_code=${referal}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const goToPreview = () => {
        router.push(`/landing-pages/page${page}/?ref_code=${referal}`);
    };

    if (referal === '') {
        return <ClipLoader color="#fff" size={70} className="h-10 w-10" />;
    }

    return (
        <div className="bg-gradient-to-br from-[#0F2C40] to-[#8A6A60] h-auto w-full rounded-lg text-white flex flex-col justify-between font-sans">
            <Image src={`/landing_page_${page}.webp`} alt={`landing_page_${page}`} height={200} width={465} className="overflow-hidden object-contain" />
            <div>
                <div className="h-7 flex items-center justify-center bg-white">
                    {copied && <p className="text-pink-600 text-sm">Link copied!</p>}
                </div>
                <div className="flex items-center">
                    <button
                        onClick={goToPreview}
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
                <p className="text-black font-medium h-14 w-full bg-white self-center pt-2 text-center">
                    {`${origin}/landing-pages/page${page}/?ref_code=${referal}`}
                </p>
            </div>
        </div>
    );
};

export default ReferalComponent;

'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'nextjs-toploader/app';;
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

const ReferalComponent = ({ page }: { page: number }) => {
    const [copied, setCopied] = useState(false);
    const [referal, setReferal] = useState<string | undefined>('')
    const router = useRouter()

    useEffect(() => {
        setReferal(Cookies.get('referral_code'))
    }, [])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_ORIGIN}/work-with-me/landing_pages/${page}/?ref_code=${referal}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const goToPreview = () => {
        router.push(`/work-with-me/landing_pages/${page}/?ref_code=${referal}`)
    }
    if (referal === '') {
        return <ClipLoader color="#fff" size={70} className="h-10 w-10" />;
    }

    return (
        <div className="bg-gradient-to-br from-[#0F2C40] to-[#8A6A60] h-auto w-full rounded-lg text-white flex flex-col justify-between font-sans">
            <iframe src={process.env.NEXT_PUBLIC_APP_ORIGIN + `/work-with-me/landing_pages/${page}/` + `/?ref_code=${referal}`} height={300} width={420} className="overflow-hidden" />
            <div>
                <div className="flex items-center mt-4">
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
                {copied && <p className="text-green-400 text-sm mt-2">Link copied!</p>}
                <p className=" text-black font-medium h-12 w-full bg-white self-center pt-2 text-center">
                    {`${process.env.NEXT_PUBLIC_APP_ORIGIN}/work-with-me/landing_pages/${page}/?ref_code=${referal}`}
                </p>
            </div>
        </div>
    );
};

export default ReferalComponent;
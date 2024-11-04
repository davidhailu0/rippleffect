'use client'
import VideoPlayer from "@/app/components/videoComponent";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GetVideoContext } from "@/app/hooks/VideoContext";
import AuthPopup from "./_components/AuthPopup";


const App: React.FC = ({
    params,
}: {
    params?: {
        ref?: string;
    };
}) => {
    const ref = params?.ref;
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showBtn, setShowBtn] = useState(false)
    const videoContext = GetVideoContext();
    const landing_page = videoContext?.videos.find(({ tag_list }) => tag_list.includes('landing'));

    useEffect(() => {
        if (!Cookies.get('token')) {
            setShowBtn(true)
        }
    }, [])

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="flex flex-col items-center h-auto overflow-hidden bg-gradient-radial from-gray-900 to-black">
            <div className="flex flex-col justify-center flex-1 text-center">
                <span className="mb-4 px-6 py-2 bg-white/20 rounded-lg transition">
                    No Experience Required
                </span>
                <h1 className="text-5xl font-semibold mb-4">
                    Work with Me
                </h1>
                <p className="text-lg mb-8">
                    Get Free Access to My Lead-Generating Sales System!
                </p>
            </div>
            <div className="flex flex-col gap-4 items-center w-[95%] md:w-[73%] mx-auto">
                <VideoPlayer videoID={landing_page?.id} playBackId={landing_page?.mux_playback_id} />
            </div>
            <div className="flex justify-center flex-1 text-center my-10 w-full">
                {showBtn && (
                    <Button
                        onClick={() => setShowPopup(true)}
                        className="px-6 py-3 h-12 bg-pink-400 text-white hover:bg-pink-600 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3"
                    >
                        Create Account
                    </Button>
                )}
                {showPopup && <AuthPopup ref_code={ref} closePopup={closePopup} />}
            </div>

            <footer className="mt-auto mb-4 text-sm">
                &copy; {new Date().getFullYear()} All rights reserved.
            </footer>
        </div>
    );
};

export default App;

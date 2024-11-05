'use client'
import VideoPlayer from "@/app/components/videoComponent";
import { Button } from '@/components/ui/button';
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GetVideoContext } from "@/app/hooks/VideoContext";
import AuthPopup from "../../_components/AuthPopup";
import { useSearchParams } from "next/navigation";


const App: React.FC = () => {
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
        <div className="flex flex-col items-center h-screen bg-white">
            <div className="flex flex-col items-center w-full text-center py-12">
                <span className="bg-pink-200 px-4 py-1 rounded-full mb-4 text-pink-800 font-medium">
                    No Experience Needed
                </span>
                <h1 className="text-6xl font-extrabold text-gray-800 mb-6">Join Our Platform</h1>
                <p className="text-lg text-gray-600 mb-10">
                    Unlock exclusive access to our lead-generating system.
                </p>
                {showBtn && (
                    <Button onClick={() => setShowPopup(true)} className="px-8 py-4 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition">
                        Get Started Now
                    </Button>
                )}
                {showPopup && <Suspense><AuthPopup closePopup={closePopup} /></Suspense>}
            </div>
            <div className="flex justify-center w-11/12 md:w-2/3 mt-12">
                <VideoPlayer videoID={landing_page?.id} playBackId={landing_page?.mux_playback_id} />
            </div>
            <footer className="mt-auto text-center py-4 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Your Brand, All rights reserved.
            </footer>
        </div>



    );
};

export default App;

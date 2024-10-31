'use client'
import VideoPlayer from "@/app/components/videoComponent";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GetVideoContext } from "@/app/hooks/VideoContext";
import AuthPopup from "../../_components/AuthPopup";


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
        <div className="flex flex-col items-center h-auto overflow-hidden bg-gradient-to-b from-blue-100 to-white">
            <div className="flex flex-col justify-center flex-1 text-center space-y-4 p-6">
                <span className="mb-4 px-6 py-2 bg-blue-50 rounded-lg shadow-md">
                    No Experience Required
                </span>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Join Us Today!
                </h1>
                <p className="text-md text-gray-600 mb-8">
                    Access Our Lead-Generating Sales System, Free!
                </p>
            </div>
            <div className="flex items-center w-full md:w-3/4 p-4">
                <VideoPlayer videoID={landing_page?.id} playBackId={landing_page?.mux_playback_id} />
            </div>
            <div className="my-10 w-full text-center">
                {showBtn && (
                    <Button onClick={() => setShowPopup(true)} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-400">
                        Get Started
                    </Button>
                )}
                {showPopup && <AuthPopup ref_code={ref} closePopup={closePopup} />}
            </div>
            <footer className="mt-auto mb-4 text-sm text-gray-600">
                &copy; {new Date().getFullYear()} All rights reserved.
            </footer>
        </div>

    );
};

export default App;

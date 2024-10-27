'use client'
import { lato } from "@/app/fonts/lato";
import VideoPlayer from "@/app/components/videoComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetVideoContext } from "../components/VideoContext";

export default function Content() {
    const [show, setShow] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0); // New state for progress percentage
    const VideoContext = GetVideoContext();
    const step_2_video = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step2'));

    useEffect(() => {
        if (localStorage.getItem("step-2-watched") === "true") {
            setShow(true);
        }
    }, []);

    const handleVideoEnd = () => {
        setShow(true);
        localStorage.setItem("step-2-watched", "true");
    };

    return (
        <>
            <VideoPlayer 
                videoID={step_2_video!.id} 
                playBackId={step_2_video!.mux_playback_id} 
                onProgressUpdate={(progressPercentage, currentTime) => {
                    console.log(`Progress: ${progressPercentage}% at ${currentTime}s`);
                    setProgress(progressPercentage); // Update the progress state
                    if (progressPercentage >= 10) {
                        localStorage.setItem("step-2-watched", "true");
                    }
                }} 
            />
            <div className="flex-col w-full mt-8">
                {/* Display the current progress percentage */}
                <p className={`text-white ${lato.className} text-center mb-4`}>
                    Current progress: <span className="font-medium">{progress}%</span>
                </p>

                <p className={`text-white ${lato.className} text-center`}>
                    Once you have <span className="font-medium text-[#d7b398]">watched the videos</span> above, click the button below to book your call.
                </p>

                <div className={`${show ? 'flex' : 'hidden'} flex mt-8 flex-col md:flex-row`}>
                    <Link href={'/step-1'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border pt-3">
                        &lt; Previous
                    </Link>
                    <Link href={'/book'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border pt-3">
                        Next &gt;
                    </Link>
                </div>
            </div>
        </>
    );
}

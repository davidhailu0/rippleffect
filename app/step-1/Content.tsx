'use client'
import { lato } from "@/app/fonts/lato";
import VideoPlayer from "@/app/components/videoComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetVideoContext } from "../components/VideoContext";

export default function Content() {
    const [show, setShow] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const VideoContext = GetVideoContext();
    const step_1_video = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step1'));

    useEffect(() => {
        if (localStorage.getItem("step-1-watched") === "true") {
            setShow(true);
        }
    }, []);

    const handleProgressUpdate = (progressPercentage: number, currentTime: number) => {
        console.log(`Progress: ${progressPercentage}% at ${currentTime}s`);
        setProgress(progressPercentage);

        // Set as watched once 10% is reached
        if (progressPercentage >= 3) {
            setShow(true);
            localStorage.setItem("step-1-watched", "true");
        }
    };

    return (
        <>
            <VideoPlayer 
                videoID={step_1_video!.id} 
                playBackId={step_1_video!.mux_playback_id} 
                onProgressUpdate={handleProgressUpdate} 
            />
            <div className="text-center mt-4">
                <p className="text-white">{`Current Progress: ${progress}%`}</p>
            </div>
            <div className={`flex-col mt-4 md:mt-7 ${!show ? 'hidden' : 'flex'}`}>
                <p className={`text-white ${lato.className} text-center`}>Once you have <span className="font-medium text-[#d7b398]">watched the videos</span> click the button below to continue to step 2</p>
                <Link href={'/step-2'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">Next &gt;</Link>
            </div>
        </>
    );
}

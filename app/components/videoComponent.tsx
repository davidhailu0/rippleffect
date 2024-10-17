'use client';

import { useState, useEffect, useRef } from "react";
import MuxPlayer from '@mux/mux-player-react';
// import { ToastContainer, toast } from "react-toastify";

type GenericEventListener<T extends Event> = (event: T) => void;
export default function VideoPlayer({ playBackId, className, onVideoEnd }: { playBackId: string, className?: string, onVideoEnd?: () => void }) {
    const [lastTime, setLastTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        //toast.warn("Click on the Video to Play", { icon: false })
        const handleVisibilityChange = () => {
            const videoElement = videoRef.current;
            if (videoElement) {
                if (document.visibilityState === "hidden" && !videoElement.paused) {
                    videoElement.pause();
                }
            }
        };

        const handlePlayPause = () => {
            const videoElement = videoRef.current;
            if (videoElement) {
                if (document.visibilityState === "visible") {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("visibilitychange", handlePlayPause);

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("visibilitychange", handlePlayPause);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);



    const handleTimeUpdate: GenericEventListener<Event> = (e) => {
        const videoElement = e.currentTarget as HTMLMediaElement
        const currentTime = videoElement.currentTime
        if (currentTime - lastTime > 2) {
            videoElement.currentTime = lastTime;
        } else {
            setLastTime(currentTime);
        }
    };

    return <>
        {/* <ToastContainer autoClose={false} position="top-center" theme="colored" /> */}
        {/* <video onClick={handlePlayPauseBtn} ref={videoRef} id="videoPlayer" onTimeUpdate={handleTimeUpdate} onEnded={onVideoEnd} controlsList="nodownload nofastforward" className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] hover:scale-110 transition ease-in-out duration-200 object-contain hover:cursor-pointer ${className}`}>
            <source className="h-full" src={src} type="video/mp4" />
        </video> */}
        <MuxPlayer
            className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] hover:scale-110 transition ease-in-out duration-200 object-contain hover:cursor-pointer overflow-x-hidden ${className}`}
            onTimeUpdate={handleTimeUpdate}
            onEnded={onVideoEnd}
            playbackId={playBackId}
            metadata={{
                video_id: "video-id-54321",
                video_title: "Test video title",
                viewer_user_id: "user-id-007",
            }}
        />
    </>
}
'use client';

import { useState, useEffect, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";

export default function VideoPlayer({ src, className, onVideoEnd }: { src: string, className?: string, onVideoEnd?: () => void }) {
    const [lastTime, setLastTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
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



    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const currentTime = e.currentTarget.currentTime;
        if (currentTime - lastTime > 2) {
            e.currentTarget.currentTime = lastTime;
        } else {
            setLastTime(currentTime);
        }
    };

    const handlePlayPauseBtn = () => {
        const videoElement = videoRef.current;
        if (isPlaying) {
            videoElement?.pause()
            setIsPlaying(false)
        }
        else {
            videoElement?.play()
            setIsPlaying(true)
        }
    }

    return <>
        {/* <ToastContainer autoClose={false} position="top-center" theme="colored" /> */}
        <video onClick={handlePlayPauseBtn} ref={videoRef} id="videoPlayer" onTimeUpdate={handleTimeUpdate} onEnded={onVideoEnd} controlsList="nodownload nofastforward" className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] hover:scale-110 transition ease-in-out duration-200 object-contain hover:cursor-pointer ${className}`}>
            <source className="h-full" src={src} type="video/mp4" />
        </video>
    </>
}
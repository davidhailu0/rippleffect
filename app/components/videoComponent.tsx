'use client';

import { useState, useEffect, useRef } from "react";
import MuxPlayer from '@mux/mux-player-react';
import Cookies from 'js-cookie'

type GenericEventListener<T extends Event> = (event: T) => void;

// mux-player.d.ts
interface MuxPlayerElement extends HTMLVideoElement {
    currentTime: number;
    paused: boolean;
    // Add more methods and properties as needed based on the Mux player API
}


export default function VideoPlayer({ playBackId, videoID, className, onVideoEnd }: { playBackId: string, videoID: number, className?: string, onVideoEnd?: () => void }) {
    const [lastTime, setLastTime] = useState(0);
    const videoRef = useRef<MuxPlayerElement>(null);

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

        document.addEventListener("visibilitychange", handleVisibilityChange);

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);



    const handleTimeUpdate: GenericEventListener<Event> = (e) => {
        const videoElement = e.currentTarget as HTMLMediaElement
        const currentTime = videoElement.currentTime
        if ((videoElement.currentTime / videoElement.duration) >= 0.75 && Boolean(onVideoEnd)) {
            onVideoEnd!()
        }
        if (currentTime - lastTime > 2) {
            videoElement.currentTime = lastTime;
        } else {
            setLastTime(currentTime);
            updateVideoStatus()
        }
    };

    const updateVideoStatus = async () => {
        const token = Cookies.get('token') as string
        const id = Cookies.get('id') as string
        const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/videos`, {
            headers: { 'Content-Type': 'application/json', 'Origin': process.env.NEXT_PUBLIC_APP_ORIGIN as string, 'Authorization': token }, method: "POST", body: JSON.stringify(
                {
                    "video": {
                        "id": videoID,
                        "lead_id": parseInt(id),
                        "duration": videoRef.current?.duration,
                        "current_time": videoRef.current?.currentTime,
                        "progress": (videoRef.current!.currentTime / videoRef.current!.duration) * 100
                    }
                }
            )
        })
        const json = await resp.json()
    }


    return <>
        {/* <ToastContainer autoClose={false} position="top-center" theme="colored" /> */}
        {/* <video onClick={handlePlayPauseBtn} ref={videoRef} id="videoPlayer" onTimeUpdate={handleTimeUpdate} onEnded={onVideoEnd} controlsList="nodownload nofastforward" className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] hover:scale-110 transition ease-in-out duration-200 object-contain hover:cursor-pointer ${className}`}>
            <source className="h-full" src={src} type="video/mp4" />
        </video> */}
        <MuxPlayer
            className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden ${className}`}
            onTimeUpdate={handleTimeUpdate}
            playbackId={playBackId}
            ref={videoRef}
            metadata={{
                video_id: "video-id-54321",
                video_title: "Test video title",
                viewer_user_id: "user-id-007",
            }}
        />
    </>
}
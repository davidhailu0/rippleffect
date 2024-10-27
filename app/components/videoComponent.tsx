"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef, useState } from "react";

// mux-player.d.ts
interface MuxPlayerElement extends HTMLVideoElement {
  currentTime: number;
  duration: number;
}

export default function VideoPlayer({
  playBackId,
  videoID,
  className,
  onProgressUpdate,
}: {
  playBackId: string;
  videoID?: number;
  className?: string;
  onProgressUpdate?: (progressPercentage: number, currentTime: number) => void;
}) {
  const [lastReportedProgress, setLastReportedProgress] = useState<number>(0);
  const videoRef = useRef<MuxPlayerElement>(null);

  const handleTimeUpdate = (e: Event) => {
    const videoElement = e.currentTarget as MuxPlayerElement;
    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;

    // Calculate progress percentage
    const progressPercentage = Math.floor((currentTime / duration) * 100);

    // If progress percentage changes, trigger the callback
    if (progressPercentage !== lastReportedProgress) {
      setLastReportedProgress(progressPercentage);

      // Call the onProgressUpdate callback if provided
      if (onProgressUpdate) {
        onProgressUpdate(progressPercentage, currentTime);
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [lastReportedProgress]);

  return (
    <MuxPlayer
      className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden ${className}`}
      playbackId={playBackId}
      ref={videoRef}
      metadata={{
        video_id: `video-${videoID}`,
        video_title: `Video ${videoID}`,
      }}
    />
  );
}

"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { updateVideoProgress } from "../../../services/videoServices";
import { useDispatch } from "react-redux";
import { Lead } from "@/types/Lead";
import { setLead } from "@/lib/reduxStore/authSlice";

interface MuxPlayerElement extends HTMLVideoElement {
  currentTime: number;
  paused: boolean;
  duration: number;
}

interface VideoPlayerProps {
  playBackId?: string;
  videoID?: number;
  className?: string;
  tag?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  playBackId,
  videoID,
  className = "",
  tag,
}) => {
  const lastTime30SecRef = useRef(0);
  const videoRef = useRef<MuxPlayerElement | null>(null);
  const seekingRef = useRef(false);
  const dispatch = useDispatch();

  const { mutate: mutateUpdateVideoProgress, isPending } = useMutation({
    mutationFn: updateVideoProgress,
    onSuccess: (lead: Lead) => {
      dispatch(setLead(lead));
    },
  });

  const updateVideoStatus = async (watchFrom: number, watchTo: number) => {
    mutateUpdateVideoProgress({
      video_progress: {
        video_id: videoID!,
        watch_from: watchFrom,
        watch_to: watchTo,
        tag: tag!,
      },
    });
  };

  const handleTimeUpdate = (event: Event) => {
    const videoElement = event.currentTarget as HTMLVideoElement;
    const { currentTime } = videoElement;
    if (!seekingRef.current && currentTime - lastTime30SecRef.current >= 5) {
      updateVideoStatus(lastTime30SecRef.current, currentTime);
      lastTime30SecRef.current = currentTime;
    }
  };

  const handlePauseOrVisibilityChange = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.paused) {
      updateVideoStatus(lastTime30SecRef.current, videoElement.currentTime);
    }
  };

  const handleSeeked = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      lastTime30SecRef.current = videoElement.currentTime;
      seekingRef.current = false;
    }
  };

  const handleSeeking = () => {
    seekingRef.current = true;
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleVisibilityChange = () =>
      document.visibilityState === "hidden" && handlePauseOrVisibilityChange();

    if (videoElement) {
      videoElement.addEventListener("pause", handlePauseOrVisibilityChange);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("seeked", handleSeeked);
      videoElement.addEventListener("seeking", handleSeeking);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          "pause",
          handlePauseOrVisibilityChange
        );
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoID, playBackId]);

  if (!playBackId) return <VideoPlayerSkeleton />;

  return (
    <MuxPlayer
      ref={videoRef as any}
      className={`shadow-custom-shadow md:w-10/12 sx:w-full md:min-h-[519px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden relative ${className}`}
      playbackId={playBackId ?? "not-found"}
      placeholder="Loading Video"
      streamType="on-demand"
      playbackRate={1.0}
      preload="auto"
      startTime={0.1}
    />
  );
};
export default VideoPlayer;

function VideoPlayerSkeleton() {
  return (
    <div className="relative shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden bg-black flex items-center justify-center">
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );
}

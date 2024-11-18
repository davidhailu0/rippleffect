"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  getVideoProgress,
  updateVideoProgress,
} from "../../../services/videoServices";
import { useDispatch } from "react-redux";
import { Lead } from "@/types/Lead";
import { setLead } from "@/lib/reduxStore/authSlice";
import VideoProgress from "../video_progress";
import { VideoProgressData } from "@/types/VideosType";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();

  const { data: videoProgress, isSuccess: isVideoProgressSuccess } =
    useQuery<VideoProgressData>({
      queryKey: ["videoProgress", videoID],
      queryFn: () => getVideoProgress({ video_id: videoID! }),
      enabled: Boolean(videoID),
      refetchInterval: isPlaying && 5000,
    });

  const { mutate: mutateUpdateVideoProgress, isPending } = useMutation({
    mutationFn: updateVideoProgress,
    onSuccess: (lead: Lead) => {
      dispatch(setLead(lead));
    },
  });

  const updateVideoStatus = async (watchFrom: number, watchTo: number) => {
    if (videoProgress?.time_interval === null && watchTo > 6) {
      mutateUpdateVideoProgress({
        video_progress: {
          video_id: videoID!,
          watch_from: 0.0,
          watch_to: 0.1,
          tag: tag!,
        },
      });
    } else {
      mutateUpdateVideoProgress({
        video_progress: {
          video_id: videoID!,
          watch_from: watchFrom,
          watch_to: watchTo,
          tag: tag!,
        },
      });
    }
  };

  const handleTimeUpdate = (event: Event) => {
    const videoElement = event.currentTarget as HTMLVideoElement;
    const { currentTime } = videoElement;
    setCurrentTime(currentTime);
    if (!seekingRef.current && currentTime - lastTime30SecRef.current >= 5) {
      updateVideoStatus(lastTime30SecRef.current, currentTime);
      lastTime30SecRef.current = currentTime;
    }
  };

  const handleResume = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time; // Set the player's current time
      videoRef.current.play(); // Start playback
    }
  };

  const handlePauseOrVisibilityChange = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.paused) {
      // updateVideoStatus(lastTime30SecRef.current, videoElement.currentTime);
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
      document.removeEventListener("visibilgitychange", handleVisibilityChange);
    };
  }, [videoID, playBackId, videoProgress]);

  useEffect(() => {
    if (
      isVideoProgressSuccess &&
      videoProgress?.time_interval !== null &&
      videoProgress.progress < 99
    ) {
      if (videoRef.current) {
        videoRef.current.currentTime = videoProgress.time_interval[0][1]; // Set the player's current time to the last time the video was stopped
      }
    }
  }, [isVideoProgressSuccess]);

  if (!playBackId) return <VideoPlayerSkeleton />;

  return (
    <>
      <MuxPlayer
        ref={videoRef as any}
        className={`shadow-custom-shadow md:w-10/12 sx:w-full md:min-h-[519px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden relative ${className}`}
        playbackId={playBackId ?? "not-found"}
        streamType="on-demand"
        playbackRate={1.0}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="auto"
        disableTracking={true}
        startTime={
          videoProgress && videoProgress?.time_interval
            ? videoProgress.time_interval[0][1]
            : 0.1
        }
      />
      <VideoProgress
        isPlaying={isPlaying}
        timeInterval={videoProgress?.time_interval}
        progress={videoProgress?.progress}
        onResume={handleResume} // Pass the callback to VideoProgress
        currentTime={currentTime}
      />
    </>
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

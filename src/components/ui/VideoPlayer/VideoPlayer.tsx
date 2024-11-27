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
  showProgress?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  playBackId,
  videoID,
  className = "",
  showProgress = true,
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
      enabled: Boolean(videoID) && showProgress,
      refetchInterval: isPlaying && 5000,
    });

  const { mutate: mutateUpdateVideoProgress } = useMutation({
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

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("pause", handleTimeUpdate);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("pause", handleTimeUpdate);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoID, playBackId, videoProgress]);

  if (!playBackId) return <VideoPlayerSkeleton />;

  return (
    <>
      <div className={`relative w-10/12 shadow-custom-shadow ${className}`}>
        <MuxPlayer
          ref={videoRef as any}
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
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "16/9", // Ensures the video maintains its intrinsic aspect ratio
          }}
        />
      </div>
      {showProgress && <VideoProgress
        isPlaying={isPlaying}
        timeInterval={videoProgress?.time_interval}
        progress={videoProgress?.progress}
        currentTime={currentTime}
      />}
    </>
  );
};

export default VideoPlayer;

function VideoPlayerSkeleton() {
  return (
    <div className="relative shadow-custom-shadow w-10/12 h-40 md:h-[500px] aspect-w-16 aspect-h-9 bg-black flex items-center justify-center">
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );
}

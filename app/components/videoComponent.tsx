"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';
import { useDebouncedCallback } from 'use-debounce';
import { updateVideoProgress } from '../../services/videoServices';

interface MuxPlayerElement extends HTMLVideoElement {
  currentTime: number;
  paused: boolean;
  duration: number;
}

interface VideoPlayerProps {
  playBackId?: string;
  videoID?: number;
  className?: string;
  handleVideoProgress?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playBackId, videoID, className = '', handleVideoProgress }) => {
  const [lastTime, setLastTime] = useState(0);
  const [lastTime30Sec, setLastTime30Sec] = useState(0);
  const videoRef = useRef<MuxPlayerElement | null>(null);

  // Debounced API update function
  const updateVideoStatus = useCallback(async (watchFrom: number, watchTo: number) => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (!token || !id || !videoID) return;

    try {
      updateVideoProgress({
        video_progress: {
          video_id: videoID,
          watch_from: watchFrom,
          watch_to: watchTo
        },
      })
    } catch (error) {
      console.error('Failed to update video status:', error);
    }
  }, [videoID]);

  const handleTimeUpdate = useCallback(
    (event: Event) => {
      const videoElement = event.currentTarget as HTMLVideoElement;
      const { currentTime, duration } = videoElement;
      const progress = (currentTime / duration) * 100;

      if (handleVideoProgress && progress >= 80) {
        handleVideoProgress();
      }

      if (currentTime - lastTime30Sec >= 30 || progress >= 80) {
        updateVideoStatus(lastTime, currentTime);
        setLastTime30Sec(currentTime);
      }

      setLastTime(currentTime);
    },
    [lastTime, lastTime30Sec, handleVideoProgress, updateVideoStatus]
  );

  const handlePauseOrVisibilityChange = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement && !videoElement.paused) {
      updateVideoStatus(lastTime, videoElement.currentTime);
    }
  }, [lastTime, updateVideoStatus]);

  const handleSeeked = useDebouncedCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      updateVideoStatus(lastTime, videoElement.currentTime);
      setLastTime30Sec(videoElement.currentTime);
    }
  }, 1000);

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleVisibilityChange = () => document.visibilityState === 'hidden' && handlePauseOrVisibilityChange();


    if (videoElement) {
      videoElement.addEventListener('pause', handlePauseOrVisibilityChange);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('seeked', handleSeeked);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('pause', handlePauseOrVisibilityChange);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handlePauseOrVisibilityChange, handleTimeUpdate, handleSeeked]);

  if (!playBackId) return <VideoPlayerSkeleton />;

  return (
    <MuxPlayer
      ref={videoRef}
      className={`shadow-custom-shadow md:w-10/12 sx:w-full md:min-h-[519px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden relative ${className}`}
      playbackId={playBackId ?? 'not-found'}
      placeholder="Loading Video"
      streamType="on-demand"
      playbackRate={1.0}
      preload="auto"
      startTime={0.1}
      onError={(e) => console.error('Playback error:', e)}
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

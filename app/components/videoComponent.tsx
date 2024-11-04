"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';

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

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playBackId, videoID, className, handleVideoProgress }) => {
  const [lastUpdate, setLastUpdate] = useState({ lastTime: 0, lastTime30Sec: 0 });
  const videoRef = useRef<MuxPlayerElement | null>(null);

  // Debounced API update function
  const updateVideoStatus = useCallback(async (watchFrom: number, watchTo: number) => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (!token || !id || !videoID) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/video_progresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Origin': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
          'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
        },
        body: JSON.stringify({
          video_progress: {
            video_id: videoID,
            watch_from: watchFrom,
            watch_to: watchTo
          },
        }),
      });
    } catch (error) {
      console.error('Failed to update video status:', error);
    }
  }, [videoID]);

  const handleError = (e: ErrorEvent) => {
    console.error('Playback error:', e);
  };

  // Track video time updates and save progress at intervals
  const handleTimeUpdate = useCallback(
    (e: Event) => {
      const videoElement = e.currentTarget as HTMLVideoElement;
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      const progress = Math.round((currentTime / duration) * 100);

      // Set watch range for this interval
      const watchFrom = lastUpdate.lastTime;
      const watchTo = currentTime;

      // Trigger handleVideoProgress if progress reaches 80%
      if (progress >= 80 && handleVideoProgress) {
        handleVideoProgress();
      }

      // Only update status every 30 seconds or when reaching 80%
      if (videoID && (currentTime - lastUpdate.lastTime30Sec >= 30 || progress >= 80)) {
        updateVideoStatus(watchFrom, watchTo);
        setLastUpdate((prev) => ({ ...prev, lastTime30Sec: currentTime }));
      }

      // Update last watched time
      setLastUpdate((prev) => ({ ...prev, lastTime: currentTime }));
    },
    [videoID, lastUpdate, handleVideoProgress, updateVideoStatus]
  );

  // Pause or visibility change triggers update to the backend
  const handlePauseOrVisibilityChange = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement && !videoElement.paused) {
      const watchFrom = lastUpdate.lastTime;
      const watchTo = videoElement.currentTime;

      updateVideoStatus(watchFrom, watchTo);
    }
  }, [lastUpdate, updateVideoStatus]);

  // Add event listeners for visibility change and pause
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handlePauseOrVisibilityChange();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (videoElement) {
      videoElement.addEventListener('pause', handlePauseOrVisibilityChange);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (videoElement) {
        videoElement.removeEventListener('pause', handlePauseOrVisibilityChange);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [handlePauseOrVisibilityChange, handleTimeUpdate]);

  if (!playBackId) {
    return <VideoPlayerSkeleton />;
  }

  return (
    <MuxPlayer
      className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden ${className}`}
      playbackId={playBackId || 'not-found'}
      placeholder="Loading Video"
      streamType="on-demand"
      onError={handleError}
      ref={videoRef}
    />
  );
};

export default VideoPlayer;

function VideoPlayerSkeleton() {
  return (
    <div className="relative shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    </div>
  );
}

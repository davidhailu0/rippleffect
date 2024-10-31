"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import MuxPlayer from '@mux/mux-player-react/lazy';
import Cookies from 'js-cookie';

// Improved typing for the MuxPlayer element
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

  // Handle video visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      const videoElement = videoRef.current;
      if (document.visibilityState === 'hidden' && videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Debounced API update function
  const updateVideoStatus = useCallback(async () => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (!token || !id || !videoID) return;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Origin': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
          'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
        },
        body: JSON.stringify({
          video: {
            id: videoID,
            lead_id: parseInt(id, 10),
            duration: videoElement.duration,
            current_time: videoElement.currentTime,
            progress: (videoElement.currentTime / videoElement.duration) * 100,
          }
        }),
      });
    } catch (error) {
      console.error('Failed to update video status:', error);
    }
  },
    [videoID]
  );

  // Handle video time updates
  const handleTimeUpdate = useCallback(
    (e: Event) => {
      const videoElement = e.currentTarget as HTMLVideoElement;
      const currentTime = videoElement.currentTime;
      const progress = Math.round((currentTime / videoElement.duration) * 100);

      // Trigger handleVideoProgress if progress reaches 80%
      if (progress >= 80 && handleVideoProgress) {
        handleVideoProgress();
        updateVideoStatus();
      }

      // Adjust video playback to prevent skipping
      // if (currentTime - lastUpdate.lastTime > 2) {
      //   videoElement.currentTime = lastUpdate.lastTime;
      // } else {
      // Update status every 30 seconds
      if (videoID && currentTime - lastUpdate.lastTime30Sec >= 30) {
        updateVideoStatus();
        setLastUpdate((prev) => ({ ...prev, lastTime30Sec: currentTime }));
      }
      setLastUpdate((prev) => ({ ...prev, lastTime: currentTime }));
      // }
    },
    [videoID, lastUpdate, handleVideoProgress, updateVideoStatus]
  );

  return (
    <MuxPlayer
      className={`shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden ${className}`}
      playbackId={playBackId || 'not-found'}
      placeholder='Loading Video'
      ref={videoRef}
      onTimeUpdate={handleTimeUpdate}
      accentColor="#3b82f6"

    />
  );
};


export default VideoPlayer;

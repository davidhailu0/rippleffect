'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import VideoContext, { Video } from './VideoContext';

// Define types for API responses
interface ApiResponse {
  videos: Video[];
}

const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies] = useCookies(['token', 'email', 'booked', 'bookedTime']);
  const [videos, setVideos] = useState<Video[]>([]);

  // Function to fetch videos based on authorization status
  const fetchVideos = useCallback(async (isAuthorized: boolean) => {
    try {
      const endpoint = isAuthorized ? '/api/v1/videos' : '/api/v1/account';
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
      };

      if (isAuthorized) {
        headers['Authorization'] = cookies['token'];
      }

      const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}${endpoint}`, {
        headers,
      });

      if (!resp.ok) throw new Error('Failed to fetch videos');

      const json: ApiResponse = await resp.json();
      setVideos(json.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }, [cookies]);

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos(!!cookies['token']);
  }, [cookies, fetchVideos]);

  // Function to handle authentication redirects
  const checkAuth = useCallback(() => {
    if (pathname === '/' && cookies['email']) {
      router.replace('/account');
    } else if (!cookies['email']) {
      router.replace('/');
    } else if (cookies['booked'] && pathname === '/book') {
      router.replace('/questionnaire');
    } else if (!cookies['booked'] && !['/step-1', '/step-2', '/book'].includes(pathname)) {
      router.replace('/step-1');
    }
  }, [router, pathname, cookies]);

  // Function to handle booking notifications
  const checkBooking = useCallback(() => {
    const startTime = cookies['bookedTime'];
    if (!startTime) return;

    const daysDifference = getDaysDifference(startTime, new Date());
    const hoursDifference = getHourDifference(new Date(startTime), new Date());

    if (daysDifference === 0) {
      if (hoursDifference >= 1) {
        toast.warn(`Your call is up in ${Math.floor(hoursDifference)} Hour(s) from now`, { icon: false });
      } else if (hoursDifference >= 0 && hoursDifference < 1) {
        toast.warn(`Your call is up in ${Math.floor(hoursDifference * 60)} minute(s) from now`, { icon: false });
      }
    } else if (daysDifference === 1) {
      toast.warn('Your call is tomorrow. Please watch all videos', { icon: false });
    }
  }, [cookies]);

  // Check authentication and set booking interval
  useEffect(() => {
    const channel = new BroadcastChannel('auth');
    channel.onmessage = (message) => {
      if (message.data === 'login') {
        checkAuth();
      }
    };

    checkAuth();
    const intervalID = setInterval(checkBooking, 1000 * 60 * 15);


    checkAuth();
    const intervalID = setInterval(checkBooking, 1000 * 60 * 15);

    return () => {
      channel.close();
      clearInterval(intervalID);
    };
  }, [checkAuth, checkBooking]);

  if (videos.length === 0) {
    return <p className="text-white text-2xl text-center">Loading Videos ...</p>;
  }

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <VideoContext.Provider value={{ videos }}>
        {children}
      </VideoContext.Provider>
    </>
  );
};

export default AuthSync;

// Utility functions for date differences
function getHourDifference(date1: Date | string, date2: Date | string): number {
  const msInHour = 60 * 60 * 1000;
  const diffInMs = new Date(date1).getTime() - new Date(date2).getTime();
  return diffInMs / msInHour;
}


function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const msInDay = 24 * 60 * 60 * 1000;
  const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
  return Math.floor(diffInMs / msInDay);
}


'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import VideoContext, { Video } from '../../hooks/VideoContext';
import { fetchVideos } from '@/app/services/videoServices';
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';
import { usePathname } from 'next/navigation';
import checkEnv from '@/util/CheckEnvironment';

const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()
  const [cookies] = useCookies(['token', 'email', 'booked', 'bookedTime', 'questionFinished']);
  const [videos, setVideos] = useState<Video[]>([]);

  // Fetch videos based on authorization status
  const checkVideos = useCallback(async () => {
    try {
      const resp = await fetchVideos(cookies['token'])
      if (resp.videos) {
        setVideos(resp.videos)
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }, [cookies]);

  // Fetch videos on component mount
  useEffect(() => {
    checkVideos();
    checkEnv()
  }, [checkVideos]);

  // Handle authentication redirects
  const checkAuth = useCallback(() => {
    if (!cookies['token'] && pathname !== '/') {
      router.replace('/');
    }
    else if (pathname === '/step-3' && !cookies['booked']) {
      router.replace('/book');
    }
    else if (pathname === '/step-3' && !cookies['questionFinished']) {
      router.replace('/questionnaire');
    }
  }, [router, cookies, pathname]);

  // Handle booking notifications
  const checkBooking = useCallback(() => {
    const startTime = cookies['bookedTime'];
    if (!startTime) return;

    const bookingStart = parseISO(startTime);
    const daysDifference = differenceInDays(bookingStart, new Date());
    const hoursDifference = differenceInHours(bookingStart, new Date());

    if (daysDifference === 0) {
      if (hoursDifference >= 1) {
        toast.warn(`Your call is up in ${Math.floor(hoursDifference)} Hour(s) from now`, { icon: false });
      } else if (hoursDifference < 1 && hoursDifference >= 0) {
        toast.warn(`Your call is up in ${Math.floor(hoursDifference * 60)} minute(s) from now`, { icon: false });
      }
    } else if (daysDifference === 1) {
      toast.warn('Your call is tomorrow. Please watch all videos', { icon: false });
    }
  }, [cookies]);

  // Set up authentication and booking checks
  useEffect(() => {
    const channel = new BroadcastChannel('auth');
    channel.onmessage = (message) => {
      if (message.data === 'login') {
        checkAuth();
      }
    };

    checkAuth();
    const intervalID = setInterval(checkBooking, 1000 * 60 * 15);
    return () => {
      channel.close();
      clearInterval(intervalID);
    };
  }, [checkAuth, checkBooking]);

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

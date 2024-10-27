'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import VideoContext from './VideoContext';
import { Video } from './VideoContext';

const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies] = useCookies();
  const [videos, setVideos] = useState<Video[]>([]);
  const token = cookies['token'];
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const endpoint = token ? '/api/v1/videos' : '/api/v1/account';
      const headers = {
        'Content-Type': 'application/json',
        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN as string,
      };
      if (token) headers['Authorization'] = token;

      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}${endpoint}`, {
          headers,
        });
        const json = await resp.json();
        setVideos(json['videos'] || []);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      }
    };

    fetchVideos();
  }, [token]); // Only fetch videos when the token changes

  useEffect(() => {
    if (!isInitialLoad) return;
    setIsInitialLoad(false);

    const checkAuth = () => {
      if (pathname === '/' && Boolean(cookies['email'])) {
        router.replace('/account');
      } else if (!Boolean(cookies['email'])) {
        router.replace('/');
      } else if (cookies['questionFinished'] && pathname === '/book') {
        router.replace('/step-3');
      } else if (cookies['booked'] && pathname === '/book') {
        router.replace('/questionnaire');
      } else if (!cookies['booked'] && !['/step-1', '/step-2', '/book'].includes(pathname)) {
        console.log("redirect to step1");
        router.replace('/step-1');
      }
    };

    const checkBooking = () => {
      const startTime = cookies['bookedTime'];
      if (!startTime) return;

      const daysDifference = getDaysDifference(startTime, new Date());
      if (daysDifference === 0) {
        const hours = getHourDifference(new Date(startTime), new Date());
        if (hours >= 1) {
          toast.warn(`Your call is up in ${Math.floor(hours)} Hour(s) from now`, { icon: false });
        } else if (hours >= 0 && hours < 1) {
          toast.warn(`Your call is up in ${Math.floor(hours * 60)} minute(s) from now`, { icon: false });
        }
      } else if (daysDifference === 1) {
        toast.warn(`Your call is tomorrow. Please watch all videos`, { icon: false });
      }
    };

    const channel = new BroadcastChannel('auth');
    channel.onmessage = (message) => {
      if (message.data === 'login') {
        router.push('/step-1');
      }
    };

    checkAuth();
    const intervalID = setInterval(checkBooking, 1000 * 60 * 15);

    return () => {
      channel.close();
      clearInterval(intervalID);
    };
  }, [router, pathname, cookies, isInitialLoad]);

  if (videos.length === 0) {
    return <p className='text-white text-2xl text-center'>Loading Videos ...</p>;
  }

  return (
    <>
      <ToastContainer position='top-center' theme='colored' />
      <VideoContext.Provider value={{ videos }}>
        {children}
      </VideoContext.Provider>
    </>
  );
};

export default AuthSync;

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

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { CookiesProvider, useCookies } from 'react-cookie';
import { fetchVideos } from '@/app/services/videoServices';
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';
import { usePathname } from 'next/navigation';
import checkEnv from '@/util/CheckEnvironment';
// import utilcheckFirstTimeLogin from '@/util/utilCheckLoginStatus';
import VideoContext, { Video } from '@/app/hooks/VideoContext';
import YellowNotificationBar, { NotificationBarProps } from './YellowNotificationbar';
import utilcheckFirstTimeLogin from '@/util/utilCheckLoginStatus';

const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()
  const [cookies] = useCookies(['token', 'email', 'booked', 'bookedTime', 'questionFinished']);
  const [videos, setVideos] = useState<Video[]>([]);
  const [yellowBarConfig, setYellowBarConfig] = useState<NotificationBarProps>({ message: '' })

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
    if (pathname.includes('/work-with-me')) {
      setYellowBarConfig(utilcheckFirstTimeLogin(router.push))
    }
  }, [checkVideos, pathname, router.push]);

  // Handle authentication redirects
  const checkAuth = useCallback(() => {
    const regex = /^\/work-with-me(?:\/(landing_pages\/\d+\/?)?)?(?:\?ref_code=[a-zA-Z0-9]+)?\/?$/;
    if (!cookies['token'] && !regex.test(pathname)) {
      router.replace('/work-with-me');
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
        setYellowBarConfig({ message: `Your call is up in ${Math.floor(hoursDifference)} Hour(s) from now` })
      } else if (hoursDifference < 1 && hoursDifference >= 0) {
        setYellowBarConfig({ message: `Your call is up in ${Math.floor(hoursDifference * 60)} minute(s) from now` })
      }
    } else if (daysDifference === 1) {
      setYellowBarConfig({ message: 'Your call is tomorrow. Please watch all videos in Step 3' })
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
    checkBooking()
    checkAuth();
    return () => {
      channel.close();
    };
  }, [checkAuth, checkBooking]);

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <VideoContext.Provider value={{ videos }}>
        <YellowNotificationBar message={yellowBarConfig.message} actionLabel={yellowBarConfig.actionLabel} onAction={yellowBarConfig.onAction} />
        {children}
      </VideoContext.Provider>
    </CookiesProvider>
  );
};

export default AuthSync;

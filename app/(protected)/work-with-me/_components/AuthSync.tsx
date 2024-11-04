'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { CookiesProvider, useCookies } from 'react-cookie';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
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
    if (!cookies['token'] && pathname !== '/') {
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
        toast(`Your call is up in ${Math.floor(hoursDifference)} Hour(s) from now`, {
          style: {
            backgroundColor: '#facc15', // Yellow color
            color: '#000000', // Black text color for contrast
            border: '1px solid #fbbf24', // Darker yellow border
            fontWeight: 'bold',
            width: '90%', // Set a longer width
            maxWidth: '600px', // Set a max-width to prevent overflow on large screens
            margin: '0 auto', // Center the toast horizontally
          },
          position: 'top-center', // Position at the top center
          duration: Infinity, // Show for 5 seconds
        })
      } else if (hoursDifference < 1 && hoursDifference >= 0) {
        toast(`Your call is up in ${Math.floor(hoursDifference * 60)} minute(s) from now`, {
          style: {
            backgroundColor: '#facc15', // Yellow color
            color: '#000000', // Black text color for contrast
            border: '1px solid #fbbf24', // Darker yellow border
            fontWeight: 'bold',
            width: '90%', // Set a longer width
            maxWidth: '600px', // Set a max-width to prevent overflow on large screens
            margin: '0 auto', // Center the toast horizontally
          },
          position: 'top-center', // Position at the top center
          duration: Infinity, // Show for 5 seconds
        })
      }
    } else if (daysDifference === 1) {
      toast('Your call is tomorrow. Please watch all videos in Step 3', {
        style: {
          backgroundColor: '#facc15', // Yellow color
          color: '#000000', // Black text color for contrast
          border: '1px solid #fbbf24', // Darker yellow border
          fontWeight: 'bold',
          width: '90%', // Set a longer width
          maxWidth: '600px', // Set a max-width to prevent overflow on large screens
          margin: '0 auto', // Center the toast horizontally
        },
        position: 'top-center', // Position at the top center
        duration: Infinity, // Show for 5 seconds
      })
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
      <Toaster />
      <VideoContext.Provider value={{ videos }}>
        <YellowNotificationBar message={yellowBarConfig.message} actionLabel={yellowBarConfig.actionLabel} onAction={yellowBarConfig.onAction} />
        {children}
      </VideoContext.Provider>
    </CookiesProvider>
  );
};

export default AuthSync;

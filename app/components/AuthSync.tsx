'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';



const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()
  const [cookies] = useCookies()


  useEffect(() => {
    const checkAuth = () => {
      if (pathname === '/' && Boolean(cookies['email'])) {
        return router.replace('/account');
      }

      if (!Boolean(cookies['email'])) {
        return router.replace('/');
      }

      if (cookies['questionFinished'] && pathname === '/book') {
        return router.replace('/step-3');
      }

      if (cookies['booked'] && pathname === '/book') {
        return router.replace('/questionnaire');
      }

      if (!cookies['booked'] && pathname !== '/step-1' && pathname !== '/step-2' && pathname !== '/book') {
        return router.replace('/step-1');
      }
    };



    const checkBooking = () => {
      const startTime = cookies['bookedTime']
      if (!Boolean(startTime)) {
        return
      }
      const daysDifference = getDaysDifference(startTime!, new Date())
      if (daysDifference === 0) {
        const hours = getHourDifference(new Date(startTime!), new Date)
        if (hours > 1) {
          toast.warn(`Your call is up in ${hours} Hour(s) from now`, { icon: false })
        }
      }
      else if (daysDifference === 1) {
        toast.warn(`Your call is tomorrow. Please watch all videos`, { icon: false })
      }
    }


    const channel = new BroadcastChannel('auth');
    channel.onmessage = (message) => {
      if (message.data === 'login') {
        router.push('/step-1');
      }
    };
    checkAuth()
    checkBooking()
    const intervalID = setInterval(checkBooking, 1000 * 60 * 30)
    return () => {
      channel.close();
      clearInterval(intervalID);
    }
  }, [router, pathname, cookies]);

  return (<>
    <ToastContainer position='top-center' theme='colored' />
    {children}
  </>)
};

export default AuthSync;



function getHourDifference(date1: Date | string, date2: Date | string): number {
  const msInHour = 60 * 60 * 1000;
  const diffInMs = new Date(date1).getTime() - new Date(date2).getTime();
  return Math.floor(diffInMs / msInHour);
}
function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const msInDay = 24 * 60 * 60 * 1000;
  const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
  return Math.floor(diffInMs / msInDay);
}
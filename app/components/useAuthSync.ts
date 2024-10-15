// hooks/useAuthSync.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthSync() {
    const router = useRouter();

    useEffect(() => {
        const channel = new BroadcastChannel('auth');

        channel.onmessage = (message) => {
            if (message.data === 'login') {
                router.push('/account');
            }
        };

        return () => channel.close();
    }, [router]);
}

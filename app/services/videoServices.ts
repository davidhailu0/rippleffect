import Cookies from "js-cookie";
export const fetchVideos = async(isAuthorized: boolean) => {
    try {
      const endpoint = isAuthorized ? '/api/v1/videos' : '/api/v1/account';
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
      };

      if (isAuthorized) headers['Authorization'] = Cookies.get('token') as string;

      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}${endpoint}`, { headers });

      if (!response.ok) throw new Error('Failed to fetch videos');

      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

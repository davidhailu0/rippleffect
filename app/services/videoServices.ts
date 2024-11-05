import { axiosInstance } from "@/config/axiosConfig";
import Cookies from "js-cookie";

export const fetchVideos = async(isAuthorized: boolean) => {
    try {
      const endpoint = isAuthorized ? '/api/v1/videos' : '/api/v1/account';

      const response = await axiosInstance.get(endpoint,{headers:{Authorization:Cookies.get('token')||''}})
      if (response.status!=200) throw new Error('Failed to fetch videos');

      const data = response.data;
      return data
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

export const updateVideoProgress = async(data:any)=>{
  await axiosInstance.post(`/api/v1/video_progresses`, data,{headers:{Authorization:Cookies.get('token')||''}});
}

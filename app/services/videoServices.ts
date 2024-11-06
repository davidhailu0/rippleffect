import { axiosInstance } from "@/config/axiosConfig";
import { asyncHandler } from "@/util/asyncHandler";
import Cookies from "js-cookie";

type VideoProgressParam = {
  video_progress: {
    video_id: number;
    watch_from: number;
    watch_to: number;
  };
};

export const fetchVideos = asyncHandler(async () => {
  const token = localStorage.getItem("token");
  let response;
  if (token) {
    response = await axiosInstance.get("/api/v1/videos", {
      headers: { Authorization: token },
    });
  } else {
    response = await axiosInstance.get("/api/v1/account");
  }
  return response.data;
});

export const updateVideoProgress = async (data: VideoProgressParam) => {
  await axiosInstance.post(`/api/v1/video_progresses`, data, {
    headers: { Authorization: Cookies.get("token") || "" },
  });
};

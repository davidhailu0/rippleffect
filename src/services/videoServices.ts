import { axiosInstance } from "@/config/axiosConfig";
import { asyncHandler } from "@/util/asyncHandler";

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
    response = await axiosInstance.get("/videos", {
      headers: { Authorization: token },
    });
  } else {
    response = await axiosInstance.get("/account");
  }
  return response.data;
});

export const updateVideoProgress = asyncHandler(
  async (data: VideoProgressParam) => {
    await axiosInstance.post(`/video_progresses`, data);
  }
);

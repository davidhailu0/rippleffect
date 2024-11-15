import { axiosInstance } from "@/config/axiosConfig";
import { Lead } from "@/types/Lead";
import { asyncHandler } from "@/util/asyncHandler";

type VideoProgressParam = {
  video_progress: {
    video_id: number;
    watch_from: number;
    watch_to: number;
    tag: string;
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
    const res = await axiosInstance.post(`/video_progresses`, data);
    return res.data.lead;
  }
);

export const getVideoProgress = asyncHandler(
  async ({ video_id }: { video_id: number }) => {
    const res = await axiosInstance.get<{
      lead: Lead;
      progress: number;
    }>(`/video_progresses?video_id=${video_id}`);
    return res.data;
  }
);

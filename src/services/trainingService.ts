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

export const getTrainingsHandler = asyncHandler(async () => {
  const res = await axiosInstance.get(`/trainings`);
  console.log(res.data);
  return res.data;
});

export const getSingleTrainingHandler = asyncHandler(
  async ({ trainingSlug }: { trainingSlug: string }) => {
    const res = await axiosInstance.get(`/trainings/by_slug/${trainingSlug}`);
    console.log(res.data);
    return res.data;
  }
);

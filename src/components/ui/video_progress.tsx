"use client";

import { Progress } from "@/components/ui/progress";

type Props = {
  progress?: number;
};
const VideoProgress = ({ progress }: Props) => {
  const fixedProgress =
    progress !== undefined ? Number(progress.toFixed(0)) : 0;
  return (
    <div className="w-full flex flex-col gap-3 md:w-10/12">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">
          Watch Time Progress
        </span>
        <span className="text-sm font-medium text-white">{fixedProgress}%</span>
      </div>
      <Progress value={fixedProgress} className="w-full" />
    </div>
  );
};
export default VideoProgress;

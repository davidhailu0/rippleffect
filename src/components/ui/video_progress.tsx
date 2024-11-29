import { Progress } from "@/components/ui/progress";
import { Button } from "./button";

type Props = {
  progress?: number;
  timeInterval?: [number, number][];
  onResume?: (time: number) => void;
  currentTime: number;
  isPlaying: boolean;
};

const VideoProgress = ({
  progress,
  timeInterval,
  onResume,
  currentTime,
  isPlaying,
}: Props) => {
  const fixedProgress =
    progress !== undefined ? Math.min(Number(progress.toFixed(0)), 100) : 0;

  const lastStoppedAtSeconds =
    timeInterval && timeInterval.length > 0 ? timeInterval[0][1] : 0;

  const lastStoppedAtMinutes = Math.floor(lastStoppedAtSeconds / 60);

  const lastStoppedAtSecondsRemainder = Math.floor(lastStoppedAtSeconds % 60);

  const skippedSectionAvailable = timeInterval && timeInterval.length > 1;

  const isVideoNotPlaying =
    skippedSectionAvailable &&
    isPlaying === false &&
    fixedProgress <= 79 &&
    currentTime < lastStoppedAtSeconds;

  const isVideoPlaying =
    skippedSectionAvailable &&
    isPlaying === true &&
    fixedProgress <= 79 &&
    currentTime > lastStoppedAtSeconds + 12;

  const videoProgressSkipped = isVideoNotPlaying || isVideoPlaying;

  return (
    <div className="w-full flex flex-col gap-3 md:w-10/12">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">
          Watch Time Progress{" "}
          {videoProgressSkipped && (
            <span className="text-red-400">Stopped</span>
          )}
        </span>
        <span className="text-sm font-medium text-white">
          {videoProgressSkipped ? `. . . ` : `${fixedProgress}%`}
        </span>
      </div>
      <Progress
        value={videoProgressSkipped ? 0 : fixedProgress}
        className="w-full"
      />
      {videoProgressSkipped && (
        <div className="text-sm font-medium text-white">
          You stopped at{" "}
          {lastStoppedAtMinutes > 0
            ? `${lastStoppedAtMinutes} minute${
                lastStoppedAtMinutes !== 1 ? "s" : ""
              } and ${lastStoppedAtSecondsRemainder} second${
                lastStoppedAtSecondsRemainder !== 1 ? "s" : ""
              }`
            : `${lastStoppedAtSecondsRemainder} second${
                lastStoppedAtSecondsRemainder !== 1 ? "s" : ""
              }`}
          .{" "}
          <Button
            className="ml-3  bg-yellow-500 text-black hover:bg-yellow-500/80 hover:text-black"
            onClick={() => onResume?.(lastStoppedAtSeconds)} // Trigger the callback
          >
            Resume
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoProgress;

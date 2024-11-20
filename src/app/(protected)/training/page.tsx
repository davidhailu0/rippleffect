"use client";

import Loader from "@/components/ui/loader/loader";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { cn } from "@/lib/utils";
import { getSingleTrainingHandler } from "@/services/trainingService";
import { Video } from "@/types/Common";
import { Training as TrainingType } from "@/types/Training";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, CircleX, Play } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Training = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  if (!searchParams?.get("id")) {
    router.replace("/trainings");
  }

  const trainingId = searchParams.get("id")!;

  const { data: training, isLoading: isLoadingTraining } =
    useQuery<TrainingType>({
      queryKey: ["training", trainingId],
      queryFn: () =>
        getSingleTrainingHandler({ trainingId: parseInt(trainingId) }),
      enabled: Boolean(trainingId),
      refetchOnWindowFocus: false,
      retry: false,
    });

  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="container h-full max-w-7xl w-full flex flex-col mx-auto p-4">
      {isLoadingTraining && <Loader className="mt-6 mx-auto" />}
      {training && (
        <>
          <h1 className="text-2xl font-bold mt-6 mb-4">
            {training?.title} Chapters
          </h1>
          <div className="flex flex-col gap-3">
            {training?.chapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => toggleChapter(chapter.id)}
                className="bg-[#3d426b]/30 border border-white/10 rounded-xl py-5 px-5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="flex text-lg items-center gap-2">
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                    {chapter.title}
                  </span>
                </div>
                <AnimatePresence>
                  {expandedChapters.includes(chapter.id) && (
                    <motion.ul
                      id={`chapter-${chapter.id}-content`}
                      className="ml-8 mt-3 flex flex-col gap-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {chapter.videos.map((video) => (
                        <motion.li
                          key={video.id}
                          className={cn(
                            "flex items-center hover:bg-[#3d426b]/60 transition-colors duration-300 py-2 px-4 rounded-lg",
                            {
                              "bg-[#3d426b]/60": video.id === activeVideo?.id,
                            }
                          )}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onClick={(event) => {
                            event.stopPropagation();
                            setActiveVideo(video);
                          }}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          <span>{video.title}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <AnimatePresence>
            {activeVideo && (
              <div className="fixed w-screen bg-black/80 h-screen top-0 px-10 left-0 z-[999999] flex gap-5 flex-col items-center justify-center">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mx-auto relative flex items-center justify-center gap-5 flex-col w-full max-w-6xl mt-28"
                >
                  <CircleX
                    onClick={() => setActiveVideo(null)}
                    className="text-white cursor-pointer size-10 hover:scale-105 transition-transform absolute -top-20 md:-top-12 md:right-0 lg:-top-8 lg:right-5"
                  />
                  <VideoPlayer
                    playBackId={activeVideo.mux_playback_id}
                    videoID={activeVideo.id}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Training;

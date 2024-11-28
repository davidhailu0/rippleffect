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

  if (!searchParams?.get("slug")) {
    router.replace("/trainings");
  }

  const trainingSlug = searchParams.get("slug")!;

  const { data: training, isLoading: isLoadingTraining } =
    useQuery<TrainingType>({
      queryKey: ["training", trainingSlug],
      queryFn: () =>
        getSingleTrainingHandler({ trainingSlug: trainingSlug }),
      enabled: Boolean(trainingSlug),
      refetchOnWindowFocus: false,
      retry: false,
    });

  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

  const [activeLesson, setActiveLesson] = useState<Video | null>(null);

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
            {training?.title} Lessons
          </h1>
          <div className="flex flex-col gap-3">
            {training?.topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => toggleChapter(topic.id)}
                className="bg-[#3d426b]/30 border border-white/10 rounded-xl py-5 px-5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="flex text-lg items-center gap-2">
                    {expandedChapters.includes(topic.id) ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                    {topic.title}
                  </span>
                </div>
                <AnimatePresence>
                  {expandedChapters.includes(topic.id) && (
                    <motion.ul
                      id={`chapter-${topic.id}-content`}
                      className="ml-8 mt-3 flex flex-col gap-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {topic.lessons.map((lesson) => (
                        <motion.li
                          key={lesson.id}
                          className={cn(
                            "flex items-center hover:bg-[#3d426b]/60 transition-colors duration-300 py-2 px-4 rounded-lg",
                            {
                              "bg-[#3d426b]/60": lesson.id === activeLesson?.id,
                            }
                          )}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onClick={(event) => {
                            event.stopPropagation();
                            setActiveLesson(lesson.video);
                          }}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          <span>{lesson.title}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <AnimatePresence>
            {activeLesson && (
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
                    onClick={() => setActiveLesson(null)}
                    className="text-white cursor-pointer size-10 hover:scale-105 transition-transform absolute -top-20 md:-top-12 md:right-0 lg:-top-8 lg:right-5"
                  />
                  <VideoPlayer
                    playBackId={activeLesson.mux_playback_id}
                    videoID={activeLesson.id}
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

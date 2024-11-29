"use client";

import Loader from "@/components/ui/loader/loader";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { cn } from "@/lib/utils";
import { getSingleTrainingHandler } from "@/services/trainingService";
import { Video } from "@/types/Common";
import { Training as TrainingType } from "@/types/Training";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, CircleX, Layout, MenuIcon, Play } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Training() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams?.get("slug")) {
    router.replace("/trainings");
  }

  const trainingSlug = searchParams.get("slug")!;
  const [activeLesson, setActiveLesson] = useState<Video | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data: training, isLoading: isLoadingTraining } = useQuery<TrainingType>({
    queryKey: ["training", trainingSlug],
    queryFn: () => getSingleTrainingHandler({ trainingSlug }),
    enabled: Boolean(trainingSlug),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  console.log(training)

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/10">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold truncate">
          {training?.title}
        </h1>
        <Layout className="h-6 w-6" />
      </div>

      <div className="h-[calc(100vh-4rem)] lg:h-screen flex">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "absolute lg:relative z-30 w-full max-w-[300px] lg:max-w-[400px]",
                "bg-background lg:bg-transparent h-full border-r border-border/10"
              )}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="hidden lg:block mb-6">
                  <h1 className="text-2xl font-bold">{training?.title}</h1>
                </div>

                {isLoadingTraining ? (
                  <Loader className="mt-6 mx-auto" />
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {training?.topics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => toggleChapter(topic.id)}
                        className="bg-[#3d426b]/30 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-[#3d426b]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex text-base lg:text-lg items-center gap-2 font-medium">
                            {expandedChapters.includes(topic.id) ? (
                              <ChevronDown className="text-white" />
                            ) : (
                              <ChevronRight className="text-white" />
                            )}
                            {topic.title}
                          </span>
                        </div>
                        <AnimatePresence>
                          {expandedChapters.includes(topic.id) && (
                            <motion.ul
                              className="ml-6 mt-3 flex flex-col gap-2"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {topic.lessons.map((lesson) => (
                                <motion.li
                                  key={lesson.id}
                                  className={cn(
                                    "flex items-center hover:bg-[#3d426b]/60 transition-colors py-2 px-3 rounded-lg text-sm",
                                    {
                                      "bg-[#3d426b]/60": lesson.video && lesson.video.id === activeLesson?.id,
                                    }
                                  )}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setActiveLesson(lesson.video);
                                    if (window.innerWidth < 1024) {
                                      setIsSidebarOpen(false);
                                    }
                                  }}
                                >
                                  <Play className="mr-2 h-3 w-3 text-white flex-shrink-0" />
                                  <span className="line-clamp-2">{lesson.title}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-hidden">
          <div className="h-full rounded-xl overflow-hidden">
            {!activeLesson ? (
              <div className="flex items-center justify-center max-w-5xl h-full shadow-custom-shadow bg-black rounded-xl border border-border/50">
                <p className="text-lg text-white">
                  Select a lesson to start learning
                </p>
              </div>
            ) : (
              <div className="relative h-full">
                <button
                  onClick={() => setActiveLesson(null)}
                  className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <CircleX className="text-white h-6 w-6" />
                </button>
                <VideoPlayer
                  playBackId={activeLesson.mux_playback_id}
                  videoID={activeLesson.id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
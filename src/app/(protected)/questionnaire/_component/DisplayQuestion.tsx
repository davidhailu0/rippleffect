"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import MuxPlayer from "@mux/mux-player-react";
import clsx from "clsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSurveys, answerSurvey } from "@/services/SurveyService";
import SurveyQuestion from "./SurveyQuestion";
import Question from "@/types/Question";
import Answer from "@/types/Answers";

export default function DisplayQuestion() {
  const { data, isLoading } = useQuery<Question, Error>({
    queryKey: ["surveys"],
    queryFn: fetchSurveys,
  });
  const [selectedValue, setSelectedValue] = useState<Answer | null>(null);
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [lastTime, setLastTime] = useState(0);
  const router = useRouter();
  const queryClient = useQueryClient();

  const surveyVideos = useMemo(
    () => data?.questions?.sort((a, b) => a.id - b.id),
    [data]
  );

  useEffect(() => {
    if (data && data?.questions?.length > 0) {
      const firstQuestionTitle = data.questions[0]?.title;
      const response = localStorage.getItem(firstQuestionTitle);
      if (firstQuestionTitle && response) {
        setSelectedValue({ question_id: data.questions[0].id, response });
      }
    }
  }, [data]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        document.visibilityState === "hidden"
          ? videoElement.pause()
          : videoElement.play();
      }
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Use useMutation for answering survey questions
  const answerSurveyMutation = useMutation({
    mutationFn: async (answerData: {
      question_id: number;
      response: string;
    }) => {
      return await answerSurvey({ answer: answerData }, data?.id);
    },

    onError: (error) => {
      console.error("Failed to submit answer:", error);
    },
  });

  const goToNext = useCallback(() => {
    if (!data?.questions?.length || !selectedValue?.response) return;

    answerSurveyMutation.mutate({
      question_id: data.questions[index].id,
      response: selectedValue.response,
    });

    if (index + 1 < data.questions.length) {
      setIndex((prev) => prev + 1);
      setSelectedValue(null);
      const nextQuestionTitle = data.questions[index + 1]?.title;
      const nextResponse = localStorage.getItem(nextQuestionTitle);

      if (nextResponse) {
        setSelectedValue({
          question_id: data.questions[index + 1].id,
          response: nextResponse,
        });
      }
    } else {
      Cookies.set("questionFinished", "true", { path: "/", expires: 365 });
      router.replace("/step-3");
    }
  }, [data, selectedValue, index, answerSurveyMutation, router]);

  const handleOnChange = (val: Answer) => {
    if (!data?.questions?.length) return;
    localStorage.setItem(data.questions[index].title, val.response);
    setSelectedValue(val);
  };

  const handleTimeUpdate = (e: Event) => {
    const videoElement = e.currentTarget as HTMLVideoElement;
    const currentTime = videoElement.currentTime;
    if (currentTime - lastTime > 2) {
      videoElement.currentTime = lastTime;
    } else {
      setLastTime(currentTime);
    }
  };

  if (isLoading)
    return <ClipLoader color="#fff" size={70} className="h-10 w-10" />;

  if (!data?.questions?.length)
    return <p className="text-white text-2xl font-bold">No Questions Found</p>;

  return (
    <form className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5">
      <div className="h-auto w-full mx-auto flex flex-col gap-7 bg-white px-8 py-10">
        <Image
          src="/logo.webp"
          alt="logo"
          height={95}
          width={90}
          className="mx-auto"
        />
        <MuxPlayer
          ref={videoRef as any}
          streamType="on-demand"
          playbackId={surveyVideos![index].video?.mux_playback_id}
          onTimeUpdate={handleTimeUpdate}
          className={clsx("h-[300px] md:h-[500px] overflow-x-hidden")}
        />
        <SurveyQuestion
          survey={data.questions[index]}
          selectedValue={selectedValue}
          handleOnChange={handleOnChange}
          handleNext={goToNext}
        />
      </div>
      <div className="w-full h-16 bg-pink-400 flex justify-end items-center">
        <button
          onClick={goToNext}
          className="text-white h-full w-48 bg-pink-600"
        >
          Next -&gt;
        </button>
      </div>
    </form>
  );
}

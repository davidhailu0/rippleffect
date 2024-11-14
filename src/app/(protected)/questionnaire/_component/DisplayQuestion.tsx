"use client";
import { useQueryParams } from "@/hooks/useQueryParams";
import { setLead } from "@/lib/reduxStore/authSlice";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { answerSurvey, fetchSurveys } from "@/services/SurveyService";
import { Lead } from "@/types/Lead";
import Question from "@/types/Question";
import MuxPlayer from "@mux/mux-player-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { z } from "zod";

const queryParamSchema = z.object({
  survey_question: z.string(),
});

export default function DisplayQuestion() {
  const { queryParams, setQueryParams } = useQueryParams({
    schema: queryParamSchema,
    defaultValues: { survey_question: "1" },
  });

  const {
    data: survey,
    isLoading,
    refetch,
  } = useQuery<Question, Error>({
    queryKey: ["surveys"],
    queryFn: fetchSurveys,
  });
  const surveyQuestionNumber = parseInt(queryParams.survey_question) - 1;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textAnswerRef = useRef<HTMLInputElement | null>(null);
  const radioGroupAnswerRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const lead = useAppSelector((state) => state.auth.lead);
  const dispatch = useDispatch();

  const { mutate: answerSurveyMutation, isPending } = useMutation({
    mutationFn: answerSurvey,
    onSuccess: (lead: Lead) => {
      dispatch(setLead(lead));
      if (lead?.tag_list.includes("survey_completed")) {
        router.push("/step-3");
      } else {
        refetch();
        goToNextQuestion(surveyQuestionNumber + 2);
      }
    },
  });

  const goToNextQuestion = (nextQuestionNumber: number) => {
    // Check that the next question number is within the bounds of the questions array
    if (survey && nextQuestionNumber <= survey.questions.length) {
      setQueryParams({ survey_question: nextQuestionNumber.toString() });
    } else if (lead?.tag_list.includes("survey_completed")) {
      router.push("/step-3");
    } else {
      setQueryParams({ survey_question: "1" });
    }
  };

  const goToPreviousQuestion = () => {
    if (surveyQuestionNumber > 0) {
      setQueryParams({ survey_question: surveyQuestionNumber.toString() });
    }
  };

  const currentQuestion = useMemo(
    () => survey?.questions?.[surveyQuestionNumber],
    [survey, surveyQuestionNumber]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentQuestion) {
      if (currentQuestion.question_type === "text") {
        handleTextAnswer();
      } else {
        handleMultipleChoiceAnswer();
      }
    }
  };

  const handleMultipleChoiceAnswer = () => {
    const selectedOption = Array.from(
      radioGroupAnswerRef.current?.elements || []
    ).find((radio) => (radio as HTMLInputElement).checked) as
      | HTMLInputElement
      | undefined;

    const defaultAnswer = currentQuestion?.lead_answer?.response;

    if (
      selectedOption &&
      selectedOption.value !== currentQuestion?.lead_answer?.response
    ) {
      submitAnswer(selectedOption.value);
    } else if (defaultAnswer) {
      goToNextQuestion(surveyQuestionNumber + 2);
    } else {
      toast.warning("Please select an option");
    }
  };

  const handleTextAnswer = () => {
    const textAnswer = textAnswerRef.current?.value;
    if (textAnswer && textAnswer !== currentQuestion?.lead_answer?.response) {
      submitAnswer(textAnswer);
    } else {
      goToNextQuestion(surveyQuestionNumber + 2);
    }
  };

  const submitAnswer = (response: string) => {
    if (currentQuestion && survey) {
      answerSurveyMutation({
        data: { answer: { question_id: currentQuestion.id, response } },
        surveyId: survey.id,
      });
    }
  };

  if (isLoading)
    return <ClipLoader color="#fff" size={70} className="h-10 w-10" />;

  if (!survey?.questions?.length)
    return <p className="text-white text-2xl font-bold">No Questions Found</p>;

  return (
    <form
      className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5"
      onSubmit={handleSubmit}
      ref={radioGroupAnswerRef}
    >
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
          playbackId={currentQuestion?.video?.mux_playback_id}
          className={clsx("h-[300px] md:h-[500px] overflow-x-hidden")}
        />
        <p className="text-pink-400">{currentQuestion?.title}</p>
        {currentQuestion?.question_type === "multiple_choice" ? (
          <div className="grid grid-cols-4 space-x-3">
            {Object.entries(currentQuestion.choices).map(([key, value]) => (
              <label key={key} className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio-group"
                  value={value}
                  className="form-radio h-4 w-4 text-pink-600 transition duration-150 ease-in-out"
                  defaultChecked={
                    value === currentQuestion.lead_answer?.response
                  }
                />
                <span className="ml-2 text-gray-700">{value}</span>
              </label>
            ))}
          </div>
        ) : (
          <div>
            <label
              htmlFor="text-field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {currentQuestion?.title}
            </label>
            <input
              type="text"
              id="text-field"
              placeholder={currentQuestion?.title}
              className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoFocus
              defaultValue={currentQuestion?.lead_answer?.response || ""}
              required
              key={surveyQuestionNumber}
              ref={textAnswerRef}
            />
          </div>
        )}
      </div>
      <div className="w-full h-16 bg-pink-400 flex justify-between items-center">
        {surveyQuestionNumber !== 0 && (
          <button
            type="button"
            className="text-white h-full w-48 bg-pink-600"
            onClick={goToPreviousQuestion}
          >
            Previous
          </button>
        )}

        <button
          type="submit"
          className="text-white h-full ml-auto w-48 bg-pink-600"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Next"}
        </button>
      </div>
    </form>
  );
}

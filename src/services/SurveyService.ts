import { axiosInstance } from "@/config/axiosConfig";
import { asyncHandler } from "@/util/asyncHandler";

type AnswerSurveyParam = {
  answer: {
    question_id?: number;
    response?: string;
  };
};

export const fetchSurveys = asyncHandler(async () => {
  const resp = await axiosInstance(`/surveys`);
  const respJson = await resp.data;
  // console.log(respJson.availabilities)
  if (respJson.questions) {
    return respJson;
  }
  return [];
});
export const answerSurvey = asyncHandler(
  async ({ data, surveyId }: { data: AnswerSurveyParam; surveyId: number }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axiosInstance.post(`/surveys/${surveyId}/answer`, data);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  }
);

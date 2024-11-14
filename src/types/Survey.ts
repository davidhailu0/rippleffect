import { Video } from "./Common";
type Survey = {
  id: number;
  title: string;
  question_type: "multiple_choice" | "text";
  choices: Record<string, string>;
  video: Video;
  lead_answer: {
    id: number;
    survey_response_id: number;
    question_id: number;
    response: string;
  } | null;
};
export default Survey;

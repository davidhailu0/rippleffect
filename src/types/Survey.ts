import { Video } from "./Common";
type Survey = {
  id: number;
  title: string;
  question_type: string;
  choices: Record<string, string>;
  video: Video;
};
export default Survey;

import { Video } from "./Common";

type Lesson = {
  id: number;
  title: string;
  video: Video;
};

type Topics = {
  id: number;
  title: string;
  training_id: number;
  created_at: string;
  updated_at: string;
  lessons: Lesson[];
};

export type Training = {
  id: number;
  title: string;
  description: string;
  share_link: { slug: string };
  lead_id: number;
  created_at: string;
  updated_at: string;
  topics: Topics[];
};

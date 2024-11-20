import { Video } from "./Common";

type Chapter = {
  id: number;
  title: string;
  training_id: number;
  created_at: string;
  updated_at: string;
  videos: Video[];
};

export type Training = {
  id: number;
  title: string;
  description: string | null;
  lead_id: number;
  created_at: string;
  updated_at: string;
  chapters: Chapter[];
};

import { Video } from "./Common";
import { Lead } from "./Lead";

export type FetchVideosResponse = {
  account: {
    id: number;
    domain: string;
  };
  videos: Video[];
};

export type VideoProgressData = {
  progress: number;
  time_interval: [number, number][];
  lead: Lead;
};

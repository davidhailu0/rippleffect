import { Video } from "./Common";

export type FetchVideosResponse = {
  account: {
    id: number;
    domain: string;
  };
  videos: Video[];
};

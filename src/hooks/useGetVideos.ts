import { useAppSelector } from "@/lib/reduxStore/hooks";
import { setVideos } from "@/lib/reduxStore/userSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchVideos } from "../services/videoServices";
import { FetchVideosResponse } from "@/types/VideosType";

const useGetVideos = () => {
  const dispatch = useDispatch();

  const isLogged = useAppSelector((state) => state.auth.isLogged);

  const { data, isSuccess } = useQuery<FetchVideosResponse>({
    queryKey: ["user-videos", isLogged],
    queryFn: fetchVideos,
    retry: false,
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setVideos(data?.videos));
    }
  }, [isSuccess, isLogged, data]);
};

export default useGetVideos;

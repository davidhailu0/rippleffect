import { getLeadHandler } from "@/services/authService";
import { Lead } from "@/types/Lead";
import { FetchVideosResponse } from "@/types/VideosType";
import { useQuery } from "@tanstack/react-query";

const useGetLead = () => {
  const {
    isLoading,
    data: lead,
    isSuccess,
    isError,
  } = useQuery<Lead>({
    queryKey: ["lead-data"],
    queryFn: getLeadHandler,
    retry: false,
  });

  return { isLoading, isSuccess, isError, lead };
};

export default useGetLead;

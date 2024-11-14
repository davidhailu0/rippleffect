import { axiosInstance } from "@/config/axiosConfig";
import { asyncHandler } from "@/util/asyncHandler";

export const fetchLeads = asyncHandler(async () => {
  const resp = await axiosInstance.get(`/leads/referrals`);
  const respJson = resp.data;
  if (respJson.leads) {
    return respJson.leads;
  }
  return [];
});

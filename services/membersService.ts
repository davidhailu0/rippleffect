import Cookies from "js-cookie";
import { axiosInstance } from "@/config/axiosConfig";
import { asyncHandler } from "@/util/asyncHandler";

export const fetchFilteredMembers = asyncHandler(async () => {
  const email = Cookies.get("email");
  const referral_code = Cookies.get("referral_code");
  const resp = await axiosInstance.get(
    `/leads/?email=${email}&referral_code=${referral_code}`
  );
  const respJson = resp.data;
  if (respJson.leads) {
    return respJson.leads;
  }
  return [];
});

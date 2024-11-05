import Cookies from "js-cookie"
import { axiosInstance } from "@/config/axiosConfig";

export const fetchFilteredMembers = async()=>{
    const email = Cookies.get('email')
    const referral_code = Cookies.get('referral_code')
    const resp = await axiosInstance.get(`/api/v1/leads/?email=${email}&referral_code=${referral_code}`)
    const respJson = resp.data
    if(respJson.leads){
      return respJson.leads;
    }
    return [];
}
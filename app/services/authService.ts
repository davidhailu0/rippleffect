'use client'

import ConfirmLead from "../../types/ConfirmLead";
import CreateLead from "../../types/CreateLeadType";
import { axiosInstance } from "@/config/axiosConfig";

type updateRegistrationParam = {
      "lead": {
          "email"?: string,
          "first_name"?:string,
          "last_name"?: string,
          "phone"?: string,
          "terms_accepted"?: boolean
      }
}
  

export const createLead = async (data:CreateLead)=>{
      const url = `/api/v1/leads`;
      const response = await axiosInstance.post(url,data)
      return response.data;
}

export const confirmLead = async(data:ConfirmLead)=>{
      const url = `/api/v1/leads/confirm`;
      const response = await axiosInstance.post(url, data);
      return await response.data;
}

export const verifyLoginTokenRequest = async(login_token:string)=>{
    const url = `/api/v1/login_with_token?login_token=${login_token}`;
    const response = await axiosInstance.get(url)
    return await response.data;
}

export const updateRegistration = async (id:string|undefined,data:updateRegistrationParam)=>{
  const resp = await axiosInstance.put(`/api/v1/leads/${id}`, data)
  return resp.data
}
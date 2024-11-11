"use client";

import { asyncHandler } from "@/util/asyncHandler";
import CreateLead from "../types/CreateLeadType";
import { axiosInstance } from "@/config/axiosConfig";
import { ConfirmLead } from "@/types/ConfirmLead";
import { Axios, AxiosError } from "axios";

type updateRegistrationParam = {
  lead: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    terms_accepted?: boolean;
  };
};

export const createLead = asyncHandler(async (data: CreateLead) => {
  const url = `/leads`;
  const response = await axiosInstance.post(url, data);
  return response.data;
});

export const getLeadHandler = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axiosInstance.get("/leads", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          axiosInstance.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
        }
        throw new AxiosError("Error fetching current user");
      }
      throw error;
    }
  } else {
    throw new AxiosError("No token found");
  }
};

export const confirmLead = asyncHandler(async (data: ConfirmLead) => {
  const url = `/leads/confirm`;
  const response = await axiosInstance.post(url, data);
  return await response.data;
});

export const verifyLoginTokenRequest = asyncHandler(
  async (login_token: string) => {
    const url = `/login_with_token?login_token=${login_token}`;
    const response = await axiosInstance.get(url);
    return await response.data;
  }
);

export const updateRegistration = asyncHandler(
  async (id: string | undefined, data: updateRegistrationParam) => {
    const resp = await axiosInstance.put(`/leads/${id}`, data);
    return resp.data;
  }
);

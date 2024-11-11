"use client";
import Cookies from "js-cookie";
import { axiosInstance } from "@/config/axiosConfig";
import { asyncHandler } from "@/util/asyncHandler";

export const fetchAvailableDates = asyncHandler(
  async (month: number, year: number) => {
    const resp = await axiosInstance.get(
      `/availabilities/?year=${year}&month=${month}`
    );
    if (resp.data.availabilities) {
      return resp.data.availabilities;
    }
    return [];
  }
);

type BookParams = { start_time: string; end_time: string; timezone: string };

export const bookSession = asyncHandler(
  async ({ start_time, end_time, timezone }: BookParams) => {
    try {
      const resp = await axiosInstance.post(`/bookings`, {
        start_time,
        end_time,
        timezone,
      });
      const respJson = await resp.data;
      if (respJson.message) {
        Cookies.set("bookedTime", start_time);
        return "success";
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const fetchBookings = asyncHandler(async () => {
  const resp = await axiosInstance.get(`/bookings`);
  const respJson = await resp.data;
  if (respJson.bookings) {
    return respJson.bookings;
  }
  return [];
});

"use client";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "Origin-Override": process.env.NEXT_PUBLIC_APP_ORIGIN,
  },
});

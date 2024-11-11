"use client";
import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "Origin-Override": process.env.NEXT_PUBLIC_APP_ORIGIN,
    Authorization: Cookies.get("token"),
  },
});

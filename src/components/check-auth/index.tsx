"use client";

import useGetLead from "@/hooks/useGetLead";
import {
  resetAuthSlice,
  setIsAuthFailed,
  setIsLogged,
  setLead,
} from "@/lib/reduxStore/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxStore/hooks";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const CheckAuth = () => {
  const isLoggedOut = useAppSelector((state) => state.auth.isLoggedOut);
  const [cookies] = useCookies(["token"]);

  const dispatch = useAppDispatch();

  const { lead, isSuccess, isError } = useGetLead();

  useEffect(() => {
    if (isSuccess && lead && isLoggedOut === false) {
      dispatch(setIsLogged());
      dispatch(setLead(lead));
    }
    if (!cookies.token) {
      dispatch(resetAuthSlice())
    }
  }, [lead, dispatch, isLoggedOut, isSuccess, cookies]);

  useEffect(() => {
    if (isError === true) {
      dispatch(setIsAuthFailed(true));
    }
  }, [dispatch, isError]);

  return null;
};

export default CheckAuth;

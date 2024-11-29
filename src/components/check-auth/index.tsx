"use client";

import useGetLead from "@/hooks/useGetLead";
import {
  setIsAuthFailed,
  setIsLogged,
  setLead,
} from "@/lib/reduxStore/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxStore/hooks";
import { useEffect } from "react";

const CheckAuth = () => {
  const isLoggedOut = useAppSelector((state) => state.auth.isLoggedOut);

  const dispatch = useAppDispatch();

  const { lead, isSuccess, isError } = useGetLead();

  useEffect(() => {
    if (isSuccess && lead && isLoggedOut === false) {
      dispatch(setIsLogged());
      dispatch(setLead(lead));
    }
  }, [lead, dispatch, isLoggedOut, isSuccess]);

  useEffect(() => {
    if (isError === true) {
      dispatch(setIsAuthFailed(true));
    }
  }, [dispatch, isError]);

  return null;
};

export default CheckAuth;

"use client";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { useRouter } from "nextjs-toploader/app";

import React, { useLayoutEffect } from "react";

const Step3Layout = ({ children }: { children: React.ReactNode }) => {
  const lead = useAppSelector((state) => state.auth.lead);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!lead?.tag_list?.includes("booked_call")) {
      router.replace("/step-3");
    }
  }, [lead]);

  return children;
};

export default Step3Layout;

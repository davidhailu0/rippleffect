"use client";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { useRouter } from "nextjs-toploader/app";
import React, { Suspense, useLayoutEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLogged } = useAppSelector((state) => state.auth);
  useLayoutEffect(() => {
    if (isLogged === true) {
      router.replace("/step-1/");
    }
  }, [isLogged, router]);
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
};

export default Layout;

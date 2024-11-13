"use client";
import Loader from "@/components/ui/loader/loader";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLogged, isAuthFailed, isLoggedOut } = useAppSelector(
    (state) => state.auth
  );

  useLayoutEffect(() => {
    if (isAuthFailed || isLoggedOut) {
      router.replace("/sign-up");
    }
    if (isLogged === false) {
      return;
    }
  }, [isAuthFailed, isLoggedOut, isLogged, router]);

  if (isLogged === false) {
    return <Loader className="h-dvh w-full flex items-center justify-center" />;
  }

  if (isLogged === true) {
    return (
      <>
        {/* FIXME: remove this later */}
        {/* <SubNavbar /> */}
        {children}
      </>
    );
  }
};

export default ProtectedRoute;

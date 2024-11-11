"use client";
import Loader from "@/components/ui/loader/loader";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import SubNavbar from "../../components/ui/Subnavbar/Subnavbar";
import YellowNotificationBar from "@/components/ui/YellowNotificationBar/YellowNotificationbar";

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
        <YellowNotificationBar message="Hello" />
        <SubNavbar />
        {children}
      </>
    );
  }
};

export default ProtectedRoute;

"use client";
import Loader from "@/components/ui/loader/loader";
import NotificationBanner from "@/components/ui/notification-banner";
import SubNavbar from "@/components/ui/Subnavbar/Subnavbar";
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
      console.log("logout");
      localStorage.removeItem("token");
      router.push("/sign-up");
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
        <SubNavbar />
        <NotificationBanner />
        {children}
      </>
    );
  }
};

export default ProtectedRoute;

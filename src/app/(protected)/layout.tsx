"use client";
import Loader from "@/components/ui/loader/loader";
import NotificationBanner from "@/components/ui/notification-banner";
import SubNavbar from "@/components/ui/Subnavbar/Subnavbar";
import { setIsLoggedOut } from "@/lib/reduxStore/authSlice";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { isLogged, isAuthFailed, isLoggedOut } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (slug) {
      localStorage.setItem("slug", slug);
    }
    if (isAuthFailed || isLoggedOut) {
      dispatch(setIsLoggedOut());
      router.push("/sign-in");
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
      <div className="md:pb-10">
        {/* FIXME: remove this later */}
        <SubNavbar />
        <NotificationBanner />
        {children}
      </div>
    );
  }
};

export default ProtectedRoute;

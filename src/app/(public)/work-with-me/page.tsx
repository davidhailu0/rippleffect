"use client";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import Link from "next/link";
import React from "react";

const App: React.FC = () => {
  const { isLogged } = useAppSelector((state) => state.auth);

  const videos = useAppSelector((state) => state.user.videos);

  const landing_page = videos?.find(({ tag_list }) =>
    tag_list.includes("landing")
  );

  return (
    <>
      <div className="flex flex-col items-center h-auto overflow-hidden bg-gradient-radial pt-10 from-gray-900 to-black">
        <div className="flex flex-col justify-center flex-1 text-center">
          <span className="mb-4 px-6 py-2 bg-white/20 rounded-lg transition">
            No Experience Required
          </span>
          <h1 className="text-5xl font-semibold mb-4">Work with Me</h1>
          <p className="text-lg mb-8">
            Get Free Access to My Lead-Generating Sales System!
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center w-[95%] md:w-[73%] h-auto md:h-auto mx-auto">
          <VideoPlayer playBackId={landing_page?.mux_playback_id} videoID={landing_page?.id} showProgress={false} />
        </div>
        <div className="flex justify-center flex-1 text-center my-10 w-full gap-10">
          {isLogged === false ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10">
              <Link href={"/sign-up"}>
                <Button className="px-6 py-3 h-12 bg-pink-400 text-white hover:bg-pink-600 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">
                  Create Account
                </Button>
              </Link>
              <Link href={"/sign-in"}>
                <Button className="px-6 py-3 h-12 bg-white text-pink-400 hover:bg-pink-200 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">
                  Log In
                </Button>
              </Link>
            </div>
          ) : (
            <Link href={"/leads"}>
              <Button className="px-6 py-3 h-12 bg-pink-400 text-white hover:bg-pink-600 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">
                My Leads
              </Button>
            </Link>
          )}
        </div>

        <footer className="mt-auto mb-4 text-sm">
          &copy;2024 All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default App;

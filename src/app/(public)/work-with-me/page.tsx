"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import React from "react";
import { ClipLoader } from "react-spinners";

const App: React.FC = () => {
  const { isLogged } = useAppSelector((state) => state.auth);

  const videos = useAppSelector((state) => state.user.videos);

  const landing_page = videos?.find(({ tag_list }) =>
    tag_list.includes("landing")
  );

  return (
    <>
      {/* FIXME: remove this later */}
      {/* {isLogged ? <SubNavbar /> : <CreateAccountBar />} */}
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
        <div className="flex flex-col gap-4 items-center w-[95%] md:w-[73%] mx-auto">
          {landing_page?.mux_playback_id ? (
            <MuxPlayer
              className={`shadow-custom-shadow md:w-10/12 sx:w-full md:min-h-[519px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden relative`}
              playbackId={landing_page?.mux_playback_id ?? "not-found"}
              placeholder="Loading Video"
              streamType="on-demand"
              playbackRate={1.0}
              preload="auto"
              startTime={0.1}
            />
          ) : (
            <div className="relative shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] object-contain hover:cursor-pointer overflow-x-hidden bg-black flex items-center justify-center">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          )}
        </div>
        <div className="flex justify-center flex-1 text-center my-10 w-full">
          {isLogged === false ? (
            <Link href={"/sign-up"}>
              <Button className="px-6 py-3 h-12 bg-pink-400 text-white hover:bg-pink-600 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">
                Create Account
              </Button>
            </Link>
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

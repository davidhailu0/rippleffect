"use client";
import VideoPlayer from "@/app/components/videoComponent";
import { lato } from "@/app/fonts/lato";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Content() {
  const [show, setShow] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["step-1-watched"]);

  useEffect(() => {
    if (cookies["step-1-watched"]) {
      setShow(true);
    }
    setCookie("step-1-watched", "true", { path: "/", maxAge: 24 * 365 * 3600 });
  }, [cookies]);
  const handleVideoEnd = () => {
    setShow(true);
    setCookie("step-1-watched", "true", { path: "/", maxAge: 24 * 365 * 3600 });
  };

  const videos = useAppSelector((state) => state.user.videos);

  const step_1_video = videos?.find(({ tag_list }) =>
    tag_list.includes("step1")
  );
  return (
    <>
      <VideoPlayer
        videoID={step_1_video?.id}
        playBackId={step_1_video?.mux_playback_id}
        handleVideoProgress={handleVideoEnd}
      />
      <div className={`flex-col mt-4 md:mt-7`}>
        <p className={`text-white ${lato.className} text-center`}>
          Once you have{" "}
          <span className="font-medium text-[#d7b398]">watched the videos</span>{" "}
          click the button below to continue to step 2
        </p>
        <Link
          href={"/step-2"}
          className={`${
            !show ? "hidden" : "block"
          } px-6 py-3 bg-pink-400 text-white hover:bg-pink-600 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3`}
        >
          Next &gt;
        </Link>
      </div>
    </>
  );
}

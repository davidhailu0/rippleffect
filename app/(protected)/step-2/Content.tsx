"use client";
import VideoPlayer from "@/app/components/videoComponent";
import { lato } from "@/app/fonts/lato";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Content() {
  const [show, setShow] = useState<boolean>(false);

  const [cookie, setCookie] = useCookies(["step-2-watched"]);
  useEffect(() => {
    if (cookie["step-2-watched"]) {
      setShow(true);
    }
  }, [cookie]);
  const handleVideoEnd = () => {
    setShow(true);
    setCookie("step-2-watched", "true", { path: "/", maxAge: 24 * 365 * 3600 });
  };

  const videos = useAppSelector((state) => state.user.videos);

  const step_2_video = videos?.find(({ tag_list }) =>
    tag_list.includes("step2")
  );

  return (
    <>
      <VideoPlayer
        videoID={step_2_video?.id}
        playBackId={step_2_video?.mux_playback_id}
        handleVideoProgress={handleVideoEnd}
      />
      <div className={`flex-col w-full mt-8`}>
        <p className={`text-white ${lato.className} text-center`}>
          Once you have{" "}
          <span className="font-medium text-[#d7b398]">watched the videos</span>{" "}
          above click the button below to book your call
        </p>
        <div className="flex mt-8 flex-col md:flex-row">
          <Link
            href={"/step-1"}
            className="px-6 py-3 bg-pink-400 text-white hover:bg-pink-600 transition-colors rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3"
          >
            &lt; Previous
          </Link>

          {/* {!show && (
                        <Button
                            className={
                                "px-6 py-3 bg-pink-400 text-white hover:bg-pink-600 h-12 transition-colors rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3"
                            }
                        // variant={"destructive"}
                        >
                            Book Call
                        </Button>
                    )} */}
          <Link
            href={"/work-with-me/book"}
            className={`${
              show ? "block" : "hidden"
            } px-6 py-3 bg-pink-400 text-white hover:bg-pink-600 transition-colors rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3`}
          >
            Book Call
          </Link>
        </div>
      </div>
    </>
  );
}
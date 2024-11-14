"use client";
import Link from "next/link";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { useAppSelector } from "@/lib/reduxStore/hooks";

export default function Step2() {
  const videos = useAppSelector((state) => state.user.videos);

  const step_2_video = videos?.find(({ tag_list }) =>
    tag_list.includes("step2")
  );
  return (
    <>
      <div className="flex flex-col gap-7 mt-7 items-center w-full md:w-9/12 mx-auto px-4">
        <p className="text-4xl font-bold text-white mb-9">Step 2</p>
        {step_2_video && (
          <VideoPlayer
            videoID={step_2_video?.id}
            playBackId={step_2_video?.mux_playback_id}
            tag={step_2_video?.tag_list[0]}
          />
        )}

        <div className={`flex-col w-full mt-8`}>
          <p className={`text-white text-center`}>
            Once you have{" "}
            <span className="font-medium text-pink-400">
              watched the videos
            </span>{" "}
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
              href={"/book"}
              className={` px-6 py-3 bg-pink-400 text-white hover:bg-pink-600 transition-colors rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3`}
            >
              Book Call
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

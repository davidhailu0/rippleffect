"use client";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import Link from "next/link";

export default function Step1() {
  const videos = useAppSelector((state) => state.user.videos);

  const lead = useAppSelector((state) => state.auth.lead);

  const step_1_video = videos?.find(({ tag_list }) =>
    tag_list.includes("step1")
  );
  return (
    <>
      <div className="flex flex-col gap-7 mt-7 items-center w-full md:w-9/12 mx-auto px-4">
        <p className="text-4xl font-bold text-white mb-4 md:mb-9">Step 1</p>
        <VideoPlayer
          videoID={step_1_video?.id}
          playBackId={step_1_video?.mux_playback_id}
          tag={step_1_video?.tag_list[0]}
        />
        <div className={`flex-col mt-4 md:mt-7`}>
          <p className={`text-white text-center`}>
            Once you have{" "}
            <span className="font-medium text-pink-400">
              watched the videos
            </span>{" "}
            click the button below to continue to step 2
          </p>
        </div>
        {lead?.tag_list?.includes("step1_watched") ? (
          <Link
            href={"/step-2"}
            className={`px-6 py-3 bg-pink-400 text-white hover:bg-pink-600 transition-colors rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3`}
          >
            Next &gt;
          </Link>
        ) : (
          <button
            disabled
            className="px-6 py-3 bg-pink-400 text-white cursor-not-allowed transition-colors rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3 opacity-55"
            title="You have to watch the video first"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

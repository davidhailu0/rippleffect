"use client";
import Image from "next/image";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";
import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { Video } from "@/types/Common";

export default function Content({
  countryFlagImg,
  bestStrategyVideo,
}: {
  countryFlagImg: string;
  bestStrategyVideo: Video | undefined;
}) {
  const router = useRouter();

  const videos = useAppSelector((state) => state.user.videos);
  const lead = useAppSelector((state) => state.auth.lead);

  const step_3_intro = videos?.find(
    ({ tag_list }) => tag_list.includes("step3") && tag_list.includes("intro")
  );

  const step_3_product = videos?.find(
    ({ tag_list }) => tag_list.includes("step3") && tag_list.includes("products")
  );
  const step_3_plan = videos?.find(
    ({ tag_list }) => tag_list.includes("step3") && tag_list.includes("plan")
  );

  const goToTraining = () => {
    router.push("/training");
  };

  return (
    <>
      <div className="flex flex-col gap-5 mt-7 items-center w-full md:w-9/12 mx-auto px-2">
        <Image
          src={countryFlagImg}
          alt="EU"
          height={100}
          width={100}
          unoptimized
        />
        <p className="text-pink-400 text-2xl font-bold">Welcome</p>
        <p className="text-2xl md:text-4xl font-bold text-white text-center">
          My Current Business Model
        </p>
        <p className="text-xl md:text-2xl font-bold text-gray-400 mb-5">
          In this 4 Video Module, you will learn about
        </p>
        <ol className="text-white text-md font-bold list-decimal">
          <li>Intro to your business journey with Nate</li>
          <li>The Best Product I have found so far</li>
          <li>The Perfect Business Model</li>
          <li>My Best Strategy to get Started</li>
        </ol>
        <p className="text-2xl font-bold text-white my-10">
          1. Intro to your business journey with Nate
        </p>
        <VideoPlayer
          videoID={step_3_intro?.id}
          tag="step3"
          playBackId={step_3_intro?.mux_playback_id}
        />
        <p className="text-2xl font-bold text-white my-10">
          2. The Best Product I have found so far
        </p>
        <VideoPlayer
          videoID={step_3_product?.id}
          tag="step3"
          playBackId={step_3_product?.mux_playback_id}
        />
        <p className="text-2xl font-bold text-white my-10">
          3. The Perfect Business Model
        </p>
        <VideoPlayer
          videoID={step_3_plan?.id}
          tag="step3"
          playBackId={step_3_plan?.mux_playback_id}
        />
        <p className="text-2xl font-bold text-white my-10">
          4. My Best Strategy to get Started
        </p>
        <VideoPlayer
          videoID={bestStrategyVideo?.id}
          tag="step4"
          playBackId={bestStrategyVideo?.mux_playback_id}
        />
        <p
          className={clsx({
            "text-md text-gray-200 mb-5": lead?.tag_list.includes("step3_watched"),
            hidden: !lead?.tag_list.includes("step3_watched"),
          })}
        >
          Make sure to watch all videos before you call, if not you will not be
          able to understand my business or ask the right question
        </p>
        <div
          className={clsx({
            "flex justify-between w-full md:w-1/2": lead?.tag_list.includes("step3_watched"),
            hidden: !lead?.tag_list.includes("step3_watched"),
          })}
        >
          <Button title="f Join our Facebook Group" type="button" />
          <Button title="Next >" type="button" onClick={goToTraining} />
        </div>
      </div>
    </>
  );
}

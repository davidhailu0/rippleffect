'use client';
import Image from 'next/image';
import VideoPlayer from '@/app/components/videoComponent';
import Button from '@/app/components/Button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GetVideoContext, Video } from '@/app/hooks/VideoContext';
import { useRouter } from 'nextjs-toploader/app';
import clsx from 'clsx';

export default function Content({ countryFlagImg, bestStrategyVideo }: { countryFlagImg: string, bestStrategyVideo: Video | undefined }) {
    const [videoWatched, setVideoWatched] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("step-3-watched") === "true") {
            setVideoWatched(4);
        }

        const timeout = setTimeout(() => {
            toast("Please Watch All the Videos", { icon: false });
        }, 1000 * 10);

        return () => clearTimeout(timeout);
    }, []);

    const VideoContext = GetVideoContext();
    const step_3_intro = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('intro'));
    const step_3_plan = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('plan'));

    const handleVideoEnd = () => {
        setVideoWatched((prev) => {
            const updatedWatched = prev + 1;
            if (updatedWatched === 4) {
                localStorage.setItem("step-3-watched", "true");
            }
            return updatedWatched;
        });
    };

    const goToTraining = () => {
        router.push('/training')
    };

    return (
        <>
            <div className="flex flex-col gap-5 mt-7 items-center w-full md:w-9/12 mx-auto px-2">
                <Image src={countryFlagImg} alt="EU" height={100} width={100} unoptimized />
                <p className="text-[#d7b398] text-2xl font-bold">Welcome</p>
                <p className="text-2xl md:text-4xl font-bold text-white text-center">My Current Business Model</p>
                <p className="text-xl md:text-2xl font-bold text-gray-400 mb-5">In this 4 Video Module, you will learn about</p>
                <ol className="text-white text-md font-bold list-decimal">
                    <li>Intro to your business journey with Nate</li>
                    <li>The Best Product I have found so far</li>
                    <li>The Perfect Business Model</li>
                    <li>My Best Strategy to get Started</li>
                </ol>
                <p className="text-2xl font-bold text-white my-4">1. Intro to your business journey with Nate</p>
                <VideoPlayer videoID={step_3_intro?.id} handleVideoProgress={handleVideoEnd} playBackId={step_3_intro?.mux_playback_id} />
                <p className="text-2xl font-bold text-white my-4">2. The Best Product I have found so far</p>
                <VideoPlayer videoID={step_3_plan?.id} handleVideoProgress={handleVideoEnd} playBackId={step_3_plan?.mux_playback_id} />
                <p className="text-2xl font-bold text-white my-4">3. The Perfect Business Model</p>
                <VideoPlayer videoID={step_3_plan?.id} handleVideoProgress={handleVideoEnd} playBackId={step_3_plan?.mux_playback_id} />
                <p className="text-2xl font-bold text-white my-4">4. My Best Strategy to get Started</p>
                <VideoPlayer videoID={bestStrategyVideo?.id} handleVideoProgress={handleVideoEnd} playBackId={bestStrategyVideo?.mux_playback_id} />
                <p className={clsx({ 'text-md text-gray-200 mb-5': videoWatched !== 4, hidden: videoWatched === 4 })}>
                    Make sure to watch all videos before you call, if not you will not be able to understand my business or ask the right question
                </p>
                <div className={clsx({ 'flex justify-between w-full md:w-1/2': videoWatched === 4, hidden: videoWatched !== 4 })}>
                    <Button title="f Join our Facebook Group" type="button" />
                    <Button title="Next >" type="button" callBack={goToTraining} />
                </div>
            </div>
        </>
    );
}
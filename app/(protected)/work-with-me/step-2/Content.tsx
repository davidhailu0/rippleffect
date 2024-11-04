'use client'
import { lato } from "@/app/fonts/lato";
import VideoPlayer from "@/app/components/videoComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { GetVideoContext } from "@/app/hooks/VideoContext";

export default function Content() {
    const [show, setShow] = useState<boolean>(false)
    const VideoContext = GetVideoContext()
    const step_2_video = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step2'))
    const [cookie, setCookie] = useCookies(['step-2-watched'])
    useEffect(() => {
        if (cookie["step-2-watched"]) {
            setShow(true)
        }
    }, [cookie])
    const handleVideoEnd = () => {
        setShow(true)
        setCookie("step-2-watched", "true", { path: '/', maxAge: 24 * 365 * 3600 })
    }
    return <>
        <VideoPlayer videoID={step_2_video?.id} playBackId={step_2_video?.mux_playback_id} handleVideoProgress={handleVideoEnd} />
        <div className={`flex-col w-full mt-8`}>
            <p className={`text-white ${lato.className} text-center`}>Once you have <span className="font-medium text-[#d7b398]">watched the videos</span> above click the button below to book your call</p>
            <div className="flex mt-8 flex-col md:flex-row">
                <Link href={'/work-with-me/step-1'} className="px-6 py-3 bg-white text-pink-500 hover:bg-gray-200 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">&lt; Previous</Link>
                {!show && <Button disabled className={'px-6 py-3 bg-white text-pink-500 hover:bg-gray-200 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3'}>Book Call</Button>}
                <Link href={'/work-with-me/book'} className={`${show ? 'block' : 'hidden'} px-6 py-3 bg-white text-pink-500 hover:bg-gray-200 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3`}>Book Call</Link>
            </div>
        </div>
    </>
}
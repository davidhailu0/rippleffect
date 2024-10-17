'use client'
import { lato } from "@/app/fonts/lato";
import VideoPlayer from "@/app/components/videoComponent";
import Link from "next/link";
import { useState } from "react";

export default function Content() {
    const [show, setShow] = useState<boolean>(false)

    const handleVideoEnd = () => {
        setShow(true)
    }
    return <>
        <VideoPlayer playBackId="ZflXYEAaVp8GzS7wfucCJ3l7R9c5p101qXI1yg3QEZhk" onVideoEnd={handleVideoEnd} />
        <div className={`flex-col mt-4 md:mt-7 ${!show ? 'hidden' : 'flex'}`}>
            <p className={`text-white ${lato.className} text-center`}>Once you have <span className="font-medium text-[#d7b398]">watched the videos</span> click the button below to continue to step 2</p>
            <Link href={'/step-2'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">Next &gt;</Link>
        </div>
    </>
}
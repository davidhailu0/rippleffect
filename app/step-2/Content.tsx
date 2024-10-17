'use client'
import { lato } from "@/app/fonts/lato";
import Image from "next/image";
import VideoPlayer from "@/app/components/videoComponent";
import Link from "next/link";
import { useState } from "react";

export default function Content() {
    const [show, setShow] = useState<boolean>(false)

    const handleVideoEnd = () => {
        setShow(true)
    }
    return <>
        <VideoPlayer onVideoEnd={handleVideoEnd} playBackId="ZflXYEAaVp8GzS7wfucCJ3l7R9c5p101qXI1yg3QEZhk" />
        <div className={`${show ? 'flex' : 'hidden'} flex-col w-full mt-8`}>
            <p className={`text-white ${lato.className} text-center`}>Once you have <span className="font-medium text-[#d7b398]">watched the videos</span> above click the button below to book your call</p>
            <div className="flex mt-8 flex-col md:flex-row">
                <Link href={'/step-2'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border pt-3">&lt; Previous</Link>
                <Link href={'/book'} className="bg-gradient-to-r from-[#18455F] to-black h-12 rounded-[50px] text-white font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border flex items-center justify-center">Book your Call<Image src='/Call.png' alt="Call" className="inline ml-4" height={32} width={32} unoptimized /></Link>
                <Link href={'/book'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border pt-3">Next &gt;</Link>
            </div>
        </div>
    </>
}
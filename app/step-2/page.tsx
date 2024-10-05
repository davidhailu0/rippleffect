import { lato } from "@/app/fonts/lato";
import Image from "next/image";
import VideoPlayer from "@/app/components/videoComponent";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-7 mt-7 items-center w-full md:w-9/12 mx-auto px-4">
                <p className="text-4xl font-bold text-white mb-9">Step 2</p>
                <VideoPlayer src="https://storage.googleapis.com/msgsndr/C6nqv5N0ZUkTMUIxNoYx/media/6638c58eb478503bf929064b.mp4" />
                <div className="flex flex-col w-full mt-8">
                    <p className={`text-white ${lato.className} text-center`}>Once you have <span className="font-medium text-[#d7b398]">watched the videos</span> above click the button below to book your call</p>
                    <div className="flex mt-8 flex-col md:flex-row">
                        <Link href={'/step-2'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border pt-3">&lt; Previous</Link>
                        <Link href={'/book'} className="bg-gradient-to-r from-[#18455F] to-black h-12 rounded-[50px] text-white font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border flex items-center justify-center">Book your Call<Image src='/Call.png' alt="Call" className="inline ml-4" height={32} width={32} unoptimized /></Link>
                        <Link href={'/book'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto md:mb-7 text-center box-border pt-3">Next &gt;</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

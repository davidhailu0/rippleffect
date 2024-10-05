import { lato } from "@/app/fonts/lato";
import VideoPlayer from "@/app/components/videoComponent";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-7 mt-7 items-center w-full px-4 md:w-[73%] md:px-0 mx-auto">
                <p className="text-4xl font-bold text-white mb-4 md:mb-9">YOOOOOO</p>
                <VideoPlayer src="https://storage.googleapis.com/msgsndr/C6nqv5N0ZUkTMUIxNoYx/media/6638c58eb478503bf929064b.mp4" />
                <div className="flex flex-col mt-4 md:mt-7">
                    <p className={`text-white ${lato.className} text-center`}>Once you have <span className="font-medium text-[#d7b398]">watched the videos</span> click the button below to continue to step 2</p>
                    <Link href={'/step-2'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">Next &gt;</Link>
                </div>
            </div>
        </>
    );
}

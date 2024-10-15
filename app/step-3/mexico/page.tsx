'use client'
import Image from "next/image";
import VideoPlayer from "@/app/components/videoComponent";
import Navbar from "@/app/components/Navbar";
import Button from "@/app/components/Button";
import Logo from "@/app/components/LogoComponent";
import { useEffect, useRef, useState } from "react";
import { Id, ToastContainer, toast } from 'react-toastify';

export default function Home() {
    const [videoWatched, setVideoWatched] = useState<number>(0);
    const toastID = useRef<Id | null>(null)
    useEffect(() => {
        toastID.current = toast.warn("Please Watch All the Videos", { icon: false, autoClose: false, onClose: () => toast.dismiss(toastID.current!) })
    }, [])
    const handleVideoEnd = () => {
        setVideoWatched(prev => prev + 1)
    }
    return (
        <>
            <ToastContainer position="top-center" theme="colored" />
            <Logo />
            <Navbar />
            <div className="flex flex-col gap-5 mt-7 items-center w-full md:w-9/12 mx-auto px-2">
                <Image src={'/mexico.png'} alt='EU' height={100} width={100} unoptimized />
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
                <VideoPlayer onVideoEnd={handleVideoEnd} src="https://storage.googleapis.com/msgsndr/C6nqv5N0ZUkTMUIxNoYx/media/6638c58eb478503bf929064b.mp4" />
                <p className="text-2xl font-bold text-white my-4">2. The Best Product I have found so far</p>
                <VideoPlayer onVideoEnd={handleVideoEnd} src="https://storage.googleapis.com/msgsndr/C6nqv5N0ZUkTMUIxNoYx/media/6638c58eb478503bf929064b.mp4" />
                <p className="text-2xl font-bold text-white my-4">3. The Perfect Business Model</p>
                <VideoPlayer onVideoEnd={handleVideoEnd} src="https://storage.googleapis.com/msgsndr/C6nqv5N0ZUkTMUIxNoYx/media/6638c58eb478503bf929064b.mp4" />
                <p className="text-2xl font-bold text-white my-4">4. My Best Strategy to get Started</p>
                <VideoPlayer onVideoEnd={handleVideoEnd} src="https://storage.googleapis.com/msgsndr/C6nqv5N0ZUkTMUIxNoYx/media/6638c58eb478503bf929064b.mp4" />
                <p className={`${videoWatched == 4} text-md text-gray-200 mb-5`}>Make sure to watch all videos before you call if not you will not be able to understand my business or ask the right question</p>
                <div className={`${videoWatched == 4 ? 'flex' : 'hidden'} justify-between w-full md:w-1/2`}>
                    <Button title="f Join our Facebook Group" type="button" />
                    <Button title="Next >" type="button" />
                </div>
            </div>
        </>
    );
}

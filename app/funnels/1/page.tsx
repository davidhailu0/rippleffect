'use client'
import Image from "next/image";
import VideoPlayer from "@/app/components/videoComponent";
import SignUpForm from "@/app/components/SignUp";
import Logo from "@/app/components/LogoComponent";
import { GetVideoContext } from "@/app/components/VideoContext";

export default function Home({
    params,
}: {
    params?: {
        ref?: string;
    };
}) {
    const ref = params?.ref;
    const videoContext = GetVideoContext()
    const landing_page = videoContext?.videos.find(({ tag_list }) => tag_list.includes('landing'))
    return (
        <div className="flex flex-col items-center w-full min-h-screen py-8 px-4">

            {/* Logo */}
            <Logo />

            {/* Main Container */}
            <div className="flex flex-col gap-6 md:gap-8 items-center w-full max-w-6xl mx-auto">

                {/* Headline */}
                <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
                    Create your FREE account NOW!!
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-gray-300 text-center px-2 md:px-0 leading-7 font-medium mb-4">
                    Create Your Account Below and{' '}
                    <span className="text-[#d7b398]">Get Free Access</span> to my Sales System that allows you to attract, capture, and generate leads on autopilot.
                </p>

                {/* Video Player */}
                <VideoPlayer playBackId={landing_page!.mux_playback_id} />

                {/* Note */}
                <p className="text-base md:text-lg text-gray-400 font-medium leading-6 mt-4 md:mt-8 text-center">
                    (No previous experience or technical skills required)
                </p>

                {/* Sign-Up Form */}
                <SignUpForm
                    ref_code={ref} />

                {/* Student Count */}
                <div className="flex gap-2 md:gap-4 items-center flex-col md:flex-row mt-6">
                    <Image
                        src="/customer.png"
                        alt="Customers"
                        height={42}
                        width={120}
                        unoptimized
                        className="mx-auto"
                    />
                    <p className="text-white text-center md:text-left font-medium">
                        Join our <span className="font-bold">20,000+</span> students worldwide
                    </p>
                </div>
            </div>
        </div>
    );
}

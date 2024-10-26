import { lato } from "@/app/fonts/lato";
import Image from "next/image";
import VideoPlayer from "@/app/components/videoComponent";
import SignUpForm from "@/app/components/SignUp";
import Logo from "@/app/components/LogoComponent";

export default function Home({
    params,
}: {
    params?: {
        ref?: string;
    };
}) {
    const ref = params?.ref;
    return (
        <div className="flex flex-col items-center min-h-screen py-8 px-4">

            {/* Main Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start w-full mx-auto px-4">

                {/* Registration Section */}
                <div className="flex flex-col items-center mt-6 md:mt-0">

                    {/* Logo */}
                    <Logo className="mb-4" />

                    {/* Headline */}
                    <h1 className="text-xl md:text-3xl font-bold text-white text-center mb-4">
                        Create your FREE account NOW!!
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-gray-300 text-center px-2 leading-7 font-medium mb-4">
                        Create Your Account Below and{' '}
                        <span className="text-[#d7b398]">Get Free Access</span> to my Sales System that allows you to attract, capture, and generate leads on autopilot.
                    </p>

                    {/* Note */}
                    <p className="text-base text-gray-400 text-center w-10/12 md:w-9/12 font-medium mb-6">
                        (No previous experience or technical skills required)
                    </p>

                    {/* Sign-Up Form */}
                    <SignUpForm ref_code={ref} />
                </div>

                {/* Video Player */}
                <div className="col-span-1 flex justify-center md:max-h-[90%]">
                    <VideoPlayer
                        className="w-full h-auto rounded-lg overflow-hidden"
                        playBackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
                    />
                </div>

                {/* Student Count Section */}
                <div className="flex col-span-1 md:col-span-2 gap-2 md:gap-4 items-center justify-center mt-8">
                    <Image
                        src="/customer.png"
                        alt="Customers"
                        height={42}
                        width={120}
                        unoptimized
                    />
                    <p className="text-white text-center font-medium">
                        Join our <span className="font-bold">20,000+</span> students worldwide
                    </p>
                </div>
            </div>
        </div>
    );
}
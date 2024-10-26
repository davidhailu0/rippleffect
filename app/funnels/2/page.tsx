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

            {/* Logo */}
            <Logo />

            {/* Main Container */}
            <div className="flex flex-col gap-6 md:gap-8 items-center w-full max-w-6xl mx-auto mt-3 md:mt-10">

                {/* Video Player */}
                <VideoPlayer playBackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs" />

                {/* Headline */}
                <h1 className="text-2xl md:text-4xl font-bold text-white mt-4 text-center">
                    Create your FREE account NOW!!
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-gray-300 text-center px-2 md:px-0 leading-7 font-medium mb-4">
                    Create Your Account Below and{' '}
                    <span className="text-[#d7b398]">Get Free Access</span> to my Sales System that allows you to attract, capture, and generate leads on autopilot.
                </p>

                {/* Note */}
                <p className="text-base text-gray-400 font-medium leading-6 text-center mx-auto w-11/12 md:w-9/12">
                    (No previous experience or technical skills required)
                </p>

                {/* Sign-Up Form */}
                <SignUpForm ref_code={ref} />

                {/* Student Count Section */}
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
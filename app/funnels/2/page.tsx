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
        <>
            <Logo />
            <div className="flex flex-col gap-4 md:gap-7 mt-3 md:mt-10 items-center w-[95%] md:w-[73%] mx-auto">
                <VideoPlayer playBackId="ZflXYEAaVp8GzS7wfucCJ3l7R9c5p101qXI1yg3QEZhk" onVideoEnd={() => { }} />
                <p className="text-xl md:text-4xl font-bold text-white mt-4">Create your FREE account NOW!!</p>
                <p className={`${lato.className} text-[rgba(255,255,255,0.57)] text-center text-lg px-4 md:px-0 leading-7 md:text-lg font-medium md:leading-[23.4px] mb-4`}>Create Your Account Below and <span className="text-[#d7b398]">Get Free Access</span> to my Sales System that allows you to attract, capture and generate leads on autopilot.</p>
                <p className={`${lato.className} text-[rgba(255,255,255,0.57)] text-base mx-auto w-9/12 font-medium leading-[37.7px] mt-3 text-center`}>(No previous experience or technical skills required)</p>
                <SignUpForm ref_code={ref} />
                <div className="flex gap-1 md:gap-4 items-center flex-col md:flex-row">
                    <Image src='/customer.png' alt='Customers' height={42} width={120} unoptimized />
                    <p className="text-white font-">Join our <span className="font-medium">20,000+</span> students worldwide</p>
                </div>
            </div>
        </>
    );
}
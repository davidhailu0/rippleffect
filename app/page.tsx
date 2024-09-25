import { lato } from "@/app/fonts/lato";
import Image from "next/image";
import VideoPlayer from "@/app/components/videoComponent";
import SignUpForm from "@/app/components/SignUp";

export default function Home() {
  return (
    <div className="flex flex-col gap-7 mt-7 items-center h-full w-[1120px] mx-auto">
      <p className="text-4xl font-bold text-white">Create your FREE account NOW!!</p>
      <p className={`${lato.className} text-[rgba(255,255,255,0.57)] text-lg font-medium leading-[23.4px] mb-9`}>Create Your Account Below and <span className="text-[#d7b398]">Get Free Access</span> to my Sales System that allows you to attract, capture and generate leads on autopilot.</p>
      <VideoPlayer src="https://storage.googleapis.com/msgsndr/C6nqv5N0ZUkTMUIxNoYx/media/6638c58eb478503bf929064b.mp4" />
      <p className={`${lato.className} text-[rgba(255,255,255,0.57)] text-base font-medium leading-[37.7px] mt-9 mb-4`}>(No previous experience or technical skills required)</p>
      <SignUpForm />
      <div className="flex gap-4 items-center">
        <Image src='/customer.png' alt='Customers' height={42} width={120} />
        <p className="text-white font-">Join our <span className="font-medium">20,000+</span> students worldwide</p>
      </div>
    </div>
  );
}

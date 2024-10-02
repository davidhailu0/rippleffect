import Image from "next/image"
export default function Questionnaire() {
    return <div className="flex flex-col gap-3 mt-7 items-center w-full mx-auto px-2 md:px-0">
        <p className="text-2xl md:text-4xl font-bold text-white">Wait...</p>
        <p className="text-xl md:text-2xl font-bold text-white text-center">To validate your call,we <span className="text-[#d7b398]">need</span> to ask you a <span className="text-[#d7b398]">few questions</span>.</p>
        <p className="text-xl md:text-2xl font-bold text-white text-center">This will help us get to know you better and allow us to tailor this conversation <span className="text-[#d7b398]">based on your needs</span></p>
        <div className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5">
            <div className="h-auto w-full mx-auto flex flex-col gap-7 bg-white px-8 py-10">
                <Image src="/logo.png" alt="logo.png" height={106} width={100} className="mx-auto" />
                <video controls autoPlay className="h-[300px] md:h-[500px]"></video>
                <p className="text-blue-400">
                    1. Where are you in your life?
                </p>
                <input className="outline-none border-b border-b-black " />
            </div>
            <div className="w-full h-16 bg-blue-500 flex justify-end items-center">
                <button className="text-white h-full w-48 bg-blue-700">Next -&gt;</button>
            </div>
        </div>
    </div>
}
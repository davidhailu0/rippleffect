import DisplayQuestion from "@/app/(protected)/questionnaire/_component/DisplayQuestion";
import Logo from "@/app/components/LogoComponent";

export default function Questionnaire() {
    return <>
        <Logo />
        <div className="flex flex-col gap-3 mt-7 items-center w-full mx-auto px-2 md:px-0">
            <p className="text-2xl md:text-4xl font-bold text-white">Wait...</p>
            <p className="text-xl md:text-2xl font-bold text-white text-center">To validate your call,we <span className="text-[#d7b398]">need</span> to ask you a <span className="text-[#d7b398]">few questions</span>.</p>
            <p className="text-xl md:text-2xl font-bold text-white text-center">This will help us get to know you better and allow us to tailor this conversation <span className="text-[#d7b398]">based on your needs</span></p>
            <DisplayQuestion />
        </div>
    </>
}


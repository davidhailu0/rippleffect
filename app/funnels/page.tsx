import { lato } from "@/app/fonts/lato";
import ReferalComponent from "../components/ReferalCard";
import Navbar from "../components/Navbar";

export default function Funnel() {

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 md:gap-5 md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <p className="text-xl md:text-4xl font-bold text-white">Funnels</p>
                <p className={`${lato.className} text-[rgba(255,255,255,0.57)] md:text-center text-lg px-0 leading-7 md:text-lg font-medium md:leading-[23.4px] mb-4 md:mb-9`}>Choose your favorite Landing Page and Copy Your Personal Link</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full gap-y-7">
                    <ReferalComponent />
                    <ReferalComponent />
                    <ReferalComponent />
                    <ReferalComponent />
                    <ReferalComponent />
                    <ReferalComponent />
                </div>
            </div>
        </>
    );
}

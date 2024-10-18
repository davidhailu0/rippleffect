import { lato } from "@/app/fonts/lato";
import Navbar from "@/app/components/Navbar";
import Logo from "@/app/components/LogoComponent";
import LeadsTable from "../components/table";

export default function Leads() {

    return (
        <>
            <Logo />
            <Navbar />
            <div className="flex flex-col gap-4 md:gap-5 md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <p className="text-xl md:text-4xl font-bold text-white">Your Lead List</p>
                <p className={`${lato.className} text-white md:text-center text-lg px-0 leading-7 md:text-lg font-medium md:leading-[23.4px]`}>Nate|nate@natewells.co.uk|Mar 2024</p>
                <p className="text-white text-lg">Referrer: No Referrer</p>
                <LeadsTable />
            </div>
        </>
    );
}

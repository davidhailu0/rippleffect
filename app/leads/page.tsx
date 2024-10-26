import Navbar from "@/app/components/Navbar";
import Logo from "@/app/components/LogoComponent";
import LeadsTable from "../components/table";
import ShowName from "../components/ShowName";

export default function Leads() {

    return (
        <>
            <Logo />
            <Navbar />
            <div className="flex flex-col gap-4 md:gap-5 md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <p className="text-xl md:text-4xl font-bold text-white">Your Lead List</p>
                <ShowName />
                <p className="text-white text-lg">Referrer: No Referrer</p>
                <LeadsTable />
            </div>
        </>
    );
}



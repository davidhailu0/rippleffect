import { Suspense } from "react";
import { lato } from "@/app/fonts/lato";
import Navbar from "../components/Navbar";
import MembersTable from "../components/table";
import Pagination from "../components/pagination";

export default function Members() {

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 md:gap-5 md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <p className="text-xl md:text-4xl font-bold text-white">Your Lead List</p>
                <p className={`${lato.className} text-white md:text-center text-lg px-0 leading-7 md:text-lg font-medium md:leading-[23.4px]`}>Nate|nate@natewells.co.uk|Mar 2024</p>
                <p className="text-white text-lg">Referrer: No Referrer</p>
                <div className="mt-5 flex w-full justify-start">
                    <Suspense>
                        <Pagination totalPages={11} />
                    </Suspense>
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                    <button className="text-black bg-white h-12 w-32">CSV</button>
                    <button className="text-black bg-white h-12 w-32">EXCEL</button>
                    <button className="text-black bg-white h-12 w-32">PDF</button>
                </div>
                {/* <MembersTable currentPage={1} /> */}
                <MembersTable />
            </div>
        </>
    );
}

'use client'

import { useAppSelector } from "@/lib/reduxStore/hooks";

export default function ShowName() {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const lead = useAppSelector((state) => state.auth.lead);

    return <p className={`my-4 text-white text-lg px-0 leading-7 md:text-lg font-medium md:leading-[23.4px]`}>{lead?.first_name ? lead?.first_name + " " + lead?.last_name : ""} | {lead?.email_address ? lead?.email_address : ""} | {month + ' ' + year}</p>
}
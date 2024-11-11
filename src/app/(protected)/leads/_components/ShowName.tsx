'use client'
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function ShowName() {
    const [info, setInfo] = useState({ name: '', email: '' });
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    useEffect(() => {
        setInfo({ name: Cookies.get("name") as string, email: Cookies.get("email") as string });
    }, [])
    return <p className={`my-4 text-white text-lg px-0 leading-7 md:text-lg font-medium md:leading-[23.4px]`}>{info.name}|{info.email}|{month + ' ' + year}</p>
}
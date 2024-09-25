import { MouseEventHandler } from "react";

export default function Button({ title, type, callBack }: { title: string, type: "submit" | "reset" | "button", callBack?: MouseEventHandler }) {
    return <button type={type} onClick={callBack} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center">{title} </button>
}
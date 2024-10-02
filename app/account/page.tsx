'use client'
import { useState } from "react";
import { lato } from "@/app/fonts/lato";
import { InformationCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import clsx from 'clsx'
import Navbar from "../components/Navbar";

export default function Members() {
    const [active, setActive] = useState<string>('information')
    return (
        <>
            <Navbar />
            <div className="flex flex-col md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <p className="text-xl md:text-4xl font-bold text-white mb-4 md:mb-5">Account</p>
                <p className={`${lato.className} text-white text-center text-lg px-4 md:px-0 leading-7 md:text-lg font-medium md:leading-[23.4px] mb-4 md:mb-5`}>Set up your account detail and public profile</p>
                <div className="flex w-full">
                    <button onClick={() => setActive('information')} className={clsx('h-14 w-1/2 md:w-40 flex items-center gap-2 justify-center', { 'bg-white text-black': active == 'information', 'bg-transparent text-white': active != 'information' })}>
                        <InformationCircleIcon className="h-7" />
                        Information
                    </button>
                    <button onClick={() => setActive('edit')} className={clsx('h-14 w-1/2 md:w-40 flex items-center gap-2 justify-center', { 'bg-transparent text-white': active == 'information', 'bg-white text-black': active != 'information' })}>
                        <PencilIcon className="h-7" />
                        Edit
                    </button>
                </div>
                <div className="border border-white h-auto w-full py-7">
                    {active == 'information' ? <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-y-10">
                        <DisplayCardInfo image="/profile-setting.png" type="Name" data="Nate Wells" />
                        <DisplayCardInfo image="/userEdit.png" type="Username" data="Nate" />
                        <DisplayCardInfo image="/website.png" type="Website" data="https://netlify.app" />
                        <DisplayCardInfo image="/website.png" type="Scheduler URL" data="https://netlify.app" />
                        <DisplayCardInfo image="/" type="Leader" data="No Leader" />
                    </div> :
                        <EditProfile />
                    }
                </div>
            </div>
        </>
    );
}


const EditProfile = () => {
    return <form className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-6 w-full md:w-11/12 mx-auto">
        <InputField name="firstName" type="text" value="Nate" />
        <InputField name="lastname" type="text" value="Wells" />
        <InputField name="email" type="email" value="nate@nate.com" />
        <InputField name="Public URL" type="text" value="https://www.netlify.app.com" />
        <textarea name="bio" cols={20} rows={10} placeholder="Bio" className="col-span-1 md:col-span-2 outline-none p-2"></textarea>
        <button type="submit" className="h-14 w-full md:w-56 text-white bg-black">Save Profile</button>
    </form>
}

const DisplayCardInfo = ({ image, type, data }: { image: string, type: string, data: string }) => {
    return <div className="flex flex-col gap-4 items-center h-auto">
        <Image src={image} alt={type} height={150} width={150} />
        <p className="text-white text-lg font-bold text-center">{type}</p>
        <p className="text-white text-lg text-center">{data}</p>
    </div>
}

const InputField = ({ name, type, value }: { name: string, type: string, value: string }) => {
    return <input name={name} type={type} defaultValue={value} className="bg-white outline-none text-gray-500 h-12 rounded-md w-full p-2" />
}
'use client'
import { ChangeEvent, MouseEventHandler, useState, MouseEvent } from "react";
import Image from "next/image"
import Calendar from "react-calendar";
import TextField from "./TextField";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { Availablities } from "../lib/models";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function BookCallForm({ availablities, currentDate }: { availablities: Availablities, currentDate?: string | null }) {
    const dateParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter()
    const [value, onChange] = useState<Value>(null);
    const [timezone, setTimeZone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [selectedTime, setSelectedTime] = useState<{ start_time: string, end_time: string } | undefined>({ start_time: '', end_time: '' })
    const [timeSelected, setTimeSelected] = useState<boolean>(false)

    const handleTimezoneChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTimeZone(e.target.value)
    }

    const goToQuestionnaire = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push('/questionnaire')
    }

    const bookSession = async () => {
        const token = Cookies.get('token')
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}api/v1/bookings`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Origin': window.location.origin,
                        'Authorization': token || ''
                    },
                    body: JSON.stringify(selectedTime)
                })
            const respJson = await resp.json()
            if (respJson.message) {
                Cookies.set('booked', "true", { path: '/', expires: getDayDifference(selectedTime!.start_time, new Date()) })
            }
        }
        catch (e) {
            console.error(e)
        }

    }


    return <div className="h-auto w-full md:w-2/3 bg-[#4B7A87] rounded flex flex-col md:mx-auto p-6 mx-2">
        <div className="h-20 w-20 bg-white rounded-full">
            <Image src='/logo.png' alt='logo' height={127} width={120} unoptimized />
        </div>
        <p className="text-white font-bold text-xl my-4">Booking Plan Call</p>
        <div className="border border-white rounded bg-transparent h-auto w-full flex flex-col gap-2 py-6 px-2 md:px-4">
            <ImageWithLabel image="/clock.png" label="60 mins" />
            {value && <ImageWithLabel image="/date.png" label={new Date(value.valueOf() as number).toDateString()} />}
            {value && <ImageWithLabel image="/globe.png" label={timezone} />}
            <ImageWithLabel image="/list.png" label="Schedule a time that works best for you. Be sure to choose the correct time-zone at a bottom of a calendar. Please complete the questionnaire. So that we have the data the data needed to help you best" />
        </div>
        <div className="flex gap-6 my-7 items-end">
            <Image src={'/user.png'} alt="User" height={25} width={25} unoptimized />
            <p className="text-white">Any Available</p>
        </div>
        {!timeSelected && <p className="text-white font-bold text-xl py-4">Select Date and Time</p>}
        <div className="w-full flex flex-col md:flex-row">
            {!timeSelected && <Calendar value={value} activeStartDate={currentDate ? new Date(currentDate) : new Date()} onActiveStartDateChange={({ action, activeStartDate }) => {
                if (action == 'next') {
                    const params = new URLSearchParams(dateParams);
                    params.set('date', activeStartDate?.toLocaleDateString('en-CA') || '');
                    router.replace(`${pathname}?${params.toString()}`);
                }
            }} onChange={onChange} allowPartialRange={true} className={'bg-transparent text-white w-full md:w-1/2'} calendarType="gregory" minDate={new Date()} tileDisabled={({ activeStartDate, date }) =>
                date.getMonth() != activeStartDate.getMonth() || !Object.keys(availablities).includes(date.toLocaleDateString('en-CA'))
            } />}
            {!timeSelected && value && <div className={`w-full md:w-1/2 grid grid-cols-2 text-white items-center gap-2 pt-3 pl-6`}>
                {
                    availablities[new Date(value.toString()).toLocaleDateString('en-CA')].map(({ start_time, end_time }) => <div key={start_time} className="flex gap-2 h-12 w-48 border border-[#d7b398] rounded-sm shadow-lg transition ease-in-out duration-200">
                        <button className={`h-full ${selectedTime?.start_time == start_time ? 'w-1/2' : 'w-full'} ${selectedTime?.start_time == start_time ? 'bg-blue-400' : 'bg-transparent'} transition ease-in-out duration-500`} onClick={() => setSelectedTime({ start_time, end_time })}>{`${new Date(start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - ${new Date(end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}</button>
                        <button className={`w-1/2 ${selectedTime?.start_time == start_time ? 'inline' : 'hidden'} h-full bg-[#d7b398] transition ease-in-out duration-500`} onClick={() => {
                            bookSession()
                            setTimeSelected(true)
                        }}>Select</button>
                    </div>)
                }
            </div>}
        </div>
        {!timeSelected && <div className="flex flex-col text-white mt-4">
            <p className="text-md mb-3">Time zone</p>
            <select className="bg-transparent h-12 w-full md:w-96 border border-white outline-none" value={timezone} onChange={handleTimezoneChange}>
                <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                <option value="America/Anchorage">(GMT-09:00) Alaska</option>
                <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                <option value="America/Denver">(GMT-07:00) Mountain Time (US & Canada)</option>
                <option value="America/Chicago">(GMT-06:00) Central Time (US & Canada)</option>
                <option value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</option>
                <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                <option value="Atlantic/Reykjavik">(GMT+00:00) Iceland</option>
                <option value="Europe/London">(GMT+00:00) London</option>
                <option value="Europe/Berlin">(GMT+01:00) Berlin, Paris</option>
                <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                <option value="Europe/Moscow">(GMT+03:00) Moscow</option>
                <option value="Asia/Dubai">(GMT+04:00) Dubai</option>
                <option value="Asia/Karachi">(GMT+05:00) Karachi</option>
                <option value="Asia/Dhaka">(GMT+06:00) Dhaka</option>
                <option value="Asia/Bangkok">(GMT+07:00) Bangkok</option>
                <option value="Asia/Shanghai">(GMT+08:00) Beijing, Shanghai</option>
                <option value="Asia/Tokyo">(GMT+09:00) Tokyo</option>
                <option value="Australia/Sydney">(GMT+10:00) Sydney</option>
                <option value="Pacific/Auckland">(GMT+12:00) Auckland</option>
            </select>
        </div>}
        {timeSelected && <ScheduleMeetingRegistration callBack={goToQuestionnaire} />}
    </div>
}

function ImageWithLabel({ image, label }: { image: string, label: string | Value }) {
    return <div className="flex bg-transparent items-start gap-2">
        <Image src={image} alt={image} height={30} width={30} className=" items-start object-contain" unoptimized />
        <p className="text-white text-sm leading-6 font-light">{label?.toString()}</p>
    </div>
}

function ScheduleMeetingRegistration({ callBack }: { callBack: MouseEventHandler<HTMLButtonElement> }) {
    return <form className="grid grid-cols-2 grid-rows-4 gap-x-10 gap-y-6 text-white">
        <div className="flex flex-col ">
            <label htmlFor="firstName">First Name</label>
            <TextField name="firstName" placeholder="First Name" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <TextField name="lastName" placeholder="Last Name" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <TextField name="email" placeholder="Email" type="email" />
        </div>
        <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <TextField name="phone" placeholder="Phone" type="tel" />
        </div>
        <div className="flex col-span-2 items-start gap-3">
            <input name="lastName" type="checkbox" className="mt-2" />
            <p className="text-black font-bold">I agree to <span className="text-blue-700"> the terms and conditions </span>provided by the company. By providing my phone number, I agree to receive text messages from the business</p>
        </div>
        <button onClick={callBack} type="submit" className="col-span-2 rounded-xl bg-[#d7b398] h-16 w-52 justify-self-end">Schedule Meeting</button>
    </form>
}

function getDayDifference(date1: Date | string, date2: Date | string): number {
    const msInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime()); // Absolute difference in milliseconds
    return Math.floor(diffInMs / msInDay); // Convert to days
}
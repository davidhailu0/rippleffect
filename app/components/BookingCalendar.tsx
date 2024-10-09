'use client'
import React, { useEffect, useState } from 'react';
import Calendar from "react-calendar";
import Cookies from "js-cookie";
import { Availablities, TimezoneOption } from '../lib/models';
import TimezoneSelect from './TimeZoneSelect';
import { fetchAvailableDates } from '../lib/actions';
import { CalendarSkeleton } from './Skeleton';
import { useRouter } from 'next/navigation';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const timezoneOptions: TimezoneOption[] = Intl.supportedValuesOf('timeZone').map((tz) => ({
    value: tz,
    label: tz.replace('_', ' '),
}));

const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const BookingCalendar: React.FC = () => {
    const [value, onChange] = useState<Value>(null);
    const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption | null>(null);
    const [hourFormat, setHourFormat] = useState<string>('12')
    const [availablities, setAvailablities] = useState<Availablities | null>(null)
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [showRegistration, setShowRegistration] = useState<boolean>(false)

    async function fetchAvailablities(date: Date) {
        setAvailablities(null)
        const dates = await fetchAvailableDates(date.getMonth() + 1, date.getFullYear())
        if (Object.keys(dates).includes(new Date().toLocaleDateString('en-CA'))) {
            onChange(new Date())
            setCurrentDate(new Date())
        }
        else {
            for (const dt of Object.keys(dates)) {
                if (new Date().getTime() < new Date(dt).getTime()) {
                    onChange(new Date(dt))
                    setCurrentDate(new Date(dt))
                    break
                }
            }
        }
        setAvailablities(dates)

    }

    useEffect(() => {

        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezone = timezoneOptions.find((tz) => tz.value === userTimezone);

        if (timezone) {
            setSelectedTimezone(timezone);
        }
        fetchAvailablities(new Date())
    }, []);

    if (!availablities) return <CalendarSkeleton />;

    const handleTimezoneChange = (option: TimezoneOption | null) => {
        setSelectedTimezone(option);
    };


    const bookSession = async ({ start_time, end_time }: { start_time: string, end_time: string }) => {
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
                    body: JSON.stringify({ start_time, end_time })
                })
            const respJson = await resp.json()
            if (respJson.message) {
                Cookies.set('booked', "true", { path: '/', expires: getDayDifference(start_time, new Date()) })
            }
            setShowRegistration(true)
        }
        catch (e) {
            console.error(e)
        }

    }

    const goBack = () => {
        setShowRegistration(false)
    }

    return (
        <>
            {!showRegistration ?
                <div className="flex space-x-4 p-6 bg-gray-900 text-white h-auto w-2/3 rounded-md">
                    <div className="w-1/4 border-l-gray-500">
                        <h2 className="text-lg font-semibold">60 Min Meeting</h2>
                        <p className="mt-2 text-gray-400">60m</p>
                        <p className="my-2">🗓️ Google Meet</p>
                        <TimezoneSelect selectedTimezone={selectedTimezone} handleTimezoneChange={handleTimezoneChange} />
                    </div>

                    <div className="w-1/2">
                        <Calendar value={value} calendarType="gregory"
                            tileContent={({ date }) => date.toLocaleDateString() === new Date().toLocaleDateString() ? <div className='h-2 w-2 absolute left-[44%] rounded-full bg-white'></div> : null}
                            activeStartDate={currentDate}
                            onActiveStartDateChange={({ action, activeStartDate }) => {
                                if (action == 'next') {
                                    fetchAvailablities(activeStartDate!)
                                }
                            }} onChange={onChange} minDate={new Date()} tileDisabled={({ activeStartDate, date }) =>
                                date.getMonth() != activeStartDate.getMonth() || !Object.keys(availablities).includes(date.toLocaleDateString('en-CA'))
                            }
                        />
                    </div>

                    <div className="w-1/4 pb-4">
                        <div className="flex justify-between mb-4 items-center">
                            <p className='text-white'><span className='font-bold text-lg'>{days[new Date(value!.toString()).getDay()]}</span> {new Date(value!.toString()).getDate()}</p>
                            <div className='p-2 border border-gray-500 rounded-lg flex gap-x-1'>
                                <button onClick={() => setHourFormat('12')} className={`px-3 py-1 rounded-md ${hourFormat === '12' ? 'bg-gray-600' : 'bg-gray-800'}`}>12h</button>
                                <button onClick={() => setHourFormat('24')} className={`px-3 py-1 rounded-md ${hourFormat === '24' ? 'bg-gray-600' : 'bg-gray-800'}`}>24h</button>
                            </div>
                        </div>
                        <div className="space-y-2 overflow-y-auto h-96 custom-scrollbar pr-1">
                            {availablities[new Date(value!.toString()).toLocaleDateString('en-CA')].map(({ start_time, end_time }) => (
                                <button
                                    key={start_time}
                                    onClick={() => bookSession({ start_time, end_time })}
                                    className={`w-full py-2 text-left px-3 rounded-md bg-[#1a1a1a] border border-gray-600 text-gray-300`}
                                >
                                    {new Date(start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: hourFormat === '12' ? true : false })}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                :
                <ScheduleMeetingRegistration callback={goBack} />}
        </>

    );
};

export default BookingCalendar;

function ScheduleMeetingRegistration({ callback }: { callback: () => void }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState(Cookies.get('email'))
    const [phone, setPhone] = useState('')
    const router = useRouter()

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.replace('/questionnaire')
    }
    return <form onSubmit={handleFormSubmit} className="grid grid-cols-2 grid-rows-4 gap-x-10 rounded-lg gap-y-6 text-white bg-gray-900 p-10">
        <div className="flex flex-col ">
            <label htmlFor="firstName">First Name</label>
            <TextField placeholder="First Name" value={firstName} onChange={setFirstName} />
        </div>
        <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <TextField placeholder="Last Name" value={lastName} onChange={setLastName} />
        </div>
        <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <TextField placeholder="Email" type="email" value={email!} onChange={setEmail} />
        </div>
        <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <TextField placeholder="Phone" type="tel" value={phone} onChange={setPhone} />
        </div>
        <div className="flex col-span-2 items-start gap-3">
            <input name="lastName" type="checkbox" className="mt-2" />
            <p className="text-white font-bold">I agree to <span className="text-blue-700"> the terms and conditions </span>provided by the company. By providing my phone number, I agree to receive text messages from the business</p>
        </div>
        <div className='col-span-2 flex justify-end gap-4'>
            <button type='button' onClick={callback} className="rounded-xl bg-white text-black h-16 w-52 justify-self-end">Back</button>
            <button type='submit' className="rounded-xl bg-[#d7b398] h-16 w-52 justify-self-end">Schedule Meeting</button>
        </div>
    </form>
}


function getDayDifference(date1: Date | string, date2: Date | string): number {
    const msInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime()); // Absolute difference in milliseconds
    return Math.floor(diffInMs / msInDay); // Convert to days
}

function TextField({ value, type, placeholder, hidden, onChange }: { value: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: string) => void }) {
    return <input value={value} type={type ? type : 'text'} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`h-12 text-white bg-transparent outline-none border-b-[1px] border-b-white focus:outline-1 focus:outline-white focus:border-b-0 placeholder:text-white ${hidden && 'hidden'}`} />
}
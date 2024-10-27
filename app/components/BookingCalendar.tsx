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

const timezoneOptions: TimezoneOption[] = Intl.supportedValuesOf('timeZone').map((tz) => {
    const currentDate = new Date(new Date().toLocaleDateString());
    const dateInTimezone = new Date(currentDate.toLocaleString('en-US', { timeZone: tz }));
    const utcOffsetMillis = dateInTimezone.getTime() - currentDate.getTime();

    return {
        value: tz,
        label: tz.replace('_', ' '),
        offsetFromUTC: utcOffsetMillis,
    };
});

const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const BookingCalendar: React.FC = () => {
    const [value, onChange] = useState<Value>(null);
    const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption | null>(null);
    const [hourFormat, setHourFormat] = useState<string>('12')
    const [availablities, setAvailablities] = useState<Availablities | null>(null)
    const [currentDate, setCurrentDate] = useState<Date>(new Date(new Date().toLocaleDateString()))
    const [showRegistration, setShowRegistration] = useState<boolean>(false)

    async function fetchAvailablities(date: Date) {
        setCurrentDate(date)
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
            const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/bookings`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token || '',
                        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN as string,
                    },
                    body: JSON.stringify({ start_time, end_time, "timezone": selectedTimezone?.value })
                })
            const respJson = await resp.json()
            if (respJson.message) {
                Cookies.set('bookedTime', start_time)
                setShowRegistration(true)
            }
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
                <div className="flex flex-col space-y-4 md:flex-row space-x-0 md:space-x-4 p-2 md:p-6 bg-white text-black h-auto w-11/12 md:w-2/3 rounded-md">
                    <div className="w-full md:w-1/4 border-l-gray-500">
                        <h2 className="text-lg font-semibold">60 Min Meeting</h2>
                        <p className="mt-2 text-gray-400">60m</p>
                        <p className="my-2">🗓️ Google Meet</p>
                        <TimezoneSelect selectedTimezone={selectedTimezone} handleTimezoneChange={handleTimezoneChange} />
                    </div>

                    <div className="w-full mx-0 md:w-1/2">
                        <Calendar value={value} calendarType="gregory"
                            tileContent={({ date }) => date.toLocaleDateString() === new Date().toLocaleDateString() ? <div className='h-2 w-2 absolute left-[44%] rounded-full bg-white'></div> : null}
                            activeStartDate={currentDate}
                            onActiveStartDateChange={({ action, activeStartDate }) => {
                                if (action === 'next') {
                                    fetchAvailablities(activeStartDate!)
                                }
                                else if (action === 'prev') {
                                    fetchAvailablities(activeStartDate!)
                                }
                            }} onChange={onChange} minDate={new Date()} tileDisabled={({ activeStartDate, date }) =>
                                date.getMonth() != activeStartDate.getMonth() || !Object.keys(availablities).includes(date.toLocaleDateString('en-CA'))
                            }
                        />
                    </div>

                    <div className="w-full md:w-1/4 pb-4">
                        <div className="flex justify-between mb-4 items-center">
                            {value && <p className='text-black'><span className='font-bold text-lg'>{days[new Date(value!.toString()).getDay()]}</span> {new Date(value!.toString()).getDate()}</p>}
                            <div className='p-2 border border-gray-500 rounded-lg flex gap-x-1'>
                                <button onClick={() => setHourFormat('12')} className={`px-3 py-1 rounded-md ${hourFormat === '12' ? 'bg-[#d7b398] text-white' : 'bg-white text-black'}`}>12h</button>
                                <button onClick={() => setHourFormat('24')} className={`px-3 py-1 rounded-md ${hourFormat === '24' ? 'bg-[#d7b398] text-white' : 'bg-white text-black'}`}>24h</button>
                            </div>
                        </div>
                        <div className="space-y-2 overflow-y-auto h-96 custom-scrollbar pr-1">
                            {value && availablities[new Date(value!.toString()).toLocaleDateString('en-CA')].map(({ start_time, end_time }) => new Date(currentDate.toLocaleString('en-US', { timeZone: selectedTimezone?.value })).getTime() <= new Date(start_time).getTime() ? (
                                <button
                                    key={start_time}
                                    onClick={() => bookSession({ start_time, end_time })}
                                    className={`w-full py-2 text-left px-3 rounded-md bg-[#d7b398] border border-[#d7b398] text-white`}
                                >
                                    {new Date(new Date(start_time).getTime() + selectedTimezone!.offsetFromUTC).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: hourFormat === '12' ? true : false })}
                                </button>
                            ) : null)}
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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const id = Cookies.get('id')
        const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token || '',
                'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN as string,
            },
            body: JSON.stringify({
                "lead": {
                    "email": email,
                    "first_name": firstName,
                    "last_name": lastName,
                    "phone": phone,
                    "terms_accepted": true
                }
            })
        })
        const respJson = await resp.json()
        if (respJson.message === 'Lead has been updated.') {
            Cookies.set('name', firstName, { path: '/', expires: 365 * 10 })
            Cookies.set('booked', "true", { path: '/', expires: getDayDifference(Cookies.get("bookedTime")!, new Date()) + 1 })
            router.replace('/questionnaire')
        }
    }
    return <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Information</h2>

        <form id="user-form" onSubmit={handleFormSubmit} className="space-y-4">
            <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" id="first-name" name="first-name" required
                    className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" id="last-name" name="last-name" required
                    className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" required
                    className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={email!} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" name="phone" required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-[#d7b398]"
                    placeholder="123-456-7890" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="flex items-start mt-4">
                <input type="checkbox" id="terms" name="terms" required
                    className="h-4 w-4 text-blue-600 focus:ring-[#d7b398] border-gray-300 rounded mt-0.5" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the <span className="text-blue-600 underline">terms and conditions</span> provided by the company. By providing my phone number, I agree to receive text messages from the business.
                </label>
            </div>
            <div className="flex justify-between items-center mt-6">
                <button type="button" onClick={callback}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">
                    Back
                </button>
                <button type="submit"
                    className="px-6 py-2 bg-[#d7b398] text-white rounded-md hover:bg-[#ab907b] transition-colors ease-in-out duration-75 focus:outline-none">
                    Schedule Meeting
                </button>
            </div>

        </form>
    </div>

}


function getDayDifference(date1: Date | string, date2: Date | string): number {
    const msInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime()); // Absolute difference in milliseconds
    return Math.floor(diffInMs / msInDay); // Convert to days
}

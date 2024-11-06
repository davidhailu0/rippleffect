'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { isBefore, isSameDay, parseISO, format } from 'date-fns'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import Calendar from 'react-calendar'
import { fetchAvailableDates } from '@/app/services/bookingServices'
import { TimezoneOption } from '@/app/lib/models'
import { DAYS, TIMEZONEOPTIONS } from '@/app/lib/constants'
import { CalendarSkeleton } from './BookingSkeleton'
import TimezoneSelect from './TimeZoneSelect'
import Availabilities from '@/types/AvailabilitiesType'
import SelectedDate from '@/types/SelectedDateType'

type BookingComponentProps = {
    callback: () => void
}

export default function BookingComponent({ callback }: BookingComponentProps) {
    const [selectedDate, setSelectedDate] = useState<SelectedDate>(null)
    const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption | null>(null)
    const [hourFormat, setHourFormat] = useState<'12' | '24'>('12')
    const [availabilities, setAvailabilities] = useState<Availabilities | null>(null)
    const [currentDate, setCurrentDate] = useState<Date>(new Date())

    const fetchAvailabilities = useCallback(async (date: Date) => {
        setCurrentDate(date)
        setAvailabilities(null)
        const dates: Availabilities = await fetchAvailableDates(date.getMonth() + 1, date.getFullYear())
        const today = new Date()
        let newSelectedDate = null

        if (dates[format(today, 'yyyy-MM-dd')]) {
            const todayAvailables = dates[format(today, 'yyyy-MM-dd')].filter(
                ({ start_time }) => Date.now() <= new Date(start_time).getTime()
            )
            if (todayAvailables.length !== 0) {
                newSelectedDate = today
                setCurrentDate(today)
            }
        } else {
            for (const dt of Object.keys(dates)) {
                const parsedDate = parseISO(dt)
                if (isBefore(today, parsedDate) && dates[format(parsedDate, 'yyyy-MM-dd')].length > 0) {
                    newSelectedDate = parsedDate
                    setCurrentDate(parsedDate)
                    break
                }
            }
        }

        if (newSelectedDate != null) {
            setSelectedDate(newSelectedDate)
        }
        setAvailabilities(dates)
    }, [])

    const handleTimezoneChange = useCallback((option: TimezoneOption | null) => {
        setSelectedTimezone(option)
        sessionStorage.setItem('timezone', JSON.stringify(option))
    }, [])

    useEffect(() => {
        const storedTimezone = sessionStorage.getItem('timezone')
        if (storedTimezone) {
            setSelectedTimezone(JSON.parse(storedTimezone))
        } else {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const timezone = TIMEZONEOPTIONS.find((tz) => tz.value === userTimezone)
            if (timezone) {
                setSelectedTimezone(timezone)
            }
        }

        const reservedTime = sessionStorage.getItem('reservedTime')
        fetchAvailabilities(reservedTime ? new Date(JSON.parse(reservedTime).start_time) : new Date())
    }, [fetchAvailabilities])

    const availableTimeSlots = useMemo(() => {
        if (!selectedDate || !availabilities || !selectedTimezone) return []
        const dateKey = format(new Date(selectedDate.toString()), 'yyyy-MM-dd')
        return (availabilities[dateKey] || [])
            .filter(({ start_time }) => {
                const zonedStartTime = toZonedTime(start_time, selectedTimezone.value)
                return toZonedTime(Date.now(), selectedTimezone.value).getTime() <= zonedStartTime.getTime()
            })
            .map(({ start_time, end_time }) => ({
                start_time,
                end_time,
                formattedTime: formatInTimeZone(
                    start_time,
                    selectedTimezone.value,
                    hourFormat === '12' ? 'hh:mm a' : 'HH:mm'
                ),
            }))
    }, [selectedDate, availabilities, selectedTimezone, hourFormat])

    if (!availabilities) return <CalendarSkeleton />

    return (
        <div className="flex flex-col space-y-4 md:flex-row space-x-0 md:space-x-4 p-2 md:p-6 bg-white text-black h-auto w-11/12 md:w-2/3 rounded-md">
            <div className="w-full md:w-1/4 border-l-gray-500">
                <h2 className="text-lg font-semibold">60 Min Meeting</h2>
                <p className="mt-2 text-gray-400">60m</p>
                <p className="my-2">🗓️ Google Meet</p>
                <TimezoneSelect selectedTimezone={selectedTimezone} handleTimezoneChange={handleTimezoneChange} />
            </div>

            <div className="w-full mx-0 md:w-1/2">
                <Calendar
                    value={selectedDate}
                    calendarType="gregory"
                    tileContent={({ date }) =>
                        isSameDay(date, new Date()) ? (
                            <div className="h-2 w-2 absolute left-[44%] rounded-full bg-white" aria-hidden="true"></div>
                        ) : null
                    }
                    activeStartDate={currentDate}
                    onActiveStartDateChange={({ action, activeStartDate }) => {
                        if (['next', 'prev'].includes(action) && activeStartDate) {
                            fetchAvailabilities(activeStartDate)
                        }
                    }}
                    onChange={setSelectedDate}
                    minDate={new Date()}
                    tileDisabled={({ activeStartDate, date }) =>
                        date.getMonth() !== activeStartDate.getMonth() ||
                        !Object.keys(availabilities).includes(format(date, 'yyyy-MM-dd')) ||
                        availabilities[format(date, 'yyyy-MM-dd')].length <= 0
                    }
                />
            </div>

            <div className="w-full md:w-1/4 pb-4">
                <div className="flex justify-between mb-4 items-center">
                    {selectedDate && (
                        <p className="text-black">
                            <span className="font-bold text-lg">{DAYS[new Date(selectedDate.toString()).getDay()]}</span>{' '}
                            {new Date(selectedDate.toString()).getDate()}
                        </p>
                    )}
                    <div className="p-2 border border-gray-500 rounded-lg flex gap-x-1">
                        <button
                            onClick={() => setHourFormat('12')}
                            className={`px-3 py-1 rounded-md ${hourFormat === '12' ? 'bg-[#d7b398] text-white' : 'bg-white text-black'
                                }`}
                            aria-pressed={hourFormat === '12'}
                        >
                            12h
                        </button>
                        <button
                            onClick={() => setHourFormat('24')}
                            className={`px-3 py-1 rounded-md ${hourFormat === '24' ? 'bg-[#d7b398] text-white' : 'bg-white text-black'
                                }`}
                            aria-pressed={hourFormat === '24'}
                        >
                            24h
                        </button>
                    </div>
                </div>
                <div className="space-y-2 overflow-y-auto h-96 custom-scrollbar pr-1">
                    {availableTimeSlots.map(({ start_time, end_time, formattedTime }) => (
                        <button
                            key={start_time}
                            onClick={() => {
                                sessionStorage.setItem(
                                    'reservedTime',
                                    JSON.stringify({ start_time, end_time, timezone: selectedTimezone!.value })
                                )
                                callback()
                            }}
                            className="w-full py-2 text-left px-3 rounded-md bg-[#d7b398] border border-[#d7b398] text-white"
                        >
                            {formattedTime}
                        </button>
                    ))}
                    {selectedDate && availableTimeSlots.length === 0 && (
                        <p className="text-center text-gray-500">No Booking Available</p>
                    )}
                </div>
            </div>
        </div>
    )
}
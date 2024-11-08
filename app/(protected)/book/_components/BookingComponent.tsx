'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { isBefore, parseISO, format, isSameDay } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import Calendar from 'react-calendar';
import { fetchAvailableDates } from '@/services/bookingServices';
import { CalendarSkeleton } from './BookingSkeleton';
import TimezoneSelect from './TimeZoneSelect';
import Availabilities from '@/types/AvailabilitiesType';
import SelectedDate from '@/types/SelectedDateType';
import { useQuery } from '@tanstack/react-query';
import { DAYS, TIMEZONEOPTIONS } from '@/lib/constants';
import TimezoneOption from '@/types/TimezoneType';

const DATE_FORMAT = 'yyyy-MM-dd';
const TIME_FORMAT_12H = 'hh:mm a';
const TIME_FORMAT_24H = 'HH:mm';

type BookingComponentProps = {
    callback: () => void;
};

export default function BookingComponent({ callback }: BookingComponentProps) {
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [hourFormat, setHourFormat] = useState<'12' | '24'>('12');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const initialTimezone = useMemo<TimezoneOption>(() => {
        const savedTimezone = sessionStorage.getItem('timezone');
        return savedTimezone
            ? JSON.parse(savedTimezone)
            : TIMEZONEOPTIONS.find((tz) => tz.value === Intl.DateTimeFormat().resolvedOptions().timeZone) as TimezoneOption;
    }, []);

    const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption | null>(initialTimezone);

    const { data: availabilities, isLoading, error } = useQuery<Availabilities, Error>({
        queryKey: ['availabilities', currentDate],
        queryFn: () => fetchAvailableDates(currentDate.getMonth() + 1, currentDate.getFullYear()),
        staleTime: 1000 * 60 * 5
    }
    );

    const handleTimezoneChange = useCallback((option: TimezoneOption | null) => {
        setSelectedTimezone(option);
        sessionStorage.setItem('timezone', JSON.stringify(option));
    }, []);

    const updateSelectedDate = useCallback((availabilities: Availabilities | null) => {
        const today = new Date();
        const todayKey = format(today, DATE_FORMAT);

        if (availabilities && availabilities[todayKey]) {
            const todayAvailable = availabilities[todayKey].some(({ start_time }) =>
                Date.now() <= new Date(start_time).getTime()
            );
            if (todayAvailable) {
                setSelectedDate(today);
                setCurrentDate(today);
                return;
            }
        }

        const nextAvailableDate = Object.keys(availabilities || {}).map(date => parseISO(date)).find(date =>
            isBefore(today, date) && availabilities![format(date, DATE_FORMAT)].length > 0
        );

        if (nextAvailableDate) {
            setSelectedDate(nextAvailableDate);
            setCurrentDate(nextAvailableDate);
        }
    }, []);

    useEffect(() => {
        if (availabilities) updateSelectedDate(availabilities);
    }, [availabilities, updateSelectedDate]);

    const availableTimeSlots = useMemo(() => {
        if (!selectedDate || !availabilities || !selectedTimezone) return [];

        const dateKey = format(new Date(selectedDate.toString()), DATE_FORMAT);
        return (availabilities[dateKey] || [])
            .filter(({ start_time }) => {
                const zonedStartTime = toZonedTime(start_time, selectedTimezone.value);
                return Date.now() <= zonedStartTime.getTime();
            })
            .map(({ start_time, end_time }) => ({
                start_time,
                end_time,
                formattedTime: formatInTimeZone(
                    start_time,
                    selectedTimezone.value,
                    hourFormat === '12' ? TIME_FORMAT_12H : TIME_FORMAT_24H
                ),
            }));
    }, [selectedDate, availabilities, selectedTimezone, hourFormat]);

    if (isLoading) return <CalendarSkeleton />;
    if (error) return <p>Error loading availabilities.</p>;

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
                            setCurrentDate(activeStartDate);
                        }
                    }}
                    onChange={setSelectedDate}
                    minDate={new Date()}
                    tileDisabled={({ activeStartDate, date }) =>
                        date.getMonth() !== activeStartDate.getMonth() ||
                        !Object.keys(availabilities || {}).includes(format(date, DATE_FORMAT)) ||
                        Boolean(availabilities && availabilities[format(date, DATE_FORMAT)].length <= 0)
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
                            className={`px-3 py-1 rounded-md ${hourFormat === '12' ? 'bg-pink-400 text-white' : 'bg-white text-black'}`}
                            aria-pressed={hourFormat === '12'}
                        >
                            12h
                        </button>
                        <button
                            onClick={() => setHourFormat('24')}
                            className={`px-3 py-1 rounded-md ${hourFormat === '24' ? 'bg-pink-400 text-white' : 'bg-white text-black'}`}
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
                                );
                                callback();
                            }}
                            className="w-full py-2 text-left px-3 rounded-md bg-pink-400 border border-pink-400 text-white"
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
    );
}

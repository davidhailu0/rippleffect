import { useCallback, useEffect, useState } from 'react';
import { isBefore, isSameDay, parseISO, format, addMonths, differenceInMonths } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import Calendar from 'react-calendar';
import TimezoneSelect from './TimeZoneSelect';
import { fetchAvailableDates } from '@/app/services/bookingServices';
import { TimezoneOption } from '@/app/lib/models';
import SelectedDate from '@/types/SelectedDateType';
import Availablities from '@/types/AvailablitiesType';
import { DAYS, TIMEZONEOPTIONS } from '@/app/lib/constants';
import { CalendarSkeleton } from './BookingSkeleton';

const BookingComponent = ({ callback }: { callback: () => void }) => {
    const [selectedDate, onSelectedDateChange] = useState<SelectedDate | null>(null);
    const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption | null>(null);
    const [hourFormat, setHourFormat] = useState<string>('12');
    const [availablities, setAvailablities] = useState<Availablities | null>(null);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const fetchAvailablities = useCallback(async (date: Date) => {
        setCurrentDate(date);
        setAvailablities(null);
        const dates: Availablities = await fetchAvailableDates(date.getMonth() + 1, date.getFullYear());
        const today = new Date();
        let selectedDate = null
        if (dates[format(today, 'yyyy-MM-dd')]) {
            const todayAvailables = dates[format(new Date(today!.toString()), 'yyyy-MM-dd')]
                .filter(({ start_time }) => {
                    return Date.now() <= new Date(start_time).getTime();
                })
            if (todayAvailables.length !== 0) {
                selectedDate = today
                setCurrentDate(today);
            }
        } else {
            for (const dt of Object.keys(dates)) {
                const parsedDate = parseISO(dt);
                if (isBefore(today, parsedDate) && dates[format(parsedDate, 'yyyy-MM-dd')].length > 0) {
                    selectedDate = parsedDate
                    setCurrentDate(parsedDate);
                    break;
                }
            }
        }
        if (selectedDate == null) {
            const nextMonthDate = addMonths(currentDate, 1);
            if (differenceInMonths(nextMonthDate, new Date()) < 3) {
                fetchAvailablities(nextMonthDate)
            }
            else {
                setCurrentDate(today)
            }
        }
        else {
            onSelectedDateChange(selectedDate);
        }
        setAvailablities(dates);
    }, [currentDate]);

    const handleTimezoneChange = (option: TimezoneOption | null) => {
        setSelectedTimezone(option);
        sessionStorage.setItem('timezone', JSON.stringify(option))
    };

    useEffect(() => {
        if (sessionStorage.getItem('timezone')) {
            setSelectedTimezone(JSON.parse(sessionStorage.getItem('timezone')!));
        }
        else {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const timezone = TIMEZONEOPTIONS.find((tz) => tz.value === userTimezone);
            if (timezone) {
                setSelectedTimezone(timezone);
            }
        }

        fetchAvailablities(sessionStorage.getItem("reservedTime") ? new Date(JSON.parse(sessionStorage.getItem("reservedTime")!).start_time) : new Date());
    }, [fetchAvailablities]);

    if (!availablities) return <CalendarSkeleton />;
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
                            <div className="h-2 w-2 absolute left-[44%] rounded-full bg-white"></div>
                        ) : null
                    }
                    activeStartDate={currentDate}
                    onActiveStartDateChange={({ action, activeStartDate }) => {
                        if (['next', 'prev'].includes(action)) {
                            fetchAvailablities(activeStartDate!);
                        }
                    }}
                    onChange={onSelectedDateChange}
                    minDate={new Date()}
                    tileDisabled={({ activeStartDate, date }) =>
                        date.getMonth() !== activeStartDate.getMonth() ||
                        !Object.keys(availablities).includes(format(date, 'yyyy-MM-dd')) || availablities[format(date, 'yyyy-MM-dd')].length <= 0
                    }
                />
            </div>

            <div className="w-full md:w-1/4 pb-4">
                <div className="flex justify-between mb-4 items-center">
                    {selectedDate && (
                        <p className="text-black">
                            <span className="font-bold text-lg">{DAYS[new Date(selectedDate!.toString()).getDay()]}</span>{' '}
                            {new Date(selectedDate!.toString()).getDate()}
                        </p>
                    )}
                    <div className="p-2 border border-gray-500 rounded-lg flex gap-x-1">
                        <button
                            onClick={() => setHourFormat('12')}
                            className={`px-3 py-1 rounded-md ${hourFormat === '12' ? 'bg-[#d7b398] text-white' : 'bg-white text-black'}`}
                        >
                            12h
                        </button>
                        <button
                            onClick={() => setHourFormat('24')}
                            className={`px-3 py-1 rounded-md ${hourFormat === '24' ? 'bg-[#d7b398] text-white' : 'bg-white text-black'}`}
                        >
                            24h
                        </button>
                    </div>
                </div>
                <div className="space-y-2 overflow-y-auto h-96 custom-scrollbar pr-1">
                    {selectedDate && availablities[format(new Date(selectedDate!.toString()), 'yyyy-MM-dd')] &&
                        availablities[format(new Date(selectedDate!.toString()), 'yyyy-MM-dd')]
                            .filter(({ start_time }) => {
                                const zonedStartTime = toZonedTime(start_time, selectedTimezone!.value);
                                return toZonedTime(Date.now(), selectedTimezone!.value).getTime() <= zonedStartTime.getTime();
                            })
                            .map(({ start_time, end_time }) => {
                                return (
                                    <button
                                        key={start_time}
                                        onClick={() => {
                                            sessionStorage.setItem(
                                                "reservedTime",
                                                JSON.stringify({ start_time, end_time, timezone: selectedTimezone!.value })
                                            );
                                            callback();
                                        }}
                                        className="w-full py-2 text-left px-3 rounded-md bg-[#d7b398] border border-[#d7b398] text-white"
                                    >
                                        {formatInTimeZone(
                                            start_time,
                                            selectedTimezone!.value,
                                            hourFormat === '12' ? 'hh:mm a' : 'HH:mm',
                                        )}
                                    </button>
                                );
                            })}
                    {selectedDate && !availablities[format(new Date(selectedDate?.toString()), 'yyyy-MM-dd')]?.length && (
                        <p className="text-center text-gray-500">No Booking Available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingComponent;

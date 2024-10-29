import { useCallback, useEffect, useState } from 'react';
import { isBefore, isSameDay, parseISO, format } from 'date-fns';
import { toZonedTime, formatInTimeZone } from 'date-fns-tz';
import Calendar from 'react-calendar';
import TimezoneSelect from './TimeZoneSelect';
import { fetchAvailableDates, bookSession } from '@/app/services/bookingServices';
import { TimezoneOption } from '@/app/lib/models';
import SelectedDate from '@/app/types/SelectedDateType';
import Availablities from '@/app/types/AvailablitiesType';
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

        const dates = await fetchAvailableDates(date.getMonth() + 1, date.getFullYear());
        const today = new Date();

        if (dates[format(today, 'yyyy-MM-dd')]) {
            onSelectedDateChange(today);
            setCurrentDate(today);
        } else {
            for (const dt of Object.keys(dates)) {
                const parsedDate = parseISO(dt);
                if (isBefore(today, parsedDate)) {
                    onSelectedDateChange(parsedDate);
                    setCurrentDate(parsedDate);
                    break;
                }
            }
        }

        setAvailablities(dates);
    }, []);

    const handleTimezoneChange = (option: TimezoneOption | null) => {
        setSelectedTimezone(option);
    };

    useEffect(() => {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezone = TIMEZONEOPTIONS.find((tz) => tz.value === userTimezone);

        if (timezone) {
            setSelectedTimezone(timezone);
        }

        fetchAvailablities(new Date());
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
                        !Object.keys(availablities).includes(format(date, 'yyyy-MM-dd'))
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
                    {selectedDate && (
                        availablities[format(new Date(selectedDate!.toString()), 'yyyy-MM-dd')].filter(({ start_time }) => {
                            // Filter out past times
                            return new Date().getTime() <= new Date(start_time).getTime();
                        }).length > 0 ? (
                            availablities[format(new Date(selectedDate!.toString()), 'yyyy-MM-dd')].map(({ start_time, end_time }) => {
                                const zonedStartTime = toZonedTime(new Date(start_time), selectedTimezone!.value);

                                if (new Date().getTime() <= new Date(start_time).getTime()) {
                                    return (
                                        <button
                                            key={start_time}
                                            onClick={() => bookSession({ start_time, end_time, timezone: selectedTimezone!.value }).then(() => callback())}
                                            className="w-full py-2 text-left px-3 rounded-md bg-[#d7b398] border border-[#d7b398] text-white"
                                        >
                                            {formatInTimeZone(zonedStartTime, selectedTimezone!.value!, 'hh:mm a')}
                                        </button>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <p className="text-center text-gray-500">No Booking Available</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingComponent;

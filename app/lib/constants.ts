import { format, parseISO, addMilliseconds } from 'date-fns'
import { TimezoneOption } from "./models";

export const TIMEZONEOPTIONS: TimezoneOption[] = Intl.supportedValuesOf('timeZone').map((tz) => {
    const currentDate = parseISO(format(new Date(), 'yyyy-MM-dd')); // Parse to ISO format without time part
    const dateInTimezone = addMilliseconds(currentDate, new Date().getTimezoneOffset() * 60000);
    const utcOffsetMillis = new Date(currentDate.toLocaleString('en-US', { timeZone: tz })).getTime() - dateInTimezone.getTime();

    return {
        value: tz,
        label: tz.replace('_', ' '),
        offsetFromUTC: utcOffsetMillis,
    };
});

export const DAYS: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
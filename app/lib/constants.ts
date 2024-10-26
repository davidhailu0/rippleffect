import { TimezoneOption } from "./models";

export const timezoneOptions: TimezoneOption[] = Intl.supportedValuesOf('timeZone').map((tz) => {
    const currentDate = new Date(new Date().toLocaleDateString());
    const dateInTimezone = new Date(currentDate.toLocaleString('en-US', { timeZone: tz }));
    const utcOffsetMillis = dateInTimezone.getTime() - currentDate.getTime();

    return {
        value: tz,
        label: tz.replace('_', ' '),
        offsetFromUTC: utcOffsetMillis,
    };
});
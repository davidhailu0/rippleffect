import { TimezoneOption } from "./models";

export const timezoneOptions: TimezoneOption[] = Intl.supportedValuesOf('timeZone').map((tz) => ({
    value: tz,
    label: tz.replace('_', ' '),
}));
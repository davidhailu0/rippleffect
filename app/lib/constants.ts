import { TimezoneOption } from "./models";

export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENV as "dev" | "production";

export const TIMEZONEOPTIONS: TimezoneOption[] = Intl.supportedValuesOf(
  "timeZone"
).map((tz) => {
  return {
    value: tz,
    label: tz.replace("_", " "),
  };
});

export const DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

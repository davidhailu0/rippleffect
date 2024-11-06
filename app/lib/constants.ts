import { TimezoneOption } from "./models";
export const TIMEZONEOPTIONS: TimezoneOption[] = Intl.supportedValuesOf(
  "timeZone"
).map((tz) => {
  return {
    value: tz,
    label: tz.replace("_", " "),
  };
});

export const DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

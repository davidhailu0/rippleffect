import { format, isToday, isTomorrow } from "date-fns";

export const formatFriendlyDate = (dateString: string | Date) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Today at ${format(date, "h:mm a")}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, "h:mm a")}`;
  } else {
    return format(date, "MMM d, yyyy 'at' h:mm a"); // e.g., "Nov 10, 2024 at 4:00 AM"
  }
};

import { format, isTomorrow, formatDistanceToNowStrict } from "date-fns";

export const formatFriendlyDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return `${formatDistanceToNowStrict(date, { addSuffix: true })}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, "h:mm a")}`;
  } else {
    return format(date, "MMM d, yyyy 'at' h:mm a");
  }
};

export const filterAndSortBookingDate = (bookings: Booking[]) => {
  return bookings
    .filter(
      (booking) => new Date(booking.start_date).getTime() > new Date().getTime()
    )
    .sort(
      (a: Booking, b: Booking) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );
};

'use client'
import { useAppSelector } from '@/lib/reduxStore/hooks';
import BookedContent from './_components/BookedContent';
import NoBookingMessage from './_components/NoBooking';

export default function Step3() {
    const lead = useAppSelector((state) => state.auth.lead);
    const isBooked = lead?.tag_list.includes('booked');
    return (
        <div className="flex flex-col items-center h-screen w-10/12 md:w-9/12 mx-auto mt-10">
            {isBooked ? (
                <BookedContent />
            ) : (
                <NoBookingMessage />
            )}
        </div>
    );
}



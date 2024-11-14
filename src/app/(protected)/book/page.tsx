"use client";
import { useEffect, useState } from "react";
import BookingCalendar from "./_components/BookingComponent";
import BookingRegistration from "./_components/BookingRegistration";

export default function Book() {
  const [showBooking, setShowBooking] = useState<boolean>(true);

  const [session, setSession] = useState({
    start_time: "",
    end_time: "",
    timezone: "",
  });
  const changeToRegistration = () => {
    setShowBooking(false);
  };
  const changeToBooking = () => {
    setShowBooking(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3 mt-7 items-center w-full mx-auto">
        <p className="text-2xl md:text-4xl font-bold text-white text-center">
          Secure Your Appointment
        </p>
        <p className="text-2xl md:text-4xl font-bold text-pink-400 text-center w-10/12 mb-9">
          One on One Strategy Call with Nate
        </p>
        {showBooking ? (
          <BookingCalendar
            setSession={setSession}
            callback={changeToRegistration}
          />
        ) : (
          <BookingRegistration session={session} callback={changeToBooking} />
        )}
      </div>
    </>
  );
}

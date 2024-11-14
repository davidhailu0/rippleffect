"use client";
import { useEffect, useState } from "react";
import BookingCalendar from "./_components/BookingComponent";
import BookingRegistration from "./_components/BookingRegistration";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import DisplayMessage from "@/components/ui/displayMessage";

export default function Book() {
  const [showBooking, setShowBooking] = useState<boolean>(true);
  const lead = useAppSelector((state) => state.auth.lead);

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
      {lead?.tag_list.includes("step2_watched") ? (
        <>
          {lead?.tag_list.includes("booked_call") ? (
            <DisplayMessage
              title="You've already booked a call"
              description=""
              callToActionTitle="My bookings"
              callToActionHref="/my-bookings"
            />
          ) : (
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
                <BookingRegistration
                  session={session}
                  callback={changeToBooking}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <DisplayMessage
          title="Watch Step 2 Video First"
          description="You need to watch at least 80% of the Step 2 video to proceed to booking a call."
          callToActionTitle="Watch Step 2"
          callToActionHref="/step-2"
        />
      )}
    </>
  );
}

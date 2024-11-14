"use client";
import DisplayMessage from "@/components/ui/displayMessage";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import BookedContent from "./_components/BookedContent";

export default function Step3() {
  const lead = useAppSelector((state) => state.auth.lead);
  return (
    <div className="flex flex-col items-center h-screen w-10/12 md:w-9/12 mx-auto mt-10">
      {lead?.tag_list?.includes("booked_call") ? (
        <BookedContent />
      ) : (
        <DisplayMessage
          title="Book a Call First"
          description="It looks like you haven't booked a call yet. Please schedule your 1-on-1 business plan call to proceed."
          callToActionTitle="Book a Call"
          callToActionHref="/book"
        />
      )}
    </div>
  );
}

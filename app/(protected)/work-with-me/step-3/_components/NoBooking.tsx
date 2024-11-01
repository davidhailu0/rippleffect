import Link from "next/link";

const NoBookingMessage = () => (
    <div className="flex flex-col items-center justify-center h-1/2 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Book a Call First
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
            It looks like you haven't booked a call yet. Please schedule your 1-on-1 business plan call to proceed.
        </p>
        <Link href="/work-with-me/book" className="px-6 py-3 bg-white text-blue-500 hover:bg-gray-200 transitionh-12 rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3">
            Book a Call
        </Link>
    </div>
);

export default NoBookingMessage;
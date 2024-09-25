import BookCallForm from "../components/BookCallForm"
export default function Book() {
    return <div className="flex flex-col gap-3 mt-7 items-center h-full w-[1120px] mx-auto">
        <p className="text-4xl font-bold text-white">Secure Your Appointment</p>
        <p className="text-4xl font-bold text-[#d7b398] mb-9">One on One Strategy Call with Nate</p>
        <BookCallForm />
    </div>
}
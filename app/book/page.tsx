import BookCallForm from "../components/BookCallForm"
export default function Book() {
    return <div className="flex flex-col gap-3 mt-7 items-center w-full mx-auto">
        <p className="text-2xl md:text-4xl font-bold text-white text-center">Secure Your Appointment</p>
        <p className="text-2xl md:text-4xl font-bold text-[#d7b398] text-center w-10/12 mb-9">One on One Strategy Call with Nate</p>
        <BookCallForm />
    </div>
}
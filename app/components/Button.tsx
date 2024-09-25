
export default function Button({ title, type }: { title: string, type: string }) {
    return <input type={type} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center" value={title} />
}
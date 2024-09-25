
export default function TextField({ name, type, placeholder }: { name: string, type?: string, placeholder: string }) {
    return <input name={name} type={type ? type : 'text'} placeholder={placeholder} className="h-12 text-white bg-transparent outline-none border-b-[1px] border-b-white focus:outline-1 focus:outline-black focus:border-b-0 placeholder:text-white" />
}
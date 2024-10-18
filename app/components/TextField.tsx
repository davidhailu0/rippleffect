
export default function TextField({ label, value, type, placeholder, hidden, onChange }: { label: string, value: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: string) => void }) {
    return <div className={`relative w-full max-w-xs mx-auto ${hidden && 'hidden'}`}>
        <input type={type ? type : 'text'} required value={value}
            className="text-black peer w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-transparent transition-all duration-200"
            placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        <label htmlFor="fancy-input"
            className="absolute left-4 -top-2.5 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white">
            {label}
        </label>
    </div>

}
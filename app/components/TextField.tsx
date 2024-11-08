export default function TextField({ label, value, placeholder, hidden, onChange }: { label: string, value: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: string) => void }) {
    return <div className={`w-full ${hidden && 'hidden'}`}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type="email" id="email" disabled={hidden} name="email" autoFocus required placeholder={placeholder}
            className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>

}
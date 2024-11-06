import { ChangeEvent, useState } from "react";

export default function TextField({
    label,
    value,
    placeholder,
    onChange,
    onEnterPressed
}: {
    label: string;
    value?: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onEnterPressed: () => void;
}) {
    const [showWarning, setShowWarning] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange(e);
        setShowWarning(inputValue.trim().length > 0 && inputValue.trim().length < 5); // Show warning if text length is less than 5
    };

    return (
        <div>
            <label htmlFor="text-field" className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="text"
                id="text-field"
                placeholder={placeholder}
                className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]"
                value={value || ''}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onEnterPressed();
                    }
                }}
            />
            {showWarning && (
                <p className="text-red-500 text-sm mt-1">
                    Please write a bit more.
                </p>
            )}
        </div>
    );
}

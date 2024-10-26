'use client'
import Select from 'react-select';
import { FaGlobe } from 'react-icons/fa';
import { TimezoneOption } from '../lib/models';
import { timezoneOptions } from '../lib/constants';

interface TimeZoneProps {
    selectedTimezone: TimezoneOption | null;
    handleTimezoneChange: (option: TimezoneOption | null) => void
}

const TimezoneSelect: React.FC<TimeZoneProps> = ({ selectedTimezone, handleTimezoneChange }) => {

    return (
        <div className="w-full max-w-xs mx-auto">
            <div className="relative">
                <Select
                    value={selectedTimezone}
                    onChange={(value) => handleTimezoneChange(value as TimezoneOption)}
                    options={timezoneOptions}
                    placeholder="Choose a timezone"
                    className="text-black"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#111827',
                            borderColor: '#374151',
                            color: 'white',
                            paddingLeft: '2rem'
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: 'white'
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: 'white'
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: '#111827',
                            maxHeight: '200px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#9ca3af #111827'
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? '#374151' : '#111827',
                            color: 'white',
                            cursor: 'pointer',
                            overflowX: 'hidden'
                        }),
                    }}
                    classNamePrefix="custom-scroll"
                />
                <FaGlobe className="absolute top-2/4 left-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
        </div>
    );
};

export default TimezoneSelect;

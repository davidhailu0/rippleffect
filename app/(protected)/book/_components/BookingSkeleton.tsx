const shimmer =
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CalendarSkeleton() {
    return (
        <div className="flex flex-col space-y-4 md:flex-row space-x-0 md:space-x-4 p-2 md:p-6 bg-white text-black h-auto w-11/12 md:w-2/3 rounded-md">
            <div className={`${shimmer} w-full md:w-1/4 border-l-gray-500`}>
                <h2 className="text-lg font-semibold">60 Min Meeting</h2>
                <p className="mt-2 text-gray-400">60m</p>
                <p className="my-2">🗓️ Google Meet</p>
                <p className="my-2">🗓️ Timezone</p>
            </div>

            <div className={`${shimmer} w-full mx-0 md:w-1/2`}>
                <div className="flex flex-col">
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        <div className="h-4 rounded w-10">Mon</div>
                        <div className="h-4 rounded w-10">Tue</div>
                        <div className="h-4 rounded w-10">Wed</div>
                        <div className="h-4 rounded w-10">Thur</div>
                        <div className="h-4 rounded w-10">Fri</div>
                        <div className="h-4 rounded w-10">Sat</div>
                        <div className="h-4 rounded w-10">Sun</div>

                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                        <div className="h-16 w-16 bg-gray-400 rounded col-span-1"></div>
                    </div>
                </div>
            </div>

            <div className={`${shimmer} w-full md:w-1/4 pb-4`}>
                <div className="flex justify-between mb-4 items-center">
                    <p className='text-black'><span className='font-bold text-lg'>Today</span> 01</p>
                    <div className='p-2 border border-gray-500 rounded-lg flex gap-x-1'>
                        <button className={`px-3 py-1 rounded-md text-white bg-[#d7b398]`}>12h</button>
                        <button className={`px-3 py-1 rounded-md text-black bg-white`}>24h</button>
                    </div>
                </div>
                <div className="space-y-2 overflow-y-auto h-96 custom-scrollbar pr-1">
                    {[...Array(10)].map((_, index) => (
                        <button
                            key={index}
                            className={`w-full py-2 h-9 text-left px-3 rounded-md bg-[#d7b398] border border-[#d7b398] text-black`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}


{/* <div className="flex flex-col space-y-4 md:flex-row space-x-0 md:space-x-4 p-2 md:p-6 bg-gray-900 text-white h-auto w-11/12 md:w-2/3 rounded-md">
    <div className="w-full md:w-1/4 border-l-gray-500">
        <h2 className="text-lg font-semibold">60 Min Meeting</h2>
        <p className="mt-2 text-gray-400">60m</p>
        <p className="my-2">🗓️ Google Meet</p>
    </div>

    <div className="w-full mx-0 md:w-1/2">
        <Calendar value={value} calendarType="gregory"
            tileContent={({ date }) => date.toLocaleDateString() === new Date().toLocaleDateString() ? <div className='h-2 w-2 absolute left-[44%] rounded-full bg-white'></div> : null}
            activeStartDate={currentDate}
            onActiveStartDateChange={({ action, activeStartDate }) => {
                if (action == 'next') {
                    fetchAvailablities(activeStartDate!)
                }
            }} onChange={onChange} minDate={new Date()} tileDisabled={({ activeStartDate, date }) =>
                date.getMonth() != activeStartDate.getMonth() || !Object.keys(availablities).includes(date.toLocaleDateString('en-CA'))
            }
        />
    </div>

    <div className="w-full md:w-1/4 pb-4">
        <div className="flex justify-between mb-4 items-center">
            <p className='text-white'><span className='font-bold text-lg'>{days[new Date(value!.toString()).getDay()]}</span> {new Date(value!.toString()).getDate()}</p>
            <div className='p-2 border border-gray-500 rounded-lg flex gap-x-1'>
                <button onClick={() => setHourFormat('12')} className={`px-3 py-1 rounded-md ${hourFormat === '12' ? 'bg-gray-600' : 'bg-gray-800'}`}>12h</button>
                <button onClick={() => setHourFormat('24')} className={`px-3 py-1 rounded-md ${hourFormat === '24' ? 'bg-gray-600' : 'bg-gray-800'}`}>24h</button>
            </div>
        </div>
        <div className="space-y-2 overflow-y-auto h-96 custom-scrollbar pr-1">
            {availablities[new Date(value!.toString()).toLocaleDateString('en-CA')].map(({ start_time, end_time }) => (
                <button
                    key={start_time}
                    onClick={() => bookSession({ start_time, end_time })}
                    className={`w-full py-2 text-left px-3 rounded-md bg-[#1a1a1a] border border-gray-600 text-gray-300`}
                >
                    {new Date(start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: hourFormat === '12' ? true : false })}
                </button>
            ))}
        </div>
    </div>
</div> */}
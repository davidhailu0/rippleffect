const shimmer =
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CalendarSkeleton() {
    return (
        <div className="grid grid-cols-3 space-y-4 bg-gray-900 w-2/3">
            <div className={`${shimmer} flex space-x-4 p-6  text-white h-auto w-2/3 rounded-md`}>
                <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6 mb-8"></div>
            </div>

            <div className={`${shimmer} flex items-start mb-8`}>
                <div className="flex flex-col">
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        <div className="h-4 bg-gray-600 rounded w-10"></div>
                        <div className="h-4 bg-gray-600 rounded w-10"></div>
                        <div className="h-4 bg-gray-600 rounded w-10"></div>
                        <div className="h-4 bg-gray-600 rounded w-10"></div>
                        <div className="h-4 bg-gray-600 rounded w-10"></div>
                        <div className="h-4 bg-gray-600 rounded w-10"></div>
                        <div className="h-4 bg-gray-600 rounded w-10"></div>

                        <div className="h-10 bg-gray-700 rounded col-span-1"></div>
                        <div className="h-10 bg-gray-700 rounded col-span-1"></div>
                        <div className="h-10 bg-gray-700 rounded col-span-1"></div>
                        <div className="h-10 bg-gray-700 rounded col-span-1"></div>
                        <div className="h-10 bg-gray-700 rounded col-span-1"></div>
                        <div className="h-10 bg-gray-700 rounded col-span-1"></div>
                        <div className="h-10 bg-gray-700 rounded col-span-1"></div>
                    </div>
                </div>

                <div className="ml-8 flex flex-col space-y-4">
                    <div className="h-8 bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-700 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
}

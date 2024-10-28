import Image from "next/image";
const TrainingCard = ({ title, icon, items, imageUrl, buttonText }: { title: string, icon: string, items: { title: string, description: string }[], imageUrl: string, buttonText: string }) => {
    return (
        <>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-10 transition-transform duration-200 ease-in-out">
                {/* Image Section */}
                <div className="relative h-48 p-6">
                    <Image
                        src={imageUrl}
                        alt={title}
                        height={48}
                        width={48}
                        className="object-cover w-full h-full"
                        unoptimized
                    />
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Title Section */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
                        {icon && <span className="mr-2 text-xl">{icon}</span>}
                        {title}
                    </h3>

                    {/* List Items */}
                    <ul className="space-y-3 text-gray-700">
                        {items.map((item, index) => (
                            <li key={index}>
                                ✓ <strong>{item.title}:</strong> {item.description}
                            </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <div className="mt-6">
                        <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-full w-full">
                            {buttonText} &gt;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrainingCard;
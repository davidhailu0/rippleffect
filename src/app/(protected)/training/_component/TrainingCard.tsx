import Image from 'next/image';

const TrainingCard = ({
    title,
    icon,
    items,
    imageUrl,
    buttonText,
}: {
    title: string;
    icon: string;
    items: { title: string; description: string }[];
    imageUrl: string;
    buttonText: string;
}) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]">
            {/* Image Section */}
            <div className="relative h-48">
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    className="object-cover w-full h-full transition-opacity duration-500 hover:opacity-80"
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
                        <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>
                                <strong>{item.title}:</strong> {item.description}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Button */}
                <div className="mt-6">
                    <button className="bg-gradient-to-r from-pink-400 to-red-500 text-white font-semibold py-2 px-4 rounded-full w-full hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300">
                        {buttonText} &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrainingCard;

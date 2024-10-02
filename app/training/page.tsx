import Image from "next/image";
import Navbar from "../components/Navbar";

const quickStartItems = [
    {
        title: 'How To Use This System',
        description:
            'Learn the essentials of our platform with this introductory guide, detailing step-by-step how to efficiently use this system to start your journey.',
    },
    {
        title: 'How To Use Your Personal Link',
        description:
            'Discover how to effectively use your personal link and free sales funnel to attract and engage followers while boosting your online presence.',
    },
    {
        title: 'How To Manage Your Leads',
        description:
            'This video provides a straightforward approach to handling your leads, showing you how to use, track and organize them efficiently for better follow-up and engagement.',
    },
];

const paidTrainingItems = [
    {
        title: 'The BEST Facebook Ads Training for Beginners',
        description:
            'This video offers a clear, step-by-step guide on how to use & set-up Facebook Ads. Learn effective strategies to increase your followers and engagement.',
    },
    {
        title: 'The Easy Way to Create Facebook Ads That Convert',
        description:
            'This tutorial breaks down the process of creating effective Facebook ads. Learn how to design ads that capture attention and drive conversions with ease.',
    },
    {
        title: 'The New Way to Get Instagram Followers with Ads',
        description:
            'Discover the latest strategies for using Instagram ads to gain followers quickly and efficiently. This video guides you through the latest techniques that really work.',
    },
];

export default function Training() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-7 mt-7 items-center w-full px-4 md:w-[73%] md:px-0 mx-auto">
                <p className="text-4xl font-bold text-white mb-4 md:mb-9">Training</p>
                <div className="flex flex-col md:flex-row gap-3">
                    <TrainingCard
                        title="Quick start"
                        icon="⚙️"
                        items={quickStartItems}
                        imageUrl="/image.jpg" // Replace with the correct path for the image
                        buttonText="Quick start"
                    />

                    <TrainingCard
                        title="Paid Training"
                        icon="💲"
                        items={paidTrainingItems}
                        imageUrl="/image.jpg" // Replace with the correct path for the image
                        buttonText="Paid Training"
                    />
                    <TrainingCard
                        title="Quick start"
                        icon="⚙️"
                        items={quickStartItems}
                        imageUrl="/image.jpg" // Replace with the correct path for the image
                        buttonText="Quick start"
                    />
                </div>
            </div>
        </>
    );
}

const TrainingCard = ({ title, icon, items, imageUrl, buttonText }: { title: string, icon: string, items: { title: string, description: string }[], imageUrl: string, buttonText: string }) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Section */}
            <div className="relative h-48 p-6">
                <Image
                    src={imageUrl}
                    alt={title}
                    height={48}
                    width={48}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Title Section */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
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
    );
};


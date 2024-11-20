import Image from "next/image";
import Link from "next/link";

const TrainingCard = ({
  title,
  items,
  imageUrl,
  buttonText,
  href,
}: {
  title: string;
  items: { title: string; description: string }[];
  imageUrl: string;
  buttonText: string;
  href: string;
}) => {
  return (
    <div className="max-w-sm flex flex-col  mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]">
      {/* Image Section */}
      <div className="relative w-full overflow-hidden h-48">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          className="object-cover w-full h-full transition-opacity duration-500 hover:opacity-80"
          unoptimized
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title Section */}
        <h3 className="text-lg font-semibold text-pink-500 mb-4 flex items-center justify-center">
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
        <Link href={href} className="mt-auto">
          <button className="bg-gradient-to-r mt-6 from-pink-400 to-red-500 text-white font-semibold py-2 px-4 rounded-full w-full hover:shadow-lg hover:shadow-green-500/50 transition-shadow duration-300">
            {buttonText} &gt;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrainingCard;

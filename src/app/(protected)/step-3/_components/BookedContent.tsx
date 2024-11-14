import Link from "next/link";
import Image from "next/image";

const BookedContent = () => (
  <>
    <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-2">
      Thanks for booking your 1-on-1
    </h1>
    <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-5">
      Business Plan Call with us!
    </h2>
    <p className="text-base font-light text-white text-center my-7">
      To fully benefit from your call and ensure you understand our business
      model, please make sure to watch the following series of videos{" "}
      <strong>before</strong> we talk. If you are unable to watch the videos
      beforehand, we may not be able to proceed with your call.
    </p>
    <h3 className="text-xl font-bold text-white text-center mb-4">
      Please Select Your Country
    </h3>
    <div className="flex justify-center gap-4 flex-wrap mb-6">
      {["us", "eu", "uk", "canada", "australia", "mexico"].map((country) => (
        <Link href={`/step-3/${country}`} key={country}>
          <Image
            src={`/${country}.webp`}
            alt={country.toUpperCase()}
            height={80}
            width={80}
            unoptimized
            className="cursor-pointer hover:opacity-80 transition"
          />
        </Link>
      ))}
    </div>
    <footer className="text-white text-sm mt-auto">
      &copy; {new Date().getFullYear()} All rights reserved.
    </footer>
  </>
);

export default BookedContent;

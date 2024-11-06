import Image from "next/image";
import Link from "next/link";
import { icons } from "lucide-react";

export default function Home() {
  const Facebook = icons["Facebook"];
  const Linkedin = icons["Linkedin"];
  const Instagram = icons["Instagram"];
  return (
    <main className="container bg-pink-300 mx-auto min-h-screen flex flex-col py-12 md:px-36">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Hero Content */}
        <div className="lg:w-1/2 space-y-8">
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/natewells.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-pink-400 flex items-center justify-center hover:bg-pink-400 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/nate-wells/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-pink-400 flex items-center justify-center hover:bg-pink-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/natewells.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-pink-400 flex items-center justify-center hover:bg-pink-400 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold">I am Nate</h1>
            <p className="text-xl text-gray-300">
              Business coach and network marketing professional with
              <br />a passion for helping others achieve success
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:w-1/2 relative h-[400px] lg:h-[600px] w-full">
          <Image
            src="/natewells.png"
            alt="Professional portrait of Nate Wells"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Introduction Section */}
      <section className="container mt-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white">Welcome!</h2>
          <p className="text-lg text-white mt-4 leading-relaxed font-light">
            I'm Nate Wells, a business coach and network marketing professional
            with a passion for helping individuals and teams achieve financial
            independence and personal growth. Through years of experience in the
            field, I've had the privilege of guiding aspiring entrepreneurs and
            business owners on their journeys to success. Let's connect and make
            things happen!
          </p>
        </div>
      </section>

      {/* Professional Achievements */}
      <section className="container mt-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white">
            Professional Highlights
          </h2>
          <ul className="text-lg text-white mt-4 leading-relaxed font-light space-y-3 list-disc list-inside">
            <li>
              Achieved Enagic 6A3-4 rank, demonstrating leadership in network
              marketing.
            </li>
            <li>
              Over a decade of experience mentoring individuals and teams in
              building sustainable businesses.
            </li>
            <li>
              Specialized in personal branding, leadership development, and
              strategic growth consulting.
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mt-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white">Work with Me</h2>
          <p className="text-lg text-white mt-4 leading-relaxed font-light">
            Ready to take your business to the next level? Let's collaborate to
            create a powerful strategy that aligns with your goals. Click below
            to start an exciting journey of growth and achievement.
          </p>
          <Link
            href="/work-with-me"
            className="mt-6 inline-block bg-pink-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Debug info */}
      <section className="container mt-12">
        <div className="max-w-3xl">
          <p className="text-sm text-gray-600 mt-4 leading-relaxed font-light">
            Thanks for reading. Website made with Crib CRM. Software info below:
            <br />
            BUILD_INFO = {`${process.env.NEXT_PUBLIC_BUILD_INFO}`}
            <br />
            APP_DOMAIN (api) = {`${process.env.NEXT_PUBLIC_APP_DOMAIN}`}
            <br />
            ORIGIN = {`${process.env.NEXT_PUBLIC_APP_ORIGIN}`}
          </p>
        </div>
      </section>
    </main>
  );
}

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 flex flex-col items-center py-12 px-6">
      {/* Profile Picture and Name */}
      <div className="text-center mb-8">
        <Image
          src="/natewells.jpg" // Place profile image in public folder with the name natewells.jpg
          alt="Nate Wells Profile Picture"
          width={160}
          height={160}
          className="rounded-full border-4 border-white shadow-lg mx-auto"
          priority
        />
        <h1 className="text-5xl font-bold text-white mt-4">Nate Wells</h1>
        <p className="text-lg text-white mt-2 font-light">Network Marketing Pro | Business Coach | Enagic 6A3-4</p>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-6">
        <a href="https://www.facebook.com/natewells.uk" className="text-white hover:text-gray-300 text-xl" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://www.instagram.com/natewells.uk" className="text-white hover:text-gray-300 text-xl" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.linkedin.com/in/nate-wells/" className="text-white hover:text-gray-300 text-xl" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      {/* Introduction Section */}
      <section className="text-justify mt-12 max-w-3xl px-4">
        <h2 className="text-3xl font-semibold text-white">Welcome!</h2>
        <p className="text-lg text-white mt-4 leading-relaxed font-light">
          I’m Nate Wells, a business coach and network marketing professional with a passion for helping individuals and teams
          achieve financial independence and personal growth. Through years of experience in the field, I've had the privilege of
          guiding aspiring entrepreneurs and business owners on their journeys to success. Let's connect and make things happen!
        </p>
      </section>

      {/* Professional Achievements */}
      <section className="text-justify mt-12 max-w-3xl px-4">
        <h2 className="text-3xl font-semibold text-white">Professional Highlights</h2>
        <ul className="text-lg text-white mt-4 leading-relaxed font-light space-y-3 list-disc list-inside">
          <li>Achieved Enagic 6A3-4 rank, demonstrating leadership in network marketing.</li>
          <li>Over a decade of experience mentoring individuals and teams in building sustainable businesses.</li>
          <li>Specialized in personal branding, leadership development, and strategic growth consulting.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-justify mt-12 max-w-3xl px-4">
        <h2 className="text-3xl font-semibold text-white">Work with Me</h2>
        <p className="text-lg text-white mt-4 leading-relaxed font-light">
          Ready to take your business to the next level? Let’s collaborate to create a powerful strategy that aligns with your goals.
          Click below to start an exciting journey of growth and achievement.
        </p>
        <Link
          href="/work-with-me"  // Replace with the actual link to your contact or work-with-me page
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          Get in Touch
        </Link>
      </section>
    </main>
  )
}

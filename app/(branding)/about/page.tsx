import Link from "next/link";
import WaterMark from "../_components/Watermark";

export default function Bio() {
    return (
        <main className="min-h-screen flex flex-col justify-center py-10 px-36">
            <WaterMark />
            <div className="text-justify max-w-3xl">
                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-4">About Nate Wells</h1>

                {/* Intro Paragraph */}
                <p className="text-lg text-white leading-relaxed mb-6">
                    Nate Wells is a seasoned Network Marketing Pro, a dedicated Business Coach, and a highly successful distributor in Enagic, achieving the prestigious rank of 6A3-4. With a passion for empowering others to unlock their full potential, Nate has built a career that bridges personal growth with strategic business insights.
                </p>

                {/* Professional Background */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Network Marketing Pro</h2>
                    <p className="text-lg text-white leading-relaxed">
                        As an experienced network marketer, Nate has developed a unique approach that combines authenticity with results-driven strategies. With years of hands-on experience, he has helped countless individuals and teams establish and grow successful network marketing businesses. Nate's focus is on building relationships and adding value, making him a trusted figure in the industry.
                    </p>
                </section>

                {/* Business Coaching Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Business Coach</h2>
                    <p className="text-lg text-white leading-relaxed">
                        In his role as a business coach, Nate works with clients across various industries to help them define and achieve their goals. He specializes in personal branding, leadership development, and creating sustainable business models that align with his clients' core values. His coaching is tailored, actionable, and designed to inspire growth and resilience.
                    </p>
                </section>

                {/* Enagic Achievements Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Enagic 6A3-4</h2>
                    <p className="text-lg text-white leading-relaxed">
                        Nate has reached the impressive rank of 6A3-4 in Enagic, a milestone that reflects his commitment, expertise, and leadership within the Enagic community. This achievement not only showcases his dedication but also his ability to mentor and uplift others as they navigate their own paths within Enagic.
                    </p>
                </section>

                {/* Call-to-Action / Back to Home */}
                <Link href="/" className="mt-8 inline-block bg-white text-pink-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100">
                    Back to Home
                </Link>
            </div>
        </main>
    )
}

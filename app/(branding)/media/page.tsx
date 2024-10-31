'use client'
import Link from 'next/link';
import { InstagramEmbed } from 'react-social-media-embed';

export default function Media() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 flex flex-col items-center justify-center py-10 px-4">
            {/* Media Section */}
            <div className="text-center max-w-2xl">
                <h1 className="text-4xl font-bold text-white mb-6">Media</h1>
                <p className="text-lg text-white mb-8 text-justify">
                    Discover the latest posts from Nate Wells' Instagram, where he shares moments from his travels, photography tips, and stories from around the world.
                </p>

                {/* Instagram Embed */}
                <div className="flex justify-center">
                    {typeof window !== 'undefined' && <InstagramEmbed
                        url="https://www.instagram.com/natewells.uk/"
                        width={420}
                        className='rounded-md'
                    />}
                </div>

                {/* Link back to Home */}

                <Link href="/" className="mt-8 inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100">
                    Back to Home
                </Link>
            </div>
        </main>
    )
}

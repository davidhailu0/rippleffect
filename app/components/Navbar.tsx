'use client'
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
    const [hidden, setHidden] = useState<boolean>(true)
    const toggleLinks = () => {
        setHidden((prev) => !prev)
    }
    return <nav className="absolute font-bold text-sm text-white right-3 md:right-9 top-16 md:top-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex justify-end">
                    <div className="hidden md:flex space-x-4">
                        <Link href={'/step-1'}>Step 1</Link>
                        <Link href={'/step-2'}>Step 2</Link>
                        <Link href={'/step-3'}>Step 3</Link>
                        <Link href={'/training'}>Trainings</Link>
                        <Link href={'/funnels'}>Funnels</Link>
                        <Link href={'/members'}>Members</Link>
                        <Link href={'/leaderboard'}>Leaderboard</Link>
                        <Link href={'/account'}>Account</Link>
                    </div>
                </div>
                <div className="flex items-center md:hidden">
                    <button onClick={toggleLinks} id="menu-button" className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div id="mobile-menu" className={`md:hidden ${hidden && 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col h-[12.5rem] py-5 bg-white z-50 text-black">
                <Link href={'/step-1'}>Step 1</Link>
                <Link href={'/step-2'}>Step 2</Link>
                <Link href={'/step-3'}>Step 3</Link>
                <Link href={'/training'}>Trainings</Link>
                <Link href={'/funnels'}>Funnels</Link>
                <Link href={'/members'}>Members</Link>
                <Link href={'/leaderboard'}>Leaderboard</Link>
                <Link href={'/account'}>Account</Link>
            </div>
        </div>
    </nav>
}
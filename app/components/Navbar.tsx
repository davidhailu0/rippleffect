"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function CustomNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname(); // Get current path

    // Function to determine the style of the active link
    const getLinkStyle = (path: string) =>
        pathname === path || (pathname.includes(path) && path !== '/')
            ? "text-cyan-200 font-semibold border-b-2 border-cyan-200"
            : "text-white hover:text-gray-200";

    return (
        <nav className="flex justify-between items-center w-full px-6 md:px-36 py-4 bg-[#1E213A] fixed top-0 right-0 left-0 z-[999] shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo_white.png" // Ensure logo image is in the public folder
                    alt="Nate Wells Logo"
                    width={40}
                    height={40}
                    className="mr-3"
                    unoptimized
                />
                <span className="text-white text-2xl font-bold">Nate Wells</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex w-10/12 justify-between items-center">
                {/* Left Links */}
                <ul className="flex gap-8">
                    <li>
                        <Link href="/" className={`${getLinkStyle("/")}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={`${getLinkStyle("/about")}`}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/media" className={`${getLinkStyle("/media")}`}>
                            Media
                        </Link>
                    </li>
                </ul>

                {/* Right Link */}
                <ul>
                    <li>
                        <Link href="/work-with-me" className={`${getLinkStyle("/work-with-me")} border border-white p-4`}>
                            Work with Me
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white focus:outline-none"
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Full-Page Navigation */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-20 flex items-center justify-center">
                    <ul className="flex flex-col items-center space-y-8 text-2xl text-white">
                        <li>
                            <Link href="/" className={`${getLinkStyle("/")}`} onClick={() => setIsMobileMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`${getLinkStyle("/about")}`} onClick={() => setIsMobileMenuOpen(false)}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/media" className={`${getLinkStyle("/media")}`} onClick={() => setIsMobileMenuOpen(false)}>
                                Media
                            </Link>
                        </li>
                        <li>
                            <Link href="/work-with-me" className={`${getLinkStyle("/work-with-me")}`} onClick={() => setIsMobileMenuOpen(false)}>
                                Work with Me
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

"use client";

import { useAppSelector } from "@/lib/reduxStore/hooks";
import { fetchBookings } from "@/services/bookingServices";
import { formatFriendlyDate } from "@/util/UtilformatDateFriendly";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isLogged = useAppSelector((state) => state.auth.isLogged);

  const lead = useAppSelector((state) => state.auth.lead);

  const pathname = usePathname(); // Get current path

  const { data: bookings } = useQuery<Booking[], Error>({
    queryKey: ["bookings", lead?.tag_list],
    queryFn: fetchBookings,
    enabled: isLogged,
  });

  // Function to determine the style of the active link
  const getLinkStyle = (path: string) =>
    clsx({
      "text-pink-400 font-semibold border-b-2 border-pink-400":
        pathname === path,
      "text-white hover:text-gray-200":
        pathname !== path && path !== "/work-with-me",
    });

  return (
    <nav className="flex justify-between items-center w-full px-6 md:px-36 py-4 bg-[#1f2235] shadow-md z-50 sticky top-0">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo_white.webp"
          alt="Nate Wells Logo"
          width={40}
          height={40}
          className="mr-3"
          unoptimized
        />
        <Image src={"/NW.webp"} alt="Nate Wells" height={40} width={100} />
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
        <ul className="flex gap-6 items-center">
          {isLogged ? (
            <>
              {bookings && bookings?.length > 0 && (
                <li className="text-yellow-400">
                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-1 "
                  >
                    <Calendar size={"18"} /> Upcoming booking:{" "}
                    {formatFriendlyDate(bookings[0]?.start_date)}
                  </Link>
                </li>
              )}

              <li>
                <Link
                  href="/leads"
                  className={`${getLinkStyle(
                    "/work-with-me"
                  )} text-primary border px-4 py-3 border-white bg-white rounded-lg hover:text-pink-400 transition-all ease-in-out duration-300`}
                >
                  My Leads
                </Link>
              </li>
            </>
          ) : (
            <>
              {!pathname.includes("work-with-me") && (
                <li>
                  <Link
                    href="/work-with-me"
                    className={`${getLinkStyle(
                      "/work-with-me"
                    )} text-primary border px-4 py-3 border-white bg-white rounded-lg hover:text-pink-400 transition-all ease-in-out duration-300`}
                  >
                    Work with Me
                  </Link>
                </li>
              )}
            </>
          )}
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
              <Link
                href="/"
                className={`${getLinkStyle("/")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${getLinkStyle("/about")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/media"
                className={`${getLinkStyle("/media")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Media
              </Link>
            </li>
            <li>
              <Link
                href="/work-with-me"
                className={`${getLinkStyle("/work-with-me")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work with Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

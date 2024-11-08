"use client";
import * as React from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import { useCookies } from "react-cookie";
// import AuthPopup from "@/app/(protected)-old/_components/AuthPopup";
import { usePathname } from "next/navigation";

export default function SubNavbar({ ref_code }: { ref_code?: string }) {
  const [showButton, setShowButton] = React.useState({
    step1: false,
    blueBTN: "",
  });
  const [showPopup, setShowpop] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [cookie] = useCookies(["step-1-watched", "token", "booked"]);

  const closePopup = () => setShowpop(false);

  React.useEffect(() => {
    const step1 = Boolean(cookie["step-1-watched"]);
    const blueBTN = cookie["token"]
      ? cookie["booked"]
        ? ""
        : "Book Now"
      : "Create Account";
    setShowButton({ step1, blueBTN });
  }, [cookie]);

  const handleBlueBTNClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    showButton.blueBTN === "Create Account"
      ? setShowpop(true)
      : router.push("/book");
  };

  const getLinkStyle = (path: string) =>
    pathname.includes(path)
      ? "text-pink-500 border-b-2 border-pink-500"
      : "text-gray-700 hover:text-pink-500 hover:border-pink-500";

  return (
    <nav className="flex items-center justify-end w-full h-16 bg-white shadow-md z-50 border-b border-gray-200 mb-4 px-24">
      {/* Logo */}

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 px-7 items-center">
        {showButton.step1 && (
          <>
            <li>
              <Link
                href="/step-1"
                className={`${getLinkStyle("/step-1")} px-2 py-1`}
              >
                Step 1
              </Link>
            </li>
            <li>
              <Link
                href="/step-2"
                className={`${getLinkStyle("/step-2")} px-2 py-1`}
              >
                Step 2
              </Link>
            </li>
            <li>
              <Link
                href="/step-3"
                className={`${getLinkStyle("/step-3")} px-2 py-1`}
              >
                Step 3
              </Link>
            </li>
            <li>
              <Link
                href="/my-bookings"
                className={`${getLinkStyle("/step-3")} px-2 py-1`}
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                href="/training"
                className={`${getLinkStyle(
                  "/training"
                )} px-2 py-1`}
              >
                Training
              </Link>
            </li>
            <li>
              <Link
                href="/landing_pages"
                className={`${getLinkStyle(
                  "/landing-pages"
                )} px-2 py-1`}
              >
                Landing Pages
              </Link>
            </li>
            <li>
              <Link
                href="/leads"
                className={`${getLinkStyle("/leads")} px-2 py-1`}
              >
                Leads
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className={`${getLinkStyle(
                  "/leaderboard"
                )} px-2 py-1`}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className={`${getLinkStyle("/account")} px-2 py-1`}
              >
                Account
              </Link>
            </li>
          </>
        )}
        {showButton.blueBTN && (
          <Button
            onClick={handleBlueBTNClick}
            className="px-3 py-1 bg-pink-400 hover:bg-pink-600 text-white rounded"
          >
            {showButton.blueBTN}
          </Button>
        )}
        {/* {showPopup && <AuthPopup ref_code={ref_code} closePopup={closePopup} />} */}
      </ul>

      {/* Mobile Full-Screen Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-20 flex flex-col items-center justify-center space-y-6 text-2xl text-white">
          {showButton.step1 && (
            <>
              <Link
                href="/step-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Step 1
              </Link>
              <Link
                href="/step-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Step 2
              </Link>
              <Link
                href="/step-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Step 3
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Booking
              </Link>
              <Link
                href="/training"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Training
              </Link>
              <Link
                href="/landing-pages"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Landing Pages
              </Link>
              <Link
                href="/leads"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leads
              </Link>
              <Link
                href="/leaderboard"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
            </>
          )}
          {showButton.blueBTN && (
            <Button
              onClick={handleBlueBTNClick}
              className="px-3 py-1 bg-pink-400 hover:bg-pink-600 text-white rounded"
            >
              {showButton.blueBTN}
            </Button>
          )}
          {/* {showPopup && (
            <AuthPopup ref_code={ref_code} closePopup={closePopup} />
          )} */}
        </div>
      )}
    </nav>
  );
}

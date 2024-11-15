"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Calendar, Menu } from 'lucide-react'
import { useAppSelector } from "@/lib/reduxStore/hooks"
import { fetchBookings } from "@/services/bookingServices"
import { formatFriendlyDate } from "@/util/UtilformatDateFriendly"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const isLogged = useAppSelector((state) => state.auth.isLogged)
  const lead = useAppSelector((state) => state.auth.lead)
  const pathname = usePathname()

  const { data: bookings } = useQuery<Booking[], Error>({
    queryKey: ["bookings", lead?.tag_list],
    queryFn: fetchBookings,
    enabled: isLogged,
  })

  const getLinkStyle = (path: string) =>
    cn(
      "transition-colors hover:text-pink-400",
      pathname === path
        ? "text-pink-400 font-semibold"
        : "text-gray-200 hover:text-pink-200"
    )

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/media", label: "Media" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1f2235] px-4 py-4 shadow-md md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/logo_white.webp" alt="Nate Wells Logo" />
              <AvatarFallback>NW</AvatarFallback>
            </Avatar>
            <Image
              src="/NW.webp"
              alt="Nate Wells"
              width={100}
              height={40}
              className="hidden sm:block"
            />
          </Link>
          <ul className="hidden md:flex md:space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={getLinkStyle(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {isLogged ? (
            <div className="hidden items-center space-x-4 md:flex">
              {bookings && bookings.length > 0 && (
                <Link
                  href="/my-bookings"
                  className="flex items-center space-x-1 text-sm text-yellow-400"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden lg:inline">
                    Next: {formatFriendlyDate(bookings[0]?.start_date)}
                  </span>
                  <span className="lg:hidden">Upcoming</span>
                </Link>
              )}
              <Button asChild variant="secondary" size="sm">
                <Link href="/leads">My Leads</Link>
              </Button>
            </div>
          ) : (
            !pathname.includes("work-with-me") && (
              <Button asChild variant="secondary" size="sm" className="hidden md:inline-flex">
                <Link href="/work-with-me">Work with Me</Link>
              </Button>
            )
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-[#1f2235] text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      getLinkStyle(item.href),
                      "text-lg transition-colors hover:text-pink-400"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {isLogged ? (
                  <>
                    <Link
                      href="/leads"
                      className="text-lg text-white transition-colors hover:text-pink-400"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Leads
                    </Link>
                    {bookings && bookings.length > 0 && (
                      <Link
                        href="/my-bookings"
                        className="flex items-center space-x-2 text-sm text-yellow-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>
                          Next: {formatFriendlyDate(bookings[0]?.start_date)}
                        </span>
                      </Link>
                    )}
                  </>
                ) : (
                  !pathname.includes("work-with-me") && (
                    <Link
                      href="/work-with-me"
                      className="text-lg text-white transition-colors hover:text-pink-400"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Work with Me
                    </Link>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
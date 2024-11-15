"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import { usePathname } from "next/navigation"
import { useAppSelector } from "@/lib/reduxStore/hooks"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useDispatch } from "react-redux"
import { useQueryClient } from "@tanstack/react-query"
import { setIsLoggedOut } from "@/lib/reduxStore/authSlice"

export default function SubNavbar({ ref_code }: { ref_code?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const lead = useAppSelector((state) => state.auth.lead)
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();


  const handleBTNClick = () => {
    router.push("/book")
  }

  const getLinkStyle = (path: string) =>
    cn(
      "px-2 py-1 transition-colors hover:text-pink-500",
      pathname.includes(path)
        ? "text-pink-500 border-b-2 border-pink-500"
        : "text-gray-700 hover:border-pink-500"
    )
  const handleLogout = () => {
    dispatch(setIsLoggedOut());
    queryClient.clear();
  };
  const navItems = [
    { href: "/step-1", label: "Step 1" },
    { href: "/step-2", label: "Step 2" },
    { href: "/step-3", label: "Step 3" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/training", label: "Training" },
    { href: "/leads", label: "Leads" },
    { href: "/account", label: "Account" },
  ]

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md md:px-12 lg:px-28 ">
      <div className="flex-1" />
      <ul className="hidden items-center gap-2 md:flex lg:gap-6">
        {lead &&
          navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={getLinkStyle(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        {!lead?.tag_list.includes("booked_call") && (
          <Button
            onClick={handleBTNClick}
            className="px-3 py-2  border-pink-400 border transition-colors hover:bg-pink-400 hover:text-white text-pink-400 
rounded"
          >
            {!lead?.tag_list.includes("booked") && "Book Now"}
          </Button>
        )}
        {isLogged && (
          <Button
            onClick={handleLogout}
            className="px-4 hover:bg-primary/90 py-2 bg-primary transition-colors  text-white rounded"
          >
            Logout
          </Button>
        )}
      </ul>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-black" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col space-y-4">
            {lead &&
              navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    getLinkStyle(item.href),
                    "text-lg"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            {!lead?.tag_list.includes("booked_call") && (
              <Button
                onClick={handleBTNClick}
                className="px-3 py-2  border-pink-400 border transition-colors hover:bg-pink-400 hover:text-white text-pink-400 
rounded"
              >
                {!lead?.tag_list.includes("booked") && "Book Now"}
              </Button>
            )}
            {isLogged && (
              <Button
                onClick={handleLogout}
                className="px-4 hover:bg-primary/90 py-2 bg-primary transition-colors  text-white rounded"
              >
                Logout
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  )
}







"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubNavbar({ ref_code }: { ref_code?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const lead = useAppSelector((state) => state.auth.lead);
  const isLogged = useAppSelector((state) => state.auth.isLogged);

  const handleBTNClick = () => {
    router.push("/book");
  };

  const getLinkStyle = (path: string) =>
    cn(
      "px-2 py-1 transition-all duration-200 relative",
      pathname.includes(path) || pathname.includes(path.substring(0, path.length - 1))
        ? "text-pink-500"
        : "text-gray-700 hover:text-pink-500"
    );

  const navItems = [
    { href: "/step-1", label: "Step 1" },
    { href: "/step-2", label: "Step 2" },
    { href: "/step-3", label: "Step 3" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/trainings", label: "Trainings" },
    { href: "/leads", label: "Leads" },
    { href: "/account", label: "Account" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md md:px-12 lg:px-28"
    >
      <div className="flex-1" />
      <ul className="hidden items-center gap-2 md:flex lg:gap-6">
        {lead &&
          navItems.map((item) => (
            <motion.li
              key={item.href}
              onHoverStart={() => setHoveredItem(item.href)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative"
            >
              <Link href={item.href} className={getLinkStyle(item.href)}>
                {item.label}
                {pathname.includes(item.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {hoveredItem === item.href && !pathname.includes(item.href) && (
                  <motion.div
                    layoutId="hoverIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500 opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        {!lead?.tag_list.includes("booked_call") && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              onClick={handleBTNClick}
              className="px-3 py-2 bg-white border-pink-400 border transition-all duration-200 hover:bg-pink-400 hover:text-white text-pink-400 rounded shadow-sm hover:shadow-md"
            >
              Book Now
            </Button>
          </motion.div>
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
            <Menu className="h-6 w-6 text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 flex flex-col space-y-4"
          >
            <AnimatePresence>
              {lead &&
                navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(getLinkStyle(item.href), "text-lg block")}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
            </AnimatePresence>
            {!lead?.tag_list.includes("booked_call") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={handleBTNClick}
                  className="w-full px-3 py-2 bg-white border-pink-400 border transition-all duration-200 hover:bg-pink-400 hover:text-white text-pink-400 rounded shadow-sm hover:shadow-md"
                >
                  Book Now
                </Button>
              </motion.div>
            )}
          </motion.nav>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
}
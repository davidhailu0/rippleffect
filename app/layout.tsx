import type { Metadata } from "next";
import Image from "next/image";
import { roboto } from "./fonts/roboto";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nate Wells",
  description: "Increase Your Income",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <div className="bg-[url('/background.png')] bg-contain py-4 md:pt-12 md:pb-20 mx-auto relative h-screen box-border overflow-y-scroll bg-no-repeat">
          <Image src='/logo.png' alt='logo' height={127.51} width={120} className="mx-auto" unoptimized />
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { roboto } from "./fonts/roboto";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ripple Effect",
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
        <div className="bg-[url('/background.png')] bg-cover pt-[50px] pb-[75px] mx-auto relative">
          <Image src='/logo.png' alt='logo' height={127.51} width={120} className="mx-auto" />
          {children}
        </div>
      </body>
    </html>
  );
}

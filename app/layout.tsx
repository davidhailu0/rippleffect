import type { Metadata } from "next";
import { roboto } from "./fonts/roboto";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import AuthSync from "./(protected)/component/AuthSync";

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
        <NextTopLoader color="#fff" />
        <div className="bg-contain bg-gradient-to-r from-blue-500 to-cyan-500 py-4 md:pt-12 md:pb-20 mx-auto relative h-screen box-border overflow-y-scroll bg-no-repeat">
          <AuthSync>
            {children}
          </AuthSync>
        </div>
      </body>
    </html>
  );
}

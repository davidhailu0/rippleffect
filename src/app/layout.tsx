import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Navbar from "../components/ui/Navbar";
import { Toaster } from "sonner";
import ReduxStoreProvider from "@/lib/reduxStore/ReduxStoreProvider";
import ReactQueryProvider from "@/lib/reactQuery/ReactQueryProvider";
import FetchVideos from "@/components/fetch-videos";
import "./globals.css";
import CheckAuth from "@/components/check-auth";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});
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
      <body className={`${roboto.className} antialiased`}>
        <ReduxStoreProvider>
          <ReactQueryProvider>
            <Toaster position="top-center" duration={4000} richColors />
            <FetchVideos />
            <CheckAuth />
            <div className="bg-contain bg-bgColor pt-0 md:pb-20 mx-auto h-screen relative scroll-smooth box-border bg-no-repeat text-white overflow-y-auto">
              <Navbar />
              {children}
            </div>
            <NextTopLoader showSpinner={false} color="#fff" />
          </ReactQueryProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}

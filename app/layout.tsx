import type { Metadata } from "next";
import { roboto } from "./fonts/roboto";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { CustomNavbar } from "./components/Navbar";
import ReduxStoreProvider from "@/lib/reduxStore/ReduxStoreProvider";
import ReactQueryProvider from "@/lib/reactQuery/ReactQueryProvider";
import { Toaster } from "sonner";
import FetchVideos from "@/components/fetch-videos";

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
            <div className="bg-contain min-h-dvh bg-bgColor py-4 pt-[4.7rem] md:pb-20 mx-auto relative box-border  bg-no-repeat text-white">
              <CustomNavbar />
              {children}
            </div>
          </ReactQueryProvider>
        </ReduxStoreProvider>
        <NextTopLoader color="#fff" />
      </body>
    </html>
  );
}

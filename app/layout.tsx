import type { Metadata } from "next";
import { roboto } from "./fonts/roboto";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { CustomNavbar } from "./components/Navbar";
import { Toaster } from "sonner";
import ReduxStoreProvider from "@/lib/reduxStore/ReduxStoreProvider";
import ReactQueryProvider from "@/lib/reactQuery/ReactQueryProvider";
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
            <div className="bg-contain min-h-dvh bg-bgColor py-4 pt-[4.7rem] md:pb-20 mx-auto h-dvh relative box-border  bg-no-repeat text-white overflow-y-scroll">
              <CustomNavbar />
              {children}
            </div>
            <NextTopLoader color="#fff" />
          </ReactQueryProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}


// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WatchListProvider } from "../app/context/WatchListContext"; // ✅ import context

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });



export const metadata = {
  description: "Discover and list businesses in our professional directory",
  generator: "WebTech.com.bd",
  icons: {
    icon: "https://i.postimg.cc/P5Y7Zyj5/dghoij-removebg-preview.png",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.className}>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        {/* ✅ Wrap your app with WatchListProvider */}
        <WatchListProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </WatchListProvider>
      </body>
    </html>
  );
}

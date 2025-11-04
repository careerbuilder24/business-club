
// import type React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import "./globals.css"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"

// const geistSans = Geist({ subsets: ["latin"] })
// const geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Business Club",
//   description: "Discover and list businesses in our professional directory",
//   generator: "v0.app",
//   icons: {
//     icon: "https://i.postimg.cc/P5Y7Zyj5/dghoij-removebg-preview.png", // Path to your favicon file in the public folder
//   },
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.className} bg-background text-foreground`}>
//         <Navbar />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   )
// }
// import type React from "react";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";

// const geistSans = Geist({ subsets: ["latin"] });
// const geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Business Club",
//   description: "Discover and list businesses in our professional directory",
//   generator: "v0.app",
//   icons: {
//     icon: "https://i.postimg.cc/P5Y7Zyj5/dghoij-removebg-preview.png", // favicon
//   },
// };

// // app/layout.tsx

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={geistSans.className}>
//       <body className="bg-background text-foreground" suppressHydrationWarning>
//         <Navbar />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }
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

// export const metadata: Metadata = {
//   title: "Business Club",
//   description: "Discover and list businesses in our professional directory",
//   generator: "v0.app",
//   icons: {
//     icon: "https://i.postimg.cc/P5Y7Zyj5/dghoij-removebg-preview.png", // favicon
//   },
// };

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

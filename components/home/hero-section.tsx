
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const banners = [
  "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
  "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
  "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
];

export default function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // const nextBanner = () =>
  //   setCurrentBanner((prev) => (prev + 1) % banners.length);

  // const prevBanner = () =>
  //   setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="relative z-10 w-full flex flex-col md:flex-row p-10">
      {/* Main Banner */}
      <div className="flex-1 relative w-full md:w-6/12 lg:ml-64 md:mt-0"> 
        {/* Fixed Aspect Ratio Banner Wrapper */}
        {/* FIX APPLIED HERE: Adjusted aspect ratios for small, medium, and extra-small devices. */}
        <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/6] overflow-hidden">
          <Image
            key={banners[currentBanner]}
            src={banners[currentBanner]}
            alt="Business promotional banner"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Overlay and other elements remain the same... */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-6 right-6 text-white max-w-md text-right hidden lg:block">
          <h1 className="text-4xl font-bold">Business Club</h1>
          <h2 className="mt-2 text-lg">
            Discover and connect with top businesses in your City <br />
            Explore opportunities and grow your network.
          </h2>
        </div>
        {/* <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
        >
          ❮
        </button> */}
        {/* <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
        >
          ❯
        </button> */}
        <div className="absolute bottom-4 left-4 flex justify-start gap-2">
          {banners.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === currentBanner ? "bg-green-700" : "bg-white/60"
              } transition`}
              onClick={() => setCurrentBanner(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
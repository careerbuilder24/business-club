
'use client';

import React from "react";
import Image from "next/image";

export default function ConnectedCompany() {
  const logos = [
    "https://i.postimg.cc/BvH72Q76/sources.png",
    "https://i.postimg.cc/vHB7jPkr/cheaphost.png",
    "https://i.postimg.cc/qR4yGQ2C/barzak.png",
    "https://i.postimg.cc/rw5DYxVG/venture-capital.png",
  ];

  return (
    <div className="overflow-hidden w-full bg-white py-6">
      <div className="flex items-center animate-slide gap-8">
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className="flex-shrink-0 flex items-center justify-center h-20">
            <Image
              src={logo}
              alt={`Logo ${index}`}
              width={150}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Tailwind CSS animation */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          display: flex;
          animation: slide 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

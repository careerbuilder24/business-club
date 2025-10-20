'use client';

import React from 'react';

export default function ComplementSection() {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Background scrolling image */}
      <div className="absolute w-[200%] h-full top-0 left-0 animate-backgroundScroll">
        <div
          className="w-full h-full bg-cover bg-center float-left"
          style={{ backgroundImage: 'url(https://i.postimg.cc/d047JDBS/eafgj.png)' }}
        ></div>
        <div
          className="w-full h-full bg-cover bg-center float-left"
          style={{ backgroundImage: 'url(https://i.postimg.cc/d047JDBS/eafgj.png)' }}
        ></div>
      </div>

      {/* Overlay Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Our Platform
        </h2>
        <p className="text-lg md:text-2xl drop-shadow-md">
          Connecting you with trusted businesses worldwide
        </p>
      </div>

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes backgroundScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-backgroundScroll {
          display: flex;
          animation: backgroundScroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

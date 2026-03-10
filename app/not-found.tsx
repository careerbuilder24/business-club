
"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "@/public/animation/404.json";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      
      {/* Lottie Animation */}
      <div className="w-72 h-72">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Text */}
      {/* <h1 className="text-4xl font-bold mt-4">404</h1> */}
      <p className="mt-2 text-lg text-gray-600">
        Page not found
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-[#2C8845] text-white rounded-lg hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
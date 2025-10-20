"use client";

import React from "react";
import Image from "next/image";

export default function VisionMission() {
  return (
    <section className="py-20 bg-gray-200 my-24">
      <div className="container-custom mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image / Video placeholder */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://i.postimg.cc/HxK6NvDS/ewdfoikh.png"
              alt="Vision & Mission"
              fill
              className="object-cover"
              
            />
          </div>
        </div>

        {/* Text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision & Mission</h2>
          <p className="text-gray-700 mb-4">
            <strong>Vision:</strong> To become the leading platform connecting businesses and professionals, creating opportunities for growth and collaboration across industries.
          </p>
          <p className="text-gray-700">
            <strong>Mission:</strong> To provide a reliable and user-friendly directory for discovering, connecting, and promoting businesses. We aim to empower entrepreneurs and service providers while delivering value to our users.
          </p>
        </div>
      </div>
    </section>
  );
}

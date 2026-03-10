
"use client";

import React from "react";
import Image from "next/image";

export default function VisionMission() {
  return (
    <section
      className="py-20 bg-gray-200 my-24 [@media(min-width:1033px)]:ml-52"
      aria-labelledby="vision-mission-title"
    >
      <div className="container-custom mx-auto flex flex-col  lg:flex-row items-center gap-12">
        
        {/* Image Section */}
        <div className="w-full lg:w-1/2  [@media(min-width:1033px)]:ml-36
            [@media(min-width:1735px)]:ml-28">
          <div
            className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg"
            role="img"
            aria-label="Business Club Vision and Mission"
          >
            <Image
              src="https://i.postimg.cc/HxK6NvDS/ewdfoikh.png"
              alt="Business Club Vision and Mission illustration showing business growth and connection"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text Content */}
        <article className="w-full lg:w-1/2 text-center lg:text-left">
          <header>
            <h2
              id="vision-mission-title"
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Our Vision & Mission
            </h2>
          </header>

          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>Vision:</strong> Business Club aims to become Bangladesh’s
            most trusted digital business directory — a platform where companies,
            professionals, and entrepreneurs can connect, collaborate, and grow
            together across all industries.
          </p>

          <p className="text-gray-700 leading-relaxed">
            <strong>Mission:</strong> Our mission is to make business discovery
            easier and more transparent. Business Club provides a reliable,
            user-friendly platform designed to help customers find verified
            businesses, while empowering organizations to promote their services
            and expand their digital presence.
          </p>
        </article>

      </div>
    </section>
  );
}

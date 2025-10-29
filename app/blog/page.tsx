
"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Filter, MapPin, Phone, Mail, Star, ChevronDown } from "lucide-react";

export default function BlogPage() {
  const [posts] = useState(blogPosts);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Added 'p-4' back for padding around the entire grid */}
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-6  max-w-full">
        {/* --- LEFT SIDEBAR --- */}
        {/* Added h-[782px] to match the height of 3 ads + 2 gaps (3*250 + 2*16 = 782) */}
        <aside className="bg-[#2C8845] text-white p-4 h-[782px] sticky top-4 self-start">
          <button className="w-full bg-white text-[#2C8845] font-bold py-2 rounded-md mb-4">
            All Blogs
          </button>

          {/* Blog Category Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Blog Category
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between cursor-pointer hover:text-gray-200">
                Technology <span>(5)</span>
              </li>
              <li className="flex justify-between cursor-pointer hover:text-gray-200">
                Travel <span>(3)</span>
              </li>
              <li className="flex justify-between cursor-pointer hover:text-gray-200">
                Education <span>(7)</span>
              </li>
              <li className="flex justify-between cursor-pointer hover:text-gray-200">
                Business <span>(2)</span>
              </li>
            </ul>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Location (District)
            </h3>

            <div className="bg-[#24923F] rounded-md p-2">
              <div className="flex justify-between items-center cursor-pointer font-semibold">
                Dhaka Division
                <ChevronDown size={16} />
              </div>
              <ul className="pl-2 mt-2 space-y-1 text-sm">
                <li className="flex justify-between">
                  Dhaka <span>(2)</span>
                </li>
                <li className="flex justify-between">
                  Gazipur <span>(1)</span>
                </li>
                <li className="flex justify-between">
                  Narayanganj <span>(1)</span>
                </li>
                <li className="flex justify-between">
                  Munshiganj <span>(0)</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#24923F] rounded-md p-2 mt-3">
              <div className="flex justify-between items-center cursor-pointer font-semibold">
                Chittagong Division
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </aside>

        {/* --- MIDDLE BLOG LIST --- */}
        <main>
          <div className="mb-4 flex justify-between items-center bg-white border border-gray-200 rounded-md p-3">
            <span className="text-gray-600 text-sm font-medium">
              Total Blogs: {posts.length}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search blog..."
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>Newest</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <div className="space-y-5">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col md:flex-row"
              >
                {/* Left: Blog Image */}
                <div className="md:w-1/3 relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="object-cover w-full h-56 md:h-full"
                  />
                  <span className="absolute top-0 left-0 bg-[#2C8845] text-white text-xs font-semibold px-3 py-1 rounded-br-md">
                    Dhaka
                  </span>
                </div>

                {/* Right: Blog Content */}
                <div className="md:w-2/3 p-5 flex flex-col justify-between">
                  <div>
                    <Link href={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold text-gray-900 hover:text-[#2C8845] transition">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-500 text-sm mb-3">
                      by {post.author}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                      {post.content.substring(0, 140)}...
                    </p>

                    <div className="flex items-center gap-1 text-yellow-500 mb-3">
                      <Star size={16} fill="currentColor" />
                      <span className="text-gray-800 font-semibold">4.9</span>
                      <span className="text-gray-500">(120 reviews)</span>
                    </div>
                  </div>

                  <div className="flex gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={15} className="text-[#2C8845]" />
                      <span>Banani, Dhaka</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={15} className="text-[#2C8845]" />
                      <span>+8801711-555444</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={15} className="text-[#2C8845]" />
                      <span>info@techsolutions.com</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* --- RIGHT ADS --- */}
        <aside className="space-y-4 sticky top-4 self-start">
          {[
            "AD SENSE 1 (150x250)",
            "AD SENSE 2 (150x250)",
            "AD SENSE 3 (150x250)",
          ].map((ad, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm h-[250px]"
            >
              {ad}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
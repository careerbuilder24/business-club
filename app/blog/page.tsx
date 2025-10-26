

"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { MapPin, Phone, Mail, Star } from "lucide-react";

import NewBlogPostModal from "@/components/blog/new-blog-post-modal";

// NOTE: I'm assuming the 'blogPosts' data structure has a 'category' field for the badge,
// and 'image', 'title', 'content', and 'id' fields.

export default function BlogPage() {
  const [posts, setPosts] = useState(blogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
  };

  // Helper function to determine the badge color based on category/location
  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Dhaka":
        return "bg-blue-600"; // Darker blue for a different look
      case "Khulna":
        return "bg-red-600"; // Darker red/maroon
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container-custom max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Business Blog Directory
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Read insights and stories from our community of business owners and
            professionals
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            Write a Blog Post
          </button>
        </div>

        {/* New Post Modal */}
        <NewBlogPostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNewPost}
        />

        {/* Blog Posts (Now Directory Style Cards) */}
        <div className="space-y-6">
          {posts.map((post) => {
       
            const locationTag =
              post.location ||
              (parseInt(post.id) % 2 === 0 ? "Dhaka" : "Khulna");
            const locationColor = getBadgeColor(locationTag);

            // Placeholder for the post's main category displayed at the bottom of the image
            const mainCategory = post.category || "Technology & Software";

            return (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Section (Left side in Directory style) */}
                <Link
                  href={`/blog/${post.id}`}
                  className="relative block w-full md:w-2/5 flex-shrink-0"
                >
                  <div className="h-64 md:h-80">
                    {" "}
                    {/* Ensure the image container has a height */}
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 1. Location Tag (Top-left corner, like 'Khulna' or 'Dhaka' in the image) */}
                  <span
                    className={`absolute top-0 left-0 z-10 text-xs font-medium px-3 py-1 text-white ${locationColor} rounded-br-lg`}
                  >
                    {locationTag}
                  </span>

                  {/* 2. Main Category Tag (Bottom-left corner, inside the image) */}
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 p-1">
                    <span className="text-white text-xs font-medium px-2 py-0.5">
                      {mainCategory}
                    </span>
                  </div>
                </Link>

                {/* Content Section (Right side in Directory style) */}
                <div className="p-6 flex flex-col justify-between w-full md:w-3/5">
                  <div>
                    {/* Title/Business Name */}
                    <Link href={`/blog/${post.id}`}>
                      <h2 className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors cursor-pointer mb-1">
                        {post.title}
                      </h2>
                    </Link>
                    {/* Subtitle/Company Name */}
                    <p className="text-gray-500 text-sm mb-4">{post.author}</p>

                    {/* Excerpt/Detailed Description */}
                    <p className="text-gray-700 mb-4 line-clamp-3 text-sm">
                      {post.content.substring(0, 150)}...
                    </p>

                    {/* Directory-style Meta Info (Rating and Reviews) */}
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      {/* Placeholder for Rating */}
                      <div className="flex items-center text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="font-semibold text-gray-800 ml-1">
                          4.9
                        </span>
                        <span className="text-gray-500 ml-1">
                          (203 reviews)
                        </span>
                      </div>
                    </div>

                    {/* Contact Info (Address, Phone, Email) */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin
                          size={16}
                          className="text-green-600 mr-2 flex-shrink-0"
                        />
                        <span className="line-clamp-1">
                          456 Design Ave, New York, NY 10001
                        </span>{" "}
                        {/* Placeholder Address */}
                      </div>
                      <div className="flex items-center">
                        <Phone
                          size={16}
                          className="text-green-600 mr-2 flex-shrink-0"
                        />
                        <span>+1 (555) 234-5678</span> {/* Placeholder Phone */}
                      </div>
                      <div className="flex items-center">
                        <Mail
                          size={16}
                          className="text-green-600 mr-2 flex-shrink-0"
                        />
                        <span className="truncate">
                          hello@creativedesign.com
                        </span>{" "}
                        {/* Placeholder Email */}
                      </div>
                    </div>
                  </div>

                  {/* Service Tags (Bottom section) */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      Graphic Design
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      UI/UX
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      Branding
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

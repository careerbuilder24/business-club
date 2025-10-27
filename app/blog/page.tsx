

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { blogPosts } from "@/lib/data";
// import { MapPin, Phone, Mail, Star } from "lucide-react";

// import NewBlogPostModal from "@/components/blog/new-blog-post-modal";

// // NOTE: I'm assuming the 'blogPosts' data structure has a 'category' field for the badge,
// // and 'image', 'title', 'content', and 'id' fields.

// export default function BlogPage() {
//   const [posts, setPosts] = useState(blogPosts);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleNewPost = (newPost: any) => {
//     setPosts([newPost, ...posts]);
//     setIsModalOpen(false);
//   };

//   // Helper function to determine the badge color based on category/location
//   const getBadgeColor = (category: string) => {
//     switch (category) {
//       case "Dhaka":
//         return "bg-blue-600"; // Darker blue for a different look
//       case "Khulna":
//         return "bg-red-600"; // Darker red/maroon
//       default:
//         return "bg-gray-700";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="container-custom max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Business Blog Directory
//           </h1>
//           <p className="text-gray-600 text-lg mb-6">
//             Read insights and stories from our community of business owners and
//             professionals
//           </p>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
//           >
//             Write a Blog Post
//           </button>
//         </div>

//         {/* New Post Modal */}
//         <NewBlogPostModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleNewPost}
//         />

//         {/* Blog Posts (Now Directory Style Cards) */}
//         <div className="space-y-6">
//           {posts.map((post) => {
       
//             const locationTag =
//               post.location ||
//               (parseInt(post.id) % 2 === 0 ? "Dhaka" : "Khulna");
//             const locationColor = getBadgeColor(locationTag);

//             // Placeholder for the post's main category displayed at the bottom of the image
//             const mainCategory = post.category || "Technology & Software";

//             return (
//               <article
//                 key={post.id}
//                 className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300"
//               >
//                 {/* Image Section (Left side in Directory style) */}
//                 <Link
//                   href={`/blog/${post.id}`}
//                   className="relative block w-full md:w-2/5 flex-shrink-0"
//                 >
//                   <div className="h-64 md:h-80">
//                     {" "}
//                     {/* Ensure the image container has a height */}
//                     <img
//                       src={post.image || "/placeholder.svg"}
//                       alt={post.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* 1. Location Tag (Top-left corner, like 'Khulna' or 'Dhaka' in the image) */}
//                   <span
//                     className={`absolute top-0 left-0 z-10 text-xs font-medium px-3 py-1 text-white ${locationColor} rounded-br-lg`}
//                   >
//                     {locationTag}
//                   </span>

//                   {/* 2. Main Category Tag (Bottom-left corner, inside the image) */}
//                   <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 p-1">
//                     <span className="text-white text-xs font-medium px-2 py-0.5">
//                       {mainCategory}
//                     </span>
//                   </div>
//                 </Link>

//                 {/* Content Section (Right side in Directory style) */}
//                 <div className="p-6 flex flex-col justify-between w-full md:w-3/5">
//                   <div>
//                     {/* Title/Business Name */}
//                     <Link href={`/blog/${post.id}`}>
//                       <h2 className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors cursor-pointer mb-1">
//                         {post.title}
//                       </h2>
//                     </Link>
//                     {/* Subtitle/Company Name */}
//                     <p className="text-gray-500 text-sm mb-4">{post.author}</p>

//                     {/* Excerpt/Detailed Description */}
//                     <p className="text-gray-700 mb-4 line-clamp-3 text-sm">
//                       {post.content.substring(0, 150)}...
//                     </p>

//                     {/* Directory-style Meta Info (Rating and Reviews) */}
//                     <div className="flex items-center gap-2 mb-4 text-sm">
//                       {/* Placeholder for Rating */}
//                       <div className="flex items-center text-yellow-500">
//                         <Star size={16} fill="currentColor" />
//                         <span className="font-semibold text-gray-800 ml-1">
//                           4.9
//                         </span>
//                         <span className="text-gray-500 ml-1">
//                           (203 reviews)
//                         </span>
//                       </div>
//                     </div>

//                     {/* Contact Info (Address, Phone, Email) */}
//                     <div className="space-y-2 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <MapPin
//                           size={16}
//                           className="text-green-600 mr-2 flex-shrink-0"
//                         />
//                         <span className="line-clamp-1">
//                           456 Design Ave, New York, NY 10001
//                         </span>{" "}
//                         {/* Placeholder Address */}
//                       </div>
//                       <div className="flex items-center">
//                         <Phone
//                           size={16}
//                           className="text-green-600 mr-2 flex-shrink-0"
//                         />
//                         <span>+1 (555) 234-5678</span> {/* Placeholder Phone */}
//                       </div>
//                       <div className="flex items-center">
//                         <Mail
//                           size={16}
//                           className="text-green-600 mr-2 flex-shrink-0"
//                         />
//                         <span className="truncate">
//                           hello@creativedesign.com
//                         </span>{" "}
//                         {/* Placeholder Email */}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Service Tags (Bottom section) */}
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
//                       Graphic Design
//                     </span>
//                     <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
//                       UI/UX
//                     </span>
//                     <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
//                       Branding
//                     </span>
//                   </div>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, categories, } from "@/lib/data"; // Assumed imports for category/location data
import { MapPin, Phone, Mail, Star, ChevronDown, Filter } from "lucide-react";

import NewBlogPostModal from "@/components/blog/new-blog-post-modal";

// NOTE: I'm assuming the 'blogPosts' data structure has a 'category' field for the badge,
// and 'image', 'title', 'content', and 'id' fields.

/**
 * Renders the Category Sidebar component on the left.
 */
const CategorySidebar = () => (
  <aside className="hidden lg:block w-full bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-4 self-start">
    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
      <Filter size={18} className="mr-2 text-green-600" />
      Business Type
    </h3>
    <ul className="space-y-2 text-sm">
      <li className="font-semibold text-green-600 py-1 flex justify-between items-center cursor-pointer">
        All Business
        <span className="text-gray-500 text-xs">(100)</span>
      </li>
      {/* Category List based on the image structure */}
      <li className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer flex justify-between items-center">
        Technology & Soft.
        <span className="text-gray-500 text-xs">(20)</span>
      </li>
      <li className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer flex justify-between items-center">
        Creative & Design
        <span className="text-gray-500 text-xs">(8)</span>
      </li>
      <li className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer flex justify-between items-center">
        Marketing & Adverti.
        <span className="text-gray-500 text-xs">(3)</span>
      </li>
      <li className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer flex justify-between items-center">
        Finance & Legal
        <span className="text-gray-500 text-xs">(2)</span>
      </li>
      {/* Location Filter Section */}
      <li className="pt-4 mt-4 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-2">Location (District)</h3>
        <div className="space-y-1">
          <div className="flex justify-between items-center cursor-pointer font-semibold text-gray-800">
            Dhaka Division <ChevronDown size={16} />
          </div>
          <ul className="pl-4 space-y-1 text-gray-600">
            <li className="flex justify-between items-center">
              Dhaka <span className="text-xs">(7)</span>
            </li>
            <li className="flex justify-between items-center">
              Faridpur <span className="text-xs">(3)</span>
            </li>
            {/* ... other locations */}
          </ul>
        </div>
      </li>
    </ul>
  </aside>
);

/**
 * Renders the Advertisement/Right Sidebar component.
 */
const AdvertSidebar = () => (
  <aside className="hidden lg:block w-full bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-4 self-start">
    <h3 className="text-lg font-bold text-gray-800 mb-4">
      Advertisement Space
    </h3>
    {/* Placeholder for ad content */}
    <div className="bg-gray-100 h-64 border border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-center">
      <p>Your Ad Here (300x250)</p>
    </div>
    <div className="bg-gray-100 h-48 mt-4 border border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-center">
      <p>Another Ad (300x160)</p>
    </div>
    <p className="mt-4 text-sm text-gray-500">
      Promote your business to our readers!
    </p>
  </aside>
);

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
    <div className=" bg-gray-100 ">
      <div className=" w-full">
        {/* Header - Stays full width */}
        {/* <div className="mb-12">
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
        </div> */}

        {/* New Post Modal */}
        <NewBlogPostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNewPost}
        />

        {/* --- Main Content Layout --- */}
        {/* Uses a grid to set up 3 columns: Category Sidebar | Main Content | Ad Space */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] gap-8">
          {/* 1. Left Category Sidebar (250px wide) */}
          <CategorySidebar />

          {/* 2. Main Blog Posts/Directory Content */}
          <div>
            {/* Search and Sort Bar (Optional, mimicking the directory top bar) */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="text-gray-600 font-medium mb-2 sm:mb-0">
                Listings Found: {posts.length}
              </span>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search business name or description..."
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Highest Rating</option>
                  <option>Newest</option>
                  <option>Most Views</option>
                </select>
              </div>
            </div>

            {/* Blog Posts (Directory Style Cards) */}
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
                        <p className="text-gray-500 text-sm mb-4">
                          {post.author}
                        </p>

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

          {/* 3. Right Advertisement Sidebar (300px wide) */}
          <AdvertSidebar />
        </div>
      </div>
    </div>
  );
}
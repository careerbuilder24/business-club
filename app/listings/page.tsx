// "use client"

// import { useState, useMemo } from "react"
// import Link from "next/link"
// import { listings, categories } from "@/lib/data"
// import { Star, MapPin, Phone, Mail } from "lucide-react"

// export default function ListingsPage() {
//   const [selectedCategory, setSelectedCategory] = useState<string>("")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState("rating")

//   const filteredListings = useMemo(() => {
//     let filtered = listings

//     if (selectedCategory) {
//       filtered = filtered.filter((listing) => listing.category === selectedCategory)
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (listing) =>
//           listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           listing.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           listing.description.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     // Sort
//     if (sortBy === "rating") {
//       filtered.sort((a, b) => b.rating - a.rating)
//     } else if (sortBy === "reviews") {
//       filtered.sort((a, b) => b.reviews - a.reviews)
//     } else if (sortBy === "name") {
//       filtered.sort((a, b) => a.name.localeCompare(b.name))
//     }

//     return filtered
//   }, [selectedCategory, searchTerm, sortBy])

//   return (
//     <div className="min-h-screen bg-muted py-12">
//       <div className="container-custom">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">All Businesses</h1>
//           <p className="text-muted-foreground">Browse and discover businesses in our directory</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Filters */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
//               <h2 className="text-xl font-bold mb-6">Filters</h2>

//               {/* Search */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-2">Search</label>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search businesses..."
//                   className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
//                 />
//               </div>

//               {/* Category Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-3">Category</label>
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => setSelectedCategory("")}
//                     className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
//                       selectedCategory === "" ? "bg-primary text-white" : "hover:bg-muted text-foreground"
//                     }`}
//                   >
//                     All Categories
//                   </button>
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
//                         selectedCategory === category ? "bg-primary text-white" : "hover:bg-muted text-foreground"
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Sort */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Sort By</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
//                 >
//                   <option value="rating">Highest Rating</option>
//                   <option value="reviews">Most Reviews</option>
//                   <option value="name">Name (A-Z)</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Listings Grid */}
//           <div className="lg:col-span-3">
//             {filteredListings.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredListings.map((listing) => (
//                   <Link key={listing.id} href={`/listings/${listing.id}`}>
//                     <div className="card-base overflow-hidden h-full hover:shadow-lg transition-all cursor-pointer group">
//                       {/* Cover Image */}
//                       <div className="relative h-48 bg-gray-200 overflow-hidden">
//                         <img
//                           src={listing.coverImage || "/placeholder.svg"}
//                           alt={listing.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>

//                       {/* Content */}
//                       <div className="p-6">
//                         {/* Logo & Name */}
//                         <div className="flex items-start gap-4 mb-4">
//                           <img
//                             src={listing.logo || "/placeholder.svg"}
//                             alt={listing.companyName}
//                             className="w-12 h-12 rounded-lg object-cover"
//                           />
//                           <div className="flex-1">
//                             <h3 className="font-bold text-lg text-foreground">{listing.name}</h3>
//                             <p className="text-sm text-muted-foreground">{listing.companyName}</p>
//                           </div>
//                         </div>

//                         {/* Category & Rating */}
//                         <div className="flex items-center justify-between mb-3">
//                           <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
//                             {listing.category}
//                           </span>
//                           <div className="flex items-center gap-1">
//                             <Star size={16} className="fill-accent text-accent" />
//                             <span className="font-semibold text-sm">{listing.rating}</span>
//                             <span className="text-xs text-muted-foreground">({listing.reviews})</span>
//                           </div>
//                         </div>

//                         {/* Address */}
//                         <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
//                           <MapPin size={16} className="flex-shrink-0 mt-0.5" />
//                           <span className="line-clamp-2">{listing.address}</span>
//                         </div>

//                         {/* Contact Quick Links */}
//                         <div className="flex gap-2 mb-4">
//                           <a
//                             href={`tel:${listing.phone}`}
//                             onClick={(e) => e.stopPropagation()}
//                             className="flex-1 flex items-center justify-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-2 py-2 rounded transition-colors"
//                           >
//                             <Phone size={14} />
//                             Call
//                           </a>
//                           <a
//                             href={`mailto:${listing.email}`}
//                             onClick={(e) => e.stopPropagation()}
//                             className="flex-1 flex items-center justify-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-2 py-2 rounded transition-colors"
//                           >
//                             <Mail size={14} />
//                             Email
//                           </a>
//                         </div>

//                         {/* Labels */}
//                         <div className="flex flex-wrap gap-2">
//                           {listing.labels.slice(0, 2).map((label, idx) => (
//                             <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
//                               {label}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//                 <p className="text-muted-foreground text-lg">No businesses found matching your criteria.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// "use client"

// import { useState, useMemo } from "react"
// import Link from "next/link"
// import { listings, categories } from "@/lib/data"
// import { Star, MapPin, Phone, Mail } from "lucide-react"

// export default function ListingsPage() {
//   const [selectedCategory, setSelectedCategory] = useState<string>("")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState("rating")

//   const filteredListings = useMemo(() => {
//     let filtered = listings

//     if (selectedCategory) {
//       filtered = filtered.filter((listing) => listing.category === selectedCategory)
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (listing) =>
//           listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           listing.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           listing.description.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating)
//     else if (sortBy === "reviews") filtered.sort((a, b) => b.reviews - a.reviews)
//     else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name))

//     return filtered
//   }, [selectedCategory, searchTerm, sortBy])

//   return (
//     <div className="min-h-screen bg-muted py-12">
//       <div className="container-custom">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">All Businesses</h1>
//           <p className="text-muted-foreground">Browse and discover businesses in our directory</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Filters */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
//               <h2 className="text-xl font-bold mb-6">Filters</h2>

//               {/* Search */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-2">Search</label>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search businesses..."
//                   className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
//                 />
//               </div>

//               {/* Category Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-3">Category</label>
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => setSelectedCategory("")}
//                     className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
//                       selectedCategory === "" ? "bg-primary text-white" : "hover:bg-muted text-foreground"
//                     }`}
//                   >
//                     All Categories
//                   </button>
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
//                         selectedCategory === category ? "bg-primary text-white" : "hover:bg-muted text-foreground"
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Sort */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Sort By</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
//                 >
//                   <option value="rating">Highest Rating</option>
//                   <option value="reviews">Most Reviews</option>
//                   <option value="name">Name (A-Z)</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Listings Grid */}
//           <div className="lg:col-span-3">
//             {filteredListings.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredListings.map((listing) => (
//                   <div
//                     key={listing.id}
//                     className="card-base overflow-hidden h-full hover:shadow-lg transition-all cursor-pointer group"
//                     onClick={() => window.location.href = `/listings/${listing.id}`} // clickable card
//                   >
//                     {/* Cover Image */}
//                     <div className="relative h-48 bg-gray-200 overflow-hidden">
//                       <img
//                         src={listing.coverImage || "/placeholder.svg"}
//                         alt={listing.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       {/* Logo & Name */}
//                       <div className="flex items-start gap-4 mb-4">
//                         <img
//                           src={listing.logo || "/placeholder.svg"}
//                           alt={listing.companyName}
//                           className="w-12 h-12 rounded-lg object-cover"
//                         />
//                         <div className="flex-1">
//                           <h3 className="font-bold text-lg text-foreground">{listing.name}</h3>
//                           <p className="text-sm text-muted-foreground">{listing.companyName}</p>
//                         </div>
//                       </div>

//                       {/* Category & Rating */}
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
//                           {listing.category}
//                         </span>
//                         <div className="flex items-center gap-1">
//                           <Star size={16} className="fill-accent text-accent" />
//                           <span className="font-semibold text-sm">{listing.rating}</span>
//                           <span className="text-xs text-muted-foreground">({listing.reviews})</span>
//                         </div>
//                       </div>

//                       {/* Address */}
//                       <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
//                         <MapPin size={16} className="flex-shrink-0 mt-0.5" />
//                         <span className="line-clamp-2">{listing.address}</span>
//                       </div>

//                       {/* Contact Quick Links */}
//                       <div className="flex gap-2 mb-4">
//                         <a
//                           href={`tel:${listing.phone}`}
//                           onClick={(e) => e.stopPropagation()}
//                           className="flex-1 flex items-center justify-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-2 py-2 rounded transition-colors"
//                         >
//                           <Phone size={14} />
//                           Call
//                         </a>
//                         <a
//                           href={`mailto:${listing.email}`}
//                           onClick={(e) => e.stopPropagation()}
//                           className="flex-1 flex items-center justify-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-2 py-2 rounded transition-colors"
//                         >
//                           <Mail size={14} />
//                           Email
//                         </a>
//                       </div>

//                       {/* Labels */}
//                       <div className="flex flex-wrap gap-2">
//                         {listing.labels.slice(0, 2).map((label, idx) => (
//                           <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
//                             {label}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//                 <p className="text-muted-foreground text-lg">No businesses found matching your criteria.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// 3rd
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Star, MapPin, Phone, Mail, ChevronDown } from "lucide-react";

// --- IMPORT DATA from '@/lib/data' ---
// NOTE: Assuming the file path is correct for your Next.js project structure
import {
  listings as importedListings,
  categories as importedCategories,
  Listing,
} from "@/lib/data";

// --- LISTINGS PAGE COMPONENT ---
export default function ListingsPage() {
  // 1. Use the imported data directly
  const listings: Listing[] = importedListings;
  const categories: string[] = importedCategories;

  // 2. State management
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  // State for the category dropdown visibility
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // 3. Filtering and Sorting Logic
  const filteredListings = useMemo(() => {
    let filtered = listings;

    // Filter by Category
    if (selectedCategory) {
      filtered = filtered.filter(
        (listing) => listing.category === selectedCategory
      );
    }

    // Filter by Search Term
    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    let sorted = [...filtered]; // Create a copy for sorting
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") sorted.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === "name")
      sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [selectedCategory, searchTerm, sortBy, listings]);

  // 4. Render UI
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        {/* Adjusted grid for sidebar: 1/8 for sidebar, 7/8 for content on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-8 h-full">
          {/* Sidebar Filters - Dark Green Theme (lg:col-span-1) */}
          {/* We may reduce the padding here if category names get clipped */}
          <div className="lg:col-span-1 min-h-screen bg-green-700 text-white p-0">
            {/* Search Input Area */}
            {/* NOTE: Padding reduced from p-4 to p-2 for the search box to better fit the narrow sidebar */}
          
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full p-2 text-sm text-gray-800 rounded-md border border-transparent focus:border-blue-500 focus:ring-blue-500 transition duration-150 bg-white/90 focus:bg-white placeholder:text-gray-500"
                />
       
            </div>

            {/* Category Filter with Dropdown Logic */}
            <div className="mb-6">
              {/* Dropdown Toggle Button for "All Businesses" */}
              <div
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setSelectedCategory(""); // Automatically set to "All" when toggling the list
                }}
                // NOTE: Padding reduced from px-4 to px-2 to better fit the narrow sidebar
                className={`
                                    w-full flex justify-between items-center text-left px-2 py-3 cursor-pointer transition-colors text-lg font-bold
                                    ${
                                      selectedCategory === ""
                                        ? "bg-green-800 border-l-4 border-white"
                                        : "hover:bg-green-600 border-l-4 border-transparent"
                                    }
                                `}
              >
                <span className="truncate">All Businesses</span>
                <div className="flex items-center flex-shrink-0">
                  <span className="text-white/70 text-xs mr-1">
                    ({listings.length})
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isCategoryOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </div>

              {/* Category List with Smooth Dropdown Animation */}
              <div
                className={`
                    overflow-hidden transition-max-height duration-500 ease-in-out
                    ${isCategoryOpen ? "max-h-screen" : "max-h-0"}
                `}
              >
                <div className="space-y-1 py-1">
                  {/* Map over the imported categories */}
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`#${category
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, "-")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(category);
                      }}
                      // NOTE: Padding reduced from px-4 to px-2 and pl-8 to pl-4
                      className={`
                                            w-full flex justify-between items-center text-left px-2 py-2 transition-colors text-lg font-medium pl-4
                                            ${
                                              selectedCategory === category
                                                ? "bg-green-800 text-white border-l-4 border-white"
                                                : "hover:bg-green-600 border-l-4 border-transparent text-white/90"
                                            }
                                        `}
                    >
                      <span className="truncate">{category}</span>
                      <span className="text-white/70 ml-2 flex-shrink-0">
                        {">"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area (lg:col-span-7) */}
          <div className="lg:col-span-7 p-8 bg-gray-50">
            {/* Title and Description */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                {selectedCategory
                  ? selectedCategory + " Businesses"
                  : "All Businesses"}
              </h1>
              <p className="text-gray-500">
                Browse and discover businesses in our directory
              </p>
            </div>

            {/* Search, Sort, and Filters Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 md:mb-0">
                Listings Found:{" "}
                <span className="text-green-700">
                  {filteredListings.length}
                </span>
              </h2>
              {/* Search */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mx-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search business name or description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              {/* Sort */}
              <div className="w-full md:w-1/4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="flex flex-col gap-3">
                {filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer group rounded-xl"
                    onClick={() =>
                      (window.location.href = `/listings/${listing.id}`)
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {/* Cover Image */}
                      <div className="relative h-32 md:h-48 bg-gray-200 overflow-hidden md:col-span-1">
                        <img
                          src={listing.coverImage || "/placeholder.svg"}
                          alt={listing.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 text-xs font-semibold text-white bg-green-700 px-3 py-1 rounded-full shadow-md">
                          {listing.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="py-4 px-6 md:col-span-2 flex flex-col justify-between">
                        <div>
                          {/* Logo & Name */}
                          <div className="flex items-start gap-4 mb-3">
                            <img
                              src={listing.logo || "/placeholder.svg"}
                              alt={listing.companyName}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm"
                            />
                            <div className="flex-1">
                              <h3 className="font-extrabold text-xl text-gray-900 leading-tight">
                                {listing.name}
                              </h3>
                              <p className="text-sm text-green-700 font-medium">
                                {listing.companyName}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 mb-3 text-sm line-clamp-1">
                            {listing.description}
                          </p>

                          {/* Rating & Address */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star
                                size={16}
                                className="fill-yellow-500 text-yellow-500"
                              />
                              <span className="font-bold text-base text-gray-900">
                                {listing.rating}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({listing.reviews} reviews)
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <MapPin size={16} className="flex-shrink-0" />
                              <span className="truncate">
                                {listing.address}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Footer: Contact Links and Labels */}
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-gray-100">
                          {/* Contact Quick Links */}
                          <div className="flex gap-3 mb-3 sm:mb-0">
                            <a
                              href={`tel:${listing.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-full transition-colors"
                            >
                              <Phone size={14} />
                              Call
                            </a>
                            <a
                              href={`mailto:${listing.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-full transition-colors"
                            >
                              <Mail size={14} />
                              Email
                            </a>
                          </div>

                          {/* Labels */}
                          <div className="flex flex-wrap justify-end gap-2">
                            {listing.labels.slice(0, 3).map((label, idx) => (
                              <span
                                key={idx}
                                className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
                <p className="text-gray-500 text-lg">
                  No businesses found matching your selected filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchTerm("");
                  }}
                  className="mt-4 text-green-700 hover:text-green-900 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

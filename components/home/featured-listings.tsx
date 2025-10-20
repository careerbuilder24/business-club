// import Link from "next/link"
// import { listings } from "@/lib/data"
// import { Star, MapPin } from "lucide-react"

// export default function FeaturedListings() {
//   const featured = listings.slice(0, 4)

//   return (
//     <section className="py-16 md:py-24 bg-muted">
//       <div className="container-custom">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Businesses</h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             Explore our most popular and highly-rated businesses
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {featured.map((listing) => (
//             <Link key={listing.id} href={`/listings/${listing.id}`}>
//               <div className="card-base overflow-hidden h-full hover:shadow-lg transition-all cursor-pointer">
//                 {/* Cover Image */}
//                 <div className="relative h-48 bg-gray-200 overflow-hidden">
//                   <img
//                     src={listing.coverImage || "/placeholder.svg"}
//                     alt={listing.name}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   {/* Logo & Name */}
//                   <div className="flex items-start gap-4 mb-4">
//                     <img
//                       src={listing.logo || "/placeholder.svg"}
//                       alt={listing.companyName}
//                       className="w-12 h-12 rounded-lg object-cover"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-bold text-lg text-foreground">{listing.name}</h3>
//                       <p className="text-sm text-muted-foreground">{listing.companyName}</p>
//                     </div>
//                   </div>

//                   {/* Category & Rating */}
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
//                       {listing.category}
//                     </span>
//                     <div className="flex items-center gap-1">
//                       <Star size={16} className="fill-accent text-accent" />
//                       <span className="font-semibold text-sm">{listing.rating}</span>
//                       <span className="text-xs text-muted-foreground">({listing.reviews})</span>
//                     </div>
//                   </div>

//                   {/* Address */}
//                   <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
//                     <MapPin size={16} className="flex-shrink-0 mt-0.5" />
//                     <span className="line-clamp-2">{listing.address}</span>
//                   </div>

//                   {/* Labels */}
//                   <div className="flex flex-wrap gap-2">
//                     {listing.labels.slice(0, 2).map((label, idx) => (
//                       <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
//                         {label}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link href="/listings" className="btn-primary">
//             View All Businesses
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }
"use client";

import Link from "next/link";
import { listings } from "@/lib/data";
import { Star, MapPin } from "lucide-react";
import { useState } from "react";

export default function FeaturedListings() {
  const [visibleCount, setVisibleCount] = useState(8);
  const featured = listings.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, listings.length));
  };

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Businesses</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto break-words">
            Explore our most popular and highly-rated businesses
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((listing) => (
            <Link key={listing.id} href={`/listings/${listing.id}`}>
              <div className="card-base overflow-hidden h-full hover:shadow-lg transition-all cursor-pointer flex flex-col">
                {/* Cover Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={listing.coverImage || "/placeholder.svg"}
                    alt={listing.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  {/* Logo & Name */}
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <img
                      src={listing.logo || "/placeholder.svg"}
                      alt={listing.companyName}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base md:text-lg text-foreground truncate">
                        {listing.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">
                        {listing.companyName}
                      </p>
                    </div>
                  </div>

                  {/* Category & Rating */}
                  <div className="flex items-center justify-between mb-3 text-xs md:text-sm">
                    <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full truncate">
                      {listing.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-accent text-accent flex-shrink-0" />
                      <span className="font-semibold">{listing.rating}</span>
                      <span className="text-muted-foreground">({listing.reviews})</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2 break-words">{listing.address}</span>
                  </div>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {listing.labels.slice(0, 2).map((label, idx) => (
                      <span
                        key={idx}
                        className="text-xs md:text-sm bg-muted text-muted-foreground px-2 py-1 rounded truncate"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < listings.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 bg-[#2C8A45] text-white rounded-lg font-semibold hover:bg-[#2fd15a] transition-colors ease-in-out duration-300 cursor-pointer"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

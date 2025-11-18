"use client";

import Link from "next/link";
import { listings } from "@/lib/data";
import { Star, MapPin, Eye } from "lucide-react";
import { useState } from "react";
import { useWatchList } from "../../app/context/WatchListContext";
import { Heart } from "lucide-react";

export default function FeaturedListings() {
  const [visibleCount, setVisibleCount] = useState(8);
  const featured = listings.slice(0, visibleCount);
  const { toggleWatch, isWatched } = useWatchList();

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, listings.length));
  };

  return (
    <section
      className="py-16 md:py-24 bg-muted"
      aria-labelledby="featured-businesses"
    >
      <div className="container-custom">
        <header className="text-center mb-12">
          <h2
            id="featured-businesses"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured Businesses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto break-words">
            Explore our most popular and highly-rated businesses
          </p>
        </header>

        {/* Grid: ADJUSTED FOR ZOOM/RATIO */}
        <div
          className="
    grid grid-cols-1
    sm:grid-cols-2 /* 2 columns from small (640px) up */
    lg:grid-cols-3 /* 3 columns from large (1024px) up */
    xl:grid-cols-4 /* 4 columns from extra-large (1280px) up */
    gap-6
  "
        >
          {featured.map((listing) => (
            <article
              key={listing.id}
              className="card-base overflow-hidden h-full hover:shadow-lg transition-all relative"
              aria-labelledby={`listing-${listing.id}`}
            >
              {/*  Watch icon */}
              <button
                onClick={() =>
                  toggleWatch({
                    id: listing.id,
                    name: listing.name,
                    logo: listing.logo,
                    category: listing.category,
                    coverImage: listing.coverImage,
                  })
                }
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-yellow-100 transition z-10"
                aria-label={`Add ${listing.name} to your watchlist`}
              >
                <Heart
                  size={20}
                  className={
                    isWatched(listing.id) ? "text-[#2C8845]" : "text-gray-400"
                  }
                />
              </button>

              <Link
                href={`/listings/${listing.id}`}
                className="block"
                aria-label={`View ${listing.name} details`}
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={listing.coverImage || "/placeholder.svg"}
                    alt={`Cover image of ${listing.name}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  {/* Logo & Name */}
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <img
                      src={listing.logo || "/placeholder.svg"}
                      alt={`Logo of ${listing.companyName}`}
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
                    <div className="flex items-center gap-1 ml-auto">
                      {[1, 2, 3, 4].map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className="text-yellow-400 flex-shrink-0"
                        />
                      ))}
                      <span className="font-semibold text-right">
                        {listing.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({listing.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    <span
                      className="line-clamp-2 break-words"
                      title={listing.address}
                    >
                      {listing.address}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Show More */}
        {visibleCount < listings.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 bg-[#2C8A45] text-white rounded-lg font-semibold hover:bg-[#2fd15a] transition"
              aria-label="Show more featured listings"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

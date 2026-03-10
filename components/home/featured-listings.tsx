
"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Heart } from "lucide-react";
import { useWatchList } from "@/app/context/WatchListContext";
import { toSlug } from "@/lib/slug";

interface FeaturedListingsProps {
  listings?: any[];
}

const getSafeImage = (url?: string) => {
  if (!url || typeof url !== "string") return "/cover-placeholder.jpg";
  const trimmed = url.trim();
  if (!trimmed) return "/cover-placeholder.jpg";
  return encodeURI(trimmed);
};

export default function FeaturedListings({
  listings = [],
}: FeaturedListingsProps) {
  const { toggleWatch, isWatched } = useWatchList();

  const normalizedListings = (Array.isArray(listings) ? listings : []).map(
    (l) => ({
      id: l.id,
      slug: toSlug(l.listing_name || l.company_name || l.name),
      name: l.listing_name || l.name || "Untitled Business",
      companyName: l.company_name || l.name || "Unknown",
      category: l.category || "N/A",
      rating: Number(l.rating) || 0,
      reviews: Number(l.reviews) || 0,
      address: l.address || "No Address",
      logo: getSafeImage(l.logo_url),
      coverImage: getSafeImage(l.cover_url),
    })
  );

  if (!normalizedListings.length) return null;

  return (
    <section className="py-12 bg-muted">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Businesses
        </h2>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
           md:grid-cols-4
           w-full
           
            [@media(min-width:1033px)]:grid-cols-3
            [@media(min-width:1033px)]:w-8/12
            [@media(min-width:1033px)]:ml-72
            [@media(min-width:1735px)]:ml-28
            [@media(min-width:1735px)]:w-full
            [@media(min-width:1734px)]:grid-cols-4
            gap-5
          "
        >
          {normalizedListings.map((listing) => (
            <article
              key={listing.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Cover */}
              <Link href={`/listings/${listing.slug}`}>
                <div className="relative h-36 w-full bg-gray-100">
                  <Image
                    src={listing.coverImage}
                    alt={listing.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1032px) 50vw,
                           (max-width: 1733px) 33vw,
                           25vw"
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWatch(listing);
                    }}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
                  >
                    <Heart
                      size={16}
                      className={
                        isWatched(listing.id)
                          ? "text-[#2C8845] fill-[#2C8845]"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </div>
              </Link>

              {/* Body */}
              <Link href={`/listings/${listing.slug}`}>
                <div className="p-3">
                  <div className="flex gap-2 mb-2">
                    <Image
                      src={listing.logo}
                      alt={listing.companyName}
                      width={40}
                      height={40}
                      className="rounded-md object-cover border bg-white"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "/placeholder.svg")
                      }
                    />

                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {listing.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {listing.companyName}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {listing.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <Star size={12} className="text-yellow-400" />
                      {listing.rating}
                    </span>
                  </div>

                  <div className="flex gap-1.5 text-[11px] text-muted-foreground">
                    <MapPin size={12} />
                    <span className="truncate">{listing.address}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

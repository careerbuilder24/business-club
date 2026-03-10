"use client";

import { useState } from "react";
import { useEffect } from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  ListOrdered,
  Briefcase,
  Users,
} from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";

/* ================= TYPES ================= */


export interface Listing {
  id: string;
  slug: string;
  name?: string;
  companyName?: string;
  district: string;
  businessType: string;
  coverImage: string;
  logo: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  description: string;
  rating: number;
  products: Product[];
  services: Service[];
}

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
}

interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface Props {
  listing: Listing;
  products: Product[];
  services: Service[];
  reviews: Review[];
}

/* ================= HELPERS ================= */


const RatingStars = ({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={size} className="fill-yellow-500" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`e-${i}`} size={size} className="text-gray-300" />
      ))}
      <span className="ml-2 text-sm font-semibold text-gray-800">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

/* ================= COMPONENT ================= */

export default function ListingDetailPage({
  listing,
  products,
  services,
  reviews,
}: Props) {
  const [activeTab, setActiveTab] = useState<
    "products" | "services" | "reviews"
  >("products");

  const tabContent = {
  
    products: (
      <div className="space-y-4">
        {products.length ? (
          products.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 bg-white shadow flex gap-4 flex-col sm:flex-row"
            >
              {/*  FIXED: use product image + fixed size */}
              <img
                src={p.image}
                alt={p.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border shadow object-cover"
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).src =
                    "/placeholder.svg")
                }
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#2C8845]">{p.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {p.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    ),

    services: (
      <div className="space-y-4">
        {services.length ? (
          services.map((s) => (
            <div
              key={s.id}
              className="border rounded-xl p-4 bg-white shadow flex gap-4 flex-col sm:flex-row"
            >
              <img
                src={listing.logo}
                alt={listing.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border shadow object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#2C8845]">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No services available.</p>
        )}
      </div>
    ),

    reviews: (
      <div className="space-y-4">
        {reviews.length ? (
          reviews.map((r) => (
            <div key={r.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between">
                <span className="font-bold">{r.author}</span>
                <span className="text-xs text-gray-500">{r.date}</span>
              </div>
              <RatingStars rating={r.rating} />
              <p className="text-sm mt-2">{r.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    ),
  };

  // console.log("COVER IMAGE URL:", listing.coverImage);

  console.log("COVER IMAGE URL:", listing.coverImage);

  console.log("LOGO IMAGE URL:", listing.logo);
useEffect(() => {
  if (!listing?.id || !listing?.slug) return;

  const key = `viewed-${listing.slug}`;

  // prevent multiple counts from same user
  if (localStorage.getItem(key)) return;

  const trackView = async () => {
    try {
      await fetch("/api/listings/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId: listing.id,
          slug: listing.slug,
        }),
      });

      localStorage.setItem(key, "true");
    } catch (err) {
      console.error("View tracking failed");
    }
  };

  trackView();
}, [listing.id, listing.slug]);
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row w-full">
        {/* MAIN */}
        <main className="flex-1 p-4 sm:p-6 max-w-4xl w-full lg:ml-72">
          {/* Cover */}

          <div className="relative w-full h-[220px] sm:h-[300px] rounded-xl overflow-hidden shadow">
            <img
              src={listing.coverImage}
              alt={listing.name}
              className="w-full h-full object-cover"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src =
                  "/cover-placeholder.jpg")
              }
            />
          </div>

          {/* Header Card */}
          {/* <div className="p-4 sm:p-6 bg-white mt-[-3rem] rounded-2xl shadow flex flex-col sm:flex-row justify-between">
            <div className="flex gap-4">
              <img
                src={listing.logo}
                alt={listing.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border shadow object-cover"
              />

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {listing.name}
                </h1>
                <p className="text-[#2C8845]">{listing.companyName}</p>
                <p className="text-sm text-gray-500">
                  {listing.district}, {listing.businessType}
                </p>
                <RatingStars rating={listing.rating} />
              </div>
            </div>

          
            <div className="mt-4 sm:mt-0 text-sm space-y-1">
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="flex gap-2 text-[#2C8845]"
                >
                  <Phone size={16} /> {listing.phone}
                </a>
              )}
              {listing.email && (
                <a
                  href={`mailto:${listing.email}`}
                  className="flex gap-2 text-[#2C8845]"
                >
                  <Mail size={16} /> {listing.email}
                </a>
              )}
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  className="flex gap-2 text-[#2C8845]"
                >
                  <Globe size={16} /> Website
                </a>
              )}
              {listing.address && (
                <p className="flex gap-2 text-[#2C8845]">
                  <MapPin size={16} /> {listing.address}
                </p>
              )}
            </div>
          </div> */}

          <div className="relative -mt-16 sm:-mt-20 bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex gap-4 ">
              <img
                src={listing.logo}
                alt={listing.name}
                className="w-24 h-24 rounded-xl border shadow object-cover"
              />

              <div>
                <h1 className="text-2xl font-bold">{listing.name}</h1>
                <p className="text-green-700 font-medium">
                  {listing.companyName}
                </p>
                <p className="text-sm text-gray-500">
                  {listing.district}, {listing.businessType}
                </p>
                <RatingStars rating={listing.rating} />
              </div>
            </div>

            <div className="text-sm space-y-1 text-right">
              {listing.phone && (
                <div className="flex items-center justify-end gap-2 text-green-700">
                  <span>{listing.phone}</span>
                  <Phone size={16} />
                </div>
              )}

              {listing.email && (
                <div className="flex items-center justify-end gap-2 text-green-700">
                  <span>{listing.email}</span>
                  <Mail size={16} />
                </div>
              )}

              {listing.website && (
                <div className="flex items-center justify-end gap-2 text-green-700">
                  <span>{listing.website}</span>
                  <Globe size={16} />
                </div>
              )}

              {listing.address && (
                <div className="flex items-start justify-end gap-2 text-green-700">
                  <span className="line-clamp-2 max-w-[220px]">
                    {listing.address}
                  </span>
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 mt-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-3">About {listing.name}</h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          <nav className="bg-white p-4 mt-6 rounded-xl shadow">
            <ul className="flex gap-3">
              {[
                { key: "products", label: "Products", icon: ListOrdered },
                { key: "services", label: "Services", icon: Briefcase },
                { key: "reviews", label: "Reviews", icon: Users },
              ].map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveTab(key as any)}
                    className={`flex items-center px-3 py-2 rounded-lg font-semibold ${
                      activeTab === key
                        ? "bg-[#2C8845] text-white"
                        : "text-gray-700 hover:bg-[#2C8845]/10"
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-white p-6 mt-4 rounded-xl shadow">
            {tabContent[activeTab]}
          </div>

          <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                listing.address || "Dhaka"
              )}&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
            />
          </div>
        </main>
        {/* RIGHT ADS */}
        <aside className="hidden lg:flex flex-col w-[250px] p-4 gap-4 flex-shrink-0">
          {["AD 1", "AD 2", "AD 3"].map((label) => (
            <div
              key={label}
              className="bg-gray-100 border rounded-xl h-[250px] flex items-center justify-center text-gray-500 text-sm"
            >
              {label}
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

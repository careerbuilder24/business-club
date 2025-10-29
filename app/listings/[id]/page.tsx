"use client";

import { listings, Listing, businessCategories, categories } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  Filter,
  ListOrdered,
  Briefcase,
  Users,
  Info,
  ChevronDown,
} from "lucide-react";

// NOTE: The state declarations that caused the error were removed from here
// and moved inside the ListingDetailPage component below.

// --- FAKE DATA ---
const FAKE_PRODUCTS = [
  {
    id: "p1",
    name: "Quantum Headset Pro",
    image: "https://picsum.photos/id/17/400/300",
    description:
      "Experience unparalleled audio clarity with active noise cancellation and ergonomic design. Perfect for professionals and gamers.",
    rating: 4.7,
  },
  {
    id: "p2",
    name: "Smart Coffee Brewer 3000",
    image: "https://picsum.photos/id/48/400/300",
    description:
      "Brew your morning coffee from your phone. Features programmable schedules and integrated bean grinder.",
    rating: 4.2,
  },
];

const FAKE_SERVICES = [
  {
    id: "s1",
    name: "24/7 Premium Support",
    image: "https://picsum.photos/id/1053/400/300",
    description:
      "Immediate, dedicated support via phone, chat, and email from our top-tier technical specialists.",
    rating: 5.0,
  },
  {
    id: "s2",
    name: "Custom Software Development",
    image: "https://picsum.photos/id/218/400/300",
    description:
      "Bespoke software solutions tailored to your unique business needs and integrated with existing systems.",
    rating: 4.5,
  },
];

const FAKE_REVIEWS = [
  {
    id: 1,
    author: "A. Rahman",
    rating: 5.0,
    date: "2 months ago",
    comment:
      "Outstanding service! They delivered the project ahead of schedule and the quality was superb.",
  },
  {
    id: 2,
    author: "B. Khatun",
    rating: 4.0,
    date: "1 week ago",
    comment:
      "Very professional team. Communication was clear, only slight delay on one minor feature.",
  },
];

// --- COMPONENTS ---
const RatingStars = ({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`f-${i}`} size={size} className="fill-yellow-500" />
      ))}
      {hasHalfStar && (
        <div className="relative" style={{ width: size, height: size }}>
          <Star size={size} className="text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={size} className="fill-yellow-500 text-yellow-500" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`e-${i}`} size={size} className="text-gray-300" />
      ))}
      <span className="ml-2 text-sm font-semibold text-gray-800">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// Assuming you have this data structure defined elsewhere (e.g., in "@/lib/data")
// This is added here to make the sidebar rendering possible without the actual imported data
const districtCategories = [
  {
    division: "Dhaka",
    districts: ["Dhaka", "Gazipur", "Narayanganj", "Munshiganj"],
  },
  {
    division: "Chittagong",
    districts: ["Chittagong", "Cox's Bazar", "Comilla"],
  },
  // Add other divisions/districts as needed for filter to work
];

// --- MAIN PAGE ---
export default function ListingDetailPage({ id }: { id?: string }) {
  //  CORRECT PLACEMENT FOR HOOKS
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // Location Filter
  // Initial state for openDivision must be set to an existing division for initial render (e.g., "Dhaka")
  const [openDivision, setOpenDivision] = useState<string>("Dhaka");

  const listing: Listing | undefined =
    listings.find((l) => l.id === id) || listings[0];
  const [activeTab, setActiveTab] = useState<
    "products" | "services" | "reviews" | "about"
  >("products");

  // Helper function to count listings per district
  const getDistrictCount = (district: string): number => {
    // NOTE: This relies on the 'listings' array imported from "@/lib/data"
    return listings.filter((listing) => listing.district === district).length;
  };

  // Helper function to count listings per business type
  const getBusinessTypeCount = (type: string): number => {
    // NOTE: This relies on the 'listings' array imported from "@/lib/data"
    return listings.filter((listing) => listing.businessType === type).length;
  };

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Listing Not Found</h1>
      </div>
    );
  }

  const tabContentMap = {
    about: (
      <div className="space-y-4 px-4 sm:px-0">
        {" "}
        {/* Re-added small padding for content only */}
        <h2 className="text-2xl font-bold text-[#2C8845]">
          About {listing.companyName}
        </h2>
        <p className="text-gray-700">{listing.description}</p>
      </div>
    ),
    products: (
      <div className="space-y-4 px-4 sm:px-0">
        {" "}
        {/* Re-added small padding for content only */}
        <h2 className="text-2xl font-bold text-[#2C8845]">Products</h2>
        {FAKE_PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition"
          >
            <div className="flex gap-4">
              <img
                src={p.image}
                className="w-32 h-32 object-cover rounded-lg"
                alt=""
              />
              <div>
                <h3 className="font-bold text-lg text-[#2C8845]">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                <RatingStars rating={p.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    services: (
      <div className="space-y-4 px-4 sm:px-0">
        {" "}
        {/* Re-added small padding for content only */}
        <h2 className="text-2xl font-bold text-[#2C8845]">Services</h2>
        {FAKE_SERVICES.map((s) => (
          <div
            key={s.id}
            className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition"
          >
            <div className="flex gap-4">
              <img
                src={s.image}
                className="w-32 h-32 object-cover rounded-lg"
                alt=""
              />
              <div>
                <h3 className="font-bold text-lg text-[#2C8845]">{s.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{s.description}</p>
                <RatingStars rating={s.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    reviews: (
      <div className="space-y-4 px-4 sm:px-0">
        {" "}
        {/* Re-added small padding for content only */}
        <h2 className="text-2xl font-bold text-[#2C8845]">Reviews</h2>
        {FAKE_REVIEWS.map((r) => (
          <div key={r.id} className="border p-3 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-bold">{r.author}</span>
              <span className="text-xs text-gray-500">{r.date}</span>
            </div>
            <RatingStars rating={r.rating} />
            <p className="text-sm mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    ),
  };

  // Handlers
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);

    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };
  const handleBusinessTypeSelect = (businessType: string) => {
    setSelectedBusinessType(businessType);

    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* The main container now has NO PADDING ('p-4 sm:p-8' removed).
              The gap is removed ('gap-6' changed to 'gap-0'). 
          */}
      {/* Grid Structure: Updated to lg:grid-cols-12 */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Mobile/Tablet Filter Button (Hamburger) - Retained small padding for visibility */}
        <div className="lg:hidden p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full flex items-center justify-center p-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-md"
          >
            <Filter size={20} className="mr-2" />
            Filters (
            {selectedDistrict || selectedBusinessType ? "Active" : "All"})
          </button>
        </div>

        {/* LEFT SIDEBAR - UNCHANGED (lg:col-span-2)
         */}
        <div
          className={`
            min-h-screen bg-green-700 text-white p-0
            lg:col-span-2 lg:block lg:sticky lg:top-0 lg:overflow-y-auto
            ${
              isMobileFilterOpen
                ? "fixed top-0 left-0 h-full w-64 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out"
                : "fixed top-0 left-0 h-full w-64 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-full lg:max-w-[250px] lg:z-auto" // Added max-width to sidebar for better look on large screens
            }
          `}
        >
          {/* Close button for mobile filter */}
          <div className="lg:hidden p-4 flex justify-end">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-white hover:text-gray-300 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="p-4">
            {/* Reset to All */}
            <button
              onClick={() => {
                handleDistrictSelect("");
                handleBusinessTypeSelect("");
              }}
              className={`
                w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg
                ${
                  selectedDistrict === "" && selectedBusinessType === ""
                    ? "bg-green-800 border-2 border-white"
                    : "hover:bg-green-600 border-2 border-transparent"
                }
              `}
            >
              All Business
            </button>
          </div>

          <div className="mb-6 border-b border-green-600 pb-4 px-4">
            <h3 className="text-lg font-bold mb-2 text-white/90">
              Business Type
            </h3>
            <div className="space-y-1">
              {businessCategories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() => handleBusinessTypeSelect(category.name)}
                    className={`
                      w-full flex justify-between items-center text-left px-2 py-2 transition-colors text-sm font-medium rounded-md
                      ${
                        selectedBusinessType === category.name
                          ? "bg-green-800 text-white border-l-4 border-white"
                          : "hover:bg-green-600/80 border-l-4 border-transparent text-white/90"
                      }
                    `}
                  >
                    <span className="truncate">{category.name}</span>
                    <span className="text-white/70 ml-2 text-xs flex-shrink-0">
                      ({getBusinessTypeCount(category.name)})
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* --- LOCATION (DISTRICT) FILTER --- */}
          <div className="mb-6 px-4">
            <h3 className="text-lg font-bold mb-2 text-white/90">
              Location (District)
            </h3>
            {/* Map over Divisions (The Bivag) */}
            {districtCategories.map((divisionGroup) => (
              <div key={divisionGroup.division} className="mt-2">
                {/* Division Header (Toggle) */}
                <button
                  onClick={() =>
                    setOpenDivision(
                      openDivision === divisionGroup.division
                        ? ""
                        : divisionGroup.division
                    )
                  }
                  className="w-full flex justify-between items-center text-left px-2 py-2 cursor-pointer bg-green-600 hover:bg-green-500 transition-colors text-sm font-bold rounded-md"
                >
                  <span className="truncate">
                    {divisionGroup.division} Division
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      openDivision === divisionGroup.division
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </button>

                {/* District List (Jela) */}
                <div
                  className={`
                    overflow-hidden transition-max-height duration-500 ease-in-out
                    ${
                      openDivision === divisionGroup.division
                        ? "max-h-96"
                        : "max-h-0"
                    }
                  `}
                >
                  <div className="space-y-0.5 py-1">
                    {divisionGroup.districts.map((district) => (
                      <Link
                        key={district}
                        href={`#dist-${district
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDistrictSelect(district);
                        }}
                        className={`
                          w-full flex justify-between items-center text-left pl-4 py-1.5 transition-colors text-xs font-medium
                          ${
                            selectedDistrict === district
                              ? "bg-green-800 text-white border-l-4 border-white"
                              : "hover:bg-green-700/80 border-l-4 border-transparent text-white/90"
                          }
                        `}
                      >
                        <span className="truncate">{district}</span>
                        <span className="text-white/70 ml-2 text-xs flex-shrink-0">
                          ({getDistrictCount(district)})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT - MODIFIED: Increased width from lg:col-span-7 to lg:col-span-8
         */}
        <main className="flex-[0.6] p-4 sm:p-6 lg:p-5 bg-gray-50 min-h-screen">
          {/* Banner */}
          <div className="h-64 w-full rounded-xl overflow-hidden shadow">
            <img
              src={listing.coverImage}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Company Info */}
          <div className="p-6 relative bg-white mt-[-3rem] rounded-2xl shadow-md">
            <img
              src={listing.logo}
              alt={listing.name}
              className="absolute -top-12 left-6 w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
            />

            <div className="ml-32">
              <h1 className="text-3xl font-bold text-gray-900">
                {listing.name}
              </h1>
              <p className="text-lg text-[#2C8845]">{listing.companyName}</p>
              <p className="text-sm text-gray-500 mt-1">
                {listing.district}, {listing.businessType}
              </p>

              {/* Rating */}
              <div className="mt-3">
                <RatingStars rating={listing.rating} size={20} />
              </div>

              {/* Info Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {[
                  {
                    icon: <MapPin size={18} className="text-[#2C8845]" />,
                    label: "Address",
                    value: "123 Tech Park Avenue, Banani, Dhaka 1213",
                  },
                  {
                    icon: <Phone size={18} className="text-[#2C8845]" />,
                    label: "Phone",
                    value: "+880 1711-555444",
                  },
                  {
                    icon: <Mail size={18} className="text-[#2C8845]" />,
                    label: "Email",
                    value: "info@techsolutionspro.com",
                  },
                  {
                    icon: <Briefcase size={18} className="text-[#2C8845]" />,
                    label: "Business Type",
                    value: "Technology & Software Development",
                  },
                  {
                    icon: <Globe size={18} className="text-[#2C8845]" />,
                    label: "Website",
                    value: (
                      <a
                        href="https://www.techsolutionspro.com"
                        target="_blank"
                        className="text-[#2C8845] hover:underline"
                      >
                        www.techsolutionspro.com
                      </a>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <div>{item.icon}</div>
                    <div>
                      <span className="font-semibold">{item.label}: </span>
                      <span>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <nav className="bg-white p-4 mt-6 shadow border rounded-xl">
            <ul className="flex flex-wrap gap-3">
              {[
                { key: "products", label: "Products", icon: ListOrdered },
                { key: "services", label: "Services", icon: Briefcase },
                { key: "reviews", label: "Reviews", icon: Users },
                { key: "about", label: "About", icon: Info },
              ].map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveTab(key as any)}
                    className={`flex items-center px-4 py-2 text-sm font-bold rounded-lg ${
                      activeTab === key
                        ? "bg-[#2C8845] text-white"
                        : "hover:bg-[#2C8845]/10 text-gray-700"
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-white p-6 mt-4 rounded-xl shadow border">
            {tabContentMap[activeTab]}
          </div>

          {/* FAKE GOOGLE MAP */}
          <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                "123 Tech Park Avenue, Banani, Dhaka 1213"
              )}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </main>

        {/* RIGHT SIDEBAR (Adsense) - MODIFIED: Reduced width from lg:col-span-3 to lg:col-span-2
         */}
        <aside className="hidden lg:flex lg:flex-col lg:w-[250px] p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 border border-gray-300 rounded-xl h-[250px] flex items-center justify-center text-gray-500 text-sm"
            >
              AD SENSE {i + 1} (150x250)
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

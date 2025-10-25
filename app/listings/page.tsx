
// 3rd - ListingsPage.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Star, MapPin, Phone, Mail, ChevronDown, Filter } from "lucide-react";

// --- IMPORT DATA from '@/lib/data' ---
import {
  listings as importedListings,
  categories as importedDistricts, // 💡 FIX: Changed from 'districtCategories' to 'categories'
  businessCategories as importedBusinessTypes,
  Listing,
  DivisionCategory,
} from "@/lib/data";

// --- LISTINGS PAGE COMPONENT ---
export default function ListingsPage() {
  // 1. Use the imported data directly
  const listings: Listing[] = importedListings;
  const districtCategories: DivisionCategory[] = importedDistricts; // District Categories
  const businessCategories: string[] = importedBusinessTypes; // Business Categories

  // 2. State management
  const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // Location Filter
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>(""); // New Business Type Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [openDivision, setOpenDivision] = useState<string>("Dhaka");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // 3. Filtering and Sorting Logic - UPDATED
  const filteredListings = useMemo(() => {
    let filtered = listings;

    // Filter by District (Location)
    if (selectedDistrict) {
      filtered = filtered.filter(
        (listing) => listing.district === selectedDistrict
      );
    }

    // Filter by Business Type (NEW LOGIC)
    if (selectedBusinessType) {
      filtered = filtered.filter(
        (listing) => listing.businessType === selectedBusinessType
      );
    }

    // Filter by Search Term (Unchanged)
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

    // Sort (Unchanged)
    let sorted = [...filtered];
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") sorted.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === "name")
      sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [selectedDistrict, selectedBusinessType, searchTerm, sortBy, listings]); // Added selectedBusinessType to dependency array

  // Handler to select District
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };

  // Handler to select Business Type
  const handleBusinessTypeSelect = (businessType: string) => {
    setSelectedBusinessType(businessType);
    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };

  // Helper function to count listings per business type
  const getBusinessTypeCount = (type: string): number => {
    return listings.filter((listing) => listing.businessType === type).length;
  };

  // Helper function to count listings per district
  const getDistrictCount = (district: string): number => {
    return listings.filter((listing) => listing.district === district).length;
  };

  // 4. Render UI
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        {/* Mobile/Tablet Filter Button (Hamburger) - UPDATED TEXT */}
        <div className="lg:hidden p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full flex items-center justify-center p-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-md"
          >
            <Filter size={20} className="mr-2" />
            Filters ({selectedDistrict || selectedBusinessType ? "Active" : "All"})
          </button>
        </div>

        {/* Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-8 h-full">
          {/* Sidebar Filters - Dark Green Theme (lg:col-span-1) */}
          <div
            className={`
              min-h-screen bg-green-700 text-white p-0
              lg:col-span-1 lg:block lg:sticky lg:top-0 lg:overflow-y-auto
              ${
                isMobileFilterOpen
                  ? "fixed top-0 left-0 h-full w-64 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out"
                  : "fixed top-0 left-0 h-full w-64 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-auto lg:z-auto"
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

            {/* --- NEW: BUSINESS CATEGORY FILTER --- */}
            <div className="mb-6 border-b border-green-600 pb-4 px-4">
              <h3 className="text-xl font-bold mb-2 text-white/90">
                Business Type
              </h3>
              <div className="space-y-1">
                {businessCategories.map((type) => (
                  <Link
                    key={type}
                    href={`#biz-${type.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleBusinessTypeSelect(type);
                    }}
                    className={`
                      w-full flex justify-between items-center text-left px-2 py-2 transition-colors text-base font-medium rounded-md
                      ${
                        selectedBusinessType === type
                          ? "bg-green-800 text-white border-l-4 border-white"
                          : "hover:bg-green-600/80 border-l-4 border-transparent text-white/90"
                      }
                    `}
                  >
                    <span className="truncate">{type}</span>
                    <span className="text-white/70 ml-2 text-xs flex-shrink-0">
                      ({getBusinessTypeCount(type)})
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* --- LOCATION (DISTRICT) FILTER --- */}
            <div className="mb-6 px-4">
              <h3 className="text-xl font-bold mb-2 text-white/90">
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
                    className="w-full flex justify-between items-center text-left px-2 py-2 cursor-pointer bg-green-600 hover:bg-green-500 transition-colors text-base font-bold rounded-md"
                  >
                    <span className="truncate">
                      {divisionGroup.division} Division
                    </span>
                    <ChevronDown
                      size={16}
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
                          href={`#dist-${district.toLowerCase().replace(/\s/g, "-")}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDistrictSelect(district);
                          }}
                          className={`
                            w-full flex justify-between items-center text-left pl-4 py-1.5 transition-colors text-sm font-medium
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

          {/* Overlay for mobile filter (Unchanged) */}
          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            ></div>
          )}

          {/* Main Content Area (lg:col-span-7) - UPDATED TEXT */}
          <div className="lg:col-span-7 p-8 bg-gray-50">
            {/* Title and Description */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                Business Directory:
                <span className="text-green-700">
                  {selectedBusinessType || selectedDistrict ? "" : " Bangladesh"}
                </span>
              </h1>
              <p className="text-gray-500">
                Showing
                <span className="font-semibold text-gray-800">
                  {selectedBusinessType && ` ${selectedBusinessType}`}
                </span>
                {selectedDistrict &&
                  ` in ${selectedDistrict} District`}{" "}
                Listings
              </p>
            </div>

            {/* Search, Sort, and Filters Header (Unchanged) */}
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

            {/* Listings Grid (UPDATED FIELDS) */}
            {filteredListings.length > 0 ? (
              <div className="flex flex-col gap-8">
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
                      <div className="relative h-40 md:h-72 bg-gray-200 overflow-hidden md:col-span-1">
                        <img
                          src={listing.coverImage || "/placeholder.svg"}
                          alt={listing.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 text-xs font-semibold text-white bg-green-700 px-3 py-1 rounded-full shadow-md">
                          {listing.district} 
                        </div>
                         <div className="absolute bottom-2 left-2 text-xs font-semibold text-green-700 bg-white px-3 py-1 rounded-full shadow-md">
                          {listing.businessType} 
                        </div>
                      </div>

                      {/* Content */}
                      <div className="py-4 px-6 md:col-span-2 flex flex-col justify-between">
                        <div>
                          {/* Logo & Name (Unchanged) */}
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

                          {/* Description (Unchanged) */}
                          <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                            {listing.description}
                          </p>

                          {/* Rating & Address (Unchanged) */}
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-semibold text-gray-800 mr-2">
                              {listing.rating}
                            </span>
                            <span className="mr-4">
                              ({listing.reviews} reviews)
                            </span>
                            <MapPin size={14} className="mr-1" />
                            <span className="line-clamp-1">{listing.address}</span>
                          </div>
                        </div>

                        {/* Labels and Contact Info (Unchanged) */}
                        <div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {listing.labels.map((label) => (
                              <span
                                key={label}
                                className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Phone size={14} className="mr-1" />
                              {listing.phone}
                            </span>
                            <span className="flex items-center">
                              <Mail size={14} className="mr-1" />
                              {listing.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <p className="text-xl font-semibold text-gray-700">
                  No listings found matching your current filters.
                </p>
                <p className="text-gray-500 mt-2">
                  Try clearing a filter for a wider search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- IMPORT DATA from '@/lib/data' ---
// NOTE: Assuming these imports and types are correctly defined elsewhere
import {
  listings as importedListings,
  categories as importedDistricts,

  Listing,
  DivisionCategory,
} from "@/lib/data";
import { businessCategories as importedBusinessTypes, BusinessCategory } from "@/lib/data";

// --- CONFIGURATION ---
const CARDS_PER_PAGE = 10;

// --- PAGINATION COMPONENT (New) ---
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = useMemo(() => {
    const pages = [];
    // Show up to 5 page numbers (e.g., 1, 2, 3, 4, 5)
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if we hit the totalPages limit
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-gray-300 rounded-full text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      <nav aria-label="Pagination">
        <ul className="flex space-x-2">
          {/* Show first page if not in range */}
          {pageNumbers[0] > 1 && (
            <>
              <li>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-3 py-1 text-sm rounded-lg text-gray-700 hover:bg-green-100 transition-colors"
                >
                  1
                </button>
              </li>
              {pageNumbers[0] > 2 && (
                <span className="px-1 py-1 text-sm text-gray-500">...</span>
              )}
            </>
          )}

          {pageNumbers.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`
                                    px-3 py-1 text-sm font-semibold rounded-lg transition-colors
                                    ${
                                      page === currentPage
                                        ? "bg-green-700 text-white"
                                        : "text-gray-700 hover:bg-green-100"
                                    }
                                `}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Show last page if not in range */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-1 py-1 text-sm text-gray-500">...</span>
              )}
              <li>
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-3 py-1 text-sm rounded-lg text-gray-700 hover:bg-green-100 transition-colors"
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-gray-300 rounded-full text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

// --- LISTINGS PAGE COMPONENT ---
export default function ListingsPage() {
  // 1. Use the imported data directly
  const listings: Listing[] = importedListings;
  const districtCategories: DivisionCategory[] = importedDistricts; // District Categories
  // const businessCategories: string[] = importedBusinessTypes; // Business Categories


const businessCategories: BusinessCategory[] = importedBusinessTypes;

  // 2. State management
  const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // Location Filter
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>(""); // New Business Type Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [openDivision, setOpenDivision] = useState<string>("Dhaka");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // PAGINATION STATE (New)
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Filtering and Sorting Logic
  const allFilteredAndSortedListings = useMemo(() => {
    let filtered = listings;

    // Filter by District (Location)
    if (selectedDistrict) {
      filtered = filtered.filter(
        (listing) => listing.district === selectedDistrict
      );
    }

    // Filter by Business Type
    if (selectedBusinessType) {
      filtered = filtered.filter(
        (listing) => listing.businessType === selectedBusinessType
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
    let sorted = [...filtered];
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") sorted.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === "name")
      sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [selectedDistrict, selectedBusinessType, searchTerm, sortBy, listings]);

  // PAGINATION CALCULATIONS (New)
  const totalPages = Math.ceil(
    allFilteredAndSortedListings.length / CARDS_PER_PAGE
  );

  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    return allFilteredAndSortedListings.slice(startIndex, endIndex);
  }, [allFilteredAndSortedListings, currentPage]);

  // Handlers
  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setCurrentPage(1); // Reset page on filter change
    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };

  const handleBusinessTypeSelect = (businessType: string) => {
    setSelectedBusinessType(businessType);
    setCurrentPage(1); // Reset page on filter change
    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Optionally, scroll to top of listings when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* Mobile/Tablet Filter Button (Hamburger) */}
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

        {/* Grid Structure: 3 Columns on Large Screens (2 / 7 / 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Sidebar Filters - Left Column (lg:col-span-2) - NARROWER */}
          <div
            className={`
                            min-h-screen bg-green-700 text-white p-0
                            lg:col-span-2 lg:block lg:sticky lg:top-0 lg:overflow-y-auto
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
                                      selectedDistrict === "" &&
                                      selectedBusinessType === ""
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
                                              openDivision ===
                                              divisionGroup.division
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
                                                          selectedDistrict ===
                                                          district
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

          {/* Main Content Area - Middle Column (lg:col-span-7) - WIDER */}
          <div className="lg:col-span-7 p-8 bg-gray-50">
            {/* Title and Description */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                Business Club:
                <span className="text-green-700">
                  {selectedBusinessType || selectedDistrict
                    ? ""
                    : " Bangladesh"}
                </span>
              </h1>
              <p className="text-gray-500">Best Business club</p>
            </div>

            {/* Search, Sort, and Filters Header (Unchanged) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 md:mb-0">
                Page: <span className="text-green-700">{currentPage}</span> of{" "}
                <span className="text-green-700">{totalPages}</span>
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

            {/* Listings Grid (Card List) - NOW USING paginatedListings */}
            {paginatedListings.length > 0 ? (
              <div className="flex flex-col gap-8">
                {paginatedListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer group rounded-xl"
                    onClick={() =>
                      (window.location.href = `/listings/${listing.id}`)
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {/* Cover Image */}
                      <div className="relative h-40 md:h-48 bg-gray-200 overflow-hidden md:col-span-1">
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
                      <div className="py-3 px-6 md:col-span-2 flex flex-col justify-between">
                        <div>
                          {/* Logo & Name */}
                          <div className="flex items-start gap-4 mb-2">
                            <img
                              src={listing.logo || "/placeholder.svg"}
                              alt={listing.companyName}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm"
                            />
                            <div className="flex-1">
                              <h3 className="font-extrabold text-lg text-gray-900 leading-tight">
                                {listing.name}
                              </h3>
                              <p className="text-xs text-green-700 font-medium">
                                {listing.companyName}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 mb-2 text-xs line-clamp-2">
                            {listing.description}
                          </p>

                          {/* Rating & Address */}
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <Star
                              size={12}
                              className="text-yellow-400 fill-yellow-400 mr-1"
                            />
                            <span className="font-semibold text-gray-800 mr-2">
                              {listing.rating}
                            </span>
                            <span className="mr-3">
                              ({listing.reviews} reviews)
                            </span>
                            <MapPin size={12} className="mr-1" />
                            <span className="line-clamp-1">
                              {listing.address}
                            </span>
                          </div>
                        </div>

                        {/* Labels and Contact Info */}
                        <div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {listing.labels.map((label) => (
                              <span
                                key={label}
                                className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                            <span className="flex items-center">
                              <Phone size={12} className="mr-1" />
                              {listing.phone}
                            </span>
                            <span className="flex items-center">
                              <Mail size={12} className="mr-1" />
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

            {/* PAGINATION (New) */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Ad Sense Space - Right Column (lg:col-span-3) - UNCHANGED */}
          <div className="hidden lg:block lg:col-span-3 p-8 bg-gray-50">
            <div className="sticky top-32">
              {/* === 2 COLUMN / 3 ROW GRID FOR ADS 1-6 === */}
              <div className="grid grid-cols-2 grid-rows-3 gap-4">
                {/* Ad Placeholder 1 (Row 1, Column 1) */}
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 1
                    <br />
                    (150x250)
                  </p>
                </div>

                {/* Ad Placeholder 2 (Row 1, Column 2) */}
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 2
                    <br />
                    (150x250)
                  </p>
                </div>

                {/* Ad Placeholder 3 (Row 2, Column 1) */}
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 3
                    <br />
                    (150x250)
                  </p>
                </div>

                {/* Ad Placeholder 4 (Row 2, Column 2) */}
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 4
                    <br />
                    (150x250)
                  </p>
                </div>

                {/* Ad Placeholder 5 (Row 3, Column 1) */}
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 5
                    <br />
                    (150x250)
                  </p>
                </div>

                {/* Ad Placeholder 6 (Row 3, Column 2) */}
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 6
                    <br />
                    (150x250)
                  </p>
                </div>
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 6
                    <br />
                    (150x250)
                  </p>
                </div>
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 6
                    <br />
                    (150x250)
                  </p>
                </div>
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 6
                    <br />
                    (150x250)
                  </p>
                </div>
                <div className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner">
                  <p>
                    AD SENSE 6
                    <br />
                    (150x250)
                  </p>
                </div>
              </div>
              {/* === END GRID FOR ADS 1-6 === */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

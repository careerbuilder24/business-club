"use client";

import { useState, useMemo } from "react";
import {
  Star,
  Globe,
  Heart,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  House,
} from "lucide-react";
import {
  listings as importedListings,
  categories as importedDistricts,
  Listing,
  DivisionCategory,
} from "@/lib/data";
import {
  businessCategories as importedBusinessTypes,
  BusinessCategory,
} from "@/lib/data";
import { useWatchList } from "../../app/context/WatchListContext";
import Sidebar from "../Sidebar/Sidebar";
const CARDS_PER_PAGE = 10;
export const categories = [
  {
    name: "Dhaka",
    districts: [
      "Dhaka",
      "Gazipur",
      "Kishoreganj",
      "Manikganj",
      "Munshiganj",
      "Narayanganj",
      "Narsingdi",
      "Tangail",
      "Faridpur",
      "Gopalganj",
      "Madaripur",
      "Rajbari",
      "Shariatpur",
    ],
  },
  {
    name: "Chattogram",
    districts: [
      "Chattogram",
      "Cox's Bazar",
      "Rangamati",
      "Bandarban",
      "Khagrachhari",
      "Feni",
      "Noakhali",
      "Laxmipur",
      "Brahmanbaria",
      "Comilla",
      "Chandpur",
    ],
  },
  {
    name: "Rajshahi",
    districts: [
      "Rajshahi",
      "Natore",
      "Pabna",
      "Sirajganj",
      "Bogura",
      "Joypurhat",
      "Naogaon",
      "Chapai Nawabganj",
    ],
  },
  {
    name: "Khulna",
    districts: [
      "Khulna",
      "Bagerhat",
      "Satkhira",
      "Jessore",
      "Jhenaidah",
      "Magura",
      "Narail",
      "Kushtia",
      "Chuadanga",
      "Meherpur",
    ],
  },
  {
    name: "Barishal",
    districts: [
      "Barishal",
      "Bhola",
      "Patuakhali",
      "Barguna",
      "Jhalokathi",
      "Pirojpur",
    ],
  },
  {
    name: "Sylhet",
    districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  },
  {
    name: "Rangpur",
    districts: [
      "Rangpur",
      "Dinajpur",
      "Thakurgaon",
      "Panchagarh",
      "Nilphamari",
      "Lalmonirhat",
      "Kurigram",
      "Gaibandha",
    ],
  },
  {
    name: "Mymensingh",
    districts: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  },
];
// Pagination Component
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
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

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
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-gray-300 rounded-full text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      <nav aria-label="Pagination">
        <ul className="flex space-x-2">
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
                className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors ${
                  page === currentPage
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-100"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
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

// Rating Stars Component
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        className={`${
          i < fullStars
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 fill-gray-300"
        }`}
      />
    );
  }

  return <div className="flex space-x-0.5">{stars}</div>;
};

// Listing Card Component
const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  // Use the context hook

  const { isWatched, toggleWatch } = useWatchList(); // Get the current watch state (renamed for clarity in the component)
  const isCurrentlyFavorite = isWatched(listing.id); //

  return (
    <div
      key={listing.id}
      className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer group rounded-xl flex flex-col md:flex-row mb-6 relative"
      onClick={() => (window.location.href = `/listings/${listing.id}`)}
    >
      {/* Favorite Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Toggle the favorite state using the context function
          toggleWatch(listing);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow-md hover:bg-green-100 transition-colors"
      >
        <Heart
          size={20}
          className={`${
            isCurrentlyFavorite
              ? "text-[#2C8845] fill-[#2C8845]"
              : "text-gray-300 fill-gray-300"
          }`}
        />
      </button>

      {/* Left Section: Logo, Category, Rating */}
      <div className="md:w-48 bg-gray-50 flex flex-col items-center justify-start p-4 border-r border-gray-100 flex-shrink-0">
        <div className="w-full h-fit mb-3 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
          <img
            src={listing.logo || "/placeholder.svg"}
            alt={listing.companyName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mb-3 text-center">
          <span className="text-xs font-semibold text-white bg-green-700 px-2 py-1 rounded shadow-sm">
            {listing.businessType}
          </span>
        </div>
        <div className="flex items-center">
          <RatingStars rating={listing.rating} />
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-bold text-gray-700">{listing.rating}</span>
          </p>
        </div>
      </div>

      {/* Right Section: Details */}
      <div className="flex-1 py-4 px-6 flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-2xl text-gray-900 leading-tight group-hover:text-green-700 transition-colors">
            {listing.name}
          </h3>
          <p className="text-sm text-green-700 font-medium mb-2">
            {listing.companyName}
          </p>
          <p className="text-gray-600  text-sm line-clamp-2">
            {listing.description}
          </p>

          <div className="flex flex-col gap-1 mt-2 text-xs text-gray-600">
            <span className="flex items-center">
              <Phone size={12} className="mr-1 text-blue-500" />
              {listing.phone}
            </span>
            <span className="flex items-center">
              <Mail size={12} className="mr-1 text-orange-500" />
              {listing.email}
            </span>
            {listing.website && (
              <span className="flex items-center">
                <Globe size={12} className="mr-1 text-green-600" />
                <a
                  href={
                    listing.website.startsWith("http")
                      ? listing.website
                      : `https://${listing.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline hover:text-green-800 transition"
                >
                  {listing.website.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}

            <span className="flex items-center">
              <House size={12} className="mr-1 text-orange-500" />
              {listing.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
//  Props interface
interface ListingsPageProps {
  listings: Listing[];
  districtCategories: DivisionCategory[];
  businessCategories: BusinessCategory[];
}
// Main Listings Page
export default function ListingsPage({ listings }: ListingsPageProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const [currentPage, setCurrentPage] = useState(1);

  const allFilteredAndSortedListings = useMemo(() => {
    let filtered = listings;
    if (selectedDistrict)
      filtered = filtered.filter((l) => l.district === selectedDistrict);
    if (selectedBusinessType)
      filtered = filtered.filter(
        (l) => l.businessType === selectedBusinessType
      );
    if (searchTerm) {
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          l.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews")
      filtered.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === "name")
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [selectedDistrict, selectedBusinessType, searchTerm, sortBy, listings]);

  const totalPages = Math.ceil(
    allFilteredAndSortedListings.length / CARDS_PER_PAGE
  );
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    return allFilteredAndSortedListings.slice(
      startIndex,
      startIndex + CARDS_PER_PAGE
    );
  }, [allFilteredAndSortedListings, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen md:ml-72 bg-white">
        <div className="w-full">
          {/* Main Flex Layout */}
          <div className="flex flex-col lg:flex-row lg:gap-4">
            {/* Middle Content */}
            <div className="flex-1 p-8 bg-white max-w-3xl">
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
              {/* Search Bar */}
              <div className="w-full md:w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search business name or description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md gap-4">
                {/* Division Dropdown */}
                <div className="w-full md:w-1/4">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="">All Division</option>
                    {categories.map((division, index) => (
                      <option key={division.name + index} value={division.name}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Dropdown (auto changes based on division) */}
                <div className="w-full md:w-1/4">
                  <select
                    value={selectedBusinessType}
                    onChange={(e) => setSelectedBusinessType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="">All District</option>
                    {categories
                      .find((d) => d.name === selectedDistrict)
                      ?.districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Sorting Dropdown */}
                <div className="w-full md:w-1/4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="name">Name (A–Z)</option>
                  </select>
                </div>
              </div>

              {paginatedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Right Ads */}
            <div className="hidden lg:flex lg:flex-col lg:w-72 p-8  gap-4 flex-wrap">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner"
                >
                  <p>
                    AD SENSE {i + 1} <br /> (150x250)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

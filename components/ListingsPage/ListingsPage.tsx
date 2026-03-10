// second part

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
import Sidebar from "../Sidebar/Sidebar";
import { useWatchList } from "../../app/context/WatchListContext";

const businessTypes = [
  "Manufacturer",
  "Supplier",
  "Buying House",
  "Dealer",
  "Trader",
  "Importer",
  "Exporter",
];
const industries = [
  { name: "Agriculture Farm", count: 34 },
  { name: "Aquarium Fish Farm", count: 4 },
  { name: "Automotive Industry", count: 123 },
  { name: "Banks", count: 0 },
  { name: "Beauty Parlor & Spa", count: 0 },
  { name: "Blogs & Magazines", count: 0 },
  { name: "Brassware Industry", count: 0 },
  { name: "Buying House", count: 12 },
  { name: "Cement Factory", count: 0 },
  { name: "Ceramics Factory", count: 1 },
  { name: "Chemical Factory", count: 2 },
  { name: "Cleaning Agency", count: 8 },
  { name: "Coaching Center", count: 2 },
  { name: "Construction Firm", count: 6 },
  { name: "Construction Materials", count: 3 },
  { name: "Consulting Firms", count: 1 },
  { name: "Cottage Industry", count: 1 },
  { name: "Courier Service", count: 1 },
  { name: "Day Care Center", count: 0 },
  { name: "Diagnostic Centers", count: 3 },
  { name: "Ecommerce", count: 48 },
  { name: "Education Institute", count: 8 },
  { name: "Electronics Industry", count: 16 },
  { name: "Engineering Workshop", count: 4 },
  { name: "Event Management Firm", count: 0 },
  { name: "Fashion House", count: 39 },
  { name: "Fast Food & Restaurant", count: 2 },
  { name: "Fertiliser Factory", count: 0 },
  { name: "Financial Company", count: 1 },
  { name: "Fisheries", count: 0 },
  { name: "Food Factory", count: 27 },
  { name: "Furniture Company", count: 6 },
  { name: "Garments Factory", count: 16 },
  { name: "Glass Factory", count: 1 },
  { name: "Grocery Shop", count: 10 },
  { name: "Gym", count: 0 },
  { name: "Handicraft Company", count: 2 },
  { name: "Handloon Industry", count: 0 },
  { name: "Hatchery", count: 10 },
  { name: "Health Care Company", count: 10 },
  { name: "Home Appliance Company", count: 5 },
  { name: "Home Builders", count: 1 },
  { name: "Homeo Clinic", count: 3 },
  { name: "Hotel", count: 1 },
  { name: "Interior Design Firm", count: 0 },
  { name: "Interior Firm", count: 5 },
  { name: "Internet Service Provider", count: 1 },
  { name: "IT Firm", count: 13 },
  { name: "Jewellery Factory", count: 0 },
  { name: "Jewelry Company", count: 2 },
  { name: "Jute Factory", count: 1 },
  { name: "Law Firms", count: 2 },
  { name: "Leather Factory", count: 6 },
  { name: "Life Insurance", count: 0 },
  { name: "Machine Industry", count: 4 },
  { name: "Madrasha", count: 1 },
  { name: "Maid Agency", count: 1 },
  { name: "Marine Industry", count: 0 },
  { name: "Marketing Agency", count: 4 },
  { name: "Marriage Media", count: 5 },
  { name: "Medical Equipment Suppliers", count: 4 },
  { name: "Mosquito Coil Factory", count: 0 },
  { name: "Motor Vehicle Service", count: 1 },
  { name: "Music Industry", count: 0 },
  { name: "Newspaper", count: 4 },
  { name: "Pearl Farm", count: 0 },
  { name: "Pet Shop", count: 0 },
  { name: "Petroleum Industry", count: 0 },
  { name: "Pharmaceutical Industry", count: 0 },
  { name: "Photo Studio", count: 0 },
  { name: "Physical Therapy Center", count: 1 },
  { name: "Poultry Farm", count: 1 },
  { name: "Printing Press", count: 2 },
  { name: "Publications", count: 2 },
  { name: "Pulp & Paper Company", count: 1 },
  { name: "Real Estate Company", count: 3 },
  { name: "Resorts", count: 0 },
  { name: "Restaurant", count: 0 },
  { name: "Salon & Spa", count: 0 },
  { name: "Sanitary Agency", count: 1 },
  { name: "School & College", count: 2 },
  { name: "Security Company", count: 2 },
  { name: "Service Company", count: 13 },
  { name: "Shoe Factory", count: 2 },
  { name: "Steel Factory", count: 1 },
  { name: "Tea Industry", count: 3 },
  { name: "Telecommunications", count: 4 },
  { name: "Textile Industry", count: 4 },
  { name: "Transport Company", count: 1 },
  { name: "Travel Agency", count: 4 },
  { name: "University", count: 0 },
  { name: "Veterinary Farm", count: 2 },
];

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
const CARDS_PER_PAGE = 10;

// RatingStars and ListingCard remain mostly the same
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

const ListingCard: React.FC<{ listing: any }> = ({ listing }) => {
  const { isWatched, toggleWatch } = useWatchList();
  const isCurrentlyFavorite = isWatched(listing.id);

  return (
    <div
      key={listing.id}
      className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer group rounded-xl flex flex-col md:flex-row mb-6 relative"
      // onClick={() => (window.location.href = `/listings/${listing.id}`)}
       onClick={() => (window.location.href = `/listings/${listing.slug}`)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
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
          <RatingStars rating={listing.rating || 0} />
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-bold text-gray-700">
              {listing.rating || 0}
            </span>
          </p>
        </div>
      </div>

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
              <Phone size={12} className="mr-1 text-blue-500" /> {listing.phone}
            </span>
            <span className="flex items-center">
              <Mail size={12} className="mr-1 text-orange-500" />{" "}
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
              <House size={12} className="mr-1 text-orange-500" />{" "}
              {listing.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ListingsPageProps {
  categories: any[];
  listings: any[]; // <- pass server-side fetched listings here
}

export default function ListingsPage({
  categories = [],
  listings = [],
}: ListingsPageProps) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

const allFilteredAndSortedListings = useMemo(() => {
  let filtered = listings
    .filter((l) => l.status === "Active") // <-- ONLY active listings
    .map((l) => {
      const slug = l.listing_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return {
        id: l.id,
        slug: slug,
        name: l.listing_name,
        companyName: l.company_name,
        description: l.description,
        address: l.address,
        phone: l.phone,
        email: l.email,
        website: l.website,
        logo: l.logo_url || "/placeholder.svg",
        businessType: l.category,
        rating: l.rating || 0,
        district: l.district || "",
        reviews: l.reviews || 0,
      };
    });

  if (selectedDistrict)
    filtered = filtered.filter((l) => l.district === selectedDistrict);
  if (selectedBusinessType)
    filtered = filtered.filter((l) => l.businessType === selectedBusinessType);
  if (selectedIndustry)
    filtered = filtered.filter((l) => l.businessType === selectedIndustry);
  if (searchTerm) {
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "reviews") filtered.sort((a, b) => b.reviews - a.reviews);
  else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  return filtered;
}, [selectedDistrict, selectedBusinessType, selectedIndustry, searchTerm, sortBy, listings]);


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
      <div className="min-h-screen lg:ml-72 bg-white">
        <div className="lg:w-7/12 w-full flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
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
            <div className="w-full md:w-full mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search business name or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md gap-4">
              {/* Division Dropdown */}
              <div className="w-full md:w-1/4">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Division</option>
                  {categories.map((division, index) => (
                    <option
                      key={`division-${division.name || index}`}
                      value={division.name || ""}
                    >
                      {division.name || "Unknown Division"}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Dropdown */}
              <div className="w-full md:w-1/4">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All District</option>
                  {categories
                    .find((d) => d.name === selectedDistrict)
                    ?.districts.map((district: string) => (
                      <option key={`district-${district}`} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
              </div>

              {/* Business Type Dropdown */}
              <div className="w-full md:w-1/4">
                <select
                  value={selectedBusinessType}
                  onChange={(e) => {
                    setSelectedBusinessType(e.target.value);
                    setSelectedIndustry(""); // Reset industry on change
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  <option value="">Business Type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry Dropdown */}
              <div className="w-full md:w-1/4">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  <option value="">Industry</option>
                  {industries
                    .filter((ind) =>
                      selectedBusinessType
                        ? ind.name
                            .toLowerCase()
                            .includes(selectedBusinessType.toLowerCase())
                        : true
                    )
                    .map((ind) => (
                      <option key={ind.name} value={ind.name}>
                        {ind.name} ({ind.count})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Listings */}
            <div className="space-y-4">
              {paginatedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Right Ads */}
          <div className="hidden lg:flex lg:flex-col lg:w-72 p-4 gap-4">
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
    </>
  );
}

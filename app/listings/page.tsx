// --- ListingsPage.tsx ---
// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import {
//   Star,
//   MapPin,
//   Phone,
//   Mail,
//   ChevronDown,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import {
//   listings as importedListings,
//   categories as importedDistricts,
//   Listing,
//   DivisionCategory,
// } from "@/lib/data";
// import {
//   businessCategories as importedBusinessTypes,
//   BusinessCategory,
// } from "@/lib/data";

// const CARDS_PER_PAGE = 10;

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   if (totalPages <= 1) return null;

//   const pageNumbers = useMemo(() => {
//     const pages = [];
//     const maxPagesToShow = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//     let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//     if (endPage - startPage + 1 < maxPagesToShow) {
//       startPage = Math.max(1, endPage - maxPagesToShow + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }
//     return pages;
//   }, [currentPage, totalPages]);

//   return (
//     <div className="flex justify-center items-center space-x-2 mt-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="p-2 border border-gray-300 rounded-full text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <ChevronLeft size={16} />
//       </button>
//       <nav aria-label="Pagination">
//         <ul className="flex space-x-2">
//           {pageNumbers[0] > 1 && (
//             <>
//               <li>
//                 <button
//                   onClick={() => onPageChange(1)}
//                   className="px-3 py-1 text-sm rounded-lg text-gray-700 hover:bg-green-100 transition-colors"
//                 >
//                   1
//                 </button>
//               </li>
//               {pageNumbers[0] > 2 && (
//                 <span className="px-1 py-1 text-sm text-gray-500">...</span>
//               )}
//             </>
//           )}
//           {pageNumbers.map((page) => (
//             <li key={page}>
//               <button
//                 onClick={() => onPageChange(page)}
//                 className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors ${
//                   page === currentPage
//                     ? "bg-green-700 text-white"
//                     : "text-gray-700 hover:bg-green-100"
//                 }`}
//               >
//                 {page}
//               </button>
//             </li>
//           ))}
//           {pageNumbers[pageNumbers.length - 1] < totalPages && (
//             <>
//               {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
//                 <span className="px-1 py-1 text-sm text-gray-500">...</span>
//               )}
//               <li>
//                 <button
//                   onClick={() => onPageChange(totalPages)}
//                   className="px-3 py-1 text-sm rounded-lg text-gray-700 hover:bg-green-100 transition-colors"
//                 >
//                   {totalPages}
//                 </button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="p-2 border border-gray-300 rounded-full text-gray-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//       >
//         <ChevronRight size={16} />
//       </button>
//     </div>
//   );
// };

// export default function ListingsPage() {
//   const listings: Listing[] = importedListings;
//   const districtCategories: DivisionCategory[] = importedDistricts;
//   const businessCategories: BusinessCategory[] = importedBusinessTypes;

//   const [selectedDistrict, setSelectedDistrict] = useState<string>("");
//   const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("rating");
//   const [openDivision, setOpenDivision] = useState<string>("Dhaka");
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const allFilteredAndSortedListings = useMemo(() => {
//     let filtered = listings;
//     if (selectedDistrict) filtered = filtered.filter((l) => l.district === selectedDistrict);
//     if (selectedBusinessType) filtered = filtered.filter((l) => l.businessType === selectedBusinessType);
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (l) =>
//           l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           l.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
//     else if (sortBy === "reviews") filtered.sort((a, b) => b.reviews - a.reviews);
//     else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
//     return filtered;
//   }, [selectedDistrict, selectedBusinessType, searchTerm, sortBy, listings]);

//   const totalPages = Math.ceil(allFilteredAndSortedListings.length / CARDS_PER_PAGE);
//   const paginatedListings = useMemo(() => {
//     const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
//     return allFilteredAndSortedListings.slice(startIndex, startIndex + CARDS_PER_PAGE);
//   }, [allFilteredAndSortedListings, currentPage]);

//   const handleDistrictSelect = (district: string) => {
//     setSelectedDistrict(district);
//     setCurrentPage(1);
//     if (isMobileFilterOpen) setIsMobileFilterOpen(false);
//   };

//   const handleBusinessTypeSelect = (type: string) => {
//     setSelectedBusinessType(type);
//     setCurrentPage(1);
//     if (isMobileFilterOpen) setIsMobileFilterOpen(false);
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const getBusinessTypeCount = (type: string) => listings.filter((l) => l.businessType === type).length;
//   const getDistrictCount = (district: string) => listings.filter((l) => l.district === district).length;

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="w-full">
//         {/* Mobile Filter Button */}
//         <div className="lg:hidden p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
//           <button
//             onClick={() => setIsMobileFilterOpen(true)}
//             className="w-full flex items-center justify-center p-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-md"
//           >
//             <Filter size={20} className="mr-2" />
//             Filters ({selectedDistrict || selectedBusinessType ? "Active" : "All"})
//           </button>
//         </div>

//         {/* Main Flex Layout */}
//         <div className="flex flex-col lg:flex-row lg:gap-4">
//           {/* Sidebar */}
//           <div
//             className={`min-h-screen bg-green-700 text-white p-0 lg:w-64 lg:block lg:sticky lg:top-0 lg:overflow-y-auto
//             ${isMobileFilterOpen
//               ? "fixed top-0 left-0 h-full w-64 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out"
//               : "fixed top-0 left-0 h-full w-64 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:z-auto"
//             }`}
//           >
//             <div className="lg:hidden p-4 flex justify-end">
//               <button
//                 onClick={() => setIsMobileFilterOpen(false)}
//                 className="text-white hover:text-gray-300 text-2xl"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="p-4">
//               <button
//                 onClick={() => {
//                   handleDistrictSelect("");
//                   handleBusinessTypeSelect("");
//                 }}
//                 className={`w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg ${
//                   selectedDistrict === "" && selectedBusinessType === ""
//                     ? "bg-green-800 border-2 border-white"
//                     : "hover:bg-green-600 border-2 border-transparent"
//                 }`}
//               >
//                 All Business
//               </button>
//             </div>

//             {/* Business Types */}
//             <div className="mb-6 border-b border-green-600 pb-4 px-4">
//               <h3 className="text-lg font-bold mb-2 text-white/90">Business Type</h3>
//               <div className="space-y-1">
//                 {businessCategories.map((category) => (
//                   <button
//                     key={category.name}
//                     onClick={() => handleBusinessTypeSelect(category.name)}
//                     className={`w-full flex justify-between items-center text-left px-2 py-2 transition-colors text-sm font-medium rounded-md ${
//                       selectedBusinessType === category.name
//                         ? "bg-green-800 text-white border-l-4 border-white"
//                         : "hover:bg-green-600/80 border-l-4 border-transparent text-white/90"
//                     }`}
//                   >
//                     <span>{category.name}</span>
//                     <span className="text-white/70 ml-2 text-xs flex-shrink-0">
//                       ({getBusinessTypeCount(category.name)})
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* District Filter */}
//             <div className="mb-6 px-4">
//               <h3 className="text-lg font-bold mb-2 text-white/90">Location (District)</h3>
//               {districtCategories.map((division) => (
//                 <div key={division.division} className="mt-2">
//                   <button
//                     onClick={() => setOpenDivision(openDivision === division.division ? "" : division.division)}
//                     className="w-full flex justify-between items-center text-left px-2 py-2 cursor-pointer bg-green-600 hover:bg-green-500 transition-colors text-sm font-bold rounded-md"
//                   >
//                     <span>{division.division} Division</span>
//                     <ChevronDown
//                       size={14}
//                       className={`transition-transform duration-300 ${openDivision === division.division ? "rotate-180" : "rotate-0"}`}
//                     />
//                   </button>
//                   <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openDivision === division.division ? "max-h-96" : "max-h-0"}`}>
//                     <div className="space-y-0.5 py-1">
//                       {division.districts.map((district) => (
//                         <button
//                           key={district}
//                           onClick={() => handleDistrictSelect(district)}
//                           className={`w-full flex justify-between items-center text-left pl-4 py-1.5 transition-colors text-xs font-medium ${
//                             selectedDistrict === district
//                               ? "bg-green-800 text-white border-l-4 border-white"
//                               : "hover:bg-green-700/80 border-l-4 border-transparent text-white/90"
//                           }`}
//                         >
//                           <span>{district}</span>
//                           <span className="text-white/70 ml-2 text-xs flex-shrink-0">
//                             ({getDistrictCount(district)})
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {isMobileFilterOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileFilterOpen(false)}></div>}

//           {/* Middle Content */}
//           <div className="flex-1 p-8 bg-white max-w-3xl">
//             <div className="mb-8">
//               <h1 className="text-4xl font-bold mb-2">
//                 Business Club:<span className="text-green-700">{selectedBusinessType || selectedDistrict ? "" : " Bangladesh"}</span>
//               </h1>
//               <p className="text-gray-500">Best Business club</p>
//             </div>

//             <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-bold mb-4 md:mb-0">
//                 Page: <span className="text-green-700">{currentPage}</span> of <span className="text-green-700">{totalPages}</span>
//               </h2>
//               <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mx-4">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search business name or description..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 />
//               </div>
//               <div className="w-full md:w-1/4">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
//                 >
//                   <option value="rating">Highest Rating</option>
//                   <option value="reviews">Most Reviews</option>
//                   <option value="name">Name (A-Z)</option>
//                 </select>
//               </div>
//             </div>

//             {/* Listings */}
//             {paginatedListings.length > 0 ? (
//               <div className="flex flex-col gap-8">
//                 {paginatedListings.map((listing) => (
//                   <div
//                     key={listing.id}
//                     className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer group rounded-xl flex flex-col md:flex-row "
//                     onClick={() => (window.location.href = `/listings/${listing.id}`)}
//                   >
//                     <div className="relative md:w-1/3 h-48 bg-gray-200 overflow-hidden">
//                       <img
//                         src={listing.coverImage || "/placeholder.svg"}
//                         alt={listing.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="absolute top-2 left-2 text-xs font-semibold text-white bg-green-700 px-3 py-1 rounded-full shadow-md">
//                         {listing.district}
//                       </div>
//                       <div className="absolute bottom-2 left-2 text-xs font-semibold text-green-700 bg-white px-3 py-1 rounded-full shadow-md">
//                         {listing.businessType}
//                       </div>
//                     </div>

//                     <div className="flex-1 py-3 px-6 flex flex-col justify-between">
//                       <div>
//                         <div className="flex items-start gap-4 mb-2">
//                           <img
//                             src={listing.logo || "/placeholder.svg"}
//                             alt={listing.companyName}
//                             className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm"
//                           />
//                           <div className="flex-1">
//                             <h3 className="font-extrabold text-lg text-gray-900 leading-tight">{listing.name}</h3>
//                             <p className="text-xs text-green-700 font-medium">{listing.companyName}</p>
//                           </div>
//                         </div>
//                         <p className="text-gray-600 mb-2 text-xs line-clamp-2">{listing.description}</p>
//                         <div className="flex items-center text-xs text-gray-500 mb-2">
//                           <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
//                           <span className="font-semibold text-gray-800 mr-2">{listing.rating}</span>
//                           <span className="mr-3">({listing.reviews} reviews)</span>
//                           <MapPin size={12} className="mr-1" />
//                           <span className="line-clamp-1">{listing.address}</span>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex flex-wrap gap-1 mb-2">
//                           {listing.labels.map((label) => (
//                             <span key={label} className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
//                               {label}
//                             </span>
//                           ))}
//                         </div>
//                         <div className="flex flex-wrap gap-3 text-xs text-gray-600">
//                           <span className="flex items-center">
//                             <Phone size={12} className="mr-1" />
//                             {listing.phone}
//                           </span>
//                           <span className="flex items-center">
//                             <Mail size={12} className="mr-1" />
//                             {listing.email}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center p-10 bg-white rounded-lg shadow-md">
//                 <p className="text-xl font-semibold text-gray-700">No listings found matching your current filters.</p>
//                 <p className="text-gray-500 mt-2">Try clearing a filter for a wider search.</p>
//               </div>
//             )}

//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//           </div>

//           {/* Right Ads */}
//           <div className="hidden lg:flex lg:flex-col lg:w-72 p-8  gap-4 flex-wrap">
//             {Array.from({ length: 10 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="w-full h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 font-semibold text-xs shadow-inner"
//               >
//                 <p>AD SENSE {i + 1} <br /> (150x250)</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// --- ListingsPage.tsx ---
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
  Globe ,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  listings as importedListings,
  categories as importedDistricts,
  Listing,
  DivisionCategory,
}
// NOTE: I'm assuming the path for lib/data is correct based on your snippet.
from "@/lib/data"; 
import {
  businessCategories as importedBusinessTypes,
  BusinessCategory,
} from "@/lib/data";

const CARDS_PER_PAGE = 10;

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

// Component for rendering the rating stars
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


// REFACTORED LISTING CARD
const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => (
  <div
    key={listing.id}
    className="bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all cursor-pointer group rounded-xl flex flex-col md:flex-row mb-6"
    onClick={() => (window.location.href = `/listings/${listing.id}`)}
  >
    {/*  Left Section: Logo, Category, and Rating (Matches the drawing)  */}
    <div className="md:w-48 bg-gray-50 flex flex-col items-center justify-start p-4 border-r border-gray-100 flex-shrink-0">
      
      {/* 1. Logo Picture */}
      <div className="w-full h-fit mb-3 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
        <img
          src={listing.logo || "/placeholder.svg"}
          alt={listing.companyName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Category */}
      <div className="mb-3 text-center">
        <span className="text-xs font-semibold text-white bg-green-700 px-2 py-1 rounded shadow-sm">
          {listing.businessType}
        </span>
      </div>
{/* ({listing.reviews} reviews) */}
      {/* 3. Rating Stars */}
      <div className="flex  items-center">
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
    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
      {listing.description}
    </p>

    <div className="flex flex-col gap-3 text-xs text-gray-600">
      <span className="flex items-center">
        <Phone size={12} className="mr-1 text-blue-500" />
        {listing.phone}
      </span>
      <span className="flex items-center">
        <Mail size={12} className="mr-1 text-orange-500" />
        {listing.email}
      </span>
      {/* 🌐 Website link with icon */}
      {listing.website && (
        <span className="flex items-center">
          <Globe size={12} className="mr-1 text-green-600" />
          <a
            href={listing.website.startsWith("http") ? listing.website : `https://${listing.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:underline hover:text-green-800 transition"
          >
            {listing.website.replace(/^https?:\/\//, "")}
          </a>
        </span>
      )}
    </div>
  </div>
</div>
  </div>
);
// END REFACTORED LISTING CARD


export default function ListingsPage() {
  const listings: Listing[] = importedListings;
  const districtCategories: DivisionCategory[] = importedDistricts;
  const businessCategories: BusinessCategory[] = importedBusinessTypes;

  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [openDivision, setOpenDivision] = useState<string>("Dhaka");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setCurrentPage(1);
    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const handleBusinessTypeSelect = (type: string) => {
    setSelectedBusinessType(type);
    setCurrentPage(1);
    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getBusinessTypeCount = (type: string) =>
    listings.filter((l) => l.businessType === type).length;
  const getDistrictCount = (district: string) =>
    listings.filter((l) => l.district === district).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        {/* Mobile Filter Button */}
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

        {/* Main Flex Layout */}
        <div className="flex flex-col lg:flex-row lg:gap-4">
          {/* Sidebar */}
          <div
            className={`min-h-screen bg-green-700 text-white p-0 lg:w-64 lg:block lg:sticky lg:top-0 lg:overflow-y-auto
            ${
              isMobileFilterOpen
                ? "fixed top-0 left-0 h-full w-64 z-50 transform translate-x-0 transition-transform duration-300 ease-in-out"
                : "fixed top-0 left-0 h-full w-64 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:z-auto"
            }`}
          >
            <div className="lg:hidden p-4 flex justify-end">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-white hover:text-gray-300 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <button
                onClick={() => {
                  handleDistrictSelect("");
                  handleBusinessTypeSelect("");
                }}
                className={`w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg ${
                  selectedDistrict === "" && selectedBusinessType === ""
                    ? "bg-green-800 border-2 border-white"
                    : "hover:bg-green-600 border-2 border-transparent"
                }`}
              >
                All Business
              </button>
            </div>

            {/* Business Types */}
            <div className="mb-6 border-b border-green-600 pb-4 px-4">
              <h3 className="text-lg font-bold mb-2 text-white/90">
                Business Type
              </h3>
              <div className="space-y-1">
                {businessCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleBusinessTypeSelect(category.name)}
                    className={`w-full flex justify-between items-center text-left px-2 py-2 transition-colors text-sm font-medium rounded-md ${
                      selectedBusinessType === category.name
                        ? "bg-green-800 text-white border-l-4 border-white"
                        : "hover:bg-green-600/80 border-l-4 border-transparent text-white/90"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-white/70 ml-2 text-xs flex-shrink-0">
                      ({getBusinessTypeCount(category.name)})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* District Filter */}
            <div className="mb-6 px-4">
              <h3 className="text-lg font-bold mb-2 text-white/90">
                Location (District)
              </h3>
              {districtCategories.map((division) => (
                <div key={division.division} className="mt-2">
                  <button
                    onClick={() =>
                      setOpenDivision(
                        openDivision === division.division
                          ? ""
                          : division.division
                      )
                    }
                    className="w-full flex justify-between items-center text-left px-2 py-2 cursor-pointer bg-green-600 hover:bg-green-500 transition-colors text-sm font-bold rounded-md"
                  >
                    <span>{division.division} Division</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        openDivision === division.division
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                      openDivision === division.division
                        ? "max-h-96"
                        : "max-h-0"
                    }`}
                  >
                    <div className="space-y-0.5 py-1">
                      {division.districts.map((district) => (
                        <button
                          key={district}
                          onClick={() => handleDistrictSelect(district)}
                          className={`w-full flex justify-between items-center text-left pl-4 py-1.5 transition-colors text-xs font-medium ${
                            selectedDistrict === district
                              ? "bg-green-800 text-white border-l-4 border-white"
                              : "hover:bg-green-700/80 border-l-4 border-transparent text-white/90"
                          }`}
                        >
                          <span>{district}</span>
                          <span className="text-white/70 ml-2 text-xs flex-shrink-0">
                            ({getDistrictCount(district)})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            ></div>
          )}

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

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 md:mb-0">
                Page: <span className="text-green-700">{currentPage}</span> of{" "}
                <span className="text-green-700">{totalPages}</span>
              </h2>
              <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mx-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search business name or description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
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
  );
}
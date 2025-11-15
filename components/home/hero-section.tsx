
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
// import {
//   categories as districtCategories,
//   businessCategories,
// } from "@/lib/data";

// const banners = [
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
// ];

// export default function HeroSection() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openDivision, setOpenDivision] = useState<string>("");
//   const [currentBanner, setCurrentBanner] = useState(0);

//   // Auto-slide banners
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
//   const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

//   return (
//     <section className="relative w-full container mx-auto bg-gray-50 flex">
//       {/* Mobile overlay */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`bg-[#2C8845] text-white w-64 fixed top-[115px] left-0 h-[calc(100vh-80px)] overflow-y-auto transition-transform duration-300 z-40 rounded-tr-xl
//         ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         {/* Hide scrollbar */}
//         <style jsx>{`
//           aside::-webkit-scrollbar {
//             display: none;
//           }
//           aside {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }
//         `}</style>

//         {/* Mobile Header */}
//         <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-green-600">
//           <h2 className="font-semibold text-lg">Filters</h2>
//           <button onClick={() => setMenuOpen(false)}>
//             <X className="w-6 h-6 text-white" />
//           </button>
//         </div>

//         <div className="p-4">
//            <div className="p-4">
//               <button
//                 // onClick={() => {
//                 //   handleDistrictSelect("");
//                 //   handleBusinessTypeSelect("");
//                 // }}
//                 className={`w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg bg-green-800 border-2 border-white `}
//               >
//                 All Business
//               </button>
//             </div>


//           {/* Business Type */}
//           <div className="mb-6 border-b border-green-600 pb-4">
//             <h3 className="text-lg font-semibold mb-2">Business Type</h3>
//             <div className="space-y-1">
//               {businessCategories.map((type) => (
//                 <button
//                   key={type.name}
//                   className="w-full text-left px-2 py-2 text-sm font-medium rounded-md hover:bg-green-600/80 transition"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {type.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Districts */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Location (District)</h3>
//             {districtCategories.map((division) => (
//               <div key={division.division} className="mt-1">
//                 <button
//                   onClick={() =>
//                     setOpenDivision(
//                       openDivision === division.division ? "" : division.division
//                     )
//                   }
//                   className="w-full flex justify-between items-center text-left px-2 py-2 text-sm font-bold bg-green-600 hover:bg-green-500 rounded-md transition"
//                 >
//                   {division.division} Division
//                   {openDivision === division.division ? (
//                     <ChevronUp size={14} />
//                   ) : (
//                     <ChevronDown size={14} />
//                   )}
//                 </button>

//                 {/* Smooth expanding dropdown */}
//                 <div
//                   className={`transition-[max-height] duration-500 ease-in-out overflow-hidden`}
//                   style={{
//                     maxHeight:
//                       openDivision === division.division
//                         ? `${division.districts.length * 32}px`
//                         : "0px",
//                   }}
//                 >
//                   <div className="py-1">
//                     {division.districts.map((district) => (
//                       <button
//                         key={district}
//                         className="w-full text-left pl-5 py-1.5 text-xs rounded-md hover:bg-green-700/70 transition"
//                         onClick={() => setMenuOpen(false)}
//                       >
//                         {district}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* Banner Section */}
//       <div className="flex-1 container mx-auto md:ml-48  relative h-[calc(70vh-80px)] mt-[60px] overflow-hidden">
//         <Image
//           key={banners[currentBanner]}
//           src={banners[currentBanner]}
//           alt="Business Banner"
//           fill
//           priority
//           className="w-full
//            transition-opacity duration-700"
//         />

//         {/* Controls */}
//         <button
//           onClick={prevBanner}
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
//         >
//           ❮
//         </button>
//         <button
//           onClick={nextBanner}
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
//         >
//           ❯
//         </button>

//         {/* Mobile menu button */}
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="absolute top-4 left-4 md:hidden bg-white/80 text-[#2C8845] p-2 rounded-md shadow-md"
//         >
//           <Menu className="w-6 h-6" />
//         </button>

//         {/* Banner Dots */}
//         <div className="absolute bottom-4 w-full flex justify-center gap-2">
//           {banners.map((_, i) => (
//             <span
//               key={i}
//               className={`w-3 h-3 rounded-full ${
//                 i === currentBanner ? "bg-green-700" : "bg-white/60"
//               } transition`}
//             ></span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import {
  categories as districtCategories,
  businessCategories,
} from "@/lib/data";

const banners = [
  "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
  "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
  "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDivision, setOpenDivision] = useState<string>("");
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-slide banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () =>
    setCurrentBanner((prev) => (prev + 1) % banners.length);

  const prevBanner = () =>
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section
      className="relative w-full container mx-auto bg-gray-50 flex"
      aria-labelledby="hero-heading"
    >
      {/* ==========================================
          🔵 Mobile Dark Overlay
      =========================================== */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      {/* ==========================================
          🟢 Sidebar / Filters (SEO Improved)
      =========================================== */}
      <aside
        className={`bg-[#2C8845] text-white w-64 fixed top-[115px] left-0 h-[calc(100vh-80px)] overflow-y-auto transition-transform duration-300 z-40 rounded-tr-xl
        ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-label="Business filters"
      >
        {/* Remove scrollbar visually */}
        <style jsx>{`
          aside::-webkit-scrollbar {
            display: none;
          }
          aside {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-green-600">
          <h2 className="font-semibold text-lg">Browse Filters</h2>
          <button onClick={() => setMenuOpen(false)} aria-label="Close filter menu">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4">
          {/* ALL BUSINESS BUTTON */}
          <div className="p-4">
            <button
              className="w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg bg-green-800 border-2 border-white"
              aria-label="View all business listings"
            >
              All Business
            </button>
          </div>

          {/* ============================
              Business Type Section
          ============================ */}
          <div className="mb-6 border-b border-green-600 pb-4">
            <h3 className="text-lg font-semibold mb-2">Business Type</h3>
            <nav aria-label="Business categories">
              <div className="space-y-1">
                {businessCategories.map((type) => (
                  <button
                    key={type.name}
                    className="w-full text-left px-2 py-2 text-sm font-medium rounded-md hover:bg-green-600/80 transition"
                    onClick={() => setMenuOpen(false)}
                    aria-label={`Filter by business type ${type.name}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* ============================
              District Section
          ============================ */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Location by District
            </h3>

            {districtCategories.map((division) => (
              <div key={division.division} className="mt-1">
                <button
                  onClick={() =>
                    setOpenDivision(
                      openDivision === division.division ? "" : division.division
                    )
                  }
                  aria-expanded={openDivision === division.division}
                  className="w-full flex justify-between items-center text-left px-2 py-2 text-sm font-bold bg-green-600 hover:bg-green-500 rounded-md transition"
                >
                  {division.division} Division
                  {openDivision === division.division ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>

                {/* Expandable Districts */}
                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight:
                      openDivision === division.division
                        ? `${division.districts.length * 32}px`
                        : "0px",
                  }}
                >
                  <nav className="py-1" aria-label={`${division.division} districts`}>
                    {division.districts.map((district) => (
                      <button
                        key={district}
                        className="w-full text-left pl-5 py-1.5 text-xs rounded-md hover:bg-green-700/70 transition"
                        onClick={() => setMenuOpen(false)}
                        aria-label={`Filter by district ${district}`}
                      >
                        {district}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ==========================================
          🖼 Main Banner
      =========================================== */}
      <div className="flex-1 container mx-auto md:ml-48 relative h-[calc(70vh-80px)] mt-[60px] overflow-hidden">
        
        {/* 🔥 Your H1 (Main SEO Title) */}
        <h1 id="hero-heading" className="sr-only">
          Explore Business Listings, District Categories & Suppliers in Bangladesh
        </h1>

        <Image
          key={banners[currentBanner]}
          src={banners[currentBanner]}
          alt="Business promotional banner"
          fill
          priority
          className="w-full transition-opacity duration-700 object-cover"
        />

        {/* Banner Controls */}
        <button
          onClick={prevBanner}
          aria-label="Previous banner"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
        >
          ❮
        </button>
        <button
          onClick={nextBanner}
          aria-label="Next banner"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
        >
          ❯
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open filter menu"
          className="absolute top-4 left-4 md:hidden bg-white/80 text-[#2C8845] p-2 rounded-md shadow-md"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Banner Dots */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {banners.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentBanner ? "bg-green-700" : "bg-white/60"
              } transition`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

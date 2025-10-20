import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// =========================================================
// 1. TYPE DEFINITIONS TO FIX 'IMPLICIT ANY' ERROR
// =========================================================

interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  href: string;
  subCategories: SubCategory[];
}

interface CategoryHoverItemProps {
  category: Category;
}
// =========================================================

// --- UPDATED DATA WITH SUB-MENUS ---
const categoriesWithSubMenus: Category[] = [
  // Added type annotation here too
  {
    name: "Computers & Accessories",
    href: "/category/computers-accessories",
    subCategories: [
      { name: "Laptops", href: "/category/laptops" },
      { name: "Desktops", href: "/category/desktops" },
      { name: "Monitors", href: "/category/monitors" },
      { name: "PC Components", href: "/category/pc-components" },
      { name: "Networking", href: "/category/networking" },
      { name: "Software", href: "/category/software" },
    ],
  },
  {
    name: "Cameras, Audio & Video",
    href: "/category/cameras-audio-video",
    subCategories: [
      { name: "DSLR Cameras", href: "/category/dslr" },
      { name: "Mirrorless", href: "/category/mirrorless" },
      { name: "Headphones & Earbuds", href: "/category/headphones" },
      { name: "Speakers", href: "/category/speakers" },
    ],
  },
  {
    name: "Mobiles & Tablets",
    href: "/category/mobiles-tabl",
    subCategories: [],
  },
  {
    name: "Movies, Music & Video Game",
    href: "/category/movies-music-video-game",
    subCategories: [],
  },
  { name: "TV & Audio", href: "/category/tv-audio", subCategories: [] },
  {
    name: "Watches & Eyewear",
    href: "/category/watches-eyewear",
    subCategories: [],
  },
  {
    name: "Car, Motorbike & Industrial",
    href: "/category/car-motorbike-industrial",
    subCategories: [],
  },
  { name: "Accessories", href: "/category/accessories", subCategories: [] },
];

const topLinks = [
  { name: "Value of the Day", href: "/deals/value-of-the-day", isYellow: true },
  { name: "Top 100 Offers", href: "/deals/top-100-offers" },
  { name: "New Arrivals", href: "/products/new-arrivals" },
];

export default function HeroSection() {
  return (
    <section className="relative h-[75vh] flex ">
      {/* Category Sidebar */}
      <div className="hidden lg:block w-2/12 bg-white shadow-xl border-r border-gray-200 text-gray-800 z-30 h-full">
        {/* Top Link Section */}
        <div className="border-b border-gray-200 ">
          {topLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 text-sm font-semibold transition ${
                link.isYellow
                  ? "bg-[#21336C]  hover:bg-[#2dbd53] text-white py-5"
                  : "hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Category List */}
        <nav className="py-2">
          {categoriesWithSubMenus.map((category) => (
            // The 'category' element here is now correctly typed from the array
            <CategoryHoverItem key={category.name} category={category} />
          ))}
        </nav>
      </div>

      {/* Hero Banner (The part with the background image) */}

      <img
        className="w-10/12"
        src={`https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg`}
      ></img>
    </section>
  );
}

// --- NEW COMPONENT FOR HOVER LOGIC ---

// 2. APPLYING THE TYPE TO THE PROPS HERE
function CategoryHoverItem({ category }: CategoryHoverItemProps) {
  // TypeScript now knows category has 'subCategories' and their structure
  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;

  return (
    // <div className="relative group">
    //   <Link
    //     href={category.href}
    //     className={`flex items-center justify-between px-4 py-2 text-sm transition ${
    //       hasSubCategories
    //         ? 'group-hover:bg-gray-500 group-hover:text-white'
    //         : 'hover:bg-gray-100'
    //     }`}
    //   >
    //     {category.name}
    //     {hasSubCategories && <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white" />}
    //   </Link>

    //   {/* Sub-Menu Dropdown */}
    //   {hasSubCategories && (
    //     <div
    //       className="hidden group-hover:block absolute top-0 left-full w-64 bg-white shadow-2xl border border-gray-200 z-50 min-h-full"
    //     >
    //       <h4 className="text-md font-bold px-4 pt-3 pb-2 border-b border-gray-100">{category.name}</h4>
    //       <nav className="p-2">
    //         {category.subCategories.map((subCat) => (
    //           <Link
    //             key={subCat.name}
    //             href={subCat.href}
    //             className="block px-3 py-2 text-sm text-gray-700 hover:bg-yellow-100 transition"
    //           >
    //             {subCat.name}
    //           </Link>
    //         ))}
    //       </nav>
    //     </div>
    //   )}
    // </div>

    <div className="border-b border-gray-200 relative group">
      <Link
        href={category.href}
        className={`flex items-center justify-between px-4 py-2 text-sm transition ${
          hasSubCategories
            ? "group-hover:bg-gray-500 group-hover:text-white"
            : "hover:bg-gray-100"
        }`}
      >
        {category.name}
        {hasSubCategories && (
          <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white" />
        )}
      </Link>

      {/* Sub-Menu Dropdown */}
      {hasSubCategories && (
        <div className="hidden group-hover:block absolute top-0 left-full w-64 bg-white shadow-2xl border border-gray-200 z-50 min-h-full">
          <h4 className="text-md font-bold px-4 pt-3 pb-2 border-b border-gray-100">
            {category.name}
          </h4>
          <nav className="p-2">
            {category.subCategories.map((subCat) => (
              <Link
                key={subCat.name}
                href={subCat.href}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-yellow-100 transition"
              >
                {subCat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { ChevronRightIcon } from "@heroicons/react/24/solid";

// // -------------------------------
// // Sidebar Data
// // -------------------------------

// const topLinks = [
//   { name: "Value of the Day", href: "/deals/value-of-the-day", isYellow: true },
//   { name: "Top 100 Offers", href: "/deals/top-100-offers" },
//   { name: "New Arrivals", href: "/products/new-arrivals" },
// ];

// const categoriesWithSubMenus = [
//   {
//     name: "Computers & Accessories",
//     href: "/category/computers-accessories",
//     subCategories: [
//       { name: "Laptops", href: "/category/laptops" },
//       { name: "Desktops", href: "/category/desktops" },
//       { name: "Monitors", href: "/category/monitors" },
//       { name: "PC Components", href: "/category/pc-components" },
//       { name: "Networking", href: "/category/networking" },
//       { name: "Software", href: "/category/software" },
//     ],
//   },
//   {
//     name: "Cameras, Audio & Video",
//     href: "/category/cameras-audio-video",
//     subCategories: [
//       { name: "DSLR Cameras", href: "/category/dslr" },
//       { name: "Mirrorless", href: "/category/mirrorless" },
//       { name: "Headphones & Earbuds", href: "/category/headphones" },
//       { name: "Speakers", href: "/category/speakers" },
//     ],
//   },
//   { name: "Mobiles & Tablets", href: "/category/mobiles-tabl", subCategories: [] },
//   { name: "Movies, Music & Video Game", href: "/category/movies-music-video-game", subCategories: [] },
//   { name: "TV & Audio", href: "/category/tv-audio", subCategories: [] },
//   { name: "Watches & Eyewear", href: "/category/watches-eyewear", subCategories: [] },
//   { name: "Car, Motorbike & Industrial", href: "/category/car-motorbike-industrial", subCategories: [] },
//   { name: "Accessories", href: "/category/accessories", subCategories: [] },
// ];

// // -------------------------------
// // Hero images for carousel
// // -------------------------------
// const heroImages = [
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//   "https://i.postimg.cc/Qx9r0QqT/banner.jpg",
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
// ];

// // -------------------------------
// // HeroSection Component
// // -------------------------------
// export default function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroImages.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative h-[75vh] flex">
//       {/* Category Sidebar */}
//       <div className="hidden lg:block w-2/12 bg-white shadow-xl border-r border-gray-200 text-gray-800 z-30 h-full">
//         <div className="border-b border-gray-200 ">
//           {topLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={`block px-4 py-2 text-sm font-semibold transition ${
//                 link.isYellow
//                   ? "bg-[#21336C] hover:bg-[#2dbd53] text-white py-5"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         <nav className="py-2">
//           {categoriesWithSubMenus.map((category) => (
//             <CategoryHoverItem key={category.name} category={category} />
//           ))}
//         </nav>
//       </div>

//       {/* Hero Carousel */}
//       <div className="relative flex-1 overflow-hidden">
//         {heroImages.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             className={`absolute top-0 left-0 w-full h-[75vh] object-cover transition-opacity duration-1000 ${
//               index === currentSlide ? "opacity-100" : "opacity-0"
//             }`}
//             alt={`Banner ${index + 1}`}
//           />
//         ))}

//         {/* Dots */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroImages.map((_, idx) => (
//             <span
//               key={idx}
//               className={`w-3 h-3 rounded-full cursor-pointer transition ${
//                 idx === currentSlide ? "bg-white" : "bg-gray-400"
//               }`}
//               onClick={() => setCurrentSlide(idx)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // -------------------------------
// // CategoryHoverItem Component
// // -------------------------------
// function CategoryHoverItem({ category }: { category: any }) {
//   const hasSubCategories = category.subCategories?.length > 0;

//   return (
//     <div className="border-b border-gray-200 relative group">
//       <Link
//         href={category.href}
//         className={`flex items-center justify-between px-4 py-2 text-sm transition ${
//           hasSubCategories
//             ? "group-hover:bg-gray-500 group-hover:text-white"
//             : "hover:bg-gray-100"
//         }`}
//       >
//         {category.name}
//         {hasSubCategories && (
//           <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white" />
//         )}
//       </Link>

//       {hasSubCategories && (
//         <div className="hidden group-hover:block absolute top-0 left-full w-64 bg-white shadow-2xl border border-gray-200 z-50 min-h-full">
//           <h4 className="text-md font-bold px-4 pt-3 pb-2 border-b border-gray-100">
//             {category.name}
//           </h4>
//           <nav className="p-2">
//             {category.subCategories.map((subCat: any) => (
//               <Link
//                 key={subCat.name}
//                 href={subCat.href}
//                 className="block px-3 py-2 text-sm text-gray-700 hover:bg-yellow-100 transition"
//               >
//                 {subCat.name}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }

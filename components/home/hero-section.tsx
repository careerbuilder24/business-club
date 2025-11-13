// "use client";
// import React, { useState, SVGProps, useEffect, useRef } from "react";

// import { Menu, X } from "lucide-react";

// // --- ChevronRightIcon ---
// const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// // --- Mock Data ---
// interface SubCategory {
//   name: string;
//   href: string;
// }
// interface Category {
//   name: string;
//   href: string;
//   subCategories: SubCategory[];
//   count: number;
// }
// const categoriesWithSubMenus: Category[] = [
//   {
//     name: "Agriculture",
//     href: "/category/agriculture",
//     count: 59,
//     subCategories: [
//       { name: "Crops", href: "/category/crops" },
//       { name: "Fertilizers", href: "/category/fertilizers" },
//     ],
//   },
//   {
//     name: "Apparel",
//     href: "/category/apparel",
//     count: 107,
//     subCategories: [
//       { name: "Men's Clothing", href: "/category/mens" },
//       { name: "Women's Clothing", href: "/category/womens" },
//       { name: "Shoes & Footwear", href: "/category/footwear" },
//     ],
//   },
//   {
//     name: "Animals",
//     href: "/category/animals",
//     count: 33,
//     subCategories: [
//       { name: "Livestock", href: "/category/livestock" },
//       { name: "Pet Supplies", href: "/category/pet-supplies" },
//     ],
//   },
//   {
//     name: "Mobiles & Tablets",
//     href: "/category/mobiles-tabl",
//     count: 12,
//     subCategories: [],
//   },
//   {
//     name: "Home & Garden",
//     href: "/category/home-garden",
//     count: 76,
//     subCategories: [],
//   },
//   {
//     name: "Sports & Outdoors",
//     href: "/category/sports",
//     count: 24,
//     subCategories: [],
//   },
//   {
//     name: "Car, Motorbike & Industrial",
//     href: "/category/car-motorbike-industrial",
//     count: 89,
//     subCategories: [],
//   },
// ];

// // --- Carousel Data ---
// const carouselSlides = [
//   {
//     id: 1,
//     src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//     alt: "Summer Deals Banner",
//   },
//   {
//     id: 2,
//     src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//     alt: "Electronics Event Banner",
//   },
//   {
//     id: 3,
//     src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//     alt: "New Apparel Banner",
//   },
// ];

// // --- Helper Components ---
// const CategorySearchBox = () => (
//   <div className="p-4">
//     <input
//       type="text"
//       placeholder="Search categories..."
//       className="w-full p-2 text-sm text-gray-800 rounded-md border border-transparent focus:border-blue-500 focus:ring-blue-500 transition duration-150 bg-white/90 focus:bg-white placeholder:text-gray-500"
//     />
//   </div>
// );

// function CategoryHoverItem({ category }: { category: Category }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const hasSubCategories =
//     category.subCategories && category.subCategories.length > 0;
//   const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (hasSubCategories) {
//       e.preventDefault();
//       setIsOpen((prev) => !prev);
//     }
//   };
//   return (
//     <div className="last:border-b-0 relative">
//       <a
//         href={category.href}
//         onClick={handleToggle}
//         className={`flex items-center justify-between px-4 py-2 transition text-white hover:bg-white/10 ${
//           isOpen ? "bg-white/20 font-semibold" : ""
//         }`}
//       >
//         <span>
//           <span className="truncate max-w-[calc(100%-4rem)] text-lg">
//             {category.name}
//           </span>
//         </span>
//         {hasSubCategories && (
//           <ChevronRightIcon
//             className={`h-5 w-5 transition-transform duration-300 ${
//               isOpen ? "rotate-90" : ""
//             }`}
//           />
//         )}
//       </a>
//       {hasSubCategories && (
//         <div
//           ref={contentRef}
//           style={{
//             maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
//             transform: `scaleX(${isOpen ? 1 : 0})`,
//           }}
//           className={`overflow-hidden bg-black/20 border-t border-white/10 transition-[max-height,transform] duration-300 ease-out origin-left`}
//         >
//           <nav className="flex flex-col space-y-1 p-2">
//             {category.subCategories.map((subCat) => (
//               <a
//                 key={subCat.name}
//                 href={subCat.href}
//                 className="block px-3 py-1 text-base text-white/80 hover:bg-white/10 rounded transition"
//               >
//                 - {subCat.name}
//               </a>
//             ))}
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }

// const BannerCarousel = ({ slides }: { slides: typeof carouselSlides }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   useEffect(() => {
//     const timer = setInterval(
//       () => setCurrentSlide((prev) => (prev + 1) % slides.length),
//       5000
//     );
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <div className="relative w-full h-full overflow-hidden  ">
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute   inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
//             index === currentSlide ? "opacity-100 z-30" : "opacity-0 z-20"
//           }`}
//         >
//           <img
//             src={slide.src}
//             alt={slide.alt}
//             className="w-full h-full object-cover object-center m-5 "
//           />
//         </div>
//       ))}

//       {/* Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-2 w-2 rounded-full transition-colors ${
//               index === currentSlide ? "bg-white" : "bg-gray-400 bg-opacity-70"
//             }`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// // --- Main Component ---
// export default function App() {
//   const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

//   return (
//     <div className="bg-gray-50 w-full font-inter">
//       {/* Mobile Top Bar */}
//       <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
//         <div className="flex justify-between items-center p-4">
//           <div className="flex items-center gap-2 text-[#2C8845]">
//             <button onClick={() => setIsCategorySidebarOpen(true)}>
//               <Menu size={24} />
//             </button>
//             <span className="text-lg font-semibold text-gray-800">
//               Categories
//             </span>
//           </div>
//           {/* <Link href="/" className="flex items-center">
//             <Image
//               src="https://i.postimg.cc/pXxRpm8f/3.png"
//               alt="Logo"
//               width={100}
//               height={100}
//               className="object-contain"
//             />
//           </Link> */}
//         </div>
//       </div>

//       {/* Hero Section */}
//       {/* Hero Section */}
//       <section className="flex flex-col lg:flex-row w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
//         {/* Left Sidebar */}
//         <div
//           className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#2C8845] text-white shadow-lg
//           lg:relative lg:w-[13%] lg:flex-shrink-0 lg:z-30 lg:shadow-none
//           transform transition-transform duration-300 ease-in-out
//           ${isCategorySidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//           lg:translate-x-0`}
//         >
//           {/* Mobile Close Header */}
//           <div className="lg:hidden flex justify-between items-center p-4 bg-[#308C48] border-b border-white/10">
//             <h2 className="text-lg font-semibold">All Categories</h2>
//             <button onClick={() => setIsCategorySidebarOpen(false)}>
//               <X size={24} />
//             </button>
//           </div>

//           <CategorySearchBox />

//           <nav className="py-2 overflow-hidden flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
//             {categoriesWithSubMenus.map((category) => (
//               <CategoryHoverItem key={category.name} category={category} />
//             ))}
//           </nav>
//         </div>

//         {/* Right Banner Section */}
//         <div className="flex-grow w-full relative ">
//           <BannerCarousel slides={carouselSlides} />
//         </div>

//         {/* Mobile Overlay */}
//         {isCategorySidebarOpen && (
//           <div
//             onClick={() => setIsCategorySidebarOpen(false)}
//             className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           ></div>
//         )}
//       </section>
//     </div>
//   );
// }
// "use client";
// import React, { useState } from "react";
// import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

// // --- Data ---
// const businessTypes = [
//   "Manufacturer",
//   "Supplier",
//   "Buying House",
//   "Dealer",
//   "Trader",
//   "Importer",
//   "Exporter",
// ];

// const divisions = [
//   {
//     name: "Dhaka Division",
//     districts: [
//       "Dhaka",
//       "Faridpur",
//       "Gazipur",
//       "Gopalganj",
//       "Kishoreganj",
//       "Madaripur",
//       "Manikganj",
//       "Munshiganj",
//       "Narayanganj",
//       "Narsingdi",
//       "Rajbari",
//       "Shariatpur",
//       "Tangail",
//     ],
//   },
//   {
//     name: "Chattogram Division",
//     districts: ["Chattogram", "Cox’s Bazar", "Rangamati", "Khagrachari"],
//   },
//   { name: "Rajshahi Division", districts: ["Rajshahi", "Pabna"] },
//   { name: "Khulna Division", districts: ["Khulna", "Jessore"] },
//   { name: "Barishal Division", districts: ["Barishal", "Patuakhali"] },
//   { name: "Sylhet Division", districts: ["Sylhet", "Moulvibazar"] },
//   { name: "Rangpur Division", districts: ["Rangpur", "Dinajpur"] },
//   { name: "Mymensingh Division", districts: ["Mymensingh", "Jamalpur"] },
// ];

// const carouselSlides = [
//   {
//     id: 1,
//     src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//     alt: "Summer Deals Banner",
//   },
//   {
//     id: 2,
//     src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//     alt: "Electronics Event Banner",
//   },
//   {
//     id: 3,
//     src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//     alt: "New Apparel Banner",
//   },
// ];

// // --- Banner Carousel ---
// function BannerCarousel({ slides }: { slides: typeof carouselSlides }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   React.useEffect(() => {
//     const timer = setInterval(
//       () => setCurrentSlide((prev) => (prev + 1) % slides.length),
//       4000
//     );
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <img
//             src={slide.src}
//             alt={slide.alt}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       ))}
//       {/* Dots */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-2 w-2 rounded-full ${
//               index === currentSlide ? "bg-white" : "bg-gray-400/60"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- Sidebar ---
// function BusinessSidebar({
//   closeSidebar,
//   isMobile,
// }: {
//   closeSidebar?: () => void;
//   isMobile?: boolean;
// }) {
//   const [openDivision, setOpenDivision] = useState<string | null>("Dhaka Division");
//   return (
//     <aside className="bg-[#2C8845] text-white w-72 lg:w-72 h-full flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-white/20 flex justify-between items-center">
//         <h2 className="text-xl font-semibold">All Business</h2>
//         {isMobile && (
//           <button onClick={closeSidebar}>
//             <X size={22} />
//           </button>
//         )}
//       </div>

//       {/* Scrollable Section */}
//       <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent p-4">
//         {/* Business Type */}
//         <div className="mb-5">
//           <h3 className="text-lg font-bold mb-2">Business Type</h3>
//           <ul className="space-y-1">
//             {businessTypes.map((type) => (
//               <li
//                 key={type}
//                 className="flex justify-between items-center text-sm hover:text-[#39f06a] cursor-pointer"
//               >
//                 <span>{type}</span>
//                 <span>(8)</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Location (District) */}
//         <div>
//           <h3 className="text-lg font-bold mb-2">Location (District)</h3>
//           <div className="space-y-2">
//             {divisions.map((division) => (
//               <div key={division.name}>
//                 <button
//                   onClick={() =>
//                     setOpenDivision((prev) =>
//                       prev === division.name ? null : division.name
//                     )
//                   }
//                   className="flex justify-between items-center w-full bg-[#2C8845] text-sm font-semibold py-1 px-2 rounded hover:bg-[#39a657] transition"
//                 >
//                   <span>{division.name}</span>
//                   {openDivision === division.name ? (
//                     <ChevronDown size={16} />
//                   ) : (
//                     <ChevronRight size={16} />
//                   )}
//                 </button>

//                 {openDivision === division.name && (
//                   <ul className="ml-3 mt-1 space-y-1">
//                     {division.districts.map((district) => (
//                       <li
//                         key={district}
//                         className="flex justify-between text-sm hover:text-[#39f06a] cursor-pointer"
//                       >
//                         <span>{district}</span>
//                         <span>(8)</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// // --- Main Hero Section ---
// export default function HeroSection() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="bg-gray-50 w-full font-inter">
//       {/* Mobile Top Bar */}
//       <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
//         <div className="flex justify-between items-center p-4 text-[#2C8845]">
//           <button onClick={() => setIsSidebarOpen(true)}>
//             <Menu size={26} />
//           </button>
//           <h1 className="font-semibold text-lg">All Business</h1>
//         </div>
//       </div>

//       {/* Layout */}
//       <section className="flex flex-col lg:flex-row w-full h-[55vh] lg:h-[70vh] overflow-hidden">
//         {/* Sidebar (Desktop + Mobile) */}
//         <div
//           className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//           lg:relative lg:flex-shrink-0`}
//         >
//           <BusinessSidebar
//             closeSidebar={() => setIsSidebarOpen(false)}
//             isMobile={true}
//           />
//         </div>

//         {/* Overlay for mobile */}
//         {isSidebarOpen && (
//           <div
//             onClick={() => setIsSidebarOpen(false)}
//             className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           />
//         )}

//         {/* Banner Section */}
//         <div className="flex-grow w-full relative">
//           <BannerCarousel slides={carouselSlides} />
//         </div>
//       </section>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

// const businessTypes = [
//   "Manufacturer",
//   "Supplier",
//   "Wholesaler",
//   "Distributor",
//   "Retailer",
//   "Service Provider",
// ];

// const divisions = [
//   { name: "Dhaka", districts: ["Gazipur", "Narayanganj", "Tangail", "Manikganj"] },
//   { name: "Chittagong", districts: ["Comilla", "Feni", "Noakhali", "Brahmanbaria"] },
//   { name: "Rajshahi", districts: ["Bogra", "Pabna", "Sirajganj"] },
//   { name: "Khulna", districts: ["Jessore", "Satkhira", "Kushtia"] },
//   { name: "Sylhet", districts: ["Habiganj", "Moulvibazar", "Sunamganj"] },
//   { name: "Barisal", districts: ["Patuakhali", "Bhola", "Barguna"] },
//   { name: "Rangpur", districts: ["Dinajpur", "Gaibandha", "Kurigram"] },
// ];

// // Direct image URLs
// const banners = [
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
// ];

// export default function HeroSection() {
//   const [openDivision, setOpenDivision] = useState<string | null>(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [currentBanner, setCurrentBanner] = useState(0);

//   // Auto-slide every 4s
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   const toggleDivision = (name: string) => {
//     setOpenDivision(openDivision === name ? null : name);
//   };

//   const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
//   const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

//   return (
//     <section className="flex w-full bg-gray-50 relative">
//       {/* Sidebar */}
//       <aside
//         className={`bg-[#2C8845] text-white w-64 md:fixed md:top-[80px] md:left-0 md:h-[calc(100vh-80px)] h-screen overflow-y-auto transition-all duration-300 z-40 ${
//           menuOpen ? "left-0" : "-left-72 md:left-0"
//         }`}
//       >
//         {/* Mobile header */}
//         <div className="flex justify-between items-center px-4 py-4 border-b border-green-600 md:hidden">
//           <h2 className="text-lg font-semibold">Menu</h2>
//           <button onClick={() => setMenuOpen(false)}>
//             <X className="w-6 h-6 text-white" />
//           </button>
//         </div>

//         <div className="p-4">
//           <button className="w-full bg-white text-[#2C8845] font-semibold py-2 rounded-md mb-4 hover:bg-green-100 transition">
//             All Business
//           </button>

//           {/* Business Type */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Business Type</h3>
//             <ul className="space-y-2">
//               {businessTypes.map((type, i) => (
//                 <li
//                   key={i}
//                   className="cursor-pointer hover:bg-green-700 rounded-md px-3 py-2 transition"
//                 >
//                   {type}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Location */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Location (District)</h3>
//             <ul className="space-y-2">
//               {divisions.map((div, i) => (
//                 <li key={i}>
//                   <button
//                     onClick={() => toggleDivision(div.name)}
//                     className="flex justify-between items-center w-full px-3 py-2 rounded-md hover:bg-green-700 transition"
//                   >
//                     {div.name}
//                     {openDivision === div.name ? (
//                       <ChevronUp className="w-4 h-4" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4" />
//                     )}
//                   </button>
//                   {openDivision === div.name && (
//                     <ul className="ml-4 mt-2 space-y-1">
//                       {div.districts.map((dist, j) => (
//                         <li
//                           key={j}
//                           className="text-sm cursor-pointer hover:bg-green-700 px-3 py-1 rounded-md transition"
//                         >
//                           {dist}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </aside>

//       {/* Banner Section */}
//       <div className="flex-1 md:ml-72  relative h-[calc(70vh-80px)] mt-9 mr-5">
//         {/* Banner image */}
   
//          <Image
//           key={banners[currentBanner]}
//           src={banners[currentBanner]}
//           alt="Banner"
//           fill
//           priority
//           className=" transition-opacity duration-700"
//         />
     

//         {/* Controls */}
//         <button
//           onClick={prevBanner}
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-[#2C8845] p-2 rounded-full hover:bg-white"
//         >
//           ❮
//         </button>
//         <button
//           onClick={nextBanner}
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-[#2C8845] p-2 rounded-full hover:bg-white"
//         >
//           ❯
//         </button>

//         {/* Mobile menu toggle */}
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="absolute top-4 left-4 md:hidden bg-white/80 text-[#2C8845] p-2 rounded-md"
//         >
//           <Menu className="w-6 h-6" />
//         </button>
//       </div>
//     </section>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

// const businessTypes = [
//   "Manufacturer",
//   "Supplier",
//   "Wholesaler",
//   "Distributor",
//   "Retailer",
//   "Service Provider",
// ];

// const divisions = [
//   { name: "Dhaka", districts: ["Gazipur", "Narayanganj", "Tangail", "Manikganj"] },
//   { name: "Chittagong", districts: ["Comilla", "Feni", "Noakhali", "Brahmanbaria"] },
//   { name: "Rajshahi", districts: ["Bogra", "Pabna", "Sirajganj"] },
//   { name: "Khulna", districts: ["Jessore", "Satkhira", "Kushtia"] },
//   { name: "Sylhet", districts: ["Habiganj", "Moulvibazar", "Sunamganj"] },
//   { name: "Barisal", districts: ["Patuakhali", "Bhola", "Barguna"] },
//   { name: "Rangpur", districts: ["Dinajpur", "Gaibandha", "Kurigram"] },
// ];

// const banners = [
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
//   "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
// ];

// export default function HeroSection() {
//   const [openDivision, setOpenDivision] = useState<string | null>(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [currentBanner, setCurrentBanner] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   const toggleDivision = (name: string) => {
//     setOpenDivision(openDivision === name ? null : name);
//   };

//   const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
//   const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

//   return (
//     <section className="flex w-full bg-gray-50 relative">
//       {/* Mobile Backdrop */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30 md:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`bg-[#2C8845] text-white w-64 md:fixed md:top-[80px] md:left-0 md:h-[calc(100vh-80px)] h-screen overflow-y-auto transition-all duration-300 z-40
//           ${menuOpen ? "left-0" : "-left-72 md:left-0"}
//         `}
//       >
//         {/* Mobile header */}
//         <div className="flex justify-between items-center px-4 py-4 border-b border-green-600 md:hidden">
//           <h2 className="text-lg font-semibold">Menu</h2>
//           <button onClick={() => setMenuOpen(false)}>
//             <X className="w-6 h-6 text-white" />
//           </button>
//         </div>

//         <div className="p-4">
//           <button className="w-full bg-white text-[#2C8845] font-semibold py-2 rounded-md mb-4 hover:bg-green-100 transition">
//             All Business
//           </button>

//           {/* Business Type */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Business Type</h3>
//             <ul className="space-y-2">
//               {businessTypes.map((type, i) => (
//                 <li
//                   key={i}
//                   className="cursor-pointer hover:bg-green-700 rounded-md px-3 py-2 transition"
//                 >
//                   {type}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Location */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Location (District)</h3>
//             <ul className="space-y-2">
//               {divisions.map((div, i) => (
//                 <li key={i}>
//                   <button
//                     onClick={() => toggleDivision(div.name)}
//                     className="flex justify-between items-center w-full px-3 py-2 rounded-md hover:bg-green-700 transition"
//                   >
//                     {div.name}
//                     {openDivision === div.name ? (
//                       <ChevronUp className="w-4 h-4" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4" />
//                     )}
//                   </button>
//                   {openDivision === div.name && (
//                     <ul className="ml-4 mt-2 space-y-1">
//                       {div.districts.map((dist, j) => (
//                         <li
//                           key={j}
//                           className="text-sm cursor-pointer hover:bg-green-700 px-3 py-1 rounded-md transition"
//                         >
//                           {dist}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </aside>

//       {/* Banner Section */}
//       <div className="flex-1 md:ml-72 relative h-[calc(70vh-80px)] mt-9 mr-5">
//         <Image
//           key={banners[currentBanner]}
//           src={banners[currentBanner]}
//           alt="Banner"
//           fill
//           priority
//           className="transition-opacity duration-700 object-cover"
//         />

//         {/* Controls */}
//         <button
//           onClick={prevBanner}
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-[#2C8845] p-2 rounded-full hover:bg-white"
//         >
//           ❮
//         </button>
//         <button
//           onClick={nextBanner}
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-[#2C8845] p-2 rounded-full hover:bg-white"
//         >
//           ❯
//         </button>

//         {/* Mobile menu toggle */}
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="absolute top-4 left-4 md:hidden bg-white/80 text-[#2C8845] p-2 rounded-md"
//         >
//           <Menu className="w-6 h-6" />
//         </button>
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

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="relative w-full bg-gray-50 flex">
      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#2C8845] text-white w-64 fixed top-[115px] left-0 h-[calc(100vh-80px)] overflow-y-auto transition-transform duration-300 z-40 rounded-tr-xl
        ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Hide scrollbar */}
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
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4">
           <div className="p-4">
              <button
                // onClick={() => {
                //   handleDistrictSelect("");
                //   handleBusinessTypeSelect("");
                // }}
                className={`w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg bg-green-800 border-2 border-white `}
              >
                All Business
              </button>
            </div>


          {/* Business Type */}
          <div className="mb-6 border-b border-green-600 pb-4">
            <h3 className="text-lg font-semibold mb-2">Business Type</h3>
            <div className="space-y-1">
              {businessCategories.map((type) => (
                <button
                  key={type.name}
                  className="w-full text-left px-2 py-2 text-sm font-medium rounded-md hover:bg-green-600/80 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Districts */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Location (District)</h3>
            {districtCategories.map((division) => (
              <div key={division.division} className="mt-1">
                <button
                  onClick={() =>
                    setOpenDivision(
                      openDivision === division.division ? "" : division.division
                    )
                  }
                  className="w-full flex justify-between items-center text-left px-2 py-2 text-sm font-bold bg-green-600 hover:bg-green-500 rounded-md transition"
                >
                  {division.division} Division
                  {openDivision === division.division ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>

                {/* Smooth expanding dropdown */}
                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight:
                      openDivision === division.division
                        ? `${division.districts.length * 32}px`
                        : "0px",
                  }}
                >
                  <div className="py-1">
                    {division.districts.map((district) => (
                      <button
                        key={district}
                        className="w-full text-left pl-5 py-1.5 text-xs rounded-md hover:bg-green-700/70 transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Banner Section */}
      <div className="flex-1 container mx-auto ml-80  relative h-[calc(70vh-80px)] mt-[60px] overflow-hidden">
        <Image
          key={banners[currentBanner]}
          src={banners[currentBanner]}
          alt="Business Banner"
          fill
          priority
          className="w-6/12
           transition-opacity duration-700"
        />

        {/* Controls */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
        >
          ❮
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-[#2C8845] p-3 rounded-full hover:bg-white shadow-md"
        >
          ❯
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(true)}
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

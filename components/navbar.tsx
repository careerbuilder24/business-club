
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   // const [languageOpen, setLanguageOpen] = useState(false);
//   // const [currencyOpen, setCurrencyOpen] = useState(false);

//   const navItems = [
//     { label: "Home", href: "/" },
//     { label: "Add Listing", href: "/add-listing" },
//     { label: "All Listings", href: "/listings" },
//     { label: "Blog", href: "/blog" },
//     { label: "About", href: "/about" },
//     { label: "Contact", href: "/contact" },
//   ];

//   return (
//     <header className="w-full shadow-sm">
//       {/* Top Bar */}
//       <div className="bg-[#ffff] text-white">
//         <div className="w-full mx-auto flex items-center justify-between px-4 py-2">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src="https://i.postimg.cc/pXxRpm8f/3.png"
//               alt="Sources Logo"
//               width={200}
//               height={200}
//               className="object-contain"
//             />
//           </Link>

//           {/* Search Bar */}
//           <div className="flex  w-8/12 ml-6">
//             <select className="bg-[#2B8843] text-white px-3 py-2 rounded-l-md border-none outline-none">
//               <option>Business</option>
//               <option>Supplier</option>
//               <option>Service</option>
//             </select>
//             <input
//               type="text"
//               placeholder="I'm looking for..."
//               className="flex-grow px-4 py-2 outline-none  text-gray-700 border-2 border-white"
//             />
//             <button className="bg-[#2B8843] text-white px-5 rounded-r-md hover:bg-[#31c456] flex items-center gap-1">
//               <Search size={16} />
//               Search
//             </button>
//           </div>

//           {/* Right Icons */}
//           <div className="flex items-center gap-5 ml-4 text-[#2B8843]">
//             <div className="relative flex items-center gap-1 cursor-pointer">
//               <ShoppingBag size={22} />
//               <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 0
//               </span>
//             </div>

//             <Link
//               href="/login"
//               className="flex items-center gap-1 hover:text-yellow-300 transition"
//             >
//               <User size={22} />
//               <span className="text-sm">Login / Register</span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <nav className="bg-[#308C48] border-t border-gray-200 text-white">
//         <div className="w-full mx-auto flex items-center justify-center px-4 py-6 shadow-2xl ">
//           {/* Menu Items */}
//           <div className="flex items-center gap-6 text-sm">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="hover:text-[#003D5C] font-medium transition-colors"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>

//           {/* Right Actions */}
//           {/* <div className="flex items-center gap-5 text-sm text-white ">
//             <Link href="/seller" className="hover:text-[#003D5C]">
//               Become a Business Lister
//             </Link>
//             <span>|</span>
//             <Link href="/post-request" className="hover:text-[#003D5C]">
//               Post Buy Request
//             </Link>
//             <span>|</span> */}

//           {/* <div
//               className="relative cursor-pointer"
//               onClick={() => setLanguageOpen(!languageOpen)}
//             >
//               <div className="flex items-center gap-1 hover:text-[#003D5C]">
//                 English <ChevronDown size={14} />
//               </div>
//               {languageOpen && (
//                 <div className="absolute bg-white border rounded-md shadow-md mt-1 w-28 text-gray-700">
//                   <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
//                     English
//                   </div>
//                   <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
//                     বাংলা
//                   </div>
//                 </div>
//               )}
//             </div> */}

//           {/*        
//             <div
//               className="relative cursor-pointer"
//               onClick={() => setCurrencyOpen(!currencyOpen)}
//             >
//               <div className="flex items-center gap-1 hover:text-[#003D5C]">
//                 BDT <ChevronDown size={14} />
//               </div>
//               {currencyOpen && (
//                 <div className="absolute bg-white border rounded-md shadow-md mt-1 w-20 text-gray-700">
//                   <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
//                     BDT
//                   </div>
//                   <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
//                     USD
//                   </div>
//                 </div>
//               )}
//             </div> */}
//           {/* </div> */}
//         </div>
//       </nav>
//     </header>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Add Listing", href: "/add-listing" },
    { label: "All Listings", href: "/listings" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // 1. STICKY HEADER
    <header className="w-full shadow-lg sticky top-0 z-50 bg-white">
      {/* ======================================================================
        TOP BAR: Logo, Nav Links (new), Icons
        ======================================================================
      */}
      <div className="bg-[#ffff] text-white">
        <div className="w-full mx-auto flex items-center justify-between px-4 py-3 lg:py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://i.postimg.cc/pXxRpm8f/3.png"
              alt="Sources Logo"
              width={160}
              height={160}
              className="object-contain lg:w-[200px]"
            />
          </Link>

          {/*  NAV LINKS MOVED HERE (Hidden on mobile, flex on LG screens)  */}
          {/* This takes the space previously occupied by the Search Bar */}
          <div className="hidden lg:flex items-center gap-6 text-sm flex-grow justify-center ml-6 text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#2B8843] font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons (Optimized for both mobile and desktop) */}
          <div className="flex items-center gap-5 ml-4 text-[#2B8843]">
            {/* Shopping Bag */}
            <div className="relative flex items-center gap-1 cursor-pointer">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>

            {/* Login/Register (Visible on LG screens only) */}
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <User size={22} />
              <span className="text-sm">Login / Register</span>
            </Link>

            {/* Hamburger Menu Icon (Visible on small screens) */}
            <button
              onClick={toggleMenu}
              className="text-[#2B8843] lg:hidden p-1 rounded-md"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================================
        BOTTOM NAVIGATION: Search Bar (new)
        ======================================================================
      */}
      <nav className="hidden lg:block bg-[#308C48] border-t border-gray-200 text-white">
        <div className="w-full mx-auto flex items-center justify-center px-4 py-3">
          {/* 💥 SEARCH BAR MOVED HERE (Hidden on mobile, flex on LG screens) 💥 */}
          {/* This is centered in the space previously occupied by the Nav Links */}
          <div className="flex w-full max-w-4xl">
            <select className="bg-[#ffffff] text-[#308C48] px-3 py-2 cursor-pointer rounded-l-md border-none outline-none">
              <option>Business</option>
              <option>Supplier</option>
              <option>Service</option>
            </select>
            <input
              type="text"
              placeholder="I'm looking for..."
              className="flex-grow px-4 py-2 outline-none text-white border-2 border-white"
            />
            <button className="bg-[#ffffff] text-[#308C48] px-5 rounded-r-md cursor-pointer flex items-center gap-1">
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </nav>

      {/* ======================================================================
        MOBILE OFF-CANVAS MENU (No change needed here for the swap)
        ======================================================================
      */}
      <div
        className={`fixed inset-0 z-40 bg-white lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Content Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-[#308C48] text-white">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleMenu} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        {/* Mobile Search Bar (Only the input and button, simplified) */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search anything..."
              className="flex-grow px-3 py-2 outline-none text-gray-700 border border-gray-300 rounded-l-md"
            />
            <button className="bg-[#2B8843] text-white px-3 rounded-r-md">
              <Search size={18} />
            </button>
          </div>
        </div>
        
        {/* Mobile Nav Links */}
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/login"
            onClick={toggleMenu}
            className="flex items-center gap-2 p-3 text-[#2B8843] border-b border-gray-100 hover:bg-gray-50"
          >
            <User size={20} />
            <span className="text-base font-medium">Login / Register</span>
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggleMenu}
              className="p-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
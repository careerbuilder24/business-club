"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    // { label: "Add Listing", href: "/add-listing" },
    // { label: "Pricing", href: "/PricingTablePage" },
    { label: "All Listings", href: "/listings" },
    // { label: "Blog", href: "/blog" },
    // { label: "About", href: "/about" },
    // { label: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // 1. STICKY HEADER
    <header className="w-full shadow-lg sticky top-0 z-50 bg-white">
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

          <div className="hidden lg:flex items-center gap-6 text-sm flex-grow justify-center ml-6 text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#2C8845] hover:text-yellow-400 transition font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons (Optimized for both mobile and desktop) */}
          <div className="flex items-center gap-5 ml-4 text-[#2C8845]">
       

            {/* ➕ Add Your Business link */}
            <Link
              href="/add-listing"
              className="hidden lg:flex items-center gap-1 font-medium text-[#2C8845] hover:text-yellow-400 transition"
            >
              Add Your Business
            </Link>

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
              className="text-[#2C8845] lg:hidden p-1 rounded-md"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden lg:block bg-[#2C8845] border-t border-gray-200 text-white">
        <div className="w-3/12 mx-auto flex items-center justify-center px-4 py-3">
          <div className="flex w-full max-w-4xl">
            <select className="bg-[#ffffff] text-[#2C8845] px-3 py-2 cursor-pointer rounded-l-md border-none outline-none">
              <option>Business</option>
              <option>Supplier</option>
              <option>Service</option>
            </select>
            <input
              type="text"
              placeholder="I'm looking for..."
              className="flex-grow px-4 py-2 outline-none text-black border-2  bg-white"
            />
            <button className="bg-[#ffffff] text-[#2C8845] px-5 rounded-r-md cursor-pointer flex items-center gap-1">
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-white lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Content Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-[#2C8845] text-white">
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
            <button className="bg-[#2C8845] text-white px-3 rounded-r-md">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/login"
            onClick={toggleMenu}
            className="flex items-center gap-2 p-3 text-[#2C8845] border-b border-gray-100 hover:bg-gray-50"
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

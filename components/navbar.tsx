
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, Heart, Menu, X, LayoutDashboard } from "lucide-react";
import { useWatchList } from "../app/context/WatchListContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { watchList } = useWatchList();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "All Listings", href: "/listings" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="bg-white">
        {/* --- Top Navbar --- */}
        <div className="w-full mx-auto flex items-center justify-between px-4 py-3 lg:py-2 transition-all duration-300">
          {/* --- Left: Logo --- */}
          <Link href="/" className="flex items-center h-[50px] lg:h-[60px] shrink-0">
            <Image
              src="https://i.postimg.cc/pXxRpm8f/3.png"
              alt="Sources Logo"
              width={160}
              height={60}
              priority
              className="object-contain w-[160px] lg:w-[200px] h-auto"
            />
          </Link>

          {/* --- Center: Nav Links --- */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-gray-700 justify-center flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#2C8845] hover:text-yellow-400 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* --- Right: Action Buttons --- */}
          <div className="flex items-center gap-5 text-[#2C8845] ml-4">
            {/* Watch List */}
            <div
              className="relative flex items-center cursor-pointer"
              onClick={toggleSidebar}
            >
              <Heart size={22} color="#2C8845" />
              {watchList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {watchList.length}
                </span>
              )}
            </div>

            {/* Add Your Business */}
            <Link
              href="/add-listing"
              className="hidden lg:flex items-center gap-1 font-medium text-[#2C8845] hover:text-yellow-400"
            >
              Add Your Business
            </Link>

            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="px-3 py-2 text-black font-semibold flex items-center gap-2 hover:bg-gray-100 rounded-md transition"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            {/* Login */}
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-1 hover:text-yellow-300 transition-colors"
            >
              <User size={22} />
              <span className="text-sm">Login / Register</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="text-[#2C8845] lg:hidden p-1 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- Search Bar (Desktop) --- */}
        <nav className="hidden lg:block bg-[#2C8845] text-white transition-all duration-300">
          <div className="max-w-[1000px] mx-auto flex items-center justify-center px-4 py-3">
            <div className="flex w-full">
              <select className="bg-white text-[#2C8845] px-3 py-2 cursor-pointer rounded-l-md outline-none border-none">
                <option>Business</option>
                <option>Supplier</option>
                <option>Service</option>
              </select>
              <input
                type="text"
                placeholder="I'm looking for..."
                className="flex-grow px-4 py-2 outline-none text-black border-y border-gray-300 bg-white"
              />
              <button className="bg-white text-[#2C8845] px-5 rounded-r-md flex items-center gap-1 font-medium">
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* --- Mobile Menu --- */}
      <div
        className={`fixed inset-0 z-40 bg-white lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-[#2C8845] text-white">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex">
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

      {/* --- Watchlist Sidebar --- */}
      <div
        className={`fixed top-[80px] right-0 h-[calc(100%-60px)] w-80 bg-[#2C8845] shadow-2xl z-40 
          transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
          ${showSidebar ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <div className="p-4 overflow-y-auto h-full text-white">
          <div className="flex justify-between items-center mb-4 border-b border-white/30 pb-2">
            <h3 className="font-bold text-lg">Your Favorites</h3>
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-yellow-300"
            >
              <X size={22} />
            </button>
          </div>

          {watchList.length === 0 ? (
            <p className="text-white/80">No items added yet.</p>
          ) : (
            <ul className="space-y-4">
              {watchList.map((item) => {
                const rating = Math.floor(Math.random() * 3) + 3;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 border-b border-white/20 pb-3"
                  >
                    <img
                      src={item.logo || "/placeholder.svg"}
                      className="w-10 h-10 rounded bg-white p-1"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <span className="text-xs text-white/80 block">
                        {item.category}
                      </span>
                      <div className="flex mt-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

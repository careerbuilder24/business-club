"use client";

import React, { useState, useRef, SVGProps } from "react";
import { X, Menu } from "lucide-react";

// --- Chevron Icon ---
const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Category Interfaces ---
interface SubCategory {
  name: string;
  href: string;
}
interface Category {
  name: string;
  href: string;
  subCategories: SubCategory[];
  count: number;
}

// --- Example Data (You can replace with API or JSON later) ---
const categoriesWithSubMenus: Category[] = [
  {
    name: "Agriculture",
    href: "/category/agriculture",
    count: 59,
    subCategories: [
      { name: "Crops", href: "/category/crops" },
      { name: "Fertilizers", href: "/category/fertilizers" },
    ],
  },
  {
    name: "Apparel",
    href: "/category/apparel",
    count: 107,
    subCategories: [
      { name: "Men's Clothing", href: "/category/mens" },
      { name: "Women's Clothing", href: "/category/womens" },
      { name: "Shoes & Footwear", href: "/category/footwear" },
    ],
  },
  {
    name: "Animals",
    href: "/category/animals",
    count: 33,
    subCategories: [
      { name: "Livestock", href: "/category/livestock" },
      { name: "Pet Supplies", href: "/category/pet-supplies" },
    ],
  },
  { name: "Mobiles & Tablets", href: "/category/mobiles-tabl", count: 12, subCategories: [] },
  { name: "Home & Garden", href: "/category/home-garden", count: 76, subCategories: [] },
  { name: "Sports & Outdoors", href: "/category/sports", count: 24, subCategories: [] },
  { name: "Car, Motorbike & Industrial", href: "/category/car-motorbike-industrial", count: 89, subCategories: [] },
];

// --- Search Box ---
const CategorySearchBox = () => (
  <div className="p-4">
    <input
      type="text"
      placeholder="Search categories..."
      className="w-full p-2 text-sm text-gray-800 rounded-md border border-transparent focus:border-blue-500 focus:ring-blue-500 transition duration-150 bg-white/90 focus:bg-white placeholder:text-gray-500"
    />
  </div>
);

// --- Category Hover Item ---
function CategoryHoverItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasSubCategories) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="last:border-b-0 relative">
      <a
        href={category.href}
        onClick={handleToggle}
        className={`flex items-center justify-between px-4 py-2 transition text-white hover:bg-white/10 ${
          isOpen ? "bg-white/20 font-semibold" : ""
        }`}
      >
        <span className="truncate max-w-[calc(100%-4rem)] text-lg">
          {category.name}
        </span>
        {hasSubCategories && (
          <ChevronRightIcon
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </a>

      {hasSubCategories && (
        <div
          ref={contentRef}
          style={{
            maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
            transform: `scaleX(${isOpen ? 1 : 0})`,
          }}
          className={`overflow-hidden bg-black/20 border-t border-white/10 transition-[max-height,transform] duration-300 ease-out origin-left`}
        >
          <nav className="flex flex-col space-y-1 p-2">
            {category.subCategories.map((subCat) => (
              <a
                key={subCat.name}
                href={subCat.href}
                className="block px-3 py-1 text-base text-white/80 hover:bg-white/10 rounded transition"
              >
                - {subCat.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

// --- Main Sidebar Component ---
export default function SideCategory() {
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button (Optional) */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2 text-[#2C8845]">
            <button onClick={() => setIsCategorySidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <span className="text-lg font-semibold text-gray-800">
              Categories
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#2C8845] text-white shadow-lg
          lg:static lg:w-full lg:flex lg:flex-col lg:z-30 lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isCategorySidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-[#308C48] border-b border-white/10">
          <h2 className="text-lg font-semibold">All Categories</h2>
          <button onClick={() => setIsCategorySidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <CategorySearchBox />

        <nav className="py-2 flex-grow overflow-y-auto">
          {categoriesWithSubMenus.map((category) => (
            <CategoryHoverItem key={category.name} category={category} />
          ))}
        </nav>
      </div>

      {/* Overlay (Mobile) */}
      {isCategorySidebarOpen && (
        <div
          onClick={() => setIsCategorySidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
}

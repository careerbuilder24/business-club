"use client";
import React, { useState, SVGProps, useEffect, useRef } from "react";

import { Menu, X } from "lucide-react";

// --- ChevronRightIcon ---
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

// --- Mock Data ---
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
  {
    name: "Mobiles & Tablets",
    href: "/category/mobiles-tabl",
    count: 12,
    subCategories: [],
  },
  {
    name: "Home & Garden",
    href: "/category/home-garden",
    count: 76,
    subCategories: [],
  },
  {
    name: "Sports & Outdoors",
    href: "/category/sports",
    count: 24,
    subCategories: [],
  },
  {
    name: "Car, Motorbike & Industrial",
    href: "/category/car-motorbike-industrial",
    count: 89,
    subCategories: [],
  },
];

// --- Carousel Data ---
const carouselSlides = [
  {
    id: 1,
    src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
    alt: "Summer Deals Banner",
  },
  {
    id: 2,
    src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
    alt: "Electronics Event Banner",
  },
  {
    id: 3,
    src: "https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg",
    alt: "New Apparel Banner",
  },
];

// --- Helper Components ---
const CategorySearchBox = () => (
  <div className="p-4">
    <input
      type="text"
      placeholder="Search categories..."
      className="w-full p-2 text-sm text-gray-800 rounded-md border border-transparent focus:border-blue-500 focus:ring-blue-500 transition duration-150 bg-white/90 focus:bg-white placeholder:text-gray-500"
    />
  </div>
);

function CategoryHoverItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;
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
        <span>
          <span className="truncate max-w-[calc(100%-4rem)] text-lg">
            {category.name}
          </span>
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

const BannerCarousel = ({ slides }: { slides: typeof carouselSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden  ">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute   inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-30" : "opacity-0 z-20"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover object-center m-5 "
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-gray-400 bg-opacity-70"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
export default function App() {
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 w-full font-inter">
      {/* Mobile Top Bar */}
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
          {/* <Link href="/" className="flex items-center">
            <Image
              src="https://i.postimg.cc/pXxRpm8f/3.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </Link> */}
        </div>
      </div>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
        {/* Left Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#2C8845] text-white shadow-lg
          lg:relative lg:w-[13%] lg:flex-shrink-0 lg:z-30 lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isCategorySidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
        >
          {/* Mobile Close Header */}
          <div className="lg:hidden flex justify-between items-center p-4 bg-[#308C48] border-b border-white/10">
            <h2 className="text-lg font-semibold">All Categories</h2>
            <button onClick={() => setIsCategorySidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <CategorySearchBox />

          <nav className="py-2 overflow-hidden flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {categoriesWithSubMenus.map((category) => (
              <CategoryHoverItem key={category.name} category={category} />
            ))}
          </nav>
        </div>

        {/* Right Banner Section */}
        <div className="flex-grow w-full relative ">
          <BannerCarousel slides={carouselSlides} />
        </div>

        {/* Mobile Overlay */}
        {isCategorySidebarOpen && (
          <div
            onClick={() => setIsCategorySidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          ></div>
        )}
      </section>
    </div>
  );
}

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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

const categoriesWithSubMenus: Category[] = [
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
    <section className="relative flex flex-col lg:flex-row h-auto lg:h-[75vh]">
      {/* Category Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-full lg:w-2/12 bg-white shadow-xl border-r border-gray-200 text-gray-800 z-30 h-full">
        <div className="border-b border-gray-200">
          {topLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 text-sm font-semibold transition ${
                link.isYellow
                  ? "bg-[#21336C] text-white py-5"
                  : "hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <nav className="py-2">
          {categoriesWithSubMenus.map((category) => (
            <CategoryHoverItem key={category.name} category={category} />
          ))}
        </nav>
      </div>

      {/* Hero Banner */}
      <div className="w-full lg:w-10/12 h-full">
        <img
          className="w-full h-full"
          src="https://i.postimg.cc/mDknJG0q/Whats-App-Image-2025-10-20-at-11-45-04-98b80ef2.jpg"
          alt="Hero Banner"
        />
      </div>
    </section>
  );
}

function CategoryHoverItem({ category }: CategoryHoverItemProps) {
  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;

  return (
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

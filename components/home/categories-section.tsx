
"use client";

import Link from "next/link";
import { categories } from "@/lib/data";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaBullhorn,
  FaChartLine,
  FaStethoscope,
  FaGraduationCap,
  FaShoppingBag,
  FaUtensils,
} from "react-icons/fa";

export default function CategoriesSection() {
  const displayCategories = categories.slice(0, 8);

  // Map each category to an icon
  const categoryIcons: Record<string, React.ReactNode> = {
    Technology: <FaLaptopCode />,
    Design: <FaPaintBrush />,
    Marketing: <FaBullhorn />,
    Finance: <FaChartLine />,
    Healthcare: <FaStethoscope />,
    Education: <FaGraduationCap />,
    Retail: <FaShoppingBag />,
    "Food & Beverage": <FaUtensils />,
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Business Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find businesses in your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link key={category} href={`/listings?category=${category}`}>
              <div className="card-base p-6 text-center hover:bg-gray-50 transition-all cursor-pointer group rounded-xl border shadow-md">
                {/* Icon */}
                <div className="text-4xl mb-3 group-hover:scale-110 transition-all flex justify-center text-gray-700 group-hover:text-[#2B8944]">
                  {categoryIcons[category] || <FaLaptopCode />}
                </div>

                {/* Label */}
                <h3 className="font-semibold text-foreground group-hover:text-[#2B8944]">
                  {category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

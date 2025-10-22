"use client";

import Link from "next/link";
// Assuming categories is imported as a simple array of strings (string[])
import { categories } from "@/lib/data";

// Define the required structure for the new component logic
interface CategoryDetail {
  name: string;
  slug: string;
  imageUrl: string; // Path to your image
  hoverText: string; // Text to show on hover
}

const categoryDetailsMap: Record<string, Omit<CategoryDetail, "name">> = {
  Technology: {
    slug: "technology",
    // Placeholder image: 600x400 with ID 1045 (a laptop/desk photo)
    imageUrl: "https://picsum.photos/id/1045/600/400",
    hoverText: "Explore cutting-edge tech businesses.",
  },
  Design: {
    slug: "design",
    // Placeholder image: 600x400 with ID 250 (abstract or art-related)
    imageUrl: "https://picsum.photos/id/250/600/400",
    hoverText: "View creative agencies and portfolios.",
  },
  Marketing: {
    slug: "marketing",
    // Placeholder image: 600x400 with ID 350 (teamwork/meeting)
    imageUrl: "https://picsum.photos/id/350/600/400",
    hoverText: "Boost your business visibility.",
  },
  Finance: {
    slug: "finance",
    // Placeholder image: 600x400 with ID 38 (cityscape/money related)
    imageUrl: "https://picsum.photos/id/38/600/400",
    hoverText: "Financial and consulting services.",
  },
  Healthcare: {
    slug: "healthcare",
    // Placeholder image: 600x400 with ID 377 (hospital/medical related)
    imageUrl: "https://picsum.photos/id/377/600/400",
    hoverText: "Medical and wellness providers.",
  },
  Education: {
    slug: "education",
    // Placeholder image: 600x400 with ID 420 (books/library)
    imageUrl: "https://picsum.photos/id/420/600/400",
    hoverText: "Learning institutions and courses.",
  },
  Retail: {
    slug: "retail",
    // Placeholder image: 600x400 with ID 198 (shopping/store)
    imageUrl: "https://picsum.photos/id/198/600/400",
    hoverText: "Shops and consumer products.",
  },
  "Food & Beverage": {
    slug: "food-beverage",
    // Placeholder image: 600x400 with ID 1084 (food/restaurant)
    imageUrl: "https://picsum.photos/id/1084/600/400",
    hoverText: "Restaurants, cafes, and suppliers.",
  },
  // Add mappings for any other categories in your data
};
// ----------------------
// ----------------------

export default function CategoriesSection() {
  // 1. Get the first 8 category names (strings)
  const categoryNames = categories.slice(0, 8);

  // 2. Map the array of strings to the new array of CategoryDetail objects.
  const displayCategories: CategoryDetail[] = categoryNames
    .map((name) => {
      const detail = categoryDetailsMap[name];
      if (detail) {
        return {
          name: name,
          slug: detail.slug,
          imageUrl: detail.imageUrl,
          hoverText: detail.hoverText,
        };
      }
      // Fallback for categories not in the map (optional)
      return null;
    })
    .filter((cat): cat is CategoryDetail => cat !== null); // Filter out any nulls

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
            // Use category.slug for the link
            <Link
              key={category.name}
              href={`/listings?category=${category.slug}`}
            >
              <div className="relative overflow-hidden h-48 w-full rounded-xl shadow-md border group cursor-pointer">
                {/* Image Element */}
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay with Text */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="text-center p-4">
                    {/* Hover Text */}
                    <p className="text-white text-base font-semibold mb-2">
                      {category.hoverText}
                    </p>

                    {/* Category Name */}
                    <h3 className="text-white text-xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Label at the bottom (optional) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-semibold text-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

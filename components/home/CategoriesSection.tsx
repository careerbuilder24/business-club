
// "use client";

// import Link from "next/link";
// // Assuming categories is an array of DivisionCategory objects
// import { categories, DivisionCategory } from "@/lib/data";

// // Define the required structure for category details
// interface CategoryDetail {
//   name: string;
//   slug: string;
//   imageUrl: string; // Path to your image
//   hoverText: string; // Text to show on hover
// }

// // Map of category details keyed by category name
// const categoryDetailsMap: Record<string, Omit<CategoryDetail, "name">> = {
//   Technology: {
//     slug: "technology",
//     imageUrl: "https://picsum.photos/id/1045/600/400",
//     hoverText: "Explore cutting-edge tech businesses.",
//   },
//   Design: {
//     slug: "design",
//     imageUrl: "https://picsum.photos/id/250/600/400",
//     hoverText: "View creative agencies and portfolios.",
//   },
//   Marketing: {
//     slug: "marketing",
//     imageUrl: "https://picsum.photos/id/350/600/400",
//     hoverText: "Boost your business visibility.",
//   },
//   Finance: {
//     slug: "finance",
//     imageUrl: "https://picsum.photos/id/38/600/400",
//     hoverText: "Financial and consulting services.",
//   },
//   Healthcare: {
//     slug: "healthcare",
//     imageUrl: "https://picsum.photos/id/377/600/400",
//     hoverText: "Medical and wellness providers.",
//   },
//   Education: {
//     slug: "education",
//     imageUrl: "https://picsum.photos/id/420/600/400",
//     hoverText: "Learning institutions and courses.",
//   },
//   Retail: {
//     slug: "retail",
//     imageUrl: "https://picsum.photos/id/198/600/400",
//     hoverText: "Shops and consumer products.",
//   },
//   "Food & Beverage": {
//     slug: "food-beverage",
//     imageUrl: "https://picsum.photos/id/1084/600/400",
//     hoverText: "Restaurants, cafes, and suppliers.",
//   },
//   // Add other categories if needed
// };

// export default function CategoriesSection() {
//   // Extract string names from DivisionCategory objects
//   const categoryNames = categories.slice(0, 8).map((c: DivisionCategory) => c.division);

//   // Map to CategoryDetail[], safely handling missing details
//   const displayCategories: CategoryDetail[] = categoryNames
//     .map((name) => {
//       const detail = categoryDetailsMap[name];
//       if (detail) {
//         return {
//           name,
//           slug: detail.slug,
//           imageUrl: detail.imageUrl,
//           hoverText: detail.hoverText,
//         };
//       }
//       return null; // fallback
//     })
//     .filter((cat): cat is CategoryDetail => cat !== null);

//   return (
//     <section className="py-16 md:py-24">
//       <div className="container-custom">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Category</h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             Find businesses in your favorite categories
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {displayCategories.map((category) => (
//             <Link key={category.name} href={`/listings?category=${category.slug}`}>
//               <div className="relative overflow-hidden h-48 w-full rounded-xl shadow-md border group cursor-pointer">
            
//                 <img
//                   src={category.imageUrl}
//                   alt={category.name}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />

              
//                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
//                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="text-center p-4">
//                     <p className="text-white text-base font-semibold mb-2">{category.hoverText}</p>
//                     <h3 className="text-white text-xl font-bold">{category.name}</h3>
//                   </div>
//                 </div>

         
//                 <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
//                   <h3 className="text-white font-semibold text-lg">{category.name}</h3>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import React from "react";
import Image from "next/image";

const categories = [
  { name: "Real Estate", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60" },
  { name: "IT & Software", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60" },
  { name: "Restaurants", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60" },
  { name: "Education", img: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=60" },
  { name: "Travel & Tourism", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60" },
  { name: "Healthcare", img: "https://i.postimg.cc/MpYnYnbC/hc.avif" },
  { name: "Farming & Agriculture", img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60" },
  { name: "Import & Export", img: "https://amertranslogistics.com/wp-content/uploads/2022/06/Import-Export-Logistics.jpeg" },
  { name: "Manufacturing", img: "https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=2048x2048&w=is&k=20&c=E5_Ffsn9wtk4ESskWjCDTrBmhdG0mUTvNiN5_Dn4Jyg=" },
  { name: "Automobile", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60" },
  { name: "Construction", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=60" },
  { name: "Textile & Garments", img: "https://www.shutterstock.com/shutterstock/photos/2601915741/display_1500/stock-photo-chittagong-bangladesh-feb-woman-workers-textile-factory-in-bangladesh-bangladeshi-2601915741.jpg" },
  { name: "Finance & Banking", img: "https://isrdo.org/storage/topic/850x500/JZf12w5kekG0NaALzrcjeoQfw9spj6DZJnSj5QMP.jpg" },
  { name: "Logistics & Transport", img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60" },
  { name: "E-Commerce", img: "https://s3.ap-south-1.amazonaws.com/prod-easebuzz-static/static/base/assets_aug_2021/img/easebuzz/easebuzz-explainer/explainers-ecommerce/what-is-ecommerce/upi-credit-cards.png" },
  // ✅ Newly added categories:
  { name: "Retail & Supermarket", img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=60" },
  { name: "Hotel & Hospitality", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
  { name: "Energy & Power", img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=60" },
];

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Explore Business Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 max-w-7xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
          >
            <Image
              src={category.img}
              alt={category.name}
              width={400}
              height={300}
              className="object-cover w-full h-44 transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold text-center px-2">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

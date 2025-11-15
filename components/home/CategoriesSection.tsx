
// "use client";
// import React from "react";
// import Image from "next/image";

// const categories = [
//   { name: "Real Estate", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60" },
//   { name: "IT & Software", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60" },
//   { name: "Restaurants", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60" },
//   { name: "Education", img: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=60" },
//   { name: "Travel & Tourism", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60" },
//   { name: "Healthcare", img: "https://i.postimg.cc/MpYnYnbC/hc.avif" },
//   { name: "Farming & Agriculture", img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60" },
//   { name: "Import & Export", img: "https://amertranslogistics.com/wp-content/uploads/2022/06/Import-Export-Logistics.jpeg" },
//   { name: "Manufacturing", img: "https://media.istockphoto.com/id/2155877725/photo/male-and-female-engineers-in-neat-work-clothes-prepare-and-control-the-production-system-of.jpg?s=2048x2048&w=is&k=20&c=E5_Ffsn9wtk4ESskWjCDTrBmhdG0mUTvNiN5_Dn4Jyg=" },
//   { name: "Automobile", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60" },
//   { name: "Construction", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=60" },
//   { name: "Textile & Garments", img: "https://www.shutterstock.com/shutterstock/photos/2601915741/display_1500/stock-photo-chittagong-bangladesh-feb-woman-workers-textile-factory-in-bangladesh-bangladeshi-2601915741.jpg" },
//   { name: "Finance & Banking", img: "https://isrdo.org/storage/topic/850x500/JZf12w5kekG0NaALzrcjeoQfw9spj6DZJnSj5QMP.jpg" },
//   { name: "Logistics & Transport", img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60" },
//   { name: "E-Commerce", img: "https://s3.ap-south-1.amazonaws.com/prod-easebuzz-static/static/base/assets_aug_2021/img/easebuzz/easebuzz-explainer/explainers-ecommerce/what-is-ecommerce/upi-credit-cards.png" },
//   // ✅ Newly added categories:
//   { name: "Retail & Supermarket", img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=60" },
//   { name: "Hotel & Hospitality", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
//   { name: "Energy & Power", img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=60" },
// ];

// export default function CategoriesSection() {
//   return (
//     <section className="py-12 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//         Explore Business Categories
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 max-w-7xl mx-auto">
//         {categories.map((category) => (
//           <div
//             key={category.name}
//             className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
//           >
//             <Image
//               src={category.img}
//               alt={category.name}
//               width={400}
//               height={300}
//               className="object-cover w-full h-44 transition-transform duration-500 group-hover:scale-110"
//             />
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//               <p className="text-white text-lg font-semibold text-center px-2">
//                 {category.name}
//               </p>
//             </div>
//           </div>
//         ))}
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
    <section className="py-12 bg-gray-50" aria-labelledby="categories-section">
      <h2 id="categories-section" className="text-3xl font-bold text-center text-gray-800 mb-10">
        Explore Business Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 max-w-7xl mx-auto">
        {categories.map((category) => (
          <figure
            key={category.name}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
            aria-labelledby={`category-${category.name}`}
          >
            <Image
              src={category.img}
              alt={`Business category: ${category.name}`}
              width={400}
              height={300}
              className="object-cover w-full h-44 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay */}
            <figcaption className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold text-center px-2">{category.name}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

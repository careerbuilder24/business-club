// "use client";
// import { listings, Listing, businessCategories, categories } from "@/lib/data";
// import { Phone, Mail, Globe, MapPin } from "lucide-react";
// import { useEffect, useState } from "react";
// import {
//   Star,
//   ListOrdered,
//   Briefcase,
//   Users,
//   Info,
//   ChevronDown,
// } from "lucide-react";

// const FAKE_PRODUCTS = [
//   {
//     id: "p1",
//     name: "Quantum Headset Pro",
//     image: "https://picsum.photos/id/17/400/300",
//     description:
//       "Experience unparalleled audio clarity with active noise cancellation and ergonomic design. Perfect for professionals and gamers.",
//     rating: 4.7,
//   },
//   {
//     id: "p2",
//     name: "Smart Coffee Brewer 3000",
//     image: "https://picsum.photos/id/48/400/300",
//     description:
//       "Brew your morning coffee from your phone. Features programmable schedules and integrated bean grinder.",
//     rating: 4.2,
//   },
// ];

// const FAKE_SERVICES = [
//   {
//     id: "s1",
//     name: "24/7 Premium Support",
//     image: "https://picsum.photos/id/1053/400/300",
//     description:
//       "Immediate, dedicated support via phone, chat, and email from our top-tier technical specialists.",
//     rating: 5.0,
//   },
//   {
//     id: "s2",
//     name: "Custom Software Development",
//     image: "https://picsum.photos/id/218/400/300",
//     description:
//       "Bespoke software solutions tailored to your unique business needs and integrated with existing systems.",
//     rating: 4.5,
//   },
// ];

// const FAKE_REVIEWS = [
//   {
//     id: 1,
//     author: "A. Rahman",
//     rating: 5.0,
//     date: "2 months ago",
//     comment:
//       "Outstanding service! They delivered the project ahead of schedule and the quality was superb.",
//   },
//   {
//     id: 2,
//     author: "B. Khatun",
//     rating: 4.0,
//     date: "1 week ago",
//     comment:
//       "Very professional team. Communication was clear, only slight delay on one minor feature.",
//   },
// ];

// const districtCategories = [
//   {
//     division: "Dhaka",
//     districts: ["Dhaka", "Gazipur", "Narayanganj", "Munshiganj"],
//   },
//   {
//     division: "Chittagong",
//     districts: ["Chittagong", "Cox's Bazar", "Comilla"],
//   },
// ];

// const RatingStars = ({
//   rating,
//   size = 16,
// }: {
//   rating: number;
//   size?: number;
// }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div className="flex items-center text-yellow-500 flex-wrap">
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={`f-${i}`} size={size} className="fill-yellow-500" />
//       ))}
//       {hasHalfStar && (
//         <div className="relative" style={{ width: size, height: size }}>
//           <Star size={size} className="text-gray-300" />
//           <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
//             <Star size={size} className="fill-yellow-500 text-yellow-500" />
//           </div>
//         </div>
//       )}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Star key={`e-${i}`} size={size} className="text-gray-300" />
//       ))}
//       <span className="ml-2 text-sm font-semibold text-gray-800 whitespace-nowrap">
//         {rating.toFixed(1)}
//       </span>
//     </div>
//   );
// };

// export default function ListingDetailPage({ id }: { id?: string }) {
//   const [mounted, setMounted] = useState(false);

//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//   const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
//   const [selectedDistrict, setSelectedDistrict] = useState<string>("");
//   const [openDivision, setOpenDivision] = useState<string>("Dhaka");
//   const [activeTab, setActiveTab] = useState<
//     "products" | "services" | "reviews" | "about"
//   >("products");

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const listing: Listing | undefined =
//     listings.find((l) => l.id === id) || listings[0];

//   if (!mounted) return null;

//   if (!listing)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h1 className="text-2xl font-bold text-red-600">Listing Not Found</h1>
//       </div>
//     );

//   const getDistrictCount = (district: string) =>
//     listings.filter((l) => l.district === district).length;

//   const getBusinessTypeCount = (type: string) =>
//     listings.filter((l) => l.businessType === type).length;

//   const tabContentMap = {
//     about: (
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold text-[#2C8845]">
//           About {listing.companyName}
//         </h2>
//         <p className="text-gray-700 leading-relaxed break-words">
//           {listing.description}
//         </p>
//       </div>
//     ),
//     products: (
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold text-[#2C8845]">Products</h2>
//         {FAKE_PRODUCTS.map((p) => (
//           <div
//             key={p.id}
//             className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <div className="flex flex-col sm:flex-row gap-4">
//               <img
//                 src={p.image}
//                 className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg flex-shrink-0"
//                 alt={p.name}
//               />
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-bold text-lg text-[#2C8845] truncate">
//                   {p.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-2 leading-relaxed break-words">
//                   {p.description}
//                 </p>
//                 <RatingStars rating={p.rating} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     ),
//     services: (
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold text-[#2C8845]">Services</h2>
//         {FAKE_SERVICES.map((s) => (
//           <div
//             key={s.id}
//             className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <div className="flex flex-col sm:flex-row gap-4">
//               <img
//                 src={s.image}
//                 className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg flex-shrink-0"
//                 alt={s.name}
//               />
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-bold text-lg text-[#2C8845] truncate">
//                   {s.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-2 leading-relaxed break-words">
//                   {s.description}
//                 </p>
//                 <RatingStars rating={s.rating} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     ),
//     reviews: (
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold text-[#2C8845]">Reviews</h2>
//         {FAKE_REVIEWS.map((r) => (
//           <div
//             key={r.id}
//             className="border p-4 rounded-lg bg-white shadow-sm break-words"
//           >
//             <div className="flex justify-between items-center flex-wrap gap-1">
//               <span className="font-bold">{r.author}</span>
//               <span className="text-xs text-gray-500">{r.date}</span>
//             </div>
//             <RatingStars rating={r.rating} />
//             <p className="text-sm mt-1 leading-relaxed break-words">
//               {r.comment}
//             </p>
//           </div>
//         ))}
//       </div>
//     ),
//   };

//   const handleDistrictSelect = (district: string) => {
//     setSelectedDistrict(district);
//     if (isMobileFilterOpen) setIsMobileFilterOpen(false);
//   };
//   const handleBusinessTypeSelect = (type: string) => {
//     setSelectedBusinessType(type);
//     if (isMobileFilterOpen) setIsMobileFilterOpen(false);
//   };
//   console.log(listing);
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row w-full">
//       {/* --- Sidebar --- */}
//       <div
//         className={`min-h-screen bg-green-700 text-white lg:w-[250px] p-0
//     lg:sticky lg:top-16 lg:z-auto
//     ${
//       isMobileFilterOpen
//         ? "fixed top-0 left-0 w-64 z-50 transform translate-x-0"
//         : "fixed top-0 left-0 w-64 z-50 transform -translate-x-full lg:relative lg:translate-x-0"
//     }
//     transition-transform duration-300 ease-in-out`}
//       >
//         <div className="lg:hidden p-4 flex justify-end">
//           <button
//             onClick={() => setIsMobileFilterOpen(false)}
//             className="text-white text-2xl"
//           >
//             &times;
//           </button>
//         </div>

//         <div className="p-4 overflow-y-auto">
//           <button
//             onClick={() => {
//               handleDistrictSelect("");
//               handleBusinessTypeSelect("");
//             }}
//             className="w-full text-center px-4 py-3 mb-4 cursor-pointer bg-green-800 font-bold rounded-lg hover:bg-green-600"
//           >
//             All Business
//           </button>

//           <div className="border-b border-green-600 pb-4 mb-4">
//             <h3 className="text-lg font-bold mb-2 text-white/90">
//               Business Type
//             </h3>
//             {businessCategories.map((c) => (
//               <button
//                 key={c.name}
//                 onClick={() => handleBusinessTypeSelect(c.name)}
//                 className={`w-full flex justify-between px-2 py-2 rounded-md text-sm ${
//                   selectedBusinessType === c.name
//                     ? "bg-green-800 border-l-4 border-white"
//                     : "hover:bg-green-600/80"
//                 }`}
//               >
//                 <span>{c.name}</span>
//                 <span className="text-white/70 text-xs">
//                   ({getBusinessTypeCount(c.name)})
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div>
//             <h3 className="text-lg font-bold mb-2 text-white/90">Districts</h3>
//             {districtCategories.map((group) => (
//               <div key={group.division} className="mb-2">
//                 <button
//                   onClick={() =>
//                     setOpenDivision(
//                       openDivision === group.division ? "" : group.division
//                     )
//                   }
//                   className="w-full flex justify-between items-center bg-green-600 hover:bg-green-500 text-sm font-bold px-2 py-2 rounded-md"
//                 >
//                   {group.division} Division
//                   <ChevronDown
//                     size={14}
//                     className={`transition-transform ${
//                       openDivision === group.division ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 <div
//                   className={`transition-all overflow-hidden ${
//                     openDivision === group.division ? "max-h-96" : "max-h-0"
//                   }`}
//                 >
//                   {group.districts.map((d) => (
//                     <button
//                       key={d}
//                       onClick={() => handleDistrictSelect(d)}
//                       className={`w-full text-left text-xs px-4 py-1.5 rounded-md ${
//                         selectedDistrict === d
//                           ? "bg-green-800 border-l-4 border-white"
//                           : "hover:bg-green-700/80"
//                       }`}
//                     >
//                       {d} ({getDistrictCount(d)})
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- Main Content --- */}
//       <main className="flex-1 bg-gray-50 p-4 sm:p-6 max-w-4xl">
//         <div className="h-64 w-full rounded-xl overflow-hidden shadow">
//           <img
//             src={listing.coverImage}
//             alt="banner"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="p-6 relative bg-white mt-[-3rem] rounded-2xl shadow-md flex justify-between flex-wrap">
//           {/* Left side: Logo + Company Info */}
//           <div className="flex items-start gap-4">
//             {/* Logo */}
//             <img
//               src={listing.logo}
//               alt={listing.name}
//               className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg object-cover"
//             />

//             {/* Company Details */}
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 truncate">
//                 {listing.name}
//               </h1>
//               <p className="text-lg text-[#2C8845] truncate">
//                 {listing.companyName}
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {listing.district}, {listing.businessType}
//               </p>

//               {/* Rating */}
//               <div className="mt-3">
//                 <RatingStars rating={listing.rating} size={20} />
//               </div>
//             </div>
//           </div>

//           {/* Right side: Contact Info */}
//           <div className="flex flex-col justify-center text-sm text-gray-700 mt-4 sm:mt-0 text-left">
//             {listing.phone && (
//               <a
//                 href={`tel:${listing.phone}`}
//                 className="flex items-center gap-2 text-[#2C8845] hover:text-yellow-400 transition duration-300 ease-in-out"
//               >
//                 <Phone size={16} />
//                 <span>{listing.phone}</span>
//               </a>
//             )}

//             {listing.email && (
//               <a
//                 href={`mailto:${listing.email}`}
//                 className="flex items-center gap-2 text-[#2C8845] hover:text-yellow-400 transition duration-300 ease-in-out"
//               >
//                 <Mail size={16} />
//                 <span className="truncate">{listing.email}</span>
//               </a>
//             )}

//             {listing.website && (
//               <a
//                 href={listing.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-[#2C8845] hover:text-yellow-400 transition duration-300 ease-in-out"
//               >
//                 <Globe size={16} />
//                 <span className="truncate">{listing.website}</span>
//               </a>
//             )}

//             {listing.address && (
//               <p className="flex items-center gap-2 text-[#2C8845] mt-1">
//                 <MapPin size={16} />
//                 <span>{listing.address}</span>
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Tabs */}
//         <nav className="bg-white p-4 mt-6 shadow border rounded-xl overflow-x-auto">
//           <ul className="flex gap-3 min-w-max">
//             {[
//               { key: "products", label: "Products", icon: ListOrdered },
//               { key: "services", label: "Services", icon: Briefcase },
//               { key: "reviews", label: "Reviews", icon: Users },
//               { key: "about", label: "About", icon: Info },
//             ].map(({ key, label, icon: Icon }) => (
//               <li key={key}>
//                 <button
//                   onClick={() => setActiveTab(key as any)}
//                   className={`flex items-center px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap ${
//                     activeTab === key
//                       ? "bg-[#2C8845] text-white"
//                       : "hover:bg-[#2C8845]/10 text-gray-700"
//                   }`}
//                 >
//                   <Icon size={16} className="mr-2" />
//                   {label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="bg-white p-6 mt-4 rounded-xl shadow border">
//           {tabContentMap[activeTab]}
//         </div>

//         <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow">
//           <iframe
//             src={`https://maps.google.com/maps?q=${encodeURIComponent(
//               "123 Tech Park Avenue, Banani, Dhaka 1213"
//             )}&output=embed`}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             loading="lazy"
//           ></iframe>
//         </div>
//       </main>

//       {/* --- Right Sidebar --- */}
//       <aside className="hidden lg:flex flex-col w-[250px] p-4 space-y-4">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="bg-gray-100 border border-gray-300 rounded-xl h-[250px] flex items-center justify-center text-gray-500 text-sm"
//           >
//             AD SENSE {i + 1} (150x250)
//           </div>
//         ))}
//       </aside>
//     </div>
//   );
// }



// import ListingDetailPage from "./ListingDetailPage";
import ListingDetailPage from "@/components/ListingDetailPage/page";
import { listings } from "@/lib/data";

interface PageProps {
  params: { id: string };
}

// Fake products moved to server so they appear in View Source
const FAKE_PRODUCTS = [
  {
    id: "p1",
    name: "Quantum Headset Pro",
    image: "https://picsum.photos/id/17/400/300",
    description: "Experience unparalleled audio clarity...",
    rating: 4.7,
  },
  {
    id: "p2",
    name: "Smart Coffee Brewer 3000",
    image: "https://picsum.photos/id/48/400/300",
    description: "Brew your morning coffee from your phone...",
    rating: 4.2,
  },
];

const FAKE_SERVICES = [
  {
    id: "s1",
    name: "24/7 Premium Support",
    image: "https://picsum.photos/id/1053/400/300",
    description: "Immediate, dedicated support via phone, chat, and email...",
    rating: 5.0,
  },
  {
    id: "s2",
    name: "Custom Software Development",
    image: "https://picsum.photos/id/218/400/300",
    description: "Bespoke software solutions tailored to your unique business needs...",
    rating: 4.5,
  },
];

const FAKE_REVIEWS = [
  { id: 1, author: "A. Rahman", rating: 5.0, date: "2 months ago", comment: "Outstanding service!" },
  { id: 2, author: "B. Khatun", rating: 4.0, date: "1 week ago", comment: "Very professional team." },
];

export default function Page({ params }: PageProps) {
  const listing = listings.find((l) => l.id === params.id);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Listing Not Found</h1>
      </div>
    );
  }

  // Pass products, services, reviews as props
  return (
    <ListingDetailPage
      listing={listing}
      products={FAKE_PRODUCTS}
      services={FAKE_SERVICES}
      reviews={FAKE_REVIEWS}
    />
  );
}


// "use client";

// import { useState } from "react";
// import Head from "next/head";
// import { Phone, Mail, Globe, MapPin, Star, ListOrdered, Briefcase, Users, Info, ChevronDown, } from "lucide-react";

// import { listings,  businessCategories, categories } from "@/lib/data";
// interface Listing {
//   id: string;
//   name: string;
//   companyName: string;
//   district: string;
//   businessType: string;
//   coverImage: string;
//   logo: string;
//   phone?: string;
//   email?: string;
//   website?: string;
//   address?: string;
//   description: string;
//   rating: number;
// }

// interface Product {
//   id: string;
//   name: string;
//   image: string;
//   description: string;
//   rating: number;
// }

// interface Service {
//   id: string;
//   name: string;
//   image: string;
//   description: string;
//   rating: number;
// }

// interface Review {
//   id: number;
//   author: string;
//   rating: number;
//   date: string;
//   comment: string;
// }

// interface Props {
//   listing: Listing;
//   products: Product[];
//   services: Service[];
//   reviews: Review[];
// }

// const RatingStars = ({ rating, size = 16 }: { rating: number; size?: number }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div className="flex items-center text-yellow-500">
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
//       <span className="ml-2 text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
//     </div>
//   );
// };
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

//  const getDistrictCount = (district: string) =>
//     listings.filter((l) => l.district === district).length;

//   const getBusinessTypeCount = (type: string) =>
//     listings.filter((l) => l.businessType === type).length;

// export default function ListingDetailPage({ listing, products, services, reviews }: Props) {
//   const [activeTab, setActiveTab] = useState<"products" | "services" | "reviews" | "about">("products");
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//     const [selectedDistrict, setSelectedDistrict] = useState<string>("");
//     const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
//       const [openDivision, setOpenDivision] = useState<string>("Dhaka");

//   const tabContentMap = {
//     about: <p className="text-gray-700 mt-2">{listing.description}</p>,
//     products: (
//       <div className="space-y-4 mt-4">
//         {products.map((p) => (
//           <div key={p.id} className="border rounded-xl p-4 bg-white shadow hover:shadow-lg flex gap-4">
//             <img src={p.image} className="w-32 h-32 object-cover rounded-lg" alt={p.name} />
//             <div className="flex-1">
//               <h3 className="font-bold text-lg text-[#2C8845]">{p.name}</h3>
//               <p className="text-sm text-gray-600">{p.description}</p>
//               {/* <RatingStars rating={p.rating} /> */}
//               <p className="text-sm text-gray-600">Web Link: www.webtech.com</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     ),
//     services: (
//       <div className="space-y-4 mt-4">
//         {services.map((s) => (
//           <div key={s.id} className="border rounded-xl p-4 bg-white shadow hover:shadow-lg flex gap-4">
//             <img src={s.image} className="w-32 h-32 object-cover rounded-lg" alt={s.name} />
//             <div className="flex-1">
//               <h3 className="font-bold text-lg text-[#2C8845]">{s.name}</h3>
//               <p className="text-sm text-gray-600">{s.description}</p>
//               <p className="text-sm text-gray-600">Web Link: www.webtech.com</p>
//               {/* <RatingStars rating={s.rating} /> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     ),
//     reviews: (
//       <div className="space-y-4 mt-4">
//         {reviews.map((r) => (
//           <div key={r.id} className="border rounded-lg p-4 bg-white">
//             <div className="flex justify-between">
//               <span className="font-bold">{r.author}</span>
//               <span className="text-xs text-gray-500">{r.date}</span>
//             </div>
//             <RatingStars rating={r.rating} />
//             <p className="text-sm mt-1">{r.comment}</p>
//           </div>
//         ))}
//       </div>
//     ),
//   };


//    const handleDistrictSelect = (district: string) => {
//     setSelectedDistrict(district);
//     if (isMobileFilterOpen) setIsMobileFilterOpen(false);
//   };

//     const handleBusinessTypeSelect = (type: string) => {
//     setSelectedBusinessType(type);
//     if (isMobileFilterOpen) setIsMobileFilterOpen(false);
//   };

//     // Generate meta description (first 150 chars of listing description)
//   const metaDescription = listing.description
//     ? listing.description.slice(0, 150) + (listing.description.length > 150 ? "..." : "")
//     : `${listing.name} - ${listing.businessType} in ${listing.district}`;

//   return (

//     <>
//        <Head>
//         <title>{listing.name} | {listing.businessType} in {listing.district}</title>
//         <meta name="description" content={metaDescription} />
//         <meta name="robots" content="index, follow" />
//         <meta property="og:title" content={`${listing.name} | ${listing.businessType}`} />
//         <meta property="og:description" content={metaDescription} />
//         <meta property="og:type" content="website" />
//       </Head>
//      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row w-full">


//         {/* --- Sidebar --- */}
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


// {/* Main part */}

//       <main className="flex-1 bg-gray-50 p-4 sm:p-6 max-w-4xl">
//         {/* Cover Image */}
//         <div className="h-64 w-full rounded-xl overflow-hidden shadow">
//           <img src={listing.coverImage} alt="banner" className="w-full h-full object-cover" />
//         </div>

//         {/* Logo + Info */}
//         <div className="p-6 relative bg-white mt-[-3rem] rounded-2xl shadow-md flex justify-between">
//           <div className="flex items-start gap-4">
//             <img src={listing.logo} alt={listing.name} className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg object-cover" />
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">{listing.name}</h1>
//               <p className="text-lg text-[#2C8845]">{listing.companyName}</p>
//               <p className="text-sm text-gray-500 mt-1">{listing.district}, {listing.businessType}</p>
//               <RatingStars rating={listing.rating} size={20} />
//             </div>
//           </div>
//           <div className="flex flex-col justify-center text-sm text-gray-700 mt-4 sm:mt-0">
//             {listing.phone && <a href={`tel:${listing.phone}`} className="flex items-center gap-2 text-[#2C8845]"><Phone size={16} />{listing.phone}</a>}
//             {listing.email && <a href={`mailto:${listing.email}`} className="flex items-center gap-2 text-[#2C8845]"><Mail size={16} />{listing.email}</a>}
//             {listing.website && <a href={listing.website} target="_blank" className="flex items-center gap-2 text-[#2C8845]"><Globe size={16} />{listing.website}</a>}
//             {listing.address && <p className="flex items-center gap-2 text-[#2C8845]"><MapPin size={16} />{listing.address}</p>}
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
//                     activeTab === key ? "bg-[#2C8845] text-white" : "hover:bg-[#2C8845]/10 text-gray-700"
//                   }`}
//                 >
//                   <Icon size={16} className="mr-2" /> {label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Tab Content */}
//         <div className="bg-white p-6 mt-4 rounded-xl shadow border">{tabContentMap[activeTab]}</div>

//         {/* Google Map */}
//         <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow">
//           <iframe
//             src={`https://maps.google.com/maps?q=${encodeURIComponent(listing.address || "Dhaka")}&output=embed`}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             loading="lazy"
//           ></iframe>
//         </div>
//       </main>




//          {/* --- Right Sidebar --- */}
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
//     </>
   
//   );
// }
"use client";

import { useState } from "react";
import Head from "next/head";
import { Phone, Mail, Globe, MapPin, Star, ListOrdered, Briefcase, Users, Info, ChevronDown, Menu } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";

// import { listings, businessCategories, categories } from "@/lib/data";
interface Listing {
  id: string;
  name: string;
  companyName: string;
  district: string;
  businessType: string;
  coverImage: string;
  logo: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  description: string;
  rating: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
}

interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface Props {
  listing: Listing;
  products: Product[];
  services: Service[];
  reviews: Review[];
}

const RatingStars = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`f-${i}`} size={size} className="fill-yellow-500" />
      ))}
      {hasHalfStar && (
        <div className="relative" style={{ width: size, height: size }}>
          <Star size={size} className="text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={size} className="fill-yellow-500 text-yellow-500" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`e-${i}`} size={size} className="text-gray-300" />
      ))}
      <span className="ml-2 text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
    </div>
  );
};
const districtCategories = [
  {
    division: "Dhaka",
    districts: ["Dhaka", "Gazipur", "Narayanganj", "Munshiganj"],
  },
  {
    division: "Chittagong",
    districts: ["Chittagong", "Cox's Bazar", "Comilla"],
  },
];

// const getDistrictCount = (district: string) =>
//   listings.filter((l) => l.district === district).length;

// const getBusinessTypeCount = (type: string) =>
//   listings.filter((l) => l.businessType === type).length;

export default function ListingDetailPage({ listing, products, services, reviews }: Props) {
  // Active tab state is now only for Products, Services, Reviews
  const [activeTab, setActiveTab] = useState<"products" | "services" | "reviews">("products"); 
  // const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  // const [selectedBusinessType, setSelectedBusinessType] = useState<string>("");
  // const [openDivision, setOpenDivision] = useState<string>("Dhaka");

  const tabContentMap = {
    // 'about' content (listing.description) has been removed from here and moved to a non-toggled section below.
    products: (
      <div className="space-y-4 mt-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 bg-white shadow hover:shadow-lg flex gap-4 flex-col sm:flex-row">
            <img src={p.image} className="w-full h-48 sm:w-32 sm:h-32 object-cover rounded-lg" alt={p.name} />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-[#2C8845]">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              {/* <RatingStars rating={p.rating} /> */}
              <p className="text-sm text-gray-600">Web Link: www.webtech.com</p>
            </div>
          </div>
        ))}
      </div>
    ),
    services: (
      <div className="space-y-4 mt-4">
        {services.map((s) => (
          <div key={s.id} className="border rounded-xl p-4 bg-white shadow hover:shadow-lg flex gap-4 flex-col sm:flex-row">
            <img src={s.image} className="w-full h-48 sm:w-32 sm:h-32 object-cover rounded-lg" alt={s.name} />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-[#2C8845]">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.description}</p>
              <p className="text-sm text-gray-600">Web Link: www.webtech.com</p>
              {/* <RatingStars rating={s.rating} /> */}
            </div>
          </div>
        ))}
      </div>
    ),
    reviews: (
      <div className="space-y-4 mt-4">
        {reviews.map((r) => (
          <div key={r.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between flex-wrap">
              <span className="font-bold">{r.author}</span>
              <span className="text-xs text-gray-500">{r.date}</span>
            </div>
            <RatingStars rating={r.rating} />
            <p className="text-sm mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    ),
  };


  // const handleDistrictSelect = (district: string) => {
  //   setSelectedDistrict(district);
  //   if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  // };

  // const handleBusinessTypeSelect = (type: string) => {
  //   setSelectedBusinessType(type);
  //   if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  // };

  // Generate meta description (first 150 chars of listing description)
  const metaDescription = listing.description
    ? listing.description.slice(0, 150) + (listing.description.length > 150 ? "..." : "")
    : `${listing.name} - ${listing.businessType} in ${listing.district}`;

  return (

    <>
      <Head>
        <title>{listing.name} | {listing.businessType} in {listing.district}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${listing.name} | ${listing.businessType}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
      </Head>


      <Sidebar/>
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row w-full">

     
        {/* <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 z-40 p-3 bg-[#2C8845] text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Open Filter"
        >
          <Menu size={24} />
        </button>
       
        {isMobileFilterOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>
        )} */}

        {/* --- Sidebar (Filter) - MODIFIED FOR TOP POSITION ON MOBILE --- */}
        {/* <div
          className={`min-h-screen bg-green-700 text-white lg:w-[250px] p-0
          lg:sticky lg:top-16 lg:z-auto
          ${
            isMobileFilterOpen
              ? "fixed top-0 left-0 w-full h-auto max-h-[80vh] z-50 transform translate-y-0" // Set to top-0, left-0, w-full, h-auto, and max-h
              : "fixed top-0 left-0 w-full h-auto max-h-0 z-50 transform -translate-y-full lg:relative lg:translate-y-0" // Hide vertically
          }
          transition-transform duration-300 ease-in-out`}
        >
          <div className="lg:hidden p-4 flex justify-between items-center bg-green-800">
            <h3 className="text-lg font-bold text-white">Filter Options</h3>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-white text-3xl p-1"
            >
              ×
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-full max-h-[calc(80vh-4rem)]"> 
            <button
              onClick={() => {
                handleDistrictSelect("");
                handleBusinessTypeSelect("");
              }}
              className="w-full text-center px-4 py-3 mb-4 cursor-pointer bg-green-800 font-bold rounded-lg hover:bg-green-600"
            >
              All Business
            </button>

            <div className="border-b border-green-600 pb-4 mb-4">
              <h3 className="text-lg font-bold mb-2 text-white/90">
                Business Type
              </h3>
              {businessCategories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleBusinessTypeSelect(c.name)}
                  className={`w-full flex justify-between px-2 py-2 rounded-md text-sm text-left ${
                    selectedBusinessType === c.name
                      ? "bg-green-800 border-l-4 border-white"
                      : "hover:bg-green-600/80"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-white/70 text-xs">
                    ({getBusinessTypeCount(c.name)})
                  </span>
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2 text-white/90">Districts</h3>
              {districtCategories.map((group) => (
                <div key={group.division} className="mb-2">
                  <button
                    onClick={() =>
                      setOpenDivision(
                        openDivision === group.division ? "" : group.division
                      )
                    }
                    className="w-full flex justify-between items-center bg-green-600 hover:bg-green-500 text-sm font-bold px-2 py-2 rounded-md"
                  >
                    {group.division} Division
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDivision === group.division ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openDivision === group.division ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {group.districts.map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDistrictSelect(d)}
                        className={`w-full text-left text-xs px-4 py-1.5 rounded-md ${
                          selectedDistrict === d
                            ? "bg-green-800 border-l-4 border-white"
                            : "hover:bg-green-700/80"
                        }`}
                      >
                        {d} ({getDistrictCount(d)})
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}


        {/* Main part */}

        <main className="flex-1 bg-gray-50 p-4 sm:p-6 max-w-4xl w-full lg:ml-72">
          {/* Cover Image */}
          <div className="h-40 sm:h-64 w-full rounded-xl overflow-hidden shadow">
            <img src={listing.coverImage} alt="banner" className="w-full h-full object-cover" />
          </div>

          {/* Logo + Info */}
          <div className="p-4 sm:p-6 relative bg-white mt-[-3rem] rounded-2xl shadow-md flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
              <img src={listing.logo} alt={listing.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-lg object-cover flex-shrink-0" />
              <div className="mt-2 sm:mt-0">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">{listing.name}</h1>
                <p className="text-base sm:text-lg text-[#2C8845]">{listing.companyName}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{listing.district}, {listing.businessType}</p>
                <RatingStars rating={listing.rating} size={16} />
              </div>
            </div>
            
            {/* Contact Info (Stacked on mobile) */}
            <div className="flex flex-col text-sm text-gray-700 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
              {listing.phone && <a href={`tel:${listing.phone}`} className="flex items-center gap-2 text-[#2C8845]"><Phone size={16} />{listing.phone}</a>}
              {listing.email && <a href={`mailto:${listing.email}`} className="flex items-center gap-2 text-[#2C8845]"><Mail size={16} />{listing.email}</a>}
              {listing.website && <a href={listing.website} target="_blank" className="flex items-center gap-2 text-[#2C8845]"><Globe size={16} />{listing.website}</a>}
              {listing.address && <p className="flex items-center gap-2 text-[#2C8845]"><MapPin size={16} />{listing.address}</p>}
            </div>
          </div>

          {/* --- New Section (Outside of Toggle) - Displays the full description using the new design --- */}
          <div className="bg-white p-4 sm:p-6 mt-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              About {listing.name}
            </h2>
            {/* Using the full listing description here */}
            <p className="text-gray-700">{listing.description}</p>
          </div>
          {/* --- End New Section --- */}

          {/* Tabs */}
          <nav className="bg-white p-4 mt-6 shadow border rounded-xl overflow-x-auto">
            <ul className="flex gap-3 min-w-max">
              {[
                { key: "products", label: "Products", icon: ListOrdered },
                { key: "services", label: "Services", icon: Briefcase },
                { key: "reviews", label: "Reviews", icon: Users },
                // The 'About' tab is intentionally excluded here
              ].map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveTab(key as any)}
                    className={`flex items-center px-3 py-2 text-sm font-bold rounded-lg whitespace-nowrap ${
                      activeTab === key ? "bg-[#2C8845] text-white" : "hover:bg-[#2C8845]/10 text-gray-700"
                    }`}
                  >
                    <Icon size={16} className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.slice(0, 1)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tab Content */}
          <div className="bg-white p-4 sm:p-6 mt-4 rounded-xl shadow border">{tabContentMap[activeTab]}</div>

          {/* Google Map */}
          <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(listing.address || "Dhaka")}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </main>


        {/* --- Right Sidebar (Hidden on mobile) --- */}
        <aside className="hidden lg:flex flex-col w-[250px] p-4 space-y-4 flex-shrink-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 border border-gray-300 rounded-xl h-[250px] flex items-center justify-center text-gray-500 text-sm"
            >
              AD SENSE {i + 1} (150x250)
            </div>
          ))}
        </aside>
      </div>
    </>
    
  );
}
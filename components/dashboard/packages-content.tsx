
// "use client";

// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Check, X } from "lucide-react";

// export default function PackagesContent() {
//   const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

//   const handleSelectPackage = (id: string) => {
//     setSelectedPackage(id);
//   };

//   const allServices = [
//     "Domain Registration",
//     "Web Hosting",
//     "Logo Design",
//     "Social Media Poster Design",
//     "Website Graphic Design",
//     "Brochure / Leaflet Design",
//     "Video Ad Creation",
//     "Motion Ad Creation",
//     "Basic Informative Website (5 Pages)",
//     "10–15 Page WordPress Website",
//     "Dynamic Website (Next.js + TypeScript)",
//     "E-commerce Website (No Payment Gateway)",
//     "E-commerce Website with Payment Gateway (+৳25,000)",
//     "Social Media Marketing",
//     "Search Engine Optimization (SEO)",
//     "Business Club Listing",
//     "Sources Listing",
//     "Yellow Pages Listing",
//     "Online Directory Listing",
//     "Web Directory Listing",
//     "Venture Capital Funding Assistance",
//     "Entrepreneur Training",
//     "Premium ID Card With NFC",
//   ];

//   const packages = [
//     {
//       id: "starter",
//       name: "Starter Package",
//       price: 10000,
//       description: "Perfect for small businesses starting their journey.",
//       color: "from-orange-500 to-red-500",
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Basic Informative Website (5 Pages)",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "growth",
//       name: "Growth Package",
//       price: 25000,
//       description: "For growing businesses looking to expand their presence.",
//       color: "from-teal-400 to-cyan-500",
//       popular: true, //  highlight this
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Brochure / Leaflet Design",
//         "Video Ad Creation",
//         "Motion Ad Creation",
//         "10–15 Page WordPress Website",
//         "Social Media Marketing",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "professional",
//       name: "Professional Package",
//       price: 50000,
//       description: "Ideal for established companies scaling up operations.",
//       color: "from-blue-500 to-indigo-500",
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Brochure / Leaflet Design",
//         "Video Ad Creation",
//         "Motion Ad Creation",
//         "Dynamic Website (Next.js + TypeScript)",
//         "Social Media Marketing",
//         "Search Engine Optimization (SEO)",
//         "Business Club Listing",
//         "Sources Listing",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "advanced",
//       name: "Advanced Package",
//       price: 57000,
//       description: "Comprehensive marketing and branding suite.",
//       color: "from-purple-500 to-pink-500",
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Brochure / Leaflet Design",
//         "Video Ad Creation",
//         "Motion Ad Creation",
//         "E-commerce Website (No Payment Gateway)",
//         "Social Media Marketing",
//         "Search Engine Optimization (SEO)",
//         "Business Club Listing",
//         "Sources Listing",
//         "Yellow Pages Listing",
//         "Online Directory Listing",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "elite",
//       name: "Elite Package",
//       price: 100000,
//       description: "All-in-one solution for premium business clients.",
//       color: "from-yellow-400 to-orange-400",
//       included: allServices,
//     },
//   ];

//   return (
//     <div className="py-12  min-h-screen ">
//       <div className="max-w-7xl mx-auto text-center mb-12 px-4">
//         <h2 className="text-3xl font-bold mb-3">Business Club Packages</h2>
//         <p className="max-w-2xl mx-auto">
//           Join our Business Club and save up to <strong>50%</strong> on
//           marketing and branding costs! Choose from 5 powerful packages designed
//           to fit your business needs.
//         </p>
//       </div>

//       {/* Pricing cards grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-10 px-6 justify-center">
//         {packages.map((pkg) => (
//           <Card
//             key={pkg.id}
//             className={`relative overflow-hidden bg-[#0B203E] rounded-2xl border border-gray-700 flex flex-col transition-all duration-300 ${
//               pkg.popular
//                 ? "scale-105 shadow-[0_0_25px_rgba(0, 250, 217, 0.4)] z-10 ring-4 ring-cyan-400"
//                 : "hover:scale-105 shadow-lg"
//             }`}
//           >
//             {/* Popular Badge */}
//             {pkg.popular && (
//               <div className="relative w-28 top-3 right-3 bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                 Most Popular
//               </div>
//             )}

//             {/* Curved Top Section */}
//             <div className={`relative bg-gradient-to-r ${pkg.color} h-28`}>
//               <svg
//                 viewBox="0 0 500 150"
//                 preserveAspectRatio="none"
//                 className="absolute bottom-0 left-0 w-full h-[60px]"
//               >
//                 <path
//                   d="M0,50 C150,150 350,0 500,100 L500,0 L0,0 Z"
//                   className="fill-[#0B203E]"
//                 ></path>
//               </svg>

//               <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//                 <h3 className="text-xl font-bold">{pkg.name}</h3>
//                 <p className="text-3xl font-bold mt-1">
//                   ৳ {pkg.price.toLocaleString()}
//                   <span className="text-sm font-normal ml-1">/ one-time</span>
//                 </p>
//               </div>
//             </div>

//             {/* Package Details */}
//             <div className="p-6 flex flex-col flex-1">
//               <p className="text-gray-300 text-sm mb-4 text-center">
//                 {pkg.description}
//               </p>

//               <ul className="space-y-2 mb-6 flex-1 pr-1 ">
//                 {allServices.map((service, index) => {
//                   const included = pkg.included.includes(service);
//                   return (
//                     <li key={index} className="flex items-start gap-2 text-sm">
//                       {included ? (
//                         <Check className="text-green-400 w-4 h-4 mt-1" />
//                       ) : (
//                         <X className="text-red-500 w-4 h-4 mt-1" />
//                       )}
//                       <span className="text-gray-200">{service}</span>
//                     </li>
//                   );
//                 })}
//               </ul>

//               <Button
//                 onClick={() => handleSelectPackage(pkg.id)}
//                 className={`w-full text-white font-semibold py-2 rounded-md bg-gradient-to-r ${pkg.color} hover:opacity-90 mt-auto`}
//               >
//                 {selectedPackage === pkg.id ? "Selected" : "Choose Package"}
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Check, X } from "lucide-react";

// export default function PackagesContent() {
//   const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

//   const handleSelectPackage = (id: string) => {
//     setSelectedPackage(id);
//   };

//   const allServices = [
//     "Domain Registration",
//     "Web Hosting",
//     "Logo Design",
//     "Social Media Poster Design",
//     "Website Graphic Design",
//     "Brochure / Leaflet Design",
//     "Video Ad Creation",
//     "Motion Ad Creation",
//     "Basic Informative Website (5 Pages)",
//     "10–15 Page WordPress Website",
//     "Dynamic Website (Next.js + TypeScript)",
//     "E-commerce Website (No Payment Gateway)",
//     "E-commerce Website with Payment Gateway (+৳25,000)",
//     "Social Media Marketing",
//     "Search Engine Optimization (SEO)",
//     "Business Club Listing",
//     "Sources Listing",
//     "Yellow Pages Listing",
//     "Online Directory Listing",
//     "Web Directory Listing",
//     "Venture Capital Funding Assistance",
//     "Entrepreneur Training",
//     "Premium ID Card With NFC",
//   ];

//   const packages = [
//     {
//       id: "starter",
//       name: "Starter Package",
//       price: 10000,
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Basic Informative Website (5 Pages)",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "growth",
//       name: "Growth Package",
//       price: 25000,
//       popular: true,
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Brochure / Leaflet Design",
//         "Video Ad Creation",
//         "Motion Ad Creation",
//         "10–15 Page WordPress Website",
//         "Social Media Marketing",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "professional",
//       name: "Professional Package",
//       price: 50000,
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Brochure / Leaflet Design",
//         "Video Ad Creation",
//         "Motion Ad Creation",
//         "Dynamic Website (Next.js + TypeScript)",
//         "Social Media Marketing",
//         "Search Engine Optimization (SEO)",
//         "Business Club Listing",
//         "Sources Listing",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "advanced",
//       name: "Advanced Package",
//       price: 57000,
//       included: [
//         "Domain Registration",
//         "Web Hosting",
//         "Logo Design",
//         "Social Media Poster Design",
//         "Website Graphic Design",
//         "Brochure / Leaflet Design",
//         "Video Ad Creation",
//         "Motion Ad Creation",
//         "E-commerce Website (No Payment Gateway)",
//         "Social Media Marketing",
//         "Search Engine Optimization (SEO)",
//         "Business Club Listing",
//         "Sources Listing",
//         "Yellow Pages Listing",
//         "Online Directory Listing",
//         "Premium ID Card With NFC",
//       ],
//     },
//     {
//       id: "elite",
//       name: "Elite Package",
//       price: 100000,
//       included: allServices,
//     },
//   ];

//   return (
//     <div className="py-1 bg-white text-gray-800">
//       <div className="mx-auto text-center mb-12 px-4">
//         <h2 className="text-3xl font-bold mb-3 text-[#2C8845]">
//           Business Club Packages
//         </h2>
//         <p className="max-w-2xl mx-auto text-gray-600">
//           Compare all packages and choose the one that fits your business best.
//           Join our Business Club and save up to <strong>50%</strong> on branding
//           and marketing!
//         </p>
//       </div>

//       <div className="overflow-x-auto px-6">
//         <table className="min-w-full border border-gray-200 text-sm shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-[#2C8845] text-white">
//             <tr>
//               <th className="border border-gray-200 p-3  text-center font-semibold">
//                 Services
//               </th>
//               {packages.map((pkg) => (
//                 <th
//                   key={pkg.id}
//                   className={`border border-gray-200 p-3 text-center ${
//                     pkg.id === "growth"
//                       ? "bg-[#E8F6EE] text-[#2C8845]"
//                       : "bg-[#2C8845]/90"
//                   }`}
//                 >
//                   <div className="flex flex-col items-center">
//                     <span
//                       className={`text-lg font-bold ${
//                         pkg.id === "growth" ? "text-[#2C8845]" : "text-white"
//                       }`}
//                     >
//                       {pkg.name}
//                     </span>
//                     <span
//                       className={`text-sm ${
//                         pkg.id === "growth" ? "text-[#2C8845]" : "text-white/80"
//                       }`}
//                     >
//                       ৳ {pkg.price}
//                     </span>
//                     <Button
//                       onClick={() => handleSelectPackage(pkg.id)}
//                       className={`mt-2 text-xs py-1 px-3 rounded font-semibold ${
//                         selectedPackage === pkg.id
//                           ? "bg-white text-[#2C8845] border border-[#2C8845]"
//                           : pkg.id === "growth"
//                           ? "bg-[#2C8845] text-white hover:bg-[#25973F]"
//                           : "bg-white text-[#2C8845] hover:bg-[#E8F6EE]"
//                       }`}
//                     >
//                       {selectedPackage === pkg.id ? "Selected" : "Choose"}
//                     </Button>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {allServices.map((service, i) => (
//               <tr
//                 key={i}
//                 className={`border-t border-gray-200 ${
//                   i % 2 === 0 ? "bg-white" : "bg-[#F9FBF9]"
//                 }`}
//               >
//                 <td className="p-3 text-left text-gray-700">{service}</td>
//                 {packages.map((pkg) => (
//                   <td
//                     key={pkg.id}
//                     className={`text-center p-3 ${
//                       pkg.id === "growth" ? "bg-[#F1FAF5]" : ""
//                     }`}
//                   >
//                     {pkg.included.includes(service) ? (
//                       <Check className="inline w-4 h-4 text-[#2C8845]" />
//                     ) : (
//                       <X className="inline text-red-400 w-4 h-4" />
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PackagesContent() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id);
  };

  const allServices = [
    "Package Price",
    "Member Type",
    "ID Card",
    "Business Training",
    "SEO Training",
    "SMM Training",
    "SOURCES Business Page",
    "Facebook Page",
    "LinkedIn Page",
    "YouTube Channel",
    "TikTok Profile",
    "Logo Design",
    "Visiting Card Design",
    "Domain (.com)",
    "Web Hosting",
    "Website",
    "eCommerce",
  ];

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "6000/Year (+5% VAT)",
      data: {
        "Package Price": "6000/Year (+5% VAT)",
        "Member Type": "Basic Member",
        "ID Card": "Gray Card",
        "Business Training": "Basic Training",
        "SEO Training": "Basic Training",
        "SMM Training": "Basic Training",
        "SOURCES Business Page": "14 Products",
        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",
        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Domain (.com)": "No",
        "Web Hosting": "No",
        "Website": "No",
        "eCommerce": "No",
      },
    },
    {
      id: "growth",
      name: "Growth",
      price: "12000/Year (+5% VAT)",
      data: {
        "Package Price": "12000/Year (+5% VAT)",
        "Member Type": "Standard Member",
        "ID Card": "Blue Card",
        "Business Training": "Standard Training",
        "SEO Training": "Standard Training",
        "SMM Training": "Standard Training",
        "SOURCES Business Page": "28 Products",
        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",
        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Domain (.com)": "Yes",
        "Web Hosting": "1 GB",
        "Website": "No",
        "eCommerce": "No",
      },
    },
    {
      id: "smart",
      name: "Smart",
      price: "25000/Year (+5% VAT)",
      data: {
        "Package Price": "25000/Year (+5% VAT)",
        "Member Type": "Smart Member",
        "ID Card": "Green Card",
        "Business Training": "Smart Training",
        "SEO Training": "Smart Training",
        "SMM Training": "Smart Training",
        "SOURCES Business Page": "56 Products",
        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",
        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Domain (.com)": "Yes",
        "Web Hosting": "3 GB",
        "Website": "10 Page Website",
        "eCommerce": "No",
      },
    },
    {
      id: "premium",
      name: "Premium",
      price: "50000/Year (+5% VAT)",
      data: {
        "Package Price": "50000/Year (+5% VAT)",
        "Member Type": "Premium Member",
        "ID Card": "Purple Card",
        "Business Training": "Premium Training",
        "SEO Training": "Premium Training",
        "SMM Training": "Premium Training",
        "SOURCES Business Page": "112 Products",
        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",
        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Domain (.com)": "Yes",
        "Web Hosting": "6 GB",
        "Website": "15 Page Website",
        "eCommerce": "Yes",
      },
    },
    {
      id: "elite",
      name: "Elite",
      price: "75000/Year (+5% VAT)",
      data: {
        "Package Price": "75000/Year (+5% VAT)",
        "Member Type": "Elite Member",
        "ID Card": "Gold Card",
        "Business Training": "Elite Training",
        "SEO Training": "Elite Training",
        "SMM Training": "Elite Training",
        "SOURCES Business Page": "224 Products",
        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",
        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Domain (.com)": "Yes",
        "Web Hosting": "10 GB",
        "Website": "20 Page Website",
        "eCommerce": "Yes",
      },
    },
    {
      id: "vip",
      name: "VIP",
      price: "100000/Year (+5% VAT)",
      data: {
        "Package Price": "100000/Year (+5% VAT)",
        "Member Type": "VIP Member",
        "ID Card": "Black Card",
        "Business Training": "VIP Training",
        "SEO Training": "VIP Training",
        "SMM Training": "VIP Training",
        "SOURCES Business Page": "448 Products",
        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",
        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Domain (.com)": "Yes",
        "Web Hosting": "15 GB",
        "Website": "25 Page Website",
        "eCommerce": "Yes",
      },
    },
  ];

  return (
    <div className="py-1 bg-white text-gray-800">
      <div className="mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl font-bold mb-3 text-[#2C8845]">
          Business Club Packages
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Compare all packages and choose the one that fits your business best.
          Join our Business Club and grow your brand visibility effectively!
        </p>
      </div>

      <div className="overflow-x-auto px-6">
        <table className="min-w-full border border-gray-200 text-sm shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#2C8845] text-white">
            <tr>
              <th className="border border-gray-200 p-3 text-center font-semibold">
                Services
              </th>
              {packages.map((pkg) => (
                <th
                  key={pkg.id}
                  className={`border border-gray-200 p-3 text-center ${
                    pkg.id === "smart"
                      ? "bg-[#E8F6EE] text-[#2C8845]"
                      : "bg-[#2C8845]/90 text-white"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-lg font-bold ${
                        pkg.id === "smart" ? "text-[#2C8845]" : "text-white"
                      }`}
                    >
                      {pkg.name}
                    </span>
                    <span
                      className={`text-sm ${
                        pkg.id === "smart" ? "text-[#2C8845]" : "text-white/80"
                      }`}
                    >
                      {pkg.price}
                    </span>
                    <Button
                      onClick={() => handleSelectPackage(pkg.id)}
                      className={`mt-2 text-xs py-1 px-3 rounded font-semibold ${
                        selectedPackage === pkg.id
                          ? "bg-white text-[#2C8845] border border-[#2C8845]"
                          : pkg.id === "smart"
                          ? "bg-[#2C8845] text-white hover:bg-[#25973F]"
                          : "bg-white text-[#2C8845] hover:bg-[#E8F6EE]"
                      }`}
                    >
                      {selectedPackage === pkg.id ? "Selected" : "Choose"}
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {allServices.map((service, i) => (
              <tr
                key={i}
                className={`border-t border-gray-200 ${
                  i % 2 === 0 ? "bg-white" : "bg-[#F9FBF9]"
                }`}
              >
                <td className="p-3 text-left text-gray-700 font-medium">
                  {service}
                </td>
                {packages.map((pkg) => {
                  const value = pkg.data[service as keyof typeof pkg.data];
                  const isYes = value === "Yes";
                  const isNo = value === "No";

                  return (
                    <td
                      key={pkg.id}
                      className={`text-center p-3 ${
                        pkg.id === "smart" ? "bg-[#F1FAF5]" : ""
                      }`}
                    >
                      {isYes ? (
                        <Check className="inline w-4 h-4 text-[#2C8845]" />
                      ) : isNo ? (
                        <X className="inline text-red-400 w-4 h-4" />
                      ) : (
                        <span className="text-gray-700 text-sm">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

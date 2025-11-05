
// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Check, X } from "lucide-react";

// export default function PackagesContent() {
//   const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

//   const handleSelectPackage = (id: string) => {
//     setSelectedPackage(id);
//   };

//   // ✅ Base list of all services
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

//   // ✅ Define which features each package includes
//   const packages = [
//     {
//       id: "starter",
//       name: "Starter Package",
//       description: "Perfect for small businesses starting their journey.",
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
//       description: "For growing businesses looking to expand their presence.",
//       price: 25000,
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
//       description: "Ideal for established companies scaling up operations.",
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
//       description: "Comprehensive marketing and branding suite.",
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
//       description: "All-in-one solution for premium business clients.",
//       price: 100000,
//       included: allServices, // includes everything
//     },
//   ];

//   return (
//     <div className="mb-12">
//       <h2 className="text-2xl font-bold text-foreground mb-6">
//         Business Club Packages
//       </h2>
//       <p className="text-gray-600 mb-8 max-w-2xl">
//         Join our Business Club and save up to <strong>50%</strong> on marketing
//         and branding costs! Choose from 5 powerful packages designed to fit your
//         business needs.
//       </p>

//       {/* ✅ Responsive Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
//         {packages.map((pkg) => (
//           <Card
//             key={pkg.id}
//             className={`relative flex flex-col transition-all ${
//               selectedPackage === pkg.id ? "ring-2 ring-[#2C8845]" : ""
//             }`}
//           >
//             {pkg.id === "professional" && (
//               <Badge className="absolute top-4 right-4 bg-[#2C8845] text-white">
//                 Popular
//               </Badge>
//             )}

//             <CardHeader>
//               <CardTitle className="text-xl">{pkg.name}</CardTitle>
//               <CardDescription>{pkg.description}</CardDescription>
//               <div className="mt-4">
//                 <span className="text-4xl font-bold text-foreground">
//                   ৳ {pkg.price.toLocaleString()}
//                 </span>
//                 <span className="text-muted-foreground ml-2">/ one-time</span>
//               </div>
//             </CardHeader>

//             <CardContent className="flex-1 flex flex-col overflow-hidden">
//               <ul className="space-y-2 mb-6 flex-1   pr-1">
//                 {allServices.map((service, index) => {
//                   const isIncluded = pkg.included.includes(service);
//                   return (
//                     <li key={index} className="flex items-start gap-3">
//                       {isIncluded ? (
//                         <Check
//                           size={18}
//                           className="text-[#2C8845] flex-shrink-0 mt-1"
//                         />
//                       ) : (
//                         <X
//                           size={18}
//                           className="text-red-700 flex-shrink-0 mt-1"
//                         />
//                       )}
//                       <span className="text-sm text-foreground">
//                         {service}
//                       </span>
//                     </li>
//                   );
//                 })}
//               </ul>

//               <Button
//                 className="w-full bg-[#2C8845] hover:bg-[#1f6230] text-white"
//                 onClick={() => handleSelectPackage(pkg.id)}
//               >
//                 {selectedPackage === pkg.id ? "Selected" : "Choose Package"}
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PackagesContent() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id);
  };

  // ✅ All services (unchanged)
  const allServices = [
    "Domain Registration",
    "Web Hosting",
    "Logo Design",
    "Social Media Poster Design",
    "Website Graphic Design",
    "Brochure / Leaflet Design",
    "Video Ad Creation",
    "Motion Ad Creation",
    "Basic Informative Website (5 Pages)",
    "10–15 Page WordPress Website",
    "Dynamic Website (Next.js + TypeScript)",
    "E-commerce Website (No Payment Gateway)",
    "E-commerce Website with Payment Gateway (+৳25,000)",
    "Social Media Marketing",
    "Search Engine Optimization (SEO)",
    "Business Club Listing",
    "Sources Listing",
    "Yellow Pages Listing",
    "Online Directory Listing",
    "Web Directory Listing",
    "Venture Capital Funding Assistance",
    "Entrepreneur Training",
    "Premium ID Card With NFC",
  ];

  // ✅ Define packages (your data)
  const packages = [
    {
      id: "starter",
      name: "Starter Package",
      price: 10000,
      description: "Perfect for small businesses starting their journey.",
      color: "from-orange-500 to-red-500",
      included: [
        "Domain Registration",
        "Web Hosting",
        "Logo Design",
        "Social Media Poster Design",
        "Website Graphic Design",
        "Basic Informative Website (5 Pages)",
        "Premium ID Card With NFC",
      ],
    },
    {
      id: "growth",
      name: "Growth Package",
      price: 25000,
      description: "For growing businesses looking to expand their presence.",
      color: "from-teal-400 to-cyan-500",
      included: [
        "Domain Registration",
        "Web Hosting",
        "Logo Design",
        "Social Media Poster Design",
        "Website Graphic Design",
        "Brochure / Leaflet Design",
        "Video Ad Creation",
        "Motion Ad Creation",
        "10–15 Page WordPress Website",
        "Social Media Marketing",
        "Premium ID Card With NFC",
      ],
    },
    {
      id: "professional",
      name: "Professional Package",
      price: 50000,
      description: "Ideal for established companies scaling up operations.",
      color: "from-blue-500 to-indigo-500",
      included: [
        "Domain Registration",
        "Web Hosting",
        "Logo Design",
        "Social Media Poster Design",
        "Website Graphic Design",
        "Brochure / Leaflet Design",
        "Video Ad Creation",
        "Motion Ad Creation",
        "Dynamic Website (Next.js + TypeScript)",
        "Social Media Marketing",
        "Search Engine Optimization (SEO)",
        "Business Club Listing",
        "Sources Listing",
        "Premium ID Card With NFC",
      ],
    },
    {
      id: "advanced",
      name: "Advanced Package",
      price: 57000,
      description: "Comprehensive marketing and branding suite.",
      color: "from-purple-500 to-pink-500",
      included: [
        "Domain Registration",
        "Web Hosting",
        "Logo Design",
        "Social Media Poster Design",
        "Website Graphic Design",
        "Brochure / Leaflet Design",
        "Video Ad Creation",
        "Motion Ad Creation",
        "E-commerce Website (No Payment Gateway)",
        "Social Media Marketing",
        "Search Engine Optimization (SEO)",
        "Business Club Listing",
        "Sources Listing",
        "Yellow Pages Listing",
        "Online Directory Listing",
        "Premium ID Card With NFC",
      ],
    },
    {
      id: "elite",
      name: "Elite Package",
      price: 100000,
      description: "All-in-one solution for premium business clients.",
      color: "from-yellow-400 to-orange-400",
      included: allServices,
    },
  ];

  return (
    <div className="py-12   min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl font-bold mb-3">Business Club Packages</h2>
        <p className=" max-w-2xl mx-auto">
          Join our Business Club and save up to <strong>50%</strong> on
          marketing and branding costs! Choose from 5 powerful packages designed
          to fit your business needs.
        </p>
      </div>

      {/*  Pricing cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 px-6 justify-center">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className="relative overflow-hidden bg-[#0B203E] rounded-2xl shadow-2xl border border-gray-700 transition-transform hover:scale-105 flex flex-col"
          >
            {/* Curved Top Section */}
            <div className={`relative bg-gradient-to-r ${pkg.color} h-28`}>
              <svg
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 w-full h-[60px]"
              >
                <path
                  d="M0,50 C150,150 350,0 500,100 L500,0 L0,0 Z"
                  className="fill-[#0B203E]"
                ></path>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className="text-3xl font-bold mt-1">
                  ৳ {pkg.price.toLocaleString()}
                  <span className="text-sm font-normal ml-1">/ one-time</span>
                </p>
              </div>
            </div>

            {/* Package Details */}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-gray-300 text-sm mb-4 text-center">
                {pkg.description}
              </p>

              <ul className="space-y-2 mb-6 flex-1  pr-1">
                {allServices.map((service, index) => {
                  const included = pkg.included.includes(service);
                  return (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      {included ? (
                        <Check className="text-green-400 w-4 h-4 mt-1" />
                      ) : (
                        <X className="text-red-500 w-4 h-4 mt-1" />
                      )}
                      <span className="text-gray-200">{service}</span>
                    </li>
                  );
                })}
              </ul>

              <Button
                onClick={() => handleSelectPackage(pkg.id)}
                className={`w-full text-white font-semibold py-2 rounded-md bg-gradient-to-r ${pkg.color} hover:opacity-90 mt-auto`}
              >
                {selectedPackage === pkg.id ? "Selected" : "Choose Package"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

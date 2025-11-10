// // app/PricingTablePage/page.tsx

// // 1. Import the PricingTable component
// import PricingTable from '@/components/PricingTable/PricingTable'; 

// // 2. Import the data from your data file
// // Ensure the path is correct based on your project structure, e.g., '@/lib/pricingData'
// import { packages, features, pricingTitle } from '@/lib/pricingData'; 

// // This is the actual page component for the /PricingTablePage route
// export default function PricingTablePage() {
//   return (
//     // 3. Pass the imported data as props to the PricingTable component
//     // If any of these are undefined, the PricingTable will throw the error.
//     <PricingTable
//       title={pricingTitle}
//       packages={packages} // <-- This must be a defined array
//       features={features} // <-- This must be a defined array
//     />
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
    <div className="py-1 bg-white text-gray-800 container mx-auto">
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
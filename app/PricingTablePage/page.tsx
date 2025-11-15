"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Menu,
  X as Close,
} from "lucide-react";
import Image from "next/image";
import {
  categories as districtCategories,
  businessCategories,
} from "@/lib/data";

export default function PackagesContent() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [openDivision, setOpenDivision] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectPackage = (id: string) => setSelectedPackage(id);
  // Section headings (non-data rows)
  const sectionHeaders = [
    "Basic Services",
    "Training Program",
    "Platform Setup for Online Presence",
    "Platform Setup for Digital Marketing",
    "Graphic Design Services",
    "Digital Marketing Services",
    "Content Writing Services",
    "Video Creation",
    "Business Consultancy",
  ];

  // All rows (services)
  const allServices = [
    // Basic Services
    "Package Price",
    "Member Type",
    "ID Card",
    // Training Program
    "Business Training",
    "SEO Training",
    "SMM Training",
    // Platform Setup for Online Presence
    "SOURCES Page",
    "Domain (.com)",
    "Web Hosting",
    "Business Website",
    "eCommerce Website",
    // Platform Setup for Digital Marketing
    "Facebook Page",
    "LinkedIn Page",
    "YouTube Channel",
    "TikTok Profile",
    // Graphic Design Services
    "Logo Design",
    "Visiting Card Design",
    "Social Media Design",
    // Digital Marketing Services
    "SMM Service",
    "SEO Service",
    "Press Release",
    // Content Writing Services
    "Blog Writing Service",
    "Website Content Writing",
    // Video Creation
    "Video Ad",
    "Motion Ad",
    // Business Consultancy
    "Consultancy",
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

        "SOURCES Page": "14 Products",
        "Domain (.com)": "No",
        "Web Hosting": "No",
        "Business Website": "No",
        "eCommerce Website": "No",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "No",

        "SMM Service": "No",
        "SEO Service": "No",
        "Press Release": "No",

        "Blog Writing Service": "No",
        "Website Content Writing": "No",

        "Video Ad": "No",
        "Motion Ad": "No",

        Consultancy: "1 Hour",
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

        "SOURCES Page": "28 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "1 GB",
        "Business Website": "No",
        "eCommerce Website": "No",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "24 Designs",

        "SMM Service": "Yes",
        "SEO Service": "No",
        "Press Release": "No",

        "Blog Writing Service": "No",
        "Website Content Writing": "No",

        "Video Ad": "No",
        "Motion Ad": "No",

        Consultancy: "2 Hours",
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

        "SOURCES Page": "56 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "3 GB",
        "Business Website": "10 Page Website",
        "eCommerce Website": "No",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "48 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "1",

        "Blog Writing Service": "10,000 Words",
        "Website Content Writing": "5000 Words",

        "Video Ad": "1",
        "Motion Ad": "1",

        Consultancy: "3 Hours",
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

        "SOURCES Page": "112 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "6 GB",
        "Business Website": "15 Page Website",
        "eCommerce Website": "Yes",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "96 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "2",

        "Blog Writing Service": "20,000 Words",
        "Website Content Writing": "10,000 Words",

        "Video Ad": "2",
        "Motion Ad": "2",

        Consultancy: "4 Hours",
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

        "SOURCES Page": "224 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "10 GB",
        "Business Website": "20 Page Website",
        "eCommerce Website": "Yes",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "192 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "3",

        "Blog Writing Service": "20,000 Words",
        "Website Content Writing": "10,000 Words",

        "Video Ad": "3",
        "Motion Ad": "3",

        Consultancy: "5 Hours",
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

        "SOURCES Page": "448 Products",
        "Domain (.com)": "Yes",
        "Web Hosting": "15 GB",
        "Business Website": "25 Page Website",
        "eCommerce Website": "Yes",

        "Facebook Page": "Yes",
        "LinkedIn Page": "Yes",
        "YouTube Channel": "Yes",
        "TikTok Profile": "Yes",

        "Logo Design": "Yes",
        "Visiting Card Design": "Yes",
        "Social Media Design": "384 Designs",

        "SMM Service": "Yes",
        "SEO Service": "Yes",
        "Press Release": "4",

        "Blog Writing Service": "50,000 Words",
        "Website Content Writing": "25,000 Words",

        "Video Ad": "4",
        "Motion Ad": "4",

        Consultancy: "6 Hours",
      },
    },
  ];

  // Mapping services to sections for header grouping
  const groupedServices = {
    "Basic Services": ["Package Price", "Member Type", "ID Card"],
    "Training Program": ["Business Training", "SEO Training", "SMM Training"],
    "Platform Setup for Online Presence": [
      "SOURCES Page",
      "Domain (.com)",
      "Web Hosting",
      "Business Website",
      "eCommerce Website",
    ],
    "Platform Setup for Digital Marketing": [
      "Facebook Page",
      "LinkedIn Page",
      "YouTube Channel",
      "TikTok Profile",
    ],
    "Graphic Design Services": [
      "Logo Design",
      "Visiting Card Design",
      "Social Media Design",
    ],
    "Digital Marketing Services": [
      "SMM Service",
      "SEO Service",
      "Press Release",
    ],
    "Content Writing Services": [
      "Blog Writing Service",
      "Website Content Writing",
    ],
    "Video Creation": ["Video Ad", "Motion Ad"],
    "Business Consultancy": ["Consultancy"],
  };

  return (
    <section className="flex relative bg-white">
      {/* Sidebar */}
      <aside
        className={`bg-[#2C8845] text-white w-64 fixed left-0 top-0 h-screen overflow-y-auto z-40 rounded-tr-xl transform transition-transform duration-300
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <style jsx>{`
          aside::-webkit-scrollbar {
            display: none;
          }
          aside {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Mobile & Medium Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-green-600 md:flex lg:hidden">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={() => setMenuOpen(false)}>
            <Close className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4 md:mt-4 lg:mt-32">
          {/* Sidebar content */}
          <button className="w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg bg-green-800 border-2 border-white">
            All Business
          </button>

          {/* Business Type */}
          <div className="mb-6 border-b border-green-600 pb-4">
            <h3 className="text-lg font-semibold mb-2">Business Type</h3>
            <div className="space-y-1">
              {businessCategories.map((type) => (
                <button
                  key={type.name}
                  className="w-full text-left px-2 py-2 text-sm font-medium rounded-md hover:bg-green-600/80 transition"
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Districts */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Location (District)</h3>
            {districtCategories.map((division) => (
              <div key={division.division} className="mt-1">
                <button
                  onClick={() =>
                    setOpenDivision(
                      openDivision === division.division
                        ? ""
                        : division.division
                    )
                  }
                  className="w-full flex justify-between items-center text-left px-2 py-2 text-sm font-bold bg-green-600 hover:bg-green-500 rounded-md transition"
                >
                  {division.division} Division
                  {openDivision === division.division ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>

                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight:
                      openDivision === division.division
                        ? `${division.districts.length * 32}px`
                        : "0px",
                  }}
                >
                  <div className="py-1">
                    {division.districts.map((district) => (
                      <button
                        key={district}
                        className="w-full text-left pl-5 py-1.5 text-xs rounded-md hover:bg-green-700/70 transition"
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile open button */}
      {/* Hamburger Button (always visible on md and below) */}
      {/* Hamburger Button (visible on md and below) */}
      {/* <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 left-4 bg-[#2C8845] text-white p-2 rounded-md shadow-md z-50 md:block lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button> */}

      {/* Hamburger Button (always visible on md and below) */}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="fixed top-4 left-4 bg-[#2C8845] text-white p-2 rounded-md shadow-md z-50 md:block lg:hidden"
>
  {menuOpen ? (
    <X className="w-6 h-6" /> // Cross icon when sidebar is open
  ) : (
    <Menu className="w-6 h-6" /> // Hamburger icon when sidebar is closed
  )}
</button>


      {/* Main Content */}

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-36 mt-16">
        {/* Small devices: stacked view */}
        {/* <div className="md:hidden">
          {Object.entries(groupedServices).map(([section, services]) => (
            <div key={section} className="mb-6">
              <h2 className="text-[#2C8845] font-semibold text-lg mb-2">
                {section}
              </h2>
              {services.map((service) => (
                <div
                  key={service}
                  className="border border-gray-200 rounded-lg mb-2 p-3 bg-white shadow-sm"
                >
                  <p className="font-medium text-gray-700">{service}</p>
                  {packages.map((pkg) => {
                    const value = pkg.data[service as keyof typeof pkg.data];
                    const isYes = value === "Yes";
                    const isNo = value === "No";
                    return (
                      <div key={pkg.id} className="flex justify-between mt-1">
                        <span className="font-semibold">{pkg.name}</span>
                        <span>
                          {isYes ? (
                            <Check className="inline w-4 h-4 text-[#2C8845]" />
                          ) : isNo ? (
                            <X className="inline text-red-400 w-4 h-4" />
                          ) : (
                            value
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div> */}

        {/* Mobile stacked view */}
        <div className="md:hidden px-4 mt-16">
          {Object.entries(groupedServices).map(([section, services]) => (
            <div key={section} className="mb-6">
              {/* Section Header */}
              <h2 className="text-[#2C8845] font-bold text-xl mb-2">
                {section}
              </h2>

              {/* Packages */}
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-4 mb-4 shadow-sm ${
                    pkg.id === "smart" ? "bg-[#E8F6EE]" : "bg-white"
                  }`}
                >
                  {/* Package Name and Price */}
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`font-bold text-lg ${
                        pkg.id === "smart" ? "text-[#2C8845]" : "text-gray-800"
                      }`}
                    >
                      {pkg.name}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        pkg.id === "smart" ? "text-[#2C8845]" : "text-gray-700"
                      }`}
                    >
                      {pkg.price}
                    </span>
                  </div>

                  {/* ID Card and Member Type */}
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">ID Card:</span>
                    <span className="text-sm">{pkg.data["ID Card"]}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Member Type:</span>
                    <span className="text-sm">{pkg.data["Member Type"]}</span>
                  </div>

                  {/* Services */}
                  <div className="mt-2 border-t pt-2">
                    {services.map((service) => {
                      const value = pkg.data[service as keyof typeof pkg.data];
                      const isYes = value === "Yes";
                      const isNo = value === "No";
                      return (
                        <div
                          key={service}
                          className="flex justify-between text-sm py-1"
                        >
                          <span>{service}</span>
                          <span>
                            {isYes ? (
                              <Check className="inline w-4 h-4 text-[#2C8845]" />
                            ) : isNo ? (
                              <X className="inline w-4 h-4 text-red-400" />
                            ) : (
                              value
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Select Button */}
                  <Button
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`mt-3 w-full text-xs py-1 rounded font-semibold ${
                      selectedPackage === pkg.id
                        ? "bg-[#2C8845] text-white border border-[#2C8845]"
                        : pkg.id === "smart"
                        ? "bg-[#2C8845] text-white hover:bg-[#25973F]"
                        : "bg-white text-[#2C8845] hover:bg-[#E8F6EE]"
                    }`}
                  >
                    {selectedPackage === pkg.id ? "Selected" : "Choose"}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Medium & Large devices: table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#2C8845] text-white">
              <tr>
                <th className="border border-gray-200 px-2 py-2 text-center font-semibold text-xs md:text-sm">
                  Services
                </th>
                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className={`border border-gray-200 px-2 py-2 text-center ${
                      pkg.id === "smart"
                        ? "bg-[#E8F6EE] text-[#2C8845]"
                        : "bg-[#2C8845]/90 text-white"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span
                        className={`font-bold text-xs md:text-sm ${
                          pkg.id === "smart" ? "text-[#2C8845]" : "text-white"
                        }`}
                      >
                        {pkg.name}
                      </span>
                      <span
                        className={`text-[10px] md:text-xs ${
                          pkg.id === "smart"
                            ? "text-[#2C8845]"
                            : "text-white/80"
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <Button
                        onClick={() => handleSelectPackage(pkg.id)}
                        className={`mt-1 text-[10px] md:text-xs py-1 px-2 rounded font-semibold ${
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
              {Object.entries(groupedServices).map(([section, services]) => (
                <React.Fragment key={section}>
                  <tr className="bg-gray-100">
                    <td
                      colSpan={packages.length + 1}
                      className="px-2 py-2 font-semibold text-[#2C8845] text-center text-xs md:text-sm uppercase tracking-wide"
                    >
                      {section}
                    </td>
                  </tr>
                  {services.map((service, i) => (
                    <tr
                      key={service}
                      className={`border-t border-gray-200 ${
                        i % 2 === 0 ? "bg-white" : "bg-[#F9FBF9]"
                      }`}
                    >
                      <td className="px-2 py-1 text-left text-gray-700 font-medium text-[10px] md:text-sm">
                        {service}
                      </td>
                      {packages.map((pkg) => {
                        const value =
                          pkg.data[service as keyof typeof pkg.data];
                        const isYes = value === "Yes";
                        const isNo = value === "No";
                        return (
                          <td
                            key={pkg.id}
                            className={`px-2 py-1 text-center text-[10px] md:text-sm ${
                              pkg.id === "smart" ? "bg-[#F1FAF5]" : ""
                            }`}
                          >
                            {isYes ? (
                              <Check className="inline w-4 h-4 text-[#2C8845]" />
                            ) : isNo ? (
                              <X className="inline text-red-400 w-4 h-4" />
                            ) : (
                              <span className="text-gray-700">{value}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

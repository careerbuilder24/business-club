
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PackagesContent() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id);
  };

  // ✅ Base list of all services
  const allServices = [
    "Domain Registration",
    "Web Hosting",
    "Logo Design",
    "Social Media Poster Design",
    "Website Graphic Design",
    "Brochure / Leaflet Design",
    "Video Ad Creation",
    "Motion Ad Creation",
    "Business Website",
    "E-commerce Website",
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

  //  Package definitions with included services
  const packages = [
    {
      id: "starter",
      name: "Starter Package",
      description: "Perfect for small businesses starting their journey.",
      price: 10000,
      included: allServices.slice(0, 5).concat("Premium ID Card With NFC"),
    },
    {
      id: "growth",
      name: "Growth Package",
      description: "For growing businesses looking to expand their presence.",
      price: 25000,
      included: allServices.slice(0, 9).concat("Premium ID Card With NFC"),
    },
    {
      id: "professional",
      name: "Professional Package",
      description: "Ideal for established companies scaling up operations.",
      price: 50000,
      included: allServices.slice(0, 13).concat("Premium ID Card With NFC"),
    },
    {
      id: "advanced",
      name: "Advanced Package",
      description: "Comprehensive marketing and branding suite.",
      price: 57000,
      included: allServices.slice(0, 16).concat("Premium ID Card With NFC"),
    },
    {
      id: "elite",
      name: "Elite Package",
      description: "All-in-one solution for premium business clients.",
      price: 100000,
      included: allServices,
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Business Club Packages
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Join our Business Club and save up to <strong>50%</strong> on marketing
        and branding costs! Choose from 5 powerful packages designed to fit your
        business needs.
      </p>

      {/*  Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative flex flex-col transition-all ${
              selectedPackage === pkg.id ? "ring-2 ring-[#2C8845]" : ""
            }`}
          >
            {pkg.id === "professional" && (
              <Badge className="absolute top-4 right-4 bg-[#2C8845] text-white">
                Popular
              </Badge>
            )}

            <CardHeader>
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">
                  ৳ {pkg.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground ml-2">/ one-time</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/*  Show all services with only red  for excluded */}
              <ul className="space-y-3 mb-6 flex-1">
                {allServices.map((service, index) => {
                  const isIncluded = pkg.included.includes(service);
                  return (
                    <li key={index} className="flex items-start gap-3">
                      {isIncluded ? (
                        <Check
                          size={18}
                          className="text-[#2C8845] flex-shrink-0 mt-1"
                        />
                      ) : (
                        <X
                          size={18}
                          className="text-red-700 flex-shrink-0 mt-1"
                        />
                      )}
                      <span className="text-sm text-foreground">
                        {service}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Button
                className="w-full bg-[#2C8845] hover:bg-[#1f6230] text-white"
                onClick={() => handleSelectPackage(pkg.id)}
              >
                {selectedPackage === pkg.id ? "Selected" : "Choose Package"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

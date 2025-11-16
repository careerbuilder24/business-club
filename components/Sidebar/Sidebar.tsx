
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
// The import path for '@/lib/data' was causing an error in this environment.
// I have commented out the external import and included placeholder data below
// to ensure the component is fully runnable and responsive.
// import {
//   categories as districtCategories,
//   businessCategories,
// } from "@/lib/data";


// --- PLACEHOLDER DATA (to fix the import error) ---
const districtCategories = [
  {
    division: "Dhaka",
    districts: ["Dhaka North", "Dhaka South", "Gazipur", "Narayanganj"],
  },
  {
    division: "Chattogram",
    districts: ["Chattogram Sadar", "Cox's Bazar", "Cumilla"],
  },
  {
    division: "Khulna",
    districts: ["Khulna City", "Bagerhat", "Jessore"],
  },
];

const businessCategories = [
  { name: "Manufacturer" },
  { name: "Supplier" },
  { name: "Buying House" },
  { name: "Dealer" },
  { name: "Trader" },
  { name: "Importer" },
  { name: "Exporter" },
];
// ----------------------------------------------------


export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDivision, setOpenDivision] = useState("");

  // This button is now visible up to and including 'md' screens, hidden only on 'lg' and up.
  const MobileMenuButton = (
    <button
      onClick={() => setMenuOpen(true)}
      // Changed md:hidden to lg:hidden to show button on medium devices
      className="fixed bottom-4 left-4 lg:hidden bg-[#2C8845] text-white p-2 rounded-md shadow-lg z-20"
      aria-label="Open filter menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  );

  return (
    <>
      {MobileMenuButton}

      {/* Mobile Overlay (Visible on sm and md when menu is open) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar / Filters */}
      <aside
        className={`bg-[#008236] text-white w-64 fixed top-[140px] left-0
        h-[calc(100vh-115px)] overflow-y-auto transition-transform duration-300 z-50 
        ${menuOpen 
          ? "translate-x-0" 
          // Sidebar is now hidden by default on 'sm' and 'md' devices (-translate-x-full),
          // and only permanently visible (translate-x-0) from the 'lg' breakpoint up.
          : "-translate-x-full lg:translate-x-0"}`
        }
        aria-label="Business filters"
      >
        {/* FIX: Changed <style jsx> to a standard <style> tag to resolve the React warning */}
        <style>{`
          aside::-webkit-scrollbar {
            display: none;
          }
          aside {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Mobile Header (Close Button) - Visible on sm and md, hidden on lg and up */}
        <div className="lg:hidden flex justify-between items-center px-4 py-3 border-b border-green-600">
          <h2 className="font-semibold text-lg">Browse Filters</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4">
          {/* All Business Button */}
          <div className="p-4">
            <button className="w-full text-center px-4 py-3 mb-4 cursor-pointer transition-colors text-lg font-bold rounded-lg bg-green-800 border-2 border-white">
              All Business
            </button>
          </div>

          {/* Business Type Section */}
          <div className="mb-6 border-b border-green-600 pb-4">
            <h3 className="text-lg font-semibold mb-2">Business Type</h3>
            <nav>
              <div className="space-y-1">
                {businessCategories.map((type) => (
                  <button
                    key={type.name}
                    className="w-full text-left px-2 py-2 text-sm font-medium rounded-md hover:bg-green-600/80 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* District Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Location by District</h3>
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
                  aria-expanded={openDivision === division.division}
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
                  className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight:
                      openDivision === division.division
                        ? `${division.districts.length * 32}px`
                        : "0px",
                  }}
                >
                  <nav className="py-1">
                    {division.districts.map((district) => (
                      <button
                        key={district}
                        className="w-full text-left pl-5 py-1.5 text-xs rounded-md hover:bg-green-700/70 transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        {district}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
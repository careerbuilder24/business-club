// "use client";

// import { useState } from "react";
// // We use interfaces and types to resolve the 'implicit any' errors, which is standard practice in TypeScript/TSX.
// import { Check, ChevronDown, ChevronUp, Menu, X, Search } from "lucide-react";
// import { SetStateAction, Dispatch } from "react"; // Importing types for setState

// // --- TYPE DEFINITIONS ---
// interface BusinessItem {
//   name: string;
//   count: number;
// }

// interface FilterItemProps {
//   name: string;
//   count: number;
//   isSelected: boolean;
//   onToggle: (name: string) => void;
//   showCount?: boolean;
// }
// // ------------------------

// // --- FULL LIST OF CATEGORIES (RENAMED TO INDUSTRY) ---
// const ALL_CATEGORIES: BusinessItem[] = [
//   { name: "Agriculture Farm", count: 34 },
//   { name: "Aquarium Fish Farm", count: 4 },
//   { name: "Automotive Industry", count: 123 },
//   { name: "Banks", count: 0 },
//   { name: "Beauty Parlor & Spa", count: 0 },
//   { name: "Blogs & Magazines", count: 0 },
//   { name: "Brassware Industry", count: 0 },
//   { name: "Buying House", count: 12 },
//   { name: "Cement Factory", count: 0 },
//   { name: "Ceramics Factory", count: 1 },
//   { name: "Chemical Factory", count: 2 },
//   { name: "Cleaning Agency", count: 8 },
//   { name: "Coaching Center", count: 2 },
//   { name: "Construction Firm", count: 6 },
//   { name: "Construction Materials", count: 3 },
//   { name: "Consulting Firms", count: 1 },
//   { name: "Cottage Industry", count: 1 },
//   { name: "Courier Service", count: 1 },
//   { name: "Day Care Center", count: 0 },
//   { name: "Diagnostic Centers", count: 3 },
//   { name: "Ecommerce", count: 48 },
//   { name: "Education Institute", count: 8 },
//   { name: "Electronics Industry", count: 16 },
//   { name: "Engineering Workshop", count: 4 },
//   { name: "Event Management Firm", count: 0 },
//   { name: "Fashion House", count: 39 },
//   { name: "Fast Food & Restaurant", count: 2 },
//   { name: "Fertiliser Factory", count: 0 },
//   { name: "Financial Company", count: 1 },
//   { name: "Fisheries", count: 0 },
//   { name: "Food Factory", count: 27 },
//   { name: "Furniture Company", count: 6 },
//   { name: "Garments Factory", count: 16 },
//   { name: "Glass Factory", count: 1 },
//   { name: "Grocery Shop", count: 10 },
//   { name: "Gym", count: 0 },
//   { name: "Handicraft Company", count: 2 },
//   { name: "Handloon Industry", count: 0 },
//   { name: "Hatchery", count: 10 },
//   { name: "Health Care Company", count: 10 },
//   { name: "Home Appliance Company", count: 5 },
//   { name: "Home Builders", count: 1 },
//   { name: "Homeo Clinic", count: 3 },
//   { name: "Hotel", count: 1 },
//   { name: "Interior Design Firm", count: 0 },
//   { name: "Interior Firm", count: 5 },
//   { name: "Internet Service Provider", count: 1 },
//   { name: "IT Firm", count: 13 },
//   { name: "Jewellery Factory", count: 0 },
//   { name: "Jewelry Company", count: 2 },
//   { name: "Jute Factory", count: 1 },
//   { name: "Law Firms", count: 2 },
//   { name: "Leather Factory", count: 6 },
//   { name: "Life Insurance", count: 0 },
//   { name: "Machine Industry", count: 4 },
//   { name: "Madrasha", count: 1 },
//   { name: "Maid Agency", count: 1 },
//   { name: "Marine Industry", count: 0 },
//   { name: "Marketing Agency", count: 4 },
//   { name: "Marriage Media", count: 5 },
//   { name: "Medical Equipment Suppliers", count: 4 },
//   { name: "Mosquito Coil Factory", count: 0 },
//   { name: "Motor Vehicle Service", count: 1 },
//   { name: "Music Industry", count: 0 },
//   { name: "Newspaper", count: 4 },
//   { name: "Pearl Farm", count: 0 },
//   { name: "Pet Shop", count: 0 },
//   { name: "Petroleum Industry", count: 0 },
//   { name: "Pharmaceutical Industry", count: 0 },
//   { name: "Photo Studio", count: 0 },
//   { name: "Physical Therapy Center", count: 1 },
//   { name: "Poultry Farm", count: 1 },
//   { name: "Printing Press", count: 2 },
//   { name: "Publications", count: 2 },
//   { name: "Pulp & Paper Company", count: 1 },
//   { name: "Real Estate Company", count: 3 },
//   { name: "Resorts", count: 0 },
//   { name: "Restaurant", count: 0 },
//   { name: "Salon & Spa", count: 0 },
//   { name: "Sanitary Agency", count: 1 },
//   { name: "School & College", count: 2 },
//   { name: "Security Company", count: 2 },
//   { name: "Service Company", count: 13 },
//   { name: "Shoe Factory", count: 2 },
//   { name: "Steel Factory", count: 1 },
//   { name: "Tea Industry", count: 3 },
//   { name: "Telecommunications", count: 4 },
//   { name: "Textile Industry", count: 4 },
//   { name: "Transport Company", count: 1 },
//   { name: "Travel Agency", count: 4 },
//   { name: "University", count: 0 },
//   { name: "Veterinary Farm", count: 2 },
// ];
// // ----------------------------------------------------

// // --- ORIGINAL BUSINESS TYPE DATA (Now consistent with BusinessItem interface) ---
// const BUSINESS_TYPES: BusinessItem[] = [
//   { name: "Manufacturer", count: 0 }, // Added count property
//   { name: "Supplier", count: 0 }, // Added count property
//   { name: "Buying House", count: 0 }, // Added count property
//   { name: "Dealer", count: 0 }, // Added count property
//   { name: "Trader", count: 0 }, // Added count property
//   { name: "Importer", count: 0 }, // Added count property
//   { name: "Exporter", count: 0 }, // Added count property
// ];
// // ----------------------------------------------------

// // --- ORIGINAL PLACEHOLDER DATA (District section remains the same) ---
// const districtCategories = [
//   {
//     division: "Dhaka",
//     districts: ["Dhaka North", "Dhaka South", "Gazipur", "Narayanganj"],
//   },
//   {
//     division: "Chattogram",
//     districts: ["Chattogram Sadar", "Cox's Bazar", "Cumilla"],
//   },
//   {
//     division: "Khulna",
//     districts: ["Khulna City", "Bagerhat", "Jessore"],
//   },
// ];
// // ----------------------------------------------------

// // Helper Component for both Business Type and Industry items
// // FIX: Added FilterItemProps type to component definition
// const FilterItem = ({
//   name,
//   count,
//   isSelected,
//   onToggle,
//   showCount = true,
// }: FilterItemProps) => (
//   <button
//     key={name}
//     className="w-full flex items-center justify-between text-left pr-1 pl-2 py-1.5 text-sm rounded-md hover:bg-green-600/80 transition"
//     // Use onToggle to handle selection logic
//     onClick={() => onToggle(name)}
//   >
//     <div className="flex items-center space-x-2 font-light">
//       {/* Custom styled checkbox with Check icon when selected */}
//       <div
//         className={`h-4 w-4 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors 
//         ${
//           isSelected ? "bg-white border-white" : "bg-transparent border-white"
//         }`}
//       >
//         {/* Lucide Check icon - visible only when selected */}
//         {isSelected && <Check size={12} className="text-[#008236]" />}
//       </div>
//       <span>{name}</span>
//     </div>
//     {/* Show count only for Industry items */}
//     {showCount && (
//       <span
//         className={`text-[11px] font-medium px-2 py-[1px] rounded-full ${
//           count > 0 ? "bg-green-700" : "bg-green-800 opacity-60"
//         }`}
//       >
//         ({count})
//       </span>
//     )}
//   </button>
// );

// export default function Sidebar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openDivision, setOpenDivision] = useState("");
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

//   // New states for filter selection and search query
//   const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>(
//     []
//   );
//   const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Generic toggle function for managing filter state arrays
//   // FIX: Added explicit types for setState and name to resolve 'implicit any'
//   const toggleSelection = (
//     setState: Dispatch<SetStateAction<string[]>>,
//     name: string
//   ) => {
//     setState((prev) =>
//       prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
//     );
//   };

//   const toggleBusinessType = (name: string) =>
//     toggleSelection(setSelectedBusinessTypes, name); // FIX: Added type to name
//   const toggleIndustry = (name: string) =>
//     toggleSelection(setSelectedIndustries, name); // FIX: Added type to name

//   const MobileMenuButton = (
//     <button
//       onClick={() => setMenuOpen(true)}
//       className="fixed bottom-4 left-4 lg:hidden bg-[#2C8845] text-white p-2 rounded-xl shadow-lg z-20 transition-all duration-300 transform hover:scale-105"
//       aria-label="Open filter menu"
//     >
//       <Menu className="w-6 h-6" />
//     </button>
//   );

//   return (
//     <>
//       {MobileMenuButton}

//       {/* Mobile Overlay (Visible on sm and md when menu is open) */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar / Filters */}
//       <aside
//         className={`bg-[#008236] text-white w-64 fixed top-[140px] left-0
//         h-[calc(100vh-115px)] overflow-y-auto transition-transform duration-300 z-50 
//         shadow-2xl 
//         ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//         aria-label="Business filters"
//       >
//         <style>{`
//           /* Hide scrollbar for aesthetics */
//           aside::-webkit-scrollbar {
//             display: none;
//           }
//           aside {
//             -ms-overflow-style: none; /* IE and Edge */
//             scrollbar-width: none; /* Firefox */
//           }
//         `}</style>

//         {/* Mobile Header (Close Button) - Visible on sm and md, hidden on lg and up */}
//         <div className="lg:hidden flex justify-between items-center px-4 py-3 border-b border-green-600 bg-[#008236] sticky top-0 z-10">
//           <h2 className="font-semibold text-lg">Browse Filters</h2>
//           <button onClick={() => setMenuOpen(false)}>
//             <X className="w-6 h-6 text-white" />
//           </button>
//         </div>

//         <div className="p-4">
//           {/* All Business Button and Search Box */}
//           <div className="p-4 pt-0">
//             <button className="w-full text-center px-4 py-3 mb-3 cursor-pointer transition-colors text-lg font-bold rounded-lg bg-green-800 border-2 border-white hover:bg-green-700/90 shadow-md">
//               All Business
//             </button>

//             {/* Search Box (Updated to white background) */}
//             <div className="relative mb-4">
//               <input
//                 type="text"
//                 placeholder="Search business name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 // Updated classes for white background and black text
//                 className="w-full p-2.5 pl-10 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//               />
//               {/* Updated icon color for contrast */}
//               <Search
//                 size={18}
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               />
//             </div>
//           </div>

//           {/* Business Type Section (Now with selection state) */}
//           <div className="mb-6 border-b border-green-600 pb-4">
//             <h3 className="text-lg font-semibold mb-2">Business Type</h3>
//             <nav>
//               <div className="space-y-1">
//                 {/* FIX: BUSINESS_TYPES array elements now match expected props (count: 0 added to data) */}
//                 {BUSINESS_TYPES.map((type) => (
//                   <FilterItem
//                     key={type.name}
//                     name={type.name}
//                     count={type.count} // Passed count property
//                     isSelected={selectedBusinessTypes.includes(type.name)}
//                     onToggle={toggleBusinessType}
//                     showCount={false} // Business types don't show a count
//                   />
//                 ))}
//               </div>
//             </nav>
//           </div>

//           {/* Industry Section (Collapsible with smooth transition and selection state) */}
//           <div className="mb-6 border-b border-green-600 pb-4">
//             {/* Collapsible Header */}
//             <button
//               onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//               aria-expanded={isCategoriesOpen}
//               className="w-full flex justify-between items-center text-left px-2 py-2 text-base font-bold bg-green-600 hover:bg-green-500 rounded-md transition"
//             >
//               Industry
//               {isCategoriesOpen ? (
//                 <ChevronUp size={16} />
//               ) : (
//                 <ChevronDown size={16} />
//               )}
//             </button>

//             {/* Category List - MAX HEIGHT IS NOW A LARGE FIXED VALUE FOR SMOOTHNESS */}
//             <div
//               className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
//               style={{
//                 // Changed to a fixed large value (5000px) to ensure a consistently smooth transition
//                 maxHeight: isCategoriesOpen ? `5000px` : "0px",
//               }}
//             >
//               <nav className="space-y-1 py-2">
//                 {ALL_CATEGORIES.map((category) => (
//                   <FilterItem
//                     key={category.name}
//                     name={category.name}
//                     count={category.count}
//                     isSelected={selectedIndustries.includes(category.name)}
//                     onToggle={toggleIndustry}
//                   />
//                 ))}
//               </nav>
//             </div>
//           </div>

//           {/* District Section (Collapsible with smooth transition) */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Location by District</h3>
//             {districtCategories.map((division) => (
//               <div key={division.division} className="mt-1">
//                 <button
//                   onClick={() =>
//                     setOpenDivision(
//                       openDivision === division.division
//                         ? ""
//                         : division.division
//                     )
//                   }
//                   aria-expanded={openDivision === division.division}
//                   className="w-full flex justify-between items-center text-left px-2 py-2 text-sm font-bold bg-green-600 hover:bg-green-500 rounded-md transition"
//                 >
//                   {division.division} Division
//                   {openDivision === division.division ? (
//                     <ChevronUp size={14} />
//                   ) : (
//                     <ChevronDown size={14} />
//                   )}
//                 </button>
//                 <div
//                   className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
//                   style={{
//                     // Ensures smooth transition
//                     maxHeight:
//                       openDivision === division.division
//                         ? `${division.districts.length * 32 + 8}px` // +8px for py-1 padding
//                         : "0px",
//                   }}
//                 >
//                   <nav className="py-1">
//                     {division.districts.map((district) => (
//                       <button
//                         key={district}
//                         className="w-full text-left pl-5 py-1.5 text-xs rounded-md hover:bg-green-700/70 transition"
//                         onClick={() => setMenuOpen(false)}
//                       >
//                         {district}
//                       </button>
//                     ))}
//                   </nav>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
"use client";

import { useState } from "react";
// We use interfaces and types to resolve the 'implicit any' errors, which is standard practice in TypeScript/TSX.
import { 
  Check, ChevronDown, ChevronUp, Menu, X, Search, 
  // --- Imported Icons for Business Types and Industries ---
  Factory, Truck, Store, Users, RefreshCw, Download, Upload, // Business Types
  Wheat, Fish, Car, Landmark, Utensils, GraduationCap, ShoppingCart, 
  Building, PiggyBank, Briefcase, Tally5, Brush, Newspaper, Home, // FIXED: Tally changed to Tally5
  BookOpen, Ship, Sprout, Lamp, Dna, Rocket, DollarSign, Dumbbell, 
  HandMetal, Heart, Plane, Shield, Warehouse, Zap, Scissors, Code, 
  Sofa, Package, Watch, Gem, Hammer, Scale, Phone, Box, Globe, 
  Hotel, Mail, School, CreditCard, TreePine, PawPrint, Syringe,
  Microscope, Printer, Book, Container, UtensilsCrossed, Monitor, 
  Hospital, FlaskConical, Stethoscope, ScissorsSquare, Cpu
  // --------------------------------------------------------
} from "lucide-react";
import { SetStateAction, Dispatch, ElementType } from "react"; // Importing types for setState and ElementType

// --- TYPE DEFINITIONS ---
interface BusinessItem {
  name: string;
  count: number;
}

interface FilterItemProps {
  name: string;
  count: number;
  isSelected: boolean;
  onToggle: (name: string) => void;
  showCount?: boolean;
}

// Map Item Name to Lucide Icon Component
type IconMap = Record<string, ElementType>;

// --- ICON MAPPINGS ---

// Icons for Business Types
const BUSINESS_TYPE_ICONS: IconMap = {
  "Manufacturer": Factory,
  "Supplier": Truck,
  "Buying House": Store,
  "Dealer": Users,
  "Trader": RefreshCw,
  "Importer": Download,
  "Exporter": Upload,
};

// Sample Icons for Industry Categories (Add more as needed)
const INDUSTRY_ICONS: IconMap = {
  "Agriculture Farm": Wheat,
  "Aquarium Fish Farm": Fish,
  "Automotive Industry": Car,
  "Banks": Landmark,
  "Beauty Parlor & Spa": Scissors,
  "Blogs & Magazines": BookOpen,
  "Brassware Industry": Factory,
  "Buying House": Store,
  "Cement Factory": Warehouse,
  "Ceramics Factory": Warehouse,
  "Chemical Factory": FlaskConical,
  "Cleaning Agency": Brush,
  "Coaching Center": Tally5, // FIXED: Now uses Tally5
  "Construction Firm": Building,
  "Construction Materials": Box,
  "Consulting Firms": Briefcase,
  "Cottage Industry": Home,
  "Courier Service": Mail,
  "Day Care Center": Sprout,
  "Diagnostic Centers": Microscope,
  "Ecommerce": ShoppingCart,
  "Education Institute": GraduationCap,
  "Electronics Industry": Cpu,
  "Engineering Workshop": Factory,
  "Event Management Firm": Zap,
  "Fashion House": Watch,
  "Fast Food & Restaurant": UtensilsCrossed,
  "Fertiliser Factory": TreePine,
  "Financial Company": PiggyBank,
  "Fisheries": Fish,
  "Food Factory": Package,
  "Furniture Company": Sofa,
  "Garments Factory": Watch, // Representing textile/apparel
  "Glass Factory": Lamp,
  "Grocery Shop": ShoppingCart,
  "Gym": Dumbbell,
  "Handicraft Company": HandMetal,
  "Hatchery": Fish,
  "Health Care Company": Hospital,
  "Home Appliance Company": Watch,
  "Home Builders": Building,
  "Homeo Clinic": Syringe,
  "Hotel": Hotel,
  "Interior Firm": Lamp,
  "Internet Service Provider": Globe,
  "IT Firm": Code,
  "Jewellery Factory": Gem,
  "Jewelry Company": Gem,
  "Jute Factory": TreePine,
  "Law Firms": Scale,
  "Leather Factory": Box,
  "Life Insurance": Shield,
  "Machine Industry": Hammer,
  "Maid Agency": Users,
  "Marine Industry": Ship,
  "Marketing Agency": DollarSign,
  "Marriage Media": Heart,
  "Medical Equipment Suppliers": Stethoscope,
  "Motor Vehicle Service": Car,
  "Newspaper": Newspaper,
  "Pet Shop": PawPrint,
  "Petroleum Industry": Container,
  "Pharmaceutical Industry": Dna,
  "Physical Therapy Center": Hospital,
  "Printing Press": Printer,
  "Publications": Book,
  "Pulp & Paper Company": Book,
  "Real Estate Company": Home,
  "Resorts": TreePine,
  "Restaurant": UtensilsCrossed,
  "School & College": School,
  "Security Company": Shield,
  "Service Company": Briefcase,
  "Shoe Factory": Box,
  "Steel Factory": Factory,
  "Tea Industry": Wheat, // Representing crops
  "Telecommunications": Phone,
  "Textile Industry": Watch,
  "Transport Company": Truck,
  "Travel Agency": Plane,
  "University": GraduationCap,
  "Veterinary Farm": Fish,
};
// ----------------------------------------------------

// --- FULL LIST OF CATEGORIES (RENAMED TO INDUSTRY) ---
const ALL_CATEGORIES: BusinessItem[] = [
  { name: "Agriculture Farm", count: 34 },
  { name: "Aquarium Fish Farm", count: 4 },
  { name: "Automotive Industry", count: 123 },
  { name: "Banks", count: 0 },
  { name: "Beauty Parlor & Spa", count: 0 },
  { name: "Blogs & Magazines", count: 0 },
  { name: "Brassware Industry", count: 0 },
  { name: "Buying House", count: 12 },
  { name: "Cement Factory", count: 0 },
  { name: "Ceramics Factory", count: 1 },
  { name: "Chemical Factory", count: 2 },
  { name: "Cleaning Agency", count: 8 },
  { name: "Coaching Center", count: 2 },
  { name: "Construction Firm", count: 6 },
  { name: "Construction Materials", count: 3 },
  { name: "Consulting Firms", count: 1 },
  { name: "Cottage Industry", count: 1 },
  { name: "Courier Service", count: 1 },
  { name: "Day Care Center", count: 0 },
  { name: "Diagnostic Centers", count: 3 },
  { name: "Ecommerce", count: 48 },
  { name: "Education Institute", count: 8 },
  { name: "Electronics Industry", count: 16 },
  { name: "Engineering Workshop", count: 4 },
  { name: "Event Management Firm", count: 0 },
  { name: "Fashion House", count: 39 },
  { name: "Fast Food & Restaurant", count: 2 },
  { name: "Fertiliser Factory", count: 0 },
  { name: "Financial Company", count: 1 },
  { name: "Fisheries", count: 0 },
  { name: "Food Factory", count: 27 },
  { name: "Furniture Company", count: 6 },
  { name: "Garments Factory", count: 16 },
  { name: "Glass Factory", count: 1 },
  { name: "Grocery Shop", count: 10 },
  { name: "Gym", count: 0 },
  { name: "Handicraft Company", count: 2 },
  { name: "Handloon Industry", count: 0 },
  { name: "Hatchery", count: 10 },
  { name: "Health Care Company", count: 10 },
  { name: "Home Appliance Company", count: 5 },
  { name: "Home Builders", count: 1 },
  { name: "Homeo Clinic", count: 3 },
  { name: "Hotel", count: 1 },
  { name: "Interior Design Firm", count: 0 },
  { name: "Interior Firm", count: 5 },
  { name: "Internet Service Provider", count: 1 },
  { name: "IT Firm", count: 13 },
  { name: "Jewellery Factory", count: 0 },
  { name: "Jewelry Company", count: 2 },
  { name: "Jute Factory", count: 1 },
  { name: "Law Firms", count: 2 },
  { name: "Leather Factory", count: 6 },
  { name: "Life Insurance", count: 0 },
  { name: "Machine Industry", count: 4 },
  { name: "Madrasha", count: 1 },
  { name: "Maid Agency", count: 1 },
  { name: "Marine Industry", count: 0 },
  { name: "Marketing Agency", count: 4 },
  { name: "Marriage Media", count: 5 },
  { name: "Medical Equipment Suppliers", count: 4 },
  { name: "Mosquito Coil Factory", count: 0 },
  { name: "Motor Vehicle Service", count: 1 },
  { name: "Music Industry", count: 0 },
  { name: "Newspaper", count: 4 },
  { name: "Pearl Farm", count: 0 },
  { name: "Pet Shop", count: 0 },
  { name: "Petroleum Industry", count: 0 },
  { name: "Pharmaceutical Industry", count: 0 },
  { name: "Photo Studio", count: 0 },
  { name: "Physical Therapy Center", count: 1 },
  { name: "Poultry Farm", count: 1 },
  { name: "Printing Press", count: 2 },
  { name: "Publications", count: 2 },
  { name: "Pulp & Paper Company", count: 1 },
  { name: "Real Estate Company", count: 3 },
  { name: "Resorts", count: 0 },
  { name: "Restaurant", count: 0 },
  { name: "Salon & Spa", count: 0 },
  { name: "Sanitary Agency", count: 1 },
  { name: "School & College", count: 2 },
  { name: "Security Company", count: 2 },
  { name: "Service Company", count: 13 },
  { name: "Shoe Factory", count: 2 },
  { name: "Steel Factory", count: 1 },
  { name: "Tea Industry", count: 3 },
  { name: "Telecommunications", count: 4 },
  { name: "Textile Industry", count: 4 },
  { name: "Transport Company", count: 1 },
  { name: "Travel Agency", count: 4 },
  { name: "University", count: 0 },
  { name: "Veterinary Farm", count: 2 },
];
// ----------------------------------------------------

// --- ORIGINAL BUSINESS TYPE DATA (Now consistent with BusinessItem interface) ---
const BUSINESS_TYPES: BusinessItem[] = [
  { name: "Manufacturer", count: 0 },
  { name: "Supplier", count: 0 },
  { name: "Buying House", count: 0 },
  { name: "Dealer", count: 0 },
  { name: "Trader", count: 0 },
  { name: "Importer", count: 0 },
  { name: "Exporter", count: 0 },
];
// ----------------------------------------------------


// --- ORIGINAL PLACEHOLDER DATA (District section remains the same) ---
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
// ----------------------------------------------------

/**
 * Helper Component for both Business Type and Industry items.
 * Uses a specific icon if available, or falls back to a Check icon when selected.
 */
const FilterItem = ({ name, count, isSelected, onToggle, showCount = true }: FilterItemProps) => {
  // Determine which icon map to use
  const iconMap = showCount ? INDUSTRY_ICONS : BUSINESS_TYPE_ICONS;
  
  // Get the custom icon component for the current item name
  const CustomIcon = iconMap[name];

  return (
    <button
      key={name}
      // Updated classes: apply selection styling directly on the button
      className={`w-full flex items-center justify-between text-left pr-1 pl-2 py-1.5 text-sm rounded-md transition 
      ${isSelected ? 'bg-green-700 font-semibold' : 'hover:bg-green-600/80'}`}
      // Use onToggle to handle selection logic
      onClick={() => onToggle(name)} 
    >
      <div className="flex items-center space-x-1 font-light">
        {/* RENDER CUSTOM ICON OR FALLBACK CHECK ICON */}
        {isSelected ? (
          // If selected, display the custom icon (if it exists), otherwise display the Check icon
          CustomIcon ? (
            <CustomIcon size={14} className="text-white shrink-0" />
          ) : (
            <Check size={14} className="text-white shrink-0" />
          )
        ) : (
          // If not selected, display the custom icon as a subtle indicator
          CustomIcon ? (
            // UPDATED: Changed from text-green-300 to text-white with opacity
            <CustomIcon size={14} className="text-white opacity-70 shrink-0" />
          ) : (
            // Spacer for alignment if no icon is defined for the unselected state
            <div className="w-[14px] h-[14px] shrink-0" /> 
          )
        )}
        
        {/* The name text. Font weight is controlled by the button's main class based on isSelected. */}
        <span>{name}</span>
      </div>

      {/* Show count on the right */}
      {showCount && (
        <span className={`text-[11px] font-medium px-2 py-[1px] rounded-full 
        ${count > 0 ? 'bg-green-800' : 'bg-green-900 opacity-60'}`}>
          ({count})
        </span>
      )}
    </button>
  );
};


export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDivision, setOpenDivision] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  
  // New states for filter selection and search query
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); 


  // Generic toggle function for managing filter state arrays
  const toggleSelection = (setState: Dispatch<SetStateAction<string[]>>, name: string) => {
    setState(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name) 
        : [...prev, name]
    );
  };
  
  const toggleBusinessType = (name: string) => toggleSelection(setSelectedBusinessTypes, name);
  const toggleIndustry = (name: string) => toggleSelection(setSelectedIndustries, name);


  const MobileMenuButton = (
    <button
      onClick={() => setMenuOpen(true)}
      className="fixed bottom-4 left-4 lg:hidden bg-[#2C8845] text-white p-2 rounded-xl shadow-lg z-20 transition-all duration-300 transform hover:scale-105"
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
        shadow-2xl 
        ${menuOpen 
          ? "translate-x-0" 
          : "-translate-x-full lg:translate-x-0"}`
        }
        aria-label="Business filters"
      >
        <style>{`
          /* Hide scrollbar for aesthetics */
          aside::-webkit-scrollbar {
            display: none;
          }
          aside {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
        
        {/* Mobile Header (Close Button) - Visible on sm and md, hidden on lg and up */}
        <div className="lg:hidden flex justify-between items-center px-4 py-3 border-b border-green-600 bg-[#008236] sticky top-0 z-10">
          <h2 className="font-semibold text-lg">Browse Filters</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-4">
          {/* All Business Button and Search Box */}
          <div className="p-4 pt-0">
            <button className="w-full text-center px-4 py-3 mb-3 cursor-pointer transition-colors text-lg font-bold rounded-lg bg-green-800 border-2 border-white hover:bg-green-700/90 shadow-md">
              All Business
            </button>
            
            {/* Search Box (Updated to white background) */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search business name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // Updated classes for white background and black text
                className="w-full p-2.5 pl-10 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              {/* Updated icon color for contrast */}
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Business Type Section (Now with specific icons) */}
          <div className="mb-6 border-b border-green-600 pb-4">
            <h3 className="text-lg font-semibold mb-2">Business Type</h3>
            <nav>
              <div className="space-y-1">
                {BUSINESS_TYPES.map((type) => (
                  <FilterItem 
                    key={type.name}
                    name={type.name}
                    count={type.count} // Passed count property
                    isSelected={selectedBusinessTypes.includes(type.name)}
                    onToggle={toggleBusinessType}
                    showCount={false} // Business types don't show a count
                  />
                ))}
              </div>
            </nav>
          </div>

          {/* Industry Section (Collapsible with specific icons) */}
          <div className="mb-6 border-b border-green-600 pb-4">
            {/* Collapsible Header */}
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              aria-expanded={isCategoriesOpen}
              className="w-full flex justify-between items-center text-left px-2 py-2 text-base font-bold bg-green-600 hover:bg-green-500 rounded-md transition"
            >
              Industry
              {isCategoriesOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {/* Category List - MAX HEIGHT IS NOW A LARGE FIXED VALUE FOR SMOOTHNESS */}
            <div
              className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
              style={{
                // Changed to a fixed large value (5000px) to ensure a consistently smooth transition
                maxHeight: isCategoriesOpen
                  ? `5000px` 
                  : "0px",
              }}
            >
              <nav className="space-y-1 py-2">
                {ALL_CATEGORIES.map((category) => (
                  <FilterItem 
                    key={category.name}
                    name={category.name}
                    count={category.count}
                    isSelected={selectedIndustries.includes(category.name)}
                    onToggle={toggleIndustry}
                  />
                ))}
              </nav>
            </div>
          </div>

          {/* District Section (Collapsible with smooth transition) */}
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
                    // Ensures smooth transition
                    maxHeight:
                      openDivision === division.division
                        ? `${division.districts.length * 32 + 8}px` // +8px for py-1 padding
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
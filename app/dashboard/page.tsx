// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import {
//   Users,
//   FileText,
//   Eye,
//   TrendingUp,
//   LogOut,
//   Menu,
//   X,
//   Settings,
//   AlertCircle,
//   ChevronDown,
//   CreditCard,
// } from "lucide-react"
// import DashboardContent from "@/components/dashboard/dashboard-content"
// import ProfileContent from "@/components/dashboard/profile-content"
// import SettingsContent from "@/components/dashboard/settings-content"
// import BusinessContent from "@/components/dashboard/business-content"
// import ManageListingsContent from "@/components/dashboard/manage-listings-content"
// import ManageUsersContent from "@/components/dashboard/manage-users-content"
// import ReportsContent from "@/components/dashboard/reports-content"
// // import PackagesContent from "@/components/dashboard/packages-content"

// type PageType =
//   | "dashboard"
//   | "profile"
//   | "settings"
//   | "business"
//   | "manage-listings"
//   | "manage-users"
//   | "reports"
//   | "packages"

// export default function DashboardPage() {
//   const [userType, setUserType] = useState<"admin" | "user">("user")
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [currentPage, setCurrentPage] = useState<PageType>("dashboard")
//   const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   // Admin Dashboard Data
//   const adminStats = [
//     { label: "Total Listings", value: "1,234", icon: FileText, color: "bg-blue-100 text-blue-600" },
//     { label: "Total Users", value: "5,678", icon: Users, color: "bg-green-100 text-green-600" },
//     { label: "Total Views", value: "45.2K", icon: Eye, color: "bg-purple-100 text-purple-600" },
//     { label: "Revenue", value: "$12,450", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
//   ]

//   const chartData = [
//     { month: "Jan", listings: 400, users: 240 },
//     { month: "Feb", listings: 520, users: 290 },
//     { month: "Mar", listings: 680, users: 350 },
//     { month: "Apr", listings: 750, users: 420 },
//     { month: "May", listings: 890, users: 510 },
//     { month: "Jun", listings: 1050, users: 620 },
//   ]

//   const categoryData = [
//     { name: "Technology", value: 35 },
//     { name: "Healthcare", value: 25 },
//     { name: "Retail", value: 20 },
//     { name: "Finance", value: 15 },
//     { name: "Other", value: 5 },
//   ]

//   const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

//   const recentListings = [
//     { id: 1, name: "Tech Solutions Inc", category: "Technology", status: "Active", date: "2024-10-20" },
//     { id: 2, name: "Health Plus Clinic", category: "Healthcare", status: "Pending", date: "2024-10-19" },
//     { id: 3, name: "Fashion Hub", category: "Retail", status: "Active", date: "2024-10-18" },
//     { id: 4, name: "Finance Pro", category: "Finance", status: "Active", date: "2024-10-17" },
//     { id: 5, name: "Digital Agency", category: "Technology", status: "Inactive", date: "2024-10-16" },
//   ]

//   // User Dashboard Data
//   const userStats = [
//     { label: "My Listings", value: "8", icon: FileText, color: "bg-blue-100 text-blue-600" },
//     { label: "Total Views", value: "2,450", icon: Eye, color: "bg-green-100 text-green-600" },
//     { label: "Blog Posts", value: "12", icon: FileText, color: "bg-purple-100 text-purple-600" },
//     { label: "Profile Views", value: "340", icon: Users, color: "bg-orange-100 text-orange-600" },
//   ]

//   const userListings = [
//     { id: 1, name: "My Tech Company", views: 450, status: "Active", date: "2024-10-15" },
//     { id: 2, name: "Consulting Services", views: 320, status: "Active", date: "2024-10-10" },
//     { id: 3, name: "Design Studio", views: 180, status: "Active", date: "2024-10-05" },
//     { id: 4, name: "Old Business", views: 45, status: "Inactive", date: "2024-09-20" },
//   ]

//   const userBlogPosts = [
//     { id: 1, title: "Tips for Growing Your Business", views: 520, date: "2024-10-18" },
//     { id: 2, title: "Digital Marketing Trends 2024", views: 380, date: "2024-10-12" },
//     { id: 3, title: "Customer Service Excellence", views: 290, date: "2024-10-05" },
//   ]

//   const handleMenuClick = (page: PageType) => {
//     setCurrentPage(page)
//     // Only close sidebar on mobile (md breakpoint is 768px)
//     if (typeof window !== "undefined" && window.innerWidth < 768) {
//       setSidebarOpen(false)
//     }
//   }

//   const handleBusinessClick = () => {
//     setBusinessDropdownOpen(!businessDropdownOpen)
//     if (typeof window !== "undefined" && window.innerWidth < 768) {
//       setSidebarOpen(false)
//     }
//   }

//  return (
//   <div className="min-h-screen bg-background">
//     {/* Dashboard Type Selector */}
//     <div className="bg-[#2C8845] border-b border-border sticky top-16 z-40">
//       <div className="container-custom">
//         <div className="flex items-center justify-between h-16 gap-4">
//           <div className="flex gap-2">
//             <button
//               onClick={() => {
//                 setUserType("user")
//                 setCurrentPage("dashboard")
//               }}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 userType === "user" ? "bg-white text-[#2C8845]" : "bg-[#37A856] text-white hover:bg-[#44B260]"
//               }`}
//             >
//               User Dashboard
//             </button>
//             <button
//               onClick={() => {
//                 setUserType("admin")
//                 setCurrentPage("dashboard")
//               }}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 userType === "admin" ? "bg-white text-[#2C8845]" : "bg-[#37A856] text-white hover:bg-[#44B260]"
//               }`}
//             >
//               Admin Dashboard
//             </button>
//           </div>
//           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 text-white">
//             {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>
//       </div>
//     </div>

//     <div className="flex">
//       {/* Sidebar */}
//       {sidebarOpen && (
//         <aside className="w-64 bg-[#2C8845] p-6 min-h-[calc(100vh-4rem)] overflow-y-auto fixed md:relative md:w-64 left-0 top-16 h-screen md:h-auto md:top-auto z-30 text-white">
//           <div className="space-y-6">
//             <div>
//               <h3 className="font-semibold mb-4">Menu</h3>
//               <nav className="space-y-2">
//                 {/* Dashboard Link */}
//                 <button
//                   onClick={() => handleMenuClick("dashboard")}
//                   className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
//                     currentPage === "dashboard"
//                       ? "bg-white text-[#2C8845]"
//                       : "hover:bg-[#37A856] text-white"
//                   }`}
//                 >
//                   Dashboard
//                 </button>

//                 {/* Profile Link */}
//                 <button
//                   onClick={() => handleMenuClick("profile")}
//                   className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                     currentPage === "profile" ? "bg-white text-[#2C8845]" : "hover:bg-[#37A856] text-white"
//                   }`}
//                 >
//                   Profile
//                 </button>

//                 {/* Business Dropdown */}
//                 <div>
//                   <button
//                     onClick={handleBusinessClick}
//                     className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between transition-colors ${
//                       currentPage === "business"
//                         ? "bg-white text-[#2C8845]"
//                         : "hover:bg-[#37A856] text-white"
//                     }`}
//                   >
//                     <span>Business</span>
//                     <ChevronDown
//                       size={16}
//                       className={`transition-transform ${businessDropdownOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   {businessDropdownOpen && (
//                     <div className="pl-4 space-y-2 mt-2">
//                       <button
//                         onClick={() => handleMenuClick("business")}
//                         className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
//                           currentPage === "business"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         My Businesses
//                       </button>
//                       <button
//                         onClick={() => handleMenuClick("business")}
//                         className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-[#37A856] text-white transition-colors"
//                       >
//                         Add Business
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Packages Link */}
//                 <button
//                   onClick={() => handleMenuClick("packages")}
//                   className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
//                     currentPage === "packages"
//                       ? "bg-white text-[#2C8845]"
//                       : "hover:bg-[#37A856] text-white"
//                   }`}
//                 >
//                   <CreditCard size={20} />
//                   <span>Packages</span>
//                 </button>

//                 {/* Settings Link */}
//                 <button
//                   onClick={() => handleMenuClick("settings")}
//                   className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
//                     currentPage === "settings"
//                       ? "bg-white text-[#2C8845]"
//                       : "hover:bg-[#37A856] text-white"
//                   }`}
//                 >
//                   <Settings size={18} />
//                   Settings
//                 </button>

//                 {/* Admin Only Links */}
//                 {userType === "admin" && (
//                   <>
//                     <div className="border-t border-white/30 pt-4 mt-4">
//                       <h3 className="font-semibold mb-4 text-sm">Admin Panel</h3>

//                       <button
//                         onClick={() => handleMenuClick("manage-listings")}
//                         className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                           currentPage === "manage-listings"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         Manage Listings
//                       </button>

//                       <button
//                         onClick={() => handleMenuClick("manage-users")}
//                         className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                           currentPage === "manage-users"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         Manage Users
//                       </button>

//                       <button
//                         onClick={() => handleMenuClick("reports")}
//                         className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
//                           currentPage === "reports"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         <AlertCircle size={18} />
//                         Reports
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </nav>
//             </div>

//             <div className="pt-6 border-t border-white/30">
//               <Link
//                 href="/login"
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/20 text-white transition-colors font-medium"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </Link>
//             </div>
//           </div>
//         </aside>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:p-8 w-full">
//         <div className="container-custom max-w-7xl">
//           {currentPage === "dashboard" && <DashboardContent userType={userType} />}
//           {currentPage === "profile" && <ProfileContent />}
//           {currentPage === "settings" && <SettingsContent />}
//           {currentPage === "business" && <BusinessContent />}
//           {currentPage === "manage-listings" && <ManageListingsContent />}
//           {currentPage === "manage-users" && <ManageUsersContent />}
//           {currentPage === "reports" && <ReportsContent />}
//         </div>
//       </main>
//     </div>
//   </div>
// )

// }
// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import {
//   Users,
//   FileText,
//   Eye,
//   TrendingUp,
//   LogOut,
//   Menu,
//   X,
//   Settings,
//   AlertCircle,
//   ChevronDown,
//   CreditCard,
// } from "lucide-react"

// import DashboardContent from "@/components/dashboard/dashboard-content"
// import ProfileContent from "@/components/dashboard/profile-content"
// import SettingsContent from "@/components/dashboard/settings-content"
// import BusinessContent from "@/components/dashboard/business-content"
// import ManageListingsContent from "@/components/dashboard/manage-listings-content"
// import ManageUsersContent from "@/components/dashboard/manage-users-content"
// import ReportsContent from "@/components/dashboard/reports-content"

// type PageType =
//   | "dashboard"
//   | "profile"
//   | "settings"
//   | "business"
//   | "manage-listings"
//   | "manage-users"
//   | "reports"
//   | "packages"

// export default function DashboardPage() {
//   const [userType, setUserType] = useState<"admin" | "user" | null>(null)
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [currentPage, setCurrentPage] = useState<PageType>("dashboard")
//   const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false)

//   // ✅ Simulated Authentication
//   useEffect(() => {
//     // Example: Normally you'd get this from your auth provider or cookie
//     const storedUserType = localStorage.getItem("userType")

//     if (storedUserType === "admin" || storedUserType === "user") {
//       setUserType(storedUserType)
//     } else {
//       // Default fallback if not logged in (redirect could go here)
//       setUserType("user")
//     }
//   }, [])

//   const handleMenuClick = (page: PageType) => {
//     setCurrentPage(page)
//     if (typeof window !== "undefined" && window.innerWidth < 768) {
//       setSidebarOpen(false)
//     }
//   }

//   const handleBusinessClick = () => {
//     setBusinessDropdownOpen(!businessDropdownOpen)
//     if (typeof window !== "undefined" && window.innerWidth < 768) {
//       setSidebarOpen(false)
//     }
//   }

//   if (!userType) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500 text-lg">Loading dashboard...</p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Top Bar */}
//       <div className="bg-[#2C8845] border-border sticky top-16 z-40">
//         <div className="container-custom">
//           <div className="flex items-center justify-between h-16 gap-4">
//             <h1 className="text-white font-semibold text-lg capitalize">
//               Welcome {userType}
//             </h1>

//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="md:hidden p-2 text-white"
//             >
//               {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex">
//         {/* Sidebar */}
//         {sidebarOpen && (
//           <aside className="w-64 bg-[#2C8845] p-6 min-h-[calc(100vh-4rem)] overflow-y-auto fixed md:relative md:w-64 left-0 top-16 h-screen md:h-auto md:top-auto z-30 text-white">
//             <div className="space-y-6">
//               <div>
//                 {/* <h3 className="font-semibold mb-4">Menu</h3> */}
//                 <nav className="space-y-2">
//                   {/* Dashboard */}
//                   <button
//                     onClick={() => handleMenuClick("dashboard")}
//                     className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
//                       currentPage === "dashboard"
//                         ? "bg-white text-[#2C8845]"
//                         : "hover:bg-[#37A856] text-white"
//                     }`}
//                   >
//                     Dashboard
//                   </button>

//                   {/* Profile */}
//                   <button
//                     onClick={() => handleMenuClick("profile")}
//                     className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                       currentPage === "profile"
//                         ? "bg-white text-[#2C8845]"
//                         : "hover:bg-[#37A856] text-white"
//                     }`}
//                   >
//                     Profile
//                   </button>

//                   {/* Business (User Only) */}
//                   {userType === "user" && (
//                     <div>
//                       <button
//                         onClick={handleBusinessClick}
//                         className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between transition-colors ${
//                           currentPage === "business"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         <span>Business</span>
//                         <ChevronDown
//                           size={16}
//                           className={`transition-transform ${
//                             businessDropdownOpen ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>

//                       {businessDropdownOpen && (
//                         <div className="pl-4 space-y-2 mt-2">
//                           <button
//                             onClick={() => handleMenuClick("business")}
//                             className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
//                               currentPage === "business"
//                                 ? "bg-white text-[#2C8845]"
//                                 : "hover:bg-[#37A856] text-white"
//                             }`}
//                           >
//                             My Businesses
//                           </button>
//                           <button
//                             onClick={() => handleMenuClick("business")}
//                             className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-[#37A856] text-white transition-colors"
//                           >
//                             Add Business
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* Packages (User Only) */}
//                   {userType === "user" && (
//                     <button
//                       onClick={() => handleMenuClick("packages")}
//                       className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
//                         currentPage === "packages"
//                           ? "bg-white text-[#2C8845]"
//                           : "hover:bg-[#37A856] text-white"
//                       }`}
//                     >
//                       <CreditCard size={20} />
//                       <span>Packages</span>
//                     </button>
//                   )}

//                   {/* Settings (Both) */}
//                   <button
//                     onClick={() => handleMenuClick("settings")}
//                     className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
//                       currentPage === "settings"
//                         ? "bg-white text-[#2C8845]"
//                         : "hover:bg-[#37A856] text-white"
//                     }`}
//                   >
//                     <Settings size={18} />
//                     Settings
//                   </button>

//                   {/* Admin Only Section */}
//                   {userType === "admin" && (
//                     <div className="border-t border-white/30 pt-4 mt-4">
//                       <h3 className="font-semibold mb-4 text-sm">Admin Panel</h3>

//                       <button
//                         onClick={() => handleMenuClick("manage-listings")}
//                         className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                           currentPage === "manage-listings"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         Manage Listings
//                       </button>

//                       <button
//                         onClick={() => handleMenuClick("manage-users")}
//                         className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                           currentPage === "manage-users"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         Manage Users
//                       </button>

//                       <button
//                         onClick={() => handleMenuClick("reports")}
//                         className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
//                           currentPage === "reports"
//                             ? "bg-white text-[#2C8845]"
//                             : "hover:bg-[#37A856] text-white"
//                         }`}
//                       >
//                         <AlertCircle size={18} />
//                         Reports
//                       </button>
//                     </div>
//                   )}
//                 </nav>
//               </div>

//               <div className="pt-6 border-t border-white/30">
//                 <Link
//                   href="/login"
//                   className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/20 text-white transition-colors font-medium"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </Link>
//               </div>
//             </div>
//           </aside>
//         )}

//         {/* Main Content */}
//         <main className="flex-1 p-6 md:p-8 w-full">
//           <div className="container-custom max-w-7xl">
//             {currentPage === "dashboard" && <DashboardContent userType={userType} />}
//             {currentPage === "profile" && <ProfileContent />}
//             {currentPage === "settings" && <SettingsContent />}
//             {currentPage === "business" && userType === "user" && <BusinessContent />}
//             {currentPage === "manage-listings" && userType === "admin" && <ManageListingsContent />}
//             {currentPage === "manage-users" && userType === "admin" && <ManageUsersContent />}
//             {currentPage === "reports" && userType === "admin" && <ReportsContent />}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Eye,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Settings,
  AlertCircle,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  User,
  Briefcase,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import DashboardContent from "@/components/dashboard/dashboard-content";
import ProfileContent from "@/components/dashboard/profile-content";
import SettingsContent from "@/components/dashboard/settings-content";
import BusinessContent from "@/components/dashboard/business-content";
import ManageListingsContent from "@/components/dashboard/manage-listings-content";
import ManageUsersContent from "@/components/dashboard/manage-users-content";
import ReportsContent from "@/components/dashboard/reports-content";
import PackagesContent from "@/components/dashboard/packages-content";
import AddBusinessContent from "@/components/dashboard/add-business";
import HistoryContent from "@/components/dashboard/history-content";

type PageType =
  | "dashboard"
  | "profile"
  | "settings"
  | "business"
  | "add-business"
  | "manage-listings"
  | "manage-users"
  | "reports"
  | "history"
  | "packages";

export default function DashboardPage() {
  const [userType, setUserType] = useState<"admin" | "user" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  // ✅ Simulated Authentication
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "admin" || storedUserType === "user") {
      setUserType(storedUserType);
    } else {
      setUserType("user");
    }
  }, []);

  const handleMenuClick = (page: PageType) => {
    setCurrentPage(page);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleBusinessClick = () => {
    setBusinessDropdownOpen(!businessDropdownOpen);
  };

  if (!userType) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-[#2C8845] border-border sticky top-14 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 gap-4">
            <h1 className="text-white font-semibold text-lg capitalize">
              Welcome {userType}
            </h1>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-white"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Sidebar with smooth slide */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              key="sidebar"
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -260, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-64 bg-[#2C8845] p-6 min-h-[calc(100vh-4rem)] overflow-y-auto fixed md:relative md:w-64 left-0 top-16 h-screen md:h-auto md:top-auto z-30 text-white"
            >
              <div className="space-y-6">
                <div>
                  <nav className="space-y-2">
                    {/* Dashboard */}
                    {/* <button
                      onClick={() => handleMenuClick("dashboard")}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === "dashboard"
                          ? "bg-[#2C8845] text-white"
                          : "hover:bg-[#37A856] text-white"
                      }`}
                    >
                      Dashboard
                    </button> */}

                    <button
                      onClick={() => handleMenuClick("dashboard")}
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                        currentPage === "dashboard"
                          ? "bg-white text-[#2C8845]"
                          : "hover:bg-[#37A856] text-white"
                      }`}
                    >
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </button>

                    {/* Profile */}
                    <button
                      onClick={() => handleMenuClick("profile")}
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                        currentPage === "profile"
                          ? "bg-white text-[#2C8845]"
                          : "hover:bg-[#37A856] text-white"
                      }`}
                    >
                      <User size={20} />
                      <span>Profile</span>
                    </button>

                    {/* Business (User Only) */}
                    {userType === "user" && (
                      <div>
                        <button
                          onClick={handleBusinessClick}
                          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                            businessDropdownOpen
                              ? "bg-[#16A34A]"
                              : "hover:bg-[#37A856]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Briefcase size={20} />
                            <span>Business</span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              businessDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {businessDropdownOpen && (
                            <motion.div
                              key="business-dropdown"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="pl-4 space-y-2 mt-2"
                            >
                              <button
                                onClick={() => handleMenuClick("business")}
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                                  currentPage === "business"
                                    ? "bg-white text-[#2C8845]"
                                    : "hover:bg-[#37A856] text-white"
                                }`}
                              >
                                My Businesses
                              </button>
                              {/* <button
                                onClick={() => handleMenuClick("business")}
                                className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-[#37A856] text-white transition-colors"
                              >
                                Add Business
                              </button> */}

                              <button
                                onClick={() => handleMenuClick("add-business")} // ✅ changed
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                                  currentPage === "add-business"
                                    ? "bg-white text-[#2C8845]"
                                    : "hover:bg-[#37A856] text-white"
                                }`}
                              >
                                Add Business
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Packages (User Only) */}
                    {userType === "user" && (
                      <button
                        onClick={() => handleMenuClick("packages")}
                        className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                          currentPage === "packages"
                            ? "bg-white text-[#2C8845]"
                            : "hover:bg-[#37A856] text-white"
                        }`}
                      >
                        <CreditCard size={20} />
                        <span>Packages</span>
                      </button>
                    )}
                    {/* ✅ New History Button */}
                    <button
                      onClick={() => handleMenuClick("history")}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                        currentPage === "history"
                          ? "bg-white text-[#2C8845]"
                          : "hover:bg-[#37A856] text-white"
                      }`}
                    >
                      <TrendingUp size={20} />
                      <span>History</span>
                    </button>
                    {/* Settings (Both) */}
                    <button
                      onClick={() => handleMenuClick("settings")}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        currentPage === "settings"
                          ? "bg-white text-[#2C8845]"
                          : "hover:bg-[#37A856] text-white"
                      }`}
                    >
                      <Settings size={18} />
                      Settings
                    </button>

                    {/* Admin Only Section */}
                    {userType === "admin" && (
                      <div className="border-t border-white/30 pt-4 mt-4">
                        <h3 className="font-semibold mb-4 text-sm">
                          Admin Panel
                        </h3>

                        <button
                          onClick={() => handleMenuClick("manage-listings")}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "manage-listings"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          Manage Listings
                        </button>

                        <button
                          onClick={() => handleMenuClick("manage-users")}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "manage-users"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          Manage Users
                        </button>

                        <button
                          onClick={() => handleMenuClick("reports")}
                          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                            currentPage === "reports"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <AlertCircle size={18} />
                          Reports
                        </button>
                      </div>
                    )}
                  </nav>
                </div>

                <div className="pt-6 border-t border-white/30">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/20 text-white transition-colors font-medium"
                  >
                    <LogOut size={18} />
                    Logout
                  </Link>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content with smooth transitions */}
        <main className="flex-1 p-6 md:p-8 w-full overflow-hidden">
          <div className="container-custom max-w-7xl relative">
            <AnimatePresence mode="wait">
              {currentPage === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <DashboardContent userType={userType} />
                </motion.div>
              )}

              {currentPage === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ProfileContent />
                </motion.div>
              )}

              {currentPage === "add-business" && userType === "user" && (
                <motion.div
                  key="add-business"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <AddBusinessContent />
                </motion.div>
              )}

              {currentPage === "packages" && userType === "user" && (
                <motion.div
                  key="packages"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <PackagesContent />
                </motion.div>
              )}

              {currentPage === "history" && userType === "user" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <HistoryContent />
                </motion.div>
              )}

              {currentPage === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <SettingsContent />
                </motion.div>
              )}

              {currentPage === "business" && userType === "user" && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <BusinessContent />
                </motion.div>
              )}

              {currentPage === "manage-listings" && userType === "admin" && (
                <motion.div
                  key="manage-listings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ManageListingsContent />
                </motion.div>
              )}

              {currentPage === "manage-users" && userType === "admin" && (
                <motion.div
                  key="manage-users"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ManageUsersContent />
                </motion.div>
              )}

              {currentPage === "reports" && userType === "admin" && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ReportsContent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

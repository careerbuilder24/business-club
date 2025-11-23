"use client";

import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import {
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
  Home,
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
import FinanceContent from "@/components/dashboard/FinanceContent";
import AddFinanceContent from "@/components/dashboard/AddFinanceContent";
import AdminSettings from "@/components/dashboard/AdminSettings";
import useUsers from "@/hooks/useUsers";

type PageType =
  | "dashboard"
  | "profile"
  | "settings"
  | "business"
  | "add-business"
  | "manage-listings"
  | "manage-users"
  | "reports"
  | "add-finance"
  | "history"
  | "finance-history"
  // | "finance"
  | "admin-settings"
  | "packages";

type UserRole = "admin" | "user" | null;

interface DecodedUser {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export default function DashboardPage() {
  const [userType, setUserType] = useState<UserRole>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [financeDropdownOpen, setFinanceDropdownOpen] = useState(false);
  const { users, loading: userLoading } = useUsers();
  const [user, setUser] = useState<DecodedUser | null>(null);
  // const [userType, setUserType] = useState<"admin" | "user" | null>(null);

  console.log(users);

  // useEffect(() => {
  //     const cookieToken = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("token="))
  //       ?.split("=")[1];

  //     if (cookieToken) {
  //       const decoded = jwtDecode<DecodedUser>(cookieToken);
  //       setUser(decoded);

  //       if (decoded.role === "admin") {
  //         setUserType("admin");
  //       } else {
  //         setUserType("user");
  //       }
  //     } else {
  //       setUserType("user"); // Or redirect to login
  //     }
  //   }, []);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const res = await fetch("/api/me", {
  //         method: "GET",
  //         credentials: "include", // important for cookies
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!res.ok) {
  //         setUserType(null); // not loaded / fallback
  //         return;
  //       }

  //       const data: DecodedUser = await res.json();
  //       setUser(data);
  //       setUserType(data.role as UserRole); // set exactly as "admin" or "user"
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       setUserType(null);
  //     }
  //   }

  //   fetchUser();
  // }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include", // important to send cookies
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          setUserType(null);
          return;
        }

        const json = await res.json(); // json has { success, data }
        if (json.success && json.data) {
          setUser(json.data); // this is the decoded user object
          setUserType(json.data.role as UserRole);
        } else {
          setUser(null);
          setUserType(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setUserType(null);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });

      // Remove token instantly
      document.cookie = "token=; Max-Age=0; path=/;";

      // Reset UI state BEFORE redirect
      setUser(null);
      setUserType(null);

      // Now redirect
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuClick = (page: PageType) => {
    setCurrentPage(page);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleBusinessClick = () => {
    setBusinessDropdownOpen(!businessDropdownOpen);
  };

  // if (!userType) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-gray-500 text-lg">Loading dashboard...</p>
  //     </div>
  //   );
  // }
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
        {/* <div className="container-custom">
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
        </div> */}

        {userType && (
          <div className="bg-[#2C8845] border-border sticky top-14 z-40">
            <div className="container-custom">
              <div className="flex items-center justify-between h-16 gap-4">
                {/* <h1 className="text-white font-semibold text-lg capitalize">
                  Welcome {userType}
                </h1> */}
                <h1 className="text-white flex gap-2 font-semibold text-lg capitalize">
                  Welcome{" "}
                  {user?.email
                    ? user.email
                        .split("@")[0]
                        .replace(/^\w/, (c) => c.toUpperCase())
                    : userType}
                  <p className="text-white">{userType}</p>
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
        )}
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

                    {/* Home */}
                    <Link
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors hover:bg-[#37A856] text-white duration-300 ease-in-out`}
                      href={"/"}
                    >
                      <Home size={20} />
                      <span>Home</span>
                    </Link>
                    {/* Profile */}
                    <button
                      onClick={() => handleMenuClick("profile")}
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors cursor-pointer duration-300 ease-in-out ${
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
                          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg duration-300 ease-in-out transition-colors cursor-pointer ${
                            businessDropdownOpen
                              ? "bg-[#16A34A]"
                              : "hover:bg-[#37A856]"
                          }`}
                        >
                          <div className="flex items-center gap-3 cursor-pointer">
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
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
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
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer duration-300 ease-in-out ${
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
                        className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors  cursor-pointer duration-300 ease-in-out ${
                          currentPage === "packages"
                            ? "bg-white text-[#2C8845]"
                            : "hover:bg-[#37A856] text-white"
                        }`}
                      >
                        <CreditCard size={20} />
                        <span>Packages</span>
                      </button>
                    )}

                    {/*  New History Button */}
                    {userType === "user" && (
                      <>
                        {/* User History */}
                        <button
                          onClick={() => handleMenuClick("history")}
                          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors cursor-pointer duration-300 ease-in-out ${
                            currentPage === "history"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <TrendingUp size={20} />
                          <span>History</span>
                        </button>

                        {/* User Settings */}
                        <button
                          onClick={() => handleMenuClick("settings")}
                          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer duration-300 ease-in-out ${
                            currentPage === "settings"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <Settings size={18} />
                          <span>Settings</span>
                        </button>
                      </>
                    )}

                    {userType === "admin" && (
                      <>
                        {/* Admin Settings */}
                        <button
                          onClick={() => handleMenuClick("admin-settings")}
                          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer duration-300 ease-in-out ${
                            currentPage === "admin-settings"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <Settings size={18} />
                          <span>Admin Settings</span>
                        </button>
                      </>
                    )}

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
                        {/* Finance Dropdown (Admin Only) */}
                        <div>
                          <button
                            onClick={() =>
                              setFinanceDropdownOpen(!financeDropdownOpen)
                            }
                            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg duration-300 ease-in-out transition-colors cursor-pointer ${
                              financeDropdownOpen
                                ? "bg-[#16A34A]"
                                : "hover:bg-[#37A856] text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <AlertCircle size={18} />
                              <span>Finance</span>
                            </div>
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${
                                financeDropdownOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {financeDropdownOpen && (
                              <motion.div
                                key="finance-dropdown"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="pl-4 space-y-2 mt-2"
                              >
                                <button
                                  onClick={() => handleMenuClick("add-finance")}
                                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                                    currentPage === "add-finance"
                                      ? "bg-white text-[#2C8845]"
                                      : "hover:bg-[#37A856] text-white"
                                  }`}
                                >
                                  Add Finance
                                </button>
                                <button
                                  onClick={() =>
                                    handleMenuClick("finance-history")
                                  }
                                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                                    currentPage === "finance-history"
                                      ? "bg-white text-[#2C8845]"
                                      : "hover:bg-[#37A856] text-white"
                                  }`}
                                >
                                  Finance History
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

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
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/20 text-white transition-colors font-medium w-full text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
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
              {currentPage === "finance-history" && userType === "admin" && (
                <motion.div
                  key="finance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <FinanceContent />
                </motion.div>
              )}
              {currentPage === "admin-settings" && userType === "admin" && (
                <motion.div
                  key="admin-settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <AdminSettings />
                </motion.div>
              )}

              {/* {currentPage === "finance" && userType === "admin" && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <FinanceContent />
                </motion.div>
              )} */}

              {currentPage === "add-finance" && userType === "admin" && (
                <motion.div
                  key="add-finance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <AddFinanceContent />
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

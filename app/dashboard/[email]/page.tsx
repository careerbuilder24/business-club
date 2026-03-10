"use client";
import { useEffect, useState } from "react";
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
  ListChecks,
  PackageSearch,
  UploadCloud,
  Users as UsersIcon,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import DashboardContent from "@/components/dashboard/dashboard-content";
import ProfileContent from "@/components/dashboard/profile-content";
import SettingsContent from "@/components/dashboard/settings-content";
import BusinessContent from "@/components/dashboard/business-content";
import ManageListingsContent from "@/components/dashboard/manage-listings-content";
import ManageUsersContent from "@/components/dashboard/manage-users-content";
import PackagedRequested from "@/components/dashboard/PackagedRequested";
import ReportsContent from "@/components/dashboard/reports-content";
import PackagesContent from "@/components/dashboard/packages-content";
import AddBusinessContent from "@/components/dashboard/add-business";
import HistoryContent from "@/components/dashboard/history-content";
import FinanceContent from "@/components/dashboard/FinanceContent";
import AddFinanceContent from "@/components/dashboard/AddFinanceContent";
import AdminSettings from "@/components/dashboard/AdminSettings";
import useUsers from "@/hooks/useUsers";
import AdminProfileContent from "@/components/dashboard/AdminProfileContent";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useLoggedUser from "@/hooks/useLoggedUser";
import UserBlog from "@/components/dashboard/UserBlog";
import UserMyBlog from "@/components/dashboard/UserMyBlog";
import BlogRequest from "@/components/dashboard/BlogRequest";
import NewsUpload from "@/components/dashboard/NewsUpload";
import UploadedNews from "@/components/dashboard/UploadedNews";
import AllUploadedNews from "@/components/dashboard/AllUploadedNews";
import SideBarCategory from "@/components/dashboard/SideBarCategory";
import PackagesAdd from "@/components/dashboard/PackagesAdd";
import PackageChangeRequests from "@/components/dashboard/PackageChangeRequests";

type PageType =
  | "dashboard"
  | "profile"
  | "settings"
  | "business"
  | "add-business"
  | "manage-listings"
  | "manage-users"
  | "package-change-requests"
  | "manage-packages"
  | "blog-request"
  | "PackagesAdd"
  | "reports"
  | "add-finance"
  | "history"
  | "UserBlog"
  | "UserMyBlog"
  | "NewsUpload"
  | "UploadedNews"
  | "AllUploadedNews"
  | "SideBarCategory"
  | "finance-history"
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
  const { loggedUser, loading, error } = useLoggedUser();
  const params = useParams(); // from next/navigation
  const email = params.email;
  const router = useRouter();

  useEffect(() => {
    if (loggedUser) {
      // console.log("Logged user:", loggedUser);
    }
  }, [loggedUser]);

  const searchParams = useSearchParams();

  // login validation
  //   useEffect(() => {
  //   if (!userType) {
  //     router.replace("/login");
  //   }
  // }, [userType, router]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const json = await res.json();

        if (json?.data) {
          setUser(json.data);
          setUserType(json.data.role as UserRole);
        } else {
          throw new Error("No user");
        }
      } catch (err) {
        setUser(null);
        setUserType(null);
        router.replace("/login");
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUser();
  }, [router]);

  useEffect(() => {
    const tab = searchParams.get("tab") as PageType | null;
    if (tab) setCurrentPage(tab);
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace(`/dashboard/${email}?tab=dashboard`);
    }
  }, [email, searchParams, router]);

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const json = await res.json();

        if (json?.data) {
          setUser(json.data);
          setUserType(json.data.role as UserRole);
        } else {
          throw new Error("No user");
        }
      } catch (err) {
        // Force logout if invalid session
        setUser(null);
        setUserType(null);
        router.replace("/login");
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUser();
  }, [router]);
  // const handleLogout = async () => {
  //   try {
  //     await fetch("/api/logout", {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     // Remove token instantly
  //     document.cookie = "token=; Max-Age=0; path=/;";

  //     // Reset UI state BEFORE redirect
  //     setUser(null);
  //     setUserType(null);

  //     // Now redirect
  //     window.location.href = "/login";
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });

      //  DO NOT manually delete cookie

      // Reset state
      setUser(null);
      setUserType(null);

      // Redirect safely
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };
  const handleMenuClick = (page: PageType) => {
    // const email = loggedUser?.email || params?.email;
    const email = user?.email;

    if (!email) return; // prevent router errors

    router.push(
      `/dashboard/${email}?${new URLSearchParams({ tab: page }).toString()}`,
    );

    setCurrentPage(page);

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleBusinessClick = () => {
    setBusinessDropdownOpen(!businessDropdownOpen);
  };

  // if (loadingUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-gray-500 text-lg">Loading dashboard...</p>
  //     </div>
  //   );
  // }

  if (loadingUser || !userType) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }

  // console.log(loggedUser);
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-[#2C8845] border-border sticky top-14 z-40">
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

                    {/* Admin Part in dashboard */}
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

                    {/* News Upload*/}
                    {/* <button
                      onClick={() => handleMenuClick("NewsUpload")}
                      className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors cursor-pointer duration-300 ease-in-out ${
                        currentPage === "NewsUpload"
                          ? "bg-white text-[#2C8845]"
                          : "hover:bg-[#37A856] text-white"
                      }`}
                    >
                      <User size={20} />
                      <span>News Upload</span>
                    </button> */}

                    {/* Admin Only Section */}
                    {userType === "admin" && (
                      <div className="border-t border-white/30 pt-4 mt-4">
                        {/* Manage Listings */}
                        <button
                          onClick={() => handleMenuClick("manage-listings")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "manage-listings"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <ListChecks size={18} />
                          <span>Manage Listings</span>
                        </button>
                        <button
                          onClick={() => handleMenuClick("UserBlog")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors cursor-pointer duration-300 ease-in-out ${
                            currentPage === "UserBlog"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <User size={20} />
                          <span>Blog</span>
                        </button>

                        <button
                          onClick={() => handleMenuClick("UserMyBlog")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors cursor-pointer duration-300 ease-in-out ${
                            currentPage === "UserMyBlog"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <User size={20} />
                          <span>My Blogs</span>
                        </button>

                        {/* SIdebar Category */}
                        <button
                          onClick={() => handleMenuClick("SideBarCategory")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors cursor-pointer duration-300 ease-in-out ${
                            currentPage === "SideBarCategory"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <User size={20} />
                          <span>Sidebar Category</span>
                        </button>

                        <button
                          onClick={() => handleMenuClick("NewsUpload")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "NewsUpload"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <UploadCloud size={20} />
                          <span>News Upload</span>
                        </button>

                        {/* News Upload*/}
                        <button
                          onClick={() => handleMenuClick("AllUploadedNews")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors cursor-pointer duration-300 ease-in-out ${
                            currentPage === "AllUploadedNews"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <User size={20} />
                          <span>All Uploaded News</span>
                        </button>

                        {/* blog-request */}
                        <button
                          onClick={() => handleMenuClick("blog-request")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "blog-request"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <PackageSearch size={18} />
                          <span>All Blog Requests</span>
                        </button>
                        {/* Packages Add */}
                        <button
                          onClick={() => handleMenuClick("PackagesAdd")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "PackagesAdd"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <PackageSearch size={18} />
                          <span>Packages Add</span>
                        </button>

                        {/* Manage Users */}
                        <button
                          onClick={() => handleMenuClick("manage-users")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "manage-users"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <UsersIcon size={18} />
                          <span>Manage Users</span>
                        </button>
                        {/* Package Change Requests */}
                        <button
                          onClick={() =>
                            handleMenuClick("package-change-requests")
                          }
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "package-change-requests"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <UsersIcon size={18} />
                          <span>Package Change Requests</span>
                        </button>

                        {/* Manage Packages */}
                        <button
                          onClick={() => handleMenuClick("manage-packages")}
                          className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                            currentPage === "manage-packages"
                              ? "bg-white text-[#2C8845]"
                              : "hover:bg-[#37A856] text-white"
                          }`}
                        >
                          <PackageSearch size={18} />
                          <span>Manage Packages</span>
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
              {currentPage === "dashboard" && userType && (
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
                  {userType === "admin" ? (
                    <AdminProfileContent />
                  ) : (
                    <ProfileContent />
                  )}
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
              {currentPage === "UserBlog" && userType === "user" && (
                <motion.div
                  key="UserBlog"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <UserBlog />
                </motion.div>
              )}
              {/* {currentPage === "UserMyBlog" && userType === "user" && (
                <motion.div
                  key="UserMyBlog"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <UserMyBlog />
                </motion.div>
              )} */}

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
              {currentPage === "package-change-requests" &&
                userType === "admin" && (
                  <motion.div
                    key="package-change-requests"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <PackageChangeRequests />
                  </motion.div>
                )}
              {currentPage === "manage-packages" && userType === "admin" && (
                <motion.div
                  key="manage-packages"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <PackagedRequested />
                </motion.div>
              )}
              {currentPage === "UserBlog" && userType === "admin" && (
                <motion.div
                  key="UserBlog"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <UserBlog />
                </motion.div>
              )}
              {currentPage === "UserMyBlog" && userType === "admin" && (
                <motion.div
                  key="UserMyBlog"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <UserMyBlog />
                </motion.div>
              )}

              {currentPage === "NewsUpload" && userType === "admin" && (
                <motion.div
                  key="NewsUpload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <NewsUpload />
                </motion.div>
              )}
              {/* {currentPage === "UploadedNews" && userType === "admin" && (
                <motion.div
                  key="UploadedNews"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <UploadedNews />
                </motion.div>
              )} */}
              {currentPage === "AllUploadedNews" && userType === "admin" && (
                <motion.div
                  key="AllUploadedNews"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <AllUploadedNews />
                </motion.div>
              )}
              {currentPage === "SideBarCategory" && userType === "admin" && (
                <motion.div
                  key="SideBarCategory"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <SideBarCategory />
                </motion.div>
              )}

              {currentPage === "blog-request" && userType === "admin" && (
                <motion.div
                  key="blog-request"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <BlogRequest />
                </motion.div>
              )}
              {currentPage === "PackagesAdd" && userType === "admin" && (
                <motion.div
                  key="PackagesAdd"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <PackagesAdd />
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

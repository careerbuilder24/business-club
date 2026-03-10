// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { Users, FileText, Eye, TrendingUp } from "lucide-react"
// import Link from "next/link"

// interface DashboardContentProps {
//   userType: "admin" | "user"
// }

// export default function DashboardContent({ userType }: DashboardContentProps) {
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

//   return (
//     <>
//       {userType === "user" ? (
//         // USER DASHBOARD
//         <>
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
//             <p className="text-muted-foreground">Here's your business dashboard overview</p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {userStats.map((stat, index) => {
//               const Icon = stat.icon
//               return (
//                 <Card key={index}>
//                   <CardContent className="pt-6">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
//                         <p className="text-3xl font-bold text-foreground">{stat.value}</p>
//                       </div>
//                       <div className={`p-3 rounded-lg ${stat.color}`}>
//                         <Icon size={24} />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Listing Views Trend</CardTitle>
//                 <CardDescription>Last 6 months performance</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ChartContainer
//                   config={{
//                     views: { label: "Views", color: "hsl(var(--chart-1))" },
//                   }}
//                   className="h-80"
//                 >
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <ChartTooltip content={<ChartTooltipContent />} />
//                       <Line type="monotone" dataKey="listings" stroke="var(--color-views)" name="Views" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </ChartContainer>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Listing Categories</CardTitle>
//                 <CardDescription>Distribution of your listings</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ChartContainer
//                   config={{
//                     tech: { label: "Technology", color: "hsl(var(--chart-1))" },
//                     health: { label: "Healthcare", color: "hsl(var(--chart-2))" },
//                     retail: { label: "Retail", color: "hsl(var(--chart-3))" },
//                   }}
//                   className="h-80"
//                 >
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={[
//                           { name: "Technology", value: 4 },
//                           { name: "Healthcare", value: 2 },
//                           { name: "Retail", value: 2 },
//                         ]}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value }) => `${name}: ${value}`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {["#3b82f6", "#10b981", "#f59e0b"].map((color, index) => (
//                           <Cell key={`cell-${index}`} fill={color} />
//                         ))}
//                       </Pie>
//                       <ChartTooltip content={<ChartTooltipContent />} />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </ChartContainer>
//               </CardContent>
//             </Card>
//           </div>

//           {/* My Listings */}
//           <Card className="mb-8">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>My Listings</CardTitle>
//                 <CardDescription>Your active business listings</CardDescription>
//               </div>
//               <Link href="/add-listing" className="btn-primary">
//                 Add New Listing
//               </Link>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-border">
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Listing Name</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Views</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {userListings.map((listing) => (
//                       <tr key={listing.id} className="border-b border-border hover:bg-muted/50 transition-colors">
//                         <td className="py-3 px-4 text-foreground">{listing.name}</td>
//                         <td className="py-3 px-4 text-muted-foreground">{listing.views}</td>
//                         <td className="py-3 px-4">
//                           <span
//                             className={`px-3 py-1 rounded-full text-sm font-medium ${
//                               listing.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
//                             }`}
//                           >
//                             {listing.status}
//                           </span>
//                         </td>
//                         <td className="py-3 px-4 text-muted-foreground">{listing.date}</td>
//                         <td className="py-3 px-4">
//                           <button className="text-primary hover:underline font-medium">Edit</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>

//           {/* My Blog Posts */}
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>My Blog Posts</CardTitle>
//                 <CardDescription>Your published articles</CardDescription>
//               </div>
//               <Link href="/blog" className="btn-primary">
//                 Write New Post
//               </Link>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {userBlogPosts.map((post) => (
//                   <div
//                     key={post.id}
//                     className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
//                   >
//                     <div>
//                       <h4 className="font-semibold text-foreground">{post.title}</h4>
//                       <p className="text-sm text-muted-foreground">{post.date}</p>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <span className="text-sm text-muted-foreground">{post.views} views</span>
//                       <button className="text-primary hover:underline font-medium">Edit</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </>
//       ) : (
//         // ADMIN DASHBOARD
//         <>
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
//             <p className="text-muted-foreground">Manage your platform and monitor performance</p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {adminStats.map((stat, index) => {
//               const Icon = stat.icon
//               return (
//                 <Card key={index}>
//                   <CardContent className="pt-6">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
//                         <p className="text-3xl font-bold text-foreground">{stat.value}</p>
//                       </div>
//                       <div className={`p-3 rounded-lg ${stat.color}`}>
//                         <Icon size={24} />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Growth Metrics</CardTitle>
//                 <CardDescription>Listings and users growth over time</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ChartContainer
//                   config={{
//                     listings: { label: "Listings", color: "hsl(var(--chart-1))" },
//                     users: { label: "Users", color: "hsl(var(--chart-2))" },
//                   }}
//                   className="h-80"
//                 >
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <ChartTooltip content={<ChartTooltipContent />} />
//                       <Legend />
//                       <Bar dataKey="listings" fill="var(--color-listings)" name="Listings" />
//                       <Bar dataKey="users" fill="var(--color-users)" name="Users" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </ChartContainer>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Category Distribution</CardTitle>
//                 <CardDescription>Listings by category</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ChartContainer
//                   config={{
//                     tech: { label: "Technology", color: "hsl(var(--chart-1))" },
//                     health: { label: "Healthcare", color: "hsl(var(--chart-2))" },
//                     retail: { label: "Retail", color: "hsl(var(--chart-3))" },
//                     finance: { label: "Finance", color: "hsl(var(--chart-4))" },
//                     other: { label: "Other", color: "hsl(var(--chart-5))" },
//                   }}
//                   className="h-80"
//                 >
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={categoryData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value }) => `${name}: ${value}%`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {COLORS.map((color, index) => (
//                           <Cell key={`cell-${index}`} fill={color} />
//                         ))}
//                       </Pie>
//                       <ChartTooltip content={<ChartTooltipContent />} />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </ChartContainer>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Recent Listings */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Listings</CardTitle>
//               <CardDescription>Latest listings submitted to the platform</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-border">
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Business Name</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
//                       <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentListings.map((listing) => (
//                       <tr key={listing.id} className="border-b border-border hover:bg-muted/50 transition-colors">
//                         <td className="py-3 px-4 text-foreground font-medium">{listing.name}</td>
//                         <td className="py-3 px-4 text-muted-foreground">{listing.category}</td>
//                         <td className="py-3 px-4">
//                           <span
//                             className={`px-3 py-1 rounded-full text-sm font-medium ${
//                               listing.status === "Active"
//                                 ? "bg-green-100 text-green-700"
//                                 : listing.status === "Pending"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {listing.status}
//                           </span>
//                         </td>
//                         <td className="py-3 px-4 text-muted-foreground">{listing.date}</td>
//                         <td className="py-3 px-4">
//                           <button className="text-primary hover:underline font-medium">Review</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </>
//   )
// }
"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription,
  
  CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, FileText, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"

interface DashboardContentProps {
  userType: "admin" | "user"
}

export default function DashboardContent({ userType }: DashboardContentProps) {
  // ================= USER DATA =================
  const userStats = [
    { label: "My Listings", value: "8", icon: FileText, color: "bg-blue-100 text-blue-600" },
    { label: "Total Views", value: "2,450", icon: Eye, color: "bg-green-100 text-green-600" },
    { label: "Blog Posts", value: "12", icon: FileText, color: "bg-purple-100 text-purple-600" },
    { label: "Profile Views", value: "340", icon: Users, color: "bg-orange-100 text-orange-600" },
  ]

  const chartData = [
    { month: "Jan", listings: 400 },
    { month: "Feb", listings: 520 },
    { month: "Mar", listings: 680 },
    { month: "Apr", listings: 750 },
    { month: "May", listings: 890 },
    { month: "Jun", listings: 1050 },
  ]

  const userListings = [
    { id: 1, name: "My Tech Company", views: 450, status: "Active", date: "2024-10-15" },
    { id: 2, name: "Consulting Services", views: 320, status: "Active", date: "2024-10-10" },
    { id: 3, name: "Design Studio", views: 180, status: "Active", date: "2024-10-05" },
    { id: 4, name: "Old Business", views: 45, status: "Inactive", date: "2024-09-20" },
  ]

  const userBlogPosts = [
    { id: 1, title: "Tips for Growing Your Business", views: 520, date: "2024-10-18" },
    { id: 2, title: "Digital Marketing Trends 2024", views: 380, date: "2024-10-12" },
    { id: 3, title: "Customer Service Excellence", views: 290, date: "2024-10-05" },
  ]

  return (
    <>
      {userType === "admin" ? (
        // ================= ADMIN ANIMATION =================
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Title */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#2C8845] to-[#39ff6e] bg-clip-text text-transparent"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome Admin 
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You have full control of the dashboard
            </motion.p>

            {/* Floating Circle */}
            <motion.div
              className="mt-10 w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-[#2C8845] to-[#39ff6e] shadow-lg"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      ) : (
        // ================= USER DASHBOARD =================
        <>
          {/* <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Here's your business dashboard overview</p>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {userStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

        
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Listing Views Trend</CardTitle>
              <CardDescription>Last 6 months performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  views: { label: "Views", color: "hsl(var(--chart-1))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="listings" stroke="var(--color-views)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

       
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Listings</CardTitle>
                <CardDescription>Your active business listings</CardDescription>
              </div>
              <Link href="/add-listing" className="btn-primary">
                Add New Listing
              </Link>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Views</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userListings.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4">{item.views}</td>
                        <td className="py-3 px-4">{item.status}</td>
                        <td className="py-3 px-4">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card> */}
 <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Title */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#2C8845] to-[#39ff6e] bg-clip-text text-transparent"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You have full control of the dashboard
            </motion.p>

            {/* Floating Circle */}
            <motion.div
              className="mt-10 w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-[#2C8845] to-[#39ff6e] shadow-lg"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        </>
      )}
    </>
  )
}
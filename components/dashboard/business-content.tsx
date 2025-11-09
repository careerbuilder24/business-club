// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Plus, Building2, Eye, TrendingUp } from "lucide-react"

// export default function BusinessContent() {
//   const businesses = [
//     {
//       id: 1,
//       name: "Tech Solutions Inc",
//       category: "Technology",
//       views: 1250,
//       listings: 5,
//       status: "Active",
//       joinDate: "2024-01-15",
//     },
//     {
//       id: 2,
//       name: "Consulting Services",
//       category: "Business Services",
//       views: 840,
//       listings: 3,
//       status: "Active",
//       joinDate: "2024-03-20",
//     },
//     {
//       id: 3,
//       name: "Design Studio",
//       category: "Creative Services",
//       views: 620,
//       listings: 4,
//       status: "Active",
//       joinDate: "2024-05-10",
//     },
//   ]

//   return (
//     <>
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Businesses</h1>
//           <p className="text-muted-foreground">Manage all your business listings</p>
//         </div>
//         {/* <Button className="flex items-center gap-2">
//           <Plus size={18} />
//           Add New Business
//         </Button> */}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Total Businesses</p>
//                 <p className="text-3xl font-bold text-foreground">3</p>
//               </div>
//               <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
//                 <Building2 size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Total Views</p>
//                 <p className="text-3xl font-bold text-foreground">2,710</p>
//               </div>
//               <div className="p-3 rounded-lg bg-green-100 text-green-600">
//                 <Eye size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Active Listings</p>
//                 <p className="text-3xl font-bold text-foreground">12</p>
//               </div>
//               <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
//                 <TrendingUp size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="space-y-4">
//          <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Businesses</h1>
//           <p className="text-muted-foreground">Overall Listed Businesses</p>
//         </div>
//         {businesses.map((business) => (
//           <Card key={business.id} className="hover:shadow-lg transition-shadow">
//             <CardContent className="pt-6">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-foreground mb-2">{business.name}</h3>
//                   <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//                     <span>Category: {business.category}</span>
//                     <span>Listings: {business.listings}</span>
//                     <span>Views: {business.views}</span>
//                     <span className="text-green-600 font-medium">Active</span>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button variant="outline" size="sm">
//                     View
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     Edit
//                   </Button>
//                   <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </>
//   )
// }
// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Plus, Building2, Eye, TrendingUp } from "lucide-react";

// export default function BusinessContent() {
//   const businesses = [
//     {
//       id: 1,
//       name: "Tech Solutions Inc",
//       category: "Technology",
//       views: 1250,
//       listings: 5,
//       status: "Active",
//       joinDate: "2024-01-15",
//     },
//     {
//       id: 2,
//       name: "Consulting Services",
//       category: "Business Services",
//       views: 840,
//       listings: 3,
//       status: "Expired",
//       joinDate: "2024-03-20",
//     },
//     {
//       id: 3,
//       name: "Design Studio",
//       category: "Creative Services",
//       views: 620,
//       listings: 4,
//       status: "Active",
//       joinDate: "2024-05-10",
//     },
//   ];

//   return (
//     <>
//       {/* Header */}
//       <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">
//             My Businesses
//           </h1>
//           <p className="text-muted-foreground">
//             Manage all your business listings
//           </p>
//         </div>

//         {/* Add Button (optional) */}
//         <Button className="flex items-center gap-2">
//           <Plus size={18} />
//           Add New Business
//         </Button>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">
//                   Total Businesses
//                 </p>
//                 <p className="text-3xl font-bold text-foreground">3</p>
//               </div>
//               <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
//                 <Building2 size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Total Views</p>
//                 <p className="text-3xl font-bold text-foreground">2,710</p>
//               </div>
//               <div className="p-3 rounded-lg bg-green-100 text-green-600">
//                 <Eye size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">
//                   Active Listings
//                 </p>
//                 <p className="text-3xl font-bold text-foreground">12</p>
//               </div>
//               <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
//                 <TrendingUp size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Table Section */}
//       <Card className="shadow-sm">
//         <CardContent className="pt-6">
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//                   <th className="px-4 py-3">#</th>
//                   <th className="px-4 py-3">Business Name</th>
//                   <th className="px-4 py-3">Category</th>
//                   <th className="px-4 py-3">Listings</th>
//                   <th className="px-4 py-3">Views</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Join Date</th>
//                   <th className="px-4 py-3 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {businesses.map((business, index) => (
//                   <tr
//                     key={business.id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="px-4 py-3 text-sm text-gray-600">
//                       {index + 1}
//                     </td>
//                     <td className="px-4 py-3 font-medium text-gray-900">
//                       {business.name}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.category}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.listings}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.views}
//                     </td>
//                     <td
//                       className={`px-4 py-3 font-medium ${
//                         business.status === "Active"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {business.status}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.joinDate}
//                     </td>
//                     <td className="px-4 py-3 text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button variant="outline" size="sm">
//                           View
//                         </Button>
//                         <Button variant="outline" size="sm">
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Plus, Building2, Eye, TrendingUp } from "lucide-react";

// export default function BusinessContent() {
//   const businesses = [
//     {
//       id: 1,
//       name: "Tech Solutions Inc",
//       category: "Technology",
//       views: 1250,
//       listings: 5,
//       status: "Active",
//       packageStatus: "Activated",
//       joinDate: "2024-01-15",
//     },
//     {
//       id: 2,
//       name: "Consulting Services",
//       category: "Business Services",
//       views: 840,
//       listings: 3,
//       status: "Active",
//       packageStatus: "Pending",
//       joinDate: "2024-03-20",
//     },
//     {
//       id: 3,
//       name: "Design Studio",
//       category: "Creative Services",
//       views: 620,
//       listings: 4,
//       status: "Active",
//       packageStatus: "Denied",
//       joinDate: "2024-05-10",
//     },
//   ];

//   // Helper to style package status badge
//   const getPackageStatusColor = (status: string) => {
//     switch (status) {
//       case "Activated":
//         return "bg-green-100 text-green-700 border border-green-300";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-700 border border-yellow-300";
//       case "Denied":
//         return "bg-red-100 text-red-700 border border-red-300";
//       default:
//         return "bg-gray-100 text-gray-600 border border-gray-300";
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">
//             My Businesses
//           </h1>
//           <p className="text-muted-foreground">
//             Manage all your business listings
//           </p>
//         </div>

//         {/* <Button className="flex items-center gap-2">
//           <Plus size={18} />
//           Add New Business
//         </Button> */}
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">
//                   Total Businesses
//                 </p>
//                 <p className="text-3xl font-bold text-foreground">3</p>
//               </div>
//               <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
//                 <Building2 size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Total Views</p>
//                 <p className="text-3xl font-bold text-foreground">2,710</p>
//               </div>
//               <div className="p-3 rounded-lg bg-green-100 text-green-600">
//                 <Eye size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">
//                   Active Listings
//                 </p>
//                 <p className="text-3xl font-bold text-foreground">12</p>
//               </div>
//               <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
//                 <TrendingUp size={24} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Table Section */}
//       <Card className="shadow-sm">
//         <CardContent className="pt-6">
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//                   <th className="px-4 py-3">#</th>
//                   <th className="px-4 py-3">Business Name</th>
//                   <th className="px-4 py-3">Category</th>
//                   <th className="px-4 py-3">Listings</th>
//                   <th className="px-4 py-3">Views</th>
//                   <th className="px-4 py-3">Package Status</th>
//                   <th className="px-4 py-3">Join Date</th>
//                   <th className="px-4 py-3 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {businesses.map((business, index) => (
//                   <tr
//                     key={business.id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="px-4 py-3 text-sm text-gray-600">
//                       {index + 1}
//                     </td>
//                     <td className="px-4 py-3 font-medium text-gray-900">
//                       {business.name}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.category}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.listings}
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.views}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`text-xs font-semibold px-3 py-1 rounded-full ${getPackageStatusColor(
//                           business.packageStatus
//                         )}`}
//                       >
//                         {business.packageStatus}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {business.joinDate}
//                     </td>
//                     <td className="px-4 py-3 text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button variant="outline" size="sm">
//                           View
//                         </Button>
//                         <Button variant="outline" size="sm">
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Eye, TrendingUp } from "lucide-react";

export default function BusinessContent() {
  const businesses = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      category: "Technology",
      views: 1250,
      listings: 5,
      status: "Active",
      packageStatus: "Activated",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Consulting Services",
      category: "Business Services",
      views: 840,
      listings: 3,
      status: "Active",
      packageStatus: "Pending",
      joinDate: "2024-03-20",
    },
    {
      id: 3,
      name: "Design Studio",
      category: "Creative Services",
      views: 620,
      listings: 4,
      status: "Active",
      packageStatus: "Denied",
      joinDate: "2024-05-10",
    },
  ];

  const getPackageStatusColor = (status: string) => {
    switch (status) {
      case "Activated":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Denied":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300";
    }
  };

  // Sample stats for services and products
  const totalServices = 18;
  const totalProducts = 32;

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Businesses
          </h1>
          <p className="text-muted-foreground">
            Manage all your business listings
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Businesses
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {businesses.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Building2 size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                <p className="text-3xl font-bold text-foreground">
                  {businesses.reduce((acc, b) => acc + b.views, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <Eye size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Active Listings
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {businesses.reduce((acc, b) => acc + b.listings, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Card - Services */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Services</p>
                <p className="text-3xl font-bold text-foreground">{totalServices}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <Plus size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Card - Products */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Products</p>
                <p className="text-3xl font-bold text-foreground">{totalProducts}</p>
              </div>
              <div className="p-3 rounded-lg bg-pink-100 text-pink-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Business Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Listings</th>
                  <th className="px-4 py-3">Views</th>
                  <th className="px-4 py-3">Package Status</th>
                  <th className="px-4 py-3">Join Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((business, index) => (
                  <tr
                    key={business.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{business.name}</td>
                    <td className="px-4 py-3 text-gray-600">{business.category}</td>
                    <td className="px-4 py-3 text-gray-600">{business.listings}</td>
                    <td className="px-4 py-3 text-gray-600">{business.views}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getPackageStatusColor(
                          business.packageStatus
                        )}`}
                      >
                        {business.packageStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{business.joinDate}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

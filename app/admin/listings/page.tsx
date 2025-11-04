"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const listings = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      owner: "John Anderson",
      category: "Technology",
      status: "Active",
      views: 2450,
      rating: 4.8,
      createdDate: "2024-10-15",
      featured: true,
    },
    {
      id: 2,
      name: "Creative Design Studio",
      owner: "Sarah Miller",
      category: "Design",
      status: "Pending",
      views: 1200,
      rating: 4.9,
      createdDate: "2024-10-18",
      featured: false,
    },
    {
      id: 3,
      name: "Health Plus Clinic",
      owner: "Dr. James Wilson",
      category: "Healthcare",
      status: "Active",
      views: 890,
      rating: 4.6,
      createdDate: "2024-10-10",
      featured: true,
    },
    {
      id: 4,
      name: "Fashion Hub Boutique",
      owner: "Emma Davis",
      category: "Retail",
      status: "Inactive",
      views: 450,
      rating: 4.3,
      createdDate: "2024-09-20",
      featured: false,
    },
    {
      id: 5,
      name: "Finance Pro Advisors",
      owner: "Michael Chen",
      category: "Finance",
      status: "Active",
      views: 1680,
      rating: 4.7,
      createdDate: "2024-10-12",
      featured: true,
    },
  ]

  const stats = [
    { label: "Total Listings", value: "1,234", icon: "📋" },
    { label: "Active", value: "892", icon: "✅" },
    { label: "Pending Review", value: "87", icon: "⏳" },
    { label: "Inactive", value: "255", icon: "⏸️" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="text-green-600" size={18} />
      case "Pending":
        return <Clock className="text-yellow-600" size={18} />
      case "Inactive":
        return <AlertCircle className="text-gray-600" size={18} />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Inactive":
        return "bg-gray-100 text-gray-700"
      default:
        return ""
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || listing.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container-custom py-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 w-fit">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manage Listings</h1>
              <p className="text-muted-foreground mt-2">Review, approve, and manage all business listings</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              New Listing
            </Button>
          </div>
        </div>
      </div>

      <main className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search listings or owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Filter size={18} />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listings Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Listing Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Owner</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Views</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Rating</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-foreground font-medium">{listing.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{listing.owner}</td>
                      <td className="py-3 px-4 text-muted-foreground">{listing.category}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(listing.status)}
                          <Badge className={getStatusColor(listing.status)}>{listing.status}</Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{listing.views.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold text-foreground ml-1">{listing.rating}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye size={16} />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 size={16} />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">Showing 1-5 of {filteredListings.length} listings</p>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

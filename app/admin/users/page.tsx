"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Search, Edit, Trash2, Eye, MoreHorizontal, UserCheck, UserX, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const users = [
    {
      id: 1,
      name: "John Anderson",
      email: "john@example.com",
      role: "Business Owner",
      status: "Active",
      joined: "2024-01-15",
      listings: 5,
      verified: true,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah@example.com",
      role: "Business Owner",
      status: "Active",
      joined: "2024-02-20",
      listings: 3,
      verified: true,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      role: "Business Owner",
      status: "Suspended",
      joined: "2024-03-10",
      listings: 8,
      verified: false,
      lastActive: "7 days ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Regular User",
      status: "Active",
      joined: "2024-04-05",
      listings: 1,
      verified: true,
      lastActive: "5 minutes ago",
    },
    {
      id: 5,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Business Owner",
      status: "Inactive",
      joined: "2024-05-12",
      listings: 2,
      verified: true,
      lastActive: "30 days ago",
    },
  ]

  const stats = [
    { label: "Total Users", value: "12,450", icon: "👥" },
    { label: "Active", value: "10,238", icon: "✅" },
    { label: "Business Owners", value: "3,245", icon: "🏢" },
    { label: "Suspended", value: "89", icon: "🔒" },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    return status === "Active" ? (
      <UserCheck className="text-green-600" size={18} />
    ) : (
      <UserX className="text-red-600" size={18} />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Inactive":
        return "bg-gray-100 text-gray-700"
      case "Suspended":
        return "bg-red-100 text-red-700"
      default:
        return ""
    }
  }

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
              <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
              <p className="text-muted-foreground mt-2">Monitor and manage all platform users</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              Add User
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
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Roles</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Regular User">Regular User</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">User Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Listings</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Last Active</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-foreground font-medium">{user.name}</p>
                          {user.verified && <Badge className="mt-1 bg-blue-100 text-blue-700 text-xs">Verified</Badge>}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                          {user.email}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.role}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(user.status)}
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-foreground">{user.listings}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.lastActive}</td>
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Mail size={16} />
                              Send Email
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
          <p className="text-sm text-muted-foreground">Showing 1-5 of {filteredUsers.length} users</p>
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

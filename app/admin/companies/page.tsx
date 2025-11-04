"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Search, Filter, Edit, Trash2, Eye, MoreHorizontal, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const companies = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      owner: "John Anderson",
      email: "john@techsolutions.com",
      phone: "+1 (555) 123-4567",
      listings: 5,
      status: "Active",
      joined: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      name: "Creative Design Co",
      owner: "Sarah Miller",
      email: "sarah@creativedesign.com",
      phone: "+1 (555) 234-5678",
      listings: 3,
      status: "Active",
      joined: "2024-02-20",
      verified: true,
    },
    {
      id: 3,
      name: "Digital Marketing Pro",
      owner: "Mike Chen",
      email: "mike@digitalmarketing.com",
      phone: "+1 (555) 345-6789",
      listings: 8,
      status: "Suspended",
      joined: "2024-03-10",
      verified: false,
    },
    {
      id: 4,
      name: "Health Plus Clinic",
      owner: "Dr. James Wilson",
      email: "james@healthplus.com",
      phone: "+1 (555) 456-7890",
      listings: 2,
      status: "Active",
      joined: "2024-04-05",
      verified: true,
    },
  ]

  const stats = [
    { label: "Total Companies", value: "342", icon: "🏢" },
    { label: "Active", value: "298", icon: "✅" },
    { label: "Pending Verification", value: "28", icon: "⏳" },
    { label: "Suspended", value: "16", icon: "🔒" },
  ]

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <h1 className="text-3xl font-bold text-foreground">Manage Companies</h1>
              <p className="text-muted-foreground mt-2">Monitor and manage all registered companies on the platform</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              Add Company
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
                  placeholder="Search companies or owners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter size={18} />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="text-primary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.owner}</p>
                    </div>
                  </div>
                  {company.verified && <Badge className="bg-green-100 text-green-700 flex-shrink-0">Verified</Badge>}
                </div>

                <div className="space-y-2 text-sm mb-4 pb-4 border-b border-border">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">{company.listings}</span> listings
                  </p>
                  <p className="text-muted-foreground truncate">Email: {company.email}</p>
                  <p className="text-muted-foreground">Phone: {company.phone}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge
                      className={
                        company.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }
                    >
                      {company.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="text-sm font-medium text-foreground">{company.joined}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 bg-transparent"
                  >
                    <Eye size={16} />
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

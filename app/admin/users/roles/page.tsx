"use client"

import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function UserRolesPage() {
  const roles = [
    {
      id: 1,
      name: "Admin",
      description: "Full platform access with all management capabilities",
      users: 12,
      permissions: [
        "Manage users",
        "Manage listings",
        "Manage companies",
        "View reports",
        "System settings",
        "Access logs",
      ],
      level: "Super",
    },
    {
      id: 2,
      name: "Moderator",
      description: "Moderate content and manage listing approvals",
      users: 24,
      permissions: ["View listings", "Approve/reject listings", "Moderate reviews", "View reports"],
      level: "High",
    },
    {
      id: 3,
      name: "Business Owner",
      description: "Create and manage business listings",
      users: 3245,
      permissions: ["Create listings", "Edit own listings", "View analytics", "Respond to reviews"],
      level: "Medium",
    },
    {
      id: 4,
      name: "Regular User",
      description: "View and search listings, write reviews",
      users: 9169,
      permissions: ["View listings", "Search businesses", "Write reviews", "Save favorites"],
      level: "Low",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container-custom py-6">
          <Link href="/admin/users" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 w-fit">
            <ArrowLeft size={20} />
            <span>Back to Users</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Roles & Permissions</h1>
              <p className="text-muted-foreground mt-2">Manage roles and assign permissions</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              New Role
            </Button>
          </div>
        </div>
      </div>

      <main className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="text-primary" size={24} />
                      <CardTitle>{role.name}</CardTitle>
                      <Badge className="bg-blue-100 text-blue-700">{role.level}</Badge>
                    </div>
                    <CardDescription>{role.description}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Edit size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold text-foreground">{role.users}</span> users with this role
                </p>

                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground mb-3">Permissions:</p>
                  <div className="space-y-2">
                    {role.permissions.map((permission, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Manage Permissions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Building2, Eye, TrendingUp } from "lucide-react"

export default function BusinessContent() {
  const businesses = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      category: "Technology",
      views: 1250,
      listings: 5,
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Consulting Services",
      category: "Business Services",
      views: 840,
      listings: 3,
      status: "Active",
      joinDate: "2024-03-20",
    },
    {
      id: 3,
      name: "Design Studio",
      category: "Creative Services",
      views: 620,
      listings: 4,
      status: "Active",
      joinDate: "2024-05-10",
    },
  ]

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Businesses</h1>
          <p className="text-muted-foreground">Manage all your business listings</p>
        </div>
        {/* <Button className="flex items-center gap-2">
          <Plus size={18} />
          Add New Business
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Businesses</p>
                <p className="text-3xl font-bold text-foreground">3</p>
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
                <p className="text-3xl font-bold text-foreground">2,710</p>
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
                <p className="text-sm text-muted-foreground mb-1">Active Listings</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {businesses.map((business) => (
          <Card key={business.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{business.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Category: {business.category}</span>
                    <span>Listings: {business.listings}</span>
                    <span>Views: {business.views}</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

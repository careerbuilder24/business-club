"use client"

import Link from "next/link"
import { ArrowLeft, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminReportsPage() {
  // Sample data
  const platformMetrics = [
    { month: "Jan", users: 8200, listings: 450, revenue: 12500 },
    { month: "Feb", users: 9100, listings: 520, revenue: 14200 },
    { month: "Mar", users: 10200, listings: 620, revenue: 16800 },
    { month: "Apr", users: 11800, listings: 740, revenue: 19500 },
    { month: "May", users: 13200, listings: 850, revenue: 22100 },
    { month: "Jun", users: 15400, listings: 980, revenue: 25600 },
  ]

  const categoryData = [
    { name: "Technology", value: 28, revenue: 6400 },
    { name: "Healthcare", value: 22, revenue: 5200 },
    { name: "Design", value: 18, revenue: 4300 },
    { name: "Marketing", value: 16, revenue: 3800 },
    { name: "Other", value: 16, revenue: 3900 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  const kpis = [
    { label: "Total Revenue", value: "$82,000", change: "+18.5%", icon: "💰" },
    { label: "Active Users", value: "15,450", change: "+12.3%", icon: "👥" },
    { label: "Total Listings", value: "3,850", change: "+8.7%", icon: "📋" },
    { label: "Avg. Session", value: "12m 34s", change: "+3.2%", icon: "⏱️" },
  ]

  const reports = [
    { name: "Platform Overview", description: "High-level metrics and KPIs", generated: "2 days ago" },
    { name: "User Analytics", description: "User growth, activity, and engagement", generated: "1 week ago" },
    { name: "Revenue Report", description: "Subscription and payment metrics", generated: "3 days ago" },
    { name: "Listing Performance", description: "Listing views, ratings, and activity", generated: "2 days ago" },
    { name: "Geographic Report", description: "User and listing distribution by region", generated: "5 days ago" },
    { name: "Support Metrics", description: "Customer support tickets and satisfaction", generated: "1 week ago" },
  ]

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
              <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground mt-2">Platform performance and business intelligence</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Calendar size={20} />
                Date Range
              </Button>
              <Button className="flex items-center gap-2">
                <Download size={20} />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container-custom py-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                    <p className="text-3xl font-bold text-foreground mb-2">{kpi.value}</p>
                    <p className="text-xs text-green-600 font-medium">{kpi.change}</p>
                  </div>
                  <span className="text-3xl">{kpi.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Platform Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Users, listings, and revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: { label: "Users", color: "hsl(var(--chart-1))" },
                  listings: { label: "Listings", color: "hsl(var(--chart-2))" },
                  revenue: { label: "Revenue (x100)", color: "hsl(var(--chart-3))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={platformMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="var(--color-users)" name="Users" />
                    <Line type="monotone" dataKey="listings" stroke="var(--color-listings)" name="Listings" />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Listings by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  tech: { label: "Technology", color: "hsl(var(--chart-1))" },
                  health: { label: "Healthcare", color: "hsl(var(--chart-2))" },
                  design: { label: "Design", color: "hsl(var(--chart-3))" },
                  marketing: { label: "Marketing", color: "hsl(var(--chart-4))" },
                  other: { label: "Other", color: "hsl(var(--chart-5))" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Revenue Breakdown</CardTitle>
            <CardDescription>Subscription revenue by plan tier</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                starter: { label: "Starter", color: "hsl(var(--chart-1))" },
                professional: { label: "Professional", color: "hsl(var(--chart-2))" },
                enterprise: { label: "Enterprise", color: "hsl(var(--chart-3))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: "Jan", starter: 3500, professional: 5200, enterprise: 3800 },
                    { month: "Feb", starter: 3800, professional: 5900, enterprise: 4500 },
                    { month: "Mar", starter: 4200, professional: 6800, enterprise: 5800 },
                    { month: "Apr", starter: 4800, professional: 7500, enterprise: 7200 },
                    { month: "May", starter: 5500, professional: 8200, enterprise: 8400 },
                    { month: "Jun", starter: 6200, professional: 9100, enterprise: 10300 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="starter" fill="var(--color-starter)" name="Starter" />
                  <Bar dataKey="professional" fill="var(--color-professional)" name="Professional" />
                  <Bar dataKey="enterprise" fill="var(--color-enterprise)" name="Enterprise" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Reports Section */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Download generated reports for deeper insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-foreground mb-1">{report.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Generated {report.generated}</p>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

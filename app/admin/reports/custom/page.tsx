"use client"

import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CustomReportsPage() {
  const customReports = [
    {
      id: 1,
      name: "Quarterly Business Review",
      description: "Comprehensive quarterly performance analysis",
      schedule: "Quarterly",
      lastRun: "2024-10-01",
      nextRun: "2024-12-31",
      status: "Active",
    },
    {
      id: 2,
      name: "Weekly Digest",
      description: "Summary of key metrics for the week",
      schedule: "Weekly",
      lastRun: "2024-10-18",
      nextRun: "2024-10-25",
      status: "Active",
    },
    {
      id: 3,
      name: "User Churn Analysis",
      description: "Analyze user churn patterns and reasons",
      schedule: "Monthly",
      lastRun: "2024-10-01",
      nextRun: "2024-11-01",
      status: "Active",
    },
    {
      id: 4,
      name: "Revenue Projection",
      description: "Forecast revenue based on current trends",
      schedule: "Monthly",
      lastRun: "2024-10-05",
      nextRun: "2024-11-05",
      status: "Paused",
    },
  ]

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container-custom py-6">
          <Link href="/admin/reports" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 w-fit">
            <ArrowLeft size={20} />
            <span>Back to Reports</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Custom Reports</h1>
              <p className="text-muted-foreground mt-2">Create and manage automated report schedules</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              Create Report
            </Button>
          </div>
        </div>
      </div>

      <main className="container-custom py-8">
        {/* Report Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Platform Overview", description: "KPIs and platform health metrics" },
              { name: "User Growth", description: "User acquisition and retention analysis" },
              { name: "Revenue Analysis", description: "Subscription and payment metrics" },
              { name: "Listing Performance", description: "Listing activity and engagement" },
              { name: "Geographic Insights", description: "Regional performance data" },
              { name: "Support Metrics", description: "Customer support and satisfaction" },
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-foreground mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Scheduled Reports</h2>
          <div className="space-y-4">
            {customReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-foreground">{report.name}</h3>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground">SCHEDULE</p>
                          <p className="text-foreground font-medium">{report.schedule}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground">LAST RUN</p>
                          <p className="text-foreground font-medium">{report.lastRun}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground">NEXT RUN</p>
                          <p className="text-foreground font-medium">{report.nextRun}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

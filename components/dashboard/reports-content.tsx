"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Eye, Trash2, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function ReportsContent() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null)

  const reports = [
    {
      id: 1,
      reporter: "John Doe",
      reporterEmail: "john@example.com",
      businessName: "Tech Solutions Inc",
      reason: "Inappropriate content",
      description: "The business listing contains inappropriate language and misleading information.",
      date: "2024-10-20",
      status: "Pending",
      severity: "High",
    },
    {
      id: 2,
      reporter: "Jane Smith",
      reporterEmail: "jane@example.com",
      businessName: "Fashion Hub",
      reason: "Duplicate listing",
      description: "This business appears to have multiple listings with similar information.",
      date: "2024-10-19",
      status: "Reviewing",
      severity: "Medium",
    },
    {
      id: 3,
      reporter: "Mike Johnson",
      reporterEmail: "mike@example.com",
      businessName: "Health Plus Clinic",
      reason: "Fraudulent activity",
      description: "Suspicious activity detected on this listing. May be a scam.",
      date: "2024-10-18",
      status: "Resolved",
      severity: "Critical",
    },
    {
      id: 4,
      reporter: "Sarah Wilson",
      reporterEmail: "sarah@example.com",
      businessName: "Finance Pro",
      reason: "Spamming",
      description: "The business is posting spam content repeatedly.",
      date: "2024-10-17",
      status: "Pending",
      severity: "Low",
    },
  ]

  const selectedReportData = reports.find((r) => r.id === selectedReport)

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground">View and manage reported listings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
            <p className="text-3xl font-bold text-foreground">{reports.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{reports.filter((r) => r.status === "Pending").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Reviewing</p>
            <p className="text-3xl font-bold text-blue-600">{reports.filter((r) => r.status === "Reviewing").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Resolved</p>
            <p className="text-3xl font-bold text-green-600">{reports.filter((r) => r.status === "Resolved").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={20} />
              Reports List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {reports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedReport === report.id ? "bg-primary text-white" : "hover:bg-muted border border-border"
                  }`}
                >
                  <p className="font-medium text-sm">{report.businessName}</p>
                  <p className={`text-xs ${selectedReport === report.id ? "text-white/80" : "text-muted-foreground"}`}>
                    {report.reason}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        report.severity === "Critical"
                          ? "bg-red-100 text-red-700"
                          : report.severity === "High"
                            ? "bg-orange-100 text-orange-700"
                            : report.severity === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {report.severity}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Details */}
        <Card className="lg:col-span-2">
          {selectedReportData ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Report Details</CardTitle>
                    <CardDescription>{selectedReportData.businessName}</CardDescription>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedReportData.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : selectedReportData.status === "Reviewing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {selectedReportData.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Report Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Reported By:</span>{" "}
                      <span className="font-medium">{selectedReportData.reporter}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <span className="font-medium">{selectedReportData.reporterEmail}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      <span className="font-medium">{selectedReportData.date}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Severity:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs font-medium inline-block ${
                          selectedReportData.severity === "Critical"
                            ? "bg-red-100 text-red-700"
                            : selectedReportData.severity === "High"
                              ? "bg-orange-100 text-orange-700"
                              : selectedReportData.severity === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                        }`}
                      >
                        {selectedReportData.severity}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Reason: {selectedReportData.reason}</h4>
                  <p className="text-sm text-muted-foreground">{selectedReportData.description}</p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex items-center gap-2">
                    <Eye size={16} />
                    View Business
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <MessageSquare size={16} />
                    Send Message
                  </Button>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 size={16} />
                    Remove Listing
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Admin Notes</label>
                  <textarea
                    placeholder="Add your notes about this report..."
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Dismiss Report</Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="pt-12 text-center">
              <AlertCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">Select a report to view details</p>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  )
}

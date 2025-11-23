
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Eye, Check, X } from "lucide-react";
import { useState } from "react";

export default function ManageListingsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [showRejectionModal, setShowRejectionModal] = useState<number | null>(null);

  const [listings, setListings] = useState([
    {
      id: 1,
      name: "Tech Solutions Inc",
      category: "Technology",
      submittedBy: "John Doe",
      email: "john@techsolutions.com",
      status: "Pending",
      views: 450,
      date: "2024-10-20",
    },
    {
      id: 2,
      name: "Health Plus Clinic",
      category: "Healthcare",
      submittedBy: "Jane Smith",
      email: "jane@healthplus.com",
      status: "Active",
      views: 320,
      date: "2024-10-19",
    },
    {
      id: 3,
      name: "Fashion Hub",
      category: "Retail",
      submittedBy: "Mike Johnson",
      email: "mike@fashionhub.com",
      status: "Rejected",
      views: 180,
      date: "2024-10-18",
    },
    {
      id: 4,
      name: "Finance Pro",
      category: "Finance",
      submittedBy: "Sarah Wilson",
      email: "sarah@financepro.com",
      status: "Active",
      views: 560,
      date: "2024-10-17",
    },
  ]);

  const filteredListings = listings.filter(
    (listing) =>
      (filterStatus === "all" || listing.status === filterStatus) &&
      listing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Approve listing handler ---
  const handleApproveListing = (id: number) => {
    setLoadingId(id);
    setTimeout(() => {
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: "Active" } : l))
      );
      setLoadingId(null);
      alert(" Listing approved successfully!");
    }, 800);
  };

  // --- Reject listing handler ---
  const handleRejectListing = (id: number) => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    setLoadingId(id);
    setTimeout(() => {
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: "Rejected" } : l))
      );
      setRejectionReason("");
      setShowRejectionModal(null);
      setLoadingId(null);
      alert(" Listing rejected successfully!");
    }, 800);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Manage Listings</h1>
        <p className="text-muted-foreground">Review and manage all business listings on the platform</p>
      </div>

      {/* Filter/Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Listing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listings ({filteredListings.length})</CardTitle>
          <CardDescription>All business listings submitted to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Business Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Submitted By</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Views</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium">{listing.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{listing.category}</td>
                    <td className="py-3 px-4 text-muted-foreground">{listing.submittedBy}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          listing.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : listing.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground flex items-center gap-1">
                      <Eye size={16} />
                      {listing.views}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{listing.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 bg-transparent"
                          onClick={() => handleApproveListing(listing.id)}
                          disabled={loadingId === listing.id}
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => setShowRejectionModal(listing.id)}
                          disabled={loadingId === listing.id}
                        >
                          <X size={16} />
                        </Button>
                        <Button size="sm" variant="outline">
                          Details
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

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reject Listing</CardTitle>
              <CardDescription>Provide a reason for rejection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full h-24 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowRejectionModal(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleRejectListing(showRejectionModal)}
                  disabled={loadingId === showRejectionModal}
                >
                  Send Rejection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

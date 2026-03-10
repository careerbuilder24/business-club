"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Eye, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import useListing from "@/hooks/useListing";

export default function ManageListingsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [showRejectionModal, setShowRejectionModal] = useState<number | null>(
    null
  );
  const [selectedListing, setSelectedListing] = useState<any>(null);

  const { listingss } = useListing();
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    if (listingss && listingss.length) {
      const mapped = listingss.map((l: any) => ({
        id: l.id,
        name: l.listing_name || l.company_name,
        category: l.category,
        submittedBy: l.company_name,
        email: l.email,
        // status: l.status || "Pending",
        status:
          l.status?.toLowerCase() === "active"
            ? "Active"
            : l.status?.toLowerCase() === "rejected"
            ? "Rejected"
            : "Pending",

        views: 0,
        date: l.created_at?.split("T")[0] || "",
        details: l.description,
        address: l.address,
        phone: l.phone,
        website: l.website,
        facebook: l.facebook,
        logo_url: l.logo_url,
        cover_url: l.cover_url,
        gallery_urls: l.gallery_urls,
        labels: l.labels,
      }));
      setListings(mapped);
    }
  }, [listingss]);

  const filteredListings = listings.filter(
    (listing) =>
      (filterStatus === "all" || listing.status === filterStatus) &&
      listing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Approve listing
  const handleApproveListing = async (id: number) => {
    setLoadingId(id);

    const res = await fetch("/api/listings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "Active" }),
    });

    const data = await res.json();

    if (data.success) {
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: "Active" } : l))
      );
      alert("Listing approved!");
    } else {
      alert("Error: " + data.error);
    }

    setLoadingId(null);
  };

  // Reject listing
  const handleRejectListing = async (id: number) => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    setLoadingId(id);

    const res = await fetch("/api/listings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status: "Rejected",
        reason: rejectionReason,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: "Rejected" } : l))
      );
      alert("Listing rejected!");
    } else {
      alert("Error: " + data.error);
    }

    setRejectionReason("");
    setShowRejectionModal(null);
    setLoadingId(null);
  };

  const handleViewDetails = (listing: any) => {
    setSelectedListing(listing);
  };
  console.log(listingss);
  // ------------------- DETAILS VIEW -------------------
  if (selectedListing) {
    return (
      <div className="p-6">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => setSelectedListing(null)}
        >
          ← Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{selectedListing.name}</CardTitle>
            <CardDescription>Full business details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {selectedListing.logo_url && (
              <img
                src={selectedListing.logo_url}
                alt={selectedListing.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
            <p>
              <strong>Category:</strong> {selectedListing.category}
            </p>
            <p>
              <strong>Company Name:</strong> {selectedListing.submittedBy}
            </p>
            <p>
              <strong>Email:</strong> {selectedListing.email}
            </p>
            <p>
              <strong>Status:</strong> {selectedListing.status}
            </p>
            <p>
              <strong>Views:</strong> {selectedListing.views}
            </p>
            <p>
              <strong>Date:</strong> {selectedListing.date}
            </p>
            <p>
              <strong>Phone:</strong> {selectedListing.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedListing.address}
            </p>
            {selectedListing.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={selectedListing.website}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {selectedListing.website}
                </a>
              </p>
            )}
            {selectedListing.facebook && (
              <p>
                <strong>Facebook:</strong>{" "}
                <a
                  href={selectedListing.facebook}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {selectedListing.facebook}
                </a>
              </p>
            )}
            {selectedListing.labels && (
              <p>
                <strong>Labels:</strong> {selectedListing.labels.join(", ")}
              </p>
            )}
            {selectedListing.gallery_urls &&
              selectedListing.gallery_urls.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selectedListing.gallery_urls.map(
                    (url: string, idx: number) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Gallery ${idx}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )
                  )}
                </div>
              )}
            <div className="border p-3 rounded-lg bg-muted/40">
              <strong>Description:</strong>
              <p>{selectedListing.details}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ------------------- TABLE VIEW -------------------
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Manage Listings
        </h1>
        <p className="text-muted-foreground">
          Review and manage all business listings on the platform
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-muted-foreground"
                size={18}
              />
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

      <Card>
        <CardHeader>
          <CardTitle>Listings ({filteredListings.length})</CardTitle>
          <CardDescription>
            All business listings submitted to the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">
                    Business Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Company</th>
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
                    <td className="py-3 px-4 text-muted-foreground">
                      {listing.category}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {listing.submittedBy}
                    </td>
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
                    <td className="py-3 px-4 text-muted-foreground">
                      {listing.date}
                    </td>
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

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(listing)}
                        >
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Reject Listing</h2>
            <textarea
              className="w-full border p-2 rounded-lg mb-4"
              placeholder="Enter rejection reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectionModal(null);
                  setRejectionReason("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => handleRejectListing(showRejectionModal)}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Eye, TrendingUp } from "lucide-react";
import useListing from "@/hooks/useListing";
import useLoggedUser from "@/hooks/useLoggedUser";
import Swal from "sweetalert2";

type Listing = {
  id: number | string;
  listing_name: string;
  company_name?: string;
  type?: string;
  category?: string;
  address?: string;
  district?: string;
  city?: string;

  owner_email?: string;
  email?: string;
  user_email?: string;

  services?: number | any[];
  services_count?: number;
  products?: number | any[];
  products_count?: number;

  views?: number;
  status?: string;
  join_date?: string;
  createdAt?: string | Date;
  created_at?: string | Date;

  description?: string;
  phone?: string;
  website?: string;
  facebook?: string;
  labels?: any[];

  logo_url?: string;
  cover_url?: string;
  gallery_url?: string | string[];
  gallery_urls?: string | string[] | any[];
};

export default function BusinessContent() {
  const { listingss, loading } = useListing();
  const { loggedUser } = useLoggedUser();

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [editForm, setEditForm] = useState<Listing | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // 🌿 INITIAL GREEN SPINNING LOADER
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-300 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  const allListings: Listing[] = (listingss || []) as Listing[];

  // Filter listings by logged user email
  const myListings = allListings.filter((item) => {
    const listingEmail = item.owner_email || item.email || item.user_email;
    if (!loggedUser?.email || !listingEmail) return false;
    return listingEmail === loggedUser.email;
  });

  // Helpers
  const getServiceCount = (item: Listing) => {
    if (typeof item.services_count === "number") return item.services_count;
    if (typeof item.services === "number") return item.services;
    if (Array.isArray(item.services)) return item.services.length;
    return 0;
  };

  const getProductCount = (item: Listing) => {
    if (typeof item.products_count === "number") return item.products_count;
    if (typeof item.products === "number") return item.products;
    if (Array.isArray(item.products)) return item.products.length;
    return 0;
  };

  const getViews = (item: Listing) =>
    typeof item.views === "number" ? item.views : 0;

  const getStatus = (item: Listing) => item.status || "Active";

  const getCreatedAt = (item: Listing) => {
    const raw = (item.created_at ?? item.createdAt ?? item.join_date) as
      | string
      | Date
      | undefined;
    if (!raw) return "-";
    const date = raw instanceof Date ? raw : new Date(raw);
    if (isNaN(date.getTime())) return String(raw);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPackageStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Denied":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300";
    }
  };

  const getGalleryImages = (item: Listing): string[] => {
    const rawGallery = item.gallery_urls ?? item.gallery_url;
    if (!rawGallery) return [];

    if (Array.isArray(rawGallery)) {
      return rawGallery
        .map((g: any) => {
          if (!g) return null;
          if (typeof g === "string") return g;
          if (typeof g.url === "string") return g.url;
          if (typeof g.image_url === "string") return g.image_url;
          return null;
        })
        .filter((u): u is string => !!u);
    }

    if (typeof rawGallery === "string") {
      return rawGallery
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    return [];
  };

  const totalBusinesses = myListings.length;
  const totalViews = myListings.reduce((acc, item) => acc + getViews(item), 0);
  const totalServices = myListings.reduce(
    (acc, item) => acc + getServiceCount(item),
    0
  );
  const totalProducts = myListings.reduce(
    (acc, item) => acc + getProductCount(item),
    0
  );
  const activeBusinesses = myListings.filter(
    (item) => getStatus(item) === "Active"
  ).length;

  // ---------- Form helpers ----------
  const handleFieldChange = (field: keyof Listing, value: any) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!editForm || !editForm.id) return;
    try {
      setSaving(true);
      const res = await fetch("/api/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Update failed");

      await Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Listing updated successfully.",
      });

      // Simple way to refresh list + detail
      window.location.reload();
    } catch (err: any) {
      console.error("UPDATE ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Failed to update listing.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedListing?.id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This business will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/listings?id=${selectedListing.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Delete failed");

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Listing deleted successfully.",
      });

      window.location.reload();
    } catch (err: any) {
      console.error("DELETE ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Failed to delete listing.",
      });
    } finally {
      setDeleting(false);
    }
  };

  // ---------------- DETAIL VIEW ----------------
  if (selectedListing && editForm) {
    const status = getStatus(editForm);
    const serviceCount = getServiceCount(editForm);
    const productCount = getProductCount(editForm);
    const galleryImages = getGalleryImages(editForm);

    return (
      <div className="space-y-6">
        {/* Header + actions */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Edit: {editForm.listing_name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Edit all details or delete this business listing.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedListing(null);
                setEditForm(null);
              }}
            >
              Back to My Businesses
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Main editable fields */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Listing / company */}
              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Business / Listing Name
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.listing_name || ""}
                  onChange={(e) =>
                    handleFieldChange("listing_name", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Company Name
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.company_name || ""}
                  onChange={(e) =>
                    handleFieldChange("company_name", e.target.value)
                  }
                />
              </div>

              {/* Type / Category */}
              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Type
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.type || ""}
                  onChange={(e) => handleFieldChange("type", e.target.value)}
                />
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Category
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.category || ""}
                  onChange={(e) =>
                    handleFieldChange("category", e.target.value)
                  }
                />
              </div>

              {/* Address stuff */}
              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Address
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.address || ""}
                  onChange={(e) =>
                    handleFieldChange("address", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  District
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.district || ""}
                  onChange={(e) =>
                    handleFieldChange("district", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  City
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.city || ""}
                  onChange={(e) => handleFieldChange("city", e.target.value)}
                />
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Email
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={
                    editForm.owner_email ||
                    editForm.email ||
                    editForm.user_email ||
                    ""
                  }
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                />
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Phone
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                />
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Website
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.website || ""}
                  onChange={(e) =>
                    handleFieldChange("website", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Facebook
                </p>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.facebook || ""}
                  onChange={(e) =>
                    handleFieldChange("facebook", e.target.value)
                  }
                />
              </div>

              {/* Status */}
              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Status
                </p>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={editForm.status || "Active"}
                  onChange={(e) =>
                    handleFieldChange("status", e.target.value)
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Denied">Denied</option>
                </select>
              </div>

              {/* Created at (read-only) */}
              <div>
                <p className="text-xs uppercase text-muted-foreground mb-1">
                  Created At
                </p>
                <p className="font-medium text-sm">
                  {getCreatedAt(editForm)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs uppercase text-muted-foreground mb-1">
                Description
              </p>
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px]"
                value={editForm.description || ""}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Views</p>
              <p className="text-3xl font-bold">{getViews(editForm)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Services</p>
              <p className="text-3xl font-bold">{serviceCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Products</p>
              <p className="text-3xl font-bold">{productCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getPackageStatusColor(
                  status
                )}`}
              >
                {status}
              </span>
            </CardContent>
          </Card>
        </div>

        {/* IMAGE SECTION */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {editForm.logo_url && (
                <div>
                  <p className="text-xs uppercase text-muted-foreground mb-2">
                    Logo
                  </p>
                  <div className="border rounded-lg p-3 inline-flex bg-white">
                    <img
                      src={editForm.logo_url}
                      alt={`${editForm.listing_name} logo`}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                </div>
              )}

              {editForm.cover_url && (
                <div className="md:col-span-2">
                  <p className="text-xs uppercase text-muted-foreground mb-2">
                    Cover Image
                  </p>
                  <div className="border rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={editForm.cover_url}
                      alt={`${editForm.listing_name} cover`}
                      className="w-full h-56 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {galleryImages.length > 0 && (
              <div>
                <p className="text-xs uppercase text-muted-foreground mb-2">
                  Gallery
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="border rounded-lg overflow-hidden bg-gray-50"
                    >
                      <img
                        src={url}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!editForm.logo_url &&
              !editForm.cover_url &&
              galleryImages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No images uploaded for this business.
                </p>
              )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------------- LIST VIEW ----------------
  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Businesses
          </h1>
          <p className="text-muted-foreground">
            Manage all your business listings
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Businesses
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {totalBusinesses}
                </p>
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
                <p className="text-sm text-muted-foreground mb-1">
                  Total Views
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {totalViews}
                </p>
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
                <p className="text-sm text-muted-foreground mb-1">Services</p>
                <p className="text-3xl font-bold text-foreground">
                  {totalServices}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <Plus size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Products</p>
                <p className="text-3xl font-bold text-foreground">
                  {totalProducts}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-pink-100 text-pink-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active</p>
                <p className="text-3xl font-bold text-foreground">
                  {activeBusinesses}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          {myListings.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              You don&apos;t have any businesses yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Business Name</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3">Services</th>
                    <th className="px-4 py-3">Products</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created At</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myListings.map((item, index) => {
                    const status = getStatus(item);
                    return (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {item.listing_name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {getViews(item)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {getServiceCount(item)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {getProductCount(item)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${getPackageStatusColor(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {getCreatedAt(item)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedListing(item);
                                setEditForm({ ...item });
                              }}
                            >
                              View
                            </Button>
                         
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={async () => {
                                setSelectedListing(item);
                                await handleDelete();
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

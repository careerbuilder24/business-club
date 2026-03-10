
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import Swal from "sweetalert2";

import useLoggedUser from "@/hooks/useLoggedUser";
import useAdminProfile from "@/hooks/useAdminProfile";

// Logged User Type
interface LoggedUser {
  id: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

// Admin Profile Type
interface AdminProfile {
  id: number;
  email: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  businessCategory?: string;

  createdAt?: string | null;
  lastLogin?: string | null;
  profile_image?: string | null;
}

const PROFILE_API_ROUTE = "/api/adminProfile";

export default function ProfileContent() {
  const {
    loggedUser,
    loading: userLoading,
    error: userError,
  } = useLoggedUser() as {
    loggedUser: LoggedUser | null;
    loading: boolean;
    error: any;
  };


  const [savedProfile, setSavedProfile] = useState<AdminProfile | null>(null);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
const { profile, loading: profileLoading, error: profileError } =
  useAdminProfile(loggedUser?.email);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Populate form AFTER both user and profile loading are finished
  useEffect(() => {
    if (!loggedUser) return;
    if (profileLoading) return; // wait until profile finished loading

    if (profile && profile.email === loggedUser.email) {
      // Existing profile
      setSavedProfile(profile);

      setFirstName(profile.firstName ?? "");
      setLastName(profile.lastName ?? "");
      setEmail(profile.email ?? "");
      setPhone(profile.phone ?? "");
      setAddress(profile.address ?? "");
      setCity(profile.city ?? "");
      setZip(profile.zip ?? "");
      setBusinessCategory(profile.businessCategory ?? "");
    } else {
      // No profile for this user
      setSavedProfile(null);

      setFirstName("");
      setLastName("");
      setEmail(loggedUser.email);
      setPhone("");
      setAddress("");
      setCity("");
      setZip("");
      setBusinessCategory("");
    }
  }, [profile, loggedUser, profileLoading]);

  const isLoading = userLoading || profileLoading;

  // GREEN SPINNING LOADER
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-300 border-t-green-600 rounded-full animate-spin" />
      </div>
    );

  if (userError || profileError) return <p>Error loading profile data</p>;

  const shouldShowForm = !savedProfile;

  // Save profile handler
  const handleSave = async () => {
    try {
      const res = await fetch(PROFILE_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          zip,
          businessCategory,
        }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Success!", "Profile saved successfully", "success");

        // Prefer profile object from API if it exists
        const newProfile: AdminProfile =
          data.profile ??
          ({
            id: data.id ?? loggedUser?.id ?? 0,
            email,
            firstName,
            lastName,
            phone,
            address,
            city,
            zip,
            businessCategory,
            profile_image:
              data.profile_image ?? savedProfile?.profile_image ?? null,
            createdAt: data.createdAt ?? savedProfile?.createdAt ?? null,
            lastLogin: data.lastLogin ?? savedProfile?.lastLogin ?? null,
          } as AdminProfile);

        setSavedProfile(newProfile);
      } else {
        Swal.fire("Error!", data.error || "Failed to save profile", "error");
      }
    } catch (err: any) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Image upload handler using email
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !loggedUser) return;

    const formData = new FormData();
    formData.append("email", loggedUser.email);
    formData.append("file", file);

    const res = await fetch(PROFILE_API_ROUTE, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Success!", "Profile picture updated", "success");
      setSavedProfile((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          profile_image: data.imageUrl ?? data.profile_image ?? prev.profile_image,
          createdAt: data.createdAt ?? prev.createdAt ?? null,
          lastLogin: data.lastLogin ?? prev.lastLogin ?? null,
        };
      });
    } else {
      Swal.fire("Error!", data.error || "Failed to upload image", "error");
    }
  };

  //  Separate cancel handler so TypeScript narrows `savedProfile` correctly
  const handleCancel = () => {
    if (savedProfile) {
      const {
        firstName: sfFirstName = "",
        lastName: sfLastName = "",
        email: sfEmail = "",
        phone: sfPhone = "",
        address: sfAddress = "",
        city: sfCity = "",
        zip: sfZip = "",
        businessCategory: sfBusinessCategory = "",
      } = savedProfile;

      setFirstName(sfFirstName);
      setLastName(sfLastName);
      setEmail(sfEmail);
      setPhone(sfPhone);
      setAddress(sfAddress);
      setCity(sfCity);
      setZip(sfZip);
      setBusinessCategory(sfBusinessCategory);
    } else if (loggedUser) {
      setFirstName("");
      setLastName("");
      setEmail(loggedUser.email);
      setPhone("");
      setAddress("");
      setCity("");
      setZip("");
      setBusinessCategory("");
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card (LEFT) */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/50 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {savedProfile?.profile_image ? (
                  <img
                    src={savedProfile.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-white" />
                )}
              </div>

              <h2 className="text-xl font-bold text-foreground">
                {(savedProfile?.firstName || firstName) ||
                (savedProfile?.lastName || lastName)
                  ? `${savedProfile?.firstName ?? firstName} ${
                      savedProfile?.lastName ?? lastName
                    }`
                  : "Your Name"}
              </h2>

              <p className="text-sm text-muted-foreground">
                {savedProfile?.email ?? email ?? loggedUser?.email}
              </p>

              {savedProfile && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Member since{" "}
                    {savedProfile.createdAt
                      ? savedProfile.createdAt.slice(0, 10)
                      : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last login:{" "}
                    {savedProfile.lastLogin
                      ? savedProfile.lastLogin.slice(0, 10)
                      : "-"}
                  </p>
                </div>
              )}

              {/* Hidden file input + button trigger */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                className="w-full mt-4"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                {savedProfile?.profile_image
                  ? "Change Profile Picture"
                  : "Change Profile Picture"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT SIDE */}
        {shouldShowForm ? (
          // Profile Information Form
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal and business details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* First / Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-3 py-2 border border-border rounded-lg bg-muted cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+8801XXXXXXXXX"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="ZIP Code"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Business Category */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Briefcase size={16} />
                    Business Category
                  </label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select category</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Read-only view when profile is already saved
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Profile already saved for this email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {savedProfile && (
                  <>
                    <p>
                      <strong>Name:</strong>{" "}
                      {`${savedProfile.firstName ?? "-"} ${
                        savedProfile.lastName ?? ""
                      }`}
                    </p>
                    <p>
                      <strong>Email:</strong> {savedProfile.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {savedProfile.phone ?? "-"}
                    </p>
                    <p>
                      <strong>Address:</strong> {savedProfile.address ?? "-"}
                    </p>
                    <p>
                      <strong>City:</strong> {savedProfile.city ?? "-"}
                    </p>
                    <p>
                      <strong>ZIP:</strong> {savedProfile.zip ?? "-"}
                    </p>
                    <p>
                      <strong>Business Category:</strong>{" "}
                      {savedProfile.businessCategory ?? "-"}
                    </p>
                    <p>
                      <strong>Member since:</strong>{" "}
                      {savedProfile.createdAt
                        ? savedProfile.createdAt.slice(0, 10)
                        : "-"}
                    </p>
                    <p>
                      <strong>Last login:</strong>{" "}
                      {savedProfile.lastLogin
                        ? savedProfile.lastLogin.slice(0, 10)
                        : "-"}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

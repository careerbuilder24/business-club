"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Sample user profile data
  const profile = {
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "www.johnbusiness.com",
    bio: "Business owner and entrepreneur focused on tech innovation and sustainable growth. Passionate about helping other businesses succeed.",
    joinDate: "January 2023",
    listings: 8,
    views: 2450,
    rating: 4.8,
    reviews: 42,
    verified: true,
    avatar: "/placeholder-user.jpg",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container-custom py-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 w-fit">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        </div>
      </div>

      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-muted">
                    <img
                      src={profile.avatar || "/placeholder.svg"}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                    {profile.verified && <Badge className="bg-green-100 text-green-700">Verified</Badge>}
                  </div>
                  <p className="text-muted-foreground mb-4">{profile.email}</p>
                  <div className="flex items-center justify-center gap-2 text-sm mb-6">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-foreground">{profile.rating}</span>
                    <span className="text-muted-foreground">({profile.reviews} reviews)</span>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className="w-full"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">MEMBER SINCE</p>
                    <p className="text-foreground font-medium">{profile.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">LISTINGS</p>
                    <p className="text-2xl font-bold text-primary">{profile.listings}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">TOTAL VIEWS</p>
                    <p className="text-2xl font-bold text-primary">{profile.views.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Your professional information</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <textarea
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={5}
                    defaultValue={profile.bio}
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How people can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">EMAIL</p>
                    {isEditing ? (
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={profile.email}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">PHONE</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={profile.phone}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">LOCATION</p>
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={profile.location}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile.location}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="text-primary mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">WEBSITE</p>
                    {isEditing ? (
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={profile.website}
                      />
                    ) : (
                      <a href={`https://${profile.website}`} className="text-primary hover:underline font-medium">
                        {profile.website}
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
                <CardDescription>Your engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary mb-1">{profile.listings}</p>
                    <p className="text-sm text-muted-foreground">Active Listings</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary mb-1">{profile.views.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary mb-1">{profile.reviews}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

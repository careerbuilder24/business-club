"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { listings, categories } from "@/lib/data"
import { Star, MapPin, Phone, Mail } from "lucide-react"

export default function ListingsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")

  const filteredListings = useMemo(() => {
    let filtered = listings

    if (selectedCategory) {
      filtered = filtered.filter((listing) => listing.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "reviews") {
      filtered.sort((a, b) => b.reviews - a.reviews)
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [selectedCategory, searchTerm, sortBy])

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Businesses</h1>
          <p className="text-muted-foreground">Browse and discover businesses in our directory</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search businesses..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      selectedCategory === "" ? "bg-primary text-white" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedCategory === category ? "bg-primary text-white" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredListings.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`}>
                    <div className="card-base overflow-hidden h-full hover:shadow-lg transition-all cursor-pointer group">
                      {/* Cover Image */}
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={listing.coverImage || "/placeholder.svg"}
                          alt={listing.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Logo & Name */}
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={listing.logo || "/placeholder.svg"}
                            alt={listing.companyName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-foreground">{listing.name}</h3>
                            <p className="text-sm text-muted-foreground">{listing.companyName}</p>
                          </div>
                        </div>

                        {/* Category & Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {listing.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star size={16} className="fill-accent text-accent" />
                            <span className="font-semibold text-sm">{listing.rating}</span>
                            <span className="text-xs text-muted-foreground">({listing.reviews})</span>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
                          <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{listing.address}</span>
                        </div>

                        {/* Contact Quick Links */}
                        <div className="flex gap-2 mb-4">
                          <a
                            href={`tel:${listing.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-2 py-2 rounded transition-colors"
                          >
                            <Phone size={14} />
                            Call
                          </a>
                          <a
                            href={`mailto:${listing.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-1 text-xs bg-muted hover:bg-border text-foreground px-2 py-2 rounded transition-colors"
                          >
                            <Mail size={14} />
                            Email
                          </a>
                        </div>

                        {/* Labels */}
                        <div className="flex flex-wrap gap-2">
                          {listing.labels.slice(0, 2).map((label, idx) => (
                            <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-muted-foreground text-lg">No businesses found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

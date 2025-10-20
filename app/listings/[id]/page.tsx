// "use client"

// import { listings } from "@/lib/data"
// import { Star, MapPin, Phone, Mail, Globe, Facebook, Share2 } from "lucide-react"
// import { useState } from "react"

// export default function ListingDetailsPage({ params }: { params: { id: string } }) {
//   const listing = listings.find((l) => l.id === params.id)
//   const [selectedImage, setSelectedImage] = useState(0)

//   if (!listing) {
//     return (
//       <div className="min-h-screen bg-muted py-12">
//         <div className="container-custom text-center">
//           <h1 className="text-3xl font-bold mb-4">Listing Not Found</h1>
//           <p className="text-muted-foreground">The business you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     )
//   }

//   const allImages = [listing.coverImage, ...listing.gallery]

//   return (
//     <div className="min-h-screen bg-muted py-12">
//       <div className="container-custom max-w-4xl">
//         {/* Cover Image Gallery */}
//         <div className="mb-8">
//           <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
//             <img
//               src={allImages[selectedImage] || "/placeholder.svg"}
//               alt={listing.name}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Thumbnail Gallery */}
//           {allImages.length > 1 && (
//             <div className="flex gap-2 overflow-x-auto pb-2">
//               {allImages.map((image, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedImage(idx)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
//                     selectedImage === idx ? "border-primary" : "border-border"
//                   }`}
//                 >
//                   <img
//                     src={image || "/placeholder.svg"}
//                     alt={`Gallery ${idx}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-md p-8 mb-8">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-border">
//             <img
//               src={listing.logo || "/placeholder.svg"}
//               alt={listing.companyName}
//               className="w-24 h-24 rounded-lg object-cover"
//             />
//             <div className="flex-1">
//               <h1 className="text-4xl font-bold mb-2">{listing.name}</h1>
//               <p className="text-lg text-muted-foreground mb-4">{listing.companyName}</p>

//               {/* Rating & Category */}
//               <div className="flex flex-wrap items-center gap-4 mb-4">
//                 <div className="flex items-center gap-2">
//                   <Star size={20} className="fill-accent text-accent" />
//                   <span className="font-bold text-lg">{listing.rating}</span>
//                   <span className="text-muted-foreground">({listing.reviews} reviews)</span>
//                 </div>
//                 <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
//                   {listing.category}
//                 </span>
//               </div>

//               {/* Share Buttons */}
//               <div className="flex gap-2">
//                 <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-border rounded-lg transition-colors text-sm font-semibold">
//                   <Share2 size={16} />
//                   Share
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <p className="font-semibold text-foreground">Address</p>
//                     <p className="text-muted-foreground">{listing.address}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Phone size={20} className="text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <p className="font-semibold text-foreground">Phone</p>
//                     <a href={`tel:${listing.phone}`} className="text-primary hover:underline">
//                       {listing.phone}
//                     </a>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <p className="font-semibold text-foreground">Email</p>
//                     <a href={`mailto:${listing.email}`} className="text-primary hover:underline">
//                       {listing.email}
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social & Web Links */}
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Connect</h2>
//               <div className="space-y-3">
//                 {listing.website && (
//                   <a
//                     href={listing.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-3 p-3 bg-muted hover:bg-border rounded-lg transition-colors"
//                   >
//                     <Globe size={20} className="text-primary" />
//                     <div>
//                       <p className="font-semibold text-foreground">Website</p>
//                       <p className="text-sm text-muted-foreground truncate">{listing.website}</p>
//                     </div>
//                   </a>
//                 )}
//                 {listing.facebook && (
//                   <a
//                     href={listing.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-3 p-3 bg-muted hover:bg-border rounded-lg transition-colors"
//                   >
//                     <Facebook size={20} className="text-primary" />
//                     <div>
//                       <p className="font-semibold text-foreground">Facebook</p>
//                       <p className="text-sm text-muted-foreground truncate">{listing.facebook}</p>
//                     </div>
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Labels */}
//           {listing.labels.length > 0 && (
//             <div className="mb-8 pb-8 border-b border-border">
//               <h2 className="text-2xl font-bold mb-4">Services & Labels</h2>
//               <div className="flex flex-wrap gap-2">
//                 {listing.labels.map((label, idx) => (
//                   <span key={idx} className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
//                     {label}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Description */}
//           <div>
//             <h2 className="text-2xl font-bold mb-4">About</h2>
//             <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
//               <p>{listing.description}</p>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="bg-primary text-white rounded-lg p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">Interested in this business?</h2>
//           <p className="mb-6 text-gray-100">Get in touch with them directly</p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href={`tel:${listing.phone}`}
//               className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//             >
//               Call Now
//             </a>
//             <a
//               href={`mailto:${listing.email}`}
//               className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
//             >
//               Send Email
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client";

import { listings } from "@/lib/data";
import { useState } from "react";
import { Star, MapPin, Phone, Mail, Globe, Facebook, Share2 } from "lucide-react";

export default function ListingDetailsPage({ params }: { params: { id: string } }) {
  // Find the listing by ID
  const listing = listings.find((l) => l.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!listing) {
    return (
      <div className="min-h-screen bg-muted py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Listing Not Found</h1>
          <p className="text-muted-foreground">
            The business you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const allImages = [listing.coverImage, ...listing.gallery];

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container-custom max-w-4xl">
        {/* Cover Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={allImages[selectedImage] || "/placeholder.svg"}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-border">
            <img
              src={listing.logo || "/placeholder.svg"}
              alt={listing.companyName}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{listing.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{listing.companyName}</p>

              {/* Rating & Category */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-accent text-accent" />
                  <span className="font-bold text-lg">{listing.rating}</span>
                  <span className="text-muted-foreground">({listing.reviews} reviews)</span>
                </div>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {listing.category}
                </span>
              </div>

              {/* Share Buttons */}
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-border rounded-lg transition-colors text-sm font-semibold">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-muted-foreground">{listing.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a href={`tel:${listing.phone}`} className="text-primary hover:underline">
                      {listing.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href={`mailto:${listing.email}`} className="text-primary hover:underline">
                      {listing.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Web Links */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Connect</h2>
              <div className="space-y-3">
                {listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-muted hover:bg-border rounded-lg transition-colors"
                  >
                    <Globe size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Website</p>
                      <p className="text-sm text-muted-foreground truncate">{listing.website}</p>
                    </div>
                  </a>
                )}
                {listing.facebook && (
                  <a
                    href={listing.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-muted hover:bg-border rounded-lg transition-colors"
                  >
                    <Facebook size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Facebook</p>
                      <p className="text-sm text-muted-foreground truncate">{listing.facebook}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Labels */}
          {listing.labels.length > 0 && (
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-2xl font-bold mb-4">Services & Labels</h2>
              <div className="flex flex-wrap gap-2">
                {listing.labels.map((label, idx) => (
                  <span
                    key={idx}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
              <p>{listing.description}</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in this business?</h2>
          <p className="mb-6 text-gray-100">Get in touch with them directly</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${listing.phone}`}
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call Now
            </a>
            <a
              href={`mailto:${listing.email}`}
              className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

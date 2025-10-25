
// "use client";

// import { listings } from "@/lib/data";
// import { useState, use } from "react";
// import {
//   Star,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   Facebook,
//   Share2,
// } from "lucide-react";

// // --- DEMO DATA FOR PRODUCTS AND SERVICES (WITH RELIABLE FAKE IMAGES) ---
// const FAKE_PRODUCTS = [
//   {
//     id: "p1",
//     name: "Quantum Headset Pro",
//     // Reliable placeholder image from Lorem Picsum
//     image: "https://picsum.photos/id/17/400/300", 
//     description: "Experience unparalleled audio clarity with active noise cancellation and ergonomic design. Perfect for professionals and gamers.",
//     rating: 4.7,
//   },
//   {
//     id: "p2",
//     name: "Smart Coffee Brewer 3000",
//     image: "https://picsum.photos/id/48/400/300",
//     description: "Brew your morning coffee from your phone. Features programmable schedules and integrated bean grinder.",
//     rating: 4.2,
//   },
//   {
//     id: "p3",
//     name: "Eco-Friendly Backpack",
//     image: "https://picsum.photos/id/60/400/300",
//     description: "Made from recycled materials, this backpack is durable, waterproof, and stylish for daily commute or travel.",
//     rating: 4.9,
//   },
// ];

// const FAKE_SERVICES = [
//   {
//     id: "s1",
//     name: "24/7 Premium Support",
//     image: "https://picsum.photos/id/1053/400/300",
//     description: "Immediate, dedicated support via phone, chat, and email from our top-tier technical specialists.",
//     rating: 5.0,
//   },
//   {
//     id: "s2",
//     name: "Custom Software Development",
//     image: "https://picsum.photos/id/218/400/300",
//     description: "Bespoke software solutions tailored to your unique business needs and integrated with existing systems.",
//     rating: 4.5,
//   },
// ];

// // --- Helper Components ---

// // Component for star rating display
// const RatingStars = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0 && rating > 0;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div className="flex items-center text-yellow-500">
//       {/* Full Stars */}
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={`full-${i}`} size={16} className="fill-yellow-500 text-yellow-500" />
//       ))}
//       {/* Half Star */}
//       {hasHalfStar && (
//          <div className="relative w-4 h-4 mr-1">
//              <Star size={16} className="absolute top-0 left-0 text-gray-300" />
//              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
//                  <Star size={16} className="fill-yellow-500 text-yellow-500" />
//              </div>
//          </div>
//       )}
//       {/* Empty Stars */}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Star key={`empty-${i}`} size={16} className="text-gray-300" />
//       ))}
//       <span className="ml-2 text-sm font-semibold text-foreground">
//         {rating.toFixed(1)}
//       </span>
//     </div>
//   );
// };

// // Reusable component for a Product or Service Card
// const ProductOrServiceCard = ({ item }) => (
//   <div className="flex flex-col sm:flex-row gap-4 border border-border rounded-xl p-5 bg-muted/50 transition-shadow hover:shadow-lg">
//     <img
//       src={item.image || "/placeholder.svg"}
//       alt={item.name}
//       className="w-full sm:w-32 h-32 object-cover rounded-lg flex-shrink-0"
//     />
//     <div className="flex-1">
//       <h3 className="text-xl font-bold mb-1 text-primary">{item.name}</h3>
//       <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
//         {item.description}
//       </p>
//       <div className="flex items-center">
//         <RatingStars rating={item.rating || 0} />
//       </div>
//     </div>
//   </div>
// );

// // --- Main Component ---

// export default function ListingDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const resolvedParams = use(params);
//   const id = resolvedParams.id;

//   // Find the listing by ID
//   const listing = listings.find((l) => l.id === id);
//   const [selectedImage, setSelectedImage] = useState(0);

//   // NEW STATE: Toggle between 'products' and 'services'
//   const [activeTab, setActiveTab] = useState<'products' | 'services'>('products'); 

//   if (!listing) {
//     return (
//       <div className="min-h-screen bg-muted py-12">
//         <div className="container-custom text-center">
//           <h1 className="text-3xl font-bold mb-4">Listing Not Found</h1>
//           <p className="text-muted-foreground">
//             The business you're looking for doesn't exist.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Use FAKE DATA FOR DEMO
//   const products = FAKE_PRODUCTS;
//   const services = FAKE_SERVICES;
//   const allImages = [listing.coverImage, ...listing.gallery];

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
//               <p className="text-lg text-muted-foreground mb-4">
//                 {listing.companyName}
//               </p>
//               {/* Rating & Category */}
//               <div className="flex flex-wrap items-center gap-4 mb-4">
//                 <div className="flex items-center gap-2">
//                   <Star size={20} className="fill-accent text-accent" />
//                   <span className="font-bold text-lg">{listing.rating}</span>
//                   <span className="text-muted-foreground">
//                     ({listing.reviews} reviews)
//                   </span>
//                 </div>
//                 <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
//                   {listing.category}
//                 </span>
//               </div>
//               {/* Share Buttons */}
//               <div className="flex gap-2">
//                 <button className="flex items-center gap-2 px-4 py-2 bg-muted ease-in-out duration-300 hover:bg-[#2C8845] hover:text-white rounded-lg transition-colors text-sm font-semibold">
//                   <Share2 size={16} />
//                   Share
//                 </button>
//               </div>
//             </div>
//             {/* About */}
//             <div className="flex-1 mt-4 md:mt-0">
//               <p className="text-muted-foreground leading-relaxed">
//                 {listing.description}
//               </p>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <MapPin
//                     size={20}
//                     className="text-primary flex-shrink-0 mt-1"
//                   />
//                   <div>
//                     <p className="font-semibold text-foreground">Address</p>
//                     <p className="text-muted-foreground">{listing.address}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Phone
//                     size={20}
//                     className="text-primary flex-shrink-0 mt-1"
//                   />
//                   <div>
//                     <p className="font-semibold text-foreground">Phone</p>
//                     <a
//                       href={`tel:${listing.phone}`}
//                       className="text-primary hover:underline"
//                     >
//                       {listing.phone}
//                     </a>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
//                   <div>
//                     <p className="font-semibold text-foreground">Email</p>
//                     <a
//                       href={`mailto:${listing.email}`}
//                       className="text-primary hover:underline"
//                     >
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
//                       <p className="text-sm text-muted-foreground truncate">
//                         {listing.website}
//                       </p>
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
//                       <p className="text-sm text-muted-foreground truncate">
//                         {listing.facebook}
//                       </p>
//                     </div>
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>


//           {/* ========================================= */}
//           {/* NEW SECTION: Products/Services Toggle & Cards */}
//           {/* ========================================= */}
//           <div className="mb-8 pb-8 border-b border-border">
//             <h2 className="text-2xl font-bold mb-6">Products & Services</h2>

//             {/* Toggle Switch UI */}
//             <div className="flex p-1 bg-muted rounded-xl w-full max-w-sm mx-auto mb-6 shadow-inner">
//               <button
//                 onClick={() => setActiveTab('products')}
//                 className={`flex-1 py-2 text-center rounded-lg font-semibold transition-all ${
//                   activeTab === 'products'
//                     ? 'bg-[#2C8845] text-white shadow-md'
//                     : 'text-foreground hover:bg-white/50'
//                 }`}
//               >
//                 Products
//               </button>
//               <button
//                 onClick={() => setActiveTab('services')}
//                 className={`flex-1 py-2 text-center rounded-lg font-semibold transition-all ${
//                   activeTab === 'services'
//                     ? 'bg-[#2C8845] text-white shadow-md'
//                     : 'text-foreground hover:bg-white/50'
//                 }`}
//               >
//                 Services
//               </button>
//             </div>

//             {/* Conditional Content Rendering */}
//             <div className="space-y-4">
//               {activeTab === 'products' && (
//                 products.length > 0 ? (
//                   products.map((product) => (
//                     <ProductOrServiceCard key={product.id} item={product} />
//                   ))
//                 ) : (
//                   <p className="text-center text-muted-foreground py-8">
//                     No products listed for this business.
//                   </p>
//                 )
//               )}

//               {activeTab === 'services' && (
//                 services.length > 0 ? (
//                   services.map((service) => (
//                     <ProductOrServiceCard key={service.id} item={service} />
//                   ))
//                 ) : (
//                   <p className="text-center text-muted-foreground py-8">
//                     No services listed for this business.
//                   </p>
//                 )
//               )}
//             </div>
//           </div>
//           {/* ========================================= */}

//           {/* Labels */}
//           {listing.labels.length > 0 && (
//             <div className="mb-8 pb-8 border-b border-border">
//               <h2 className="text-2xl font-bold mb-4">Labels</h2>
//               <div className="flex flex-wrap gap-2">
//                 {listing.labels.map((label, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold"
//                   >
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
//         <div className="bg-[#2C8845] text-white rounded-lg p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">
//             Interested in this business?
//           </h2>
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
//   );
// }
"use client";

import { listings } from "@/lib/data";
import { useState, use } from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Share2,
} from "lucide-react";

// --- DEMO DATA FOR PRODUCTS AND SERVICES (WITH RELIABLE FAKE IMAGES) ---
const FAKE_PRODUCTS = [
  {
    id: "p1",
    name: "Quantum Headset Pro",
    // Reliable placeholder image from Lorem Picsum
    image: "https://picsum.photos/id/17/400/300", 
    description: "Experience unparalleled audio clarity with active noise cancellation and ergonomic design. Perfect for professionals and gamers.",
    rating: 4.7,
  },
  {
    id: "p2",
    name: "Smart Coffee Brewer 3000",
    image: "https://picsum.photos/id/48/400/300",
    description: "Brew your morning coffee from your phone. Features programmable schedules and integrated bean grinder.",
    rating: 4.2,
  },
  {
    id: "p3",
    name: "Eco-Friendly Backpack",
    image: "https://picsum.photos/id/60/400/300",
    description: "Made from recycled materials, this backpack is durable, waterproof, and stylish for daily commute or travel.",
    rating: 4.9,
  },
];

const FAKE_SERVICES = [
  {
    id: "s1",
    name: "24/7 Premium Support",
    image: "https://picsum.photos/id/1053/400/300",
    description: "Immediate, dedicated support via phone, chat, and email from our top-tier technical specialists.",
    rating: 5.0,
  },
  {
    id: "s2",
    name: "Custom Software Development",
    image: "https://picsum.photos/id/218/400/300",
    description: "Bespoke software solutions tailored to your unique business needs and integrated with existing systems.",
    rating: 4.5,
  },
];

// --- TypeScript Interfaces to Resolve 'any' Errors ---
interface RatingStarsProps {
  rating: number;
}

// Define the structure of a product/service item by inferring the type from FAKE_PRODUCTS
type ProductOrServiceItem = typeof FAKE_PRODUCTS[0]; 

interface ProductOrServiceCardProps {
  item: ProductOrServiceItem;
}
// --- End Interfaces ---


// --- Helper Components ---

// Component for star rating display
// FIXED: Added RatingStarsProps type
const RatingStars = ({ rating }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0 && rating > 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="fill-yellow-500 text-yellow-500" />
      ))}
      {/* Half Star */}
      {hasHalfStar && (
         <div className="relative w-4 h-4 mr-1">
             <Star size={16} className="absolute top-0 left-0 text-gray-300" />
             <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                 <Star size={16} className="fill-yellow-500 text-yellow-500" />
             </div>
         </div>
      )}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
      <span className="ml-2 text-sm font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// Reusable component for a Product or Service Card
// FIXED: Added ProductOrServiceCardProps type
const ProductOrServiceCard = ({ item }: ProductOrServiceCardProps) => (
  <div className="flex flex-col sm:flex-row gap-4 border border-border rounded-xl p-5 bg-muted/50 transition-shadow hover:shadow-lg">
    <img
      src={item.image || "/placeholder.svg"}
      alt={item.name}
      className="w-full sm:w-32 h-32 object-cover rounded-lg flex-shrink-0"
    />
    <div className="flex-1">
      <h3 className="text-xl font-bold mb-1 text-primary">{item.name}</h3>
      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
        {item.description}
      </p>
      <div className="flex items-center">
        <RatingStars rating={item.rating || 0} />
      </div>
    </div>
  </div>
);

// --- Main Component ---

export default function ListingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // Find the listing by ID
  const listing = listings.find((l) => l.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  // NEW STATE: Toggle between 'products' and 'services'
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products'); 

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

  // Use FAKE DATA FOR DEMO
  const products = FAKE_PRODUCTS;
  const services = FAKE_SERVICES;
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
              <p className="text-lg text-muted-foreground mb-4">
                {listing.companyName}
              </p>
              {/* Rating & Category */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-accent text-accent" />
                  <span className="font-bold text-lg">{listing.rating}</span>
                  <span className="text-muted-foreground">
                    ({listing.reviews} reviews)
                  </span>
                </div>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {listing.category}
                </span>
              </div>
              {/* Share Buttons */}
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-muted ease-in-out duration-300 hover:bg-[#2C8845] hover:text-white rounded-lg transition-colors text-sm font-semibold">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
            {/* About */}
            <div className="flex-1 mt-4 md:mt-0">
              <p className="text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-primary flex-shrink-0 mt-1"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-muted-foreground">{listing.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone
                    size={20}
                    className="text-primary flex-shrink-0 mt-1"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a
                      href={`tel:${listing.phone}`}
                      className="text-primary hover:underline"
                    >
                      {listing.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href={`mailto:${listing.email}`}
                      className="text-primary hover:underline"
                    >
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
                      <p className="text-sm text-muted-foreground truncate">
                        {listing.website}
                      </p>
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
                      <p className="text-sm text-muted-foreground truncate">
                        {listing.facebook}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>


          {/* ========================================= */}
          {/* NEW SECTION: Products/Services Toggle & Cards */}
          {/* ========================================= */}
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="text-2xl font-bold mb-6">Products & Services</h2>

            {/* Toggle Switch UI */}
            <div className="flex p-1 bg-muted rounded-xl w-full max-w-sm mx-auto mb-6 shadow-inner">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-2 text-center rounded-lg font-semibold transition-all ${
                  activeTab === 'products'
                    ? 'bg-[#2C8845] text-white shadow-md'
                    : 'text-foreground hover:bg-white/50'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`flex-1 py-2 text-center rounded-lg font-semibold transition-all ${
                  activeTab === 'services'
                    ? 'bg-[#2C8845] text-white shadow-md'
                    : 'text-foreground hover:bg-white/50'
                }`}
              >
                Services
              </button>
            </div>

            {/* Conditional Content Rendering */}
            <div className="space-y-4">
              {activeTab === 'products' && (
                products.length > 0 ? (
                  products.map((product) => (
                    <ProductOrServiceCard key={product.id} item={product} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No products listed for this business.
                  </p>
                )
              )}

              {activeTab === 'services' && (
                services.length > 0 ? (
                  services.map((service) => (
                    <ProductOrServiceCard key={service.id} item={service} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No services listed for this business.
                  </p>
                )
              )}
            </div>
          </div>
          {/* ========================================= */}

          {/* Labels */}
          {listing.labels.length > 0 && (
            <div className="mb-8 pb-8 border-b border-border">
              <h2 className="text-2xl font-bold mb-4">Labels</h2>
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
        <div className="bg-[#2C8845] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Interested in this business?
          </h2>
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
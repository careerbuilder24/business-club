

import ListingDetailPage from "@/components/ListingDetailPage/page";
import { listings } from "@/lib/data";
import type { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

// Fake products/services/reviews
const FAKE_PRODUCTS = [
  {
    id: "p1",
    name: "Quantum Headset Pro",
    image: "https://picsum.photos/id/17/400/300",
    description: "Experience unparalleled audio clarity...",
    rating: 4.7,
  },
  {
    id: "p2",
    name: "Smart Coffee Brewer 3000",
    image: "https://picsum.photos/id/48/400/300",
    description: "Brew your morning coffee from your phone...",
    rating: 4.2,
  },
];

const FAKE_SERVICES = [
  {
    id: "s1",
    name: "24/7 Premium Support",
    image: "https://picsum.photos/id/1053/400/300",
    description: "Immediate, dedicated support via phone, chat, and email...",
    rating: 5.0,
  },
  {
    id: "s2",
    name: "Custom Software Development",
    image: "https://picsum.photos/id/218/400/300",
    description: "Bespoke software solutions tailored to your unique business needs...",
    rating: 4.5,
  },
];

const FAKE_REVIEWS = [
  { id: 1, author: "A. Rahman", rating: 5.0, date: "2 months ago", comment: "Outstanding service!" },
  { id: 2, author: "B. Khatun", rating: 4.0, date: "1 week ago", comment: "Very professional team." },
];

// ✅ Dynamic metadata for this listing page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const listing = listings.find((l) => l.id === params.id);

  if (!listing) {
    return {
      title: "Listing Not Found",
      description: "The requested listing does not exist.",
    };
  }

  const description =
    listing.description.length > 150
      ? listing.description.slice(0, 150) + "..."
      : listing.description;

  return {
    title: `${listing.name} | ${listing.businessType} in ${listing.district}`,
    description: description,
    openGraph: {
      title: `${listing.name} | ${listing.businessType}`,
      description: description,
      type: "website",
    },
  };
}

export default function Page({ params }: PageProps) {
  const listing = listings.find((l) => l.id === params.id);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Listing Not Found</h1>
      </div>
    );
  }

  return (
    <ListingDetailPage
      listing={listing}
      products={FAKE_PRODUCTS}
      services={FAKE_SERVICES}
      reviews={FAKE_REVIEWS}
    />
  );
}

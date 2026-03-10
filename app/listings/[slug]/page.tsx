
import ListingDetailPage, {
  Listing,
} from "@/components/ListingDetailPage/page";
import { getListings } from "@/lib/server/getListings";
import { toSlug } from "@/lib/slug";
import { getSafeImage } from "@/lib/image";

interface PageParams {
  slug: string;
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  const listings = await getListings();

  const formattedListings: Listing[] = listings
    .map((l: any) => {
      const baseName = l.name || l.companyName || "";
      const listingSlug = toSlug(baseName);
      if (!listingSlug) return null;

      return {
        id: String(l.id),
        slug: listingSlug,
        name: l.name,
        companyName: l.companyName,
        district: l.district || "",
        businessType: l.businessType || "",
        coverImage: getSafeImage(l.coverImage, "/cover-placeholder.jpg"),
        logo: getSafeImage(l.logo, "/placeholder.svg"),
        phone: l.phone || "",
        email: l.email || "",
        website: l.website || "",
        address: l.address || "",
        description: l.description || "No description available.",
        rating: Number(l.rating) || 4.5,

      
        products: l.products || [],
        services: l.services || [],
      };
    })
    .filter(Boolean) as Listing[];

  const listing = formattedListings.find((l) => l.slug === slug);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">
          Listing Not Found
        </h1>
      </div>
    );
  }
console.log(listings)
  return (
    <ListingDetailPage
      listing={listing}
      products={listing.products}
      services={listing.services}
      reviews={[]}
    />
  );
}


import ListingsPage from "@/components/ListingsPage/ListingsPage";
import { listings, categories as districtCategories, businessCategories } from "@/lib/data";

export default async function Page() {
  // This is static data — you can just pass it directly
  return (
    <ListingsPage
      listings={listings}
      districtCategories={districtCategories}
      businessCategories={businessCategories}
    />
  );
}


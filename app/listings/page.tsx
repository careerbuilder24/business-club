
import ListingsPage from "@/components/ListingsPage/ListingsPage";
import { getListings } from "@/lib/api";
import { categories as districtCategories } from "@/lib/data";

export default async function Page() {
  const listings = await getListings(); // server fetch

  return (
    <ListingsPage
      listings={listings}               // pass fetched data
      categories={districtCategories}   // pass divisions
    />
  );
}



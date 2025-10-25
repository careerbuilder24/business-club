// app/PricingTablePage/page.tsx

// 1. Import the PricingTable component
import PricingTable from '@/components/PricingTable/PricingTable'; 

// 2. Import the data from your data file
// Ensure the path is correct based on your project structure, e.g., '@/lib/pricingData'
import { packages, features, pricingTitle } from '@/lib/pricingData'; 

// This is the actual page component for the /PricingTablePage route
export default function PricingTablePage() {
  return (
    // 3. Pass the imported data as props to the PricingTable component
    // If any of these are undefined, the PricingTable will throw the error.
    <PricingTable
      title={pricingTitle}
      packages={packages} // <-- This must be a defined array
      features={features} // <-- This must be a defined array
    />
  );
}
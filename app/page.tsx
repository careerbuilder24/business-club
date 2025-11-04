// import HeroSection from "@/components/home/hero-section"
// import FeaturedListings from "@/components/home/featured-listings"
// import CategoriesSection from "@/components/home/categories-section"
// import CTASection from "@/components/home/cta-section"
// import VisionMission from "@/components/home/VisionMission"
// import ConnectedCompany from "@/components/home/connectedCOmpany"
// import ComplementSection from "@/components/home/complementSection"
// import PricingTable from "@/components/PricingTable/PricingTable"

// export default function Home() {
//   return (
//     <div>
//       <HeroSection />
//       <CategoriesSection />
//       <FeaturedListings />
//       <CTASection />
//       <PricingTable/>
//       {/* <ComplementSection/> */}
//       <VisionMission />
//       <ConnectedCompany/>

//     </div>
//   )
// }
import HeroSection from "@/components/home/hero-section";
import FeaturedListings from "@/components/home/featured-listings";
import CTASection from "@/components/home/cta-section";
import VisionMission from "@/components/home/VisionMission";
import ConnectedCompany from "@/components/home/connectedCOmpany";
import PricingTable from "@/components/PricingTable/PricingTable";

// 1. Import the required data (adjust the path if your data file is somewhere else)
import { packages, features, pricingTitle } from "@/lib/pricingData";
import Testimonial from "@/components/home/Testimonial";
// import ContactForm from "../components/home/ContactForm";
import CategoriesSection from "@/components/home/CategoriesSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* <CategoriesSection /> */}

      <CategoriesSection/>
      <FeaturedListings />
      <CTASection />
      {/* 2. PASS THE REQUIRED PROPS HERE */}
      <PricingTable
        packages={packages}
        features={features}
        title={pricingTitle}
      />
      {/* <ComplementSection/> */}
      <VisionMission />

      <ConnectedCompany />

      <Testimonial />

      {/* <ContactForm /> */}
    </div>
  );
}

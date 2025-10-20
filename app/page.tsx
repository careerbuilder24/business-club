import HeroSection from "@/components/home/hero-section"
import FeaturedListings from "@/components/home/featured-listings"
import CategoriesSection from "@/components/home/categories-section"
import CTASection from "@/components/home/cta-section"
import VisionMission from "@/components/home/VisionMission"
import ConnectedCompany from "@/components/home/connectedCOmpany"
import ComplementSection from "@/components/home/complementSection"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedListings />
      <CTASection />
      {/* <ComplementSection/> */}
      <VisionMission />
      <ConnectedCompany/>
    </div>
  )
}

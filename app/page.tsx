"use client";

import HeroSection from "@/components/home/hero-section";
import FeaturedListings from "@/components/home/featured-listings";
import CTASection from "@/components/home/cta-section";
import VisionMission from "@/components/home/VisionMission";
import ConnectedCompany from "@/components/home/connectedCOmpany";
import Testimonial from "@/components/home/Testimonial";
import Sidebar from "@/components/Sidebar/Sidebar";
import useListing from "@/hooks/useListing";

export default function Home() {
  const { listingss, loading, error } = useListing();

  if (loading) return null;
  if (error) return <p>{error}</p>;

  const activeListings = listingss.filter(
    (l) => !l.status || l.status.toLowerCase() === "active",
  );

  return (
    <main>
      <Sidebar />
      <HeroSection />
      <FeaturedListings listings={activeListings} />
      <CTASection />
      <VisionMission />
      <ConnectedCompany />
      <Testimonial />
    </main>
  );
}

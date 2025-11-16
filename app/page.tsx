
// import HeroSection from "@/components/home/hero-section";
// import FeaturedListings from "@/components/home/featured-listings";
// import CTASection from "@/components/home/cta-section";
// import VisionMission from "@/components/home/VisionMission";
// import ConnectedCompany from "@/components/home/connectedCOmpany";
// // import PricingTable from "@/components/PricingTable/PricingTable";

// // 1. Import the required data (adjust the path if your data file is somewhere else)
// // import { packages, features, pricingTitle } from "@/lib/pricingData";
// import Testimonial from "@/components/home/Testimonial";
// // import ContactForm from "../components/home/ContactForm";
// import CategoriesSection from "@/components/home/CategoriesSection";
// export default function Home() {
//   return (
//     <div>
//       <HeroSection />
//       {/* <CategoriesSection /> */}

//       <CategoriesSection/>
//       <FeaturedListings />
//       <CTASection />
//       {/* 2. PASS THE REQUIRED PROPS HERE */}
//       {/* <PricingTable
//         packages={packages}
//         features={features}
//         title={pricingTitle}
//       /> */}
//       {/* <ComplementSection/> */}
//       <VisionMission />

//       <ConnectedCompany />

//       <Testimonial />

//       {/* <ContactForm /> */}
//     </div>
//   );
// }
import HeroSection from "@/components/home/hero-section";
import FeaturedListings from "@/components/home/featured-listings";
import CTASection from "@/components/home/cta-section";
import VisionMission from "@/components/home/VisionMission";
import ConnectedCompany from "@/components/home/connectedCOmpany";
import Testimonial from "@/components/home/Testimonial";
import CategoriesSection from "@/components/home/CategoriesSection";
import Head from "next/head";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Head>
        {/* Title and Meta Description for SEO */}
        <title>Business Club - Home</title>
        <meta name="description" content="Welcome to Your Website. Explore our featured listings, services, and get in touch for amazing offers!" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags for better social sharing */}
        <meta property="og:title" content="Business Club - Home" />
        <meta property="og:description" content="Explore featured listings, learn about our vision and mission, and see our services in action!" />
        <meta property="og:image" content="/path/to/og-image.jpg" />
        <meta property="og:url" content="https://www.yourwebsite.com" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Business Club - Home" />
        <meta name="twitter:description" content="Business Club home page showcasing products, features, and more!" />
        <meta name="twitter:image" content="/path/to/twitter-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Sidebar />
        <HeroSection />
        <CategoriesSection />
        <FeaturedListings />
        <CTASection />
        <VisionMission />
        <ConnectedCompany />
        <Testimonial />
      </main>

    </>
  );
}

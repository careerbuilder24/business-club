"use client";

import React from "react";
import Head from "next/head";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>Frequently Asked Questions | Business Clubs</title>
        <meta
          name="description"
          content="Find answers to common questions about Business Clubs — listing your business, buying domains, hosting, and managing your online presence easily."
        />
        <meta
          name="keywords"
          content="business listing, domain hosting, buy domain, web hosting, business clubs, online business platform, SEO listings"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Frequently Asked Questions | Business Clubs" />
        <meta
          property="og:description"
          content="Get answers about listing your business, purchasing domains, hosting, and more on Business Clubs."
        />
        <meta property="og:url" content="https://business-clubs.vercel.app/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://business-clubs.vercel.app/og-image.png" />
        <link rel="canonical" href="https://business-clubs.vercel.app/faq" />

        {/* JSON-LD Schema for SEO Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Business Clubs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Business Clubs is a smart platform where users can list their businesses, purchase domains or hosting, and manage their online presence efficiently.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can I list my business on Business Clubs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "To list your business, simply create an account, choose your category, and fill in your business details. Your listing will appear after admin approval.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I buy domain or hosting from Business Clubs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Business Clubs offers affordable domain and hosting plans for individuals and companies. You can choose your plan and purchase directly from the platform.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there any membership or premium plan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Business Clubs offers premium membership plans with extra visibility, featured listings, and SEO benefits.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <section className="max-w-4xl mx-auto px-6 py-16 text-white">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#00FAD9]">
          Frequently Asked Questions
        </h1>
        <p className="text-center mb-12 text-gray-300">
          Here are some of the most common questions users ask about Business Clubs.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              What is Business Clubs?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Business Clubs is an online business listing and hosting platform where users can
              promote their brand, buy domains or hosting, and grow their digital presence.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              How can I list my business?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Create an account, fill out your business information, and submit your listing. Once
              approved, your business will appear publicly on our platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              Can I buy domain or hosting here?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, we provide affordable domain registration and hosting plans. Perfect for small
              businesses or startups looking to go online quickly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
              Do you offer support or maintenance?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Absolutely! Our team provides technical support and maintenance to ensure your
              business runs smoothly online.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
              Is there any premium plan available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, you can upgrade to our premium plan for better SEO ranking, featured listings,
              and priority customer support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}

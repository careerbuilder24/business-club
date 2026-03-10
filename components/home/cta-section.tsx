
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="py-16 md:py-24  text-black  [@media(min-width:1033px)]:ml-72
            [@media(min-width:1735px)]:ml-28"
      aria-labelledby="cta-title"
    >
      <div className="container-custom text-center ">
        <header>
          <h2
            id="cta-title"
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to List Your Business on Business Club?
          </h2>
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
            Grow your visibility and reach thousands of customers searching
            for trusted services on Business Club — Bangladesh’s fastest
            growing business directory.
          </p>
        </header>

        <Link
          href="/add-listing"
          aria-label="Add your business listing on Business Club"
          className="inline-block bg-[#2C8A45] text-white px-8 py-3 rounded-lg font-semibold 
          hover:bg-[#015c19] hover:text-white transition-colors duration-300"
        >
          Add Your Business Now
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-16 md:py-24  text-black bg-[#E5E7EB]">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to List Your Business?</h2>
        <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
          Join thousands of businesses already on Listify. Get discovered by customers looking for your services.
        </p>
        <Link
          href="/add-listing"
          className="inline-block text-white bg-[#2C8A45]  text-[#139e38] px-8 py-3 rounded-lg font-semibold hover:bg-[#015c19] ease-in-out duration-300 transition-colors hover:text-white"
        >
          Add Your Business Now
        </Link>
      </div>
    </section>
  )
}

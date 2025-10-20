import AddListingForm from "@/components/add-listing/add-listing-form"

export default function AddListingPage() {
  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add Your Business</h1>
          <p className="text-muted-foreground text-lg">Fill in the details below to list your business on Listify</p>
        </div>
        <AddListingForm />
      </div>
    </div>
  )
}

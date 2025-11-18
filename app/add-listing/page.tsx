// import AddListingForm from "@/components/add-listing/add-listing-form";
// import Sidebar from "@/components/Sidebar/Sidebar";

// export default function AddListingPage() {
//   return (
//     <>
//       <Sidebar />
//       <div className="min-h-screen bg-muted py-12">
//         <div className="container-custom max-w-4xl">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">Add Your Business</h1>
//             <p className="text-muted-foreground text-lg">
//               Fill in the details below to list your business on Listify
//             </p>
//           </div>
//           <AddListingForm />
//         </div>
//       </div>
//     </>
//   );
// }
import AddListingForm from "@/components/add-listing/add-listing-form";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function AddListingPage() {
  return (
    <div className="flex">

      {/* Sidebar stays on left */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className="
          flex-1
          min-h-screen 
          bg-muted 
          py-12 
          px-4
          sm:px-6
          md:px-8
          lg:ml-[280px]   /* push content to the right on desktop */
        "
      >
        <div className="container-custom max-w-4xl">

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Add Your Business</h1>
            <p className="text-muted-foreground text-lg">
              Fill in the details below to list your business on Listify
            </p>
          </div>

          <AddListingForm />
        </div>
      </div>

    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// export default function AddFinanceContent() {
//   const [company, setCompany] = useState("");
//   const [packageType, setPackageType] = useState("");
//   const [amount, setAmount] = useState("");
//   const [paymentDate, setPaymentDate] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`✅ Added Finance:
// Company: ${company}
// Package: ${packageType}
// Amount: ${amount}
// Date: ${paymentDate}`);
//   };

//   return (
//     <Card className="max-w-lg mx-auto">
//       <CardHeader>
//         <CardTitle>Add Finance Record</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 text-sm font-medium">Company Name</label>
//             <input
//               value={company}
//               onChange={(e) => setCompany(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter company name"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Package Type</label>
//             <select
//               value={packageType}
//               onChange={(e) => setPackageType(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2"
//               required
//             >
//               <option value="">Select Package</option>
//               <option value="Website">Website</option>
//               <option value="Domain">Domain</option>
//               <option value="Hosting">Hosting</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Amount Paid</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter amount"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Payment Date</label>
//             <input
//               type="date"
//               value={paymentDate}
//               onChange={(e) => setPaymentDate(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2"
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full bg-[#2C8845] text-white">
//             Add Finance
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AddFinanceContent() {
  const [company, setCompany] = useState("");
  const [serviceType, setServiceType] = useState("Listing");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !amount || !paymentDate || !transactionId) {
      alert("Please fill all required fields!");
      return;
    }

    alert(`✅ Finance Record Added:
Company: ${company}
Service: ${serviceType}
Amount: ${amount}
Date: ${paymentDate}
Status: ${paymentStatus}
Transaction ID: ${transactionId}`);

    // Reset form
    setCompany("");
    setServiceType("Listing");
    setAmount("");
    setPaymentDate("");
    setPaymentStatus("Paid");
    setTransactionId("");
  };

  return (
    <Card className="max-w-3xl mx-auto border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Add Finance Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Company Name</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block mb-1 text-sm font-medium">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option>Listing</option>
              <option>Package</option>
              <option>Web</option>
              <option>Hosting</option>
              <option>Other</option>
            </select>
          </div>

          {/* Amount Paid */}
          <div>
            <label className="block mb-1 text-sm font-medium">Amount Paid</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Payment Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">Payment Date</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option>Paid</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block mb-1 text-sm font-medium">Transaction ID</label>
            <input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter transaction ID"
              required
            />
          </div>

          {/* Submit Button spanning full width */}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full bg-[#2C8845] text-white">
              Add Finance
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

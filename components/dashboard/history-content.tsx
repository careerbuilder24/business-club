
// "use client";

// import React from "react";
// import { Clock, CheckCircle, XCircle } from "lucide-react";

// export default function HistoryContent() {
//   // Simulated purchased packages (in real app, fetch from backend)
//   const historyData = [
//     {
//       id: 1,
//       name: "Starter Package",
//       purchasedDate: "2025-10-01",
//       expiryDate: "2026-10-01",
//       daysLeft: 328,
//     },
//     {
//       id: 2,
//       name: "Pro Business Plan",
//       purchasedDate: "2024-11-01",
//       expiryDate: "2025-11-01",
//       daysLeft: 0,
//     },
//   ];

//   // Find active package (with most days left > 0)
//   const activePackage = historyData.find((pkg) => pkg.daysLeft > 0);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//         Package Purchase History
//       </h2>

//       {historyData.map((item) => {
//         const isActive = activePackage?.id === item.id;
//         const isExpired = item.daysLeft <= 0;

//         return (
//           <div
//             key={item.id}
//             className={`relative bg-white shadow-sm rounded-xl border p-6 hover:shadow-md transition-all ${
//               isActive
//                 ? "border-[#2C8845] ring-1 ring-[#2C8845]"
//                 : isExpired
//                 ? "border-red-300 ring-1 ring-red-200"
//                 : "border-gray-200"
//             }`}
//           >
//             {/* ✅ Status Badge */}
//             {isActive && (
//               <span className="absolute top-3 right-3 bg-[#2C8845] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//                 Active
//               </span>
//             )}
//             {isExpired && (
//               <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//                 Expired
//               </span>
//             )}

//             <div className="flex flex-wrap justify-between items-center">
//               <div>
//                 <h3
//                   className={`text-lg font-semibold ${
//                     isActive
//                       ? "text-[#2C8845]"
//                       : isExpired
//                       ? "text-red-600"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {item.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Purchased: {item.purchasedDate}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Expires: {item.expiryDate}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 {isActive ? (
//                   <>
//                     <Clock className="text-[#2C8845]" size={20} />
//                     <span className="text-[#2C8845] font-medium">
//                       {item.daysLeft} days remaining
//                     </span>
//                   </>
//                 ) : isExpired ? (
//                   <>
//                     <XCircle className="text-red-500" size={20} />
//                     <span className="text-red-500 font-medium">Expired</span>
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle className="text-gray-400" size={20} />
//                     <span className="text-gray-400 font-medium">Inactive</span>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
"use client";

import React from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function HistoryContent() {
  // Simulated purchased packages (in real app, fetch from backend)
  const historyData = [
    {
      id: 1,
      name: "Starter Package",
      purchasedDate: "2025-10-01",
      expiryDate: "2026-10-01",
      daysLeft: 328,
      status: "approved", // can be: approved | pending
    },
    {
      id: 2,
      name: "Pro Business Plan",
      purchasedDate: "2024-11-01",
      expiryDate: "2025-11-01",
      daysLeft: 0,
      status: "approved",
    },
    {
      id: 3,
      name: "Enterprise Growth Plan",
      purchasedDate: "2025-11-05",
      expiryDate: "2026-11-05",
      daysLeft: 365,
      status: "pending",
    },
  ];

  const activePackage = historyData.find(
    (pkg) => pkg.daysLeft > 0 && pkg.status === "approved"
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Package Purchase History
      </h2>

      {historyData.map((item) => {
        const isActive = activePackage?.id === item.id;
        const isExpired = item.daysLeft <= 0 && item.status === "approved";
        const isPending = item.status === "pending";

        return (
          <div
            key={item.id}
            className={`relative bg-white shadow-sm rounded-xl border p-6 hover:shadow-md transition-all ${
              isPending
                ? "border-yellow-300 ring-1 ring-yellow-200"
                : isActive
                ? "border-[#2C8845] ring-1 ring-[#2C8845]"
                : isExpired
                ? "border-red-300 ring-1 ring-red-200"
                : "border-gray-200"
            }`}
          >
            {/* Status Badge */}
            {isPending && (
              <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Pending Approval
              </span>
            )}
            {isActive && (
              <span className="absolute top-3 right-3 bg-[#2C8845] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Active
              </span>
            )}
            {isExpired && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Expired
              </span>
            )}

            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    isActive
                      ? "text-[#2C8845]"
                      : isExpired
                      ? "text-red-600"
                      : isPending
                      ? "text-yellow-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Purchased: {item.purchasedDate}
                </p>
                <p className="text-sm text-gray-500">
                  Expires: {item.expiryDate}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isPending ? (
                  <>
                    <AlertCircle className="text-yellow-500" size={20} />
                    <span className="text-yellow-500 font-medium">
                      Pending Admin Approval
                    </span>
                  </>
                ) : isActive ? (
                  <>
                    <Clock className="text-[#2C8845]" size={20} />
                    <span className="text-[#2C8845] font-medium">
                      {item.daysLeft} days remaining
                    </span>
                  </>
                ) : isExpired ? (
                  <>
                    <XCircle className="text-red-500" size={20} />
                    <span className="text-red-500 font-medium">Expired</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="text-gray-400" size={20} />
                    <span className="text-gray-400 font-medium">Inactive</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

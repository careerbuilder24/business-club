// "use client";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// export default function PackageChangeRequests() {
//   const [requests, setRequests] = useState<any[]>([]);
//   const [search, setSearch] = useState("");

//   const fetchRequests = async () => {
//     const res = await fetch("/api/package-upgrade-request");
//     const data = await res.json();

//     if (data.success) {
//       setRequests(data.requests);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);


//   const handleStatusChange = async (id: number, status: string) => {
//     const result = await Swal.fire({
//       title: `${status === "approved" ? "Approve" : "Deny"} Request?`,
//       text: `You are about to ${status} this request.`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: status === "approved" ? "#16a34a" : "#dc2626",
//       confirmButtonText: status === "approved" ? "Approve" : "Deny",
//     });

//     if (!result.isConfirmed) return;

//     const res = await fetch("/api/package-upgrade-request", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, status }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setRequests((prev) =>
//         prev.map((req) => (req.id === id ? { ...req, status } : req)),
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: `Request ${status}.`,
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update status",
//       });
//     }
//   };
//   const handleDelete = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Delete Request?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Delete",
//       cancelButtonText: "Cancel",
//     });

//     if (!result.isConfirmed) return;

//     const res = await fetch(`/api/package-upgrade-request`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setRequests((prev) => prev.filter((req) => req.id !== id));

//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "Request has been deleted.",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to delete request.",
//       });
//     }
//   };

//   const filtered = requests.filter((req) =>
//     req.email?.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="p-6 space-y-6">
//       {/* Page Title */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">
//           Request of User Packages Changes
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage all package upgrade requests submitted by users.
//         </p>
//       </div>
//       {/* Search */}
//       <div className="bg-white border rounded-xl shadow-sm p-4 flex gap-4">
//         <input
//           type="text"
//           placeholder="Search by email..."
//           className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white border rounded-xl shadow-sm">
//         <div className="p-5 border-b">
//           <p className="text-sm text-gray-500">All package upgrade requests</p>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="text-gray-600 ">
//               <tr className="border-b ">
//                 <th className="text-left p-4 font-semibold">Email</th>
//                 <th className="text-left p-4 font-semibold">
//                   Requested Package
//                 </th>
//                 <th className="text-left p-4 font-semibold">Message</th>
//                 <th className="text-left p-4 font-semibold">Status</th>
//                 <th className="text-left p-4 font-semibold">Date</th>
//                 <th className="text-left p-4 font-semibold">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((req) => (
//                 <tr key={req.id} className="border-b hover:bg-gray-50">
//                   <td className="p-4 font-medium text-gray-800">{req.email}</td>

//                   <td className="p-4">
//                     <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
//                       {req.requested_package}
//                     </span>
//                   </td>

//                   <td className="p-4 text-gray-600 max-w-[300px] truncate">
//                     {req.message}
//                   </td>

//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 text-xs rounded-full font-medium
//                       ${
//                         req.status === "approved"
//                           ? "bg-green-100 text-green-700"
//                           : req.status === "rejected"
//                             ? "bg-red-100 text-red-600"
//                             : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {req.status || "pending"}
//                     </span>
//                   </td>

//                   <td className="p-4 text-gray-500">
//                     {req.created_at
//                       ? new Date(req.created_at).toLocaleDateString()
//                       : "-"}
//                   </td>

//                   <td className="p-4 flex gap-2">
//                     <button
//                       onClick={() => handleStatusChange(req.id, "approved")}
//                       className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md"
//                     >
//                       Approve
//                     </button>

//                     <button
//                       onClick={() => handleStatusChange(req.id, "rejected")}
//                       className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
//                     >
//                       Deny
//                     </button>

//                     <button
//                       onClick={() => handleDelete(req.id)}
//                       className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function PackageChangeRequests() {

  const [requests, setRequests] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    const res = await fetch("/api/package-upgrade-request");
    const data = await res.json();

    if (data.success) {
      setRequests(data.requests);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {

    const result = await Swal.fire({
      title: `${status === "approved" ? "Approve" : "Deny"} Request?`,
      text: `You are about to ${status} this request.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#16a34a" : "#dc2626",
      confirmButtonText: status === "approved" ? "Approve" : "Deny",
    });

    if (!result.isConfirmed) return;

    const res = await fetch("/api/package-upgrade-request", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const data = await res.json();

    if (data.success) {

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status } : req
        )
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Request ${status}.`,
        timer: 1500,
        showConfirmButton: false,
      });

    } else {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status",
      });

    }
  };

  const handleDelete = async (id: number) => {

    const result = await Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`/api/package-upgrade-request`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {

      setRequests((prev) => prev.filter((req) => req.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Request has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

    } else {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete request.",
      });

    }
  };

  const filtered = requests.filter((req) =>
    req.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Request of User Packages Changes
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all package upgrade requests submitted by users.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-xl shadow-sm p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by email..."
          className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm">

        <div className="p-5 border-b">
          <p className="text-sm text-gray-500">
            All package upgrade requests
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="text-gray-600">
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-left p-4 font-semibold">Requested Package</th>
                <th className="text-left p-4 font-semibold">Message</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((req) => (
                <tr key={req.id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-medium text-gray-800">
                    {req.email}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {req.requested_package}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600 max-w-[300px] truncate">
                    {req.message}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status || "pending"}
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">
                    {req.created_at
                      ? new Date(req.created_at).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => handleStatusChange(req.id, "approved")}
                      className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatusChange(req.id, "rejected")}
                      className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                    >
                      Deny
                    </button>

                    <button
                      onClick={() => handleDelete(req.id)}
                      className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

// "use client";

// import useNews, { NewsRecord } from "@/hooks/useNews";
// import React, { useState } from "react";

// export default function AllUploadedNews() {
//   const { news, loading, error } = useNews();
//   const [selectedNews, setSelectedNews] = useState<NewsRecord | null>(null);
//   const [search, setSearch] = useState("");

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   /* ===== STATUS UPDATE ===== */
 

//   const updateStatus = async (id: number, status: string) => {
//   try {
//     await fetch(`/api/news`, {   //  correct endpoint
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, status }),   //  send id also
//     });

//     window.location.reload();
//   } catch (err) {
//     console.error(err);
//     alert("Failed to update status");
//   }
// };

//   /* ===== STATS ===== */
//   const total = news.length;
//   const accepted = news.filter((n) => n.status === "approved").length;
//   const pending = news.filter((n) => n.status === "pending").length;
//   const denied = news.filter((n) => n.status === "rejected").length;

//   /* ===== SEARCH FILTER ===== */
//   const filteredNews = news.filter((item) =>
//     item.title.toLowerCase().includes(search.toLowerCase()),
//   );
// console.log(news)
//   return (
//     <div className="p-6 space-y-6">
//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatCard title="Total Blogs" value={total} />
//         <StatCard title="Accepted" value={accepted} color="green" />
//         <StatCard title="Pending" value={pending} />
//         <StatCard title="Denied" value={denied} color="red" />
//       </div>

//       {/* SEARCH */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold">All News</h2>
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 rounded-lg text-sm w-64"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow border overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Created</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredNews.map((item) => (
//               <tr key={item.id} className="border-t">
//                 <td className="p-3">
//                   <img
//                     src={item.image_url}
//                     className="w-14 h-14 object-cover rounded-lg"
//                   />
//                 </td>

//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 text-xs rounded-full ${
//                       item.status === "approved"
//                         ? "bg-green-100 text-green-700"
//                         : item.status === "rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   {new Date(item.created_at).toLocaleString()}
//                 </td>

//                 <td className="p-3 space-x-2">
//                   <button
//                     onClick={() => setSelectedNews(item)}
//                     className="px-4 py-1 text-sm rounded bg-indigo-600 text-white"
//                   >
//                     View
//                   </button>

//                   {item.status !== "approved" && (
//                     <button
//                       onClick={() => updateStatus(item.id, "approved")}
//                       className="px-4 py-1 text-sm rounded border border-green-600 text-green-600"
//                     >
//                       Approve
//                     </button>
//                   )}

//                   {item.status !== "rejected" && (
//                     <button
//                       onClick={() => updateStatus(item.id, "rejected")}
//                       className="px-4 py-1 text-sm rounded border border-red-600 text-red-600"
//                     >
//                       Deny
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedNews && (
//         <ViewModal news={selectedNews} onClose={() => setSelectedNews(null)} />
//       )}
//     </div>
//   );
// }

// /* ================= VIEW MODAL ================= */
// function ViewModal({
//   news,
//   onClose,
// }: {
//   news: NewsRecord;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-white text-xl z-10"
//         >
//           ✕
//         </button>

//         {news.image_url && (
//           <img src={news.image_url} className="w-full h-64 object-cover" />
//         )}

//         <div className="p-8 space-y-4">
//           <h3 className="text-2xl font-bold">{news.title}</h3>

//           <div className="flex gap-2">
//             <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
//               {news.category}
//             </span>
//             <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
//               {news.status}
//             </span>
//           </div>

//           <p>{news.content}</p>

//           {news.youtube_link && (
//             <a href={news.youtube_link} target="_blank" className="text-blue-600 underline">
//               Watch YouTube Video
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= STAT CARD ================= */
// function StatCard({
//   title,
//   value,
//   color = "gray",
// }: {
//   title: string;
//   value: number;
//   color?: "gray" | "green" | "red";
// }) {
//   const bg =
//     color === "green"
//       ? "bg-green-50 text-green-700"
//       : color === "red"
//       ? "bg-red-50 text-red-700"
//       : "bg-white";

//   return (
//     <div className={`rounded-xl p-5 border shadow-sm ${bg}`}>
//       <p className="text-sm">{title}</p>
//       <h2 className="text-2xl font-bold mt-1">{value}</h2>
//     </div>
//   );
// }
"use client";

import useNews, { NewsRecord } from "@/hooks/useNews";
import React, { useState } from "react";

export default function AllUploadedNews() {
  const { news, loading, error } = useNews();
  const [selectedNews, setSelectedNews] = useState<NewsRecord | null>(null);
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  /* ===== STATUS UPDATE ===== */
  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/news`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) throw new Error("Failed to update");

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  /* ===== STATS ===== */
  const total = news.length;
  const accepted = news.filter((n) => n.status === "approved").length;
  const pending = news.filter((n) => n.status === "pending").length;
  const denied = news.filter((n) => n.status === "rejected").length;

  /* ===== SEARCH FILTER ===== */
  const filteredNews = news.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total News" value={total} />
        <StatCard title="Accepted" value={accepted} color="green" />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Denied" value={denied} color="red" />
      </div>

      {/* ===== SEARCH ===== */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">All News</h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg text-sm w-64"
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredNews.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={item.image_url}
                    alt="news"
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                </td>

                {/* TITLE */}
                <td className="p-3 font-medium text-gray-800 max-w-xs truncate">
                  {item.title}
                </td>

                {/* CATEGORY */}
                <td className="p-3 capitalize">{item.category}</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* CREATED DATE */}
                <td className="p-3">
                  {new Date(item.created_at).toLocaleString()}
                </td>

                {/* ACTIONS */}
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setSelectedNews(item)}
                    className="px-4 py-1 text-sm rounded bg-indigo-600 text-white"
                  >
                    View
                  </button>

                  {item.status !== "approved" && (
                    <button
                      onClick={() => updateStatus(item.id, "approved")}
                      className="px-4 py-1 text-sm rounded border border-green-600 text-green-600"
                    >
                      Approve
                    </button>
                  )}

                  {item.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(item.id, "rejected")}
                      className="px-4 py-1 text-sm rounded border border-red-600 text-red-600"
                    >
                      Deny
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {selectedNews && (
        <ViewModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
}

/* ================= VIEW MODAL ================= */
function ViewModal({
  news,
  onClose,
}: {
  news: NewsRecord;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-xl"
        >
          ✕
        </button>

        {news.image_url && (
          <img src={news.image_url} className="w-full h-64 object-cover" />
        )}

        <div className="p-8 space-y-4">
          <h3 className="text-2xl font-bold">{news.title}</h3>

          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
              {news.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
              {news.status}
            </span>
          </div>

          <p>{news.content}</p>

          {news.youtube_link && (
            <a
              href={news.youtube_link}
              target="_blank"
              className="text-blue-600 underline"
            >
              Watch YouTube Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({
  title,
  value,
  color = "gray",
}: {
  title: string;
  value: number;
  color?: "gray" | "green" | "red";
}) {
  const bg =
    color === "green"
      ? "bg-green-50 text-green-700"
      : color === "red"
      ? "bg-red-50 text-red-700"
      : "bg-white";

  return (
    <div className={`rounded-xl p-5 border shadow-sm ${bg}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}

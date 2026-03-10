
"use client";

import useLoggedUser from "@/hooks/useLoggedUser";
import useNews, { NewsRecord } from "@/hooks/useNews";
import React, { useState } from "react";

export default function UploadedNews() {
  const { news, loading, error } = useNews();
  const { loggedUser } = useLoggedUser();

  const [selectedNews, setSelectedNews] = useState<NewsRecord | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!loggedUser?.email) return <p>User not logged in</p>;

  /* ===== FILTER USER NEWS ===== */
  const myNews = news.filter(
    (n) => n.blog_writer_email === loggedUser.email
  );

  /* ===== STATS ===== */
  const total = myNews.length;
  const accepted = myNews.filter((n) => n.status === "approved").length;
  const pending = myNews.filter((n) => n.status === "pending").length;
  const denied = myNews.filter((n) => n.status === "rejected").length;

  return (
    <div className="p-6 space-y-6">
      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Blogs" value={total} />
        <StatCard title="Accepted" value={accepted} color="green" />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Denied" value={denied} color="red" />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myNews.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No news uploaded yet
                </td>
              </tr>
            ) : (
              myNews.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
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

                  <td className="p-3 text-gray-600">
                    {new Date(item.created_at).toLocaleString()}
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="px-4 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      View
                    </button>
                    <button className="px-4 py-1 text-sm rounded border border-blue-500 text-blue-500">
                      Edit
                    </button>
                    <button className="px-4 py-1 text-sm rounded border border-red-500 text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== VIEW MODAL ===== */}
      {selectedNews && (
        <ViewModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </div>
  );
}

/* =====================
   VIEW MODAL
===================== */
function ViewModal({
  news,
  onClose,
}: {
  news: NewsRecord;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <img
          src={news.image_url}
          alt={news.title}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <h2 className="text-2xl font-bold mb-1">{news.title}</h2>

        <div className="flex gap-3 text-sm mb-3">
          <span className="px-2 py-1 bg-gray-100 rounded">
            {news.category}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded">
            {news.status}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{news.content}</p>

        {news.breaking_news && (
          <p className="font-semibold text-red-600 mb-2">
            🚨 {news.breaking_news}
          </p>
        )}

        {news.youtube_link && (
          <a
            href={news.youtube_link}
            target="_blank"
            className="text-blue-600 underline"
          >
            Watch YouTube Video
          </a>
        )}

        <p className="text-xs text-gray-500 mt-4">
          Published on {new Date(news.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/* =====================
   STAT CARD
===================== */
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

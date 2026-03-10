"use client";

import useMyUserBlogs from "@/hooks/useMyUserBlogs";
import React, { useState } from "react";

/* ================= HELPERS ================= */

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

const limitWords = (text: string, count = 20) => {
  const words = text.split(" ");
  if (words.length <= count) return text;
  return words.slice(0, count).join(" ") + " ...";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export default function BlogRequest() {
  const { blogs, loading, error } = useMyUserBlogs();
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // const handleStatus = async (id: string, status: "active" | "denied") => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await fetch(`/api/blog`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, //  IMPORTANT
  //       },
  //       body: JSON.stringify({ id, status }),
  //     });

  //     //  SAFE JSON PARSE
  //     // let data = null;
  //     // const text = await res.text();

  //     // if (text) {
  //     //   data = JSON.parse(text);
  //     // }

  //     let data;

  //     try {
  //       data = await res.json();
  //     } catch {
  //       data = null;
  //     }

  //     // if (!res.ok) {
  //     //   throw new Error(data?.error || "Failed");
  //     // }
  //     if (!res.ok) {
  //       console.log("Server response:", data);
  //       throw new Error(data?.error || data?.message || "Request failed");
  //     }

  //     alert(`Blog ${status} successfully`);
  //     window.location.reload();
  //   } catch (err: any) {
  //     console.error(err);
  //     alert(err.message || "Something went wrong");
  //   }
  // };

  const handleStatus = async (id: string, status: "active" | "denied") => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      return;
    }

    const res = await fetch(`/api/sgolb/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      console.log("Server error:", data);
      throw new Error(data?.error || "Failed to update");
    }

    alert(`Blog ${status} successfully`);
    window.location.reload();

  } catch (err: any) {
    console.error(err);
    alert(err.message || "Something went wrong");
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  //  SEARCH FILTER
  const filteredBlogs = blogs.filter((blog: any) => {
    const section = blog.sections?.[0];
    const title = section?.title?.toLowerCase() || "";
    const content = stripHtml(section?.content || "").toLowerCase();
    const email = blog.author_email?.toLowerCase() || "";

    return (
      title.includes(searchTerm.toLowerCase()) ||
      content.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });
console.log(blogs)
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "16px" }}>Blog Requests</h2>

      {/* ================= TABLE VIEW ================= */}
      {!selectedBlog && (
        <>
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by title, blog text or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />

          <div className="tableWrapper">
            <table className="blogTable">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Blog Text</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center" }}>
                      No results found
                    </td>
                  </tr>
                )}

                {filteredBlogs.map((blog: any) => {
                  const section = blog.sections?.[0];
                  const plainText = stripHtml(section?.content || "");
                  const shortText = limitWords(plainText, 20);

                  return (
                    <tr key={blog.id}>
                      <td>
                        <img
                          src={section?.image_url || "/placeholder.png"}
                          alt="blog"
                          className="blogImage"
                        />
                      </td>

                      <td>{section?.title?.trim() || "Untitled Blog"}</td>

                      <td className="blogText">{shortText}</td>

                      <td>{blog.author_email || "N/A"}</td>

                      <td>{blog.category || "—"}</td>

                      <td>
                        <span className={`statusBadge ${blog.status}`}>
                          {blog.status}
                        </span>
                      </td>

                      <td>{formatDate(blog.created_at)}</td>

                      <td className="actionCell">
                        <button
                          className="viewBtn"
                          onClick={() => setSelectedBlog(blog)}
                        >
                          View
                        </button>

                        <button
                          className="approveBtn"
                          disabled={blog.status === "active"}
                          onClick={() => handleStatus(blog.id, "active")}
                        >
                          Approve
                        </button>

                        <button
                          className="denyBtn"
                          disabled={blog.status === "denied"}
                          onClick={() => handleStatus(blog.id, "denied")}
                        >
                          Deny
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ================= BLOG VIEW ================= */}
      {selectedBlog && (
        <div className="blogViewPage">
          <button className="backBtn" onClick={() => setSelectedBlog(null)}>
            ← Back to table
          </button>

          <h2>{selectedBlog.sections?.[0]?.title}</h2>

          <img
            src={selectedBlog.sections?.[0]?.image_url || "/placeholder.png"}
            alt="blog"
            className="viewImage"
          />

          <p>
            <b>Author:</b> {selectedBlog.author_email}
          </p>
          <p>
            <b>Category:</b> {selectedBlog.category}
          </p>
          <p>
            <b>Status:</b> {selectedBlog.status}
          </p>
          <p>
            <b>Created:</b> {formatDate(selectedBlog.created_at)}
          </p>

          <hr />

          <div
            className="viewContent"
            dangerouslySetInnerHTML={{
              __html: selectedBlog.sections?.[0]?.content,
            }}
          />

          <div className="viewActions">
            <button
              className="approveBtn"
              onClick={() => handleStatus(selectedBlog.id, "active")}
            >
              Approve
            </button>

            <button
              className="denyBtn"
              onClick={() => handleStatus(selectedBlog.id, "denied")}
            >
              Deny
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

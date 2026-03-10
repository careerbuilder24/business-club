
import React, { useState } from "react";
import useLoggedUser from "@/hooks/useLoggedUser";
import useMyUserBlogs from "@/hooks/useMyUserBlogs";

/* ================= TYPES ================= */

type Section = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
};

type Blog = {
  id: number;
  category: string;
  status: "pending" | "accepted" | "denied" | "active";
  author_email: string;
  created_at: string;
  sections: Section[];
};

type ViewMode = "list" | "view" | "edit";

/* ================= HELPERS ================= */

//  Strip HTML tags for edit textarea
const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

/* ================= IMAGE UPLOAD ================= */

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY!;

const uploadToImgBB = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    { method: "POST", body: formData }
  );

  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");

  return data.data.url;
};

/* ================= COMPONENT ================= */

export default function UserMyBlog() {
  const { loggedUser } = useLoggedUser();
  const { blogs, loading, error } = useMyUserBlogs();

  const [mode, setMode] = useState<ViewMode>("list");
  const [activeBlogId, setActiveBlogId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editSections, setEditSections] = useState<Section[]>([]);
  const [saving, setSaving] = useState(false);

  const myBlogs: Blog[] = (blogs as Blog[]).filter(
    (blog) => blog.author_email === loggedUser?.email
  );

  const selectedBlog = myBlogs.find((b) => b.id === activeBlogId);

  /* ================= DASHBOARD STATS ================= */

  const totalBlogs = myBlogs.length;
  const acceptedBlogs = myBlogs.filter(b => b.status === "accepted").length;
  const pendingBlogs = myBlogs.filter(b => b.status === "pending").length;
  const deniedBlogs = myBlogs.filter(b => b.status === "denied").length;

  /* ================= OPEN EDIT ================= */

  const openEdit = (blog: Blog) => {
    setActiveBlogId(blog.id);
    setEditCategory(blog.category || "");
    setEditSections(
      blog.sections.map((s) => ({
        id: s.id,
        title: s.title || "",
        content: stripHtml(s.content), // FIX APPLIED
        image_url: s.image_url || null,
      }))
    );
    setMode("edit");
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">My Blogs</h1>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Total Blogs" value={totalBlogs} />
        <Stat label="Accepted" value={acceptedBlogs} color="green" />
        <Stat label="Pending" value={pendingBlogs} color="gray" />
        <Stat label="Denied" value={deniedBlogs} color="red" />
      </div>

      {/* ================= LIST ================= */}
      {mode === "list" && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                {/* <th className="p-3 text-left">Title</th> */}
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Created At</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myBlogs.map((blog) => {
                const first = blog.sections[0];

                return (
                  <tr key={blog.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {first?.image_url ? (
                        <img
                          src={first.image_url}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded" />
                      )}
                    </td>

                    {/* <td className="p-3 font-medium">
                      {first?.title || "No title"}
                    </td> */}

                    <td className="p-3 text-center">
                      <StatusBadge status={blog.status} />
                    </td>

                    <td className="p-3 text-center text-gray-600">
                      {new Date(blog.created_at).toLocaleString("en-GB")}
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        className="px-4 py-1 border rounded bg-[#2C8845] text-white hover:bg-[#50ca70] hover:text-[#ffffff]"
                        onClick={() => {
                          setActiveBlogId(blog.id);
                          setMode("view");
                        }}
                      >
                        View
                      </button>

                      <button
                        className="px-4 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50"
                        onClick={() => openEdit(blog)}
                      >
                        Edit
                      </button>

                      <button
                        className="px-4 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= VIEW ================= */}
      {mode === "view" && selectedBlog && (
        <ViewBlog blog={selectedBlog} onBack={() => setMode("list")} />
      )}

      {/* ================= EDIT ================= */}
      {mode === "edit" && (
        <EditBlog
          category={editCategory}
          setCategory={setEditCategory}
          sections={editSections}
          setSections={setEditSections}
          saving={saving}
          onBack={() => setMode("list")}
          onSave={async () => {
            if (!activeBlogId) return;

            setSaving(true);
            try {
              await fetch("/api/blog", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  blogId: activeBlogId,
                  category: editCategory,
                  sections: editSections,
                }),
              });

              alert("Blog updated");
              setMode("list");
            } finally {
              setSaving(false);
            }
          }}
        />
      )}
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Stat = ({ label, value, color = "gray" }: any) => (
  <div className={`bg-${color}-50 border rounded-lg p-4`}>
    <p className={`text-${color}-600 text-sm`}>{label}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const map: any = {
    accepted: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-gray-100 text-gray-700 border-gray-300",
    denied: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${map[status]}`}>
      {status}
    </span>
  );
};

const ViewBlog = ({ blog, onBack }: any) => (
  <div className="border p-6 rounded">
    <button onClick={onBack} className="mb-4 bg-gray-700 text-white px-4 py-1 rounded">
      ← Back
    </button>

    {blog.sections.map((s: Section) => (
      <div key={s.id} className="mb-6">
        <h3 className="font-semibold">{s.title}</h3>
        {s.image_url && (
          <img src={s.image_url} className="w-full max-w-md my-2" />
        )}
        <div dangerouslySetInnerHTML={{ __html: s.content }} />
      </div>
    ))}
  </div>
);

const EditBlog = ({
  category,
  setCategory,
  sections,
  setSections,
  saving,
  onBack,
  onSave,
}: any) => (
  <div className="border p-6 rounded">
    <button onClick={onBack} className="mb-4 bg-gray-700 text-white px-4 py-1 rounded">
      ← Back
    </button>

    <input
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full border px-3 py-2 rounded mb-6"
      placeholder="Category"
    />

    {sections.map((section: Section, index: number) => (
      <div key={section.id} className="border p-4 mb-6 rounded">
        <input
          value={section.title}
          onChange={(e) => {
            const copy = [...sections];
            copy[index].title = e.target.value;
            setSections(copy);
          }}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {section.image_url && (
          <img
            src={section.image_url}
            className="w-40 h-40 object-cover rounded mb-3"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (!e.target.files?.[0]) return;
            const url = await uploadToImgBB(e.target.files[0]);
            const copy = [...sections];
            copy[index].image_url = url;
            setSections(copy);
          }}
        />

        <textarea
          rows={6}
          value={section.content}
          onChange={(e) => {
            const copy = [...sections];
            copy[index].content = e.target.value;
            setSections(copy);
          }}
          className="w-full border px-3 py-2 rounded mt-3"
        />
      </div>
    ))}

    <button
      disabled={saving}
      onClick={onSave}
      className="bg-blue-600 text-white px-6 py-2 rounded"
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>
  </div>
);

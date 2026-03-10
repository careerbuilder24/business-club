
import useLoggedUser from "@/hooks/useLoggedUser";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type BlogSection = {
  id: number | null; //  DB id for edit, null for new
  title: string;
  content: string;
  image_url: string | null;
};

type Props = {
  blogToEdit?: {
    id: number;
    category: string;
    sections: BlogSection[];
  };
};

/* ================= COMPONENT ================= */

export default function UserBlog({ blogToEdit }: Props) {
  const { loggedUser } = useLoggedUser();

  const isEdit = !!blogToEdit;

  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<BlogSection[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [livePreview, setLivePreview] = useState(false);

  /* ================= INIT ================= */

  useEffect(() => {
    if (blogToEdit) {
      setCategory(blogToEdit.category);
      setSections(
        blogToEdit.sections.map((s) => ({
          id: s.id,
          title: s.title || "",
          content: s.content || "",
          image_url: s.image_url || null,
        }))
      );
    } else {
      setSections([
        { id: null, title: "", content: "", image_url: null },
      ]);
    }
  }, [blogToEdit]);

  /* ================= HELPERS ================= */

  const updateSection = <K extends keyof BlogSection>(
    index: number,
    field: K,
    value: BlogSection[K]
  ) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // const addSection = () => {
  //   setSections((prev) => [
  //     ...prev,
  //     { id: null, title: "", content: "", image_url: null },
  //   ]);
  // };

  /* ================= IMGBB ================= */

  const uploadToImgbb = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Upload failed");

    return data.data.url;
  };

  /* ================= SUBMIT ================= */

  // const handleSubmit = async () => {
  //   if (!category.trim()) return alert("Category required");

  //   setSubmitting(true);

  //   try {
  //     const payload = {
  //       blogId: blogToEdit?.id,
  //       category,
  //       author_email: loggedUser?.email,
  //       sections,
  //     };

  //     const res = await fetch(
  //       isEdit ? "/api/blogs" : "/api/blog",
  //       {
  //         method: isEdit ? "PUT" : "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     const data = await res.json();
  //     if (!res.ok || !data.success) {
  //       throw new Error(data.error || "Failed");
  //     }

  //     alert(isEdit ? "Blog updated" : "Blog created");
  //   } catch (e) {
  //     console.error(e);
  //     alert("Save failed");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
const handleSubmit = async () => {
  if (!category.trim()) {
    alert("Category required");
    return;
  }

  try {
    setSubmitting(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      return;
    }

    const payload = {
      category,
      sections,
      author_email: loggedUser?.email, // ✅ FIXED
      ...(isEdit && { blogId: blogToEdit?.id }), // ✅ FIXED
    };

    const res = await fetch("/api/blog", {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ JWT
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed");
    }

    alert(isEdit ? "Blog updated" : "Blog created");
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Something went wrong");
  } finally {
    setSubmitting(false); // ✅ FIXED
  }
};
  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-xl font-semibold">
        {isEdit ? "Edit Blog" : "Write Blog"}
      </h1>

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full border px-4 py-2 rounded"
      />

      {sections.map((s, i) => (
        <div key={i} className="border p-4 rounded space-y-4">
          <input
            value={s.title}
            onChange={(e) =>
              updateSection(i, "title", e.target.value)
            }
            placeholder="Section title"
            className="w-full text-lg font-semibold"
          />

          {/* ✅ CONTROLLED CONTENTEDITABLE */}
          <div
            contentEditable
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: s.content }}
            onInput={(e) =>
              updateSection(
                i,
                "content",
                (e.target as HTMLDivElement).innerHTML
              )
            }
            className="min-h-[150px] border rounded p-3"
          />

          {s.image_url && (
            <img
              src={s.image_url}
              className="rounded max-h-64 object-cover"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              if (!e.target.files?.[0]) return;
              const url = await uploadToImgbb(e.target.files[0]);
              updateSection(i, "image_url", url);
            }}
          />
        </div>
      ))}

      {/* <button
        onClick={addSection}
        className="border px-4 py-2 rounded"
      >
        + Add Section
      </button> */}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        {submitting
          ? "Saving..."
          : isEdit
          ? "Save Changes"
          : "Post Blog"}
      </button>

      {livePreview && (
        <div className="border-t pt-6">
          {sections.map((s, i) => (
            <div key={i}>
              <h2>{s.title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: s.content }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

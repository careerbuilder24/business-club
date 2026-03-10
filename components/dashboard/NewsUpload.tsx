// "use client";

// import React, { useState, ChangeEvent, FormEvent } from "react";

// interface NewsFormData {
//   title: string;
//   content: string;
//   youtubeLink: string;
//   breakingNews: string;
//   image: File | null;
// }

// export default function NewsUpload() {
//   const [formData, setFormData] = useState<NewsFormData>({
//     title: "",
//     content: "",
//     youtubeLink: "",
//     breakingNews: "",
//     image: null,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     if (e.target instanceof HTMLInputElement && e.target.type === "file") {
//       setFormData({ ...formData, image: e.target.files?.[0] || null });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   /* ===== IMAGE → BASE64 (BROWSER SAFE) ===== */
//   const toBase64 = (file: File): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () =>
//         resolve(reader.result?.toString().split(",")[1] || "");
//       reader.onerror = (err) => reject(err);
//     });

//   /* ===== UPLOAD TO IMGBB ===== */
//   const uploadToImgBB = async (file: File): Promise<string> => {
//     const apiKey = process.env.NEXT_PUBLIC_IMAGE_URL;
//     if (!apiKey) throw new Error("ImgBB API key missing");

//     const base64 = await toBase64(file);

//     const form = new URLSearchParams();
//     form.append("key", apiKey);
//     form.append("image", base64);

//     const res = await fetch("https://api.imgbb.com/1/upload", {
//       method: "POST",
//       body: form,
//     });

//     const data = await res.json();

//     if (!data.success) {
//       throw new Error("ImgBB upload failed");
//     }

//     return data.data.url;
//   };

//   /* ===== SUBMIT ===== */
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!formData.image) {
//         alert("Image required");
//         return;
//       }

//       //  Upload image
//       const imageUrl = await uploadToImgBB(formData.image);

//       //  Send JSON to backend
//       const payload = {
//         title: formData.title,
//         content: formData.content,
//         image_url: imageUrl,
//         youtubeLink: formData.youtubeLink,
//         breakingNews: formData.breakingNews,
//       };

//       console.log("SENDING JSON:", payload);

//       const res = await fetch("/api/news", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();

//       if (!result.success) {
//         throw new Error(result.error || "Upload failed");
//       }

//       alert(" News uploaded successfully");

//       setFormData({
//         title: "",
//         content: "",
//         youtubeLink: "",
//         breakingNews: "",
//         image: null,
//       });
//     } catch (err: any) {
//       alert(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-10 flex items-center justify-center p-4">
//       <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-6">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Upload News
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="News Title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full border rounded px-3 py-2"
//           />

//           <textarea
//             name="content"
//             placeholder="News Content"
//             value={formData.content}
//             onChange={handleChange}
//             rows={4}
//             required
//             className="w-full border rounded px-3 py-2"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="url"
//             name="youtubeLink"
//             placeholder="YouTube Link"
//             value={formData.youtubeLink}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />

//           <input
//             type="text"
//             name="breakingNews"
//             placeholder="Breaking News"
//             value={formData.breakingNews}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded"
//           >
//             {loading ? "Uploading..." : "Upload News"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import useLoggedUser from "@/hooks/useLoggedUser";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface NewsFormData {
  title: string;
  category: "national" | "international";
  content: string;
  youtubeLink: string;
  breakingNews: string;
  image: File | null;
}

export default function NewsUpload() {
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    category: "national",
    content: "",
    youtubeLink: "",
    breakingNews: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const { loggedUser } = useLoggedUser();

  console.log(loggedUser);

  /* ========= HANDLE CHANGE ========= */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      setFormData({ ...formData, image: e.target.files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ========= FILE → BASE64 ========= */
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result?.toString().split(",")[1] || "");
      reader.onerror = reject;
    });

  /* ========= UPLOAD TO IMGBB ========= */
  const uploadToImgBB = async (file: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMAGE_URL;
    if (!apiKey) throw new Error("ImgBB API key missing");

    const base64 = await toBase64(file);

    const form = new URLSearchParams();
    form.append("key", apiKey);
    form.append("image", base64);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error("ImgBB upload failed");
    }

    return data.data.url;
  };

  /* ========= SUBMIT ========= */
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (loading) return;

  //   setLoading(true);

  //   try {
  //     if (!formData.image) {
  //       alert("Image required");
  //       setLoading(false);
  //       return;
  //     }

  //     // Upload image
  //     const imageUrl = await uploadToImgBB(formData.image);

  //     // Payload
  //     // const payload = {
  //     //   title: formData.title,
  //     //   category: formData.category,
  //     //   content: formData.content,
  //     //   image_url: imageUrl,
  //     //   youtubeLink: formData.youtubeLink,
  //     //   breakingNews: formData.breakingNews,
  //     // };
  //     const payload = {
  //       title: formData.title,
  //       category: formData.category,
  //       content: formData.content,
  //       image_url: imageUrl,
  //       youtubeLink: formData.youtubeLink,
  //       breakingNews: formData.breakingNews,
  //       blog_writer_email: loggedUser?.email, 
  //     };

  //     const res = await fetch("/api/news", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await res.json();

  //     if (!result.success) {
  //       throw new Error(result.error || "Upload failed");
  //     }

  //     alert(" News uploaded successfully");

  //     setFormData({
  //       title: "",
  //       category: "national",
  //       content: "",
  //       youtubeLink: "",
  //       breakingNews: "",
  //       image: null,
  //     });
  //   } catch (err: any) {
  //     alert(err.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (loading) return;

  setLoading(true);

  try {
    if (!loggedUser || !loggedUser.email) {
      alert("User not loaded. Please try again.");
      setLoading(false);
      return;
    }

    if (!formData.image) {
      alert("Image required");
      setLoading(false);
      return;
    }

    // Upload image
    const imageUrl = await uploadToImgBB(formData.image);

    const payload = {
      title: formData.title,
      category: formData.category,
      content: formData.content,
      image_url: imageUrl,
      youtubeLink: formData.youtubeLink,
      breakingNews: formData.breakingNews,
      blog_writer_email: loggedUser.email, // ✅ NOW GUARANTEED
    };

    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.error || "Upload failed");
    }

    alert("✅ News uploaded successfully");

    setFormData({
      title: "",
      category: "national",
      content: "",
      youtubeLink: "",
      breakingNews: "",
      image: null,
    });
  } catch (err: any) {
    alert(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="mt-10 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Upload News</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="News Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          {/* CATEGORY DROPDOWN */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="national">National</option>
            <option value="international">International</option>
          </select>

          <textarea
            name="content"
            placeholder="News Content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <input
            type="url"
            name="youtubeLink"
            placeholder="YouTube Link"
            value={formData.youtubeLink}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="breakingNews"
            placeholder="Breaking News"
            value={formData.breakingNews}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload News"}
          </button>
        </form>
      </div>
    </div>
  );
}

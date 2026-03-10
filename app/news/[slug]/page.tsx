// import { notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";
// // import { articles } from "../data"; // adjust path if needed
// import { articles } from "../data";

// type Props = {
//   params: { slug: string };
// };

// export default function NewsDetails({ params }: Props) {
//   const article = articles.find(a => a.slug === params.slug);

//   if (!article) return notFound();

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: "900px", margin: "20px auto", padding: "16px" }}>
//         <img
//           src={article.image}
//           style={{ width: "100%", borderRadius: "8px" }}
//         />

//         <h1 style={{ marginTop: "16px" }}>{article.title}</h1>

//         <p style={{ marginTop: "12px", lineHeight: 1.6 }}>
//           {article.content}
//         </p>
//       </div>
//     </>
//   );
// }
// import { notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// type Props = {
//   params: { slug: string };
// };

// async function getNewsById(id: string): Promise<NewsItem | null> {
//   try {
//     // 🔴 CHANGE THIS URL to your real backend endpoint
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     return res.json();
//   } catch (error) {
//     return null;
//   }
// }

// export default async function NewsDetails({ params }: Props) {
//   const article = await getNewsById(params.slug);

//   if (!article) return notFound();

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: "900px", margin: "20px auto", padding: "16px" }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: "8px" }}
//         />

//         <h1 style={{ marginTop: "16px" }}>{article.title}</h1>

//         <p style={{ marginTop: "12px", lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <div style={{ marginTop: "24px" }}>
//             <iframe
//               width="100%"
//               height="400"
//               src={article.youtube_link.replace("watch?v=", "embed/")}
//               allowFullScreen
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// import { notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// type Props = {
//   params: { slug: string };
// };

// async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/news/slug/${slug}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return null;
//     return res.json();
//   } catch {
//     return null;
//   }
// }

// export default async function NewsDetails({ params }: Props) {
//   const article = await getNewsBySlug(params.slug);

//   if (!article) return notFound();

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <div style={{ marginTop: 24 }}>
//             <iframe
//               width="100%"
//               height="400"
//               src={article.youtube_link.replace("watch?v=", "embed/")}
//               allowFullScreen
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// import { notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// /* ================= TYPES ================= */

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// type Props = {
//   params: { slug: string };
// };

// /* ================= HELPERS ================= */

// // extract ID from: "breaking-news-title-123"
// function extractIdFromSlug(slug: string): string {
//   return slug.split("-").pop() || "";
// }

// /* ================= API ================= */

// async function getNewsById(id: string): Promise<NewsItem | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return null;
//     return res.json();
//   } catch {
//     return null;
//   }
// }

// /* ================= PAGE ================= */

// export default async function NewsDetails({ params }: Props) {
//   const id = extractIdFromSlug(params.slug);
//   const article = await getNewsById(id);

//   if (!article) return notFound();

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <div style={{ marginTop: 24 }}>
//             <iframe
//               width="100%"
//               height="400"
//               src={article.youtube_link.replace("watch?v=", "embed/")}
//               allowFullScreen
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// import { notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// /* ================= TYPES ================= */

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// type Props = {
//   params: { slug: string };
// };

// /* ================= HELPERS ================= */

// // SAFELY extract numeric ID from slug
// // example: "breaking-news-title-123"
// function extractIdFromSlug(slug: string): string | null {
//   const match = slug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// /* ================= API ================= */

// async function getNewsById(id: string): Promise<NewsItem | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return null;

//     return res.json();
//   } catch {
//     return null;
//   }
// }

// /* ================= PAGE ================= */

// export default async function NewsDetails({ params }: Props) {
//   const id = extractIdFromSlug(params.slug);

//   if (!id) return notFound();

//   const article = await getNewsById(id);

//   if (!article) return notFound();

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <div style={{ marginTop: 24 }}>
//             <iframe
//               width="100%"
//               height="400"
//               src={article.youtube_link.replace("watch?v=", "embed/")}
//               allowFullScreen
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// import { notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// type Props = {
//   params: { slug: string | string[] };
// };

// function extractIdFromSlug(slug: string | string[]): string | null {
//   const safeSlug = Array.isArray(slug) ? slug[0] : slug;
//   const match = safeSlug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// async function getNewsById(id: string): Promise<NewsItem | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return null;
//     return res.json();
//   } catch {
//     return null;
//   }
// }

// export default async function NewsDetails({ params }: Props) {
//   const id = extractIdFromSlug(params.slug);
//   if (!id) return notFound();

//   const article = await getNewsById(id);
//   if (!article) return notFound();

//   return (
//     <>
//       <Sidebar />
//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img src={article.image_url} alt={article.title} />
//         <h1>{article.title}</h1>
//         <p>{article.content}</p>
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// function extractIdFromSlug(slug: string | string[]): string | null {
//   const safeSlug = Array.isArray(slug) ? slug[0] : slug;
//   const match = safeSlug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// export default function NewsDetails() {
//   const params = useParams();
//   const slug = params.slug as string;

//   const [article, setArticle] = useState<NewsItem | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const id = extractIdFromSlug(slug);
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed");
//         return res.json();
//       })
//       .then((data) => {
//         setArticle(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, [slug]);

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading article...</p>;
//   }

//   if (!article) {
//     notFound();
//   }

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <iframe
//             width="100%"
//             height="400"
//             src={article.youtube_link.replace("watch?v=", "embed/")}
//             allowFullScreen
//           />
//         )}
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// function extractIdFromSlug(slug: string | string[]): string | null {
//   const safeSlug = Array.isArray(slug) ? slug[0] : slug;
//   const match = safeSlug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// export default function NewsDetails() {
//   const params = useParams();
//   const slug = params.slug as string;

//   const [article, setArticle] = useState<NewsItem | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const id = extractIdFromSlug(slug);
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed");
//         return res.json();
//       })
//       .then((data) => {
//         setArticle(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, [slug]);

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading article...</p>;
//   }

//   if (!article) {
//     notFound();
//   }

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <iframe
//             width="100%"
//             height="400"
//             src={article.youtube_link.replace("watch?v=", "embed/")}
//             allowFullScreen
//           />
//         )}
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// function extractIdFromSlug(slug: string | string[]): string | null {
//   const safeSlug = Array.isArray(slug) ? slug[0] : slug;
//   const match = safeSlug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// export default function NewsDetails() {
//   const params = useParams();
//   const slug = params.slug as string;

//   const [article, setArticle] = useState<NewsItem | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const id = extractIdFromSlug(slug);
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed");
//         return res.json();
//       })
//       .then((data) => {
//         setArticle(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, [slug]);

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading article...</p>;
//   }

//   if (!article) {
//     notFound();
//   }

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <iframe
//             width="100%"
//             height="400"
//             src={article.youtube_link.replace("watch?v=", "embed/")}
//             allowFullScreen
//           />
//         )}
//       </div>
//     </>
//   );
// }
// import { notFound } from "next/navigation";
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// function extractIdFromSlug(slug: string): string | null {
//   const match = slug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// async function getArticle(id: string): Promise<NewsItem | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return null;

//     return res.json();
//   } catch {
//     return null;
//   }
// }

// export default async function NewsDetails({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const id = extractIdFromSlug(params.slug);

//   if (!id) notFound();

//   const article = await getArticle(id);

//   if (!article) notFound();

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <iframe
//             width="100%"
//             height="400"
//             src={article.youtube_link.replace("watch?v=", "embed/")}
//             allowFullScreen
//           />
//         )}
//       </div>
//     </>
//   );
// }
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// /* ---------- extract ID from slug ---------- */
// function extractIdFromSlug(slug: string): string | null {
//   const match = slug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// /* ---------- fetch article ---------- */
// async function getArticle(id: string): Promise<NewsItem | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return null;

//     return res.json();
//   } catch {
//     return null;
//   }
// }

// /* ---------- page ---------- */
// export default async function NewsDetails({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const id = extractIdFromSlug(params.slug);

//   if (!id) {
//     return <p style={{ textAlign: "center" }}>Invalid article URL</p>;
//   }

//   const article = await getArticle(id);

//   if (!article) {
//     return <p style={{ textAlign: "center" }}>Article not found</p>;
//   }

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <iframe
//             width="100%"
//             height="400"
//             src={article.youtube_link.replace("watch?v=", "embed/")}
//             allowFullScreen
//           />
//         )}
//       </div>
//     </>
//   );
// }
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// /* ---------- extract ID from slug ---------- */
// function extractIdFromSlug(slug: string): string | null {
//   const match = slug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// /* ---------- fetch article ---------- */
// async function getArticle(id: string): Promise<NewsItem | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) return null;

//     return res.json();
//   } catch {
//     return null;
//   }
// }

// /* ---------- page ---------- */
// export default async function NewsDetails({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const id = extractIdFromSlug(params.slug);

//   if (!id) {
//     return <p style={{ textAlign: "center" }}>Invalid article URL</p>;
//   }

//   const article = await getArticle(id);

//   if (!article) {
//     return <p style={{ textAlign: "center" }}>Article not found</p>;
//   }

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <iframe
//             width="100%"
//             height="400"
//             src={article.youtube_link.replace("watch?v=", "embed/")}
//             allowFullScreen
//           />
//         )}
//       </div>
//     </>
//   );
// }
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// function extractIdFromSlug(slug: string): string | null {
//   const match = slug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// async function getArticle(id: string): Promise<NewsItem | null> {
//   try {
//     const API = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000";

//     // const res = await fetch(`${API}/api/news/${id}`, {
//     const res = await fetch(`${API}/api/news?id=${id}`, {
 
//     cache: "no-store",
//     });

//     if (!res.ok) {
//       console.log("API error:", res.status);
//       return null;
//     }

//     return res.json();
//   } catch (err) {
//     console.log("fetch error", err);
//     return null;
//   }
// }

// export default async function NewsDetails({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const id = extractIdFromSlug(params.slug);

//   if (!id) {
//     return <p style={{ textAlign: "center" }}>Invalid article URL</p>;
//   }

//   const article = await getArticle(id);

//   if (!article) {
//     return <p style={{ textAlign: "center" }}>Article not found</p>;
//   }

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img
//           src={article.image_url}
//           alt={article.title}
//           style={{ width: "100%", borderRadius: 8 }}
//         />

//         <h1 style={{ marginTop: 16 }}>{article.title}</h1>

//         <p style={{ marginTop: 12, lineHeight: 1.7 }}>
//           {article.content}
//         </p>

//         {article.youtube_link && (
//           <iframe
//             width="100%"
//             height="400"
//             src={article.youtube_link.replace("watch?v=", "embed/")}
//             allowFullScreen
//           />
//         )}
//       </div>
//     </>
//   );
// }
// import Sidebar from "@/components/Sidebar/Sidebar";

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// function extractIdFromSlug(slug: string): string | null {
//   const match = slug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// export default async function NewsDetails({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;   // ⭐ MUST await params

//   const id = extractIdFromSlug(slug);

//   if (!id) {
//     return <p style={{ textAlign: "center" }}>Invalid article URL</p>;
//   }

//   const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news?id=${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return <p style={{ textAlign: "center" }}>Article not found</p>;
//   }

//   const data = await res.json();
//   const article: NewsItem = data.news;

//   return (
//     <>
//       <Sidebar />

//       <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
//         <img src={article.image_url} alt={article.title} />
//         <h1>{article.title}</h1>
//         <p>{article.content}</p>
//       </div>
//     </>
//   );
// }
// import Sidebar from "@/components/Sidebar/Sidebar";
// import Link from "next/link";
// import './page.css'

// type NewsItem = {
//   id: number;
//   title: string;
//   image_url: string;
//   content: string;
//   category: string;
//   breaking_news: string;
//   created_at: string;
//   youtube_link: string;
// };

// function extractIdFromSlug(slug: string): string | null {
//   const match = slug.match(/-(\d+)$/);
//   return match ? match[1] : null;
// }

// function createSlug(title: string, id: number) {
//   const slug = title
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-")
//     .trim();

//   return `${slug}-${id}`;
// }

// export default async function NewsDetails({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const id = extractIdFromSlug(slug);

//   if (!id) {
//     return <p style={{ textAlign: "center" }}>Invalid article URL</p>;
//   }

//   /* Article */
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/news?id=${id}`,
//     { cache: "no-store" },
//   );

//   if (!res.ok) {
//     return <p style={{ textAlign: "center" }}>Article not found</p>;
//   }

//   const data = await res.json();
//   const article: NewsItem = data.news;

//   /* Latest news for right sidebar */
//   const latestRes = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/news`,
//     { cache: "no-store" },
//   );

//   const latestData = await latestRes.json();
//   const latestNews: NewsItem[] = latestData.news.slice(0, 6);

//   return (
//     <>
//       <Sidebar />

//       <div className="container">
//         {/* CENTER ARTICLE */}
//         <main className="center">
//           <img
//             src={article.image_url}
//             alt={article.title}
//             style={{ width: "100%", borderRadius: "8px" }}
//           />
//           <h1 style={{ marginTop: "10px" }}>{article.title}</h1>
//           <p style={{ marginTop: "15px", lineHeight: "1.7" }}>
//             {article.content}
//           </p>
//         </main>

//         {/* RIGHT SIDEBAR */}
//         <aside className="right">
//           {/* VIDEO AD */}
//           <div className="videoAd">
//             <video
//               src="/ad.mp4"
//               controls
//               autoPlay
//               muted
//               loop
//               style={{ width: "100%", borderRadius: "8px" }}
//             />
//           </div>

//           <h3>Latest News</h3>

//           {latestNews.map((item) => (
//             <Link
//               key={item.id}
//               href={`/news/${createSlug(item.title, item.id)}`}
//               className="rightNewsItem"
//             >
//               <img src={item.image_url} alt={item.title} />
//               <p>{item.title}</p>
//             </Link>
//           ))}
//         </aside>
//       </div>
//     </>
//   );
// }
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";
import "./page.css";

type NewsItem = {
  id: number;
  title: string;
  image_url: string;
  content: string;
  category: string;
  breaking_news: string;
  created_at: string;
  youtube_link: string;
};

function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}

function createSlug(title: string, id: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return `${slug}-${id}`;
}

export default async function NewsDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) {
    return <p style={{ textAlign: "center" }}>Invalid article URL</p>;
  }

  /* Article */
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/news?id=${id}`,
    { cache: "no-store" },
  );

  const data = await res.json();
  const article: NewsItem = data.news;

  /* Latest news */
  const latestRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/news`,
    { cache: "no-store" },
  );

  const latestData = await latestRes.json();
  const latestNews: NewsItem[] = latestData.news.slice(0, 6);

  return (
    <div className="container">
      {/* LEFT SIDEBAR */}
      <div className="leftSidebar">
        <Sidebar />
      </div>

      {/* CENTER ARTICLE */}
      <main className="center">
        <img src={article.image_url} alt={article.title} className="mainImg" />
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="right">
        <div className="videoAd">
          <video src="/ad.mp4" controls autoPlay muted loop />
        </div>

        <h3>Latest News</h3>

        {latestNews.map((item) => (
          <Link
            key={item.id}
            href={`/news/${createSlug(item.title, item.id)}`}
            className="rightNewsItem"
          >
            <img src={item.image_url} />
            <p>{item.title}</p>
          </Link>
        ))}
      </aside>
    </div>
  );
}

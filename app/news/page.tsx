// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import "./news.css";
// import Link from "next/link";
// import useNews from "@/hooks/useNews";

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

// /* ================= NAV ================= */

// const navItems = [
//   "US",
//   "World",
//   "Politics",
//   "Business",
//   "Health",
//   "Entertainment",
//   "Style",
//   "Travel",
//   "Sports",
//   "Science",
//   "More",
// ];

// const moreItems = ["Technology", "Weather", "Opinion", "Video", "Lifestyle"];

// /* ================= COMPONENT ================= */

// export default function NewsLayout() {
//   const { news, loading, error } = useNews();

//   /* ================= SLUG (UPDATED) ================= */
//   const createSlug = (title: string, id: number) => {
//     const slug = title
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, "")   // remove special chars
//       .replace(/\s+/g, "-")       // spaces → dash
//       .replace(/-+/g, "-")        // multiple dash → one
//       .trim();

//     return `${slug}-${id}`;
//   };

//   const [topIndex, setTopIndex] = useState(0);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [isMoreOpen, setIsMoreOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   /* ================= FILTER ================= */

//   const filteredNews = news?.filter((item: NewsItem) =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const leftNews = filteredNews?.slice(0, 4);
//   const centerNews = filteredNews?.slice(4, 10);
//   const rightNews = filteredNews?.slice(10);

//   /* ================= CAROUSEL ================= */

//   useEffect(() => {
//     if (!rightNews || rightNews.length === 0) return;

//     const interval = setInterval(() => {
//       setTopIndex((prev) => (prev + 1) % rightNews.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [rightNews]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading news...</p>;
//   if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

//   /* ================= RENDER ================= */

//   return (
//     <>
//       <Sidebar />

//       <h1 style={{ color: "red", textAlign: "center", margin: "8px 0" }}>
//         Updated News
//       </h1>

//       <nav className="topNav">
//         {navItems.map((item) =>
//           item === "More" ? (
//             <div
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setIsMoreOpen(true)}
//               onMouseLeave={() => setIsMoreOpen(false)}
//             >
//               <span style={{ color: isMoreOpen ? "green" : "black" }}>
//                 {item}
//               </span>
//               {isMoreOpen && (
//                 <div className="dropdown">
//                   {moreItems.map((sub) => (
//                     <div key={sub} className="dropdownItem">
//                       {sub}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <span
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setHoveredNav(item)}
//               onMouseLeave={() => setHoveredNav(null)}
//               style={{ color: hoveredNav === item ? "green" : "black" }}
//             >
//               {item}
//             </span>
//           )
//         )}
//       </nav>

//       <div className="searchBox">
//         <input
//           type="text"
//           placeholder="Search news..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="container">
//         <aside className="left">
//           {leftNews?.map((item) => (
//             <div key={item.id} className="card">
//               <img src={item.image_url} alt={item.title} />
//               <h4>{item.title}</h4>
//             </div>
//           ))}
//         </aside>

//         <main className="center">
//           {centerNews?.map((item) => (
//             <Link
//               key={item.id}
//               href={`/news/${createSlug(item.title, item.id)}`}
//               className="centerCard"
//             >
//               <img src={item.image_url} className="mainImage" />
//               <h2>{item.title}</h2>
//               <p>Click to read full story</p>
//             </Link>
//           ))}
//         </main>

//         <aside className="right">
//           <h3>Top Stories</h3>
//           {rightNews && rightNews.length > 0 && (
//             <div className="card carousel">
//               <img src={rightNews[topIndex]?.image_url} />
//               <h4>{rightNews[topIndex]?.title}</h4>
//             </div>
//           )}
//         </aside>
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import "./news.css";
// import Link from "next/link";
// // import useNews, { NewsItem } from "@/hooks/useNews";
// import useNews from "@/hooks/useNews";
// /* ================= NAV ================= */

// const navItems = [
//   "US",
//   "World",
//   "Politics",
//   "Business",
//   "Health",
//   "Entertainment",
//   "Style",
//   "Travel",
//   "Sports",
//   "Science",
//   "More",
// ];

// const moreItems = ["Technology", "Weather", "Opinion", "Video", "Lifestyle"];

// export default function NewsLayout() {
//   const { news, loading, error } = useNews();   //  no generic needed

//   const createSlug = (title: string, id: number) => {
//     const slug = title
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-")
//       .trim();

//     return `${slug}-${id}`;
//   };

//   const [topIndex, setTopIndex] = useState(0);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [isMoreOpen, setIsMoreOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   /* FILTER */
//   const filteredNews = news.filter((item) =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const leftNews = filteredNews.slice(0, 4);
//   const centerNews = filteredNews.slice(4, 10);
//   const rightNews = filteredNews.slice(10);

//   /* CAROUSEL */
//   useEffect(() => {
//     if (!rightNews.length) return;

//     const interval = setInterval(() => {
//       setTopIndex((prev) => (prev + 1) % rightNews.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [rightNews]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading news...</p>;
//   if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

// console.log(news)
//   return (
//     <>
//       <Sidebar />

//       <h1 style={{ color: "red", textAlign: "center", margin: "8px 0" }}>
//         Updated News
//       </h1>

//       <nav className="topNav">
//         {navItems.map((item) =>
//           item === "More" ? (
//             <div
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setIsMoreOpen(true)}
//               onMouseLeave={() => setIsMoreOpen(false)}
//             >
//               <span style={{ color: isMoreOpen ? "green" : "black" }}>
//                 {item}
//               </span>

//               {isMoreOpen && (
//                 <div className="dropdown">
//                   {moreItems.map((sub) => (
//                     <div key={sub} className="dropdownItem">
//                       {sub}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <span
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setHoveredNav(item)}
//               onMouseLeave={() => setHoveredNav(null)}
//               style={{ color: hoveredNav === item ? "green" : "black" }}
//             >
//               {item}
//             </span>
//           )
//         )}
//       </nav>

//       <div className="searchBox">
//         <input
//           type="text"
//           placeholder="Search news..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="container">
//         <aside className="left">
//           {leftNews.map((item) => (
//             <div key={item.id} className="card">
//               <img src={item.image_url} alt={item.title} />
//               <h4>{item.title}</h4>
//             </div>
//           ))}
//         </aside>

//         <main className="center">
//           {centerNews.map((item) => (
//             <Link
//               key={item.id}
//               href={`/news/${createSlug(item.title, item.id)}`}
//               className="centerCard"
//             >
//               <img src={item.image_url} className="mainImage" />
//               <h2>{item.title}</h2>
//               <p>Click to read full story</p>
//             </Link>
//           ))}
//         </main>

//         <aside className="right">
//           <h3>Top Stories</h3>
//           {rightNews.length > 0 && (
//             <div className="card carousel">
//               <img src={rightNews[topIndex]?.image_url} />
//               <h4>{rightNews[topIndex]?.title}</h4>
//             </div>
//           )}
//         </aside>
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import "./news.css";
// import Link from "next/link";
// import useNews from "@/hooks/useNews";

// /* ================= NAV ================= */

// const navItems = [
//   "US",
//   "World",
//   "Politics",
//   "Business",
//   "Health",
//   "Entertainment",
//   "Style",
//   "Travel",
//   "Sports",
//   "Science",
//   "More",
// ];

// const moreItems = ["Technology", "Weather", "Opinion", "Video", "Lifestyle"];

// export default function NewsLayout() {
//   const { news, loading, error } = useNews();

//   const createSlug = (title: string, id: number) => {
//     const slug = title
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-")
//       .trim();

//     return `${slug}-${id}`;
//   };

//   const [topIndex, setTopIndex] = useState(0);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [isMoreOpen, setIsMoreOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   /* ===== SHOW ONLY APPROVED NEWS ===== */
//   const approvedNews = news.filter((item) => item.status === "approved");

//   /* SEARCH FILTER */
//   const filteredNews = approvedNews.filter((item) =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const leftNews = filteredNews.slice(0, 4);
//   const centerNews = filteredNews.slice(4, 10);
//   const rightNews = filteredNews.slice(10);

//   /* CAROUSEL */
//   useEffect(() => {
//     if (!rightNews.length) return;

//     const interval = setInterval(() => {
//       setTopIndex((prev) => (prev + 1) % rightNews.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [rightNews]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading news...</p>;
//   if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

//   return (
//     <>
//       <Sidebar />

//       <h1 style={{ color: "red", textAlign: "center", margin: "8px 0" }}>
//         Updated News
//       </h1>

//       <nav className="topNav">
//         {navItems.map((item) =>
//           item === "More" ? (
//             <div
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setIsMoreOpen(true)}
//               onMouseLeave={() => setIsMoreOpen(false)}
//             >
//               <span style={{ color: isMoreOpen ? "green" : "black" }}>
//                 {item}
//               </span>

//               {isMoreOpen && (
//                 <div className="dropdown">
//                   {moreItems.map((sub) => (
//                     <div key={sub} className="dropdownItem">
//                       {sub}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <span
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setHoveredNav(item)}
//               onMouseLeave={() => setHoveredNav(null)}
//               style={{ color: hoveredNav === item ? "green" : "black" }}
//             >
//               {item}
//             </span>
//           )
//         )}
//       </nav>

//       <div className="searchBox">
//         <input
//           type="text"
//           placeholder="Search news..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="container">
//         <aside className="left">
//           {leftNews.map((item) => (
//             <div key={item.id} className="card">
//               <img src={item.image_url} alt={item.title} />
//               <h4>{item.title}</h4>
//             </div>
//           ))}
//         </aside>

//         <main className="center">
//           {centerNews.map((item) => (
//             <Link
//               key={item.id}
//               href={`/news/${createSlug(item.title, item.id)}`}
//               className="centerCard"
//             >
//               <img src={item.image_url} className="mainImage" />
//               <h2>{item.title}</h2>
//               <p>Click to read full story</p>
//             </Link>
//           ))}
//         </main>

//         <aside className="right">
//           <h3>Top Stories</h3>
//           {rightNews.length > 0 && (
//             <div className="card carousel">
//               <img src={rightNews[topIndex]?.image_url} />
//               <h4>{rightNews[topIndex]?.title}</h4>
//             </div>
//           )}
//         </aside>
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import "./news.css";
// import Link from "next/link";
// import useNews from "@/hooks/useNews";

// /* ================= NAV ================= */

// const navItems = [
//   "US",
//   "World",
//   "Politics",
//   "Business",
//   "Health",
//   "Entertainment",
//   "Style",
//   "Travel",
//   "Sports",
//   "Science",
//   "More",
// ];

// const moreItems = ["Technology", "Weather", "Opinion", "Video", "Lifestyle"];

// export default function NewsLayout() {
//   const { news, loading, error } = useNews();

//   const createSlug = (title: string, id: number) => {
//     const slug = title
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-")
//       .trim();

//     return `${slug}-${id}`;
//   };

//   const [topIndex, setTopIndex] = useState(0);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [isMoreOpen, setIsMoreOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   /* ===== ONLY APPROVED NEWS ===== */
//   const approvedNews = news.filter((item) => item.status === "approved");

//   /* SEARCH FILTER */
//   const filteredNews = approvedNews.filter((item) =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ===== SMART SLICING ===== */
//   const leftNews = filteredNews.slice(0, 4);

//   const centerNews =
//     filteredNews.length > 4
//       ? filteredNews.slice(4, 10)
//       : filteredNews;

//   const rightNews =
//     filteredNews.length > 10
//       ? filteredNews.slice(10)
//       : [];

//   /* CAROUSEL */
//   useEffect(() => {
//     if (!rightNews.length) return;

//     const interval = setInterval(() => {
//       setTopIndex((prev) => (prev + 1) % rightNews.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [rightNews]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading news...</p>;
//   if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

//   return (
//     <>
//       <Sidebar />

//       <h1 style={{ color: "red", textAlign: "center", margin: "8px 0" }}>
//         Updated News
//       </h1>

//       <nav className="topNav">
//         {navItems.map((item) =>
//           item === "More" ? (
//             <div
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setIsMoreOpen(true)}
//               onMouseLeave={() => setIsMoreOpen(false)}
//             >
//               <span style={{ color: isMoreOpen ? "green" : "black" }}>
//                 {item}
//               </span>

//               {isMoreOpen && (
//                 <div className="dropdown">
//                   {moreItems.map((sub) => (
//                     <div key={sub} className="dropdownItem">
//                       {sub}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <span
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setHoveredNav(item)}
//               onMouseLeave={() => setHoveredNav(null)}
//               style={{ color: hoveredNav === item ? "green" : "black" }}
//             >
//               {item}
//             </span>
//           )
//         )}
//       </nav>

//       <div className="searchBox">
//         <input
//           type="text"
//           placeholder="Search news..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="container">
//         <aside className="left">
//           {leftNews.map((item) => (
//             <div key={item.id} className="card">
//               <img src={item.image_url} alt={item.title} />
//               <h4>{item.title}</h4>
//             </div>
//           ))}
//         </aside>

//         <main className="center">
//           {centerNews.map((item) => (
//             <Link
//               key={item.id}
//               href={`/news/${createSlug(item.title, item.id)}`}
//               className="centerCard"
//             >
//               <img src={item.image_url} className="mainImage" />
//               <h2>{item.title}</h2>
//               <p>Click to read full story</p>
//             </Link>
//           ))}
//         </main>

//         <aside className="right">
//           <h3>Top Stories</h3>
//           {rightNews.length > 0 && (
//             <div className="card carousel">
//               <img src={rightNews[topIndex]?.image_url} />
//               <h4>{rightNews[topIndex]?.title}</h4>
//             </div>
//           )}
//         </aside>
//       </div>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import "./news.css";
// import Link from "next/link";
// import useNews from "@/hooks/useNews";

// /* ================= NAV ================= */

// const navItems = [
//   "US",
//   "World",
//   "Politics",
//   "Business",
//   "Health",
//   "Entertainment",
//   "Style",
//   "Travel",
//   "Sports",
//   "Science",
//   "More",
// ];

// const moreItems = ["Technology", "Weather", "Opinion", "Video", "Lifestyle"];

// export default function NewsLayout() {
//   const { news, loading, error } = useNews();

//   const createSlug = (title: string, id: number) => {
//     const slug = title
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-")
//       .trim();

//     return `${slug}-${id}`;
//   };

//   const [topIndex, setTopIndex] = useState(0);
//   const [hoveredNav, setHoveredNav] = useState<string | null>(null);
//   const [isMoreOpen, setIsMoreOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   /* ===== ONLY APPROVED NEWS ===== */
//   const approvedNews = news.filter((item) => item.status === "approved");

//   /* SEARCH FILTER */
//   const filteredNews = approvedNews.filter((item) =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ===== SMART SLICING ===== */
//   const leftNews = filteredNews.slice(0, 4);

//   const centerNews =
//     filteredNews.length > 4 ? filteredNews.slice(4, 10) : filteredNews;

//   const rightNews =
//     filteredNews.length > 10 ? filteredNews.slice(10) : [];

//   /* CAROUSEL */
//   useEffect(() => {
//     if (!rightNews.length) return;

//     const interval = setInterval(() => {
//       setTopIndex((prev) => (prev + 1) % rightNews.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [rightNews]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading news...</p>;
//   if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

//   return (
//     <>
//       <Sidebar />

//       <h1 style={{ color: "red", textAlign: "center", margin: "8px 0" }}>
//         Updated News
//       </h1>

//       <nav className="topNav">
//         {navItems.map((item) =>
//           item === "More" ? (
//             <div
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setIsMoreOpen(true)}
//               onMouseLeave={() => setIsMoreOpen(false)}
//             >
//               <span style={{ color: isMoreOpen ? "green" : "black" }}>
//                 {item}
//               </span>

//               {isMoreOpen && (
//                 <div className="dropdown">
//                   {moreItems.map((sub) => (
//                     <div key={sub} className="dropdownItem">
//                       {sub}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <span
//               key={item}
//               className="navItem"
//               onMouseEnter={() => setHoveredNav(item)}
//               onMouseLeave={() => setHoveredNav(null)}
//               style={{ color: hoveredNav === item ? "green" : "black" }}
//             >
//               {item}
//             </span>
//           )
//         )}
//       </nav>

//       <div className="searchBox">
//         <input
//           type="text"
//           placeholder="Search news..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="container">
//         <aside className="left">
//           {leftNews.map((item) => (
//             <div key={item.id} className="card">
//               <img src={item.image_url} alt={item.title} />
//               <h4>{item.title}</h4>
//             </div>
//           ))}
//         </aside>

//         <main className="center">
//           {centerNews.map((item) => (
//             <Link
//               key={item.id}
//               href={`/news/${createSlug(item.title, item.id)}`}
//               className="centerCard"
//             >
//               <img src={item.image_url} className="mainImage" />
//               <h2>{item.title}</h2>
//               <p>Click to read full story</p>
//             </Link>
//           ))}
//         </main>

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

//           <h3>Top Stories</h3>

//           {rightNews.length > 0 && (
//             <div className="card carousel">
//               <img src={rightNews[topIndex]?.image_url} />
//               <h4>{rightNews[topIndex]?.title}</h4>
//             </div>
//           )}

//         </aside>
//       </div>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./news.css";
import Link from "next/link";
import useNews from "@/hooks/useNews";

/* ================= NAV ================= */

const navItems = [
  "US",
  "World",
  "Politics",
  "Business",
  "Health",
  "Entertainment",
  "Style",
  "Travel",
  "Sports",
  "Science",
  "More",
];

const moreItems = ["Technology", "Weather", "Opinion", "Video", "Lifestyle"];

export default function NewsLayout() {
  const { news, loading, error } = useNews();

  const createSlug = (title: string, id: number) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    return `${slug}-${id}`;
  };

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [search, setSearch] = useState("");

  /* ===== ONLY APPROVED NEWS ===== */
  const approvedNews = news.filter((item) => item.status === "approved");

  /* SEARCH FILTER */
  const filteredNews = approvedNews.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  /* ===== SLICING ===== */
  const leftNews = filteredNews.slice(0, 4);
  const centerNews =
    filteredNews.length > 4 ? filteredNews.slice(4, 10) : filteredNews;

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-300 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <>
      <Sidebar />

      <h1 style={{ color: "red", textAlign: "center", margin: "8px 0" }}>
        Updated News
      </h1>

      <nav className="topNav">
        {navItems.map((item) =>
          item === "More" ? (
            <div
              key={item}
              className="navItem"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <span style={{ color: isMoreOpen ? "green" : "black" }}>
                {item}
              </span>

              {isMoreOpen && (
                <div className="dropdown">
                  {moreItems.map((sub) => (
                    <div key={sub} className="dropdownItem">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <span
              key={item}
              className="navItem"
              onMouseEnter={() => setHoveredNav(item)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{ color: hoveredNav === item ? "green" : "black" }}
            >
              {item}
            </span>
          ),
        )}
      </nav>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container">
        {/* LEFT */}
        <aside className="left">
          {leftNews.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image_url} alt={item.title} />
              <h4>{item.title}</h4>
            </div>
          ))}
        </aside>

        {/* CENTER */}
        <main className="center">
          {centerNews.map((item) => (
            <Link
              key={item.id}
              href={`/news/${createSlug(item.title, item.id)}`}
              className="centerCard"
            >
              <img src={item.image_url} className="mainImage" />
              <h2>{item.title}</h2>
              <p>Click to read full story</p>
            </Link>
          ))}
        </main>

        {/* RIGHT */}
        <aside className="right">
          {/* VIDEO AD */}
          <div className="videoAd">
            <video
              src="/ad.mp4"
              controls
              autoPlay
              muted
              loop
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>

          <h3>Latest News</h3>

          {approvedNews.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={`/news/${createSlug(item.title, item.id)}`}
              className="rightNewsItem"
            >
              <img src={item.image_url} alt={item.title} />
              <p>{item.title}</p>
            </Link>
          ))}
        </aside>
      </div>
    </>
  );
}

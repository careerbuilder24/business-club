// "use client";

// import { useParams } from "next/navigation";
// import useBlogs from "@/hooks/useBlog";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import Link from "next/link";

// /* ------------------ Utils ------------------ */
// const slugify = (value?: string) => {
//   if (!value) return "";
//   return value
//     .toLowerCase()
//     .trim()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// };

// /* ------------------ Types ------------------ */
// type StaffPick = {
//   id: number;
//   slug: string;
//   publication?: string;
//   title: string;
//   author: string;
//   date: string;
// };

// /* ------------------ Data ------------------ */
// const staffPicks: StaffPick[] = [
//   {
//     id: 1,
//     slug: "bringing-my-dad-back",
//     publication: "Human Parts",
//     title: "Bringing My Dad Back to Life on His Birthday",
//     author: "Kelley Jhung",
//     date: "Nov 24",
//   },
// ];

// const topics = [
//   "Data Science",
//   "Self Improvement",
//   "Writing",
//   "Relationships",
//   "Politics",
//   "Cryptocurrency",
//   "Productivity",
// ];

// /* ------------------ Page ------------------ */
// export default function BlogDetailPage() {
//   const { slug } = useParams();
//   const { blogs, loading, error } = useBlogs();

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   /* -------- Find current blog -------- */
//   // const section = blogs
//   //   .flatMap((b) => b.sections ?? [])
//   //   .find((s) => slugify(s.title) === slug);

//   const activeBlogs = blogs?.filter(
//   (blog) => blog.status === "active"
// );

//   const section = activeBlogs
//   ?.flatMap((b) => b.sections ?? [])
//   ?.find((s) => slugify(s.title) === slug);

//   if (!section) {
//     return <p className="p-6">Blog not found</p>;
//   }

//   /* -------- Recent Blogs (same logic as BlogSection) -------- */
//   // const recentBlogs = blogs
//   //   ?.flatMap((blog) => blog.sections ?? [])
//   //   ?.sort((a, b) => b.id - a.id)
//   //   ?.slice(0, 4);

//   const recentBlogs = activeBlogs
//   ?.flatMap((blog) => blog.sections ?? [])
//   ?.sort((a, b) => b.id - a.id)
//   ?.slice(0, 4);

//   return (
//     <>
//       {/* LEFT NAV SIDEBAR */}
//       <Sidebar />

//       {/* PAGE WRAPPER */}
//       <div className="min-h-screen bg-white">
//         <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10">

//           {/* MAIN BLOG CONTENT */}
//           <main className="w-full max-w-[800px]">
//             <h1 className="mb-6 text-4xl font-bold">{section.title}</h1>

//             <div
//               className="prose max-w-none"
//               dangerouslySetInnerHTML={{ __html: section.content }}
//             />

//             {section.image_url && (
//               <img
//                 src={section.image_url}
//                 alt={section.title}
//                 className="mt-6 w-full rounded-lg"
//               />
//             )}
//           </main>

//           {/* RIGHT SIDEBAR */}
//           <aside className="sticky top-36 hidden h-fit w-72 shrink-0 space-y-7 lg:block">

//             {/* Staff Picks */}
//             <div>
//               <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
//                 Staff Picks
//               </h3>

//               {staffPicks.map((pick) => (
//                 <Link
//                   key={pick.id}
//                   href={`/blog/${pick.slug}`}
//                   className="block rounded-md p-2 transition hover:bg-gray-50"
//                 >
//                   <p className="font-semibold leading-snug">{pick.title}</p>
//                   <p className="text-xs text-gray-500">
//                     {pick.author} • {pick.date}
//                   </p>
//                 </Link>
//               ))}
//             </div>

//             {/* Recommended Topics */}
//             <div>
//               <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
//                 Recommended topics
//               </h3>

//               <div className="flex flex-wrap gap-2">
//                 {topics.map((topic) => (
//                   <Link
//                     key={topic}
//                     href={`/topics/${slugify(topic)}`}
//                     className="rounded-full border px-3 py-1 text-xs transition hover:bg-gray-50"
//                   >
//                     {topic}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Blogs */}
//             <div>
//               <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500">
//                 Recent Blogs
//               </h3>

//               <div className="space-y-4">
//                 {recentBlogs?.map((section) => (
//                   <Link
//                     key={section.id}
//                     href={`/blog/${slugify(section.title)}`}
//                     className="flex gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
//                   >
//                     <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
//                       {section.image_url && (
//                         <img
//                           src={section.image_url}
//                           alt={section.title}
//                           className="h-full w-full object-cover"
//                         />
//                       )}
//                     </div>

//                     <div className="flex flex-col justify-between">
//                       <h4 className="line-clamp-2 text-sm font-semibold text-gray-900">
//                         {section.title}
//                       </h4>

//                       <p className="line-clamp-2 text-xs text-gray-500">
//                         {section.content.replace(/<[^>]+>/g, "")}
//                       </p>

//                       <span className="text-xs font-medium text-blue-600">
//                         Read more →
//                       </span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//           </aside>
//         </div>
//       </div>
//     </>
//   );
// }
import Sidebar from "@/components/Sidebar/Sidebar";
import { Metadata } from "next";

type BlogSectionType = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
};

type BlogType = {
  id: number;
  status: string;
  sections: BlogSectionType[];
};

type Params = {
  slug: string;
};

// 🔥 Slug helper (same as before)
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// 🔥 Fetch all blogs
// async function getBlogs(): Promise<BlogType[]> {
//   const res = await fetch("http://localhost:3000/api/sgolb", {
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("Failed to fetch blogs");

//   return res.json();
// }

async function getBlogs(): Promise<BlogType[]> {
  const res = await fetch("http://localhost:3000/api/sgolb", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  const data = await res.json();

  // 🔥 HANDLE DIFFERENT API SHAPES
  if (Array.isArray(data)) return data;

  if (Array.isArray(data.blogs)) return data.blogs;

  if (Array.isArray(data.data)) return data.data;

  console.error("Unexpected API response:", data);
  return [];
}

// 🔥 Find blog section by slug
async function getBlogBySlug(slug: string) {
  const blogs = await getBlogs();

  const activeBlogs = blogs.filter((b) => b.status === "active");

  const allSections = activeBlogs.flatMap((b) => b.sections);

  return allSections.find((section) => slugify(section.title) === slug);
}

// ✅ SEO METADATA (SSR)
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const description = blog.content.replace(/<[^>]+>/g, "").slice(0, 150);

  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: blog.image_url ? [blog.image_url] : [],
    },
  };
}

// ✅ PAGE COMPONENT (SSR)
export default async function BlogDetailPage({ params }: { params: Params }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return <div className="p-10 text-center text-red-500">Blog not found</div>;
  }

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article>
          <h1 className="mb-6 text-4xl font-bold">{blog.title}</h1>

          {blog.image_url && (
            <img
              src={blog.image_url}
              alt={blog.title}
              className="mb-6 w-full rounded-lg"
            />
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </article>
      </main>
    </>
  );
}

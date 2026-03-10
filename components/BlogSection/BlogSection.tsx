// "use client";

// import React from "react";
// import Link from "next/link";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import useBlogs from "@/hooks/useBlog";

// type StaffPick = {
//   id: number;
//   slug: string;
//   publication?: string;
//   title: string;
//   author: string;
//   date: string;
// };

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

// const slugify = (s: string) =>
//   s
//     .toLowerCase()
//     .trim()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// export default function BlogSection() {
//   const { blogs, loading, error } = useBlogs();


//   const activeBlogs = blogs?.filter(
//   (blog) => blog.status === "active"
// );

// const recentBlogs = activeBlogs
//   ?.flatMap((blog) => blog.sections)
//   ?.sort((a, b) => b.id - a.id) // latest first
//   ?.slice(0, 4); // show only 4




//   console.log(blogs);
//   console.log(activeBlogs);
//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       <Sidebar />

//       <main className="lg:ml-[280px]">
//         <section className="w-full px-4 py-8 lg:px-8">
//           <div className="mx-auto w-full max-w-[1180px]">
//             {/* TABS */}
//             <div className="mb-5 flex gap-6 border-b border-gray-200 text-sm font-medium">
//               <button className="border-b-2 border-black pb-3 text-black">
//                 For you
//               </button>
//               <button className="pb-3 text-gray-500 hover:text-black">
//                 Featured
//               </button>
//             </div>

//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
//               {/* LEFT – BLOGS */}
//               <div className="space-y-8">
//                 {loading && <p className="text-gray-500">Loading blogs...</p>}
//                 {error && <p className="text-red-500">{error}</p>}

//                {activeBlogs?.map((blog) => (

//                   <div key={blog.id} className="space-y-6">
//                     {blog.sections.map((section) => (
//                       <Link
//                         key={section.id}
//                         // href={`/blog/${section.title}`}
//                         href={`/blog/${slugify(section.title)}`}
//                       >
//                         <article className="rounded-lg border border-gray-200 bg-white p-5 hover:shadow-sm transition cursor-pointer">
//                           <h2 className="text-2xl font-semibold mb-2">
//                             {section.title}
//                           </h2>

//                           <div
//                             className="prose max-w-none text-gray-700"
//                             dangerouslySetInnerHTML={{
//                               __html: section.content,
//                             }}
//                           />

//                           {section.image_url && (
//                             <img
//                               src={section.image_url}
//                               alt={section.title}
//                               className="mt-4 rounded-lg w-full object-cover"
//                             />
//                           )}
//                         </article>
//                       </Link>
//                     ))}
//                   </div>
//                 ))}
//               </div>

//               {/* RIGHT – SIDEBAR */}
//               <aside className="relative hidden lg:block">
//                 <div className="sticky lg:top-36 space-y-7">
//                   <div>
//                     <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
//                       Staff Picks
//                     </h3>

//                     {staffPicks.map((pick) => (
//                       <Link
//                         key={pick.id}
//                         href={`/blog/${pick.slug}`}
//                         className="block rounded-md p-2 hover:bg-gray-50"
//                       >
//                         <p className="font-semibold">{pick.title}</p>
//                         <p className="text-xs text-gray-500">
//                           {pick.author} • {pick.date}
//                         </p>
//                       </Link>
//                     ))}
//                   </div>

//                   <div>
//                     <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
//                       Recommended topics
//                     </h3>

//                     <div className="flex flex-wrap gap-2">
//                       {topics.map((topic) => (
//                         <Link
//                           key={topic}
//                           href={`/topics/${slugify(topic)}`}
//                           className="rounded-full border px-3 py-1 text-xs"
//                         >
//                           {topic}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500">
//                       Recent Blogs
//                     </h3>

//                     <div className="space-y-4">
//                       {recentBlogs?.map((section) => (
//                         <Link
//                           key={section.id}
//                           href={`/blog/${slugify(section.title)}`}
//                           className="flex gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition"
//                         >
//                           <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
//                             <img
//                               src={section.image_url}
//                               alt={section.title}
//                               className="h-full w-full object-cover"
//                             />
//                           </div>

//                           <div className="flex flex-col justify-between">
//                             <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
//                               {section.title}
//                             </h4>

//                             <p className="text-xs text-gray-500 line-clamp-2">
//                               {section.content.replace(/<[^>]+>/g, "")}
//                             </p>

//                             <span className="text-xs font-medium text-blue-600">
//                               Read more →
//                             </span>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar/Sidebar";
import useBlogs from "@/hooks/useBlog";

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

type StaffPick = {
  id: number;
  slug: string;
  publication?: string;
  title: string;
  author: string;
  date: string;
};

const staffPicks: StaffPick[] = [
  {
    id: 1,
    slug: "bringing-my-dad-back",
    publication: "Human Parts",
    title: "Bringing My Dad Back to Life on His Birthday",
    author: "Kelley Jhung",
    date: "Nov 24",
  },
];

const topics = [
  "Data Science",
  "Self Improvement",
  "Writing",
  "Relationships",
  "Politics",
  "Cryptocurrency",
  "Productivity",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function BlogSection() {
  const { blogs, loading, error } = useBlogs() as {
    blogs: BlogType[];
    loading: boolean;
    error: string | null;
  };

  const activeBlogs = blogs?.filter((blog) => blog.status === "active");

  const recentBlogs = activeBlogs
    ?.flatMap((blog) => blog.sections)
    ?.sort((a, b) => b.id - a.id)
    ?.slice(0, 4);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Sidebar />

      <main className="lg:ml-[280px]">
        <section className="w-full px-4 py-8 lg:px-8">
          <div className="mx-auto w-full max-w-[1180px]">
            {/* TABS */}
            <div className="mb-5 flex gap-6 border-b border-gray-200 text-sm font-medium">
              <button className="border-b-2 border-black pb-3 text-black">
                For you
              </button>
              <button className="pb-3 text-gray-500 hover:text-black">
                Featured
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
              {/* LEFT – BLOGS */}
              <div className="space-y-8">
                {loading && <p className="text-gray-500">Loading blogs...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {activeBlogs?.map((blog) => (
                  <div key={blog.id} className="space-y-6">
                    {blog.sections.map((section) => (
                      <Link
                        key={section.id}
                        href={`/blog/${slugify(section.title)}`}
                      >
                        <article className="rounded-lg border border-gray-200 bg-white p-5 hover:shadow-sm transition cursor-pointer">
                          <h2 className="text-2xl font-semibold mb-2">
                            {section.title}
                          </h2>

                          <div
                            className="prose max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                          />

                          {section.image_url && (
                            <img
                              src={section.image_url}
                              alt={section.title}
                              className="mt-4 rounded-lg w-full object-cover"
                            />
                          )}
                        </article>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* RIGHT – SIDEBAR */}
              <aside className="relative hidden lg:block">
                <div className="sticky lg:top-36 space-y-7">
                  <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
                      Staff Picks
                    </h3>

                    {staffPicks.map((pick) => (
                      <Link
                        key={pick.id}
                        href={`/blog/${pick.slug}`}
                        className="block rounded-md p-2 hover:bg-gray-50"
                      >
                        <p className="font-semibold">{pick.title}</p>
                        <p className="text-xs text-gray-500">
                          {pick.author} • {pick.date}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
                      Recommended topics
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {topics.map((topic) => (
                        <Link
                          key={topic}
                          href={`/topics/${slugify(topic)}`}
                          className="rounded-full border px-3 py-1 text-xs"
                        >
                          {topic}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500">
                      Recent Blogs
                    </h3>

                    <div className="space-y-4">
                      {recentBlogs?.map((section) => (
                        <Link
                          key={section.id}
                          href={`/blog/${slugify(section.title)}`}
                          className="flex gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition"
                        >
                          <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={section.image_url}
                              alt={section.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col justify-between">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                              {section.title}
                            </h4>

                            <p className="text-xs text-gray-500 line-clamp-2">
                              {section.content.replace(/<[^>]+>/g, "")}
                            </p>

                            <span className="text-xs font-medium text-blue-600">
                              Read more →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

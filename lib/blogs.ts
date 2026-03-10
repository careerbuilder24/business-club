

export type Blog = {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  views?: number;
  comments?: number;
  thumbnail?: string;
  tag?: string;
  sections: {
    id: number;
    title: string;
    content: string;
    image_url?: string;
  }[];
};

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch("http://localhost:3000/api/sgolb", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_API_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("API STATUS:", res.status);
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();

  return data.blogs as Blog[];
}

export async function getBlogBySlug(
  slug: string
): Promise<Blog | null> {
  const blogs = await getBlogs();

  const blog = blogs.find((blog) => blog.slug === slug);

  return blog ?? null;
}

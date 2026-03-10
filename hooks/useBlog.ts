
"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/data/blogs";
import { getBlogs } from "@/lib/blogs";

export default function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  return { blogs, loading, error };
}

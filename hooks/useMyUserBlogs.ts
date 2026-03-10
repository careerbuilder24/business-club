import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

// -------------------------
// Blog Section Type
// -------------------------
export interface BlogSection {
  id: number;
  title: string;
  content: string;
  image_url?: string | null;
}

// -------------------------
// Blog Type
// -------------------------
export interface Blog {
  id: number;
  category: string;
  status: "active" | "pending" | string;
  author_email?: string;
  sections: BlogSection[];
}

// -------------------------
// API Response Type
// -------------------------
interface BlogsApiResponse {
  success: boolean;
  blogs?: Blog[];
  error?: string;
}

// -------------------------
// Hook
// -------------------------
export default function useMyUserBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<BlogsApiResponse>("/api/sgolb");

      if (res.data.success && res.data.blogs) {
        setBlogs(res.data.blogs);
      } else {
        setError("Failed to fetch blogs");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
  };
}

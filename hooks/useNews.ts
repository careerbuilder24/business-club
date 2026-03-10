// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";

// /* -------------------------
//    News Record Type
// ------------------------- */
// export interface NewsRecord {
//   id: number;
//   title: string;
//   category: "national" | "international";
//   content: string;
//   image_url: string;
//   youtube_link?: string;
//   breaking_news?: string;
//   status?: string;
//   created_at?: string;
// }

// /* -------------------------
//    API Response Type
// ------------------------- */
// interface NewsApiResponse {
//   success: boolean;
//   news?: NewsRecord[];
//   id?: number;
//   error?: string;
// }

// /* -------------------------
//    Hook
// ------------------------- */
// export default function useNews() {
//   const [news, setNews] = useState<NewsRecord[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   /* ========= FETCH NEWS ========= */
//   const fetchNews = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get<NewsApiResponse>(
//         "/api/news"
//       );

//       if (res.data.success && res.data.news) {
//         setNews(res.data.news);
//       } else {
//         setError(res.data.error || "Failed to fetch news");
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       setError(axiosError.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ========= ADD NEWS ========= */
//   const addNews = async (
//     record: Omit<NewsRecord, "id" | "created_at" | "status">
//   ) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.post<NewsApiResponse>(
//         "/api/news",
//         record
//       );

//       if (res.data.success) {
//         await fetchNews(); // refresh list
//         return true;
//       } else {
//         setError(res.data.error || "Failed to add news");
//         return false;
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       setError(axiosError.message);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ========= AUTO FETCH ========= */
//   useEffect(() => {
//     fetchNews();
//   }, []);

//   return {
//     news,
//     loading,
//     error,
//     refetch: fetchNews,
//     addNews,
//   };
// }
// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";

// /* =====================
//    News Record Type
// ===================== */
// export interface NewsRecord {
//   id: number;
//   title: string;
//   category: "national" | "international";
//   blog_writer_email: string; // ✅ REQUIRED
//   content: string;
//   image_url: string;
//   youtube_link?: string | null;
//   breaking_news?: string | null;
//   status: "pending" | "approved" | "rejected";
//   created_at: string; // ✅ MUST be string
// }

// /* =====================
//    API Response Type
// ===================== */
// interface NewsApiResponse {
//   success: boolean;
//   news?: NewsRecord[];
//   error?: string;
// }

// /* =====================
//    Hook
// ===================== */
// export default function useNews() {
//   const [news, setNews] = useState<NewsRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchNews = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get<NewsApiResponse>("/api/news");

//       if (res.data.success && res.data.news) {
//         setNews(res.data.news);
//       } else {
//         setError(res.data.error || "Failed to fetch news");
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       setError(axiosError.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   return { news, loading, error, refetch: fetchNews };
// }
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

/* =====================
   News Record Type
===================== */
export interface NewsRecord {
  id: number;
  title: string;
  category: "national" | "international";
  blog_writer_email: string;
  content: string;
  image_url: string;
  youtube_link?: string | null;
  breaking_news?: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

/* =====================
   API Response Type
===================== */
interface NewsApiResponse {
  success: boolean;
  news?: NewsRecord[];
  error?: string;
}

/* =====================
   Hook Return Type
===================== */
interface UseNewsReturn {
  news: NewsRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/* =====================
   Hook
===================== */
export default function useNews(): UseNewsReturn {
  const [news, setNews] = useState<NewsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<NewsApiResponse>("/api/news");

      if (res.data.success && res.data.news) {
        setNews(res.data.news);
      } else {
        setError(res.data.error || "Failed to fetch news");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading, error, refetch: fetchNews };
}

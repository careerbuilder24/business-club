import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

/* -------------------------
   Category Type
------------------------- */
export interface SideCategory {
  id?: number;
  business_type: string;
  industry: string;
  district: string;
  created_at?: string;
}

/* -------------------------
   API Response Type
------------------------- */
interface CategoryApiResponse {
  success: boolean;
  categories?: SideCategory[];
  category?: SideCategory;
  error?: string;
}

/* -------------------------
   Hook
------------------------- */
export default function useSideCategory() {
  const [categories, setCategories] = useState<SideCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* -------- FETCH -------- */
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<CategoryApiResponse>(
        "http://localhost:3000/api/sidebar-category"
      );

      if (res.data.success && res.data.categories) {
        setCategories(res.data.categories);
      } else {
        setError(res.data.error || "Failed to fetch categories");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  /* -------- ADD CATEGORY -------- */
  const addCategory = async (category: Omit<SideCategory, "id" | "created_at">) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<CategoryApiResponse>(
        "http://localhost:3000/api/sidebar-category",
        category
      );

      if (res.data.success) {
        await fetchCategories();
        return true;
      } else {
        setError(res.data.error || "Failed to add category");
        return false;
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    addCategory,
  };
}

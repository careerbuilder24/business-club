import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

// -------------------------
// Define Listing Type
// -------------------------
export interface Listing {
  id: number;
  listing_name: string;
  company_name: string;
  category: string;
  address: string;
  email: string;
  phone: string;
  website?: string | null;
  facebook?: string | null;
  description?: string | null;
  labels: string[];
  logo_url?: string | null;
  cover_url?: string | null;
  gallery_urls: string[];
   status?: string | null; // ✅ ADD THIS
 
  created_at?: string;
}

// -------------------------
// API Response Type
// -------------------------
interface ListingsApiResponse {
  success: boolean;
  data?: Listing[];
  error?: string;
}

// -------------------------
// Hook
// -------------------------
export default function useListing() {
  const [listingss, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<ListingsApiResponse>("/api/listings");

      if (res.data.success && res.data.data) {
        setListings(res.data.data);
      } else {
        setError("Failed to fetch listings");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return { listingss, loading, error, refetch: fetchListings };
}

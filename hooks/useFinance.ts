import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

// -------------------------
// Define Finance Record Type
// -------------------------
export interface FinanceRecord {
  id: number;
  company: string;
  service_type: string;
  amount: number;
  payment_date: string;
  payment_status: string;
  transaction_id: string;
  created_at?: string;
}

// -------------------------
// API Response Type
// -------------------------
interface FinanceApiResponse {
  success: boolean;
  data?: FinanceRecord[];
  id?: number; // for POST response
  error?: string;
}

// -------------------------
// Hook
// -------------------------
export default function useFinanceRecords() {
  const [records, setRecords] = useState<FinanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all finance records
  const fetchRecords = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<FinanceApiResponse>("/api/finance");

      if (res.data.success && res.data.data) {
        setRecords(res.data.data);
      } else {
        setError(res.data.error || "Failed to fetch finance records");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new finance record
  const addRecord = async (record: Omit<FinanceRecord, "id" | "created_at">) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<FinanceApiResponse>("/api/finance", record);

      if (res.data.success && res.data.id) {
        // Refetch or append the new record
        await fetchRecords();
        return res.data.id;
      } else {
        setError(res.data.error || "Failed to add finance record");
        return null;
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return { records, loading, error, refetch: fetchRecords, addRecord };
}

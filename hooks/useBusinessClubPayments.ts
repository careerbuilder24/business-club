import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

// ----------------------------------
// Define Business Club Payment Type
// ----------------------------------
export interface BusinessClubPayment {
  id: number;
  member_name: string;
  club_name: string;
  amount: number;
  payment_date: string;
  payment_status: string;
  transaction_id: string;
  email: string;
  package_name: string;
  created_at?: string;
}

// ----------------------------------
// API Response Type
// ----------------------------------
interface BusinessClubPaymentsApiResponse {
  success: boolean;
  data?: BusinessClubPayment[];
  id?: number; // for POST response
  error?: string;
}

// ----------------------------------
// Hook
// ----------------------------------
export default function useBusinessClubPayments() {
  const [payments, setPayments] = useState<BusinessClubPayment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all payments
  const fetchPayments = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<BusinessClubPaymentsApiResponse>(
        "/api/business-club-payments"
      );

      if (res.data.success && res.data.data) {
        setPayments(res.data.data);
      } else {
        setError(res.data.error || "Failed to fetch business club payments");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new payment
  const addPayment = async (
    payment: Omit<BusinessClubPayment, "id" | "created_at">
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<BusinessClubPaymentsApiResponse>(
        "/api/business-club-payments",
        payment
      );

      if (res.data.success && res.data.id) {
        await fetchPayments(); // refresh list
        return res.data.id;
      } else {
        setError(res.data.error || "Failed to add business club payment");
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
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    error,
    refetch: fetchPayments,
    addPayment,
  };
}

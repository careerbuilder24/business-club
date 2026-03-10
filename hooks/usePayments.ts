import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";



export type PaymentStatus = "pending" | "active" | "cancelled";

export interface BusinessClubPayment {
  id: number;
  member_name: string;
  mobile: string;
  email?: string | null;
  package_id: string;
  package_name: string;
  package_price_text: string;
  amount_numeric?: number | null;
  member_type: string;
  id_card: string;
  payment_method: "bkash" | "nagad";
  sender_wallet_number: string;
  trx_id: string;
  note?: string | null;
  status: PaymentStatus;
  created_at?: string;
  updated_at?: string;
}

// for POST body – matches your API comment
export interface CreateBusinessClubPaymentPayload {
  memberName: string;
  mobile: string;
  email?: string;
  packageId: string;
  packageName: string;
  packagePriceText: string;
  memberType: string;
  idCard: string;
  paymentMethod: "bkash" | "nagad";
  senderWalletNumber: string;
  trxId: string;
  note?: string;
  status?: PaymentStatus;
}

// -------------------------
// API Response Type
// -------------------------
interface BusinessClubPaymentsApiResponse {
  success: boolean;
  data?: BusinessClubPayment[];
  error?: string;
}

// -------------------------
// Hook
// -------------------------
export default function useBusinessClubPayments() {
  const [payments, setPayments] = useState<BusinessClubPayment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<boolean>(false);

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

  const createPayment = async (payload: CreateBusinessClubPaymentPayload) => {
    setCreating(true);
    setError(null);

    try {
      const res = await axios.post("/api/business-club-payments", payload);

      if (res.data?.success) {
        // after successful create, refresh list
        await fetchPayments();
      } else {
        setError(res.data?.error || "Failed to create payment");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setCreating(false);
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
    createPayment,
    creating,
  };
}

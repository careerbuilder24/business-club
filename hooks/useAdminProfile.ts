
"use client";

import { useEffect, useState } from "react";

export interface AdminProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  businessCategory?: string;
  createdAt?: string | null;
  lastLogin?: string | null;
  profile_image?: string | null;
}

export default function useAdminProfile(email?: string) {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // If user not loaded yet, don't call API
    if (!email) {
      setLoading(false);
      setProfile(null);
      setError(null);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/adminProfile?email=${encodeURIComponent(email)}`,
          { signal: controller.signal, cache: "no-store" }
        );

        const data = await res.json().catch(() => null);

        if (!res.ok || !data?.success) {
          throw new Error(data?.error || `Failed to load profile (${res.status})`);
        }

        setProfile(data.data ?? null);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [email]);

  return { profile, loading, error };
}

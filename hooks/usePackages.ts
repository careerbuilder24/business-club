// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";

// /* ================= TYPES ================= */

// export interface PackageData {
//   packages: string[];
//   services: string[];
//   data: Record<string, Record<string, string>>;
// }

// interface PackagesApiResponse {
//   success: boolean;
//   data?: PackageData | null;
//   error?: string;
// }

// /* ================= HOOK ================= */

// export default function usePackages() {
//   const [packagesData, setPackagesData] =
//     useState<PackageData | null>(null);

//   const [loading, setLoading] = useState<boolean>(true);
//   const [saving, setSaving] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   /* ================= FETCH ================= */

//   const fetchPackages = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res =
//         await axios.get<PackagesApiResponse>("/api/packages");

//       if (res.data.success) {
//         setPackagesData(res.data.data || null);
//       } else {
//         setError(res.data.error || "Failed to fetch packages");
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       setError(axiosError.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= SAVE ================= */

//   const savePackages = async (payload: PackageData) => {
//     setSaving(true);
//     setError(null);

//     try {
//       const res =
//         await axios.post<PackagesApiResponse>(
//           "/api/packages",
//           payload
//         );

//       if (!res.data.success) {
//         throw new Error(res.data.error || "Save failed");
//       }

//       // 🔥 refetch after save
//       await fetchPackages();

//       return true;
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       setError(axiosError.message);
//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ================= INIT ================= */

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   return {
//     packagesData,
//     loading,
//     saving,
//     error,
//     refetch: fetchPackages,
//     savePackages,
//   };
// }


import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

/* ================= TYPES ================= */

export interface PackageData {
  packages: string[];
  services: string[];
  subSections: string[]; // ✅ ADD THIS
  data: Record<string, Record<string, string>>;
}

interface PackagesApiResponse {
  success: boolean;
  data?: PackageData | null;
  error?: string;
}

/* ================= HOOK ================= */

export default function usePackages() {
  const [packagesData, setPackagesData] =
    useState<PackageData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH ================= */

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);

    try {
      const res =
        await axios.get<PackagesApiResponse>("/api/packages");

      if (res.data.success) {
        setPackagesData(res.data.data || null);
      } else {
        setError(res.data.error || "Failed to fetch packages");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */

  const savePackages = async (payload: PackageData) => {
    setSaving(true);
    setError(null);

    try {
      const res =
        await axios.post<PackagesApiResponse>(
          "/api/packages",
          payload
        );

      if (!res.data.success) {
        throw new Error(res.data.error || "Save failed");
      }

      // 🔥 refetch after save
      await fetchPackages();

      return true;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  /* ================= INIT ================= */

  useEffect(() => {
    fetchPackages();
  }, []);

  return {
    packagesData,
    loading,
    saving,
    error,
    refetch: fetchPackages,
    savePackages,
  };
}
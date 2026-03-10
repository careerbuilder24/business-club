
"use client";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; // fixed import

// Define a proper type for the decoded JWT user
type AuthUser = {
  id: string;
  email: string;
  role: "admin" | "user"; // <-- role must exist
};

export default function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Read cookie on client
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!cookieToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      const decoded = jwtDecode<AuthUser>(cookieToken);
      setUser(decoded);
    } catch (error) {
      setUser(null);
    }

    setLoading(false);
  }, []);

  return { user, loading, setUser };
}

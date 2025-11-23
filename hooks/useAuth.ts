
// "use client";

// import { useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";

// export interface DecodedUser {
//   id: number;
//   email: string;
//   role: "user" | "admin";
// }

// export default function useAuth() {
//   const [user, setUser] = useState<DecodedUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   const getToken = () =>
//     document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//   const checkUser = () => {
//     const token = getToken();
//     if (token) {
//       try {
//         const decoded = jwtDecode<DecodedUser>(token);
//         setUser(decoded);
//       } catch (err) {
//         setUser(null);
//       }
//     } else {
//       setUser(null);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     checkUser();
//     // optional: reactive check every second
//     const interval = setInterval(checkUser, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return { user, setUser, loading };
// }
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

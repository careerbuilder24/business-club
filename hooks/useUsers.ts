
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export type User = {
  id: number;
  full_name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
};

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/user");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("User fetch failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { users, loading };
}

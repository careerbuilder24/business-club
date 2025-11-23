// // hooks/useUsers.ts
// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// interface User {
//   id: number;
//   full_name: string;
//   email: string;
//   role: string;
//   created_at: string;
// }

// export default function useUsers() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('/api/user');
//       const data = res.data;

//       if (data.users) {
//         setUsers(data.users);
//       } else {
//         setError('Failed to fetch users.');
//       }
//     } catch (err) {
//       console.error('Error fetching users:', err);
//       setError('Something went wrong while fetching.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   return { users, loading, error, refetch: fetchUsers };
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/user");
        setUsers(res.data);
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

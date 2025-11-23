
// import { useEffect, useState, useCallback } from 'react';
// import axios, { AxiosError } from 'axios';

// // Define the shape of your user object
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role?: 'admin' | 'user'; // optional role
//   // add more fields if your user object has more
// }

// // Define the API response shape
// interface ApiResponse {
//   success: boolean;
//   data: User | null;
// }

// export default function useLoggedUser() {
//   const [loggedUser, setLoggedUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUser = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//     const res = await axios.get<User>('/api/me');
// setLoggedUser(res.data); // res.data is the decoded user object


//       if (res.data.success && res.data.data) {
//         setLoggedUser(res.data.data);
//       } else {
//         setError('Failed to fetch user data');
//         setLoggedUser(null);
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       setError(axiosError.message || 'An unexpected error occurred');
//       setLoggedUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);

//   return { loggedUser, loading, error, refetch: fetchUser };
// }
import { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

// Define the shape of your user object
interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
}

// Define the API response shape
interface ApiResponse {
  success: boolean;
  data: User | null;
}

export default function useLoggedUser() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Tell Axios the response is of type ApiResponse
      const res = await axios.get<ApiResponse>('/api/me');

      if (res.data.success && res.data.data) {
        setLoggedUser(res.data.data);
      } else {
        setError('Failed to fetch user data');
        setLoggedUser(null);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'An unexpected error occurred');
      setLoggedUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { loggedUser, loading, error, refetch: fetchUser };
}

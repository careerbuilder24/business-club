// // /context/WatchListContext.tsx
// "use client";
// import { createContext, useContext, useState, ReactNode } from "react";

// export interface WatchItem {
//   id: string;
//   name: string;
//   logo?: string;
//   coverImage?: string;
//   category?: string;
// }

// interface WatchListContextProps {
//   watchList: WatchItem[];
//   toggleWatch: (item: WatchItem) => void;
//   isWatched: (id: string) => boolean;
// }

// const WatchListContext = createContext<WatchListContextProps | undefined>(
//   undefined
// );

// export function WatchListProvider({ children }: { children: ReactNode }) {
//   const [watchList, setWatchList] = useState<WatchItem[]>([]);

//   const toggleWatch = (item: WatchItem) => {
//     setWatchList((prev) =>
//       prev.some((w) => w.id === item.id)
//         ? prev.filter((w) => w.id !== item.id)
//         : [...prev, item]
//     );
//   };

//   const isWatched = (id: string) => watchList.some((w) => w.id === id);

//   return (
//     <WatchListContext.Provider value={{ watchList, toggleWatch, isWatched }}>
//       {children}
//     </WatchListContext.Provider>
//   );
// }

// export function useWatchList() {
//   const context = useContext(WatchListContext);
//   if (!context) throw new Error("useWatchList must be used within WatchListProvider");
//   return context;
// }
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// ✅ Define item type
export interface WatchItem {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  category?: string;
}

// ✅ Context shape
interface WatchListContextProps {
  watchList: WatchItem[];
  addToWatchList: (item: WatchItem) => void;
  removeFromWatchList: (id: string) => void;
  toggleWatch: (item: WatchItem) => void;
  isWatched: (id: string) => boolean;
}

const WatchListContext = createContext<WatchListContextProps | undefined>(undefined);

export function WatchListProvider({ children }: { children: ReactNode }) {
  const [watchList, setWatchList] = useState<WatchItem[]>([]);

  // ✅ Optional: Persist watchlist in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("watchList");
    if (stored) setWatchList(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  // ✅ Add to watchlist
  const addToWatchList = (item: WatchItem) => {
    setWatchList((prev) => {
      if (prev.some((w) => w.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  // ✅ Remove from watchlist
  const removeFromWatchList = (id: string) => {
    setWatchList((prev) => prev.filter((w) => w.id !== id));
  };

  // ✅ Toggle function (optional convenience)
  const toggleWatch = (item: WatchItem) => {
    setWatchList((prev) =>
      prev.some((w) => w.id === item.id)
        ? prev.filter((w) => w.id !== item.id)
        : [...prev, item]
    );
  };

  // ✅ Check if watched
  const isWatched = (id: string) => watchList.some((w) => w.id === id);

  return (
    <WatchListContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList, toggleWatch, isWatched }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

// ✅ Hook
export function useWatchList() {
  const context = useContext(WatchListContext);
  if (!context)
    throw new Error("useWatchList must be used within a WatchListProvider");
  return context;
}

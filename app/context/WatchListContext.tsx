// /context/WatchListContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface WatchItem {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  category?: string;
}

interface WatchListContextProps {
  watchList: WatchItem[];
  toggleWatch: (item: WatchItem) => void;
  isWatched: (id: string) => boolean;
}

const WatchListContext = createContext<WatchListContextProps | undefined>(
  undefined
);

export function WatchListProvider({ children }: { children: ReactNode }) {
  const [watchList, setWatchList] = useState<WatchItem[]>([]);

  const toggleWatch = (item: WatchItem) => {
    setWatchList((prev) =>
      prev.some((w) => w.id === item.id)
        ? prev.filter((w) => w.id !== item.id)
        : [...prev, item]
    );
  };

  const isWatched = (id: string) => watchList.some((w) => w.id === id);

  return (
    <WatchListContext.Provider value={{ watchList, toggleWatch, isWatched }}>
      {children}
    </WatchListContext.Provider>
  );
}

export function useWatchList() {
  const context = useContext(WatchListContext);
  if (!context) throw new Error("useWatchList must be used within WatchListProvider");
  return context;
}

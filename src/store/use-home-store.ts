import { create } from "zustand";

export type HomeTab = "home" | "collections";

type HomeState = {
  searchQuery: string;
  selectedTab: HomeTab;
  setSearchQuery: (query: string) => void;
  setSelectedTab: (tab: HomeTab) => void;
};

export const useHomeStore = create<HomeState>()((set) => ({
  searchQuery: "",
  selectedTab: "home",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTab: (selectedTab) => set({ selectedTab })
}));

import { create } from "zustand";

interface FilterState {
  selectedProvince: string | null;
  selectedSchoolType: string | null;
  searchQuery: string;
  setProvince: (province: string | null) => void;
  setSchoolType: (schoolType: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

/**
 * Store for managing global filters across the dashboard, maps, and database.
 */
export const useFilterStore = create<FilterState>((set) => ({
  selectedProvince: null,
  selectedSchoolType: null,
  searchQuery: "",

  setProvince: (province) => set({ selectedProvince: province }),
  setSchoolType: (schoolType) => set({ selectedSchoolType: schoolType }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  resetFilters: () =>
    set({
      selectedProvince: null,
      selectedSchoolType: null,
      searchQuery: "",
    }),
}));

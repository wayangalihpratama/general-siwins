"use client";

import React, { useEffect, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { useFilterStore } from "@/store/useFilterStore";
import { dataService } from "@/services/dataService";

/**
 * AdvancedFilter Component
 * A premium, responsive filter bar for filtering schools by province, type, and search query.
 */
export function AdvancedFilter() {
  const {
    selectedProvince,
    selectedSchoolType,
    searchQuery,
    setProvince,
    setSchoolType,
    setSearchQuery,
    resetFilters,
  } = useFilterStore();

  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);
  const [schoolTypes, setSchoolTypes] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [p, s] = await Promise.all([
          dataService.getProvinces(),
          dataService.getSchoolTypes(),
        ]);
        setProvinces(p);
        setSchoolTypes(s);
      } catch (err) {
        console.error("Failed to fetch filter options", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4 transition-all duration-300 hover:shadow-md">
      {/* Search Input */}
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search school name or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium placeholder:text-gray-400"
        />
      </div>

      {/* Selects & Actions */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Province Select */}
        <div className="relative min-w-45">
          <select
            value={selectedProvince || ""}
            onChange={(e) => setProvince(e.target.value || null)}
            className="w-full appearance-none pl-4 pr-10 py-2.5 bg-gray-50/50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm font-semibold text-gray-700 cursor-pointer disabled:opacity-50"
            disabled={isLoading}
          >
            <option value="">All Provinces</option>
            {provinces.map((p, idx) => (
              <option key={`${p.name}-${idx}`} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* School Type Select */}
        <div className="relative min-w-45">
          <select
            value={selectedSchoolType || ""}
            onChange={(e) => setSchoolType(e.target.value || null)}
            className="w-full appearance-none pl-4 pr-10 py-2.5 bg-gray-50/50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm font-semibold text-gray-700 cursor-pointer disabled:opacity-50"
            disabled={isLoading}
          >
            <option value="">All School Types</option>
            {schoolTypes.map((s, idx) => (
              <option key={`${s.name}-${idx}`} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Clear Button */}
        {(selectedProvince || selectedSchoolType || searchQuery) && (
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

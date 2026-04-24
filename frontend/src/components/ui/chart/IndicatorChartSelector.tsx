"use client";

import React, { useEffect, useState } from "react";
import Chart from "../Chart";
import { useFilterStore } from "@/store/useFilterStore";
import { dataService } from "@/services/dataService";
import { DashboardItem } from "@/types/config";
import { BarChart3, ChevronDown } from "lucide-react";

interface IndicatorChartSelectorProps {
  charts: DashboardItem[];
}

/**
 * IndicatorChartSelector Component
 * Allows users to select a specific indicator from the configuration and visualize it.
 * Updates dynamically based on global filters.
 */
export function IndicatorChartSelector({ charts }: IndicatorChartSelectorProps) {
  const { selectedProvince, selectedSchoolType, searchQuery } = useFilterStore();
  const [selectedId, setSelectedId] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Initialize with first chart if available
  useEffect(() => {
    if (charts.length > 0 && !selectedId) {
      setSelectedId(charts[0].id);
    }
  }, [charts, selectedId]);

  useEffect(() => {
    if (!selectedId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const filters = {
          province: selectedProvince,
          school_type: selectedSchoolType,
          search: searchQuery,
        };
        const res = await dataService.getGenericBarData(selectedId, filters);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch indicator data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedId, selectedProvince, selectedSchoolType, searchQuery]);

  const selectedChart = charts.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      {/* Selector Header */}
      <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-500" />
          Custom Indicator Analysis
        </h3>
        <div className="relative min-w-[320px]">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 focus:border-blue-200 rounded-xl outline-none transition-all text-sm font-semibold text-gray-700 cursor-pointer shadow-sm hover:border-gray-300"
          >
            {charts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Main Chart */}
      <Chart
        type="BAR"
        data={
          data?.map((d: any) => ({
            name: `${d.name} (${d.year})`,
            value: d.percent || d.value,
            count: d.count,
          })) || []
        }
        title={`Distribution: ${selectedChart?.title || "Select an Indicator"}`}
        loading={loading}
        horizontal={false}
        height={500}
      />
    </div>
  );
}

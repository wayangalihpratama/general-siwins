"use client";

import React, { useEffect, useState } from "react";
import Chart from "../Chart";
import { useFilterStore } from "@/store/useFilterStore";
import { dataService } from "@/services/dataService";
import { DashboardItem } from "@/types/config";
import { Info, Layers } from "lucide-react";

interface JMPChartGroupProps {
  charts: DashboardItem[];
}

/**
 * JMPChartGroup Component
 * Handles data fetching and rendering for a group of JMP (Water, Sanitation, Hygiene) indicators.
 * Supports toggling between normal view and stacked view by province.
 */
export function JMPChartGroup({ charts }: JMPChartGroupProps) {
  const { selectedProvince, selectedSchoolType, searchQuery } = useFilterStore();
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [showStack, setShowStack] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      const filters = {
        province: selectedProvince,
        school_type: selectedSchoolType,
        search: searchQuery,
        history: showHistory,
      };

      charts.forEach(async (chart) => {
        setLoading((prev) => ({ ...prev, [chart.path]: true }));
        try {
          const res = await dataService.getJMPData(chart.path, filters);
          setData((prev) => ({ ...prev, [chart.path]: res.data }));
        } catch (err) {
          console.error(`Failed to fetch data for ${chart.path}`, err);
        } finally {
          setLoading((prev) => ({ ...prev, [chart.path]: false }));
        }
      });
    };

    fetchAllData();
  }, [charts, selectedProvince, selectedSchoolType, searchQuery, showHistory]);

  return (
    <div className="space-y-6">
      {/* Group Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 gap-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-500" />
          JMP Global Indicators
        </h3>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer group">
            <input
              type="checkbox"
              checked={showStack}
              onChange={(e) => setShowStack(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">By Province</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer group">
            <input
              type="checkbox"
              checked={showHistory}
              onChange={(e) => setShowHistory(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">Show History</span>
          </label>
        </div>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, idx) => {
          const chartData = data[chart.path] || [];
          const isLoading = loading[chart.path];

          // Data Transformation
          let processedData = [];
          if (showStack) {
            // Stacked Bar Logic (Grouped by Administration/Province)
            // Simplified for now: Assume data is already in correct format or needs minimal mapping
            processedData = chartData.map((item: any) => ({
              name: item.administration || item.name,
              value: item.child.map((c: any) => c.percent),
              seriesNames: item.child.map((c: any) => c.option),
            }));
          } else {
            // Normal Bar Logic
            processedData = chartData.flatMap((d: any) =>
              d.child.map((c: any) => ({
                name: showHistory ? `${c.option} (${d.year})` : c.option,
                value: c.percent,
                count: c.count,
              }))
            );
          }

          return (
            <div key={`${chart.id}-${idx}`} className="relative group">
              <Chart
                type={showStack ? "BARSTACK" : "BAR"}
                data={processedData}
                title={chart.title}
                loading={isLoading}
                horizontal={true}
                height={380}
              />
              <button className="absolute top-7 right-7 opacity-0 group-hover:opacity-100 transition-all text-gray-400 hover:text-blue-500 bg-white/80 p-1.5 rounded-lg border border-gray-100">
                <Info className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

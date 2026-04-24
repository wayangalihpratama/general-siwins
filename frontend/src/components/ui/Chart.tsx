"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { Pie } from "./chart/options/Pie";
import { cn } from "@/lib/utils";

interface ChartProps {
  type: "PIE" | "BAR" | "LINE" | "BARSTACK";
  data: any[];
  title?: string;
  height?: number;
  className?: string;
  loading?: boolean;
}

export default function Chart({
  type,
  data,
  title = "",
  height = 400,
  className,
  loading = false,
}: ChartProps) {
  const getOption = () => {
    switch (type) {
      case "PIE":
        return Pie(data, title);
      default:
        return {};
    }
  };

  return (
    <div className={cn("bg-white p-6 rounded-2xl border border-gray-100 shadow-sm", className)}>
      {title && (
        <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      )}
      <div style={{ height: height }}>
        <ReactECharts
          option={getOption()}
          style={{ height: "100%", width: "100%" }}
          showLoading={loading}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
}

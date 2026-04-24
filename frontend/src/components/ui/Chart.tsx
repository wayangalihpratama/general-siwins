"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { Pie } from "./chart/options/Pie";
import { Bar } from "./chart/options/Bar";
import { Line } from "./chart/options/Line";
import { BarStack } from "./chart/options/BarStack";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/store/useConfigStore";

interface ChartProps {
  type: "PIE" | "BAR" | "LINE" | "BARSTACK";
  data: any[];
  title?: string;
  height?: number;
  className?: string;
  loading?: boolean;
  horizontal?: boolean;
}

export default function Chart({
  type,
  data,
  title = "",
  height = 400,
  className,
  loading = false,
  horizontal = false,
}: ChartProps) {
  const { branding } = useConfigStore();

  const getOption = () => {
    const primaryColor = branding?.theme.primary_color || "#3b82f6";
    const secondaryColor = branding?.theme.secondary_color || "#f1c40f";

    switch (type) {
      case "PIE":
        return Pie(data, title);
      case "BAR":
        const barOpt = Bar(data, title, horizontal);
        // Override colors with branding
        if (barOpt.series[0].itemStyle) {
          barOpt.series[0].itemStyle.color = primaryColor;
        }
        return barOpt;
      case "LINE":
        const lineOpt = Line(data, title);
        lineOpt.series[0].itemStyle.color = primaryColor;
        return lineOpt;
      case "BARSTACK":
        return BarStack(data, title, horizontal);
      default:
        return {};
    }
  };

  return (
    <div className={cn("bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md", className)}>
      {title && (
        <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">{title}</h3>
      )}
      <div style={{ height: height }} className="w-full">
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

"use client";

import { useConfigStore } from "@/store/useConfigStore";
import { JMPChartGroup } from "@/components/ui/chart/JMPChartGroup";
import { IndicatorChartSelector } from "@/components/ui/chart/IndicatorChartSelector";
import { Skeleton } from "@/components/ui/Skeleton";
import { Building2, PieChart, ZoomIn } from "lucide-react";

export default function DashboardPage() {
  const { branding, dashboard, isLoading, error } = useConfigStore();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-150 w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-center gap-3">
        <div className="bg-red-100 p-2 rounded-lg">⚠️</div>
        <div>
          <p className="font-bold text-sm uppercase tracking-wider">Error Loading Configuration</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  const jmpCharts = dashboard?.tabs.find((t) => t.component === "JMP-CHARTS")?.chartList || [];
  const genericCharts = dashboard?.tabs.find((t) => t.component === "GENERIC-CHART-GROUP")?.chartList || [];

  return (
    <div className="space-y-10 pb-20">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Instance</h3>
            <p className="text-xl font-black text-gray-900">{branding?.clientName}</p>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Charts Configured</h3>
            <p className="text-xl font-black text-gray-900">
              {dashboard?.tabs.reduce((acc, tab) => acc + tab.chartList.length, 0) || 0}
            </p>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
            <ZoomIn className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">GIS Zoom Level</h3>
            <p className="text-xl font-black text-gray-900">{branding?.gis.zoom}</p>
          </div>
        </div>
      </div>

      {/* JMP Charts Section */}
      {jmpCharts.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <JMPChartGroup charts={jmpCharts} />
        </section>
      )}

      {/* Generic Charts Section */}
      {genericCharts.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <IndicatorChartSelector charts={genericCharts} />
        </section>
      )}
    </div>
  );
}

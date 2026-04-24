"use client";

import { useConfigStore } from "@/store/useConfigStore";

export default function DashboardPage() {
  const { branding, dashboard, isLoading, error } = useConfigStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Instance</h3>
          <p className="text-2xl font-bold text-gray-900">{branding?.clientName}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Charts Configured</h3>
          <p className="text-2xl font-bold text-gray-900">
            {dashboard?.tabs.reduce((acc, tab) => acc + tab.chartList.length, 0) || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">GIS Zoom Level</h3>
          <p className="text-2xl font-bold text-gray-900">{branding?.gis.zoom}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Configured Charts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {dashboard?.tabs.map((tab, tabIdx) => (
              <div key={tabIdx} className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{tab.component}</h4>
                <ul className="divide-y divide-gray-100 bg-gray-50/50 rounded-xl px-4">
                  {tab.chartList.map((item, itemIdx) => (
                    <li key={itemIdx} className="py-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.calc || "Custom"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

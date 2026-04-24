"use client";

import dynamic from "next/dynamic";

const InteractiveMap = dynamic(
  () => import("@/components/ui/Map/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center rounded-2xl">
        <span className="text-gray-400 font-medium">Loading Map...</span>
      </div>
    )
  }
);

export default function MapsView() {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Geospatial Explorer</h2>
            <p className="text-gray-500">Visualizing WASH infrastructure across provinces.</p>
         </div>
      </div>
      <div className="flex-1 min-h-0">
        <InteractiveMap />
      </div>
    </div>
  );
}

import InteractiveMap from "@/components/ui/Map/InteractiveMap";
import { Map as MapIcon } from "lucide-react";

export default function MapsPage() {
  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
            <MapIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Geospatial Intelligence</h1>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-[10px]">Visualizing school-level performance indicators</p>
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <InteractiveMap />
      </div>
    </div>
  );
}

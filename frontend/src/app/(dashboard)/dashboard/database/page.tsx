import { SubmissionTable } from "@/components/ui/SubmissionTable";
import { Database } from "lucide-react";

export default function DatabasePage() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Submission Explorer</h1>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Manage and analyze raw data entries</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <SubmissionTable />
      </div>
    </div>
  );
}

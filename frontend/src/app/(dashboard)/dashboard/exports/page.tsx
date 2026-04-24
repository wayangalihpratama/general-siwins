"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  FileSpreadsheet,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCcw,
  Plus,
  Info
} from "lucide-react";
import { dataService } from "@/services/dataService";
import { useFilterStore } from "@/store/useFilterStore";

interface ExportJob {
  id: number;
  payload: string;
  status: string; // "Pending", "in Progress", "Done", "Failed"
  created: string;
  info: {
    tags: Array<{ q: string; o: any }>;
  };
}

const STATUS_MAP = {
  "Pending": { label: "Queued", color: "text-amber-600", bg: "bg-amber-50", icon: <Clock className="w-4 h-4" /> },
  "in Progress": { label: "Generating", color: "text-blue-600", bg: "bg-blue-50", icon: <Loader2 className="w-4 h-4 animate-spin" /> },
  "Done": { label: "Ready", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 className="w-4 h-4" /> },
  "Failed": { label: "Failed", color: "text-red-600", bg: "bg-red-50", icon: <AlertCircle className="w-4 h-4" /> },
};

export default function ExportsPage() {
  const { selectedProvince, selectedSchoolType, searchQuery } = useFilterStore();
  const [jobs, setJobs] = useState<ExportJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [downloading, setDownloading] = useState<number | null>(null);

  // Helper to parse the custom FastAPI date format "April 24, 2026 at 05:46 AM"
  const parseBackendDate = (dateStr: string) => {
    try {
      // Replace " at " with a space to make it more standard-friendly
      const normalized = dateStr.replace(" at ", " ");
      const date = new Date(normalized);
      if (isNaN(date.getTime())) return "Recent";
      return date.toLocaleString();
    } catch {
      return "Recent";
    }
  };

  const fetchJobs = useCallback(async () => {
    try {
      const res = await dataService.getExportList();
      setJobs(res);
    } catch (err) {
      console.error("Failed to fetch export list", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(() => {
      const hasPending = jobs.some(job => job.status === "Pending" || job.status === "in Progress");
      if (hasPending) fetchJobs();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchJobs, jobs]);

  const handleRequestExport = async () => {
    try {
      setRequesting(true);
      const filters = {
        prov: selectedProvince ? [selectedProvince] : undefined,
        sctype: selectedSchoolType ? [selectedSchoolType] : undefined,
        search: searchQuery || undefined,
      };
      await dataService.requestExport(filters);
      fetchJobs();
    } catch (err) {
      console.error("Export request failed", err);
    } finally {
      setRequesting(false);
    }
  };

  const handleDownload = async (job: ExportJob) => {
    try {
      setDownloading(job.id);
      const res = await dataService.getExportFile(job.payload);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", job.payload.split("/").pop() || "export.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Header & Request Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 backdrop-blur-sm p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="bg-emerald-600 p-4 rounded-3xl text-white shadow-xl shadow-emerald-200">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Data Exports</h1>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-[10px] mt-1">Generate and manage Excel reports</p>
          </div>
        </div>

        <button
          onClick={handleRequestExport}
          disabled={requesting}
          className="flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
        >
          {requesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Request Current View
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Loading Export History...</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-sm rounded-4xl border-2 border-dashed border-gray-200 p-20 flex flex-col items-center text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <RefreshCcw className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">No Exports Found</h3>
            <p className="text-sm font-medium text-gray-500 max-w-xs">
              Request your first data export using the button above.
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {jobs.map((job) => {
              const status = STATUS_MAP[job.status as keyof typeof STATUS_MAP] || STATUS_MAP["Failed"];
              return (
                <div
                  key={job.id}
                  className="group bg-white hover:bg-gray-50/50 p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row md:items-center gap-6"
                >
                  <div className={`shrink-0 w-16 h-16 rounded-2xl ${status.bg} flex items-center justify-center ${status.color}`}>
                    <FileSpreadsheet className="w-8 h-8" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-black text-gray-900 truncate tracking-tight uppercase">
                        {job.payload.split("-").slice(1).join("-") || "Unnamed Export"}
                      </h3>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        {parseBackendDate(job.created)}
                      </div>

                      <div className="flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-gray-300" />
                        <div className="flex flex-wrap gap-1.5">
                          {job.info?.tags?.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-[9px] font-bold uppercase tracking-wider">
                              {tag.q}: {tag.o}
                            </span>
                          ))}
                          {!job.info?.tags?.length && <span className="text-[9px] font-bold text-gray-300 uppercase italic">No Filters Applied</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      onClick={() => handleDownload(job)}
                      disabled={job.status !== "Done" || downloading === job.id}
                      className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-900 text-gray-900 hover:text-white border border-gray-200 hover:border-gray-900 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm hover:shadow-lg disabled:opacity-30 disabled:pointer-events-none"
                    >
                      {downloading === job.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                      {downloading === job.id ? "Preparing..." : "Download Excel"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Helper Note */}
      <div className="bg-blue-50/50 p-6 rounded-4xl border border-blue-100 flex items-start gap-4">
        <div className="bg-blue-600 p-2 rounded-xl text-white shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">Export Tip</h4>
          <p className="text-xs font-medium text-blue-700 leading-relaxed">
            Data generation happens in the background. Large datasets might take a few moments.
            Once the status changes to "Ready", your Excel file will be available for download.
          </p>
        </div>
      </div>
    </div>
  );
}

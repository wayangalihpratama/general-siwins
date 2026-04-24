"use client";

import React, { useState, useEffect } from "react";
import { dataService } from "@/services/dataService";
import { useFilterStore } from "@/store/useFilterStore";
import { Skeleton } from "./Skeleton";
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SubmissionTable Component
 * A premium, paginated table for browsing submissions with expandable details.
 */
export function SubmissionTable() {
  const { selectedProvince, selectedSchoolType, searchQuery } = useFilterStore();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, total: 0, pageSize: 10 });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await dataService.getSubmissions({
        page,
        perpage: pagination.pageSize,
        prov: selectedProvince ? [selectedProvince] : undefined,
        sctype: selectedSchoolType ? [selectedSchoolType] : undefined,
        search: searchQuery || undefined,
      });
      setData(res.data);
      setPagination((prev) => ({ ...prev, current: res.current, total: res.total }));
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince, selectedSchoolType, searchQuery]);

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">School Information</th>
              <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Province</th>
              <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-6"><Skeleton className="h-5 w-56 rounded-lg" /></td>
                  <td className="px-6 py-6"><Skeleton className="h-5 w-24 rounded-lg" /></td>
                  <td className="px-6 py-6"><Skeleton className="h-5 w-32 rounded-lg" /></td>
                  <td className="px-6 py-6"><Skeleton className="h-5 w-8 ml-auto rounded-lg" /></td>
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((row) => (
                <React.Fragment key={row.id}>
                  <tr
                    className={cn(
                      "hover:bg-blue-50/30 transition-all cursor-pointer group relative",
                      expandedId === row.id && "bg-blue-50/50"
                    )}
                    onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {row.school_information?.school_name}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
                          Code: {row.school_information?.school_code}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black bg-gray-100 text-gray-600 uppercase tracking-widest group-hover:bg-white transition-colors">
                        {row.school_information?.school_type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-500">
                      {row.school_information?.province}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end pr-2">
                        {expandedId === row.id ? (
                          <ChevronUp className="w-5 h-5 text-blue-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedId === row.id && (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 bg-gray-50/40 border-t border-gray-100">
                        <SubmissionDetail dataId={row.id} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <span className="text-3xl">📭</span>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">No submissions found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="px-6 py-5 bg-white border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Showing <span className="text-gray-900">{data.length}</span> of <span className="text-gray-900">{pagination.total}</span> entries
        </p>
        <div className="flex gap-3">
          <button
            disabled={pagination.current === 1 || loading}
            onClick={() => fetchData(pagination.current - 1)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <button
            disabled={pagination.current * pagination.pageSize >= pagination.total || loading}
            onClick={() => fetchData(pagination.current + 1)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 transition-all active:scale-95"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * SubmissionDetail Component
 * Fetches and displays grouped answers for a specific submission.
 */
function SubmissionDetail({ dataId }: { dataId: number }) {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await dataService.getSubmissionDetail(dataId);
        setDetail(res);
      } catch (err) {
        console.error("Failed to fetch detail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [dataId]);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!detail) return <div className="text-red-500 font-bold text-sm">⚠️ Error loading submission details.</div>;

  return (
    <div className="space-y-12 max-w-5xl animate-in fade-in slide-in-from-top-2 duration-500">
      {detail.answer?.map((group: any) => (
        <div key={group.group} className="space-y-6">
          <h4 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-10 h-0.5 bg-blue-100" />
            {group.group}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 pl-4">
            {group.child.map((ans: any, idx: number) => (
              <div key={idx} className="space-y-2 border-l border-gray-100 pl-4 transition-colors hover:border-blue-200">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                  {ans.question_name}
                </p>
                <div className="text-sm font-bold text-gray-800 leading-relaxed">
                  {ans.render === "image" ? (
                    <div className="mt-3 relative group/img overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 inline-block">
                      <img
                        src={ans.value}
                        alt={ans.question_name}
                        className="rounded-xl transition-all duration-500 group-hover/img:scale-110 cursor-zoom-in"
                        style={{ maxHeight: "240px", width: "auto" }}
                      />
                    </div>
                  ) : ans.render === "chart" && Array.isArray(ans.value) ? (
                    <span className="text-blue-600">
                      {ans.value[0]?.value ?? "N/A"}
                    </span>
                  ) : typeof ans.value === "object" ? (
                    JSON.stringify(ans.value)
                  ) : (
                    ans.value || <span className="text-gray-300 italic font-medium">Not specified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

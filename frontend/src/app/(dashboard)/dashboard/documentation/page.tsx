"use client";

import React, { useState } from "react";
import { BookOpen, FileText, Download, ExternalLink, ChevronRight } from "lucide-react";

const DOCS = [
  {
    id: "user-guide",
    title: "SIWINS User Guide",
    description: "Comprehensive manual for data collection, dashboard navigation, and administrative tasks.",
    file: "/docs/si-wins-user-guide.pdf",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-blue-600",
    shadow: "shadow-blue-200",
  },
  {
    id: "jmp-guidelines",
    title: "JMP Global Guidelines",
    description: "Technical specifications and WASH indicator definitions provided by WHO/UNICEF.",
    file: "/docs/jmp_guidelines.pdf",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-emerald-600",
    shadow: "shadow-emerald-200",
  }
];

export default function DocumentationPage() {
  const [selectedDoc, setSelectedDoc] = useState(DOCS[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-160px)] pb-10">
      {/* Sidebar / Selection */}
      <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-gray-100">
          <h1 className="text-xl font-black text-gray-900 tracking-tight mb-2">Knowledge Center</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Platform & Technical Guides</p>
        </div>

        <div className="space-y-4">
          {DOCS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`w-full text-left p-5 rounded-3xl transition-all duration-300 border flex items-start gap-4 group relative overflow-hidden ${
                selectedDoc.id === doc.id
                  ? "bg-white border-blue-200 shadow-xl shadow-blue-100 translate-x-2"
                  : "bg-white/60 border-transparent hover:bg-white hover:border-gray-200"
              }`}
            >
              {selectedDoc.id === doc.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />
              )}
              <div className={`${doc.color} p-3 rounded-2xl text-white shadow-lg ${doc.shadow} group-hover:scale-110 transition-transform`}>
                {doc.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-gray-900 mb-1 leading-tight">{doc.title}</h3>
                <p className="text-[11px] font-medium text-gray-500 leading-relaxed line-clamp-2">
                  {doc.description}
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 mt-1 transition-all ${
                selectedDoc.id === doc.id ? "text-blue-600 translate-x-1" : "text-gray-300 opacity-0 group-hover:opacity-100"
              }`} />
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-auto bg-blue-600 rounded-3xl p-6 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <h4 className="text-sm font-black uppercase tracking-widest mb-3">Support Resources</h4>
          <p className="text-xs font-medium text-blue-100 mb-6 leading-relaxed">
            Need help with a specific feature or having technical issues?
          </p>
          <div className="space-y-3">
            <a
              href="mailto:support@siwins.gov"
              className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all group/link"
            >
              <span className="text-xs font-bold uppercase tracking-wider">Contact Support</span>
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Content Area / Viewer */}
      <div className="flex-1 min-w-0 flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-700">
        <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${selectedDoc.color} animate-pulse`} />
            <span className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">{selectedDoc.title}</span>
          </div>
          <a
            href={selectedDoc.file}
            download
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-[10px] font-black text-gray-600 uppercase tracking-widest border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </div>

        <div className="flex-1 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative group/viewer">
          <iframe
            src={`${selectedDoc.file}#view=FitH`}
            title={selectedDoc.title}
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}

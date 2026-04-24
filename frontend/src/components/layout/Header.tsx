"use client";

import { useConfigStore } from "@/store/useConfigStore";

export default function Header() {
  const branding = useConfigStore((state) => state.branding);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              {branding?.clientName || "SIWINS"}
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
             {/* Navigation items will go here */}
          </nav>
        </div>
      </div>
    </header>
  );
}

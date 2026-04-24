"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Map as MapIcon, Database, ShieldCheck } from "lucide-react";
import { useConfigStore } from "@/store/useConfigStore";

export default function Home() {
  const branding = useConfigStore((state) => state.branding);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/images/home.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              {branding?.client_name || "Solomon Islands"} <br />
              <span className="text-blue-400">WASH in Schools</span> Data Explorer
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
              Empowering data-driven decisions for Water, Sanitation, and Hygiene.
              Explore comprehensive insights into school infrastructure across the Solomon Islands.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-blue-900 bg-white hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Explore Data <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/dashboard/maps"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-lg font-medium rounded-xl text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Map <MapIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics / Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Key Metrics</h2>
            <p className="mt-4 text-xl text-gray-600">
              Reliable analytics derived from nationwide school surveys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Aggregated datasets covering functional school facilities, sanitation levels, and water accessibility.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Charts</h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize trends and breakdowns by province, year, and school category with intuitive visualization tools.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Evidence-Based</h3>
              <p className="text-gray-600 leading-relaxed">
                Bolstering budgeting and planning for WASH in Schools with verifiable insights from the MEHRD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="relative w-48 h-16">
              <Image 
                src="/images/unicef-logo.png" 
                alt="UNICEF" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="relative w-48 h-16">
              <Image 
                src="/images/mehrd_logo_no_bg.png" 
                alt="MEHRD" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

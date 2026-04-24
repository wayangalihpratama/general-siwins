"use client";

import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useConfigStore } from "@/store/useConfigStore";
import { useFilterStore } from "@/store/useFilterStore";
import { dataService } from "@/services/dataService";
import * as topojson from "topojson-client";
import { Layers, Search, MapPin } from "lucide-react";
import L from "leaflet";

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

interface MapMarker {
  id: number;
  geo: [number, number];
  school_information: string[];
  answer: any;
}

export default function InteractiveMap() {
  const { branding, dashboard } = useConfigStore();
  const { selectedProvince, selectedSchoolType, searchQuery } = useFilterStore();
  const [geoData, setGeoData] = useState<any>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [indicator, setIndicator] = useState("jmp-water");

  // Load TopoJSON for Provinces
  useEffect(() => {
    if (branding?.gis.topojson) {
      fetch(branding.gis.topojson)
        .then((res) => res.json())
        .then((data) => {
          const objectName = Object.keys(data.objects)[0];
          const converted = topojson.feature(data, data.objects[objectName]);
          setGeoData(converted);
        })
        .catch((err) => console.error("Failed to load TopoJSON", err));
    }
  }, [branding?.gis.topojson]);

  // Load Markers with Filters
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setLoading(true);
        const filters = {
          prov: selectedProvince ? [selectedProvince] : undefined,
          sctype: selectedSchoolType ? [selectedSchoolType] : undefined,
          search: searchQuery || undefined,
        };
        const res = await dataService.getMapData(indicator, filters);
        setMarkers(res.data);
      } catch (err) {
        console.error("Failed to load markers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkers();
  }, [indicator, selectedProvince, selectedSchoolType, searchQuery]);

  const getMarkerColor = (answer: string) => {
    if (!answer) return "#3b82f6";
    const val = answer.toLowerCase();
    if (val.includes("basic") || val === "yes") return "#22c55e"; // green
    if (val.includes("limited") || val === "sometimes") return "#eab308"; // yellow
    if (val.includes("no service") || val === "no") return "#ef4444"; // red
    return "#3b82f6"; // blue
  };

  const createClusterCustomIcon = (cluster: any) => {
    const count = cluster.getChildCount();
    return L.divIcon({
      html: `<div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-black text-xs shadow-lg border-4 border-white/50 backdrop-blur-sm ring-4 ring-blue-500/20">${count}</div>`,
      className: "custom-marker-cluster",
      iconSize: L.point(40, 40),
    });
  };

  const indicators = useMemo(() => {
    const jmp = [
      { id: "jmp-water", name: "Water Service Level" },
      { id: "jmp-sanitation", name: "Sanitation Service Level" },
      { id: "jmp-hygiene", name: "Hygiene Service Level" },
    ];
    // Add generic ones if needed from config
    return jmp;
  }, []);

  if (!branding) return null;

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 relative group">
      {/* Indicator Selector Overlay */}
      <div className="absolute top-6 left-6 z-1000 flex flex-col gap-3 max-w-70">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Layers className="w-4 h-4" />
          </div>
          <select
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-bold text-gray-700 cursor-pointer pr-4"
          >
            {indicators.map((ind) => (
              <option key={ind.id} value={ind.id}>{ind.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-1001 bg-white/40 backdrop-blur-md flex items-center justify-center transition-all duration-500">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute top-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600 animate-bounce" />
            </div>
            <span className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] animate-pulse">Syncing Map...</span>
          </div>
        </div>
      )}

      <MapContainer
        center={branding.gis.center as [number, number]}
        zoom={branding.gis.zoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {geoData && (
          <GeoJSON
            data={geoData}
            style={{
              fillColor: "#3b82f6",
              weight: 1.5,
              opacity: 0.5,
              color: "#3b82f6",
              fillOpacity: 0.05,
            }}
          />
        )}

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={50}
        >
          {markers.map((marker) => (
            <CircleMarker
              key={marker.id}
              center={marker.geo}
              radius={7}
              pathOptions={{
                fillColor: getMarkerColor(marker.answer),
                fillOpacity: 0.9,
                color: "white",
                weight: 2.5,
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-50">
                  <h3 className="font-black text-gray-900 border-b border-gray-100 pb-2 mb-2 text-sm leading-tight uppercase tracking-tight">
                    {marker.school_information[2] || "Unknown School"}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>Province</span>
                      <span className="text-gray-600">{marker.school_information[0]}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>School Code</span>
                      <span className="text-gray-600">{marker.school_information[3]}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-50">
                      <div
                        className="w-full py-1.5 rounded-lg text-center text-[10px] font-black text-white uppercase tracking-widest shadow-sm"
                        style={{ backgroundColor: getMarkerColor(marker.answer) }}
                      >
                        {marker.answer || "No Data"}
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>

        <MapResizer />
      </MapContainer>

      {/* Premium Map Legend */}
      <div className="absolute bottom-10 right-10 z-1000 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-gray-100 hidden lg:block animate-in fade-in slide-in-from-right-4 duration-700">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Map Legend
        </h4>
        <div className="space-y-4">
          {[
            { label: "Basic Service / Yes", color: "#22c55e" },
            { label: "Limited Service / Shared", color: "#eab308" },
            { label: "No Service / No", color: "#ef4444" },
            { label: "Other / Default", color: "#3b82f6" },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-4 group cursor-help">
              <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-2 ring-gray-50 group-hover:scale-125 transition-transform" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs font-black text-gray-600 uppercase tracking-widest group-hover:text-gray-900 transition-colors">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

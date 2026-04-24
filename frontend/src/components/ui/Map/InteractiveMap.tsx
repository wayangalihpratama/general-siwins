"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useConfigStore } from "@/store/useConfigStore";
import * as topojson from "topojson-client";

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function InteractiveMap() {
  const branding = useConfigStore((state) => state.branding);
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    if (branding?.gis.topojson) {
      fetch(branding.gis.topojson)
        .then((res) => res.json())
        .then((data) => {
          // Convert TopoJSON to GeoJSON
          const objectName = Object.keys(data.objects)[0];
          const converted = topojson.feature(data, data.objects[objectName]);
          setGeoData(converted);
        })
        .catch((err) => console.error("Failed to load TopoJSON", err));
    }
  }, [branding?.gis.topojson]);

  if (!branding) return null;

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100 bg-gray-50 relative">
      <MapContainer
        center={branding.gis.center}
        zoom={branding.gis.zoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={{
              fillColor: "#3b82f6",
              weight: 1,
              opacity: 1,
              color: "white",
              fillOpacity: 0.1,
            }}
          />
        )}
        <MapResizer />
      </MapContainer>
    </div>
  );
}

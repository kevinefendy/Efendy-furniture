"use client";

import { useEffect, useRef, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  type MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, MessageCircle, Clock, Navigation, ExternalLink, Sparkles } from "lucide-react";
import type { ShowroomItem } from "@/components/common/ShowroomMap";

interface InteractiveMapGLProps {
  currentShowroom: ShowroomItem & {
    latitude: number;
    longitude: number;
  };
  allShowrooms: Array<
    ShowroomItem & {
      latitude: number;
      longitude: number;
    }
  >;
  onSelectShowroom: (kota: string) => void;
}

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function InteractiveMapGL({
  currentShowroom,
  allShowrooms,
  onSelectShowroom,
}: InteractiveMapGLProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [showPopup, setShowPopup] = useState(true);

  // Animate map camera whenever the selected showroom changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [currentShowroom.longitude, currentShowroom.latitude],
        zoom: 15.2,
        pitch: 30,
        bearing: 0,
        essential: true,
        duration: 1600,
      });
      setShowPopup(true);
    }
  }, [currentShowroom.latitude, currentShowroom.longitude]);

  return (
    <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] bg-[#F7F7F5] overflow-hidden">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: currentShowroom.longitude,
          latitude: currentShowroom.latitude,
          zoom: 15.2,
          pitch: 30,
        }}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={true} />
        <FullscreenControl position="top-right" />

        {/* Render markers for all showrooms */}
        {allShowrooms.map((s) => {
          const isSelected = s.kota.toLowerCase() === currentShowroom.kota.toLowerCase();

          return (
            <Marker
              key={s.id}
              longitude={s.longitude}
              latitude={s.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                onSelectShowroom(s.kota);
                setShowPopup(true);
              }}
            >
              <div className="group relative cursor-pointer flex flex-col items-center">
                {/* Ping wave for currently selected showroom */}
                {isSelected && (
                  <span className="absolute -top-1 w-8 h-8 rounded-full bg-[#C2410C]/30 animate-ping pointer-events-none" />
                )}

                {/* Marker Pill */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                    isSelected
                      ? "bg-[#C2410C] text-white border-2 border-white ring-2 ring-[#C2410C]/40"
                      : "bg-[#1A1A1A] text-white border border-white/60 hover:bg-[#C2410C]"
                  }`}
                >
                  <MapPin size={14} className={isSelected ? "animate-bounce" : ""} />
                  <span className="text-[12px] font-semibold tracking-tight whitespace-nowrap">
                    Efendy {s.kota}
                  </span>
                </div>

                {/* Bottom Pointer Arrow */}
                <div
                  className={`w-2 h-2 rotate-45 -mt-1 ${
                    isSelected ? "bg-[#C2410C]" : "bg-[#1A1A1A]"
                  }`}
                />
              </div>
            </Marker>
          );
        })}

        {/* Selected Showroom Info Popup */}
        {showPopup && (
          <Popup
            longitude={currentShowroom.longitude}
            latitude={currentShowroom.latitude}
            anchor="top"
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
            offset={14}
            className="efendy-map-popup"
          >
            <div className="p-1 max-w-[240px] text-[#1A1A1A]">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C2410C] flex items-center gap-1">
                  <Sparkles size={11} /> Flagship Showroom
                </span>
              </div>
              <h4 className="font-semibold text-sm leading-tight">
                Efendy Furniture — {currentShowroom.kota}
              </h4>
              <p className="text-[11px] text-[#6B6B6B] mt-1 leading-snug">
                {currentShowroom.alamat}
              </p>

              <div className="mt-2 pt-2 border-t border-[#E8E6E1] flex items-center justify-between gap-2">
                <a
                  href={`https://wa.me/${currentShowroom.wa}?text=${encodeURIComponent(
                    `Halo Efendy Furniture ${currentShowroom.kota}, saya mau tanya info kunjungan showroom.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#C2410C] text-white text-[11px] font-medium hover:bg-[#A8370A] transition-colors"
                >
                  <MessageCircle size={12} /> Chat WA
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `Efendy Furniture ${currentShowroom.alamat}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#1A1A1A] hover:text-[#C2410C] font-medium inline-flex items-center gap-0.5"
                >
                  G-Maps <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating Badges on map overlay */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1.5">
        <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-[#E8E6E1] text-[11px] font-semibold text-[#1A1A1A] shadow-sm">
          Interactive Vector Map (react-map-gl)
        </span>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-[#1A1A1A]/80 backdrop-blur-md text-[10px] text-white">
          Klik pin untuk pindah lokasi
        </span>
      </div>
    </div>
  );
}

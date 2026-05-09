"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface City {
  name: string;
  lat: number;
  lng: number;
}

const cities: City[] = [
  { name: "成都", lat: 30.5728, lng: 104.0668 },
  { name: "郑州", lat: 34.7466, lng: 113.6254 },
  { name: "洛阳", lat: 34.6181, lng: 112.4539 },
  { name: "深圳", lat: 22.5431, lng: 114.0579 },
  { name: "广州", lat: 23.1291, lng: 113.2644 },
  { name: "西安", lat: 34.3416, lng: 108.9398 },
  { name: "濮阳", lat: 35.7618, lng: 115.0293 },
  { name: "镇江", lat: 32.1899, lng: 119.4251 },
  { name: "青岛", lat: 36.0671, lng: 120.3826 },
  { name: "呼和浩特", lat: 40.8426, lng: 111.749 },
  { name: "泰安", lat: 36.2, lng: 117.0876 },
];

const currentCity = "郑州";

// Web Mercator: lat/lng → pixel at given zoom
function project(lat: number, lng: number, zoom: number) {
  const worldSize = 256 * Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * worldSize;
  const rad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) *
    worldSize;
  return { x, y };
}

// China view bounds (Web Mercator at zoom 4)
const ZOOM = 4;
const TILE_SIZE = 256;
const WORLD = TILE_SIZE * Math.pow(2, ZOOM); // 4096

// Bounds in mercator pixels
const BOUNDS = {
  left: project(15, 70, ZOOM).x,
  right: project(55, 140, ZOOM).x,
  top: project(55, 70, ZOOM).y,
  bottom: project(15, 140, ZOOM).y,
};

const MAP_W = 600;
const MAP_H = 500;

function toSvgX(lng: number): number {
  const p = project(0, lng, ZOOM);
  return +(((p.x - BOUNDS.left) / (BOUNDS.right - BOUNDS.left)) * MAP_W).toFixed(2);
}

function toSvgY(lat: number): number {
  const p = project(lat, 0, ZOOM);
  return +(((p.y - BOUNDS.top) / (BOUNDS.bottom - BOUNDS.top)) * MAP_H).toFixed(2);
}

function TileLayer({ onReady }: { onReady: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startX = Math.floor(BOUNDS.left / TILE_SIZE);
    const endX = Math.floor(BOUNDS.right / TILE_SIZE);
    const startY = Math.floor(BOUNDS.top / TILE_SIZE);
    const endY = Math.floor(BOUNDS.bottom / TILE_SIZE);

    const total = (endX - startX + 1) * (endY - startY + 1);
    let loaded = 0;

    for (let tx = startX; tx <= endX; tx++) {
      for (let ty = startY; ty <= endY; ty++) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          loaded++;
          const sx = (tx * TILE_SIZE - BOUNDS.left) / (BOUNDS.right - BOUNDS.left) * MAP_W;
          const sy = (ty * TILE_SIZE - BOUNDS.top) / (BOUNDS.bottom - BOUNDS.top) * MAP_H;
          const sw = TILE_SIZE / (BOUNDS.right - BOUNDS.left) * MAP_W;
          const sh = TILE_SIZE / (BOUNDS.bottom - BOUNDS.top) * MAP_H;
          ctx.drawImage(img, sx, sy, sw, sh);
          if (loaded === total) onReady();
        };
        img.onerror = () => {
          loaded++;
          if (loaded === total) onReady();
        };
        // CartoDB dark tiles — free, no API key
        img.src = `https://basemaps.cartocdn.com/dark_all/${ZOOM}/${tx}/${ty}@2x.png`;
      }
    }
  }, [onReady]);

  return (
    <canvas
      ref={canvasRef}
      width={MAP_W}
      height={MAP_H}
      className="absolute inset-0 w-full h-full"
    />
  );
}

export default function FootprintMap({ embedded }: { embedded?: boolean }) {
  const [tilesReady, setTilesReady] = useState(false);

  const mapLayer = (
    <>
      {/* Map tile background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <TileLayer onReady={() => setTilesReady(true)} />
      </div>

      {/* City markers overlay */}
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: tilesReady ? 1 : 0, transition: "opacity 0.5s" }}
      >
        {cities.map((city) => {
          const cx = toSvgX(city.lng);
          const cy = toSvgY(city.lat);
          const isCurrent = city.name === currentCity;

          return (
            <g key={city.name}>
              <circle
                cx={cx}
                cy={cy}
                r={isCurrent ? 3.5 : 2.5}
                fill={isCurrent ? "#007aff" : "rgba(255,255,255,0.7)"}
                stroke={isCurrent ? "#fff" : "rgba(0,0,0,0.4)"}
                strokeWidth={isCurrent ? 1.5 : 0.8}
              />
              {!isCurrent && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />
              )}
              <text
                x={cx + 7}
                y={cy + 4}
                fill="rgba(255,255,255,0.7)"
                fontSize="9"
                fontFamily="system-ui, sans-serif"
                fontWeight={isCurrent ? 600 : 400}
              >
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Current location pulse ring */}
        {(() => {
          const cur = cities.find((c) => c.name === currentCity);
          if (!cur) return null;
          const cx = toSvgX(cur.lng);
          const cy = toSvgY(cur.lat);
          return (
            <>
              <motion.circle
                cx={cx}
                cy={cy}
                r={3.5}
                fill="none"
                stroke="#007aff"
                strokeWidth="1.5"
                initial={{ r: 3.5, opacity: 1 }}
                animate={{ r: 16, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={3.5}
                fill="none"
                stroke="#007aff"
                strokeWidth="1.5"
                initial={{ r: 3.5, opacity: 1 }}
                animate={{ r: 16, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 1 }}
              />
              <circle cx={cx} cy={cy} r={3.5} fill="#007aff" />
              <circle
                cx={cx}
                cy={cy}
                r={7}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="2"
              />
            </>
          );
        })()}
      </svg>

      {/* Location badge */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full py-1.5 px-4 shadow-sm border border-white/10">
        <span className="w-2 h-2 rounded-full bg-[#007aff] animate-pulse" />
        <span className="text-xs font-medium text-white/80">
          {currentCity}，当前所在
        </span>
      </div>
    </>
  );

  const content = (
    <>
      <motion.p
        className="text-xs font-medium tracking-widest text-[#6e6e73] mb-4 uppercase text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        足迹地图
      </motion.p>
      <motion.div
        className={`glass rounded-2xl overflow-hidden ${embedded ? "flex-1" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
      >
        {embedded ? (
          <div className="relative h-full min-h-[300px]">
            {mapLayer}
          </div>
        ) : (
          <div className="relative w-full" style={{ paddingBottom: `${(MAP_H / MAP_W) * 100}%` }}>
            {mapLayer}
          </div>
        )}
      </motion.div>
    </>
  );

  if (embedded) {
    return <div className="flex flex-col h-full">{content}</div>;
  }

  return <section className="px-6 max-w-4xl mx-auto mt-20">{content}</section>;
}

"use client";

import { motion } from "framer-motion";

interface City {
  name: string;
  x: number;
  y: number;
}

// Coordinates: x = (lon-73)/62*520+40, y = (54-lat)/36*440+25
const cities: City[] = [
  { name: "成都", x: 299, y: 332 },
  { name: "郑州", x: 380, y: 277 },
  { name: "洛阳", x: 370, y: 279 },
  { name: "深圳", x: 383, y: 433 },
  { name: "广州", x: 377, y: 425 },
  { name: "西安", x: 340, y: 283 },
  { name: "濮阳", x: 392, y: 264 },
  { name: "镇江", x: 430, y: 310 },
  { name: "青岛", x: 438, y: 261 },
  { name: "呼和浩特", x: 365, y: 201 },
  { name: "泰安", x: 410, y: 259 },
];

const currentCity = "郑州";

export default function FootprintMap({ embedded }: { embedded?: boolean }) {
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
        className="glass rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
      >
        <div className="relative">
          <svg
            viewBox="0 0 600 500"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background texture */}
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.5" fill="rgba(0,0,0,0.06)" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="600" height="500" fill="url(#dots)" rx="16" />

            {/* China outline */}
            <path
              d="M568,39 L578,108 L558,128 L522,138 L498,160 L486,180 L475,210 L454,224 L425,236
                 L438,248 L460,251 L448,258 L450,290 L458,326 L448,352 L446,374 L438,392
                 L428,414 L414,444 L390,454 L356,468 L346,450 L338,442 L314,445
                 L282,440 L250,443 L250,404 L238,386 L196,376 L182,366 L164,358 L146,347
                 L116,338 L94,320 L82,275 L62,258 L46,228 L54,206 L76,178 L98,152
                 L122,136 L154,118 L164,114 L194,128 L224,140 L260,150 L312,166 L348,146
                 L400,128 L440,88 L496,74 Z"
              fill="rgba(0,122,255,0.03)"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />

            {/* Taiwan */}
            <path
              d="M470,330 L476,324 L480,332 L482,340 L478,349 L472,351 L467,345 L466,336 Z"
              fill="rgba(0,122,255,0.03)"
              stroke="rgba(0,0,0,0.10)"
              strokeWidth="1.2"
            />

            {/* Hainan */}
            <path
              d="M356,402 L362,396 L368,400 L370,408 L366,416 L358,414 L354,408 Z"
              fill="rgba(0,122,255,0.03)"
              stroke="rgba(0,0,0,0.10)"
              strokeWidth="0.8"
            />

            {/* Province borders (simplified) */}
            <g stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" strokeDasharray="3 3">
              {/* Inner Mongolia / Hebei */}
              <path d="M348,146 L400,128 L440,88 L496,74" />
              <path d="M312,166 L348,146" />
              {/* Henan / Hubei / Shaanxi */}
              <path d="M340,283 L370,279 L392,264 L410,259 L380,277" />
              {/* Sichuan basin */}
              <path d="M299,332 L340,283" />
              {/* Guangdong / Fujian */}
              <path d="M383,433 L428,414" />
              <path d="M377,425 L370,408" />
            </g>

            {/* Visited city markers */}
            {cities.map((city) => {
              const isCurrent = city.name === currentCity;
              return (
                <g key={city.name}>
                  {/* City dot */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isCurrent ? 3 : 2}
                    fill={isCurrent ? "#007aff" : "rgba(0,122,255,0.5)"}
                    fillOpacity={isCurrent ? 1 : 0.6}
                  />
                  {!isCurrent && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={5}
                      fill="none"
                      stroke="rgba(0,122,255,0.15)"
                      strokeWidth="0.5"
                    />
                  )}
                  {/* City name */}
                  <text
                    x={city.x + 6}
                    y={city.y + 3.5}
                    fill="rgba(0,0,0,0.45)"
                    fontSize="8"
                    fontFamily="system-ui, sans-serif"
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
              return (
                <>
                  <motion.circle
                    cx={cur.x}
                    cy={cur.y}
                    r={3}
                    fill="none"
                    stroke="#007aff"
                    strokeWidth="1.5"
                    initial={{ r: 3, opacity: 1 }}
                    animate={{ r: 14, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx={cur.x}
                    cy={cur.y}
                    r={3}
                    fill="none"
                    stroke="#007aff"
                    strokeWidth="1.5"
                    initial={{ r: 3, opacity: 1 }}
                    animate={{ r: 14, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 1 }}
                  />
                  <circle cx={cur.x} cy={cur.y} r={3} fill="#007aff" />
                  {/* White halo */}
                  <circle
                    cx={cur.x}
                    cy={cur.y}
                    r={6}
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                  />
                </>
              );
            })()}
          </svg>

          {/* Location badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-4 shadow-sm border border-black/[0.06]">
            <span className="w-2 h-2 rounded-full bg-[#007aff] animate-pulse" />
            <span className="text-xs font-medium text-[#1d1d1f]">
              {currentCity}，当前所在
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );

  if (embedded) {
    return content;
  }

  return <section className="px-6 max-w-4xl mx-auto mt-20">{content}</section>;
}

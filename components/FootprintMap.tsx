"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface City {
  name: string;
  x: number;
  y: number;
}

const cities: City[] = [
  { name: "成都", x: 510, y: 265 },
  { name: "郑州", x: 548, y: 248 },
  { name: "洛阳", x: 543, y: 249 },
  { name: "深圳", x: 555, y: 298 },
  { name: "广州", x: 551, y: 296 },
  { name: "西安", x: 526, y: 251 },
  { name: "濮阳", x: 553, y: 242 },
  { name: "镇江", x: 569, y: 258 },
  { name: "青岛", x: 574, y: 240 },
  { name: "呼和浩特", x: 539, y: 221 },
  { name: "泰安", x: 564, y: 245 },
];

export default function FootprintMap({ embedded }: { embedded?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

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
        className="glass rounded-2xl p-4 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
      >
        <svg
          viewBox="0 0 800 500"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Eurasia */}
          <path
            d="M440 90 L470 80 L500 75 L530 78 L560 82 L580 85 L600 90 L620 85 L640 80 L660 85 L680 90 L700 95 L710 105 L715 115 L720 125 L710 130 L700 125 L680 120 L660 115 L640 110 L620 108 L600 105 L580 110 L560 115 L540 120 L520 125 L500 130 L480 135 L460 140 L445 145 L430 150 L420 145 L425 135 L430 120 L435 105 L440 90Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* Europe */}
          <path
            d="M355 130 L370 120 L385 115 L400 118 L415 120 L425 125 L430 130 L425 140 L420 145 L415 150 L410 155 L400 150 L390 148 L380 145 L370 142 L360 138 L355 130Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* Africa */}
          <path
            d="M370 180 L390 175 L410 170 L425 175 L435 185 L440 200 L440 215 L435 235 L425 255 L415 270 L405 285 L395 295 L385 290 L375 275 L368 260 L362 245 L358 230 L355 215 L355 200 L360 190 L370 180Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* North America */}
          <path
            d="M100 140 L120 130 L140 120 L160 115 L180 110 L200 108 L220 110 L240 115 L250 120 L255 125 L250 130 L245 135 L240 140 L235 145 L225 150 L215 155 L205 160 L195 165 L185 160 L175 155 L165 150 L155 145 L145 140 L135 145 L125 150 L115 155 L105 150 L100 140Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* South America */}
          <path
            d="M215 310 L225 305 L235 300 L240 310 L245 320 L240 335 L235 350 L230 365 L225 380 L220 395 L215 405 L210 395 L205 380 L200 365 L198 350 L200 335 L205 320 L210 310 L215 310Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* Southeast Asia */}
          <path
            d="M580 145 L600 140 L615 145 L625 155 L630 165 L625 170 L615 168 L605 165 L595 160 L585 155 L580 145Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* Australia */}
          <path
            d="M610 310 L630 300 L650 295 L665 300 L675 310 L680 325 L675 340 L665 350 L650 355 L635 350 L625 340 L618 325 L610 310Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* Japan */}
          <path
            d="M700 125 L705 130 L708 140 L705 150 L700 155 L695 150 L693 140 L695 130 L700 125Z"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line
              key={`h${i}`}
              x1={100 + i * 75}
              y1={50}
              x2={100 + i * 75}
              y2={430}
              stroke="rgba(0,0,0,0.04)"
              strokeWidth="0.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`v${i}`}
              x1={80}
              y1={80 + i * 60}
              x2={740}
              y2={80 + i * 60}
              stroke="rgba(0,0,0,0.04)"
              strokeWidth="0.5"
            />
          ))}
          {/* City markers */}
          {cities.map((city) => (
            <g key={city.name}>
              {/* Glow ring */}
              <circle
                cx={city.x}
                cy={city.y}
                r={hovered === city.name ? 8 : 4}
                fill="none"
                stroke={hovered === city.name ? "#007aff" : "rgba(0,122,255,0.25)"}
                strokeWidth={hovered === city.name ? 1.5 : 0.8}
                className="transition-all duration-300"
              />
              {/* Dot */}
              <circle
                cx={city.x}
                cy={city.y}
                r={2}
                fill="#007aff"
              />
              {/* Hover area */}
              <circle
                cx={city.x}
                cy={city.y}
                r={12}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Label */}
              {hovered === city.name && (
                <motion.g
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={city.x - 18}
                    y={city.y - 32}
                    width={36}
                    height={20}
                    rx={6}
                    fill="rgba(0,0,0,0.8)"
                  />
                  <text
                    x={city.x}
                    y={city.y - 18}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="500"
                  >
                    {city.name}
                  </text>
                </motion.g>
              )}
            </g>
          ))}
          {/* Legend */}
          <g transform="translate(680, 420)">
            <circle cx="0" cy="0" r="2" fill="#007aff" />
            <text x="10" y="3" fill="rgba(0,0,0,0.4)" fontSize="10">
              已点亮
            </text>
          </g>
        </svg>
      </motion.div>
    </>
  );

  if (embedded) {
    return content;
  }

  return <section className="px-6 max-w-4xl mx-auto mt-20">{content}</section>;
}

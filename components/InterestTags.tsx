"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const tags = [
  { label: "游戏", icon: "🎮", color: "from-violet-500/10 to-purple-500/5" },
  { label: "音乐", icon: "🎵", color: "from-pink-500/10 to-rose-500/5" },
  { label: "运动", icon: "⚽", color: "from-emerald-500/10 to-teal-500/5" },
];

export default function InterestTags() {
  const [tapped, setTapped] = useState<string | null>(null);

  return (
    <section className="px-6 max-w-4xl mx-auto mt-20">
      <motion.p
        className="text-xs font-medium tracking-widest text-[#86868b] mb-5 uppercase text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        兴趣标签
      </motion.p>
      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag, i) => (
          <motion.button
            key={tag.label}
            className={`relative glass rounded-2xl px-7 py-4 flex items-center gap-3 overflow-hidden`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTapped(tag.label);
              setTimeout(() => setTapped(null), 600);
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tag.color} opacity-0 hover:opacity-100 transition-opacity duration-300`} />
            <motion.span
              className="text-2xl relative z-10"
              animate={
                tapped === tag.label
                  ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {tag.icon}
            </motion.span>
            <span className="text-sm font-medium relative z-10">{tag.label}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

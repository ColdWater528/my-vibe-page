"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LocationData {
  country: string;
  region: string;
  flag: string;
}

export default function LiveLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
        <motion.div
          className="relative w-2.5 h-2.5"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400" />
          <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
        </motion.div>
        {loading ? (
          <span className="text-xs text-[#6e6e73]">定位中...</span>
        ) : location ? (
          <span className="text-xs font-medium">
            <span className="text-[#6e6e73]">访客来自 </span>
            {location.flag} {location.region || location.country}
          </span>
        ) : (
          <span className="text-xs text-[#6e6e73]">无法获取位置</span>
        )}
      </div>
    </motion.div>
  );
}

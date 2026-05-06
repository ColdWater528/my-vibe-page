"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/photos.json")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(Array.isArray(data) ? data : data.photos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && photos.length === 0) {
    return null;
  }

  return (
    <section className="px-6 max-w-4xl mx-auto mt-20">
      <motion.p
        className="text-xs font-medium tracking-widest text-[#86868b] mb-5 uppercase text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        相册
      </motion.p>
      {loading ? (
        <div className="glass rounded-3xl p-12 text-center text-[#86868b] text-sm">
          加载中...
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo}
              className="glass rounded-2xl overflow-hidden break-inside-avoid"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 6) * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <img
                src={`/photos/${photo}`}
                alt={`Photo ${i + 1}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

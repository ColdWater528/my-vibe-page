"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Song {
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
}

function SongCover({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-[#86868b]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-lg bg-white/5 overflow-hidden shrink-0">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function MusicCard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/music.json")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="px-6 max-w-4xl mx-auto mt-20">
      <motion.p
        className="text-xs font-medium tracking-widest text-[#86868b] mb-5 uppercase text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        最近在听
      </motion.p>
      <motion.div
        className="glass rounded-3xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-8 rounded-full bg-white/20 animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ) : songs.length === 0 ? (
          <p className="text-center text-[#86868b] py-8 text-sm">
            暂无听歌记录，等待 GitHub Action 生成...
          </p>
        ) : (
          <div className="space-y-2">
            {songs.slice(0, 5).map((song, i) => (
              <motion.a
                key={i}
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-xs text-[#86868b] w-5 text-right font-mono tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SongCover src={song.cover} name={song.name} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{song.name}</p>
                  <p className="text-xs text-[#86868b] truncate">
                    {song.artist} · {song.album}
                  </p>
                </div>
                <div className="text-[#86868b] shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

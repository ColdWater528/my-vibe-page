"use client";

import { motion } from "framer-motion";

const socials = [
  {
    name: "GitHub",
    handle: "ColdWater528",
    url: "https://github.com/ColdWater528",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
  },
  {
    name: "Email",
    handle: "2018104032@qq.com",
    url: "mailto:2018104032@qq.com",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    color: "hover:shadow-[0_4px_20px_rgba(0,122,255,0.12)]",
  },
  {
    name: "网易云音乐",
    handle: "ColdWater528",
    url: "https://music.163.com/#/user/home?id=5138152592",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5c-.491 0-.955-.219-1.28-.56-.581.436-1.34.71-2.22.71-2.07 0-3.75-1.54-3.75-3.43 0-.34.054-.67.155-.98l2.32 2.32 1.06-1.06-3.57-3.57c.37-.48.91-.78 1.53-.78 1.16 0 2.16.87 2.69 2.07.34-.35.8-.57 1.31-.57 1.07 0 1.93.9 1.94 1.94-.01 1.07-.87 1.94-1.93 1.94z"/>
      </svg>
    ),
    color: "hover:shadow-[0_4px_20px_rgba(236,65,65,0.12)]",
  },
];

export default function SocialCards() {
  return (
    <section className="px-6 max-w-4xl mx-auto">
      <motion.p
        className="text-xs font-medium tracking-widest text-[#6e6e73] mb-5 uppercase text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        找到我
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socials.map((social, i) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`glass rounded-2xl p-5 flex items-center gap-4 transition-shadow duration-300 ${social.color}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <div className="w-10 h-10 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0">
              {social.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6e6e73]">{social.name}</p>
              <p className="text-sm font-medium truncate">{social.handle}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-xs font-medium tracking-widest text-[#6e6e73] mb-6 uppercase">
          Vibe Coding
        </p>
        <h1 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
          用 Vibe Coding 的方式，
          <br />
          把想法变成属于我的
          <br />
          <span className="text-[#007aff]">数字角落</span>
        </h1>
        <motion.p
          className="mt-6 text-base text-[#6e6e73] max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          一个安静的空间，记录我所热爱的一切。
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-5 h-8 rounded-full border border-black/10 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-black/20 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}

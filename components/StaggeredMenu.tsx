"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "首页", href: "/" },
  { label: "联系", href: "#socials" },
  { label: "兴趣", href: "#interests" },
  { label: "音乐", href: "#music" },
  { label: "足迹", href: "#footprint" },
  { label: "相册", href: "#gallery" },
];

const stagger = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
  closed: {
    x: -80,
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

const accent = "#3B82F6";

export default function StaggeredMenu() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 left-6 z-[100] w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] p-3 cursor-pointer transition-shadow duration-300 hover:shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        <motion.span
          className="block h-[1.5px] rounded-full"
          style={{ width: 18, background: open ? accent : "#1d1d1f" }}
          animate={
            open
              ? { rotate: 45, y: 3.5, width: 18 }
              : { rotate: 0, y: 0, width: 18 }
          }
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[1.5px] rounded-full"
          style={{ width: 14, background: open ? accent : "#1d1d1f" }}
          animate={
            open
              ? { rotate: -45, y: -3.5, width: 18 }
              : { rotate: 0, y: 0, width: 14 }
          }
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Menu panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[98]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            />

            {/* Panel */}
            <motion.nav
              className="fixed top-0 left-0 bottom-0 z-[99] w-72 flex flex-col justify-center px-10"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,252,0.98) 100%)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                borderRight: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "8px 0 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Accent line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              />

              {/* Menu items */}
              <motion.ul
                className="flex flex-col gap-2"
                variants={stagger}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {menuItems.map((item) => (
                  <motion.li key={item.label} variants={itemVariants}>
                    <a
                      href={item.href}
                      onClick={close}
                      className="group relative block py-3 px-4 -mx-4 rounded-xl text-lg font-medium tracking-wide transition-colors duration-200"
                      style={{
                        color: "#1d1d1f",
                      }}
                    >
                      {/* Hover background */}
                      <span
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: `${accent}0D` }}
                      />

                      {/* Accent dot */}
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-0"
                        style={{ background: accent, marginLeft: -4 }}
                      />

                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Bottom tagline */}
              <motion.div
                className="absolute bottom-10 left-10 right-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#86868b" }}
                >
                  Vibe Corner
                  <br />
                  <span style={{ color: accent }}>@ColdWater528</span>
                </p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

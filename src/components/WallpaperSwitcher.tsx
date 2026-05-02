"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";
import { FiImage } from "react-icons/fi";

const wallpapers = [
  { id: "Space-Nebula", name: "Space Nebula" },
  { id: "Tokyo_Pink", name: "Tokyo Pink" },
  { id: "Dreamy-Aesthetic", name: "Dreamy Aesthetic" },
  { id: "Lofi-Desktop", name: "Lofi Desktop" },
  { id: "Techno-Geek", name: "Techno Geek" }
];

export default function WallpaperSwitcher() {
  const { wallpaper, setWallpaper } = useDesktopStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-12 right-2 z-[8500]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container-highest transition-colors group"
      >
        <FiImage className="text-foreground/70 group-hover:text-primary transition-colors" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, originX: 1, originY: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-10 right-0 glass-panel p-2 rounded-xl border border-white/10 w-40 flex flex-col gap-1 shadow-2xl"
          >
            <div className="text-xs font-mono text-foreground/50 px-2 pb-1 mb-1 border-b border-white/5">
              Wallpapers
            </div>
            {wallpapers.map((wp) => (
              <button
                key={wp.id}
                onClick={() => {
                  setWallpaper(wp.id);
                  setIsOpen(false);
                }}
                className={`text-left px-2 py-1.5 rounded-lg text-sm transition-all font-mono ${
                  wallpaper === wp.id ? "bg-primary/20 text-primary border border-primary/30" : "text-foreground hover:bg-surface-container-highest border border-transparent"
                }`}
              >
                {wp.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useDesktopStore, AppId } from "@/store/useDesktopStore";
import { FiFolder, FiTerminal, FiFileText, FiMail, FiGrid } from "react-icons/fi";
import { IconType } from "react-icons";

interface DockItem {
  id: AppId;
  label: string;
  icon: IconType;
}

const dockItems: DockItem[] = [
  { id: "explorer", label: "Finder", icon: FiFolder },
  { id: "terminal", label: "Terminal", icon: FiTerminal },
  { id: "resume", label: "Resume", icon: FiFileText },
  { id: "contact", label: "Contact", icon: FiMail },
];

export default function Dock() {
  const { openWindow, windows, focusedWindow, toggleLauncher } = useDesktopStore();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl px-4 py-2 rounded-2xl flex items-center gap-3 z-[8000]"
    >
      {/* App Finder Button */}
      <button 
        onClick={toggleLauncher}
        className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors group relative"
      >
        <FiGrid className="text-2xl text-white group-hover:-translate-y-1 transition-transform" />
      </button>
      
      <div className="w-px h-8 bg-white/20 mx-2" />

      {dockItems.map((item) => {
        const isOpen = windows[item.id]?.isOpen;
        const isFocused = focusedWindow === item.id;

        return (
          <div key={item.id} className="relative group">
            <motion.button
              whileHover={{ scale: 1.25, y: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => openWindow(item.id, item.label)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isOpen 
                  ? isFocused ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(0,242,255,0.3)]" : "bg-surface-container-high text-foreground border border-white/10" 
                  : "bg-surface-container hover:bg-surface-container-highest text-foreground/80 hover:text-foreground border border-transparent"
              }`}
            >
              <item.icon className="text-xl" />
            </motion.button>
            
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-container-highest text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 font-sans">
              {item.label}
            </div>

            {/* Active Indicator */}
            {isOpen && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_rgba(0,242,255,0.8)]" />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}

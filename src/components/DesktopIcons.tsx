"use client";

import { motion } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";
import { FcFolder } from "react-icons/fc";
import { FiFileText } from "react-icons/fi";

const desktopIcons = [
  { id: "projects-folder", label: "Projects", icon: <FcFolder className="text-[48px]" /> },
  { id: "resume", label: "Resume.pdf", icon: <div className="w-10 h-12 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex flex-col items-center justify-center text-red-400 overflow-hidden relative"><div className="absolute top-0 w-full h-3 bg-red-600 flex items-center justify-center text-[6px] font-bold text-white tracking-widest">PDF</div><FiFileText className="text-xl mt-2" /></div> },
  { id: "about", label: "About Me", icon: <div className="w-12 h-12 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex items-center justify-center text-blue-400 font-bold font-serif text-xl">A</div> },
];
import { useState } from "react";

export default function DesktopIcons() {
  const { openWindow } = useDesktopStore();
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({
    "projects-folder": { x: 0, y: 0 },
    "resume": { x: 0, y: 0 },
    "about": { x: 0, y: 0 }
  });

  const handleDoubleClick = (id: string) => {
    if (id === "projects-folder") {
      openWindow("explorer", "Finder");
      setTimeout(() => window.dispatchEvent(new CustomEvent('open-finder-file', { detail: { id: 'projects-folder', type: 'folder' } })), 100);
    } else if (id === "resume") {
      openWindow("resume", "Resume");
    } else if (id === "about") {
      openWindow("explorer", "Finder");
      setTimeout(() => window.dispatchEvent(new CustomEvent('open-finder-file', { detail: { id: 'about', type: 'file' } })), 100);
    }
  };

  const snapToGrid = (event: any, info: any, id: string) => {
    const gridX = 104;
    const gridY = 104;
    const snappedX = Math.round(info.offset.x / gridX) * gridX;
    const snappedY = Math.round(info.offset.y / gridY) * gridY;
    setPositions(prev => ({
      ...prev,
      [id]: { x: snappedX, y: snappedY }
    }));
  };

  return (
    <div className="absolute inset-y-0 left-0 pt-20 pb-24 pl-6 pr-4 flex flex-col gap-6 items-start justify-start pointer-events-none z-20">
      {desktopIcons.map((icon) => (
        <motion.div
          key={icon.id}
          drag
          dragMomentum={false}
          dragElastic={0.05}
          onDragEnd={(e, info) => snapToGrid(e, info, icon.id)}
          animate={positions[icon.id] || { x: 0, y: 0 }}
          onDoubleClick={() => handleDoubleClick(icon.id)}
          className="flex flex-col items-center gap-1.5 cursor-pointer group w-24 p-2 rounded-xl hover:bg-white/10 transition-all pointer-events-auto"
        >
          <div className="drop-shadow-lg group-hover:scale-105 transition-transform">
            {icon.icon}
          </div>
          <span className="text-[11px] text-white font-medium text-center drop-shadow-md px-2 py-0.5 rounded group-hover:bg-[#0058d0] transition-colors select-none">
            {icon.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

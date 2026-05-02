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

export default function DesktopIcons() {
  const { openWindow } = useDesktopStore();

  const handleDoubleClick = (id: string) => {
    if (id === "projects-folder") {
      openWindow("explorer", "Finder");
      // Optionally we could set the explorer to show projects folder here, 
      // but openWindow is basic currently.
    } else if (id === "resume") {
      openWindow("resume", "Resume");
    } else if (id === "about") {
      openWindow("explorer", "Finder");
      // Since About is inside Explorer now, we just open Explorer.
    }
  };

  return (
    <div className="absolute inset-0 p-8 flex flex-col flex-wrap gap-4 items-start content-start pointer-events-none">
      {desktopIcons.map((icon) => (
        <motion.div
          key={icon.id}
          drag
          dragMomentum={false}
          onDoubleClick={() => handleDoubleClick(icon.id)}
          className="flex flex-col items-center gap-1 cursor-pointer group w-24 p-2 rounded-lg hover:bg-white/10 transition-all pointer-events-auto"
        >
          <div className="drop-shadow-lg group-hover:scale-105 transition-transform">
            {icon.icon}
          </div>
          <span className="text-[11px] text-white font-medium text-center drop-shadow-md px-1.5 py-0.5 rounded group-hover:bg-[#0058d0]">
            {icon.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

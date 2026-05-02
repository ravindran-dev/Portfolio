"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";
import BootScreen from "./BootScreen";
import Waybar from "./Waybar";
import Dock from "./Dock";
import RofiLauncher from "./RofiLauncher";
import WallpaperSwitcher from "./WallpaperSwitcher";

import Explorer from "@/apps/Explorer";
import Terminal from "@/apps/Terminal";
import Resume from "@/apps/Resume";
import Contact from "@/apps/Contact";

const getWallpaperBg = (wallpaper: string) => {
  switch (wallpaper) {
    case "Space-Nebula":
      return "bg-[url('/assets/Space-Nebula.png')]";
    case "Tokyo_Pink":
      return "bg-[url('/assets/Tokyo_Pink.png')]";
    case "Dreamy-Aesthetic":
      return "bg-[url('/assets/Dreamy-Aesthetic-Home-Under-Moonlight.png')]";
    case "Lofi-Desktop":
      return "bg-[url('/assets/Lofi-Desktop-Man-Studying.png')]";
    case "Techno-Geek":
      return "bg-[url('/assets/Techno-Geek.png')]";
    default:
      return "bg-[#0a0a0a]";
  }
};

export default function DesktopEnvironment() {
  const { booted, wallpaper, activeWorkspace, windows } = useDesktopStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        useDesktopStore.getState().toggleLauncher();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col font-sans selection:bg-primary/30">
      {/* Background Layer */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${getWallpaperBg(wallpaper)}`}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <AnimatePresence>
        {!booted && <BootScreen key="bootscreen" />}
      </AnimatePresence>

      {/* Desktop Interface */}
      {booted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-10"
        >
          <Waybar />
          <WallpaperSwitcher />
          
          {/* Workspaces container (simulating Hyprland workspaces) */}
          <motion.div 
            className="absolute inset-0 top-10 bottom-20 flex transition-transform duration-500 ease-in-out pointer-events-none"
            style={{ transform: `translateX(-${(activeWorkspace - 1) * 100}vw)` }}
          >
            {[1, 2, 3, 4, 5].map((ws) => (
              <div key={ws} className="w-screen h-full shrink-0 relative pointer-events-none">
                <div className="absolute inset-0">
                  {Object.values(windows).some(w => w.id === 'explorer' && w.workspaceId === ws) && <Explorer />}
                  {Object.values(windows).some(w => w.id === 'terminal' && w.workspaceId === ws) && <Terminal />}
                  {Object.values(windows).some(w => w.id === 'resume' && w.workspaceId === ws) && <Resume />}
                  {Object.values(windows).some(w => w.id === 'contact' && w.workspaceId === ws) && <Contact />}
                </div>
              </div>
            ))}
          </motion.div>

          <Dock />
          <RofiLauncher />
        </motion.div>
      )}
    </div>
  );
}

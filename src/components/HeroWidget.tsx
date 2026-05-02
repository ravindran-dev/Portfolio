"use client";

import { motion } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";

export default function HeroWidget() {
  const { openWindow, activeWorkspace } = useDesktopStore();

  // Only show on the first workspace to act as the main "Home"
  if (activeWorkspace !== 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] p-10 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md pointer-events-auto"
      style={{
        background: "linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(10,10,15,0.9) 100%)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.1)"
      }}
    >
      {/* Logo badge — top right */}

      <div className="flex flex-col items-start gap-4">
        <h3 className="text-[#00ffd5] text-sm font-bold tracking-[0.2em] uppercase">Status: Ready to Build</h3>
        
        <div className="flex items-center gap-4 mt-2">
          <img src="/assets/logo.png" alt="Logo" className="w-14 h-14 object-contain drop-shadow-[0_0_12px_rgba(0,255,213,0.4)] shrink-0" />
          <h1 className="text-white text-3xl font-bold">
            Hello, I'm <span className="text-[#00ffd5]">Ravindran!</span><br/>
            <span className="text-white/60 text-2xl font-medium tracking-tight">AI/ML Engineer.</span>
          </h1>
        </div>
        
        <p className="text-white/70 text-sm leading-relaxed mt-2 max-w-md">
          Crafting intelligent digital systems. I blend machine learning precision with robust backend architecture to build scalable, high-performance applications.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button 
            onClick={() => {
              openWindow("explorer", "Finder");
              setTimeout(() => window.dispatchEvent(new CustomEvent('open-finder-file', { detail: { id: 'projects-folder', type: 'folder' } })), 100);
            }}
            className="px-6 py-2.5 bg-[#00ffd5] text-black font-bold text-sm tracking-wider uppercase rounded hover:bg-[#00ffd5]/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,255,213,0.4)]"
          >
            View Projects
          </button>
          <button 
            onClick={() => openWindow("contact", "Contact")}
            className="px-6 py-2.5 bg-transparent border border-white/20 text-white font-bold text-sm tracking-wider uppercase rounded hover:border-[#00ffd5] hover:text-[#00ffd5] transition-all"
          >
            Contact Me
          </button>
        </div>
      </div>
    </motion.div>
  );
}

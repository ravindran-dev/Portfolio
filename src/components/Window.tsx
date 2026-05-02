"use client";

import { useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { useDesktopStore, AppId } from "@/store/useDesktopStore";
import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi";

interface WindowProps {
  id: AppId;
  title?: string;
  children: React.ReactNode | ((startDrag: (event: React.PointerEvent) => void) => React.ReactNode);
  defaultWidth?: number;
  defaultHeight?: number;
  variant?: "default" | "macos-dark";
  hideHeader?: boolean;
}

export default function Window({ 
  id, 
  title, 
  children, 
  defaultWidth = 800, 
  defaultHeight = 600,
  variant = "default",
  hideHeader = false
}: WindowProps) {
  const windowState = useDesktopStore((state) => state.windows[id]);
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, focusedWindow } = useDesktopStore();
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  if (!windowState || !windowState.isOpen) return null;

  const isFocused = focusedWindow === id;

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event);
  };

  const isMacosDark = variant === "macos-dark";

  return (
    <motion.div
      ref={windowRef}
      drag={!windowState.isMaximized}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: window.innerHeight - 50, left: -window.innerWidth + 100, right: window.innerWidth - 100 }}
      dragElastic={0}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={
        windowState.isMaximized
          ? { width: "100vw", height: "calc(100vh - 40px)", top: 40, left: 0, x: 0, y: 0, scale: 1, opacity: 1 }
          : windowState.isMinimized
          ? { scale: 0, opacity: 0, y: 200 }
          : { scale: 1, opacity: 1 }
      }
      exit={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      onPointerDown={() => focusWindow(id)}
      style={{ 
        zIndex: windowState.zIndex,
        width: windowState.isMaximized ? undefined : defaultWidth,
        height: windowState.isMaximized ? undefined : defaultHeight,
        ...(isMacosDark ? {
          background: "rgba(30, 30, 30, 0.78)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          boxShadow: isFocused ? "0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)" : "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
          borderRadius: "14px"
        } : {})
      }}
      className={`absolute flex flex-col overflow-hidden max-w-[100vw] max-h-[calc(100vh-40px)] pointer-events-auto ${
        !windowState.isMaximized && "resize" 
      } ${
        !isMacosDark && "glass-panel rounded-xl"
      } ${
        !isMacosDark && isFocused ? "neon-border shadow-[0_0_20px_rgba(0,242,255,0.15)]" : !isMacosDark && "border-white/10"
      }`}
    >
      {/* Default Title Bar */}
      {!hideHeader && (
        <div 
          onPointerDown={startDrag}
          className={`h-10 flex items-center justify-between px-4 select-none touch-none ${
            isFocused ? "bg-surface-container-highest/80" : "bg-surface-container-low/80"
          } border-b border-white/5 cursor-grab active:cursor-grabbing w-full shrink-0`}
        >
          <div className="flex items-center gap-2">
            <button 
              onPointerDown={(e) => { e.stopPropagation(); }} 
              onClick={(e) => { e.stopPropagation(); closeWindow(id); }} 
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/90 border border-[#e0443e] flex items-center justify-center group transition-colors"
            >
              <FiX className="text-black/60 text-[10px] opacity-0 group-hover:opacity-100" />
            </button>
            <button 
              onPointerDown={(e) => { e.stopPropagation(); }} 
              onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} 
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/90 border border-[#dea123] flex items-center justify-center group transition-colors"
            >
              <FiMinus className="text-black/60 text-[10px] opacity-0 group-hover:opacity-100" />
            </button>
            <button 
              onPointerDown={(e) => { e.stopPropagation(); }} 
              onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} 
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/90 border border-[#1aab29] flex items-center justify-center group transition-colors"
            >
              <FiMaximize2 className="text-black/60 text-[8px] opacity-0 group-hover:opacity-100 rotate-45" />
            </button>
          </div>
          <div className="text-foreground/80 font-mono text-sm tracking-widest font-bold pointer-events-none">
            {title || windowState.title}
          </div>
          <div className="w-[54px]" /> 
        </div>
      )}

      {/* Window Content */}
      <div className={`flex-1 flex flex-col relative w-full h-full min-h-0 ${!isMacosDark && "overflow-hidden"}`}>
        {typeof children === "function" ? children(startDrag) : children}
      </div>
    </motion.div>
  );
}

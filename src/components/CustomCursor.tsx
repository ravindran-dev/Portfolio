"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Direct motion values for 1:1 movement (no lag)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const moveMouse = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev, newRipple]);
    };

    if (isDesktop) {
      window.addEventListener("mousemove", moveMouse);
      window.addEventListener("mousedown", handleMouseDown);
      
      // Hide default cursor
      document.body.style.cursor = "none";
      const style = document.createElement('style');
      style.innerHTML = `
        * { cursor: none !important; }
      `;
      document.head.appendChild(style);
    }

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousedown", handleMouseDown);
      document.body.style.cursor = "auto";
    };
  }, [isDesktop, isVisible, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Background trail lighting effect */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              left: 8,
              top: 8,
            }}
            className="absolute w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Cursor Tip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              left: -4, // Small adjustment to align tip
              top: -4,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="pointer-events-none"
          >
            {/* User Provided SVG Shape with Integrated Neon Glow */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none"
            >
              {/* Outer Neon Glow (Stroke only) */}
              <path 
                d="M20.5056 10.7754C21.1225 10.5355 21.431 10.4155 21.5176 10.2459C21.5926 10.099 21.5903 9.92446 21.5115 9.77954C21.4205 9.61226 21.109 9.50044 20.486 9.2768L4.59629 3.5728C4.0866 3.38983 3.83175 3.29835 3.66514 3.35605C3.52029 3.40621 3.40645 3.52004 3.35629 3.6649C3.29859 3.8315 3.39008 4.08635 3.57304 4.59605L9.277 20.4858C9.50064 21.1088 9.61246 21.4203 9.77973 21.5113C9.92465 21.5901 10.0991 21.5924 10.2461 21.5174C10.4157 21.4308 10.5356 21.1223 10.7756 20.5054L13.3724 13.8278C13.4194 13.707 13.4429 13.6466 13.4792 13.5957C13.5114 13.5506 13.5508 13.5112 13.5959 13.479C13.6468 13.4427 13.7072 13.4192 13.828 13.3722L20.5056 10.7754Z" 
                stroke="#00FF9D" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="opacity-40 blur-[3px]"
              />

              {/* Main White/Cyan Stroke */}
              <path 
                d="M20.5056 10.7754C21.1225 10.5355 21.431 10.4155 21.5176 10.2459C21.5926 10.099 21.5903 9.92446 21.5115 9.77954C21.4205 9.61226 21.109 9.50044 20.486 9.2768L4.59629 3.5728C4.0866 3.38983 3.83175 3.29835 3.66514 3.35605C3.52029 3.40621 3.40645 3.52004 3.35629 3.6649C3.29859 3.8315 3.39008 4.08635 3.57304 4.59605L9.277 20.4858C9.50064 21.1088 9.61246 21.4203 9.77973 21.5113C9.92465 21.5901 10.0991 21.5924 10.2461 21.5174C10.4157 21.4308 10.5356 21.1223 10.7756 20.5054L13.3724 13.8278C13.4194 13.707 13.4429 13.6466 13.4792 13.5957C13.5114 13.5506 13.5508 13.5112 13.5959 13.479C13.6468 13.4427 13.7072 13.4192 13.828 13.3722L20.5056 10.7754Z" 
                stroke="#e5fffa" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="rgba(0, 255, 157, 0.05)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.15, opacity: 0.8 }}
          animate={{ scale: 3.2, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
          }}
          style={{
            left: ripple.x,
            top: ripple.y,
            x: "-50%",
            y: "-50%",
          }}
          className="absolute w-8 h-8 rounded-full border border-[#00fbfb] shadow-[0_0_12px_rgba(0,251,251,0.5),inset_0_0_8px_rgba(0,251,251,0.3)] pointer-events-none"
        />
      ))}
    </div>
  );
}

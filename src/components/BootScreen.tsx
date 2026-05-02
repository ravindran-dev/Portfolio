"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";

const bootLogs = [
  "Loading RavindranOS...",
  "Mounting /dev/nvme0n1p2... [OK]",
  "Initializing modules...",
  "Starting system message bus... [OK]",
  "Starting network manager... [OK]",
  "Starting UI compositor (Hyprland)...",
  "Launching workspace..."
];

export default function BootScreen() {
  const [logs, setLogs] = useState<string[]>([]);
  const setBooted = useDesktopStore((state) => state.setBooted);

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 800);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [setBooted]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-background text-foreground font-mono text-sm sm:text-base p-6 overflow-hidden flex flex-col justify-start"
    >
      <div className="flex flex-col gap-1 max-w-2xl w-full mx-auto mt-10">
        <div className="text-primary mb-4 text-xs sm:text-sm">
          RavindranOS (x86_64) v1.0.0
        </div>
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-primary mr-2 font-bold">{">"}</span>
            <span className="text-foreground/90">{log}</span>
          </motion.div>
        ))}
        {logs.length < bootLogs.length && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-2.5 h-4 bg-primary mt-2 ml-4"
          />
        )}
      </div>
    </motion.div>
  );
}

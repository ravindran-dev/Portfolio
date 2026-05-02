"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";

const systemdLogs = [
  "Mounted /boot/efi.",
  "Mounted /home.",
  "Starting systemd-udevd...",
  "Started udev Kernel Device Manager.",
  "Starting Show Plymouth Boot Screen...",
  "Starting Load/Save Random Seed...",
  "Started Show Plymouth Boot Screen.",
  "Started Load/Save Random Seed.",
  "Starting WPA supplicant...",
  "Started WPA supplicant.",
  "Starting Network Manager...",
  "Started Network Manager.",
  "Reached target Network.",
  "Starting Hostname Service...",
  "Started Hostname Service.",
  "Starting Login Service...",
  "Started Login Service.",
  "Starting User Login Management...",
  "Started User Login Management.",
  "Starting Authorization Manager...",
  "Started Authorization Manager.",
  "Starting Daemon for power management...",
  "Started Daemon for power management.",
  "Starting Disk Manager...",
  "Started Disk Manager.",
  "Reached target Graphical Interface.",
  "Starting Wayland Compositor (Hyprland)...",
  "Initializing UI...",
  "Mounting RavindranOS Portfolio System...",
  "Loading Profile...",
  "Welcome to RavindranOS."
];

const neofetchLines = [
  { label: "OS",       value: "RavindranOS x86_64" },
  { label: "Kernel",   value: "6.6.1-arch1-1" },
  { label: "Uptime",   value: "0 mins" },
  { label: "Packages", value: "1337 (pacman)" },
  { label: "Shell",    value: "zsh 5.9" },
  { label: "DE",       value: "Hyprland" },
  { label: "Terminal", value: "kitty" },
  { label: "Role",     value: "AI/ML Engineer" },
];

export default function BootScreen() {
  const setBooted = useDesktopStore((state) => state.setBooted);
  const [phase, setPhase] = useState<"grub" | "systemd" | "neofetch" | "welcome">("grub");
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [logs]);

  // Phase 1: GRUB → systemd
  useEffect(() => {
    const t = setTimeout(() => setPhase("systemd"), 1500);
    return () => clearTimeout(t);
  }, []);

  // Phase 2: systemd logs → neofetch
  useEffect(() => {
    if (phase !== "systemd") return;
    let i = 0;
    const render = () => {
      if (i < systemdLogs.length) {
        setLogs(prev => [...prev, systemdLogs[i]]);
        i++;
        setTimeout(render, Math.random() * 90 + 10);
      } else {
        setTimeout(() => setPhase("neofetch"), 400);
      }
    };
    setTimeout(render, 200);
  }, [phase]);

  // Phase 3: neofetch → welcome
  useEffect(() => {
    if (phase !== "neofetch") return;
    const t = setTimeout(() => setPhase("welcome"), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase 4: welcome → desktop
  useEffect(() => {
    if (phase !== "welcome") return;
    const t = setTimeout(() => setBooted(true), 2500);
    return () => clearTimeout(t);
  }, [phase, setBooted]);

  return (
    <AnimatePresence>
      <motion.div
        key="bootscreen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-[9999] bg-black text-[#a8a8a8] font-mono text-[13px] sm:text-[15px] p-4 overflow-hidden flex flex-col justify-start"
      >
        {/* ── Phase 1: GRUB ── */}
        {phase === "grub" && (
          <div className="w-full max-w-4xl mx-auto mt-10 text-white/90">
            <p className="mb-4 text-center">GNU GRUB  version 2.06</p>
            <div className="border border-white/50 p-2 mb-4">
              <div className="bg-white text-black font-bold p-1">*Arch Linux</div>
              <div className="p-1"> Advanced options for Arch Linux</div>
              <div className="p-1"> UEFI Firmware Settings</div>
            </div>
            <p className="mt-8 animate-pulse">Booting 'Arch Linux' in 1s...</p>
          </div>
        )}

        {/* ── Phase 2: systemd logs ── */}
        {phase === "systemd" && (
          <div className="flex flex-col gap-[2px] w-full max-w-5xl mx-auto overflow-y-auto pb-10">
            <div className="text-white/60 mb-2">
              :: Running hook [udev]<br />
              :: Triggering uevents...
            </div>
            {logs.map((log, i) => (
              <div key={i} className="flex items-start break-words">
                <span className="font-bold text-white mr-2 whitespace-nowrap">
                  [ <span className="text-[#32cd32]"> OK </span> ]
                </span>
                <span className="text-[#e5e5e5]">{log}</span>
              </div>
            ))}
            {logs.length < systemdLogs.length && (
              <div className="flex items-start">
                <span className="font-bold text-white mr-2 whitespace-nowrap">
                  [ <span className="text-yellow-500"> ** </span> ]
                </span>
                <span className="text-[#e5e5e5] animate-pulse">A start job is running...</span>
              </div>
            )}
            <div ref={logsEndRef} />
          </div>
        )}

        {/* ── Phase 3: Neofetch ASCII + system info ── */}
        {phase === "neofetch" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center h-full w-full gap-16"
          >
            {/* Arch ASCII art */}
            <pre className="text-[#00b4d8] text-[11px] sm:text-[13px] leading-tight select-none">{`                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`               \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \``}</pre>

            {/* System info */}
            <div className="flex flex-col gap-1.5">
              <div className="text-[#00b4d8] font-bold text-base mb-2">ravindran@RavindranOS</div>
              <div className="text-white/40 text-xs mb-3">─────────────────────────</div>
              {neofetchLines.map(({ label, value }) => (
                <div key={label} className="flex gap-2 text-sm">
                  <span className="text-[#00b4d8] font-bold w-20 text-right">{label}:</span>
                  <span className="text-white/80">{value}</span>
                </div>
              ))}
              {/* Color blocks */}
              <div className="flex gap-1 mt-4">
                {["#000","#cc0000","#4e9a06","#c4a000","#3465a4","#75507b","#06989a","#d3d7cf"].map(c => (
                  <div key={c} className="w-5 h-4 rounded-sm" style={{ background: c }} />
                ))}
              </div>
              <div className="flex gap-1">
                {["#555753","#ef2929","#8ae234","#fce94f","#729fcf","#ad7fa8","#34e2e2","#eeeeec"].map(c => (
                  <div key={c} className="w-5 h-4 rounded-sm" style={{ background: c }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Phase 4: boot.png fullscreen splash ── */}
        {phase === "welcome" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 flex items-center justify-center overflow-hidden"
          >
            {/* Full-screen background image */}
            <motion.img
              src="/assets/boot.png"
              alt="RavindranOS Boot"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

            {/* Top overlay: OS title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-10 left-0 right-0 flex flex-col items-center gap-2"
            >
              <div className="text-white/90 font-mono text-xs tracking-[0.4em] uppercase">
                RavindranOS — Portfolio Edition
              </div>
              <div className="w-24 h-[1px] bg-[#00b4d8]/60" />
            </motion.div>

            {/* Bottom overlay: loading bar + text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3"
            >
              {/* Animated progress bar */}
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear", delay: 0.8 }}
                  className="h-full bg-[#00b4d8] rounded-full"
                />
              </div>
              <p className="text-white/50 font-mono text-[11px] tracking-[0.35em] uppercase animate-pulse">
                Starting graphical interface...
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore, AppId } from "@/store/useDesktopStore";
import { FiSearch, FiFolder, FiTerminal, FiFileText, FiMail, FiCode } from "react-icons/fi";
import { projectsData } from "@/data/projectsData";

const apps = [
  { id: "explorer", label: "Finder", icon: FiFolder, type: "app" },
  { id: "terminal", label: "Terminal", icon: FiTerminal, type: "app" },
  { id: "resume", label: "Resume", icon: FiFileText, type: "app" },
  { id: "contact", label: "Contact", icon: FiMail, type: "app" },
];

const finderFiles = [
  { id: "about", label: "About Me", icon: FiFileText, type: "file" },
  { id: "skills", label: "Skills", icon: FiCode, type: "file" },
  { id: "projects-folder", label: "Projects Directory", icon: FiFolder, type: "folder" },
  { id: "experience", label: "Experience", icon: FiTerminal, type: "file" },
  { id: "achievements-folder", label: "Achievements Directory", icon: FiFolder, type: "folder" },
  { id: "leetcode", label: "LeetCode Knight", icon: FiFileText, type: "file" },
  { id: "tiforge", label: "Ti Forge 2026", icon: FiFileText, type: "file" },
  { id: "sustainability", label: "Sustainability Hackathon", icon: FiFileText, type: "file" },
  { id: "icpc", label: "ICPC 2025", icon: FiFileText, type: "file" },
  ...Object.keys(projectsData).map((key) => ({
    id: key,
    label: projectsData[key as keyof typeof projectsData].title,
    icon: FiCode,
    type: "project"
  }))
];

const allItems = [...apps, ...finderFiles];

export default function RofiLauncher() {
  const { launcherOpen, toggleLauncher, openWindow } = useDesktopStore();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+Space
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        toggleLauncher();
      }
      if (e.key === 'Escape' && launcherOpen) {
        toggleLauncher();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [launcherOpen, toggleLauncher]);

  useEffect(() => {
    if (launcherOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch("");
    }
  }, [launcherOpen]);

  const filteredApps = allItems.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) || 
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleLaunch = (item: any) => {
    if (item.type === "app") {
      openWindow(item.id as AppId, item.label);
    } else {
      openWindow("explorer", "Finder");
      setTimeout(() => window.dispatchEvent(new CustomEvent('open-finder-file', { detail: { id: item.id, type: item.type } })), 100);
    }
    toggleLauncher();
  };

  return (
    <AnimatePresence>
      {launcherOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={toggleLauncher}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 border border-white/10"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-surface-container-high/50">
              <FiSearch className="text-xl text-primary" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search apps... (e.g. projects, skills)"
                className="w-full bg-transparent border-none outline-none text-foreground text-lg font-sans placeholder-foreground/40"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredApps.length > 0) {
                    handleLaunch(filteredApps[0]);
                  }
                }}
              />
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2 bg-surface/50">
              {filteredApps.length > 0 ? (
                filteredApps.map((app, index) => (
                  <div
                    key={app.id}
                    onClick={() => handleLaunch(app)}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                      index === 0 && search.length > 0 ? "bg-primary/20 border border-primary/30" : "hover:bg-surface-container-highest border border-transparent"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary border border-white/5">
                      <app.icon className="text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-foreground/90">{app.label}</span>
                      <span className="text-[10px] text-foreground/40 uppercase tracking-wider">{app.type}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-foreground/50 font-mono">
                  No applications found matching "{search}"
                </div>
              )}
            </div>
            
            <div className="p-2 bg-surface-container-low text-xs text-foreground/40 text-center border-t border-white/5 font-mono">
              Press Enter to launch selected, Escape to close
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

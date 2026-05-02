"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoGlobeOutline, IoLogoGithub, IoDocumentTextOutline, IoMailOutline, IoRocketOutline } from 'react-icons/io5';

interface DynamicIslandProps {
  activeTab: string;
}

export default function DynamicIsland({ activeTab }: DynamicIslandProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState('Workspace Ready');

  useEffect(() => {
    // Dynamic status messages based on tab
    switch (activeTab) {
      case 'home': setStatus('Workspace Ready'); break;
      case 'about': setStatus('AI/ML Engineer Online'); break;
      case 'projects': setStatus('Viewing Featured Work'); break;
      case 'skills': setStatus('Analyzing Metrics'); break;
      case 'contact': setStatus('Available for Hire'); break;
      default: setStatus('Online');
    }
  }, [activeTab]);

  const getIslandContent = () => {
    switch (activeTab) {
      case 'home':
        return {
          title: "Ravindran S",
          subtitle: "AI/ML Engineer",
          icon: <IoGlobeOutline className="text-[#00fbfb]" />
        };
      case 'about':
        return {
          title: "Chennai Institute",
          subtitle: "B.E. CSE (AIML)",
          icon: <IoDocumentTextOutline className="text-[#00fbfb]" />
        };
      case 'projects':
        return {
          title: "Projects",
          subtitle: "4 Active Builds",
          icon: <IoRocketOutline className="text-[#00fbfb]" />
        };
      default:
        return {
          title: "Workspace",
          subtitle: "Ready to Build",
          icon: <IoGlobeOutline className="text-[#00fbfb]" />
        };
    }
  };

  const content = getIslandContent();

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 pt-2 z-[60] pointer-events-none">
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        initial={false}
        animate={{
          width: isExpanded ? "340px" : "120px",
          height: isExpanded ? "180px" : "32px",
          borderRadius: isExpanded ? "40px" : "16px",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_10px_40px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center relative pointer-events-auto cursor-pointer overflow-hidden backdrop-blur-3xl"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00fbfb] animate-pulse"></div>
              <span className="text-[11px] font-bold text-white/90 tracking-tight uppercase">
                {activeTab}
              </span>
              {/* Camera cutout fake reflection */}
              <div className="w-3 h-3 rounded-full bg-[#111] shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center ml-1">
                <div className="w-1 h-1 bg-[#0a0a0a] rounded-full"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full h-full p-5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-2xl shadow-inner">
                    {content.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#00fbfb] uppercase tracking-wider">{status}</span>
                    <span className="text-[17px] font-bold text-white">{content.title}</span>
                    <span className="text-[14px] text-white/50">{content.subtitle}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#222] border border-white/10 flex items-center justify-center text-white/40">
                  <IoGlobeOutline size={20} />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <a href="https://github.com/ravindran-dev" target="_blank" className="flex-1 py-3 bg-[#111] hover:bg-[#1a1a1a] rounded-2xl border border-white/5 flex items-center justify-center text-white gap-2 transition-colors">
                  <IoLogoGithub size={18} />
                  <span className="text-[13px] font-bold">GitHub</span>
                </a>
                <a href="mailto:ravindrans.dev@gmail.com" className="flex-1 py-3 bg-[#111] hover:bg-[#1a1a1a] rounded-2xl border border-white/5 flex items-center justify-center text-white gap-2 transition-colors">
                  <IoMailOutline size={18} />
                  <span className="text-[13px] font-bold">Contact</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

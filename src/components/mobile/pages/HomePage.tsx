"use client";

import { motion } from 'framer-motion';
import { IoChevronForward, IoCodeSlash, IoSchoolOutline } from 'react-icons/io5';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export default function HomePage({ setActiveTab }: HomePageProps) {
  return (
    <div className="w-full h-full pt-20 pb-32 px-5 flex flex-col gap-5 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex items-center gap-3 mt-4 mb-2"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,251,251,0.4)] overflow-hidden bg-[#111318]">
          <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Ravindran S</h1>
          <p className="text-sm text-[#00fbfb] font-medium tracking-wide">Workspace Ready</p>
        </div>
      </motion.div>

      {/* Hero Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        className="w-full flex-shrink-0 rounded-[24px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-4 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00fbfb]/20 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00fbfb]/10 border border-[#00fbfb]/20 w-max">
          <div className="w-2 h-2 rounded-full bg-[#00fbfb] shadow-[0_0_8px_rgba(0,251,251,1)] animate-pulse"></div>
          <span className="text-[11px] font-mono font-bold text-[#00fbfb] uppercase tracking-wider">Status: Ready to Build</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-1 leading-tight tracking-tight">Hello, I'm Ravindran!</h2>
          <h3 className="text-xl font-semibold text-[#b9cac9]">AI/ML Engineer</h3>
        </div>

        <p className="text-[15px] text-[#e2e2e8]/80 leading-relaxed">
          Building intelligent systems using AI, backend engineering, and scalable architecture.
        </p>

        <div className="flex gap-3 mt-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('projects')}
            className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#00fbfb] to-[#00dddd] text-[#002020] font-semibold text-[15px] shadow-[0_0_20px_rgba(0,251,251,0.3)] flex items-center justify-center gap-1"
          >
            View Projects
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('contact')}
            className="flex-1 py-3.5 rounded-full bg-[#282a2e]/80 border border-white/10 text-white font-medium text-[15px] flex items-center justify-center"
          >
            Contact Me
          </motion.button>
        </div>
      </motion.div>

      {/* Widgets Row */}
      <div className="flex gap-4 w-full h-36 flex-shrink-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={() => setActiveTab('projects')}
          className="flex-1 rounded-[20px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-[#438fff]/20 flex items-center justify-center text-[#438fff]">
            <IoCodeSlash size={18} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">10+</div>
            <div className="text-xs text-[#b9cac9] font-medium mt-0.5">Projects Built</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => setActiveTab('about')}
          className="flex-1 rounded-[20px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-[#ffb4ab]/20 flex items-center justify-center text-[#ffb4ab]">
            <IoSchoolOutline size={18} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">9.24</div>
            <div className="text-xs text-[#b9cac9] font-medium mt-0.5">CGPA Score</div>
          </div>
        </motion.div>
      </div>

      {/* Certifications Highlight */}
      <div className="flex flex-col gap-3 flex-shrink-0">
        <h3 className="text-[13px] font-bold text-[#839493] uppercase tracking-wider ml-2">Certifications</h3>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full rounded-[20px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 p-4 flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00fbfb]/20 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-[#00fbfb] text-lg">C</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-[15px]">Cisco Certified</h4>
              <p className="text-[#b9cac9] text-[13px]">CCNA, Cybersecurity, AI</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#ff7f1c]/20 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-[#ff7f1c] text-lg">N</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-[15px]">NPTEL IoT</h4>
              <p className="text-[#b9cac9] text-[13px]">12-week course (75%)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#4f51dd]/20 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-[#4f51dd] text-lg">U</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-[15px]">Udemy</h4>
              <p className="text-[#b9cac9] text-[13px]">Full Stack Development</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom spacer for scrollability */}
      <div className="h-6"></div>
    </div>
  );
}

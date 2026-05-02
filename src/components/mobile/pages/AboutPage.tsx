"use client";

import { motion } from 'framer-motion';
import { IoDocumentTextOutline, IoSchoolOutline, IoLocationOutline, IoBriefcaseOutline } from 'react-icons/io5';

export default function AboutPage() {
  return (
    <div className="w-full h-full pt-20 pb-32 px-5 overflow-y-auto overflow-x-hidden">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-6 tracking-tight"
      >
        About Me
      </motion.h1>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full rounded-[24px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 p-1 flex flex-col mb-6"
      >
        <div className="w-full h-32 rounded-t-[20px] bg-gradient-to-br from-[#00fbfb]/20 to-[#4f51dd]/20 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-3xl"></div>
        </div>
        
        <div className="px-5 py-6 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-[20px] bg-[#111318] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
              <img src="/assets/photo3.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Ravindran S</h2>
              <p className="text-[#00fbfb] text-[15px] font-medium">AI & ML Engineer</p>
            </div>
          </div>
          
          <div>
            <p className="text-[#b9cac9] text-[15px] leading-relaxed">
              I'm an AI/ML Engineer passionate about building intelligent, scalable systems. With experience spanning full-stack development to deep learning, I specialize in crafting solutions that bridge the gap between complex algorithms and seamless user experiences.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Education & Details */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-3 mb-6"
      >
        <h3 className="text-[13px] font-bold text-[#839493] uppercase tracking-wider ml-2">Background</h3>
        
        <div className="w-full rounded-[20px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#4f51dd]/20 flex items-center justify-center text-[#4f51dd]">
              <IoSchoolOutline size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-[15px]">B.E. CSE (AI & ML)</h4>
              <p className="text-[#839493] text-[13px]">Chennai Institute of Technology</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#00fbfb]/10 text-[#00fbfb] font-bold text-sm">
              9.24 CGPA
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#ff7f1c]/20 flex items-center justify-center text-[#ff7f1c]">
              <IoLocationOutline size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-[15px]">Location</h4>
              <p className="text-[#839493] text-[13px]">Chennai, India</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-[#00fbfb]/20 flex items-center justify-center text-[#00fbfb]">
              <IoBriefcaseOutline size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-[15px]">Experience</h4>
              <p className="text-[#839493] text-[13px]">Available for Opportunities</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resume CTA */}
      <a href="/assets/Ravindran_S_Resume_v2.docx.pdf" target="_blank" rel="noopener noreferrer" className="w-full block mb-8">
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-[16px] flex items-center justify-center gap-2 backdrop-blur-xl"
        >
          <IoDocumentTextOutline size={20} className="text-[#00fbfb]" />
          Download Resume
        </motion.button>
      </a>
    </div>
  );
}

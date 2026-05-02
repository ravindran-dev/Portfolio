"use client";

import { motion } from 'framer-motion';
import { IoChevronForward, IoLogoGithub } from 'react-icons/io5';
import { projectsData } from '@/data/projectsData';

export default function ProjectsPage() {
  const projects = Object.values(projectsData);

  return (
    <div className="w-full h-full pt-20 pb-32 px-0 overflow-y-auto overflow-x-hidden">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-6 px-5 tracking-tight"
      >
        Projects
      </motion.h1>

      <div className="flex flex-col gap-8 px-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
            className="w-full"
          >
            {/* App Store Style Card */}
            <div className="w-full rounded-[24px] bg-[#1a1c20] border border-white/5 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {/* Image/Header Area */}
              <div className="h-48 w-full bg-gradient-to-br from-[#2f3035] to-[#111318] p-5 flex flex-col justify-between relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00fbfb]/10 blur-3xl rounded-full"></div>
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[#00fbfb] text-[10px] font-bold uppercase tracking-wider">
                    Showcase
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 leading-tight">{project.title}</h2>
                  <p className="text-[#b9cac9] text-[14px] leading-snug line-clamp-2">{project.description}</p>
                </div>
              </div>

              {/* Action/Info Area */}
              <div className="p-4 bg-[#1a1c20]/80 backdrop-blur-xl flex items-center justify-between">
                <div className="flex -space-x-2 overflow-hidden">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <div key={i} className="inline-block h-8 px-3 rounded-full bg-[#2f3035] border border-white/10 text-white text-[11px] font-medium leading-8 z-10 relative">
                      {t}
                    </div>
                  ))}
                  {project.tech.length > 3 && (
                    <div className="inline-block h-8 w-8 rounded-full bg-[#111318] border border-white/10 text-[#839493] text-[11px] font-medium leading-8 text-center z-0 relative">
                      +{project.tech.length - 3}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {(project as any).github ? (
                    <a href={(project as any).github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#e2e2e8] text-black flex items-center justify-center active:scale-95 transition-transform">
                      <IoLogoGithub size={18} />
                    </a>
                  ) : null}
                  <button className="h-8 px-4 rounded-full bg-[#e2e2e8] text-black font-bold text-[13px] flex items-center justify-center active:scale-95 transition-transform">
                    GET
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

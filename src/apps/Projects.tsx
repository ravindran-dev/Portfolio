"use client";

import { useState } from "react";
import Window from "@/components/Window";
import { FiFolder, FiFileText, FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "MachineGuard",
    name: "MachineGuard",
    description: "An advanced system for monitoring and securing edge AI deployments.",
    tech: ["Python", "TensorFlow", "FastAPI"],
    repo: "https://github.com/ravindran-dev/MachineGuard"
  },
  {
    id: "MicroDet",
    name: "MicroDet",
    description: "Lightweight object detection model optimized for microcontrollers.",
    tech: ["C++", "TensorFlow Lite", "ESP32"],
    repo: "https://github.com/ravindran-dev/MicroDet"
  },
  {
    id: "GenuineGate",
    name: "GenuineGate",
    description: "Deep-learning based hardware authentication gateway.",
    tech: ["Rust", "PyTorch", "gRPC"],
    repo: "https://github.com/ravindran-dev/GenuineGate"
  },
  {
    id: "LCA-Tool",
    name: "LCA-Tool",
    description: "Lifecycle Assessment tool for tracking carbon footprints of AI models.",
    tech: ["React", "Node.js", "MongoDB"],
    repo: "https://github.com/ravindran-dev/LCA-Tool"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const project = projects.find(p => p.id === selectedProject);

  return (
    <div className="h-full flex flex-col font-sans">
      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-black/10">
        <button 
          onClick={() => setSelectedProject(null)}
          disabled={!selectedProject}
          className={`p-2 rounded-lg transition-colors ${selectedProject ? 'text-black hover:bg-black/5 hover:text-blue-600' : 'text-black/30'}`}
        >
          <FiArrowLeft />
        </button>
        <div className="text-sm font-mono text-black/60">
          ~/projects{selectedProject ? `/${selectedProject}` : ''}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {projects.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedProject(p.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-xl bg-black/5 flex items-center justify-center border border-black/10 group-hover:border-blue-500/50 group-hover:shadow-sm transition-all">
                    <FiFolder className="text-3xl text-blue-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-sm font-mono text-black/80 group-hover:text-blue-600 transition-colors text-center">
                    {p.name}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-200">
                  <FiFileText className="text-3xl text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-blue-700">{project?.name}</h2>
                  <div className="flex gap-2 mt-2">
                    {project?.tech.map(t => (
                      <span key={t} className="px-2 py-1 text-xs font-mono bg-black/5 text-black/70 rounded border border-black/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-black/5 rounded-lg border border-black/10">
                <p className="text-black/80 leading-relaxed">
                  {project?.description}
                </p>
              </div>

              <div className="flex gap-4">
                <a href={project?.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-blue-50 text-black hover:text-blue-700 border border-black/10 hover:border-blue-300 rounded-lg transition-all text-sm font-bold">
                  <FiGithub /> Source Code
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Python", value: 95 },
  { name: "React", value: 90 },
  { name: "MachineLearning", value: 95 },
  { name: "Linux", value: 96 },
  { name: "Go", value: 85 },
  { name: "Rust", value: 80 },
  { name: "PyTorch", value: 92 },
  { name: "Docker", value: 88 },
  { name: "AWS", value: 85 },
  { name: "FastAPI", value: 90 },
  { name: "Node.js", value: 85 },
  { name: "TypeScript", value: 92 }
];

export default function Skills() {
  return (
    <div className="font-mono text-sm sm:text-base text-white/90 p-2 sm:p-6">
      <div><span className="text-blue-400">{"{"}</span></div>
      <div className="pl-6 sm:pl-8 flex flex-col gap-4 my-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center">
              <span className="text-cyan-400">"{skill.name}"</span>
              <span className="text-blue-400 mr-4">:</span>
              <span className="text-purple-400">{skill.value}</span>
              <span className="text-blue-400 ml-1">{index < skills.length - 1 ? "," : ""}</span>
            </div>
            <div className="w-full sm:w-1/2 h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              />
            </div>
          </div>
        ))}
      </div>
      <div><span className="text-blue-400">{"{"}</span></div>
    </div>
  );
}

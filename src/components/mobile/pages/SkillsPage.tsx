"use client";

import { motion } from 'framer-motion';

const skillsGroups = [
  {
    title: "Languages",
    items: [
      { name: "Python", value: 95 },
      { name: "Go", value: 85 },
      { name: "Rust", value: 80 },
      { name: "TypeScript", value: 92 }
    ]
  },
  {
    title: "Frameworks & Tools",
    items: [
      { name: "React", value: 90 },
      { name: "FastAPI", value: 90 },
      { name: "Node.js", value: 85 },
      { name: "Docker", value: 88 },
      { name: "AWS", value: 85 },
      { name: "Linux", value: 96 }
    ]
  },
  {
    title: "AI & Machine Learning",
    items: [
      { name: "Machine Learning", value: 95 },
      { name: "PyTorch", value: 92 }
    ]
  }
];

export default function SkillsPage() {
  return (
    <div className="w-full h-full pt-20 pb-32 px-5 overflow-y-auto overflow-x-hidden">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-white mb-6 tracking-tight"
      >
        Skills
      </motion.h1>

      <div className="flex flex-col gap-6">
        {skillsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="text-[13px] font-bold text-[#839493] uppercase tracking-wider ml-4 mb-2">{group.title}</h3>
            
            <div className="w-full rounded-[20px] bg-[#1a1c20]/50 backdrop-blur-xl border border-white/10 overflow-hidden">
              {group.items.map((skill, index) => (
                <div key={skill.name} className="flex flex-col p-4 border-b border-white/5 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-[16px]">{skill.name}</span>
                    <span className="text-[#839493] text-[15px]">{skill.value}%</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-[#111318] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      transition={{ duration: 1, delay: (groupIndex * 0.2) + (index * 0.1) + 0.3, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#00fbfb] to-[#438fff] shadow-[0_0_10px_rgba(0,251,251,0.5)] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

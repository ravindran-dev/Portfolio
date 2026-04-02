import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import SkillBar, { type SkillBarItem } from './SkillBar';

type SkillCategory = {
  title: string;
  type: 'ai' | 'backend' | 'systems';
  skills: SkillBarItem[];
};

type FilterKey = 'all' | 'ai' | 'backend' | 'systems';

const categories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    type: 'systems',
    skills: [
      { name: 'Python', percentage: 95, level: 'Expert', tooltip: 'Used in projects like MicroDet, Machine Guard' },
      { name: 'C++', percentage: 85, level: 'Advanced', tooltip: 'Used in systems-level problem solving and optimization tasks' },
      { name: 'C', percentage: 80, level: 'Advanced', tooltip: 'Used in low-level and performance-focused programming contexts' },
      { name: 'JavaScript', percentage: 90, level: 'Advanced', tooltip: 'Used in modern frontend and full-stack projects' },
      { name: 'TypeScript', percentage: 85, level: 'Advanced', tooltip: 'Used in scalable React and API-driven apps' },
      { name: 'SQL', percentage: 88, level: 'Advanced', tooltip: 'Used for analytics, reporting, and backend data workflows' },
      { name: 'Go', percentage: 80, level: 'Advanced', tooltip: 'Used in backend and efficient service-oriented applications' },
      { name: 'Rust', percentage: 75, level: 'Intermediate-Advanced', tooltip: 'Used in high-performance systems and tooling explorations' },
      { name: 'Lua', percentage: 70, level: 'Intermediate', tooltip: 'Used in automation and lightweight scripting workflows' },
      { name: 'CUDA', percentage: 78, level: 'Intermediate-Advanced', tooltip: 'Used in GPU acceleration and model optimization tasks' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    type: 'backend',
    skills: [
      { name: 'React.js', percentage: 90, level: 'Advanced', tooltip: 'Used in portfolio and modern UI-focused projects' },
      { name: 'PyTorch', percentage: 92, level: 'Expert', tooltip: 'Used in MicroDet and deep learning model development' },
      { name: 'Streamlit', percentage: 85, level: 'Advanced', tooltip: 'Used for rapid ML dashboard and prototype delivery' },
      { name: 'Node.js', percentage: 85, level: 'Advanced', tooltip: 'Used in backend APIs and full-stack applications' },
      { name: 'Express', percentage: 80, level: 'Advanced', tooltip: 'Used in API services and backend integrations' },
    ],
  },
  {
    title: 'Core Expertise',
    type: 'ai',
    skills: [
      { name: 'Machine Learning', percentage: 95, level: 'Expert', tooltip: 'Used across predictive systems and applied AI projects' },
      { name: 'Computer Vision', percentage: 96, level: 'Expert', tooltip: 'Used in MicroDet and real-time visual intelligence systems' },
      { name: 'NLP', percentage: 88, level: 'Advanced', tooltip: 'Used in text intelligence and conversational systems' },
      { name: 'Deep Learning', percentage: 92, level: 'Expert', tooltip: 'Used for advanced neural model design and training' },
      { name: 'LLMs & RAG', percentage: 90, level: 'Advanced', tooltip: 'Used in knowledge-grounded AI application workflows' },
      { name: 'MLOps', percentage: 85, level: 'Advanced', tooltip: 'Used in model lifecycle, deployment, and monitoring workflows' },
      { name: 'GPU Optimization', percentage: 88, level: 'Advanced', tooltip: 'Used to accelerate inference and training pipelines' },
      { name: 'Distributed Systems', percentage: 85, level: 'Advanced', tooltip: 'Used in scalable backend and inference architecture design' },
    ],
  },
  {
    title: 'Platforms & Tools',
    type: 'systems',
    skills: [
      { name: 'Linux', percentage: 95, level: 'Expert', tooltip: 'Primary development environment for system and backend workflows' },
      { name: 'Git', percentage: 90, level: 'Advanced', tooltip: 'Used for collaboration, branching strategies, and release workflows' },
      { name: 'Docker', percentage: 85, level: 'Advanced', tooltip: 'Used for containerized local and cloud-ready deployments' },
      { name: 'Firebase', percentage: 88, level: 'Advanced', tooltip: 'Used for real-time backend and app hosting capabilities' },
      { name: 'MQTT', percentage: 80, level: 'Advanced', tooltip: 'Used in IoT communication pipelines and telemetry workflows' },
    ],
  },
];

const filterTabs: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI' },
  { key: 'backend', label: 'Backend' },
  { key: 'systems', label: 'Systems' },
];

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const visibleCategories = useMemo(() => {
    if (activeFilter === 'all') {
      return categories;
    }
    return categories.filter((category) => category.type === activeFilter);
  }, [activeFilter]);

  return (
    <section id="skills" className="px-4 py-16 text-slate-100 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle subtitle="Technologies and expertise with practical depth">
          Skills & Technologies
        </SectionTitle>

        <div className="mb-8 flex flex-wrap gap-2 sm:gap-3">
          {filterTabs.map((tab) => {
            const isActive = tab.key === activeFilter;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`glass-btn px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm ${isActive ? 'border-cyan-300/50 bg-white/20 text-white' : 'text-slate-200'}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {visibleCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_20px_rgba(0,255,255,0.15)] sm:p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-white sm:text-xl">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} item={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

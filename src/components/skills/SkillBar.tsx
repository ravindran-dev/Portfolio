import { motion } from 'framer-motion';

export type ExpertiseLevel = 'Beginner' | 'Intermediate' | 'Intermediate-Advanced' | 'Advanced' | 'Expert';

export type SkillBarItem = {
  name: string;
  percentage: number;
  level: ExpertiseLevel;
  tooltip: string;
};

type SkillBarProps = {
  item: SkillBarItem;
};

const levelStyle: Record<ExpertiseLevel, string> = {
  Beginner: 'bg-slate-500/20 text-slate-200 border-slate-400/30',
  Intermediate: 'bg-teal-500/20 text-teal-200 border-teal-400/30',
  'Intermediate-Advanced': 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
  Advanced: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
  Expert: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
};

export default function SkillBar({ item }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg"
      title={item.tooltip}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white md:text-base">{item.name}</p>
        <p className="text-sm font-semibold text-cyan-200">{item.percentage}%</p>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.percentage}%` }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(0,255,255,0.15)]"
        />
      </div>

      <span
        className={`mt-3 inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${levelStyle[item.level]}`}
      >
        {item.level}
      </span>
    </motion.div>
  );
}

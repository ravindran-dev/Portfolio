import { FiAward, FiStar, FiTrendingUp, FiCpu } from "react-icons/fi";

const achievements = [
  {
    id: 1,
    title: "LeetCode Knight (Rating: 2071)",
    description: "Knight Badge holder with a peak contest rating of 2071, ranking in the top tiers globally.",
    icon: FiStar,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  {
    id: 2,
    title: "TI Forge Hackathon Winner",
    description: "Won First Place and awarded ₹50,000 cash prize for 'Machine Guard AI', an IoT-based industrial safety system.",
    icon: FiAward,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    id: 3,
    title: "AI for Sustainability Winner",
    description: "Won First Place, awarded $125 + 300 AED Amazon vouchers for developing AI Carbon & LCA tracking tool.",
    icon: FiTrendingUp,
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  {
    id: 4,
    title: "TGF 2.0 TechSprint Finalist",
    description: "Reached Grand Finals, ranking in the Top 10 teams among 300+ competitors for AI Soft Skill Coach.",
    icon: FiCpu,
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  },
  {
    id: 5,
    title: "ICPC 2025 Global Rank 2605",
    description: "Secured a prestigious rank of 2605 in the ICPC 2025 Preliminary Contest.",
    icon: FiStar,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10"
  }
];

export default function Achievements() {
  return (
    <div className="font-sans p-2 sm:p-6 text-white">
      <h2 className="text-2xl font-extrabold font-display mb-6 text-white tracking-wide border-b border-white/10 pb-3 flex items-center gap-2">
        <FiAward className="text-cyan-400" /> Key Achievements
      </h2>
      <div className="grid gap-4">
        {achievements.map((item) => (
          <div 
            key={item.id} 
            className="flex gap-4 items-start p-4 rounded-xl border border-white/5 bg-[#18181b]/50 backdrop-blur-md hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 group"
          >
            <div className={`p-3 rounded-lg ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className={`text-xl ${item.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">{item.title}</h3>
              <p className="text-[12px] text-white/70 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { FiAward, FiStar, FiTrendingUp, FiCpu } from "react-icons/fi";

const achievements = [
  {
    id: 1,
    title: "AWS Open Source Contributor",
    description: "Contributed to AWS Open Source projects, improving inference speed for edge devices.",
    icon: FiStar,
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    id: 2,
    title: "96% Drone Detection Accuracy",
    description: "Achieved state-of-the-art accuracy in drone detection models using advanced computer vision techniques.",
    icon: FiTrendingUp,
    color: "text-green-500",
    bg: "bg-green-50"
  },
  {
    id: 3,
    title: "AICTE Internship Excellence",
    description: "Developed and deployed a custom model serving pipeline, drastically reducing latency.",
    icon: FiAward,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    id: 4,
    title: "Systems Engineering",
    description: "Architected scalable backend systems at Quantum, bridging complex ML models with robust production architectures.",
    icon: FiCpu,
    color: "text-purple-500",
    bg: "bg-purple-50"
  }
];

export default function Achievements() {
  return (
    <div className="font-sans p-2 sm:p-6">
      <h2 className="text-3xl font-bold font-display mb-8 text-black tracking-tight">Key Achievements</h2>
      <div className="grid gap-6">
        {achievements.map((item) => (
          <div key={item.id} className="flex gap-4 items-start p-4 rounded-xl border border-black/10 hover:shadow-md transition-shadow bg-white">
            <div className={`p-3 rounded-lg ${item.bg}`}>
              <item.icon className={`text-2xl ${item.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-1">{item.title}</h3>
              <p className="text-black/70 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

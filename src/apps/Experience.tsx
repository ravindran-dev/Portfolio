"use client";

import { useState, useEffect } from "react";
import Window from "@/components/Window";
import { motion } from "framer-motion";

const logs = [
  "> AI-ML Virtual Internship @ AICTE & EduSkills",
  "> Role: Full-Stack Development | Apr 2025 - Jun 2025",
  "> Optimized model inference workflow latency by ~30%",
  "> Preprocessed datasets & integrated model pipelines",
  "",
  "> Object Detection Developer @ CIT Drone Tech",
  "> Competition: NIDAR | Oct 2025 - Dec 2025",
  "> Accomplished ~96% drone object detection accuracy",
  "> Optimized model footprint under 1 GFLOP for edge device",
  "",
  "> Open Source Contributor @ AWS & SWOC",
  "> Cloud & Systems Development | Oct 2025 - Present",
  "> Contributed to AWS s2n-tls open source security repository",
  "> Navigated SWOC PRs, reducing operational errors by ~90%",
  "> Coordinated with distributed teams via Git & GitHub"
];

export default function Experience() {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setDisplayedLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-sm sm:text-base text-white/80">
      <div className="mb-4 text-blue-400 font-bold">
        [System Log: Experience Records]
      </div>
      <div className="flex flex-col gap-1">
        {displayedLogs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${log?.startsWith(">") ? "" : "h-4"} ${log?.includes("Internship") || log?.includes("Contributor") || log?.includes("Engineer") ? "text-cyan-400 font-bold mt-2" : ""}`}
          >
            {log}
          </motion.div>
        ))}
        {displayedLogs.length < logs.length && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-2.5 h-4 bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          />
        )}
      </div>
    </div>
  );
}

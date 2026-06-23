"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiCpu, FiLayout, FiDatabase, FiSettings, FiActivity, FiServer, FiShield } from "react-icons/fi";
import { projectsData } from "@/data/projectsData";

interface ProjectCaseStudyProps {
  projectId: string;
  onClose?: () => void;
}

export default function ProjectCaseStudy({ projectId, onClose }: ProjectCaseStudyProps) {
  const project = projectsData[projectId as keyof typeof projectsData] as any;
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "features" | "metrics">("overview");

  if (!project) return null;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#151517] overflow-hidden text-white/95">
      {/* Top Banner */}
      <div className="relative shrink-0 p-6 md:p-8 border-b border-white/5 bg-gradient-to-r from-[#1c1c1e] to-[#151517]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-70" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
                Case Study
              </span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <FiGithub size={18} />
                </a>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-white font-display">
              {project.title}
            </h1>
            <p className="text-white/60 text-base max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end max-w-sm">
            {project.tech.map((t: string) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-[#0d0d0e]">
        <div className="max-w-5xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Top column: Interactive Animated Live Simulation */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <FiActivity className="text-cyan-400" />
              Live Project Architecture & Telemetry
            </h3>

            <div className="bg-[#1c1c1e]/75 border border-white/5 rounded-2xl p-4 overflow-hidden relative shadow-2xl h-[340px] flex flex-col">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,157,0.03),transparent)] pointer-events-none" />
              <LiveSimulator projectId={projectId} />
            </div>
          </div>

          {/* Right / Bottom column: Document Presentation */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex border-b border-white/5 gap-1 shrink-0 font-mono">
              {(["overview", "architecture", "features", "metrics"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-cyan-400 text-cyan-400 bg-white/5 rounded-t-lg"
                      : "border-transparent text-white/55 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed font-sans"
                >
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-lg mb-2">Project Overview</h4>
                      <p>
                        This system was engineered to deliver state-of-the-art results by merging high-performance models with responsive frontend design. 
                        It achieves edge efficiency through GPU-tailored frameworks, minimizing network overhead and keeping data secure.
                      </p>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Technical Highlight</h5>
                        <p className="text-xs text-white/60 m-0">
                          Operates completely on-device where applicable, ensuring absolute privacy, near-zero network latency, and low memory consumption (&lt;1 GFLOP bounds).
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "architecture" && (
                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-lg mb-2">Pipeline Architecture</h4>
                      <p>
                        The processing pipeline is modularized into distinct operational layers to maintain scalability:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-white/60 text-xs font-mono">
                        <li><span className="text-cyan-400">Ingestion:</span> Real-time sensor/video telemetry streaming.</li>
                        <li><span className="text-purple-400">Model Engine:</span> Custom neural inference layer with optimized tensor formats.</li>
                        <li><span className="text-green-400">Processing Gate:</span> Fast heuristics matching and session evaluation.</li>
                        <li><span className="text-yellow-400">Controller:</span> Autonomous actuators or dashboard state sync.</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "features" && (
                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-lg mb-2">Key Features</h4>
                      <ul className="space-y-3 pl-0 list-none">
                        <li className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                          <FiCpu className="text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white text-sm block">Edge Deployment Optimized</strong>
                            <span className="text-xs text-white/60">Designed to run flawlessly on resource-constrained embedded systems and mobile devices.</span>
                          </div>
                        </li>
                        <li className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                          <FiLayout className="text-purple-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white text-sm block">Real-time Visualization</strong>
                            <span className="text-xs text-white/60">High-fidelity web-based dashboards displaying charts, logs, and triggers instantly.</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "metrics" && (
                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-lg mb-2">Performance Metrics</h4>
                      <table className="w-full text-xs font-mono text-left border-collapse border border-white/10">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10">
                            <th className="p-2 border-r border-white/10 text-white">Metric</th>
                            <th className="p-2 text-white">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5">
                            <td className="p-2 border-r border-white/5 text-white/60">Inference Latency</td>
                            <td className="p-2 text-cyan-400 font-bold">&lt; 15 ms</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="p-2 border-r border-white/5 text-white/60">Accuracy / Precision</td>
                            <td className="p-2 text-green-400 font-bold">~93% - 96%</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="p-2 border-r border-white/5 text-white/60">GPU Memory Profile</td>
                            <td className="p-2 text-purple-400 font-bold">&lt; 200 MB</td>
                          </tr>
                          <tr>
                            <td className="p-2 border-r border-white/5 text-white/60">Data Jitter</td>
                            <td className="p-2 text-yellow-400 font-bold">&lt; 1.2%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* Interactive Simulators for different projects */
function LiveSimulator({ projectId }: { projectId: string }) {
  // MicroDet Drone Simulation
  if (projectId === "MicroDet") {
    return <MicroDetSimulator />;
  }

  // AirMouse3D Simulator
  if (projectId === "AirMouse3D") {
    return <AirMouseSimulator />;
  }

  // GenuineGate Simulator
  if (projectId === "GenuineGate") {
    return <GenuineGateSimulator />;
  }

  // MachineGuard Simulator
  if (projectId === "MachineGuard") {
    return <MachineGuardSimulator />;
  }

  // Fallback / standard code visualization
  return (
    <div className="flex-1 flex flex-col justify-between font-mono text-[11px] text-white/40 overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] uppercase tracking-wider">
        <span>Model Telemetry Console</span>
        <span className="text-cyan-400 animate-pulse">● System Live</span>
      </div>
      <div className="flex-1 py-4 flex flex-col justify-center gap-2 text-white/60">
        <div>&gt; Loading weights/anchors ... OK</div>
        <div>&gt; Allocating CUDA GPU cores ... OK</div>
        <div>&gt; Warmup inference latency: 12.4ms</div>
        <div className="text-cyan-400">&gt; Awaiting real-time stream updates...</div>
      </div>
      <div className="h-6 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-white/30">
        <span>INF-01: OK</span>
        <span>Jitter: 0.14ms</span>
      </div>
    </div>
  );
}

// 1. MICRODET: Simulated Drone Feed and Model Pipeline
function MicroDetSimulator() {
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; confidence: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly spawn 1-3 people coordinates
      const count = Math.floor(Math.random() * 3) + 1;
      const newTargets = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: 40 + Math.random() * 200,
        y: 40 + Math.random() * 120,
        confidence: Math.round(94 + Math.random() * 4.8)
      }));
      setTargets(newTargets);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-4 h-full">
      {/* Left: Simulated Camera Feed */}
      <div className="flex-1 bg-black rounded-lg border border-white/10 relative overflow-hidden flex flex-col justify-between p-2">
        {/* Reticle grid */}
        <div className="absolute inset-0 border-2 border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5 pointer-events-none" />
        <div className="absolute inset-4 border border-cyan-500/20 pointer-events-none rounded" />
        
        {/* Top telemetry tags */}
        <div className="flex justify-between items-center text-[8px] font-mono text-cyan-400 z-10">
          <span>ALT: 45m</span>
          <span>LAT: 96%</span>
          <span className="text-red-500 animate-pulse">● REC</span>
        </div>

        {/* Targets */}
        <div className="absolute inset-0">
          {targets.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ left: t.x, top: t.y }}
              className="absolute w-16 h-16 border-2 border-red-500 flex flex-col justify-between p-1 pointer-events-none"
            >
              {/* Corner markings */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
              
              <div className="text-[7px] font-mono font-bold bg-red-600 text-white px-1 py-0.5 rounded leading-none w-max">
                Person: {t.confidence}%
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom telemetry tags */}
        <div className="flex justify-between items-center text-[8px] font-mono text-white/40 z-10">
          <span>FPS: 62.4</span>
          <span>FLOPs: 0.94G</span>
        </div>
      </div>

      {/* Right: Architecture flow */}
      <div className="w-full md:w-44 flex flex-col justify-between gap-1 font-mono text-[9px] text-white/50 border-l border-white/5 pl-4 py-2">
        <div className="text-[10px] text-cyan-400 font-bold tracking-wider mb-2">MODEL FLOW</div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded border border-white/10">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>1. Image Input</span>
          </div>
          
          <div className="h-4 border-l-2 border-dashed border-white/10 ml-2.5" />

          <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded border border-white/10">
            <FiCpu className="text-purple-400" />
            <span>2. Backbone (NanoDet)</span>
          </div>

          <div className="h-4 border-l-2 border-dashed border-white/10 ml-2.5" />

          <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded border border-white/10">
            <FiDatabase className="text-green-400" />
            <span>3. Neck (FPN Aggregation)</span>
          </div>

          <div className="h-4 border-l-2 border-dashed border-white/10 ml-2.5" />

          <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded border border-white/10">
            <FiSettings className="text-yellow-400" />
            <span>4. Head (YOLO Classification)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. AIRMOUSE3D: Interactive Tilt Device
function AirMouseSimulator() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    
    setRotation({ x: x * 20, y: -y * 20 });
    setCursorPos({ x: (x + 1) * 50, y: (y + 1) * 50 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotation({ x: 0, y: 0 }); setCursorPos({ x: 50, y: 50 }); }}
      className="flex-1 flex flex-col md:flex-row gap-6 h-full items-center justify-center cursor-crosshair"
    >
      {/* 3D Phone Model */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 relative h-full">
        <span className="absolute top-2 left-2 text-[8px] font-mono text-white/40">HOVER AND MOVE TO TILT</span>
        
        <div 
          style={{
            transform: `perspective(500px) rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out"
          }}
          className="w-20 h-36 bg-[#2d2d30] border-2 border-white/20 rounded-2xl relative shadow-2xl flex flex-col p-1.5"
        >
          {/* Speaker / Camera */}
          <div className="w-8 h-2 bg-black/40 rounded-full mx-auto mb-2" />
          
          {/* Smartphone screen simulation */}
          <div className="flex-1 bg-cyan-500/5 rounded-xl border border-cyan-500/10 flex flex-col p-1 font-mono text-[6px] text-cyan-400/80">
            <div>GYRO: {rotation.x.toFixed(1)}°</div>
            <div>ACC: {rotation.y.toFixed(1)}°</div>
            
            {/* Pulsing signal indicator */}
            <div className="mt-auto flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Firebase Stream Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Output Monitor */}
      <div className="w-full md:w-44 h-full border-l border-white/5 pl-4 flex flex-col justify-between py-2">
        <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Monitor Out</div>
        
        <div className="flex-1 bg-black/50 border border-white/10 rounded-lg relative my-2 overflow-hidden flex items-center justify-center font-sans">
          {/* Moving cursor */}
          <motion.div 
            animate={{ x: `${cursorPos.x - 50}%`, y: `${cursorPos.y - 50}%` }}
            transition={{ type: "spring", damping: 15 }}
            className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_#00fbfb] relative z-10"
          />
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        </div>

        <div className="text-[8px] font-mono text-white/40 flex justify-between">
          <span>PRECISION: 90%</span>
          <span>LATENCY: ~8ms</span>
        </div>
      </div>
    </div>
  );
}

// 3. GENUINEGATE: Bot Request Inspector
function GenuineGateSimulator() {
  const [requests, setRequests] = useState<{ id: number; ip: string; isBot: boolean; score: number }[]>([]);

  useEffect(() => {
    const ips = ["192.168.1.45", "102.24.56.99", "18.232.1.200", "199.5.6.8", "72.4.99.112"];
    const interval = setInterval(() => {
      const isBot = Math.random() > 0.5;
      const score = isBot ? Math.floor(82 + Math.random() * 18) : Math.floor(10 + Math.random() * 38);
      const newReq = {
        id: Date.now(),
        ip: ips[Math.floor(Math.random() * ips.length)],
        isBot,
        score
      };
      setRequests(prev => [newReq, ...prev].slice(0, 5));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-4 h-full">
      {/* Request Stream */}
      <div className="flex-1 flex flex-col justify-between py-2 overflow-hidden">
        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">Request Inspector Stream</span>
        
        <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
          <AnimatePresence>
            {requests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-2 rounded-lg border flex items-center justify-between font-mono text-[9px] ${
                  req.score >= 80 
                    ? "bg-red-500/5 border-red-500/20 text-red-400" 
                    : "bg-green-500/5 border-green-500/20 text-green-400"
                }`}
              >
                <span>{req.ip}</span>
                <span className="font-bold">Risk Score: {req.score}</span>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-black/40">
                  {req.score >= 80 ? "BLOCK" : "ALLOW"}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Decision Engine Indicators */}
      <div className="w-full md:w-44 border-l border-white/5 pl-4 flex flex-col justify-between py-2">
        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Gate Status</span>

        <div className="flex flex-col gap-2 my-4">
          <div className="flex items-center justify-between text-[9px] font-mono">
            <span>Decision Gate:</span>
            <span className="text-cyan-400">Nginx + Go API</span>
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono">
            <span>Active Store:</span>
            <span className="text-[#ff3e00] font-bold">Redis (TTL)</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 p-2 bg-[#ff3b30]/10 border border-[#ff3b30]/20 rounded-lg flex flex-col items-center justify-center">
            <span className="text-red-500 font-bold text-sm">⛔</span>
            <span className="text-[8px] font-mono text-white/50 mt-1">Bot Block</span>
          </div>
          <div className="flex-1 p-2 bg-[#34c759]/10 border border-[#34c759]/20 rounded-lg flex flex-col items-center justify-center">
            <span className="text-green-500 font-bold text-sm">✅</span>
            <span className="text-[8px] font-mono text-white/50 mt-1">Legit Allow</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. MACHINEGUARD: IoT Telemetry simulator
function MachineGuardSimulator() {
  const [telemetry, setTelemetry] = useState({ temp: 42, vibration: 0.15, isAnomaly: false });
  const [chartPoints, setChartPoints] = useState<number[]>(Array(20).fill(0.15));

  useEffect(() => {
    const interval = setInterval(() => {
      const isAnomaly = Math.random() > 0.85;
      const temp = isAnomaly ? Math.floor(78 + Math.random() * 15) : Math.floor(40 + Math.random() * 8);
      const vibration = isAnomaly ? parseFloat((0.85 + Math.random() * 0.4).toFixed(3)) : parseFloat((0.1 + Math.random() * 0.12).toFixed(3));
      
      setTelemetry({ temp, vibration, isAnomaly });
      setChartPoints(prev => [...prev.slice(1), vibration]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-4 h-full py-2">
      {/* Sensor values & telemetry chart */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
          <span>Machine Telemetry Stream</span>
          {telemetry.isAnomaly ? (
            <span className="text-red-500 font-bold animate-pulse">⚠️ ANOMALY DETECTED</span>
          ) : (
            <span className="text-green-500 font-bold">✓ NORMAL STATE</span>
          )}
        </div>

        {/* Telemetry charts */}
        <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-2 relative flex items-end gap-1 overflow-hidden h-28">
          {chartPoints.map((p, idx) => (
            <div 
              key={idx} 
              style={{ height: `${p * 100}%` }}
              className={`w-full rounded-t transition-all duration-300 ${p > 0.6 ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-cyan-500'}`}
            />
          ))}
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        </div>
      </div>

      {/* Dials & controls */}
      <div className="w-full md:w-44 border-l border-white/5 pl-4 flex flex-col justify-between py-2">
        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Sensor Readings</span>

        <div className="flex flex-col gap-3 my-4">
          <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between font-mono text-[9px]">
            <span>Temp Sensor:</span>
            <span className={`font-bold ${telemetry.temp > 70 ? 'text-red-500' : 'text-white'}`}>{telemetry.temp}°C</span>
          </div>
          <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between font-mono text-[9px]">
            <span>Vibration Gs:</span>
            <span className={`font-bold ${telemetry.vibration > 0.6 ? 'text-red-500' : 'text-white'}`}>{telemetry.vibration}G</span>
          </div>
        </div>

        <div className="text-[8px] font-mono text-white/30">
          ESP32 Node 01 | Accuracy: ~94%
        </div>
      </div>
    </div>
  );
}

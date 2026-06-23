"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";
import { SiArchlinux, SiGithub } from "react-icons/si";
import { FiWifi, FiBattery, FiBatteryCharging, FiPower, FiClock, FiImage } from "react-icons/fi";

export default function Waybar() {
  const { activeWorkspace, setActiveWorkspace, wallpaper, setWallpaper, windows, focusedWindow } = useDesktopStore();
  const [time, setTime] = useState("");
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [showWifi, setShowWifi] = useState(false);
  const [showWifiDetails, setShowWifiDetails] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState<{ downlink?: number; effectiveType?: string }>({});
  const [showBattery, setShowBattery] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [wifiNetworks, setWifiNetworks] = useState([
    { name: 'Hypersource', signal: 'Strong', locked: true },
    { name: 'Family Office', signal: 'Medium', locked: true },
    { name: 'drpatramsey-5G', signal: 'Strong', locked: true }
  ]);

  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const wifiRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const lastPlayTime = useRef(0);

  const playVolumeTick = (vol: number) => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      
      const volumeLevel = vol / 100;
      gain.gain.setValueAtTime(volumeLevel * 0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio Context failed:", e);
    }
  };

  const playAudioFeedback = (vol: number) => {
    const now = Date.now();
    if (now - lastPlayTime.current > 150) {
      playVolumeTick(vol);
      lastPlayTime.current = now;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wifiRef.current && !wifiRef.current.contains(event.target as Node)) {
        setShowWifi(false);
      }
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) {
        setShowVolumePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateConn = () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        setConnectionInfo({
          downlink: conn.downlink + (Math.random() * 0.4 - 0.2), // Simulate real-time jitter
          effectiveType: conn.effectiveType
        });
      }
    };

    updateConn();
    const interval = setInterval(updateConn, 3000); // Update every 3s for "real-time" feel
    
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', updateConn);
    }
    
    return () => clearInterval(interval);
  }, []);

  // Simulate WiFi scanning
  useEffect(() => {
    if (showWifi) {
      const interval = setInterval(() => {
        setWifiNetworks(prev => [...prev].sort(() => Math.random() - 0.5));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showWifi]);

  const wallpapers = ['Space-Nebula', 'Tokyo_Pink', 'Dreamy-Aesthetic', 'Lofi-Desktop', 'Techno-Geek'];
  
  const cycleWallpaper = () => {
    const currentIndex = wallpapers.indexOf(wallpaper);
    const nextIndex = (currentIndex + 1) % wallpapers.length;
    setWallpaper(wallpapers[nextIndex]);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchBattery = async () => {
      try {
        if ('getBattery' in navigator) {
          const battery = await (navigator as any).getBattery();
          const updateBattery = () => {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
          };
          updateBattery();
          battery.addEventListener('levelchange', updateBattery);
          battery.addEventListener('chargingchange', updateBattery);
        } else {
          // Fallback for browsers/OS that don't support getBattery (like some Arch configs or Safari/Firefox)
          setBatteryLevel(100);
          setIsCharging(true);
        }
      } catch (e) {
        console.error("Battery API error:", e);
        setBatteryLevel(100);
        setIsCharging(true);
      }
    };
    fetchBattery();
  }, []);

  return (
    <motion.div 
      initial={{ y: -50, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ left: "50%" }}
      className="fixed top-3 h-10 w-[630px] max-w-[95vw] backdrop-blur-3xl bg-[#151517]/75 rounded-full z-40 flex items-center justify-between px-5 text-xs text-white border border-white/10 shadow-2xl transition-all duration-300 hover:bg-[#151517]/85 hover:border-white/20 select-none"
    >
      {/* Left section: Time and Active Window / Home */}
      <div className="flex items-center gap-3">
        <div className="font-bold text-white/95 text-[11px] tracking-wider">
          {time || "00:00"}
        </div>
        <div className="w-[1px] h-3 bg-white/15" />
        {(() => {
          const getActiveTitle = () => {
            if (!focusedWindow) return "Home";
            const win = windows[focusedWindow];
            if (!win || !win.isOpen || win.isMinimized) return "Home";
            return win.title;
          };
          const activeTitle = getActiveTitle();
          const isHome = activeTitle === "Home";
          return isHome ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 font-sans text-[10px] font-semibold transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              <span>Home</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 font-sans text-[10px] font-semibold transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
              <span>{activeTitle}</span>
            </div>
          );
        })()}
      </div>

      {/* Center section: Workspaces */}
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((ws) => (
          <button
            key={ws}
            onClick={() => setActiveWorkspace(ws)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 text-[10px] font-bold ${
              activeWorkspace === ws 
                ? "bg-gradient-to-r from-[#ff007f] to-[#7f00ff] text-white shadow-[0_0_8px_rgba(255,0,127,0.5)] scale-105 font-extrabold" 
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            {ws}
          </button>
        ))}
      </div>

      {/* Right section: System details */}
      <div className="flex items-center gap-3 text-white/80">
        
        {/* Wallpaper Menu Toggle */}
        <div className="relative flex items-center" onMouseEnter={() => setShowWallpaper(true)} onMouseLeave={() => setShowWallpaper(false)}>
          <div onClick={cycleWallpaper} className="hover:bg-white/10 p-1 rounded-full transition-colors flex items-center cursor-pointer">
            <FiImage className="text-xs text-amber-400" />
          </div>
          <AnimatePresence>
            {showWallpaper && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full mt-2 right-0 w-40 backdrop-blur-3xl bg-[#28282b]/95 rounded-xl border border-white/10 shadow-2xl z-[9001] py-1.5 font-sans text-[11px]"
              >
                <div className="text-[9px] text-white/50 px-3 pb-1 mb-1 border-b border-white/10 font-mono tracking-wider uppercase">Wallpapers</div>
                <div className="px-1.5 flex flex-col gap-0.5">
                  {[
                    { id: "Space-Nebula", name: "Space Nebula" },
                    { id: "Tokyo_Pink", name: "Tokyo Pink" },
                    { id: "Dreamy-Aesthetic", name: "Dreamy Aesthetic" },
                    { id: "Lofi-Desktop", name: "Lofi Desktop" },
                    { id: "Techno-Geek", name: "Techno Geek" }
                  ].map((wp) => (
                    <button
                      key={wp.id}
                      onClick={() => setWallpaper(wp.id)}
                      className={`text-left px-2.5 py-1 rounded-md text-[11px] transition-all font-mono ${
                        wallpaper === wp.id ? "bg-cyan-500/20 text-cyan-400" : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {wp.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Volume Indicator */}
        <div ref={volumeRef} className="relative flex items-center">
          <button 
            onClick={() => setShowVolumePopup(!showVolumePopup)}
            className={`p-1 rounded-full transition-colors flex items-center cursor-pointer ${showVolumePopup ? 'bg-white/20 text-[#00f2ff]' : 'hover:bg-white/10 text-cyan-400'}`}
          >
            <span className="text-[12px]">{isMuted ? "🔇" : volume === 0 ? "🔇" : volume < 33 ? "🔈" : volume < 66 ? "🔉" : "🔊"}</span>
          </button>
          
          <AnimatePresence>
            {showVolumePopup && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full mt-2 right-0 w-56 backdrop-blur-3xl bg-[#18181b]/95 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[9001] p-4 font-sans text-xs text-white"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <span className="font-semibold text-white/90 tracking-wide">Sound Output</span>
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all duration-300 border ${
                      isMuted 
                        ? "bg-[#ff3b30]/20 text-[#ff453a] border-[#ff3b30]/30 shadow-[0_0_8px_rgba(255,59,48,0.2)]" 
                        : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                    }`}
                  >
                    {isMuted ? "MUTED" : "MUTE"}
                  </button>
                </div>
                
                {/* Visualizer bars */}
                <div className="flex items-end justify-center gap-1.5 h-6 mb-3 px-2">
                  {[...Array(12)].map((_, i) => {
                    const active = !isMuted && volume > (i * 8);
                    return (
                      <motion.div 
                        key={i} 
                        animate={{ 
                          height: active ? [4, 16, 8, 20, 6, 14][(i + Math.round(volume/10)) % 6] : 4
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.2 + (i * 0.1),
                          ease: "easeInOut"
                        }}
                        className={`w-1 rounded-full transition-colors duration-300 ${
                          active ? "bg-gradient-to-t from-cyan-500 to-blue-400" : "bg-white/10"
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Slider */}
                <div className="flex items-center gap-3 mb-3">
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {isMuted ? "🔇" : volume === 0 ? "🔇" : volume < 33 ? "🔈" : volume < 66 ? "🔉" : "🔊"}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={isMuted ? 0 : volume} 
                    onChange={(e) => {
                      const newVolume = Number(e.target.value);
                      setVolume(newVolume);
                      if (isMuted) setIsMuted(false);
                      playAudioFeedback(newVolume);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="flex-1 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                  />
                  <span className="font-mono text-[10px] font-bold w-8 text-right text-cyan-400">{isMuted ? 0 : volume}%</span>
                </div>

                {/* Preset shortcuts */}
                <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-white/5">
                  {[
                    { label: "Mute", val: 0 },
                    { label: "30%", val: 30 },
                    { label: "60%", val: 60 },
                    { label: "100%", val: 100 }
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setVolume(p.val);
                        setIsMuted(p.val === 0);
                        playVolumeTick(p.val);
                      }}
                      className="py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[9px] font-semibold text-center transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* WiFi Toggle */}
        <div ref={wifiRef} className="relative flex items-center">
          <div 
            onClick={() => setShowWifi(!showWifi)}
            className={`p-1 rounded-full transition-colors flex items-center cursor-pointer ${showWifi ? 'bg-white/20 text-[#00f2ff]' : 'hover:bg-white/10 text-cyan-400'}`}
          >
            <FiWifi className="text-[12px]" />
          </div>

          <AnimatePresence>
            {showWifi && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full mt-2 right-0 w-64 backdrop-blur-3xl bg-[#28282b]/95 rounded-xl border border-white/10 shadow-2xl z-[9001] py-1.5 font-sans text-[11px]"
              >
                <div className="flex items-center justify-between px-3 pb-1 border-b border-white/10 mb-1.5">
                  <span className="font-semibold text-white/95">Wi-Fi</span>
                  <div className="w-6 h-3 bg-blue-500 rounded-full flex items-center justify-end px-[1px] shadow-inner">
                    <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="px-3 py-0.5 text-white/45 text-[9px] font-semibold tracking-wider uppercase mb-0.5">Preferred</div>
                <div className="px-1.5">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-blue-500 text-white cursor-pointer">
                    <FiWifi className="text-xs" />
                    <span className="flex-1 truncate">Office250</span>
                    <span className="text-[8px]">🔒</span>
                  </div>
                </div>

                <div className="px-3 pt-1.5 pb-0.5 text-white/45 text-[9px] font-semibold tracking-wider uppercase mt-1 mb-0.5 border-t border-white/10">Other</div>
                <div className="px-1.5 max-h-28 overflow-y-auto">
                  {wifiNetworks.map(net => (
                    <div key={net.name} className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer">
                      <FiWifi className="text-xs opacity-70" />
                      <span className="flex-1 truncate">{net.name}</span>
                      {net.locked && <span className="text-[8px] opacity-60">🔒</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Battery Toggle */}
        <div className="relative flex items-center" onMouseEnter={() => setShowBattery(true)} onMouseLeave={() => setShowBattery(false)}>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded-full transition-colors text-green-400 font-bold text-[10px]">
            {batteryLevel !== null && <span>{batteryLevel}%</span>}
            {isCharging ? (
              <FiBatteryCharging className="text-[12px] animate-pulse" />
            ) : (
              <FiBattery className="text-[12px]" />
            )}
          </div>
          <AnimatePresence>
            {showBattery && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full mt-2 right-0 w-48 backdrop-blur-3xl bg-[#28282b]/95 rounded-xl border border-white/10 shadow-2xl z-[9001] py-2 font-sans text-[11px]"
              >
                <div className="px-3 py-0.5 flex items-center justify-between mb-1 border-b border-white/10 pb-1.5">
                  <span className="font-semibold text-white/50">Battery Status</span>
                  <span className="font-bold text-white">{batteryLevel !== null ? `${batteryLevel}%` : '100%'}</span>
                </div>
                <div className="px-3 py-0.5 text-white/70 text-[10px]">
                  Source: {isCharging ? 'Power Adapter' : 'Battery'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

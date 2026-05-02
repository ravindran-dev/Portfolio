"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "@/store/useDesktopStore";
import { SiArchlinux, SiGithub } from "react-icons/si";
import { FiWifi, FiBattery, FiBatteryCharging, FiPower, FiClock, FiImage } from "react-icons/fi";

export default function Waybar() {
  const { activeWorkspace, setActiveWorkspace, wallpaper, setWallpaper } = useDesktopStore();
  const [time, setTime] = useState("");
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [showWifi, setShowWifi] = useState(false);
  const [showWifiDetails, setShowWifiDetails] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState<{ downlink?: number; effectiveType?: string }>({});
  const [showBattery, setShowBattery] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);

  useEffect(() => {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      const updateConn = () => {
        setConnectionInfo({
          downlink: conn.downlink,
          effectiveType: conn.effectiveType
        });
      };
      updateConn();
      conn.addEventListener('change', updateConn);
    }
  }, []);

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
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      });
    }
  }, []);

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-2 left-4 right-4 h-10 backdrop-blur-2xl bg-[#1d1d1f]/70 rounded-2xl z-[9000] flex items-center justify-between px-4 font-sans text-xs text-white border border-white/10 shadow-xl transition-all duration-300 hover:bg-[#1d1d1f]/80 hover:shadow-2xl hover:border-white/20"
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-bold cursor-pointer px-2 py-1 rounded transition-all">
          <SiArchlinux className="text-[16px] text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
        </div>
        <div className="font-display italic tracking-wider text-sm font-bold cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          Ravindran S
        </div>
      </div>

      {/* Center section: Workspaces & Wallpaper */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((ws) => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${
                activeWorkspace === ws 
                  ? "bg-white/20 font-bold" 
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {ws}
            </button>
          ))}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Wallpaper Menu Toggle */}
        <div className="relative h-full flex items-center" onMouseEnter={() => setShowWallpaper(true)} onMouseLeave={() => setShowWallpaper(false)}>
          <div className="hover:bg-white/10 px-2 py-1 rounded transition-colors h-full flex items-center cursor-pointer">
            <FiImage className="text-sm" />
          </div>
          <AnimatePresence>
            {showWallpaper && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1 right-0 w-48 backdrop-blur-3xl bg-[#28282b]/95 rounded-xl border border-white/10 shadow-2xl z-[9001] py-2 font-sans text-[13px]"
              >
                <div className="text-xs text-white/50 px-4 pb-1 mb-1 border-b border-white/10 font-mono tracking-wider uppercase">Wallpapers</div>
                <div className="px-2 flex flex-col gap-1">
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
                      className={`text-left px-3 py-1.5 rounded-md text-[13px] transition-all font-mono ${
                        wallpaper === wp.id ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-white/80 hover:bg-white/10 border border-transparent"
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

        <a href="https://github.com/ravindran-dev" target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 px-2 py-1 rounded transition-colors">
          <SiGithub className="text-sm" />
        </a>
        
        {/* WiFi Toggle */}
        <div className="relative h-full flex items-center">
          <div 
            onClick={() => setShowWifi(!showWifi)}
            onMouseEnter={() => setShowWifiDetails(true)}
            onMouseLeave={() => setShowWifiDetails(false)}
            className={`px-2 py-1 rounded transition-colors h-full flex items-center cursor-pointer ${showWifi ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <FiWifi className="text-[14px]" />
          </div>

          <AnimatePresence>
            {showWifiDetails && !showWifi && (
              <motion.div
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                className="absolute top-full mt-1 right-0 px-3 py-2 backdrop-blur-3xl bg-[#28282b]/95 rounded-lg border border-white/10 shadow-xl z-[9001] whitespace-nowrap"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                    <span className="font-bold text-xs">Office250</span>
                  </div>
                  <div className="text-[10px] text-white/50 flex flex-col">
                    <span>IP: 192.168.1.128</span>
                    <span>Speed: {connectionInfo.downlink ? `${connectionInfo.downlink} Mbps` : '866.7 Mbps'}</span>
                    <span>Signal: Strong</span>
                  </div>
                </div>
              </motion.div>
            )}

            {showWifi && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1 right-0 w-72 backdrop-blur-3xl bg-[#28282b]/95 rounded-xl border border-white/10 shadow-2xl z-[9001] py-2 font-sans text-[13px]"
              >
                <div className="flex items-center justify-between px-4 pb-2 border-b border-white/10 mb-2">
                  <span className="font-semibold">Wi-Fi</span>
                  <div 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="w-8 h-4 bg-blue-500 rounded-full flex items-center justify-end px-[2px] shadow-inner cursor-pointer"
                  >
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="px-4 py-1 text-white/50 text-[11px] font-semibold tracking-wider uppercase mb-1">Preferred Networks</div>
                <div className="px-2">
                  <div className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-blue-500 hover:text-white bg-blue-500 text-white cursor-pointer group">
                    <FiWifi className="text-sm" />
                    <span className="flex-1 truncate">Office250</span>
                    <div className="w-3 h-3 border border-current rounded-sm flex items-center justify-center text-[8px]">🔒</div>
                  </div>
                  <div className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer">
                    <FiWifi className="text-sm opacity-70" />
                    <span className="flex-1 truncate">SpectrumWiFi</span>
                  </div>
                </div>

                <div className="px-4 pt-2 pb-1 text-white/50 text-[11px] font-semibold tracking-wider uppercase mt-1 mb-1 border-t border-white/10">Other Networks</div>
                <div className="px-2">
                  {['Hypersource', 'Family Office', 'drpatramsey-5G'].map(net => (
                    <div key={net} className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer">
                      <FiWifi className="text-sm opacity-70" />
                      <span className="flex-1 truncate">{net}</span>
                      <div className="w-3 h-3 border border-white/50 rounded-sm flex items-center justify-center text-[8px] opacity-70">🔒</div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-white/10 px-2">
                  <div className="px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer">
                    Network Preferences...
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Battery Toggle */}
        <div className="relative h-full flex items-center" onMouseEnter={() => setShowBattery(true)} onMouseLeave={() => setShowBattery(false)}>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors h-full">
            {batteryLevel !== null && <span>{batteryLevel}%</span>}
            {isCharging ? <FiBatteryCharging className="text-[14px]" /> : <FiBattery className="text-[14px]" />}
          </div>
          <AnimatePresence>
            {showBattery && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1 right-0 w-64 backdrop-blur-3xl bg-[#28282b]/95 rounded-xl border border-white/10 shadow-2xl z-[9001] py-2 font-sans text-[13px]"
              >
                <div className="px-4 py-1 flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                  <span className="font-semibold text-white/50">Battery</span>
                  <span className="ml-auto font-semibold">{batteryLevel !== null ? `${batteryLevel}%` : 'Reading...'}</span>
                </div>
                <div className="px-4 py-1 text-white/80">
                  Power Source: {isCharging ? 'Power Adapter' : 'Battery'}
                </div>
                <div className="px-4 py-1 text-white/50">
                  {isCharging ? 'Battery is charging' : 'No warnings'}
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 px-2">
                  <div className="px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer">
                    Battery Preferences...
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded transition-colors h-full cursor-pointer">
          <span className="font-semibold">{time || "00:00"}</span>
        </div>
      </div>
    </motion.div>
  );
}

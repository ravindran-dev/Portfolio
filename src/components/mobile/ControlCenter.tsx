"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoWifi, IoBluetooth, IoAirplane, IoSunny, IoVolumeHigh, IoFlashlight, IoCamera, IoCalculator, IoPlay, IoPause, IoChevronForward, IoReloadCircleOutline, IoRocketOutline } from 'react-icons/io5';
import { MdSignalCellular4Bar } from 'react-icons/md';
import { useRef } from 'react';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlCenter({ isOpen, onClose }: ControlCenterProps) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [cellular, setCellular] = useState(true);
  const [brightness, setBrightness] = useState(70);
  const [volume, setVolume] = useState(40);

  const brightnessRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleLevelChange = (
    ref: React.RefObject<HTMLDivElement | null>,
    setter: (val: number) => void,
    info: { point: { y: number } }
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relativeY = info.point.y - rect.top;
    const percentage = Math.max(0, Math.min(100, 100 - (relativeY / rect.height) * 100));
    setter(Math.round(percentage));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for blur effect on main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/5 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-4 top-14 bottom-28 z-[80] bg-[#141419]/70 backdrop-blur-[45px] rounded-[48px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-y-auto overflow-x-hidden pointer-events-auto p-6 flex flex-col gap-6"
          >
            {/* Top Grid: Connectivity & Sliders */}
            <div className="grid grid-cols-2 gap-4">
              {/* Connectivity Card */}
              <div className="grid grid-cols-2 grid-rows-2 gap-3 bg-white/10 rounded-[32px] p-4 aspect-square">
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setWifi(!wifi)}
                  className={`rounded-full flex items-center justify-center text-white transition-colors duration-300 ${wifi ? 'bg-[#007AFF]' : 'bg-white/10'}`}
                >
                  <IoWifi size={20} />
                </motion.div>
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBluetooth(!bluetooth)}
                  className={`rounded-full flex items-center justify-center text-white transition-colors duration-300 ${bluetooth ? 'bg-[#007AFF]' : 'bg-white/10'}`}
                >
                  <IoBluetooth size={20} />
                </motion.div>
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAirplane(!airplane)}
                  className={`rounded-full flex items-center justify-center text-white transition-colors duration-300 ${airplane ? 'bg-[#FF9500]' : 'bg-white/10'}`}
                >
                  <IoAirplane size={20} />
                </motion.div>
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCellular(!cellular)}
                  className={`rounded-full flex items-center justify-center text-white transition-colors duration-300 ${cellular ? 'bg-[#4CD964]' : 'bg-white/10'}`}
                >
                  <MdSignalCellular4Bar size={20} />
                </motion.div>
              </div>

              {/* Sliders Grid (Side by side inside the right col) */}
              <div className="grid grid-cols-2 gap-3 h-full">
                {/* Brightness Slider */}
                <motion.div 
                  ref={brightnessRef}
                  onPan={(e, info) => handleLevelChange(brightnessRef, setBrightness, info)}
                  onClick={(e) => handleLevelChange(brightnessRef, setBrightness, { point: { y: e.clientY } })}
                  className="bg-white/10 rounded-[32px] relative overflow-hidden flex flex-col items-center justify-end p-4 h-full cursor-pointer touch-none"
                >
                  <motion.div 
                    animate={{ height: `${brightness}%` }}
                    className="absolute bottom-0 left-0 w-full bg-white transition-all duration-75"
                  />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <IoSunny size={24} className={brightness > 40 ? "text-[#FFCC00]" : "text-white/40"} />
                  </div>
                </motion.div>
                {/* Volume Slider */}
                <motion.div 
                  ref={volumeRef}
                  onPan={(e, info) => handleLevelChange(volumeRef, setVolume, info)}
                  onClick={(e) => handleLevelChange(volumeRef, setVolume, { point: { y: e.clientY } })}
                  className="bg-white/10 rounded-[32px] relative overflow-hidden flex flex-col items-center justify-end p-4 h-full cursor-pointer touch-none"
                >
                  <motion.div 
                    animate={{ height: `${volume}%` }}
                    className="absolute bottom-0 left-0 w-full bg-white transition-all duration-75"
                  />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <IoVolumeHigh size={24} className={volume > 40 ? "text-[#007AFF]" : "text-white/40"} />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Media Card replacement: Now Building */}
            <div className="bg-white/10 rounded-[32px] p-5 flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00fbfb] animate-pulse"></div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Now Building</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-white leading-tight">Neural Mesh v4</h4>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                   <IoRocketOutline className="text-[#00fbfb]" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-8 text-white/80">
                <IoPause size={28} />
                <IoPlay size={28} className="opacity-30" />
                <IoChevronForward size={28} />
              </div>
            </div>

            {/* Deploy Tile */}
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#00fbfb] rounded-[28px] p-6 flex items-center justify-between shadow-[0_0_20px_rgba(0,251,251,0.3)] cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#002020] uppercase tracking-wider">Production System</span>
                <span className="text-[20px] font-black text-[#002020]">DEPLOY PORTFOLIO</span>
              </div>
              <IoReloadCircleOutline size={40} className="text-[#002020]" />
            </motion.div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-white/10 rounded-full flex items-center justify-center text-white"><IoFlashlight size={22} /></div>
              <div className="aspect-square bg-white/10 rounded-full flex items-center justify-center text-white"><IoCamera size={22} /></div>
              <div className="aspect-square bg-white/10 rounded-full flex items-center justify-center text-white"><IoCalculator size={22} /></div>
              <div className="aspect-square bg-white/10 rounded-full flex items-center justify-center text-white"><IoReloadCircleOutline size={22} /></div>
            </div>

            {/* Close handle */}
            <div 
              className="mt-auto w-12 h-1.5 bg-white/20 rounded-full mx-auto" 
              onClick={onClose}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

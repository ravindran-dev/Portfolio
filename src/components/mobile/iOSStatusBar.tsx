"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoWifi, IoBatteryFull } from 'react-icons/io5';
import { MdSignalCellular4Bar } from 'react-icons/md';

interface IOSStatusBarProps {
  onOpenControlCenter: () => void;
}

export default function IOSStatusBar({ onOpenControlCenter }: IOSStatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' AM', '').replace(' PM', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      onPanEnd={(_, info) => {
        if (info.offset.y > 30) {
          onOpenControlCenter();
        }
      }}
      onClick={onOpenControlCenter}
      className="absolute top-0 left-0 w-full h-14 flex items-center justify-between px-5 pt-2 z-50 text-white font-sans pointer-events-auto cursor-pointer"
    >
      <div className="text-[15px] font-semibold w-16 text-center tracking-tight">
        {time}
      </div>
      
      {/* Spacer for Dynamic Island */}
      <div className="w-[120px] h-[32px] opacity-0" />
      
      <div className="flex items-center gap-1.5 w-16 justify-end">
        <MdSignalCellular4Bar className="text-[15px]" />
        <IoWifi className="text-[15px]" />
        <IoBatteryFull className="text-[20px]" />
      </div>

      {/* Swipe hint handle for UX */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/10 rounded-full" />
    </motion.div>
  );
}

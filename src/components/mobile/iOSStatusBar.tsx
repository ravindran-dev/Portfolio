"use client";

import { useState, useEffect } from 'react';
import { IoWifi, IoBatteryFull } from 'react-icons/io5';
import { MdSignalCellular4Bar } from 'react-icons/md';

export default function IOSStatusBar() {
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
    <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-between px-5 pt-2 z-50 text-white font-sans pointer-events-none">
      <div className="text-[15px] font-semibold w-16 text-center tracking-tight">
        {time}
      </div>
      
      {/* Dynamic Island */}
      <div className="w-[120px] h-[32px] bg-black rounded-[16px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center relative pointer-events-auto cursor-pointer group transition-all duration-300 hover:w-[130px]">
        {/* Camera cutout reflection */}
        <div className="w-3 h-3 rounded-full bg-[#111] absolute right-[10px] shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full"></div>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 w-16 justify-end">
        <MdSignalCellular4Bar className="text-[15px]" />
        <IoWifi className="text-[15px]" />
        <IoBatteryFull className="text-[20px]" />
      </div>
    </div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { 
  IoHomeOutline, IoHome, 
  IoPersonOutline, IoPerson, 
  IoFolderOutline, IoFolder, 
  IoStarOutline, IoStar, 
  IoMailOutline, IoMail 
} from 'react-icons/io5';

interface IOSTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  { id: 'home', icon: IoHomeOutline, activeIcon: IoHome, label: 'Home' },
  { id: 'about', icon: IoPersonOutline, activeIcon: IoPerson, label: 'About' },
  { id: 'projects', icon: IoFolderOutline, activeIcon: IoFolder, label: 'Projects' },
  { id: 'skills', icon: IoStarOutline, activeIcon: IoStar, label: 'Skills' },
  { id: 'contact', icon: IoMailOutline, activeIcon: IoMail, label: 'Contact' },
];

export default function IOSTabBar({ activeTab, setActiveTab }: IOSTabBarProps) {
  return (
    <div className="absolute bottom-6 left-0 w-full px-5 z-50 pb-safe">
      <div className="w-full h-16 rounded-[2rem] bg-[#111318]/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-between px-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = isActive ? tab.activeIcon : tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative w-[52px] h-[52px] flex flex-col items-center justify-center rounded-full"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <motion.div
                animate={{ 
                  scale: isActive ? 1.15 : 1,
                  color: isActive ? '#00fbfb' : '#b9cac9'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative z-10"
              >
                <Icon size={24} className={isActive ? "drop-shadow-[0_0_8px_rgba(0,251,251,0.6)]" : ""} />
              </motion.div>
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#00fbfb]/10 rounded-full border border-[#00fbfb]/20"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

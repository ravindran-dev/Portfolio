"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IOSStatusBar from './iOSStatusBar';
import IOSTabBar from './iOSTabBar';
import IOSLoader from './iOSLoader';
import DynamicIsland from './DynamicIsland';
import ControlCenter from './ControlCenter';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

export default function IOSPortfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="relative w-full h-[100dvh] bg-[#0a0a0a] overflow-hidden flex flex-col font-sans selection:bg-[#00fbfb]/30">
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 z-[100]"
          >
            <IOSLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <ControlCenter 
        isOpen={isControlCenterOpen} 
        onClose={() => setIsControlCenterOpen(false)} 
      />

      {/* Animated Wallpaper */}
      <motion.div 
        animate={{ 
          scale: isControlCenterOpen ? 0.92 : 1,
          filter: isControlCenterOpen ? "blur(20px) brightness(0.5)" : "blur(0px) brightness(1)",
          borderRadius: isControlCenterOpen ? "40px" : "0px"
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00fbfb]/10 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#4f51dd]/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 noise-grain opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <IOSStatusBar onOpenControlCenter={() => setIsControlCenterOpen(true)} />
      <DynamicIsland activeTab={activeTab} />

      <motion.main 
        animate={{ 
          scale: isControlCenterOpen ? 0.92 : 1,
          opacity: isControlCenterOpen ? 0.5 : 1,
          filter: isControlCenterOpen ? "blur(10px)" : "blur(0px)"
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative flex-1 w-full h-full z-10 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full absolute inset-0"
            >
              <HomePage setActiveTab={setActiveTab} />
            </motion.div>
          )}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full absolute inset-0"
            >
              <AboutPage />
            </motion.div>
          )}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full absolute inset-0"
            >
              <ProjectsPage />
            </motion.div>
          )}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full absolute inset-0"
            >
              <SkillsPage />
            </motion.div>
          )}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full absolute inset-0"
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <IOSTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

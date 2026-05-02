"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IOSStatusBar from './iOSStatusBar';
import IOSTabBar from './iOSTabBar';
import IOSLoader from './iOSLoader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

export default function IOSPortfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

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
            className="absolute inset-0 z-50"
          >
            <IOSLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Wallpaper */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00fbfb]/10 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#4f51dd]/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-[#006a6a]/10 blur-[80px] rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      <IOSStatusBar />

      <main className="relative flex-1 w-full h-full z-10 overflow-hidden">
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
      </main>

      <IOSTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

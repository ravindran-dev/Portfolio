"use client";

import { useState, useEffect } from "react";
import DesktopEnvironment from "@/components/DesktopEnvironment";
import IOSPortfolio from "@/components/mobile/iOSPortfolio";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkViewport();
    
    // Add event listener
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) return <div className="w-full h-screen bg-[#0a0a0a]" />;

  return (
    <main className="w-full h-screen overflow-hidden">
      {isMobile ? <IOSPortfolio /> : <DesktopEnvironment />}
    </main>
  );
}

"use client";

import { useState } from "react";
import Window from "@/components/Window";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Achievements from "./Achievements";

import { FiUser, FiCode, FiBriefcase, FiAward, FiStar, FiSidebar } from "react-icons/fi";

export default function Explorer() {
  const [activeTab, setActiveTab] = useState("about");
  const [showSidebar, setShowSidebar] = useState(true);

  const tabs = [
    { id: "about", label: "About", icon: FiUser },
    { id: "skills", label: "Skills", icon: FiCode },
    { id: "projects", label: "Projects", icon: FiBriefcase },
    { id: "experience", label: "Experience", icon: FiStar },
    { id: "achievements", label: "Achievements", icon: FiAward },
  ];

  return (
    <Window id="explorer" title="Finder" defaultWidth={900} defaultHeight={600}>
      <div className="flex w-full h-full bg-surface-container/50 overflow-hidden text-foreground">
        
        {/* Sidebar Toggle Button for Mobile/Compact View */}
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute top-2 left-2 z-50 p-2 bg-black/20 hover:bg-black/40 rounded-md text-white transition-colors"
          title="Toggle Sidebar"
        >
          <FiSidebar />
        </button>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-48 bg-surface-container-low border-r border-white/5 p-4 pt-12 flex flex-col gap-2 shrink-0">
            <div className="text-xs text-foreground/50 font-bold uppercase tracking-wider mb-2 px-2">Favorites</div>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-3 py-2 rounded-lg transition-colors flex gap-3 ${
                  activeTab === tab.id 
                    ? "bg-primary/20 text-primary border border-primary/20 font-medium" 
                    : "hover:bg-surface-container-high text-foreground/80 hover:text-foreground border border-transparent"
                }`}
              >
                <tab.icon className={`text-lg mt-[2px] ${activeTab === tab.id ? "text-primary" : "text-foreground/60"}`} />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Main Content Area (Document Viewer Aesthetic) */}
        <div className="flex-1 overflow-auto bg-[#e5e5e5] relative flex p-8">
          <div className="w-full max-w-3xl bg-white shadow-2xl rounded-sm min-h-[800px] flex flex-col relative text-[#131313]">
            {/* Document Header Image */}
            <div className="w-full h-48 relative border-b border-black/10 overflow-hidden">
              {/* Using local asset as background */}
              <div 
                className="absolute inset-0 bg-cover bg-[center_15%]"
                style={{ backgroundImage: "url('/assets/photo3.png')" }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-6">
                  <h1 className="text-white text-4xl font-display font-bold capitalize drop-shadow-md">{activeTab}</h1>
                  <p className="text-white/80 text-sm font-mono mt-1">ravindran-dev.github.io/documentation</p>
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-8 prose prose-slate max-w-none">
              {/* We're mounting the components but wrapping them in a light theme override */}
              <div className="dark:text-black">
                {activeTab === "about" && <div className="text-black children-text-black"><About /></div>}
                {activeTab === "skills" && <div className="text-black children-text-black"><Skills /></div>}
                {activeTab === "projects" && <div className="text-black children-text-black"><Projects /></div>}
                {activeTab === "experience" && <div className="text-black children-text-black"><Experience /></div>}
                {activeTab === "achievements" && <div className="text-black children-text-black"><Achievements /></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

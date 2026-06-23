import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "@/components/Window";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Achievements from "./Achievements";
import { projectsData } from "@/data/projectsData";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";

import { 
  FiClock, FiUsers, FiGrid, FiDownload, FiMonitor, FiFileText, 
  FiChevronLeft, FiChevronRight, FiShare, FiSearch, FiMoreHorizontal, 
  FiX, FiMinus, FiMaximize2, FiTerminal, FiAward, FiStar, FiZap, FiCode
} from "react-icons/fi";
import { FcFolder, FcBriefcase, FcMultipleDevices } from "react-icons/fc";
import { SiJson, SiGoogledrive } from "react-icons/si";
import { useDesktopStore } from "@/store/useDesktopStore";

export default function Explorer() {
  const [openedFile, setOpenedFile] = useState<string | null>(null);
  const [openedProject, setOpenedProject] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [selectedSidebar, setSelectedSidebar] = useState("documents");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { openWindow, closeWindow, minimizeWindow, maximizeWindow } = useDesktopStore();

  useEffect(() => {
    const handleOpenFile = (e: any) => {
      const { id, type } = e.detail;
      setSelectedSidebar("documents");
      setSearchQuery("");
      
      if (type === "folder") {
        setCurrentFolder(id);
        setOpenedFile(null);
        setOpenedProject(null);
      } else if (type === "project") {
        setCurrentFolder("projects-folder");
        setOpenedProject(id);
        setOpenedFile(null);
      } else if (type === "file") {
        if (id === "resume") {
          openWindow("resume", "Resume");
        } else if (id === "contact") {
          openWindow("contact", "Contact");
        } else {
          if (["leetcode", "tiforge", "sustainability", "icpc"].includes(id)) {
            setCurrentFolder("achievements-folder");
          } else {
            setCurrentFolder(null);
          }
          setOpenedFile(id);
          setOpenedProject(null);
        }
      }
    };
    window.addEventListener('open-finder-file', handleOpenFile);
    return () => window.removeEventListener('open-finder-file', handleOpenFile);
  }, []);

  const sidebarSections = [
    {
      title: "Favorites",
      items: [
        { id: "recents", label: "Recents", icon: FiClock },
        { id: "shared", label: "Shared", icon: FiUsers },
        { id: "applications", label: "Applications", icon: FiGrid },
        { id: "desktop", label: "Desktop", icon: FiMonitor },
        { id: "documents", label: "Documents", icon: FiFileText, active: true },
        { id: "downloads", label: "Downloads", icon: FiDownload },
      ]
    },
    {
      title: "Locations",
      items: [
        { id: "gdrive", label: "Google Drive", icon: SiGoogledrive },
      ]
    },
    {
      title: "Tags",
      items: [
        { id: "tag-urgent", label: "Urgent", icon: () => <div className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" /> },
        { id: "tag-work", label: "Work", icon: () => <div className="w-2.5 h-2.5 rounded-full bg-[#ff9500]" /> },
        { id: "tag-ai", label: "AI", icon: () => <div className="w-2.5 h-2.5 rounded-full bg-[#007aff]" /> },
        { id: "tag-projects", label: "Projects", icon: () => <div className="w-2.5 h-2.5 rounded-full bg-[#34c759]" /> },
      ]
    }
  ];

  const files = [
    { id: "about", label: "About Me.pages", type: "file", icon: <div className="w-16 h-16 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex items-center justify-center text-blue-400 font-bold font-serif text-2xl">A</div> },
    { id: "skills", label: "Skills.json", type: "file", icon: <div className="w-16 h-16 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex items-center justify-center text-yellow-500 text-3xl"><SiJson /></div> },
    { id: "projects-folder", label: "Projects", type: "folder", icon: <FcFolder className="text-[64px]" /> },
    { id: "resume", label: "Resume.pdf", type: "file", icon: <div className="w-14 h-16 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex flex-col items-center justify-center text-red-400 overflow-hidden relative"><div className="absolute top-0 w-full h-4 bg-red-600 flex items-center justify-center text-[7px] font-bold text-white tracking-widest">PDF</div><FiFileText className="text-2xl mt-3" /></div> },
    { id: "experience", label: "Experience.log", type: "file", icon: <div className="w-16 h-16 bg-[#1a1b26] rounded shadow-sm border border-gray-700 flex items-center justify-center text-gray-300 text-2xl"><FiTerminal /></div> },
    { id: "contact", label: "Contact.sh", type: "file", icon: <div className="w-16 h-16 bg-[#1a1b26] rounded shadow-sm border border-gray-700 flex items-center justify-center text-green-400 text-2xl font-mono">{">_"}</div> },
    { id: "achievements-folder", label: "Achievements", type: "folder", icon: <FcFolder className="text-[64px]" /> },
  ];

  const desktopFiles = [
    files.find(f => f.id === "about"),
    files.find(f => f.id === "resume"),
    files.find(f => f.id === "projects-folder"),
  ].filter(Boolean);

  const projectFiles = [
    { id: "MachineGuard", label: "MachineGuard", type: "project", icon: <FcBriefcase className="text-[64px]" /> },
    { id: "MicroDet", label: "MicroDet", type: "project", icon: <FcMultipleDevices className="text-[64px]" /> },
    { id: "GenuineGate", label: "GenuineGate", type: "project", icon: <div className="w-16 h-16 bg-[#1e1e1e] rounded-xl border border-white/10 flex items-center justify-center text-purple-400 shadow-lg"><FiCode className="text-3xl" /></div> },
    { id: "AirMouse3D", label: "AirMouse3D", type: "project", icon: <div className="w-16 h-16 bg-[#1e1e1e] rounded-xl border border-white/10 flex items-center justify-center text-blue-400 shadow-lg"><FiZap className="text-3xl" /></div> },
    { id: "MiningLCA", label: "Mining LCA Tool", type: "project", icon: <div className="w-16 h-16 bg-[#1e1e1e] rounded-xl border border-white/10 flex items-center justify-center text-green-400 shadow-lg"><FiMonitor className="text-3xl" /></div> },
    { id: "AISoftSkill", label: "AI Soft Skill Coach", type: "project", icon: <div className="w-16 h-16 bg-[#1e1e1e] rounded-xl border border-white/10 flex items-center justify-center text-orange-400 shadow-lg"><FiUsers className="text-3xl" /></div> },
  ];

  const achievementFiles = [
    { 
      id: "leetcode", 
      label: "LeetCode Knight.pages", 
      type: "file", 
      icon: <div className="w-16 h-16 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex items-center justify-center text-yellow-500 text-3xl"><FiAward /></div>, 
      content: "Knight Status on LeetCode: Achieved a peak contest rating of 2071 (Knight badge holder). Solved 500+ problems across various categories including Dynamic Programming, Graph Theory, and Advanced Algorithms. Consistently ranked in the top 500 in weekly and bi-weekly contests." 
    },
    { 
      id: "tiforge", 
      label: "Ti Forge 2026.pages", 
      type: "file", 
      icon: <div className="w-16 h-16 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex items-center justify-center text-blue-400 text-3xl"><FiStar /></div>, 
      content: "First Place Winner at Ti Forge 2026 Hackathon: Developed 'Machine Guard AI', an IoT-driven industrial monitoring platform with autonomous anomaly detection. Our solution focused on predictive maintenance and worker safety, securing the grand prize of INR 50,000 against 50+ competing teams." 
    },
    { 
      id: "sustainability", 
      label: "Sustainability Hackathon.pages", 
      type: "file", 
      icon: <div className="w-16 h-16 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex items-center justify-center text-green-400 text-3xl"><FiZap /></div>, 
      content: "First Place at AI for Sustainability Hackathon: Built an AI system for real-time carbon footprint tracking and optimization in manufacturing supply chains. Awarded USD 125 and Amazon vouchers worth 300 AED. Recognized for technical innovation and environmental impact." 
    },
    { 
      id: "icpc", 
      label: "ICPC 2025.pages", 
      type: "file", 
      icon: <div className="w-16 h-16 bg-[#2d2d2d] rounded shadow-sm border border-white/10 flex items-center justify-center text-purple-400 text-3xl"><FiAward /></div>, 
      content: "International Collegiate Programming Contest (ICPC) 2025: Secured Global Rank 2,605 in the Preliminary Round out of tens of thousands of participants worldwide. Demonstrated advanced problem-solving skills and algorithmic efficiency under extreme pressure." 
    },
  ];

  const handleDoubleClick = (item: any) => {
    if (item.type === "folder") {
      setCurrentFolder(item.id);
      setSearchQuery("");
    } else if (item.type === "project") {
      setOpenedProject(item.id);
    } else {
      if (item.id === "resume") openWindow("resume", "Resume");
      else if (item.id === "contact") openWindow("contact", "Contact");
      else if (item.id === "experience") setOpenedFile("experience");
      else if (item.id === "about") setOpenedFile("about");
      else if (item.id === "skills") setOpenedFile("skills");
      else if (["leetcode", "tiforge", "sustainability", "icpc"].includes(item.id)) {
        // Handle achievement files
        setOpenedFile(item.id);
      }
    }
  };

  const getGridItems = () => {
    let items: any[] = [];
    if (selectedSidebar === "documents") {
      if (currentFolder === "projects-folder") items = projectFiles;
      else if (currentFolder === "achievements-folder") items = achievementFiles;
      else items = files;
    } else if (selectedSidebar === "tag-projects") {
      items = projectFiles;
    } else if (selectedSidebar === "desktop") {
      items = desktopFiles;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!currentFolder && selectedSidebar === "documents") {
        items = [...files, ...projectFiles, ...achievementFiles].filter(i => i.label.toLowerCase().includes(query) && i.id !== "projects-folder" && i.id !== "achievements-folder");
      } else {
        items = items.filter(i => i.label.toLowerCase().includes(query));
      }
    }

    return items;
  };

  const filteredItems = useMemo(() => getGridItems(), [selectedSidebar, currentFolder, searchQuery]);

  return (
    <Window id="explorer" hideHeader={true} variant="macos-dark" defaultWidth={950} defaultHeight={650}>
      {(startDrag) => (
        <div className="flex w-full h-full text-white/90 font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','Inter',sans-serif]">
          
          {/* Sidebar */}
          <div className="w-56 bg-[rgba(30,30,30,0.5)] border-r border-white/5 flex flex-col shrink-0">
            <div onPointerDown={startDrag} className="h-[52px] flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing w-full shrink-0">
              <button onClick={(e) => { e.stopPropagation(); closeWindow("explorer"); }} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/90 border border-[#e0443e] flex items-center justify-center group transition-colors"><FiX className="text-black/60 text-[8px] opacity-0 group-hover:opacity-100" /></button>
              <button onClick={(e) => { e.stopPropagation(); minimizeWindow("explorer"); }} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/90 border border-[#dea123] flex items-center justify-center group transition-colors"><FiMinus className="text-black/60 text-[8px] opacity-0 group-hover:opacity-100" /></button>
              <button onClick={(e) => { e.stopPropagation(); maximizeWindow("explorer"); }} className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/90 border border-[#1aab29] flex items-center justify-center group transition-colors"><FiMaximize2 className="text-black/60 text-[6px] opacity-0 group-hover:opacity-100 rotate-45" /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4">
              {sidebarSections.map((section, idx) => (
                <div key={idx} className="mb-4">
                  <div className="text-[11px] text-white/40 font-semibold px-2 mb-1 uppercase tracking-wider">{section.title}</div>
                  <div className="flex flex-col gap-[1px]">
                    {section.items.map(item => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedSidebar(item.id);
                            setCurrentFolder(null);
                            setOpenedFile(null);
                            setOpenedProject(null);
                            setSearchQuery("");
                          }}
                          className={`text-left px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                            selectedSidebar === item.id ? "bg-[#0058d0] text-white" : "hover:bg-white/5 text-white/70 hover:text-white"
                          }`}
                        >
                          <span className={`text-[15px] ${selectedSidebar === item.id ? "text-white" : "text-[#0a84ff]"}`}><Icon /></span>
                          <span className="text-[13px] font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#1c1c1e]/50">
            <div onPointerDown={startDrag} className="h-[52px] border-b border-white/5 flex items-center px-4 justify-between cursor-grab active:cursor-grabbing w-full shrink-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    if (openedProject) setOpenedProject(null);
                    else if (openedFile) setOpenedFile(null);
                    else if (currentFolder) setCurrentFolder(null);
                  }}
                  disabled={!openedFile && !currentFolder && !openedProject}
                  className={`p-1 rounded transition-colors ${!openedFile && !currentFolder && !openedProject ? "opacity-30 cursor-not-allowed text-white/50" : "hover:bg-white/10 text-white/90"}`}
                >
                  <FiChevronLeft className="text-xl" />
                </button>
                <button disabled className="p-1 rounded opacity-30 cursor-not-allowed text-white/50"><FiChevronRight className="text-xl" /></button>
                
                <h2 className="text-[14px] font-bold text-white/90 ml-2">
                  {openedProject ? projectsData[openedProject as keyof typeof projectsData]?.title : openedFile ? files.find(f => f.id === openedFile)?.label || achievementFiles.find(a => a.id === openedFile)?.label : currentFolder === "projects-folder" ? "Projects" : currentFolder === "achievements-folder" ? "Achievements" : sidebarSections.flatMap(s => s.items).find(i => i.id === selectedSidebar)?.label}
                </h2>
              </div>
              
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-md shadow-sm border border-white/5 p-1 pointer-events-none">
                  <div className="p-1 bg-white/10 rounded text-white"><FiGrid /></div>
                  <div className="p-1"><FiFileText /></div>
                  <div className="p-1"><FiMonitor /></div>
                </div>
                <div className="relative flex items-center gap-2">
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 150, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <input 
                          type="text" 
                          placeholder="Search" 
                          autoFocus
                          value={searchQuery} 
                          onChange={(e) => setSearchQuery(e.target.value)} 
                          onPointerDown={(e) => e.stopPropagation()} 
                          onBlur={() => { if (!searchQuery) setIsSearchOpen(false); }}
                          className="w-full bg-[#2d2d2d] border border-white/10 rounded-md pl-2 pr-2 py-1 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#0a84ff] focus:ring-1 focus:ring-[#0a84ff]" 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className={`p-1.5 rounded-md transition-colors ${isSearchOpen ? 'bg-[#0058d0] text-white' : 'hover:bg-white/10 text-white/70'}`}
                  >
                    <FiSearch className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content View */}
            {!openedFile && !openedProject ? (
              currentFolder === "achievements-folder" ? (
                <div className="flex-1 overflow-y-auto bg-[#131316]/95 text-white m-4 rounded-xl p-2 shadow-inner border border-white/10">
                  <Achievements />
                </div>
              ) : (
                <div className="p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-10 place-items-start overflow-y-auto content-start flex-1">
                  {filteredItems.map(item => (
                    <div key={item.id} onDoubleClick={() => handleDoubleClick(item)} className="flex flex-col items-center gap-2 cursor-pointer group w-24 p-2 rounded-lg hover:bg-white/5 transition-all">
                      <div className="drop-shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">{item.icon}</div>
                      <span className="text-[12px] text-white/80 text-center font-medium group-hover:bg-[#0058d0] group-hover:text-white px-1.5 py-0.5 rounded transition-colors line-clamp-2">{item.label}</span>
                    </div>
                  ))}
                  {filteredItems.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center mt-20 text-white/40 w-full">
                      <FiSearch className="text-4xl mb-4 opacity-50" />
                      <p>No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )
            ) : openedProject ? (
              <ProjectCaseStudy projectId={openedProject} />
            ) : (
              <div className="flex-1 overflow-y-auto bg-[#1e1e1e] p-8">
                <div className="max-w-3xl mx-auto">
                  <div className="prose prose-invert max-w-none text-white/90">
                    {openedFile === "about" && <About />}
                    {openedFile === "skills" && <Skills />}
                    {openedFile === "experience" && <Experience />}
                    {achievementFiles.find(a => a.id === openedFile) && (
                      <div className="bg-[#2d2d2d] p-8 rounded-xl border border-white/10 shadow-xl">
                         <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <FiAward className="text-yellow-500" />
                            {achievementFiles.find(a => a.id === openedFile)?.label.replace(".pages", "")}
                         </h2>
                         <p className="text-lg text-white/80 leading-relaxed italic">
                            "{achievementFiles.find(a => a.id === openedFile)?.content}"
                         </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Window>
  );
}

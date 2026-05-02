"use client";

import { useState, useRef, useEffect } from "react";
import Window from "@/components/Window";
import { FaLinux, FaRegClock, FaUser, FaFolder } from "react-icons/fa6";

interface TerminalLine {
  id: string;
  type: "input" | "output";
  content: React.ReactNode;
}

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: "0", type: "output", content: "RavindranOS v1.0.0 (tty1)\n\nType \"help\" for a list of available commands." }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const executeCommand = (cmd: string): React.ReactNode => {
    const args = cmd.trim().split(" ");
    const command = args[0].toLowerCase();

    switch (command) {
      case "help":
        return (
          <div className="flex flex-col gap-1 text-white/80">
            <div><span className="text-cyan-400 font-bold w-20 inline-block">whoami</span> - Display current user info</div>
            <div><span className="text-cyan-400 font-bold w-20 inline-block">fastfetch</span> - Display system information</div>
            <div><span className="text-cyan-400 font-bold w-20 inline-block">ls</span> - List directory contents</div>
            <div><span className="text-cyan-400 font-bold w-20 inline-block">clear</span> - Clear the terminal</div>
            <div><span className="text-cyan-400 font-bold w-20 inline-block">contact</span> - Show contact links</div>
            <div><span className="text-cyan-400 font-bold w-20 inline-block">projects</span> - List portfolio projects</div>
          </div>
        );
      case "whoami":
        return "AI/ML Engineer | Backend Developer | Systems Programmer | Open Source Contributor";
      case "fastfetch":
        return (
          <pre className="text-white/80 font-mono">
{`OS: Arch Linux x86_64
Kernel: 6.18.7
Shell: zsh
WM: Hyprland
Editor: Neovim
Languages: Python, Rust, Golang, C++, Java, JavaScript, TypeScript
AI & ML: PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV, Pytorch Lightning, Hugging Face, RAG
Backend: Flask, FastAPI, Node.js, Express.js, MQTT, REST APIs
Frontend: React, Next.js, HTML, CSS, Tailwind, Kotlin (Android)
Database: PostgreSQL, MongoDB, SQLite, Firebase
DevOps: Docker, Git, Linux, CI/CD`}
          </pre>
        );
      case "ls":
        return "about.md  skills/  projects/  resume.pdf  contact.sh";
      case "contact":
      case "./contact.sh":
        return (
          <div className="flex gap-4 text-cyan-400">
            <a href="https://github.com/ravindran-dev" target="_blank" className="hover:underline hover:text-white">GitHub</a> | 
            <a href="https://www.linkedin.com/in/ravindran-s-982702327" target="_blank" className="hover:underline hover:text-white">LinkedIn</a> | 
            <a href="mailto:ravindrans.dev@gmail.com" className="hover:underline hover:text-white">Email</a>
          </div>
        );
      case "projects":
        return (
          <pre className="text-white/80 font-mono">
{`projects/
├── GenuineGate (Golang + WebSocket)
├── Microdet (PyTorch + OpenCV)
├── Mining LCA Tool (RAG + Full-Stack)
├── SpamZero (ML + React)
├── SmartSpend (ML + Full-Stack)
└── Linux Tools & Dotfiles`}
          </pre>
        );
      case "":
        return "";
      default:
        return `zsh: command not found: ${command}`;
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const cmd = input;
    setInput("");
    
    // Add input to history
    const inputId = Date.now().toString();
    setHistory(prev => [...prev, { id: inputId, type: "input", content: cmd }]);

    // Execute and add output to history
    const output = executeCommand(cmd);
    if (output !== "") {
      setHistory(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        type: "output", 
        content: output 
      }]);
    }
  };

  const Prompt = () => (
    <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-[13px] font-medium mt-4">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#38bdf8] transition-all">
        <FaLinux className="drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" /> Arch Linux
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#a78bfa] transition-all">
        <FaRegClock className="drop-shadow-[0_0_10px_rgba(167,139,250,0.8)]" /> {getTime()}
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#22c55e] transition-all">
        <FaUser className="drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" /> ravindran@s
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#facc15] transition-all">
        <FaFolder className="drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" /> ~
      </div>
      <span className="text-[#38bdf8] font-bold text-lg drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] ml-1">❯</span>
    </div>
  );

  return (
    <Window id="terminal" title="terminal - bash" defaultWidth={860} defaultHeight={600}>
      <div 
        className="w-full h-full bg-[#0a0a0a]/93 backdrop-blur-3xl p-6 font-mono text-[14px] leading-[1.65] text-[#e5e7eb] overflow-auto cursor-text shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
        onClick={() => document.getElementById("terminal-input")?.focus()}
      >
        <div className="flex flex-col gap-1 max-w-4xl">
          {history.map((line) => (
            <div key={line.id} className="whitespace-pre-wrap break-words">
              {line.type === "input" && (
                <div className="flex flex-col">
                  <Prompt />
                  <div className="text-white font-mono ml-2 mt-1">{line.content}</div>
                </div>
              )}
              {line.type === "output" && (
                <div className="text-gray-300 mt-2 mb-2 ml-2 font-mono">{line.content}</div>
              )}
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex flex-col flex-wrap mt-2">
            <Prompt />
            <div className="flex items-center ml-2 mt-1">
              <input
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none border-none text-white font-mono text-[14px] caret-[#38bdf8]"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </form>
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>
    </Window>
  );
}

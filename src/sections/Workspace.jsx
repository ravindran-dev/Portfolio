import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Workspace = () => {
  const [output, setOutput] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(true);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const hasRunAnimation = useRef(false);

  const commands = {
    help: `Available commands:
  whoami        - Display user information
  fastfetch     - System information
  ls            - List directory contents
  cat           - Read file contents
  tree          - Display directory tree
  contact       - Show contact information
  clear         - Clear terminal
  projects      - Show projects
  skills        - Show skills
  help          - Show this help message`,
    
    whoami: 'AI/ML Engineer | Backend Developer | Systems Programmer | Open Source Contributor',
    
    fastfetch: `OS: Arch Linux x86_64
Kernel: 6.18.7
Shell: zsh
WM: Hyprland
Editor: Neovim
Languages: Python, Rust, Golang, C++, Java, JavaScript, TypeScript
AI & ML: PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV, Pytorch Lightning, Hugging Face, RAG
Backend: Flask, FastAPI, Node.js, Express.js, MQTT, REST APIs
Frontend: React, HTML, CSS, Tailwind, Kotlin (Android)
Database: PostgreSQL, MongoDB, SQLite, Firebase
DevOps: Docker, Git, Linux, CI/CD`,
    
    ls: 'about.md  skills/  projects/  contact.sh',
    
    'cat about.md': `Ravindran S | B.E AI & ML (2024-2028) | CGPA: 9.24/10
Chennai Institute of Technology, Chennai
Passionate about AI/ML, systems programming, and building scalable solutions.
Experience in full-stack development, computer vision, and backend systems.
Active open-source contributor and Linux enthusiast.`,
    
    'tree skills/': `skills/
├── ai-ml/
│   ├── machine-learning.txt
│   ├── deep-learning.txt
│   ├── computer-vision.txt
│   └── rag-systems.txt
├── backend/
│   ├── golang.txt
│   ├── rust.txt
│   ├── python.txt
│   └── MQTT & APIs.txt
├── frontend/
│   ├── react.txt
│   └── Mern stack.txt
├── systems/
│   ├── linux.txt
│   └── docker.txt
└── cloud/
    ├── gcp.txt
    └── aws.txt`,
    
    'tree projects/': `projects/
├── GenuineGate (Golang + WebSocket)
│   └── Real-time bot detection system with 40% faster response time
│       Tech: Golang, Gin, WebSocket, PostgreSQL
├── Microdet (PyTorch + OpenCV)
│   └── Drone-based object detection for border security
│       92% accuracy | YOLOv8 + CNN | Smart India Hackathon
├── Mining LCA Tool (RAG + Full-Stack)
│   └── Life cycle assessment platform for mining industry
│       Tech: Python, React, RAG, Vector DB
├── SpamZero (ML + React)
│   └── Real-time spam detection with 95% accuracy
│       Tech: Scikit-learn, Flask, React
├── SmartSpend (ML + Full-Stack)
│   └── Expense tracking with ML-powered insights
│       Tech: Flask, React, ML algorithms
└── Linux Tools & Dotfiles
    └── Neovim, Tmux, and system configurations
        Rust TUI apps for productivity`,
    
    projects: 'Use "tree projects/" to see all projects',
    skills: 'Use "tree skills/" to see all skills',
    
    './contact.sh': 'contact',
    contact: 'contact'
  };

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const addOutput = (type, content, cmd = '') => {
    setOutput(prev => [...prev, { type, content, cmd, time: getTime() }]);
  };

  const typeCommand = async (cmd, text) => {
    for (let i = 0; i <= text.length; i++) {
      setCurrentCommand(text.slice(0, i));
      await sleep(40);
    }
    await sleep(300);
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;
    
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    addOutput('command', cmd);

    if (trimmedCmd === 'clear') {
      setOutput([]);
      return;
    }

    const commandKey = Object.keys(commands).find(key => 
      key.toLowerCase() === trimmedCmd
    );

    if (commandKey) {
      const output = commands[commandKey];
      if (output === 'contact') {
        addOutput('contact', '');
      } else {
        addOutput('output', output);
      }
    } else {
      addOutput('error', `Command not found: ${cmd}. Type 'help' for available commands.`);
    }
  };

  const handleKeyDown = (e) => {
    if (isAnimating) return;

    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  const runInitialAnimation = async () => {
    const script = [
      { cmd: 'whoami', delay: 300 },
      { cmd: 'fastfetch', delay: 800 },
      { cmd: 'ls', delay: 400 },
      { cmd: 'tree projects/', delay: 600 },
      { cmd: 'contact', delay: 400 }
    ];

    for (const step of script) {
      await typeCommand(step.cmd, step.cmd);
      executeCommand(step.cmd);
      setCurrentCommand('');
      await sleep(step.delay);
    }
    
    setIsAnimating(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!hasRunAnimation.current) {
      hasRunAnimation.current = true;
      runInitialAnimation();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, currentCommand]);

  const Prompt = ({ showInput = false, typingCommand = '' }) => (
    <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap mb-2">
      <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/20 transition-all text-xs sm:text-sm shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
        <i className="fa-brands fa-linux text-cyan-400 text-xs sm:text-sm" style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.6)' }}></i>
        <span className="text-cyan-400 font-semibold">Arch</span>
      </span>
      <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/20 transition-all text-xs sm:text-sm shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
        <i className="fa-regular fa-clock text-purple-400 text-xs sm:text-sm" style={{ textShadow: '0 0 10px rgba(192, 132, 252, 0.6)' }}></i>
        <span className="text-purple-400">{getTime()}</span>
      </span>
      <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/20 transition-all text-xs sm:text-sm shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
        <i className="fa-solid fa-user text-green-400 text-xs sm:text-sm" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.6)' }}></i>
        <span className="text-green-400">ravindran@s</span>
      </span>
      <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/20 transition-all text-xs sm:text-sm shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
        <i className="fa-solid fa-folder text-yellow-400 text-xs sm:text-sm" style={{ textShadow: '0 0 10px rgba(250, 204, 21, 0.6)' }}></i>
        <span className="text-yellow-400">~</span>
      </span>
      <span className="text-pink-500 font-bold text-base sm:text-lg ml-0.5 sm:ml-1" style={{ textShadow: '0 0 12px rgba(236, 72, 153, 0.8)' }}>❯</span>
      {showInput && (
        <span className="text-white ml-1 sm:ml-2 text-xs sm:text-sm">{typingCommand}</span>
      )}
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center px-2 py-16 sm:px-4 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.12),transparent_42%),radial-gradient(circle_at_82%_78%,rgba(14,165,233,0.10),transparent_38%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-5xl"
      >
        <div className="terminal-window relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-black/45 backdrop-blur-2xl sm:rounded-3xl"
          style={{
            boxShadow: '0 0 0 1px rgba(34, 211, 238, 0.25), 0 0 26px rgba(34, 211, 238, 0.12), 0 28px 70px rgba(0, 0, 0, 0.72)'
          }}
        >
          {/* Terminal decorative border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none sm:rounded-3xl"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 0 22px rgba(34, 211, 238, 0.08)'
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_35%,rgba(255,255,255,0)_60%)]" />

          {/* Terminal Header */}
          <div className="terminal-header bg-black/55 backdrop-blur-xl px-3 sm:px-5 py-2 sm:py-3 flex items-center gap-2 border-b border-cyan-400/25 relative">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-white/90 text-xs sm:text-sm font-medium truncate">Ravindran S ~ Workspace</span>
            
            {/* Decorative line */}
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="terminal-content bg-black/50 backdrop-blur-xl p-3 sm:p-6 font-mono text-xs sm:text-sm overflow-y-auto"
            style={{ 
              height: '64vh',
              maxHeight: '600px',
              fontFamily: '"JetBrains Mono", "Fira Code", monospace'
            }}
            onClick={() => !isAnimating && inputRef.current?.focus()}
          >
            {output.map((item, index) => (
              <div key={index} className="mb-3 sm:mb-4">
                {item.type === 'command' && (
                  <>
                    <Prompt />
                    <div className="text-white ml-1 sm:ml-2 mb-1.5 sm:mb-2 text-xs sm:text-sm">{item.content}</div>
                  </>
                )}
                {item.type === 'output' && (
                  <pre className="text-gray-300 ml-3 sm:ml-6 whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed">
                    {item.content}
                  </pre>
                )}
                {item.type === 'error' && (
                  <div className="text-red-400 ml-3 sm:ml-6 mb-1.5 sm:mb-2 text-xs sm:text-sm">{item.content}</div>
                )}
                {item.type === 'contact' && (
                  <div className="ml-3 sm:ml-6 mb-1.5 sm:mb-2 flex flex-wrap gap-2 sm:gap-4">
                    <a 
                      href="https://docs.google.com/document/d/1rAVuu7cZYGYkGqxK24-MLWHf3SxamPqXdVYZm1or89w/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-all font-semibold text-xs sm:text-sm"
                      style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}
                    >
                      📄 Resume
                    </a>
                    <a 
                      href="https://github.com/ravindran-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-all font-semibold text-xs sm:text-sm"
                      style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}
                    >
                      💻 GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/ravindran-s-982702327/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-all font-semibold text-xs sm:text-sm"
                      style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}
                    >
                      🔗 LinkedIn
                    </a>
                    <a 
                      href="mailto:ravindrans.dev@gmail.com"
                      className="text-cyan-400 hover:text-cyan-300 transition-all font-semibold"
                      style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}
                    >
                      📧 Email
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="mb-2">
              <Prompt showInput={true} typingCommand={isAnimating ? currentCommand : ''} />
              {!isAnimating && (
                <div className="flex items-center ml-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white outline-none border-none font-mono"
                    autoFocus
                    spellCheck="false"
                  />
                  <span className="text-green-400 font-bold animate-pulse ml-1">▮</span>
                </div>
              )}
              {isAnimating && (
                <span className="text-green-400 font-bold animate-pulse ml-2">▮</span>
              )}
            </div>
          </div>
        </div>

        {/* Help Text */}
        {!isAnimating && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-400 mt-6 text-sm"
          >
            Type <span className="text-cyan-400 font-semibold">help</span> to see available commands
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};

export default Workspace;

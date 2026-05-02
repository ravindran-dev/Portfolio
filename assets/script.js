const terminal = document.getElementById("terminal");

const script = [
  {
    cmd: "whoami",
    out: "AI/ML Engineer | Backend Developer | Systems Programmer | Open Source Contributor",
    animate: true
  },
  {
    cmd: "fastfetch",
    out: `
OS: Arch Linux x86_64
Kernel: 6.18.7
Shell: zsh
WM: Hyprland
Editor: Neovim
Languages: Python, Rust, Golang, C++, Java, JavaScript, TypeScript
AI & ML: PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV, Pytorch Lightning, Hugging Face, RAG
Backend: Flask, FastAPI, Node.js, Express.js, MQTT, REST APIs
Frontend: React, HTML, CSS, Tailwind, Kotlin (Android)
Database: PostgreSQL, MongoDB, SQLite, Firebase
DevOps: Docker, Git, Linux, CI/CD
`,
    pre: true,
    animate: true
  },
  {
    cmd: "ls",
    out: "about.md  skills/  projects/  contact.sh",
    animate: true
  },
  {
    cmd: "cat about.md",
    out: `
Ravindran S | B.E AI & ML (2024-2028) | CGPA: 9.24/10
Chennai Institute of Technology, Chennai
Passionate about AI/ML, systems programming, and building scalable solutions.
Experience in full-stack development, computer vision, and backend systems.
Active open-source contributor and Linux enthusiast.
`,
pre: true,
    animate: true
  },
  {
    cmd: "tree skills/",
    out: `
skills/
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
    └── aws.txt
`,
    pre: true
  },
  {
    cmd: "tree projects/",
    out: `
projects/
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
        Rust TUI apps for productivity
`,
    pre: true
  },
  {
    cmd: "./contact.sh",
    out: `| <a href="https://drive.google.com/file/d/180ijolULD0g4WwWYbS8kCGgDWPUT_WOY/view?usp=sharing" target="_blank"><span class="label">Resume</span></a> | <a href="https://github.com/ravindran-dev" target="_blank"><span class="label">GitHub</span></a> | <a href="https://www.linkedin.com/in/ravindran-s-982702327" target="_blank"><span class="label">LinkedIn</span></a>| <a href="mailto:ravindrans.dev@gmail.com" target="_blank"><span class="label">Email</span></a> |`,

    html: true,
    animate: true
  }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

async function typeCommand(command) {
  const line = document.createElement("p");

  line.innerHTML = `
    <span class="prompt">
      <span class="segment os">
        <i class="fa-brands fa-linux nf-icon" style="color: #38bdf8; text-shadow: 0 0 10px rgba(56, 189, 248, 0.8);"></i> Arch Linux
      </span>
      <span class="segment time">
        <i class="fa-regular fa-clock nf-icon" style="color: #a78bfa; text-shadow: 0 0 10px rgba(167, 139, 250, 0.8);"></i> ${getTime()}
      </span>
      <span class="segment user">
        <i class="fa-solid fa-user nf-icon" style="color: #22c55e; text-shadow: 0 0 10px rgba(34, 197, 94, 0.8);"></i> ravindran@s
      </span>
      <span class="segment cwd">
        <i class="fa-solid fa-folder nf-icon" style="color: #facc15; text-shadow: 0 0 10px rgba(250, 204, 21, 0.8);"></i> ~
      </span>
      <span class="prompt-symbol">❯</span>
    </span>
  `;

  terminal.appendChild(line);

  for (const char of command) {
    line.innerHTML += char;
    await sleep(40);
  }
}

async function printOutput(text, animate, pre, html = false) {
  const el = document.createElement(pre ? "pre" : "p");
  el.className = "output";
  terminal.appendChild(el);

  if (html) {
    el.innerHTML = text.trim();
    terminal.scrollTop = terminal.scrollHeight;
    return;
  }

  if (animate) {
    if (pre) {
      // Animate line by line for pre-formatted text
      const lines = text.trim().split('\n');
      for (const line of lines) {
        el.innerText += line + '\n';
        await sleep(80);
        terminal.scrollTop = terminal.scrollHeight;
      }
    } else {
      // Animate word by word for regular text
      const words = text.trim().split(/\s+/);
      for (const w of words) {
        el.innerText += w + " ";
        await sleep(120);
        terminal.scrollTop = terminal.scrollHeight;
      }
    }
  } else {
    el.innerText = text.trim();
  }

  terminal.scrollTop = terminal.scrollHeight;
}

async function runTerminal() {
  for (const step of script) {
    await typeCommand(step.cmd);
    await sleep(300);
    await printOutput(step.out, step.animate, step.pre, step.html);
    await sleep(600);
  }
}

runTerminal();

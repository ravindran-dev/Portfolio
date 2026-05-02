export default function About() {
  return (
    <div className="font-sans p-2 sm:p-6 prose prose-invert prose-p:text-white/80 prose-headings:text-white max-w-none">
      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-12 not-prose">
        <div className="relative">
          <img 
            src="/assets/photo3.png" 
            alt="Ravindran S" 
            className="w-48 h-48 rounded-[2rem] object-cover shadow-2xl brightness-110 contrast-105"
          />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-[#1e1e1e]">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl font-black font-display tracking-tighter text-white drop-shadow-sm">Ravindran S</h1>
          <div className="text-blue-400 font-mono text-sm tracking-[0.2em] uppercase font-black bg-blue-500/10 inline-block px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm">
            AI/ML Engineer
          </div>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-4 text-white/80">
        AI/ML engineer focused on scalable systems, edge AI, computer vision, and production-ready applications.
      </p>
      <p className="text-lg leading-relaxed mb-4 text-white/80">
        I build high-performance tools and platforms. My work bridges the gap between complex machine learning models and robust backend architectures.
      </p>
      <div className="mt-8 border-l-4 border-blue-500 pl-4 bg-white/5 p-4 rounded-r-lg">
        <p className="text-sm font-mono text-white/90 m-0 italic">
          "Simplicity is the ultimate sophistication, especially in systems design."
        </p>
      </div>
    </div>
  );
}

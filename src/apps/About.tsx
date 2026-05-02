export default function About() {
  return (
    <div className="font-sans p-2 sm:p-6 prose prose-p:text-black/80 prose-headings:text-black max-w-none">
      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-8 not-prose">
        <img 
          src="/assets/photo3.png" 
          alt="Ravindran S" 
          className="w-40 h-40 rounded-2xl object-cover shadow-lg border-2 border-white"
        />
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-black mb-2">Ravindran S</h1>
          <div className="text-blue-600 font-mono text-sm tracking-widest uppercase font-bold bg-blue-50 inline-block px-3 py-1 rounded-md border border-blue-100">
            AI/ML Engineer
          </div>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-4">
        AI/ML engineer focused on scalable systems, edge AI, computer vision, and production-ready applications.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        I build high-performance tools and platforms. My work bridges the gap between complex machine learning models and robust backend architectures.
      </p>
      <div className="mt-8 border-l-4 border-blue-500 pl-4 bg-black/5 p-4 rounded-r-lg">
        <p className="text-sm font-mono text-black/90 m-0 italic">
          "Simplicity is the ultimate sophistication, especially in systems design."
        </p>
      </div>
    </div>
  );
}

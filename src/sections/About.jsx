import React from 'react';
import SectionTitle from '../components/SectionTitle';

const About = () => {
  return (
    <section id="about" className="px-4 py-16 text-slate-100 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Get to know me">
          About Me
        </SectionTitle>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-5 md:col-span-2 md:p-6">
            <h3 className="text-xl font-semibold text-white">Professional Summary</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
              AI/ML Engineer and Full-Stack Developer focused on building intelligent systems with strong
              performance, maintainability, and real-world impact. I work across model development,
              inference optimization, and scalable application architecture.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/90">Current Role</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">AI/ML Intern, Inferyx</p>
                <p className="mt-1 text-sm text-slate-300">
                  Built optimized inference pipelines and reduced model latency by around 30% through
                  preprocessing and deployment tuning.
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/90">Project Impact</p>
                <p className="mt-2 text-sm text-slate-300">
                  Developed production-focused AI systems including MicroDet for tiny object detection,
                  GestureControl for touchless interaction, and a resume intelligence analyzer with LLM support.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <h3 className="text-xl font-semibold text-white">Education</h3>
            <p className="mt-4 text-sm text-slate-200 font-medium">B.E. Computer Science (AI-ML)</p>
            <p className="mt-1 text-sm text-slate-300">Chennai Institute of Technology</p>
            <span className="mt-4 inline-block rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-200">
              CGPA: 9.24 / 10
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            'ML Systems Engineering',
            'Low-Latency Inference',
            'Distributed Applications',
          ].map((item) => (
            <div key={item} className="glass-panel rounded-xl p-4">
              <p className="text-sm font-medium text-slate-100">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-panel rounded-2xl p-5 md:p-6">
          <h3 className="text-xl font-semibold text-white">Selected Achievements</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              'LeetCode Peak Rating: 1934 (Knight)',
              'Finalist - TIF GFG Hackathon 2025',
              'Official Submission - Mini Project for TIF 2026',
              'Open Source Contributor with merged PRs',
            ].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100 md:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import SectionTitle from '../components/SectionTitle';
import profilePhoto from '../photo2.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Get to know me">
          About Me
        </SectionTitle>
        
        <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Photo Section */}
          <div className="flex justify-center md:justify-start animate-slide-in">
            <div className="bg-white/80 dark:bg-dark-card backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-2xl p-3 card-glow card-glow-hover transition-all duration-300 w-full max-w-[280px]">
              <div className="relative">
                <img 
                  src={profilePhoto} 
                  alt="Ravindran S" 
                  className="w-full h-auto rounded-xl object-cover"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-accent-primary/10 to-accent-secondary/10 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-5 animate-slide-up">
            <div className="bg-white/80 dark:bg-dark-card backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-5 card-glow card-glow-hover transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Education
              </h3>
              <div className="space-y-1.5">
                <p className="text-base text-gray-900 dark:text-white font-semibold">
                  Bachelor of Engineering - Computer Science (AI-ML)
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chennai Institute of Technology
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-accent-primary/20 text-accent-primary px-3 py-1.5 rounded-lg font-bold text-sm border border-accent-primary/30">
                    CGPA: 9.24/10
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-dark-card backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-xl p-5 card-glow card-glow-hover transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Current Focus
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Building high-performance ML systems with focus on low-latency inference pipelines 
                and distributed architectures. Actively exploring sustainability tech applications 
                and contributing to open-source projects.
              </p>
            </div>
          </div>
        </div>
        
        {/* Areas of Interest */}
        <div className="mt-10 animate-slide-up">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Areas of Interest
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'ML Systems Engineering',
                  description: 'Designing and optimizing machine learning pipelines for production environments'
                },
                {
                  title: 'Low-Latency Inference',
                  description: 'Building real-time AI systems with minimal computational overhead'
                },
                {
                  title: 'Distributed Systems',
                  description: 'Architecting scalable, fault-tolerant distributed architectures'
                },
                {
                  title: 'Sustainability Tech',
                  description: 'Leveraging technology to solve environmental and sustainability challenges'
                }
              ].map((interest, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-4 hover:border-accent-primary transition-all duration-300 card-glow card-glow-hover"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 text-sm">{interest.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{interest.description}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
};

export default About;

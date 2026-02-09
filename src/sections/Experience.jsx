import React from 'react';
import SectionTitle from '../components/SectionTitle';

const Experience = () => {
  const experiences = [
    {
      title: 'AI-ML Virtual Intern',
      organization: 'AICTE & EduSkills',
      duration: 'Virtual Internship',
      description: 'Optimized machine learning inference pipeline achieving significant performance improvements',
      achievements: [
        'Reduced inference latency by ~30% through pipeline optimization',
        'Implemented efficient model serving architecture',
        'Worked on production-grade ML deployment strategies'
      ],
      tags: ['ML Pipeline', 'Optimization', 'Inference']
    },
    {
      title: 'Team Member - Drone Technology',
      organization: 'NIDAR, Chennai Institute of Technology',
      duration: '2 months',
      description: 'Developing real-time computer vision systems for autonomous drone applications',
      achievements: [
        'Built real-time object detection system with 96% accuracy',
        'Optimized model to run under 1 GFLOP for edge deployment',
        'Implemented efficient inference pipeline for resource-constrained devices'
      ],
      tags: ['Computer Vision', 'Edge AI', 'Real-time Systems']
    },
    {
      title: 'Open Source Contributor',
      organization: 'AWS s2n-tls, SWOC',
      duration: 'Ongoing',
      description: 'Contributing to cloud infrastructure and systems-level open source projects',
      achievements: [
        'Contributed to AWS s2n-tls security library',
        'Participated in Social Winter of Code (SWOC)',
        'Enhanced cloud and systems infrastructure projects'
      ],
      tags: ['Open Source', 'Cloud', 'Systems Programming']
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="My professional journey">
          Experience
        </SectionTitle>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 md:p-8 hover:border-accent-primary transition-all duration-300 animate-slide-up group card-glow-primary card-glow-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-accent-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-accent-primary font-semibold mt-1">
                    {exp.organization}
                  </p>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm md:text-base whitespace-nowrap">
                  {exp.duration}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {exp.description}
              </p>
              
              <ul className="space-y-2 mb-4">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-accent-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="bg-gray-100 dark:bg-dark-hover text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm border border-gray-300 dark:border-dark-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

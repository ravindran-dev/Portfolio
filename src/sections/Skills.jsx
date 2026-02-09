import React from 'react';
import SectionTitle from '../components/SectionTitle';
import SkillBadge from '../components/SkillBadge';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      category: 'language',
      icon: '',
      skills: [
        { name: 'C', icon: '' },
        { name: 'C++', icon: '' },
        { name: 'Python', icon: '' },
        { name: 'JavaScript', icon: '' },
        { name: 'TypeScript', icon: '' },
        { name: 'SQL', icon: '' },
        { name: 'Go', icon: '' },
        { name: 'Rust', icon: '' },
        { name: 'Lua', icon: '' },
        { name: 'CUDA', icon: '' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      category: 'framework',
      icon: '',
      skills: [
        { name: 'React', icon: '' },
        { name: 'PyTorch', icon: '' },
        { name: 'Streamlit', icon: '' },
        { name: 'TensorFlow', icon: '' },
        { name: 'Node.js', icon: '' },
        { name: 'Express', icon: '' }
      ]
    },
    {
      title: 'Core Expertise',
      category: 'core',
      icon: '',
      skills: [
        { name: 'LLMs', icon: '' },
        { name: 'RAG', icon: '' },
        { name: 'Computer Vision', icon: '' },
        { name: 'NLP', icon: '' },
        { name: 'MLOps', icon: '' },
        { name: 'GPU Optimization', icon: '' },
        { name: 'Distributed Systems', icon: '' },
        { name: 'Edge AI', icon: '' }
      ]
    },
    {
      title: 'Platforms & Tools',
      category: 'platform',
      icon: '',
      skills: [
        { name: 'Linux', icon: '' },
        { name: 'Git', icon: '' },
        { name: 'Docker', icon: '' },
        { name: 'AWS', icon: '' },
        { name: 'Firebase', icon: '' },
        { name: 'MQTT', icon: '' }
      ]
    },
    {
      title: 'Soft Skills',
      category: 'soft',
      icon: '',
      skills: [
        { name: 'Problem Solving', icon: '' },
        { name: 'Communication', icon: '' },
        { name: 'Collaboration', icon: '' },
        { name: 'Team Leadership', icon: '' },
        { name: 'Project Management', icon: '' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Technologies and expertise">
          Skills & Technologies
        </SectionTitle>
        
        <div className="space-y-10">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-accent-primary">{category.icon}</span>
                {category.title}
              </h3>
              
              <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 card-glow card-glow-hover transition-all duration-300">
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <SkillBadge 
                      key={idx} 
                      skill={skill.name}
                      icon={skill.icon}
                      category={category.category}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

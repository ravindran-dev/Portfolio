import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import FadeInSection from '../components/FadeInSection';

const Projects = () => {
  const projects = [
    {
      title: 'Machine Guard',
      description: 'IoT-based industrial machine monitoring platform with real-time data visualization and alerting system',
      tech: ['ESP32', 'MQTT', 'Firebase', 'React', 'IoT'],
      metrics: ['Real-time Monitoring', 'Cloud Integration'],
      github: 'https://github.com/VIM4L-M/Machine-Guard-AI',
      link: null
    },
    {
      title: 'AI Soft Skill Coach',
      description: 'Agentic AI-powered platform for interview preparation and soft skill development with personalized feedback',
      tech: ['LLMs', 'RAG', 'Python', 'Streamlit', 'NLP'],
      metrics: ['Agentic AI', 'Real-time Feedback'],
      github: 'https://github.com/VaibhavDataSci/AI-Soft-Skills-Interview-Coach',
      link: null
    },
    {
      title: 'AirMouse3D',
      description: '3D gesture-based cursor control system using computer vision for touchless interaction',
      tech: ['OpenCV', 'MediaPipe', 'Python', 'Computer Vision'],
      metrics: ['Real-time Tracking', 'Gesture Recognition'],
      github: 'https://github.com/ravindran-dev/AirMouse3D',
      link: null
    },
    {
      title: 'LCA Tool for Mining',
      description: 'Machine Learning + RAG-based Life Cycle Assessment platform for mining operations with improved prediction accuracy',
      tech: ['ML', 'RAG', 'Python', 'PyTorch', 'Streamlit'],
      metrics: ['88% → 95% Accuracy', 'Environmental Impact Analysis'],
      github: 'https://github.com/ravindran-dev/mining-lca-ai',
      link: null
    },
    {
      title: 'MicroDet',
      description: 'Ultra-lightweight object detection model optimized for edge devices and resource-constrained environments',
      tech: ['PyTorch', 'ONNX', 'Computer Vision', 'Model Optimization'],
      metrics: ['<1 GFLOP', '96% Accuracy', 'Edge Deployment'],
      github: 'https://github.com/ravindran-dev/microdet_v2',
      link: null
    },
    {
      title: 'GenuineGate',
      description: 'Advanced anti-bot detection system using behavioral analysis and machine learning',
      tech: ['ML', 'Python', 'Flask', 'Behavioral Analysis'],
      metrics: ['~93% Detection Rate', 'Low False Positives'],
      github: 'https://github.com/ravindran-dev/GenuineGate',
      link: null
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <SectionTitle subtitle="Innovative solutions and experiments">
            Featured Projects
          </SectionTitle>
        </FadeInSection>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <ProjectCard {...project} />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

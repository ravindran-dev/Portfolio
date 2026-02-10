import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, tech, metrics, link, github }) => {
  return (
    <motion.div 
      className="glassmorphism rounded-2xl p-6 group relative overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <motion.h3 
            className="text-2xl font-bold text-gray-900 dark:text-white"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="group-hover:text-neon-gradient transition-all duration-300">{title}</span>
          </motion.h3>
        <div className="flex gap-3">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-accent-primary transition-colors"
              aria-label="View on GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-accent-primary transition-colors"
              aria-label="View project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {description}
      </p>
      
      {metrics && (
        <div className="mb-4 flex flex-wrap gap-3">
          {metrics.map((metric, index) => (
            <motion.span 
              key={index} 
              className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue dark:text-neon-cyan px-4 py-1.5 rounded-full text-sm font-semibold neon-border"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {metric}
            </motion.span>
          ))}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {tech.map((item, index) => (
          <motion.span 
            key={index} 
            className="px-3 py-1.5 bg-white/5 dark:bg-white/10 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/20 hover:border-neon-blue dark:hover:border-neon-cyan transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

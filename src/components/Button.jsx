import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', href, onClick, className = '' }) => {
  const baseStyles = 'px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-blue to-accent-primary text-white shadow-lg shadow-neon-blue/50 hover:shadow-xl hover:shadow-neon-blue/70 hover:scale-105',
    secondary: 'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/10 neon-border hover:scale-105',
    outline: 'glassmorphism text-gray-700 dark:text-gray-200 hover:scale-105 hover:border-neon-blue dark:hover:border-neon-cyan',
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      target={href && href.startsWith('http') ? '_blank' : undefined}
      rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Animated background shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
};

export default Button;

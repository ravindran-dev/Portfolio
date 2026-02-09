import React from 'react';

const Button = ({ children, variant = 'primary', href, onClick, className = '' }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2 card-glow-hover';
  
  const variants = {
    primary: 'bg-accent-primary hover:bg-blue-600 text-white card-glow-primary',
    secondary: 'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white card-glow-primary',
    outline: 'border border-gray-300 dark:border-dark-border hover:border-accent-primary text-gray-700 dark:text-gray-300 hover:text-accent-primary dark:hover:text-white card-glow',
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      onClick={onClick}
      target={href && href.startsWith('http') ? '_blank' : undefined}
      rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Button;

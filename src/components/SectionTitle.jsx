import React from 'react';

const SectionTitle = ({ children, subtitle }) => {
  return (
    <div className="mb-12 animate-slide-up">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
        {children}
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

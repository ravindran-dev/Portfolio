import React from 'react';

const SectionTitle = ({ children, subtitle }) => {
  return (
    <div className="mb-12 animate-slide-up">
      <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {children}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

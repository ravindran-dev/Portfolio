import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';

const GitHubStats = () => {
  const username = 'ravindran-dev';
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (key) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  return (
    <section id="github" className="py-20 px-4 bg-white dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="GitHub Stats">
          GitHub Achievements
        </SectionTitle>
        
        <div className="grid grid-cols-1 gap-5 mt-12">
          {/* GitHub Streak Stats */}
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-white/10 card-glow card-glow-hover">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">🔥 Contribution Streak</h3>
            {!imageErrors.streak ? (
              <>
                {/* Light mode streak */}
                <img 
                  src="https://github-readme-streak-stats-eight.vercel.app?user=ravindran-dev&theme=default&hide_border=true&background=F9FAFB&stroke=3b82f6&ring=8b5cf6&fire=ec4899&currStreakNum=111827&sideNums=111827&currStreakLabel=3b82f6&sideLabels=6b7280&dates=9ca3af"
                  alt="GitHub Streak"
                  className="w-full rounded-lg block dark:hidden"
                  onError={() => handleImageError('streak')}
                  loading="lazy"
                />
                {/* Dark mode streak */}
                <img 
                  src="https://github-readme-streak-stats-eight.vercel.app?user=ravindran-dev&theme=dark&hide_border=true&background=0F172A&stroke=3b82f6&ring=8b5cf6&fire=ec4899&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=8b5cf6&sideLabels=d1d5db&dates=9ca3af"
                  alt="GitHub Streak"
                  className="w-full rounded-lg hidden dark:block"
                  onError={() => handleImageError('streak')}
                  loading="lazy"
                />
              </>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p>Loading streak...</p>
              </div>
            )}
          </div>

          {/* Activity Graph */}
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-white/10 card-glow card-glow-hover">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">📈 Contribution Activity</h3>
            {!imageErrors.activity ? (
              <img 
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=00000000&color=3b82f6&line=8b5cf6&point=ffffff&area=true`}
                alt="GitHub Activity Graph"
                className="w-full rounded-lg"
                onError={() => handleImageError('activity')}
                loading="lazy"
              />
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p>Loading activity...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;

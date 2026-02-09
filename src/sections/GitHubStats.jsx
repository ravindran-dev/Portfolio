import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';

const GitHubStats = () => {
  const username = 'ravindran-dev';
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (key) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  return (
    <section id="github" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="GitHub Achievements" 
          subtitle="Contributions and coding statistics"
        />
        
        <div className="grid grid-cols-1 gap-5 mt-12">
          {/* GitHub Streak Stats */}
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-white/10 hover:shadow-lg transition-all duration-300">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">🔥 Contribution Streak</h3>
            {!imageErrors.streak ? (
              <>
                <img 
                  src={`https://streak-stats.demolab.com/?user=${username}&theme=default&hide_border=false&border=E5E7EB&background=FFFFFF&stroke=3b82f6&ring=3b82f6&fire=8b5cf6&currStreakNum=1f2937&sideNums=1f2937&currStreakLabel=1f2937&sideLabels=6b7280&dates=6b7280`}
                  alt="GitHub Streak"
                  className="w-full rounded-lg dark:hidden"
                  onError={() => handleImageError('streak')}
                  loading="lazy"
                />
                <img 
                  src={`https://streak-stats.demolab.com/?user=${username}&theme=dark&hide_border=false&border=1f2937&background=0a0a0a&ring=3b82f6&fire=8b5cf6&currStreakLabel=ffffff&currStreakNum=ffffff&sideNums=ffffff&sideLabels=ffffff&dates=ffffff&stroke=ffffff`}
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
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-white/10 hover:shadow-lg transition-all duration-300">
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

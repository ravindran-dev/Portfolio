import React from 'react';
import SectionTitle from '../components/SectionTitle';

const Achievements = () => {
  const achievements = [
    {
      title: 'LeetCode Knight',
      description: 'Rating: 1905',
      highlight: 'Top Competitive Programmer'
    },
    {
      title: 'ICPC 2025',
      description: 'Global Rank: 2605',
      highlight: 'International Recognition'
    }
  ];

  const hackathons = [
    {
      title: 'AI for Sustainability Hackathon',
      status: 'Winner',
      description: 'Awarded $125 + Amazon vouchers worth 300 AED'
    },
    {
      title: 'TI Forge Hackathon',
      status: 'Winner',
      description: 'Awarded ₹50,000 cash prize'
    },
    {
      title: 'TGF 2.0 TechSprint Hackathon',
      status: 'Finalist',
      description: 'Top 10 teams among 300 teams'
    },
    {
      title: 'Tech for Social Good Hackathon',
      status: 'Finalist',
      description: 'Among 100 teams'
    }
  ];

  const certifications = [
    {
      title: 'NPTEL IoT Certification',
      issuer: 'NPTEL',
      score: '75%'
    },
    {
      title: 'Python Programming',
      issuer: 'Cisco'
    },
    {
      title: 'Cybersecurity Essentials',
      issuer: 'Cisco'
    },
    {
      title: 'Introduction to AI',
      issuer: 'Cisco'
    },
    {
      title: 'Data Science',
      issuer: 'Cisco'
    },
    {
      title: 'CCNA',
      issuer: 'Cisco'
    },
    {
      title: 'Full-Stack Development',
      issuer: 'Udemy'
    }
  ];

  return (
    <section id="achievements" className="py-20 px-4 bg-white dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Recognition and credentials">
          Achievements & Certifications
        </SectionTitle>
        
        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 hover:border-accent-primary transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/10 animate-slide-up group card-glow-primary card-glow-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-primary transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-2xl font-bold text-accent-primary mb-2">
                  {achievement.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Hackathon Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {hackathons.map((hackathon, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 hover:border-accent-primary transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/10 animate-slide-up group card-glow-hover ${
                  hackathon.status === 'Winner' ? 'card-glow-success' : 'card-glow-primary'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    hackathon.status === 'Winner' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {hackathon.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-primary transition-colors">
                  {hackathon.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {hackathon.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-white/80 dark:bg-dark-card backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-lg p-5 hover:border-accent-secondary transition-all duration-300 animate-slide-up group card-glow-secondary card-glow-hover"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-accent-secondary transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issuer}
                    {cert.score && ` • ${cert.score}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

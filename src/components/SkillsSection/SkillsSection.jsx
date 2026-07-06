import { useMemo, useState, useEffect, useRef } from 'react';
import './SkillsSection.css';

export default function SkillsSection({ skills }) {
  const uniqueSkills = useMemo(() => {
    const seen = new Set();
    return skills.filter((skill) => {
      const key = `${skill.name}|${skill.category}|${skill.percentage}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [skills]);

  const categories = [...new Set(uniqueSkills.map((skill) => skill.category || 'General'))];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">My Skills</span>
          <h2>Technical Skills & Expertise</h2>
          <p className="section-subtitle">
            Technologies and tools I work with to build exceptional digital experiences
          </p>
        </div>

        <div className="skills-grid">
          {categories.map((category, index) => (
            <div 
              className={`glass-card skill-category ${isVisible ? 'animate' : ''}`} 
              key={category}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="category-header">
                <div className="category-icon">
                  {getCategoryIcon(category)}
                </div>
                <h3>{category}</h3>
                <span className="category-count">
                  {uniqueSkills.filter((skill) => (skill.category || 'General') === category).length}
                </span>
              </div>

              <div className="skill-list">
                {uniqueSkills
                  .filter((skill) => (skill.category || 'General') === category)
                  .map((skill, skillIndex) => (
                    <div 
                      className={`skill-card ${isVisible ? 'animate' : ''}`} 
                      key={skill._id || skill.name}
                      style={{ animationDelay: `${index * 0.15 + skillIndex * 0.1}s` }}
                    >
                      <div className="skill-header">
                        <div className="skill-icon-wrapper">
                          <div className="skill-icon">
                            {skill.icon || getDefaultIcon(skill.name)}
                          </div>
                        </div>
                        <div className="skill-info">
                          <div className="skill-name-wrapper">
                            <h4>{skill.name}</h4>
                            <span className="skill-percentage">{skill.percentage || 0}%</span>
                          </div>
                          <div className="skill-bar">
                            <div 
                              className="skill-bar-fill" 
                              style={{ 
                                width: isVisible ? `${skill.percentage || 0}%` : '0%',
                                transitionDelay: `${skillIndex * 0.1}s`
                              }}
                            >
                              <div className="skill-bar-glow"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Stats */}
        <div className="skill-stats">
          <div className="stat-card">
            <div className="stat-number">{uniqueSkills.length}</div>
            <div className="stat-label">Total Skills</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{categories.length}</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {Math.round(uniqueSkills.reduce((acc, skill) => acc + (skill.percentage || 0), 0) / Math.max(uniqueSkills.length, 1))}%
            </div>
            <div className="stat-label">Average Proficiency</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to get category icons
function getCategoryIcon(category) {
  const icons = {
    'Frontend': '🎨',
    'Backend': '⚙️',
    'Database': '🗄️',
    'Programming': '💻',
    'DevOps': '🚀',
    'Cloud': '☁️',
    'General': '📚'
  };
  return icons[category] || '📌';
}

// Helper function to get default icons for skills
function getDefaultIcon(skillName) {
  const icons = {
    'HTML': '🌐',
    'CSS': '🎨',
    'JavaScript': '⚡',
    'React': '⚛️',
    'Node.js': '🚀',
    'Python': '🐍',
    'MongoDB': '🍃',
    'Express': '🔄',
    'TypeScript': '📘',
    'Git': '🔀',
    'Docker': '🐳',
    'AWS': '☁️',
    'Firebase': '🔥',
    'Vue': '🟩',
    'Angular': '🅰️',
    'PHP': '🐘',
    'Java': '☕',
    'C++': '➕',
    'SQL': '📊',
    'GraphQL': '📈'
  };
  return icons[skillName] || '💡';
}
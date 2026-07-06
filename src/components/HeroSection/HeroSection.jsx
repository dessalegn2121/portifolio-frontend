import { useEffect, useMemo, useState } from 'react';

const socialIcons = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  email: 'Email'
};

export default function HeroSection({ home }) {
  const titles = home?.titles || ['Full Stack Developer', 'MERN Stack Developer', 'Front-End Developer', 'Software Engineer'];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [titles.length]);

  const currentTitle = titles[activeIndex];
  const socialLinks = useMemo(() => Object.entries(home?.socialLinks || {}), [home]);

  return (
    <section id="home" className="section hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-eyebrow">{home?.greeting || 'Hello, I am'}</span>
          <h1 className="hero-name-display">
            <span className="hero-first-name">
              {home?.firstName || home?.name?.split(' ')[0] || 'DESSALGN'}
            </span>
            <span className="hero-last-name">
              {home?.lastName || home?.name?.split(' ').slice(1).join(' ') || 'ASEMAMAW'}
            </span>
          </h1>
          <p className="hero-title">
            <span className="title-text">{currentTitle}</span>
            <span className="cursor" aria-hidden="true">|</span>
          </p>
          <p className="hero-text">{home?.introduction || 'I build premium web experiences with the MERN stack.'}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={home?.cvUrl || '#'} target="_blank" rel="noreferrer">Download CV</a>
            <a className="btn btn-secondary" href="/about">Learn More</a>
          </div>
          <div className="hero-socials">
            {socialLinks.map(([key, link]) => (
              <a key={key} href={link} target="_blank" rel="noreferrer" className="social-chip">
                <span>{socialIcons[key] || key}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card glass-card">
            <div className="avatar-frame">
              {home?.profileImage ? (
                <img className="avatar" src={home.profileImage} alt={home.name || 'Profile'} />
              ) : (
                <div className="avatar-placeholder">AM</div>
              )}
            </div>
            <div className="hero-meta">
              <p>Premium Portfolio</p>
              <span>Modern design, responsive layout, smooth interaction.</span>
            </div>
          </div>
          <div className="hero-graphic" aria-hidden="true">
            <span className="glow-dot" />
            <span className="glow-ring" />
            <span className="glow-ring small" />
          </div>
        </div>
      </div>
    </section>
  );
}

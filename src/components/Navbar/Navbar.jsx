import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCode, FaHome, FaInfoCircle, FaTools, FaProjectDiagram, FaSignInAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Navbar.css';

const navItems = [
  { label: 'Home', href: '/', icon: <FaHome /> },
  { label: 'About', href: '/about', icon: <FaInfoCircle /> },
  { label: 'Skills', href: '/skills', icon: <FaTools /> },
  { label: 'Projects', href: '/projects', icon: <FaProjectDiagram /> },
  { label: 'Login', href: '/login', icon: <FaSignInAlt /> }
];

export default function Navbar({ brand }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const sections = useMemo(() => navItems.filter((item) => item.href.startsWith('#')), []);

  useEffect(() => {
    let lastPosition = window.scrollY;

    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setVisible(currentPosition <= lastPosition || currentPosition < 50);
      lastPosition = currentPosition;
      setScrolled(currentPosition > 24);

      for (const section of sections) {
        const element = document.querySelector(section.href);
        if (!element) continue;
        const top = element.getBoundingClientRect().top;
        if (top <= 120 && top > -element.offsetHeight + 120) {
          setActiveSection(section.href.slice(1));
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img
            src={encodeURI('/profile image.png')}
            alt="Portfolio logo"
            className="logo-image"
          />
          <span className="logo-text">{brand || 'Portfolio'}</span>
          <span className="logo-dot">.</span>
        </Link>

        <button 
          className={`nav-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen((prev) => !prev)} 
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith('#');
            const isActive = isAnchor ? activeSection === item.href.slice(1) : location.pathname === item.href;
            
            return isAnchor ? (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {isActive && <span className="nav-indicator"></span>}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {isActive && <span className="nav-indicator"></span>}
              </Link>
            );
          })}
          
          {/* Social Icons in Mobile Menu */}
          <div className="mobile-socials">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
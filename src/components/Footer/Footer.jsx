import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt,
  FaCode,
  FaHeart
} from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* About Column */}
          <div className="footer-column">
            <h3 className="footer-title">
              <FaCode className="footer-icon-title" /> About Me
            </h3>
            <p className="footer-description">
              I'm a passionate <strong>Software Engineering Student</strong> with a drive for 
              creating innovative solutions through code. Currently exploring the realms of 
              full-stack development, cloud computing, and AI/ML technologies.
            </p>
            <div className="footer-tags">
              <span className="tag">React</span>
              <span className="tag">Node.js</span>
              <span className="tag">Python</span>
              <span className="tag">MongoDB</span>
              <span className="tag">AWS</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><a href="mailto:dessalegnasemamaw2121@gmail.com">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="footer-column">
            <h3 className="footer-title">Get in Touch</h3>
            <div className="contact-info">
              <p>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:dessalegnasemamaw2121@gmail.com">dessalegnasemamaw2121@gmail.com</a>
              </p>
              <p>
                <FaPhone className="contact-icon" />
                <a href="tel:+1234567890">+251 93 730 0338</a>
              </p>
              <p>
                <FaMapMarkerAlt className="contact-icon" />
                <span>Addis Ababa, Ethiopia</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h4 className="social-title">Connect With Me</h4>
          <div className="social-icons">
            <a 
              href="https://github.com/dessalegn2121" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link github"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link twitter"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a 
              href="https://leetcode.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link leetcode"
              aria-label="LeetCode"
            >
              <SiLeetcode />
            </a>
            <a 
              href="https://hackerrank.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link hackerrank"
              aria-label="HackerRank"
            >
              <SiHackerrank />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} DESSU. All Rights Reserved.
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { FaGraduationCap, FaBriefcase, FaLanguage, FaMapMarkerAlt, FaEnvelope, FaPhone, FaFlag, FaDownload, FaUser, FaCode, FaCalendarAlt } from 'react-icons/fa';
import './AboutSection.css';

const fallbackAbout = {
  bio: "I'm a passionate Software Engineering student at Mizan Tepi University, building modern web applications and exploring cloud, AI, and full-stack development.",
  objective: 'To build elegant, user-centered software with measurable impact.',
  education: ['BSc Software Engineering (Ongoing)'],
  experience: ['Student Developer & Freelancer'],
  languages: ['Amharic', 'English'],
  location: 'Addis Ababa, Ethiopia',
  email: 'dessalegnasemamawu2121@gmail.com',
  phone: '+251 937 30 03 38',
  nationality: 'Ethiopian',
  resume: '#'
};

function formatList(value, fallback) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'string' && value.trim().length > 0) return value;
  return fallback;
}

export default function AboutSection({ about }) {
  const data = about || fallbackAbout;

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2>Get to know me better</h2>
          <p className="section-subtitle">
            A passionate software engineering student dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        <div className="about-grid">
          <div className="glass-card about-biography">
            <div className="biography-header">
              <FaUser className="biography-icon" />
              <h3>Biography</h3>
            </div>

            <div className="biography-content">
              <p className="bio-text">
                <strong>Hello! I'm Dessalgn Asemamaw</strong>, a dedicated <strong>Software Engineering student</strong> at <strong>Mizan Tepi University</strong>.
              </p>
              <p className="bio-text">
                I am deeply fascinated by the world of <strong>full-stack web development</strong>, <strong>cloud computing</strong>, and <strong>artificial intelligence</strong>.
              </p>
              <p className="bio-text">
                My mission is to build elegant, scalable applications that solve real-world problems and drive positive change.
              </p>

              <div className="education-timeline">
                <h4 className="timeline-title">
                  <FaCalendarAlt className="timeline-icon" />
                  My Education Journey
                </h4>
                <div className="timeline-items">
                  <div className="timeline-item">
                    <div className="timeline-dot primary" />
                    <div className="timeline-content">
                      <span className="timeline-year">2006 - 2013</span>
                      <span className="timeline-label">Primary School (Grade 1-8)</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot secondary" />
                    <div className="timeline-content">
                      <span className="timeline-year">2013 - 2016</span>
                      <span className="timeline-label">Secondary School (Grade 9-12)</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot tertiary" />
                    <div className="timeline-content">
                      <span className="timeline-year">2016 - Present</span>
                      <span className="timeline-label">BSc in Software Engineering</span>
                      <span className="timeline-sub-label">Mizan Tepi University</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="biography-stats">
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Learning</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Technologies</span>
                </div>
              </div>

              <div className="biography-tags">
                <span className="bio-tag">Full Stack</span>
                <span className="bio-tag">MERN Stack</span>
                <span className="bio-tag">React</span>
                <span className="bio-tag">Node.js</span>
                <span className="bio-tag">Python</span>
                <span className="bio-tag">Cloud</span>
                <span className="bio-tag">AI/ML</span>
              </div>
            </div>
          </div>

          <div className="glass-card about-details">
            <div className="details-header">
              <h3>Personal Information</h3>
              <span className="details-badge">Student</span>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <FaGraduationCap />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Education</span>
                  <strong className="detail-value">{formatList(data.education, 'BSc Software Engineering (Ongoing)')}</strong>
                  <span className="detail-sub">Mizan Tepi University</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaBriefcase />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Experience</span>
                  <strong className="detail-value">{formatList(data.experience, 'Student Developer & Freelancer')}</strong>
                  <span className="detail-sub">Building real-world projects</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaLanguage />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Languages</span>
                  <strong className="detail-value">{formatList(data.languages, 'Amharic, English')}</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Location</span>
                  <strong className="detail-value">{data.location || 'Addis Ababa, Ethiopia'}</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaEnvelope />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Email</span>
                  <strong className="detail-value">
                    <a href={`mailto:${data.email}`} className="detail-link">{data.email}</a>
                  </strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaPhone />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Phone</span>
                  <strong className="detail-value">
                    <a href={`tel:${data.phone}`} className="detail-link">{data.phone}</a>
                  </strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaFlag />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Nationality</span>
                  <strong className="detail-value">{data.nationality || 'Ethiopian'}</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaCode />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Interests</span>
                  <strong className="detail-value">Web Development, AI/ML, Cloud Computing</strong>
                </div>
              </div>
            </div>

            <div className="details-actions">
              <a className="btn btn-primary" href={data.resume || '#'} target="_blank" rel="noreferrer">
                <FaDownload className="btn-icon" />
                Download Resume
              </a>
              <a className="btn btn-secondary" href="#contact">
                <FaUser className="btn-icon" />
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

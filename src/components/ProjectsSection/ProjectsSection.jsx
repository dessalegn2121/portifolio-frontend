import { useMemo, useState } from 'react';
import { FaSearch, FaGithub, FaExternalLinkAlt, FaFilter, FaTimes, FaStar, FaCode, FaCalendarAlt, FaHospital, FaUserMd, FaClock, FaPhone } from 'react-icons/fa';
import './ProjectsSection.css';

export default function ProjectsSection({ projects }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [technology, setTechnology] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Default projects if none provided
  

  const projectData = projects && projects.length > 0 ? projects : defaultProjects;

  const uniqueProjects = useMemo(() => {
    const seen = new Set();
    return projectData.filter((project) => {
      const key = `${project.title}|${project.category}|${project.date}|${project.description}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [projectData]);

  const categories = useMemo(
    () => ['All', ...new Set(uniqueProjects.map((project) => project.category || 'Uncategorized'))],
    [uniqueProjects]
  );

  const technologies = useMemo(
    () => [
      'All',
      ...new Set(uniqueProjects.flatMap((project) => project.technologies || []))
    ],
    [uniqueProjects]
  );

  const filteredProjects = useMemo(
    () => uniqueProjects.filter((project) => {
      const matchesSearch = search
        ? project.title?.toLowerCase().includes(search.toLowerCase()) ||
          project.description?.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesCategory = category === 'All' || project.category === category;
      const matchesTechnology = technology === 'All' || (project.technologies || []).includes(technology);
      return matchesSearch && matchesCategory && matchesTechnology;
    }),
    [uniqueProjects, search, category, technology]
  );

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setTechnology('All');
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-badge">💻 Projects</span>
          <h2>My Projects</h2>
          <p className="projects-subtitle">
            Innovative all solutions built with modern technologies
          </p>
        </div>

        {/* Filter Section */}
        <div className="projects-filters">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              className="search-input"
              placeholder="Search projects by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch('')}>
                <FaTimes />
              </button>
            )}
          </div>

          <div className="filter-wrapper">
            <button 
              className="filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter /> Filters
              {(category !== 'All' || technology !== 'All') && (
                <span className="filter-badge">●</span>
              )}
            </button>

            <div className={`filter-group ${isFilterOpen ? 'open' : ''}`}>
              <div className="filter-item">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <label>Technology</label>
                <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
                  {technologies.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              {(category !== 'All' || technology !== 'All') && (
                <button className="clear-filters" onClick={clearFilters}>
                  <FaTimes /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <article 
                className={`project-card ${project.featured ? 'featured' : ''}`} 
                key={project._id || project.title}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="project-placeholder">
                      {project.category === 'Healthcare' ? (
                        <FaHospital className="placeholder-icon" />
                      ) : (
                        <FaCode className="placeholder-icon" />
                      )}
                      <span>{project.title?.slice(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="project-actions">
                      <a 
                        className="project-action-btn" 
                        href={project.github || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        title="View Source Code"
                      >
                        <FaGithub />
                      </a>
                      <a 
                        className="project-action-btn primary" 
                        href={project.demo || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        title="View Live Demo"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                  {project.featured && (
                    <span className="project-featured">
                      <FaStar /> Featured
                    </span>
                  )}
                  {project.category === 'Healthcare' && (
                    <span className="project-category-badge">
                      <FaUserMd /> Healthcare
                    </span>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-category">{project.category || 'Web App'}</span>
                    <span className="project-date">
                      <FaCalendarAlt /> {project.date || '2026'}
                    </span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {(project.technologies || []).map((tech) => (
                      <span className="tech-tag" key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <div className="project-links">
                      <a 
                        className="project-link github" 
                        href={project.github || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        <FaGithub /> Code
                      </a>
                      <a 
                        className="project-link demo" 
                        href={project.demo || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        <FaExternalLinkAlt /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <FaCode className="empty-icon" />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="reset-btn" onClick={clearFilters}>Reset Filters</button>
            </div>
          )}
        </div>

        {/* Project Stats */}
        {uniqueProjects.length > 0 && (
          <div className="project-stats">
            <div className="stat-item">
              <span className="stat-number">{uniqueProjects.length}</span>
              <span className="stat-label">Total Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{filteredProjects.length}</span>
              <span className="stat-label">Showing</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
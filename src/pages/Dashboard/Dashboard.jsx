import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const tabs = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' }
];

export default function DashboardPage() {
  const { logout, token: authToken, user: authUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const [home, setHome] = useState({});
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const hasLoadedRef = useRef(false);

  const getRequestConfig = (options = {}) => ({
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
    }
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [homeRes, aboutRes, skillsRes, projectsRes] = await Promise.all([
        api.get('/home', getRequestConfig()).catch(err => ({ data: {} })),
        api.get('/about', getRequestConfig()).catch(err => ({ data: {} })),
        api.get('/skills', getRequestConfig()).catch(err => ({ data: [] })),
        api.get('/projects', getRequestConfig()).catch(err => ({ data: [] }))
      ]);
      setHome(homeRes.data || {});
      setAbout(aboutRes.data || {});
      setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : (skillsRes.data?.value || []));
      setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : (projectsRes.data?.value || []));
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    fetchData();
  }, [authToken]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const showMessage = (text, isError = false) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await fetchData();
      showMessage('Data refreshed successfully');
    } catch (error) {
      console.error('Refresh error:', error);
      showMessage('Unable to refresh data', true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp|bmp|gif)/)) {
      showMessage('Only JPEG, PNG, WebP, BMP, and GIF images are allowed', true);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage('File size must be less than 5MB', true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
        }
      });
      const imageUrl = response.data.url;
      setHome((current) => ({ ...current, profileImage: imageUrl }));
      showMessage('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      showMessage('Unable to upload image', true);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp|bmp|gif)/)) {
      showMessage('Only JPEG, PNG, WebP, BMP, and GIF images are allowed', true);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage('File size must be less than 5MB', true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
        }
      });
      const imageUrl = response.data.url;
      setForm((current) => ({ ...current, image: imageUrl }));
      showMessage('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      showMessage('Unable to upload image', true);
    } finally {
      setLoading(false);
    }
  };

  const saveHome = async (e) => {
    e.preventDefault();
    if (!home.name || !home.greeting) {
      showMessage('Name and greeting are required', true);
      return;
    }
    setLoading(true);
    try {
      const response = await api.put('/home', home, getRequestConfig());
      console.log('Home save response:', response.data);
      await fetchData();
      showMessage('Home section updated successfully');
    } catch (error) {
      console.error('Save home error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        showMessage(`Error: ${error.response.data.message || 'Unable to save home settings'}`, true);
      } else if (error.request) {
        showMessage('No response from server. Check if backend is running.', true);
      } else {
        showMessage('Unable to save home settings', true);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveAbout = async (e) => {
    e.preventDefault();
    if (!about.bio) {
      showMessage('Bio is required', true);
      return;
    }
    setLoading(true);
    try {
      const response = await api.put('/about', about, getRequestConfig());
      console.log('About save response:', response.data);
      await fetchData();
      showMessage('About section updated successfully');
    } catch (error) {
      console.error('Save about error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        showMessage(`Error: ${error.response.data.message || 'Unable to save about settings'}`, true);
      } else if (error.request) {
        showMessage('No response from server. Check if backend is running.', true);
      } else {
        showMessage('Unable to save about settings', true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      showMessage('Name and category are required', true);
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/skills/${editingId}`, form, getRequestConfig());
      } else {
        await api.post('/skills', form, getRequestConfig());
      }
      setForm({});
      setEditingId(null);
      await fetchData();
      showMessage('Skill saved successfully');
    } catch (error) {
      console.error('Save skill error:', error);
      showMessage('Unable to save skill', true);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      showMessage('Title and description are required', true);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        technologies: typeof form.technologies === 'string' 
          ? form.technologies.split(',').map(item => item.trim()).filter(Boolean) 
          : form.technologies || []
      };
      
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload, getRequestConfig());
      } else {
        await api.post('/projects', payload, getRequestConfig());
      }
      setForm({});
      setEditingId(null);
      await fetchData();
      showMessage('Project saved successfully');
    } catch (error) {
      console.error('Save project error:', error);
      showMessage('Unable to save project', true);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    setLoading(true);
    try {
      await api.delete(`/skills/${id}`, getRequestConfig());
      await fetchData();
      showMessage('Skill deleted successfully');
    } catch (error) {
      console.error('Delete skill error:', error);
      showMessage('Unable to delete skill', true);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    setLoading(true);
    try {
      await api.delete(`/projects/${id}`, getRequestConfig());
      await fetchData();
      showMessage('Project deleted successfully');
    } catch (error) {
      console.error('Delete project error:', error);
      showMessage('Unable to delete project', true);
    } finally {
      setLoading(false);
    }
  };

  const setFormForEdit = (item, type) => {
    setForm(item);
    setEditingId(item._id);
    if (type === 'skill') {
      // Switch to skills tab if editing a skill
      setActiveTab('skills');
    } else if (type === 'project') {
      setActiveTab('projects');
    }
    showMessage(`Editing ${item.name || item.title}`);
  };

  const handleCancelEdit = () => {
    setForm({});
    setEditingId(null);
    showMessage('Edit cancelled');
  };

  return (
    <div className="page-wrapper dashboard-page">
      <aside className="dashboard-sidebar glass-card">
        <div className="sidebar-brand">
          <strong>Portfolio Admin</strong>
          <span>Manage live content</span>
        </div>
        {tabs.map((tab) => (
          <button 
            type="button" 
            key={tab.key} 
            className={activeTab === tab.key ? 'active' : ''} 
            onClick={() => {
              setActiveTab(tab.key);
              setForm({});
              setEditingId(null);
            }}
          >
            {tab.label}
          </button>
        ))}
        <button
          type="button"
          className="sidebar-link"
          onClick={() => navigate('/')}
        >
          View site
        </button>
        <button type="button" className="btn btn-secondary logout-button" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Admin overview</h1>
          </div>
          <div className="dashboard-stats">
            <div className="stat-card glass-card">
              <span>Total skills</span>
              <strong>{skills.length}</strong>
            </div>
            <div className="stat-card glass-card">
              <span>Total projects</span>
              <strong>{projects.length}</strong>
            </div>
          </div>
        </div>

        {message && (
          <div className={`toast-message glass-card ${message.includes('Unable') || message.includes('required') ? 'error' : ''}`}>
            {message}
          </div>
        )}

        {activeTab === 'home' && (
          <section className="dashboard-panel glass-card">
            <h2>Home section</h2>
            <form className="form" onSubmit={saveHome}>
              <label>
                Name *
                <input 
                  value={home.name || ''} 
                  onChange={(e) => setHome((current) => ({ ...current, name: e.target.value }))} 
                  placeholder="Your full name" 
                  required 
                />
              </label>
              <label>
                Greeting *
                <input 
                  value={home.greeting || ''} 
                  onChange={(e) => setHome((current) => ({ ...current, greeting: e.target.value }))} 
                  placeholder="e.g., Hello, I'm" 
                  required 
                />
              </label>
              <label>
                Introduction
                <textarea 
                  value={home.introduction || ''} 
                  onChange={(e) => setHome((current) => ({ ...current, introduction: e.target.value }))} 
                  placeholder="Brief introduction about yourself" 
                  rows="4" 
                />
              </label>
              <label>
                Profile image
                <div className="url-input-group">
                  <input 
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp,image/gif"
                    onChange={handleImageUpload}
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    className="btn btn-secondary url-action-btn"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                    disabled={loading}
                  >
                    Browse
                  </button>
                </div>
                {home.profileImage && (
                  <div className="image-preview">
                    <img src={home.profileImage} alt="Profile preview" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
              </label>
              <label>
                CV URL
                <div className="url-input-group">
                  <input 
                    value={home.cvUrl || ''} 
                    onChange={(e) => setHome((current) => ({ ...current, cvUrl: e.target.value }))} 
                    placeholder="https://example.com/cv.pdf" 
                  />
                  {home.cvUrl && (
                    <button 
                      type="button" 
                      className="btn btn-secondary url-action-btn"
                      onClick={() => window.open(home.cvUrl, '_blank')}
                      title="Open in new tab"
                    >
                      Open
                    </button>
                  )}
                </div>
              </label>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save home'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Update'}
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'about' && (
          <section className="dashboard-panel glass-card">
            <h2>About section</h2>
            <form className="form" onSubmit={saveAbout}>
              <label>
                Biography *
                <textarea 
                  value={about.bio || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, bio: e.target.value }))} 
                  placeholder="Tell your story" 
                  rows="3" 
                  required 
                />
              </label>
              <label>
                Objective
                <textarea 
                  value={about.objective || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, objective: e.target.value }))} 
                  placeholder="Your career objective" 
                  rows="3" 
                />
              </label>
              <label>
                Education (one per line)
                <textarea 
                  value={about.education?.join('\n') || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, education: e.target.value.split('\n').filter(Boolean) }))} 
                  placeholder="Bachelor's in Computer Science\nMaster's in AI" 
                  rows="3" 
                />
              </label>
              <label>
                Experience (one per line)
                <textarea 
                  value={about.experience?.join('\n') || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, experience: e.target.value.split('\n').filter(Boolean) }))} 
                  placeholder="5 years Full Stack Development\n3 years Team Lead" 
                  rows="3" 
                />
              </label>
              <label>
                Languages (one per line)
                <textarea 
                  value={about.languages?.join('\n') || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, languages: e.target.value.split('\n').filter(Boolean) }))} 
                  placeholder="English\nSpanish\nFrench" 
                  rows="2" 
                />
              </label>
              <label>
                Location
                <input 
                  value={about.location || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, location: e.target.value }))} 
                  placeholder="City, Country" 
                />
              </label>
              <label>
                Email
                <input 
                  value={about.email || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, email: e.target.value }))} 
                  placeholder="your.email@example.com" 
                  type="email" 
                />
              </label>
              <label>
                Phone
                <input 
                  value={about.phone || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, phone: e.target.value }))} 
                  placeholder="+1 234 567 890" 
                />
              </label>
              <label>
                Nationality
                <input 
                  value={about.nationality || ''} 
                  onChange={(e) => setAbout((current) => ({ ...current, nationality: e.target.value }))} 
                  placeholder="Your nationality" 
                />
              </label>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save about'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Update'}
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'skills' && (
          <section className="dashboard-panel glass-card">
            <div className="panel-grid">
              <div>
                <h2>{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
                <form className="form" onSubmit={handleSkillSubmit}>
                  <label>
                    Name *
                    <input 
                      value={form.name || ''} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      placeholder="e.g., React" 
                      required 
                    />
                  </label>
                  <label>
                    Category *
                    <input 
                      value={form.category || ''} 
                      onChange={(e) => setForm({ ...form, category: e.target.value })} 
                      placeholder="e.g., Frontend" 
                      required 
                    />
                  </label>
                  <label>
                    Icon Class
                    <input 
                      value={form.icon || ''} 
                      onChange={(e) => setForm({ ...form, icon: e.target.value })} 
                      placeholder="fa-brands fa-react" 
                    />
                  </label>
                  <label>
                    Percentage
                    <input 
                      type="number" 
                      value={form.percentage || ''} 
                      onChange={(e) => setForm({ ...form, percentage: Number(e.target.value) })} 
                      placeholder="85" 
                      min="0" 
                      max="100" 
                    />
                  </label>
                  <div className="form-actions">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
                    </button>
                    {editingId && (
                      <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3>Existing Skills ({skills.length})</h3>
                <div className="table-wrapper">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>%</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.length === 0 ? (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                            No skills added yet
                          </td>
                        </tr>
                      ) : (
                        skills.map((skill) => (
                          <tr key={skill._id}>
                            <td>{skill.name}</td>
                            <td>{skill.category}</td>
                            <td>{skill.percentage || '-'}</td>
                            <td>
                              <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setFormForEdit(skill, 'skill')}
                              >
                                Edit
                              </button>
                              <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={() => deleteSkill(skill._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section className="dashboard-panel glass-card">
            <div className="panel-grid">
              <div>
                <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                <form className="form" onSubmit={handleProjectSubmit}>
                  <label>
                    Title *
                    <input 
                      value={form.title || ''} 
                      onChange={(e) => setForm({ ...form, title: e.target.value })} 
                      placeholder="Project name" 
                      required 
                    />
                  </label>
                  <label>
                    Description *
                    <textarea 
                      value={form.description || ''} 
                      onChange={(e) => setForm({ ...form, description: e.target.value })} 
                      placeholder="Project description" 
                      rows="3" 
                      required 
                    />
                  </label>
                  <label>
                    Technologies (comma separated)
                    <input 
                      value={form.technologies?.join(', ') || ''} 
                      onChange={(e) => setForm({ ...form, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} 
                      placeholder="React, Node.js, MongoDB" 
                    />
                  </label>
                  <label>
                    Category
                    <input 
                      value={form.category || ''} 
                      onChange={(e) => setForm({ ...form, category: e.target.value })} 
                      placeholder="Full Stack, Frontend, etc." 
                    />
                  </label>
                  <label>
                    Project image
                    <div className="url-input-group">
                      <input 
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp,image/gif"
                        onChange={handleProjectImageUpload}
                        disabled={loading}
                      />
                      <button 
                        type="button" 
                        className="btn btn-secondary url-action-btn"
                        onClick={() => {
                          const fileInput = document.querySelectorAll('input[type="file"]');
                          const projectFileInput = fileInput[fileInput.length - 1];
                          if (projectFileInput) projectFileInput.click();
                        }}
                        disabled={loading}
                      >
                        Browse
                      </button>
                      {form.image && (
                        <button 
                          type="button" 
                          className="btn btn-secondary url-action-btn"
                          onClick={() => window.open(form.image, '_blank')}
                          title="Open in new tab"
                        >
                          View
                        </button>
                      )}
                    </div>
                    {form.image && (
                      <div className="image-preview">
                        <img src={form.image} alt="Project preview" onError={(e) => e.target.style.display = 'none'} />
                      </div>
                    )}
                  </label>
                  <label>
                    GitHub URL
                    <div className="url-input-group">
                      <input 
                        value={form.github || ''} 
                        onChange={(e) => setForm({ ...form, github: e.target.value })} 
                        placeholder="https://github.com/username/project" 
                      />
                      {form.github && (
                        <button 
                          type="button" 
                          className="btn btn-secondary url-action-btn"
                          onClick={() => window.open(form.github, '_blank')}
                          title="Open in new tab"
                        >
                          Open
                        </button>
                      )}
                    </div>
                  </label>
                  <label>
                    Demo URL
                    <div className="url-input-group">
                      <input 
                        value={form.demo || ''} 
                        onChange={(e) => setForm({ ...form, demo: e.target.value })} 
                        placeholder="https://project-demo.com" 
                      />
                      {form.demo && (
                        <button 
                          type="button" 
                          className="btn btn-secondary url-action-btn"
                          onClick={() => window.open(form.demo, '_blank')}
                          title="Open in new tab"
                        >
                          Open
                        </button>
                      )}
                    </div>
                  </label>
                  <div className="form-actions">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
                    </button>
                    {editingId && (
                      <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                <h3>Existing Projects ({projects.length})</h3>
                <div className="table-wrapper">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Technologies</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                            No projects added yet
                          </td>
                        </tr>
                      ) : (
                        projects.map((project) => (
                          <tr key={project._id}>
                            <td>{project.title}</td>
                            <td>{project.category || '-'}</td>
                            <td>{project.technologies?.join(', ') || '-'}</td>
                            <td>
                              <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setFormForEdit(project, 'project')}
                              >
                                Edit
                              </button>
                              <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={() => deleteProject(project._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
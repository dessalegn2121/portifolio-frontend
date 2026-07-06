import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import api from '../../services/api';

const fallbackProjects = [
  {
    title: 'Aurora Studio',
    description: 'A premium SaaS landing experience with polished interactions.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Web App',
    github: '#',
    demo: '#',
    image: ''
  },
  {
    title: 'Nova Commerce',
    description: 'A responsive e-commerce prototype built for modern brands.',
    technologies: ['MERN', 'Stripe'],
    category: 'E-Commerce',
    github: '#',
    demo: '#',
    image: ''
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (error) {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      <Navbar brand="Portfolio" />
      <main>
        <ProjectsSection projects={projects.length ? projects : fallbackProjects} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

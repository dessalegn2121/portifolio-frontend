import { useEffect, useState } from 'react';
import api from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import HeroSection from '../../components/HeroSection/HeroSection';
import AboutSection from '../../components/AboutSection/AboutSection';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import './Home.css';

const fallbackHome = {
  name: 'DESSALGN ASEMAMAW',
  firstName: 'DESSALGN',
  lastName: 'ASEMAMAW',
  greeting: 'Hello, I am',
  introduction: 'I build premium web experiences with the MERN stack.',
  titles: ['Full Stack Developer', 'MERN Stack Developer', 'Frontend Developer', 'Software Engineer'],
  profileImage: '',
  cvUrl: '#',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    telegram: 'https://t.me',
    email: 'mailto:hello@example.com'
  }
};

const fallbackAbout = {
  bio: 'I am a passionate software engineer crafting modern responsive web applications.',
  objective: 'To build elegant digital products with measurable impact.',
  education: ['BSc Computer Science'],
  experience: ['3+ years building production-ready applications'],
  languages: ['English', 'Portuguese'],
  location: 'Lisbon, Portugal',
  email: 'hello@example.com',
  phone: '+351 900 000 000',
  nationality: 'Portuguese',
  resume: '#'
};

const fallbackSkills = [
  { name: 'HTML', category: 'Frontend', percentage: 95, icon: 'HTML' },
  { name: 'CSS', category: 'Frontend', percentage: 92, icon: 'CSS' },
  { name: 'JavaScript', category: 'Programming', percentage: 94, icon: 'JS' },
  { name: 'React', category: 'Frontend', percentage: 92, icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', percentage: 90, icon: '🚀' },
  { name: 'MongoDB', category: 'Database', percentage: 88, icon: '🗄️' }
];

const fallbackProjects = [


];

export default function HomePage() {
  const [home, setHome] = useState(null);
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, aboutRes, skillsRes, projectsRes] = await Promise.all([
          api.get('/home'),
          api.get('/about'),
          api.get('/skills'),
          api.get('/projects')
        ]);
        setHome(homeRes.data);
        setAbout(aboutRes.data);
        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        setHome(fallbackHome);
        setAbout(fallbackAbout);
        setSkills(fallbackSkills);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <Navbar brand={home?.firstName || 'Portfolio'} />
      <main>
        <HeroSection home={home || fallbackHome} />
        <AboutSection about={about || fallbackAbout} />
        <SkillsSection skills={skills.length ? skills : fallbackSkills} />
        <ProjectsSection projects={projects.length ? projects : fallbackProjects} />
      </main>
      <Footer home={home || fallbackHome} about={about || fallbackAbout} />
      <ScrollToTop />
    </>
  );
}
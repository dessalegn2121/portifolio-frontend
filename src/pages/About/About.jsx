import { useEffect, useState } from 'react';
import api from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AboutSection from '../../components/AboutSection/AboutSection';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import './About.css';

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

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const response = await api.get('/about');
        setAbout(response.data);
      } catch (error) {
        setAbout(fallbackAbout);
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
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
        <AboutSection about={about || fallbackAbout} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import api from '../../services/api';

const fallbackSkills = [
  { name: 'HTML', category: 'Frontend', percentage: 95, icon: 'HTML' },
  { name: 'CSS', category: 'Frontend', percentage: 92, icon: 'CSS' },
  { name: 'JavaScript', category: 'Programming', percentage: 94, icon: 'JS' },
  { name: 'React', category: 'Frontend', percentage: 92, icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', percentage: 90, icon: '🚀' },
  { name: 'MongoDB', category: 'Database', percentage: 88, icon: '🗄️' }
];

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data);
      } catch (error) {
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
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
        <SkillsSection skills={skills.length ? skills : fallbackSkills} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

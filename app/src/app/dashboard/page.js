'use client';

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Skills from '@/app/components/Skills/Skills';
import Goals from '@/app/components/Goals/Goals';
import Quiz from '@/app/components/Quiz/Quiz';
import PlayQuiz from '@/app/components/Quiz/PlayQuiz';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('skills');
  const [user, setUser] = useState({ name: '', email: '' }); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name || 'name', email: decoded.email || '' });
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.profile}>
          <div style={styles.avatar}></div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <nav style={styles.nav}>
          <button style={styles.navButton} onClick={() => setActiveSection('skills')}>
            Skills
          </button>
          <button style={styles.navButton} onClick={() => setActiveSection('goals')}>
            Goals
          </button>
          <button style={styles.navButton} onClick={() => setActiveSection('quiz')}>
            Quiz
          </button>
          <button style={styles.navButton} onClick={() => setActiveSection('playQuiz')}>
            Jouer Quiz
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main style={styles.mainContent}>
        {activeSection === 'skills' && <Skills />}
        {activeSection === 'goals' && <Goals />}
        {activeSection === 'quiz' && <Quiz />}
        {activeSection === 'playQuiz' && <PlayQuiz />}
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' },
  sidebar: { width: '250px', backgroundColor: '#1c1c1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' },
  profile: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ccc', marginBottom: '10px' },
  nav: { display: 'flex', flexDirection: 'column', width: '100%' },
  navButton: { backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px', marginBottom: '10px', cursor: 'pointer', textAlign: 'left', width: '100%', borderRadius: '5px' },
  mainContent: { flex: 1, padding: '20px', boxSizing: 'border-box', backgroundColor: '#fff', overflowY: 'auto' },
};

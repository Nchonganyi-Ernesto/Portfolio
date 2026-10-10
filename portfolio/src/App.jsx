import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ByTheNumbers from './components/ByTheNumbers';
import Skills from './components/Skills';
import Work from './components/Work';
import Services from './components/Services';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import CursorFollower from './components/CursorFollower';
import { projectsData } from './data/projectsData';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'work' | 'service' | 'contact'

  // Sync with URL hash for seamless deep-linking & browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#\/?project\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        const found = projectsData.find((p) => p.id === match[1]);
        if (found) {
          setSelectedProject(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      setSelectedProject(null);

      if (hash.includes('work')) {
        setCurrentPage('work');
      } else if (hash.includes('service')) {
        setCurrentPage('service');
      } else if (hash.includes('contact')) {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setSelectedProject(null);
    setCurrentPage(page);
    if (page === 'home') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    window.location.hash = `/project/${project.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    window.location.hash = currentPage === 'home' ? '#/' : `#/${currentPage}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app">
      <CursorFollower />
      <Navbar currentPage={selectedProject ? '' : currentPage} onNavigate={handleNavigate} />

      <main>
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToPortfolio}
            onSelectProject={handleSelectProject}
          />
        ) : currentPage === 'work' ? (
          <Work onSelectProject={handleSelectProject} isStandalonePage={true} />
        ) : currentPage === 'service' ? (
          <Services isStandalonePage={true} />
        ) : currentPage === 'contact' ? (
          <Contact isStandalonePage={true} />
        ) : (
          <>
            <Hero />
            <About />
            <ByTheNumbers />
            <Skills />
            <Work onSelectProject={handleSelectProject} isStandalonePage={false} />
            <Services isStandalonePage={false} />
            <Experience />
            <Contact isStandalonePage={false} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

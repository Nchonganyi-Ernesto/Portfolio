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
import { projectsData } from './data/projectsData';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Sync with URL hash for seamless deep-linking & browser history (e.g., #/project/bloodlink)
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
      if (hash && hash.length > 1 && !match) {
        const targetId = hash.replace('#', '').replace('/', '');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      }
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    window.location.hash = `/project/${project.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    window.location.hash = '';
    // Restore smooth scroll to the selected work section
    setTimeout(() => {
      const workEl = document.getElementById('work');
      if (workEl) {
        workEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="portfolio-app">
      <Navbar />

      <main>
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToPortfolio}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <>
            <Hero />
            <About />
            <ByTheNumbers />
            <Skills />
            <Work onSelectProject={handleSelectProject} />
            <Services />
            <Experience />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

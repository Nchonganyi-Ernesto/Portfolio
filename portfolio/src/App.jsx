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

  // Default to clean White / Light mode as intended
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Clear legacy auto-detected preference that forced dark mode on OS-dark devices
      try {
        if (localStorage.getItem('portfolio-theme')) {
          localStorage.removeItem('portfolio-theme');
        }
      } catch (e) {
        // ignore storage errors
      }

      const saved = localStorage.getItem('portfolio-theme-mode');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light'; // Always start with white / light mode by default
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('portfolio-theme-mode', nextTheme);
      } catch (e) {
        // ignore storage errors
      }
      return nextTheme;
    });
  };

  // Sync with URL path & hash for seamless deep-linking, SEO & browser history
  useEffect(() => {
    const syncRoute = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      // Check for project detail in pathname (/project/xyz) or legacy hash (#/project/xyz)
      const projectMatch =
        pathname.match(/\/project\/([a-zA-Z0-9_-]+)/) ||
        hash.match(/#\/?project\/([a-zA-Z0-9_-]+)/);

      if (projectMatch && projectMatch[1]) {
        const found = projectsData.find((p) => p.id === projectMatch[1]);
        if (found) {
          setSelectedProject(found);
          document.title = `${found.title} | Nchonganyi Ernesto`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      setSelectedProject(null);

      if (pathname.startsWith('/work') || hash.includes('work')) {
        setCurrentPage('work');
        document.title = 'Selected Work | Nchonganyi Ernesto';
      } else if (pathname.startsWith('/service') || hash.includes('service')) {
        setCurrentPage('service');
        document.title = 'Services & Solutions | Nchonganyi Ernesto';
      } else if (pathname.startsWith('/contact') || hash.includes('contact')) {
        setCurrentPage('contact');
        document.title = 'Contact | Nchonganyi Ernesto';
      } else {
        setCurrentPage('home');
        document.title = 'Nchonganyi Ernesto | Frontend Developer & Software Engineer';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Check on initial load
    syncRoute();

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const handleNavigate = (page) => {
    setSelectedProject(null);
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    window.history.pushState({}, '', `/project/${project.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    const path = currentPage === 'home' ? '/' : `/${currentPage}`;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app">
      <CursorFollower theme={theme} />
      <Navbar
        currentPage={selectedProject ? '' : currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

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

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

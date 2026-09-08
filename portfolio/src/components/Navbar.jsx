import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Smart Hide-on-Scroll-Down / Show-on-Scroll-Up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track whether page is scrolled past the top
      setIsScrolled(currentScrollY > 20);

      // Always show navbar when near the very top of page
      if (currentScrollY <= 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Ignore small jitter deltas
      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) < 8) {
        return;
      }

      if (delta > 0) {
        // User is scrolling DOWN -> hide nav
        setIsVisible(false);
      } else {
        // User is scrolling UP -> reveal nav & hamburger
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync scroll position when closing mobile menu
  useEffect(() => {
    if (!isOpen) {
      lastScrollY.current = window.scrollY;
    }
  }, [isOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header className={`navbar-header ${!isVisible && !isOpen ? 'nav-hidden' : 'nav-visible'} ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left: Available for project tag (no dot, wrapped in </>) */}
          <div className="status-code-tag">
            <span className="code-bracket">&lt;/</span>
            <span className="status-text">Available for New Project</span>
            <span className="code-bracket">&gt;</span>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="nav-menu">
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#work" className="nav-link">Work</a>
            <a href="#services" className="nav-link">Service</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Right: Desktop Let's Talk CTA & Mobile Hamburger Toggle */}
          <div className="nav-right-actions">
            <a href="mailto:nchonganyiernesto27@gmail.com" className="talk-btn desktop-talk-btn">
              <span>Let's Talk</span>
              <svg
                className="arrow-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>

            {/* Hamburger Button (Mobile) */}
            <button 
              className={`hamburger-btn ${isOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span className="hamburger-line line-1"></span>
              <span className="hamburger-line line-2"></span>
              <span className="hamburger-line line-3"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Menu Overlay */}
      <div 
        className={`mobile-backdrop ${isOpen ? 'active' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav-links">
            <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
              <span>About</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
            <a href="#skills" className="mobile-nav-link" onClick={closeMenu}>
              <span>Skills</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
            <a href="#work" className="mobile-nav-link" onClick={closeMenu}>
              <span>Work</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
            <a href="#services" className="mobile-nav-link" onClick={closeMenu}>
              <span>Service</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
            <a href="#experience" className="mobile-nav-link" onClick={closeMenu}>
              <span>Experience</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
            <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>
              <span>Contact</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
          </nav>

          <div className="mobile-cta-wrapper">
            <a 
              href="mailto:nchonganyiernesto27@gmail.com" 
              className="talk-btn mobile-talk-btn"
              onClick={closeMenu}
            >
              <span>Let's Talk</span>
              <svg
                className="arrow-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>

          <div className="mobile-socials-row">
            <a 
              href="https://github.com/Nchonganyi-Ernesto/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-social-icon"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/nchonganyi-ernesto-5a3549369/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-social-icon"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
              </svg>
            </a>
            <a 
              href="mailto:nchonganyiernesto27@gmail.com" 
              className="mobile-social-icon"
              aria-label="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

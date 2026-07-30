import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`glass-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="nav-logo">
          <span className="logo-tag">&lt;</span>
          <span className="logo-name">Nchonganyi</span>
          <span className="logo-dot">.</span>
          <span className="logo-tag">/&gt;</span>
        </a>

        {/* Desktop Links */}
        <nav className="nav-links">
          <a href="#hero" className="nav-link active">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#journey" className="nav-link">Journey</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* CTA Action Button */}
        <div className="nav-actions">
          <a href="#contact" className="btn-glass-cta">
            <span>Hire Me</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'show' : ''}`}>
        <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#journey" onClick={() => setMobileMenuOpen(false)}>Journey</a>
        <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
        <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        <a href="#contact" className="btn-mobile-cta" onClick={() => setMobileMenuOpen(false)}>Hire Me</a>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
  const [localTime, setLocalTime] = useState('');

  // Live Cameroon local time (WAT, UTC+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Douala',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="site-footer">
      {/* Giant Ambient Backdrop Name Typography in Background */}
      <div className="footer-backdrop-typography" aria-hidden="true">
        <span className="backdrop-text-name">NCHONGANYI ERNESTO</span>
      </div>

      <div className="footer-container">
        {/* Top Header Banner with Status Text & Back-to-Top Button */}
        <div className="footer-top-banner">
          <div className="footer-top-status">
            <span className="status-label">Let's build something exceptional together</span>
          </div>

          <button 
            className="footer-back-to-top-btn" 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>

        {/* 4-Column Navigation & Info Grid */}
        <div className="footer-grid">
          {/* Column 1: Bio & Local Time */}
          <div className="footer-col footer-col-brand">
            <div className="footer-code-tag">
              <span className="code-bracket">&lt;/</span>
              <span className="status-text">Frontend & UI/UX Developer</span>
              <span className="code-bracket">&gt;</span>
            </div>
            <p className="footer-bio">
              Crafting clear, intuitive web interfaces and high-performance digital experiences at the intersection of design and code.
            </p>
            <div className="footer-timezone-badge">
              <span className="location-text">Buea, Cameroon</span>
              <span className="time-divider">•</span>
              <span className="live-clock">{localTime || 'WAT (UTC+1)'}</span>
            </div>
          </div>

          {/* Column 2: Sitemap Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" className="footer-nav-link">Home</a></li>
              <li><a href="#about" className="footer-nav-link">About</a></li>
              <li><a href="#work" className="footer-nav-link">Selected Work</a></li>
              <li><a href="#services" className="footer-nav-link">Services</a></li>
              <li><a href="#experience" className="footer-nav-link">Experience</a></li>
              <li><a href="#contact" className="footer-nav-link">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links-list">
              <li><span className="footer-static-item">Web Design & Dev</span></li>
              <li><span className="footer-static-item">Interactive Animations</span></li>
              <li><span className="footer-static-item">Deployment & Cloud</span></li>
              <li><span className="footer-static-item">UI/UX Design Systems</span></li>
              <li><span className="footer-static-item">Performance Optimization</span></li>
            </ul>
          </div>

          {/* Column 4: Socials & Connect */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-links-list">
              <li>
                <a 
                  href="https://www.linkedin.com/in/nchonganyi-ernesto-5a3549369/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-link"
                >
                  <span>LinkedIn</span>
                  <span className="footer-link-arrow">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Nchonganyi-Ernesto/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-link"
                >
                  <span>GitHub</span>
                  <span className="footer-link-arrow">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:nchonganyiernesto27@gmail.com" 
                  className="footer-social-link"
                >
                  <span>Email</span>
                  <span className="footer-link-arrow">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Nchonganyi Ernesto. All rights reserved.
          </p>
          <p className="footer-credit">
            Designed & Engineered with React & Modern CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

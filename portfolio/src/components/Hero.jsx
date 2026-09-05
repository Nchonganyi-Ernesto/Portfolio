import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Short Name Background Typography: NCHONGANYI E. */}
        <div className="hero-typography-backdrop" aria-hidden="true">
          <h1 className="hero-giant-name">
            <span className="name-outline">NCHONGANYI</span>
            <span className="name-solid">E.</span>
          </h1>
        </div>

        {/* Hero Content Layer */}
        <div className="hero-content-grid">
          {/* Left Block: Role, Description & CTA */}
          <div className="hero-left-col">
            <div className="hero-role-block">
              <h2 className="hero-role-title">Frontend Developer</h2>
              <p className="hero-description">
                Crafting production-ready web applications with intuitive UI/UX, 
                high-performance frontend architecture, and working knowledge of backend development.
              </p>
              <div className="hero-cta-wrapper">
                <a href="#contact" className="hero-collab-btn">
                  <span>Let's collaborate</span>
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
            </div>
          </div>

          {/* Center Column: Portrait */}
          <div className="hero-center-col">
            <div className="hero-image-wrapper">
              <img 
                src="/heroimage.png" 
                alt="Nchonganyi Ernesto" 
                className="hero-portrait-img"
              />
            </div>
          </div>

          {/* Right Block: Connected Social & Contact Pill Badges */}
          <div className="hero-right-col">
            <div className="social-pill-group">
              {/* GitHub */}
              <a 
                href="https://github.com/Nchonganyi-Ernesto/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-pill"
                aria-label="GitHub Profile"
              >
                <span className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </span>
                <span className="social-label">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/nchonganyi-ernesto-5a3549369/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-pill"
                aria-label="LinkedIn Profile"
              >
                <span className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                  </svg>
                </span>
                <span className="social-label">LinkedIn</span>
              </a>

              {/* Mail */}
              <a 
                href="mailto:nchonganyiernesto27@gmail.com" 
                className="social-pill"
                aria-label="Email Nchonganyi Ernesto"
              >
                <span className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                <span className="social-label">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import profileImg from '../assets/porfolio image.png';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about-section">
      {/* Giant Watermark Background Text */}
      <div className="watermark-bg-text" aria-hidden="true">
        - ABOUT - ME
      </div>

      <div className="about-container">
        {/* Header Title Layer */}
        <div className="about-header">
          <div className="about-small-tag">
            <span className="tag-pulse"></span>
            <span>// ABOUT ME</span>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="about-grid">
          {/* Left Column: Rectangular Image Container */}
          <div className="about-image-column">
            <div className="rectangular-image-card">
              <div className="image-border-glow"></div>
              <img
                src={profileImg}
                alt="Nchonganyi Ernesto - About Me"
                className="rectangular-profile-img"
              />
              <div className="image-overlay-badge">
                <span className="badge-dot"></span>
                <span>Full Stack Developer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Write-Up & Experience / Socials Card */}
          <div className="about-content-column">
            {/* Section Tag */}
            <span className="who-am-i-tag">// Who am I?</span>

            {/* Headline */}
            <h2 className="about-headline">
              I'm <span className="highlight-name">Nchonganyi Ernesto</span>, a <span className="text-neon">Full-Stack Web & Software Engineer</span>
            </h2>

            {/* Write-Up Paragraph */}
            <p className="about-description">
              I develop modern, high-performance web applications and backend systems with exceptional reliability, scalability, and user experience. I work with microservice architectures, cloud infrastructure, and robust full-stack tech stacks. My goal is to build software that drives real-world impact for users and communities globally.
            </p>

            {/* Bottom Card (3 Years Experience, LinkedIn, GitHub + Network Logo BG) */}
            <div className="about-footer-card">
              {/* White-styled Medium Size Network Logo Background */}
              <div className="network-logo-watermark" aria-hidden="true">
                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <circle cx="12" cy="6" r="1" fill="currentColor"></circle>
                  <circle cx="18" cy="12" r="1" fill="currentColor"></circle>
                  <circle cx="6" cy="12" r="1" fill="currentColor"></circle>
                  <circle cx="12" cy="18" r="1" fill="currentColor"></circle>
                </svg>
              </div>

              {/* Experience Badge */}
              <div className="experience-badge-item">
                <span className="exp-number">3+</span>
                <div className="exp-text-wrapper">
                  <span className="exp-title">Years of</span>
                  <span className="exp-subtitle">Experience</span>
                </div>
              </div>

              {/* Social Action Links */}
              <div className="social-links-wrapper">
                {/* LinkedIn Button */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn linkedin-btn"
                  aria-label="LinkedIn Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn github-btn"
                  aria-label="GitHub Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

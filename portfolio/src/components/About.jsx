import React, { useEffect, useRef, useState } from 'react';
import './About.css';

export default function About() {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className={`about-editorial-section ${isInView ? 'in-view' : ''}`} 
      id="about" 
      ref={containerRef}
    >
      <div className="about-editorial-container">
        {/* Top Header: ABOUT (Spans above Left & Middle Columns) */}
        <h2 className="editorial-huge-about">ABOUT</h2>

        {/* Main Content Grid directly under ABOUT */}
        <div className="about-editorial-main-row">
          {/* LEFT COLUMN: ME + Subtitle + Bio */}
          <div className="editorial-left-col">
            <h3 className="editorial-me-text">ME</h3>
            <p className="editorial-subtitle">Frontend &amp; UI/UX Web Developer</p>
            <p className="editorial-desc-bold">
              <strong>Hi, I'm Nchonganyi Ernesto:</strong> A Frontend Developer specializing in 
              building clean, modern web applications, with average knowledge of backend technologies.
            </p>
          </div>

          {/* MIDDLE COLUMN: Image Card (Positioned directly under ABOUT!) */}
          <div className="editorial-middle-col">
            <div className="editorial-image-frame">
              <img 
                src="/heroimage.png" 
                alt="Nchonganyi Ernesto" 
                className="editorial-profile-img" 
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Work Strategy & 2-per-row Highlights */}
          <div className="editorial-right-col">
            <h3 className="editorial-philosophy-title">Work Strategy &amp; UI/UX Approach</h3>
            <p className="editorial-desc">
              My work strategy centers on meddling through UI/UX details by refining layout grids, 
              interactions, and responsiveness until every interface is seamlessly professional, fluid, and user-friendly.
            </p>

            {/* 2 per row highlights for Remote Work & 24/7 Availability */}
            <div className="editorial-highlights-grid">
              {/* Highlight 1: Remote Work */}
              <div className="editorial-highlight-item">
                <div className="highlight-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div className="highlight-text-group">
                  <span className="highlight-label">Remote Work</span>
                  <span className="highlight-sub">Worldwide Available</span>
                </div>
              </div>

              {/* Highlight 2: 24/7 Availability */}
              <div className="editorial-highlight-item">
                <div className="highlight-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="highlight-text-group">
                  <span className="highlight-label">24/7 Availability</span>
                  <span className="highlight-sub">Flexible Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

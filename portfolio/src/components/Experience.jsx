import React, { useState, useEffect, useRef } from 'react';
import './Experience.css';

const experienceData = [
  {
    id: 'freelance',
    title: 'Freelance Web Developer',
    role: 'Independent Frontend Developer & UI/UX',
    period: 'Sep 2025 - Now',
    description: 'Delivering modern, responsive web applications, custom design systems, and client solutions.',
    image: null
  },
  {
    id: 'kwata',
    title: 'Kwata Technologies',
    role: 'Junior Developer Intern',
    period: 'Jul 2025 - Sep 2025',
    description: 'Worked directly with the CTO implementing production frontend features and integrating company products.',
    image: '/kwataintern image.jpeg',
    location: 'Douala, Cameroon'
  },
  {
    id: 'deep-dive',
    title: 'Modern Stack & Cloud Mastery',
    role: 'React, Supabase, Firebase & Cloud Deployment',
    period: 'Sep 2024 - Jun 2025',
    description: 'Intensive self-directed specialization in React, full-stack BaaS (Supabase, Firebase, PostgreSQL), CI/CD pipelines, and cloud management.',
    image: null
  },
  {
    id: 'jongohub',
    title: 'Jongo Hub',
    role: 'Frontend Developer Intern',
    period: 'Jul 2024 - Sep 2024',
    description: 'Collaborated on enterprise web interfaces (JongoERP) and responsive client layouts in a fast-paced tech hub.',
    image: '/internimage.jpeg',
    location: 'Buea, Cameroon'
  },
  {
    id: 'foundation',
    title: 'Web Development Foundations',
    role: 'HTML, CSS & JavaScript Fundamentals',
    period: '2023 - 2024',
    description: 'Began the programming journey mastering semantic HTML, modern responsive CSS layouts, and core JavaScript concepts.',
    image: null
  }
];

export default function Experience() {
  const [hoveredExp, setHoveredExp] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className={`experience-section ${isInView ? 'in-view' : ''}`} 
      id="experience"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="experience-container">
        {/* Header with Background Watermark */}
        <div className="experience-header">
          <div className="experience-watermark" aria-hidden="true">
            EXPERIENCE
          </div>
          <div className="experience-header-content">
            <h2 className="experience-title">/EXPERIENCE</h2>
            <span className="experience-badge">3+ years of experience</span>
          </div>
        </div>

        {/* Experience List */}
        <div className="experience-list">
          {experienceData.map((item, index) => {
            const hasImage = Boolean(item.image);
            const isHovered = hoveredExp?.id === item.id;

            return (
              <div
                key={item.id}
                className={`experience-row ${hasImage ? 'has-media' : ''} ${isHovered ? 'active-hover' : ''}`}
                style={{ animationDelay: `${0.2 + index * 0.12}s` }}
                onMouseEnter={() => hasImage && setHoveredExp(item)}
                onMouseLeave={() => setHoveredExp(null)}
                onClick={() => {
                  if (hasImage) {
                    setActiveModalImg(item);
                  }
                }}
              >
                <div className="experience-left">
                  <div className="experience-title-wrap">
                    <h3 className="experience-company-title">{item.title}</h3>
                    {hasImage && (
                      <span className="experience-photo-pill" title="Click to view authentic photo">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <span>Photo</span>
                      </span>
                    )}
                  </div>
                  <p className="experience-role-subtitle">{item.role}</p>
                </div>

                <div className="experience-right">
                  <span className="experience-period-text">{item.period}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cursor-Follow Image Preview (Desktop) */}
      {hoveredExp && hoveredExp.image && (
        <div 
          className="experience-hover-card"
          style={{
            transform: `translate3d(${mousePos.x + 24}px, ${mousePos.y - 120}px, 0)`
          }}
          aria-hidden="true"
        >
          <img 
            src={hoveredExp.image} 
            alt={`${hoveredExp.title} internship preview`} 
            className="hover-card-img"
          />
          <div className="hover-card-caption">
            <span className="hover-caption-company">{hoveredExp.title}</span>
            <span className="hover-caption-loc">{hoveredExp.location || 'Internship'}</span>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Modal for Tap / Detail Viewing */}
      {activeModalImg && (
        <div 
          className="experience-modal-overlay" 
          onClick={() => setActiveModalImg(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="experience-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="experience-modal-close" 
              onClick={() => setActiveModalImg(null)}
              aria-label="Close modal"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img 
              src={activeModalImg.image} 
              alt={activeModalImg.title} 
              className="experience-modal-image"
            />
            <div className="experience-modal-info">
              <h4>{activeModalImg.title} — {activeModalImg.role}</h4>
              <p>{activeModalImg.description}</p>
              <span className="experience-modal-period">{activeModalImg.period}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

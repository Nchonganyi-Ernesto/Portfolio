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
    location: 'Buea, Cameroon'
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
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [animatedRows, setAnimatedRows] = useState({});

  const headerRef = useRef(null);
  const rowRefs = useRef({});

  // 1. Header Observer (/EXPERIENCE title and watermark)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -20% 0px'
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Individual Row Observer (Central viewport triggering for desktop & mobile)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const expId = entry.target.dataset.expId;
            if (expId) {
              setAnimatedRows((prev) => ({ ...prev, [expId]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -20% 0px'
      }
    );

    Object.values(rowRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalImg(null);
      }
    };
    if (activeModalImg) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeModalImg]);

  return (
    <section 
      className={`experience-section ${isHeaderVisible ? 'in-view' : ''}`} 
      id="experience"
    >
      <div className="experience-container">
        {/* Header with Background Watermark */}
        <div className="experience-header" ref={headerRef}>
          <div className={`experience-watermark ${isHeaderVisible ? 'is-animated' : ''}`} aria-hidden="true">
            EXPERIENCE
          </div>
          <div className="experience-header-content">
            <h2 className={`experience-title ${isHeaderVisible ? 'is-animated' : ''}`}>/EXPERIENCE</h2>
            <span className={`experience-badge ${isHeaderVisible ? 'is-animated' : ''}`}>3+ years of experience</span>
          </div>
        </div>

        {/* Experience List */}
        <div className="experience-list">
          {experienceData.map((item, index) => {
            const hasImage = Boolean(item.image);
            const isHovered = hoveredExp?.id === item.id;
            const isAnimated = Boolean(animatedRows[item.id]);

            return (
              <div
                key={item.id}
                ref={(el) => { rowRefs.current[item.id] = el; }}
                data-exp-id={item.id}
                className={`experience-row ${isAnimated ? 'is-animated' : ''} ${hasImage ? 'has-media' : ''} ${isHovered ? 'active-hover' : ''}`}
                onMouseEnter={() => hasImage && setHoveredExp(item)}
                onMouseLeave={() => setHoveredExp(null)}
                onClick={() => {
                  if (hasImage) {
                    setActiveModalImg(item);
                  }
                }}
              >
                <div className="experience-left">
                  <div className="experience-milestone-tag">
                    <span className="milestone-pip" aria-hidden="true" />
                    <span className="milestone-num">{`0${index + 1}`}</span>
                  </div>
                  <h3 className="experience-company-title">{item.title}</h3>
                  <p className="experience-role-subtitle">{item.role}</p>
                </div>

                {/* Tilted Photo Card at the side (Flies in from top-right) */}
                {hasImage && (
                  <div 
                    className="experience-tilted-card" 
                    title="Click to view full image"
                  >
                    <div className="tilted-card-inner">
                      <img 
                        src={item.image} 
                        alt={`${item.title} preview`} 
                        className="tilted-card-img"
                      />
                    </div>
                  </div>
                )}

                <div className="experience-right">
                  <span className="experience-period-text">{item.period}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
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
              aria-label="Close full image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="experience-modal-img-wrap">
              <img 
                src={activeModalImg.image} 
                alt={activeModalImg.title} 
                className="experience-modal-image"
              />
            </div>
            <div className="experience-modal-info">
              <div className="experience-modal-title-row">
                <h4>{activeModalImg.title}</h4>
                <span className="experience-modal-period">{activeModalImg.period}</span>
              </div>
              <p className="experience-modal-role">{activeModalImg.role} {activeModalImg.location && `• ${activeModalImg.location}`}</p>
              <p className="experience-modal-desc">{activeModalImg.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

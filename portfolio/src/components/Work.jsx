import React, { useState, useEffect, useRef } from 'react';
import './Work.css';
import { projectsData } from '../data/projectsData';

export default function Work({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isPair1Visible, setIsPair1Visible] = useState(false);
  const [isPair2Visible, setIsPair2Visible] = useState(false);
  const [mobileVisibleCards, setMobileVisibleCards] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef(null);
  const cardRefs = useRef({});

  // Detect mobile viewport (<= 868px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 868);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Header Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-10% 0px -20% 0px' }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Desktop Pair 1 Observer (First two cards: BloodLink & Pharma-Scout)
  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsPair1Visible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-10% 0px -20% 0px' }
    );

    if (cardRefs.current['bloodlink']) observer.observe(cardRefs.current['bloodlink']);
    if (cardRefs.current['pharmascout']) observer.observe(cardRefs.current['pharmascout']);

    return () => observer.disconnect();
  }, [isMobile, activeFilter]);

  // 3. Desktop Pair 2 Observer (Second two cards: KSearch & FoodBistro)
  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsPair2Visible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-10% 0px -20% 0px' }
    );

    if (cardRefs.current['ksearch']) observer.observe(cardRefs.current['ksearch']);
    if (cardRefs.current['foodbistro']) observer.observe(cardRefs.current['foodbistro']);

    return () => observer.disconnect();
  }, [isMobile, activeFilter]);

  // 4. Mobile Independent Per-Card Observer (Triggers each card ONLY when centrally visible)
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.projectId;
            if (cardId) {
              setMobileVisibleCards((prev) => ({ ...prev, [cardId]: true }));
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

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile, activeFilter]);

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((project) => (project.projectType || project.category) === activeFilter);

  const handleCardClick = (project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <section 
      className={`work-section ${isHeaderVisible ? 'in-view' : ''}`} 
      id="work"
    >
      <div className="work-container">
        {/* Header with Background Watermark */}
        <div className="work-header" ref={headerRef}>
          <div className="work-watermark" aria-hidden="true">PORTFOLIO</div>
          <h2 className="work-title">/SELECTED WORK</h2>
        </div>

        {/* Filter Navigation Bar */}
        <div className="work-controls">
          <div className="filter-tabs">
            {['All', 'Real Project', 'Exploration'].map((filter) => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/Nchonganyi-Ernesto/"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-btn"
          >
            <span>View All Work</span>
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

        {/* 2x2 Project Cards Grid (1-Column on Mobile) */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const originalIndex = projectsData.findIndex((p) => p.id === project.id);
            const isFirstPair = originalIndex < 2;

            // On mobile: each card is 100% independent and only animates when it is centrally visible
            // On desktop: first two cards animate together, second two cards animate together independently
            const isAnimated = isMobile 
              ? !!mobileVisibleCards[project.id]
              : (isFirstPair ? isPair1Visible : isPair2Visible);

            // On mobile: zero delay so each card animates promptly upon reaching center
            // On desktop: subtle stagger between cards in the same pair
            const staggerDelay = isMobile ? 0 : ((index % 2) * 0.22);

            return (
              <article 
                key={project.id} 
                ref={(el) => { cardRefs.current[project.id] = el; }}
                data-project-id={project.id}
                className={`project-card ${isAnimated ? 'is-animated' : ''}`}
                style={{
                  transitionDelay: `${staggerDelay}s`
                }}
              >
                {/* Clickable Image Container revealing Eye View Icon on hover */}
                <div
                  className="project-image-wrapper"
                  onClick={() => handleCardClick(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View full case study of ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(project);
                    }
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />

                  {/* Modern View Icon Badge appearing on hover */}
                  <div 
                    className="project-view-badge"
                    aria-label={`View details of ${project.title}`}
                  >
                    <svg
                      className="view-icon-svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 7 7 7 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span className="view-badge-label">View Project</span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="project-info">
                  <h3 className="project-title">
                    <button
                      type="button"
                      className="project-title-btn"
                      onClick={() => handleCardClick(project)}
                    >
                      {project.title}
                    </button>
                  </h3>

                  <p className="project-desc">{project.description}</p>

                  {/* Footer with Full Tech Stack Tags */}
                  <div className="project-card-footer">
                    <div className="project-tags">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

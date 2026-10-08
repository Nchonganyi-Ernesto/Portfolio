import React, { useEffect, useState, useRef } from 'react';
import './ProjectDetail.css';
import { projectsData } from '../data/projectsData';

// Editorial Scroll-Highlight Text Component (Illuminates text word-by-word as you scroll)
function ScrollHighlightText({ text, as = 'p', className = '', lead = false }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateHighlight = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start illuminating when element reaches lower area of screen
      // Complete illuminating when element reaches comfortable upper-reading position
      const start = windowHeight * 0.90;
      const end = windowHeight * 0.35;

      let rawProgress = (start - rect.top) / (start - end);
      rawProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(rawProgress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHighlight);
        ticking = true;
      }
    };

    updateHighlight();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [text]);

  if (!text) return null;

  const Component = as;
  const words = text.split(/\s+/);
  const totalWords = words.length;

  return (
    <Component
      ref={containerRef}
      className={`scroll-highlight-text ${lead ? 'brief-lead-statement scroll-highlight-lead' : ''} ${className}`}
    >
      {words.map((word, idx) => {
        const wordThreshold = idx / totalWords;
        const isHighlighted = progress > wordThreshold;

        return (
          <span
            key={idx}
            className={`highlight-word ${isHighlighted ? 'is-active' : 'is-muted'}`}
          >
            {word}{' '}
          </span>
        );
      })}
    </Component>
  );
}

function ScrollHighlightStatement({ text, className = '' }) {
  return <ScrollHighlightText text={text} as="h2" lead={true} className={className} />;
}

export default function ProjectDetail({ project, onBack, onSelectProject }) {
  // Accordion state for Engineering Challenges
  const [openChallengeIndexes, setOpenChallengeIndexes] = useState([0]);
  const [isChallengesVisible, setIsChallengesVisible] = useState(false);
  const timelineContainerRef = useRef(null);
  const timelineProgressRef = useRef(null);

  // Reset open challenge and smooth scroll to top on project switch
  useEffect(() => {
    setOpenChallengeIndexes([0]);
    setIsChallengesVisible(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Smooth reveal animation observer for timeline and interactive sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (
              entry.target.classList.contains('challenge-accordion-item') ||
              entry.target.classList.contains('challenges-section')
            ) {
              setIsChallengesVisible(true);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const revealElements = document.querySelectorAll(
      '.timeline-row, .arch-card, .challenge-accordion-item, .challenges-section, .bottom-project-card, .detail-project-mind-card'
    );
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [project.id]);

  // Dynamic Scroll Animation for Timeline Middle Track Line
  useEffect(() => {
    let ticking = false;

    const handleTimelineScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (timelineContainerRef.current && timelineProgressRef.current) {
            const rect = timelineContainerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Trigger when top of the timeline reaches comfortable reading area
            const triggerPoint = windowHeight * 0.58;
            const containerTop = rect.top;
            const containerHeight = rect.height;

            // Distance required to fill the line through all steps
            const totalDistance = Math.max(containerHeight - (windowHeight * 0.28), 1);
            const scrolledDistance = triggerPoint - containerTop;

            let progress = scrolledDistance / totalDistance;
            progress = Math.max(0, Math.min(1, progress));

            timelineProgressRef.current.style.transform = `scaleY(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleTimelineScroll, { passive: true });
    window.addEventListener('resize', handleTimelineScroll, { passive: true });
    handleTimelineScroll();

    return () => {
      window.removeEventListener('scroll', handleTimelineScroll);
      window.removeEventListener('resize', handleTimelineScroll);
    };
  }, [project.id]);

  const toggleChallenge = (idx) => {
    setIsChallengesVisible(true);
    setOpenChallengeIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Find previous and next project for smooth carousel-like navigation
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  return (
    <div className="project-detail-page">
      {/* Top Plain Sub-Navigation */}
      <nav className="detail-top-nav">
        <div className="detail-nav-container">
          <button className="detail-back-btn" onClick={onBack} aria-label="Back to Home">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="detail-nav-breadcrumbs">
            <span className="crumb-root" onClick={onBack}>Selected Work</span>
            <span className="crumb-divider">/</span>
            <span className="crumb-current">{project.title.split(' - ')[0]}</span>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <article className="detail-main-container">
        {/* Hero Section */}
        <header className="detail-hero-header">
          {/* Architectural center grid lines with horizontal edge fade */}
          <div className="hero-grid-lines" aria-hidden="true" />

          <div className="detail-hero-split">
            {/* Left: Product Name & Very Brief Subtext (<10 words) in Light Font */}
            <div className="hero-left-info">
              <h1 className="hero-product-name">{project.name || project.title.split(' - ')[0]}</h1>
              <p className="hero-product-subtext">{project.shortSummary}</p>
            </div>

            {/* Right: Year & Category (Text Above, Under it is a Line) */}
            <div className="hero-right-meta">
              <div className="hero-meta-item">
                <div className="meta-text-above">
                  <span className="meta-label">YEAR</span>
                  <span className="meta-value">{project.year}</span>
                </div>
                <div className="meta-line" />
              </div>

              <div className="hero-meta-item">
                <div className="meta-text-above">
                  <span className="meta-label">CATEGORY</span>
                  <span className="meta-value">{project.category}</span>
                </div>
                <div className="meta-line" />
              </div>
            </div>
          </div>
        </header>

        {/* Browser Window Device Mockup */}
        <section className="detail-mockup-section">
          <div className="browser-mockup-frame">
            <div className="browser-mockup-bar">
              <div className="browser-dots">
                <span className="b-dot red" />
                <span className="b-dot yellow" />
                <span className="b-dot green" />
              </div>
              <div className="browser-address">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>{project.link.replace('https://', '')}</span>
              </div>
              <div className="browser-action">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="browser-open-btn"
                  title="Open live website"
                >
                  ↗
                </a>
              </div>
            </div>
            <div className="browser-mockup-body">
              <img
                src={project.image}
                alt={`${project.title} screenshot preview`}
                className="browser-screenshot"
              />
            </div>
          </div>
        </section>

        {/* The Brief / Context Section (Structured Exactly As In The Design Image) */}
        <section className="detail-brief-section brief-normal">
          {/* Left Column: THE BRIEF Tag */}
          <div className="brief-tag-col">
            <span className="brief-section-tag">THE BRIEF</span>
          </div>

          {/* Right Column: Lead Statement + Challenge, Approach, Outcome */}
          <div className="brief-content-col">
            <ScrollHighlightStatement
              text={project.leadStatement || project.overview}
            />

            <div className="brief-items-stack">
              <div className="brief-item">
                <span className="brief-item-label">CHALLENGE</span>
                <ScrollHighlightText
                  as="p"
                  className="brief-item-text"
                  text={project.briefChallenge || project.challenge}
                />
              </div>

              <div className="brief-item">
                <span className="brief-item-label">APPROACH</span>
                <ScrollHighlightText
                  as="p"
                  className="brief-item-text"
                  text={project.briefApproach || project.solution}
                />
              </div>

              <div className="brief-item">
                <span className="brief-item-label">OUTCOME</span>
                <ScrollHighlightText
                  as="p"
                  className="brief-item-text"
                  text={project.briefOutcome}
                />
              </div>
            </div>
          </div>
        </section>

        {/* My Role Section (Structured Same As The Brief but With Interchanged Sides) */}
        <section className="detail-brief-section role-reversed">
          {/* Left Column: Lead Statement + Stacked Focus Items */}
          <div className="brief-content-col">
            <ScrollHighlightStatement
              text={project.roleLeadStatement || `As ${project.role}, I directed technical execution, frontend architecture, and core user experience.`}
            />

            <div className="brief-items-stack">
              {project.roleHighlights && project.roleHighlights.length > 0 ? (
                project.roleHighlights.map((item, idx) => (
                  <div key={idx} className="brief-item">
                    <span className="brief-item-label">{item.label}</span>
                    <ScrollHighlightText
                      as="p"
                      className="brief-item-text"
                      text={item.text}
                    />
                  </div>
                ))
              ) : (
                project.myRole.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="brief-item">
                    <span className="brief-item-label">
                      {idx === 0 ? 'ARCHITECTURE' : idx === 1 ? 'EXECUTION' : 'DELIVERY'}
                    </span>
                    <ScrollHighlightText
                      as="p"
                      className="brief-item-text"
                      text={item}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: MY ROLE Tag */}
          <div className="brief-tag-col">
            <span className="brief-section-tag">MY ROLE</span>
          </div>
        </section>

        {/* Section: Core Features & Functionality (Alternating Editorial Timeline Matching Design) */}
        <section className="detail-section functionality-section">
          <div className="detail-section-header">
            <div>
              <h2 className="detail-section-title">Full Application Functionality</h2>
              <p className="detail-section-sub">
                Key features and technical capabilities delivered in production.
              </p>
            </div>
          </div>

          <div className="functionality-timeline-container" ref={timelineContainerRef}>
            {/* Center Timeline Track Line with Dynamic Scroll Animation */}
            <div className="timeline-track-line" aria-hidden="true">
              <div ref={timelineProgressRef} className="timeline-progress-fill" />
            </div>

            {/* Alternating Step Rows */}
            {project.keyFeatures.map((feat, idx) => {
              const isEven = idx % 2 === 0;
              const stepNumber = `Step 0${idx + 1}`;

              return (
                <div
                  key={idx}
                  className={`timeline-row ${isEven ? 'row-left' : 'row-right'}`}
                  style={{ '--stagger-delay': `${idx * 0.08}s` }}
                >
                  {/* Left Column */}
                  {isEven ? (
                    <div className="timeline-content-block block-left">
                      <span className="timeline-step-tag">{stepNumber}</span>
                      <h3 className="timeline-step-title">{feat.title}</h3>
                      <p className="timeline-step-desc">{feat.description}</p>
                    </div>
                  ) : (
                    <div className="timeline-spacer" aria-hidden="true" />
                  )}

                  {/* Center Node / Dot Marker */}
                  <div className="timeline-node-anchor">
                    <div className="timeline-node" aria-hidden="true">
                      <div className="timeline-inner-dot" />
                    </div>
                  </div>

                  {/* Right Column */}
                  {!isEven ? (
                    <div className="timeline-content-block block-right">
                      <span className="timeline-step-tag">{stepNumber}</span>
                      <h3 className="timeline-step-title">{feat.title}</h3>
                      <p className="timeline-step-desc">{feat.description}</p>
                    </div>
                  ) : (
                    <div className="timeline-spacer" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Technical Architecture */}
        <section className="detail-section">
          <div className="detail-section-header">
            <div>
              <h2 className="detail-section-title">System Architecture &amp; Design</h2>
              <p className="detail-section-sub">
                How different tiers and third-party systems are integrated.
              </p>
            </div>
          </div>

          <div className="arch-matrix-grid">
            {/* Frontend Architecture */}
            <div className="arch-card" style={{ '--arch-idx': 0 }}>
              <div className="arch-card-header">
                <span className="arch-tier-label">FRONTEND ARCHITECTURE</span>
                <div className="arch-icon-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                    <line x1="8" x2="16" y1="21" y2="21"></line>
                    <line x1="12" x2="12" y1="17" y2="21"></line>
                  </svg>
                </div>
              </div>
              <div className="arch-card-content">
                <p className="arch-tier-val">{project.architecture.frontend}</p>
              </div>
            </div>

            {/* Backend & Cloud Logic */}
            <div className="arch-card" style={{ '--arch-idx': 1 }}>
              <div className="arch-card-header">
                <span className="arch-tier-label">
                  {project.architecture.backend ? 'BACKEND & CLOUD LOGIC' : 'DESIGN & USER EXPERIENCE'}
                </span>
                <div className="arch-icon-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                    <line x1="6" x2="6.01" y1="6" y2="6"></line>
                    <line x1="6" x2="6.01" y1="18" y2="18"></line>
                  </svg>
                </div>
              </div>
              <div className="arch-card-content">
                <p className="arch-tier-val">
                  {project.architecture.backend || project.architecture.design || 'Serverless APIs'}
                </p>
              </div>
            </div>

            {/* Database & Storage */}
            <div className="arch-card" style={{ '--arch-idx': 2 }}>
              <div className="arch-card-header">
                <span className="arch-tier-label">DATABASE &amp; STORAGE</span>
                <div className="arch-icon-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
                    <path d="M3 12a9 3 0 0 0 18 0"></path>
                  </svg>
                </div>
              </div>
              <div className="arch-card-content">
                <p className="arch-tier-val">{project.architecture.database || 'Static / Client Storage'}</p>
              </div>
            </div>

            {/* Deployment & CI/CD */}
            <div className="arch-card" style={{ '--arch-idx': 3 }}>
              <div className="arch-card-header">
                <span className="arch-tier-label">DEPLOYMENT &amp; CI/CD</span>
                <div className="arch-icon-badge" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                </div>
              </div>
              <div className="arch-card-content">
                <p className="arch-tier-val">{project.architecture.deployment}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Challenges Overcome (Black Accordion with Plus Icon & Smooth Animation) */}
        {project.challengesSolved && project.challengesSolved.length > 0 && (
          <section className="detail-section challenges-section">
            <div className="detail-section-header">
              <div>
                <h2 className="detail-section-title">Engineering Challenges &amp; Solutions</h2>
                <p className="detail-section-sub">
                  Real technical hurdles encountered and how they were solved.
                </p>
              </div>
            </div>

            <div className="challenges-accordion-list">
              {project.challengesSolved.map((ch, idx) => {
                const isOpen = openChallengeIndexes.includes(idx);

                return (
                  <div
                    key={idx}
                    className={`challenge-accordion-item ${isChallengesVisible ? 'is-visible' : ''} ${isOpen ? 'is-open' : ''}`}
                    style={{ '--ch-idx': idx }}
                  >
                    <button
                      type="button"
                      className="challenge-accordion-header"
                      onClick={() => toggleChallenge(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="accordion-title-wrap">
                        <span className="accordion-item-index">0{idx + 1}</span>
                        <h3 className="accordion-challenge-title">{ch.title}</h3>
                      </div>

                      <div className="accordion-icon-circle" aria-hidden="true">
                        <svg
                          className="accordion-plus-svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                    </button>

                    <div className="accordion-content-wrapper">
                      <div className="accordion-content-inner">
                        <div className="accordion-solution-body">
                          <span className="accordion-solution-tag">HOW WE SOLVED IT</span>
                          <p className="accordion-solution-text">{ch.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Exploration: More Selected Projects */}
        <footer className="detail-bottom-nav-section">
          <div className="detail-bottom-projects-header">
            <div>
              <h3 className="detail-bottom-projects-title">More Selected Projects</h3>
              <p className="detail-bottom-projects-sub">Explore additional engineered systems &amp; case studies</p>
            </div>
          </div>

          <div className="detail-bottom-projects-grid">
            {[prevProject, nextProject].map((item, idx) => (
              <div
                key={item.id}
                className="bottom-project-card"
                style={{ '--card-idx': idx }}
                onClick={() => onSelectProject(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(item);
                  }
                }}
                aria-label={`View project: ${item.name || item.title}`}
              >
                <div className="bottom-project-img-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="bottom-project-img"
                    loading="lazy"
                  />
                </div>

                <div className="bottom-project-body">
                  <div className="bottom-project-title-row">
                    <h4 className="bottom-project-name">
                      {item.name || item.title.split(' - ')[0]}
                    </h4>
                    <div className="bottom-project-arrow-circle" aria-hidden="true">
                      <svg
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
                    </div>
                  </div>

                  <p className="bottom-project-desc">
                    {item.shortSummary || item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="bottom-project-tags">
                      {item.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="bottom-project-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Have a Project in Mind Banner */}
          <div className="detail-project-mind-card">
            <div className="project-mind-grid-bg" aria-hidden="true" />
            
            <div className="project-mind-content">
              <h3 className="project-mind-title">
                <span className="mind-title-regular">Let's build</span>
                <span className="mind-title-italic">something rare.</span>
              </h3>

              <p className="project-mind-desc">
                I take on a handful of new partnerships each quarter. If you're building something ambitious, I'd love to hear about it.
              </p>

              <div className="project-mind-actions">
                <a
                  href="mailto:nchonganyiernesto27@gmail.com"
                  className="project-mind-btn"
                  aria-label="Start a conversation with Nchonganyi Ernesto"
                >
                  <span>Start a conversation</span>
                  <span className="project-mind-btn-circle">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}

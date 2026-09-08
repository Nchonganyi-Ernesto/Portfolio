import React, { useState, useEffect, useRef } from 'react';
import './Work.css';

import bloodlinkImg from '../assets/BLOODLINK.jpeg';
import pharmaScoutImg from '../assets/pharma-scout-image.PNG';
import ksearchImg from '../assets/ads-hero.PNG';
import foodbistroImg from '../assets/restaurant-image.PNG';

const projectsData = [
  {
    id: 'bloodlink',
    title: 'BloodLink - Life-Saving Blood Donor Network',
    category: 'Real Project',
    badge: 'REAL PROJECT',
    image: bloodlinkImg,
    description:
      'An innovative platform connecting blood donors to patients in critical need across Africa through simple profile setups, GPS-based location matching, and automated calling mechanisms to nearby donors.',
    tags: ['React (Vite)', 'CSS', 'Supabase', 'PostgreSQL', 'Baileys WhatsApp Cloud'],
    link: 'https://github.com/Nchonganyi-Ernesto/'
  },
  {
    id: 'pharmascout',
    title: 'Pharma-Scout - Smart Health & Drug Inventory Broker',
    category: 'Real Project',
    badge: 'REAL PROJECT',
    image: pharmaScoutImg,
    description:
      'A dedicated healthcare platform eliminating medicine search exhaustion by connecting patients directly to registered pharmacies with verified, real-time drug inventories.',
    tags: ['React', 'CSS', 'Firebase', 'Firestore', 'Cloudinary', 'Resend'],
    link: 'https://github.com/Nchonganyi-Ernesto/'
  },
  {
    id: 'ksearch',
    title: 'KSearch - Targeted Advertising & Campaign Platform',
    category: 'Exploration',
    badge: 'EXPLORATION',
    image: ksearchImg,
    description:
      'A clean advertising web prototype engineered for submitting, verifying, and managing targeted promotional campaigns with interactive submission pipelines.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'Firestore'],
    link: 'https://github.com/Nchonganyi-Ernesto/'
  },
  {
    id: 'foodbistro',
    title: 'FoodBistro - Modern Restaurant Digital UI Experience',
    category: 'Exploration',
    badge: 'EXPLORATION',
    image: foodbistroImg,
    description:
      'A production-level frontend web application showcasing interactive dining menus, smooth reservation user flows, and aesthetic culinary UI/UX design.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Design'],
    link: 'https://github.com/Nchonganyi-Ernesto/'
  }
];

export default function Work() {
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
    : projectsData.filter((project) => project.category === activeFilter);

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
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-image-wrapper"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />

                  {/* Floating Circle Action Arrow on Hover */}
                  <div className="project-arrow-badge">
                    <svg
                      width="16"
                      height="16"
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
                </a>

                {/* Card Meta Content */}
                <div className="project-info">
                  <h3 className="project-title">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>

                  <p className="project-desc">{project.description}</p>

                  {/* Tech Stack Pills */}
                  <div className="project-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tech-pill">
                        {tag}
                      </span>
                    ))}
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

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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect immediately so it never retriggers or flickers
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -100px 0px' }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  return (
    <section 
      className={`work-section ${isVisible ? 'in-view' : ''}`} 
      id="work"
      ref={sectionRef}
    >
      <div className="work-container">
        {/* Header with Background Watermark */}
        <div className="work-header">
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

        {/* 2x2 Project Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card">
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
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

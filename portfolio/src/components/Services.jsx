import React, { useState, useEffect, useRef } from 'react';
import './Services.css';

const servicesData = [
  {
    id: 'web-design-dev',
    title: 'WEB DESIGN & DEV',
    description:
      'Designing and developing high-performance, pixel-perfect web applications, modern landing pages, and responsive frontend architectures with production-grade UI/UX.'
  },
  {
    id: 'motions-animations',
    title: 'MOTIONS & ANIMATIONS',
    description:
      'Crafting fluid micro-interactions, smooth scroll physics, and engaging interactive animation flows that elevate user engagement, conversion, and brand delight.'
  },
  {
    id: 'deployment-cloud',
    title: 'DEPLOYMENT & CLOUD MANAGEMENT',
    description:
      'Configuring automated CI/CD pipelines, cloud databases (Supabase, Firebase, PostgreSQL), serverless cloud integrations, and domain infrastructure management.'
  },
  {
    id: 'branding',
    title: 'BRANDING',
    description:
      'Developing cohesive digital design systems, typographic hierarchies, custom color palettes, and memorable visual product identities for modern web ventures.'
  }
];

export default function Services() {
  const [activeId, setActiveId] = useState('web-design-dev');
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
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px' // Only trigger when user is looking at the actual content
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleHover = (id) => {
    setActiveId(id);
  };

  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      className={`services-section ${isInView ? 'in-view' : ''}`} 
      id="services"
    >
      {/* Background Image Layer from public/BG IMAGE.png */}
      <div 
        className="services-bg-layer" 
        style={{ backgroundImage: `url('/BG IMAGE.png')` }}
        aria-hidden="true"
      />
      
      <div className="services-container" ref={containerRef}>
        {/* Section Title (slides from top) */}
        <div className="services-header">
          <h2 className="services-title">/SERVICE</h2>
        </div>

        {/* Services Accordion List (slides from below, shifts right, opens on hover) */}
        <div className="services-list">
          {servicesData.map((service, index) => {
            const isExpanded = activeId === service.id;

            return (
              <div 
                key={service.id} 
                className={`service-item ${isExpanded ? 'expanded' : 'collapsed'}`}
                style={{ animationDelay: `${0.45 + index * 0.28}s` }}
                onMouseEnter={() => handleHover(service.id)}
                onClick={() => handleToggle(service.id)}
              >
                <div className="service-card-shell">
                  <div className="service-header-row">
                    <h3 className="service-item-title">{service.title}</h3>
                    
                    <div className="service-toggle-icon">
                      {/* Arrow Icon for Collapsed State */}
                      <svg
                        className="service-arrow-svg"
                        width="24"
                        height="24"
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

                      {/* Close ✕ Icon for Expanded State */}
                      <svg 
                        className="service-close-svg"
                        width="22" 
                        height="22" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  </div>

                  {/* Expandable Body (CSS Grid 0fr -> 1fr for zero flicker) */}
                  <div className="service-body-wrapper">
                    <div className="service-body-inner">
                      <p className="service-desc-text">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

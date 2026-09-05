import React, { useState } from 'react';
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

  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section className="services-section" id="services">
      {/* Background Image Layer from public/BG IMAGE.png */}
      <div 
        className="services-bg-layer" 
        style={{ backgroundImage: `url('/BG IMAGE.png')` }}
        aria-hidden="true"
      />
      
      <div className="services-container">
        {/* Section Title */}
        <div className="services-header">
          <h2 className="services-title">/SERVICE</h2>
        </div>

        {/* Services Accordion List */}
        <div className="services-list">
          {servicesData.map((service) => {
            const isExpanded = activeId === service.id;

            return (
              <div 
                key={service.id} 
                className={`service-item ${isExpanded ? 'expanded' : 'collapsed'}`}
              >
                {isExpanded ? (
                  /* Expanded Dark Card Container */
                  <div className="service-card-expanded" onClick={() => handleToggle(service.id)}>
                    <div className="service-expanded-left">
                      <h3 className="service-expanded-title">{service.title}</h3>
                      <p className="service-expanded-desc">{service.description}</p>
                    </div>

                    {/* Close / Toggle Button */}
                    <button 
                      className="service-close-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(service.id);
                      }}
                      aria-label="Close service details"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* Collapsed Row with Divider */
                  <div 
                    className="service-row-collapsed"
                    onClick={() => handleToggle(service.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleToggle(service.id);
                      }
                    }}
                  >
                    <h3 className="service-collapsed-title">{service.title}</h3>
                    <div className="service-arrow-icon">
                      <svg
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
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState({});
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 868 : false
  );

  const headerRef = useRef(null);
  const itemRefs = useRef({});
  const isTouchRef = useRef(false);
  const manualInteractionUntilRef = useRef(0);
  const justOpenedByTouchRef = useRef(false);

  // Resize listener to track mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 868);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distinguish touch vs mouse interactions globally
  useEffect(() => {
    const handleTouchStart = () => {
      isTouchRef.current = true;
    };
    const handleMouseMove = () => {
      isTouchRef.current = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 1. Header Observer (/SERVICE title)
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

  // 2. Individual Accordion Item Observers (Entrance Animations)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceId = entry.target.dataset.serviceId;
            if (serviceId) {
              setAnimatedItems((prev) => ({ ...prev, [serviceId]: true }));
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

    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Mobile Central Viewport "Scroll-Hover":
  // Automatically opens the service card that is centrally visible as the user scrolls on mobile
  useEffect(() => {
    if (!isMobile) return;

    const intersectingItems = new Map();

    const centerObserver = new IntersectionObserver(
      (entries) => {
        // If user recently interacted via manual tap, temporarily pause scroll-hover
        if (Date.now() < manualInteractionUntilRef.current) return;

        entries.forEach((entry) => {
          const id = entry.target.dataset.serviceId;
          if (!id) return;
          if (entry.isIntersecting) {
            intersectingItems.set(id, entry);
          } else {
            intersectingItems.delete(id);
          }
        });

        if (intersectingItems.size > 0) {
          const viewportCenter = window.innerHeight / 2;
          let bestId = null;
          let minDistance = Infinity;

          intersectingItems.forEach((entry, id) => {
            const rect = entry.boundingClientRect;
            const itemCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - itemCenter);
            if (distance < minDistance) {
              minDistance = distance;
              bestId = id;
            }
          });

          if (bestId && bestId !== activeId) {
            setActiveId(bestId);
          }
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    Object.values(itemRefs.current).forEach((el) => {
      if (el) centerObserver.observe(el);
    });

    return () => centerObserver.disconnect();
  }, [isMobile, activeId]);

  // Desktop Hover: triggers when mouse passes over a card
  const handleHover = (id) => {
    if (isTouchRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    setActiveId(id);
  };

  // Mobile Touch Contact "Hover": opens immediately upon finger contact
  const handleTouchStartCard = (id) => {
    isTouchRef.current = true;
    manualInteractionUntilRef.current = Date.now() + 1500;
    if (activeId !== id) {
      justOpenedByTouchRef.current = true;
      setActiveId(id);
    } else {
      justOpenedByTouchRef.current = false;
    }
  };

  // Mobile Touch Drag "Hover": as finger glides across cards, whichever is touched opens dynamically
  const handleTouchMoveList = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!targetEl) return;
    const itemEl = targetEl.closest('.service-item');
    if (itemEl && itemEl.dataset.serviceId) {
      const serviceId = itemEl.dataset.serviceId;
      if (serviceId && serviceId !== activeId) {
        manualInteractionUntilRef.current = Date.now() + 1500;
        setActiveId(serviceId);
      }
    }
  };

  // Click & Mobile Tap Toggle: allows collapsing an open card
  const handleToggle = (id) => {
    manualInteractionUntilRef.current = Date.now() + 1500;
    if (justOpenedByTouchRef.current) {
      justOpenedByTouchRef.current = false;
      return; // Already opened instantly on touchstart, keep open
    }
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      className={`services-section ${isHeaderVisible ? 'in-view' : ''}`} 
      id="services"
    >
      {/* Background Image Layer from public/BG IMAGE.png */}
      <div 
        className="services-bg-layer" 
        style={{ backgroundImage: `url('/BG IMAGE.png')` }}
        aria-hidden="true"
      />
      
      <div className="services-container">
        {/* Section Title (slides down when centrally visible) */}
        <div className="services-header" ref={headerRef}>
          <h2 className={`services-title ${isHeaderVisible ? 'is-animated' : ''}`}>
            /SERVICE
          </h2>
        </div>

        {/* Services Accordion List (Supports desktop hover, mobile scroll-hover, and mobile touch-hover) */}
        <div className="services-list" onTouchMove={handleTouchMoveList}>
          {servicesData.map((service) => {
            const isExpanded = activeId === service.id;
            const isAnimated = !!animatedItems[service.id];

            return (
              <div 
                key={service.id} 
                ref={(el) => { itemRefs.current[service.id] = el; }}
                data-service-id={service.id}
                className={`service-item ${isAnimated ? 'is-animated' : ''} ${isExpanded ? 'expanded' : 'collapsed'}`}
                onTouchStart={() => handleTouchStartCard(service.id)}
                onMouseEnter={() => handleHover(service.id)}
                onClick={() => handleToggle(service.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(service.id);
                  }
                }}
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

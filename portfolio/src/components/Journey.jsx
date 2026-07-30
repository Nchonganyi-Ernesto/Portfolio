import React from 'react';
import './Journey.css';

export default function Journey() {
  const milestones = [
    {
      year: 'Year 01',
      title: 'Frontend Foundations & UI/UX Mastery',
      position: 'left',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      tags: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Responsive UI/UX'],
      description:
        'My journey into software engineering began with a passion for user interfaces. I mastered core web fundamentals, pixel-perfect design systems, interactive component architecture, and modern JavaScript frameworks to build high-converting frontend experiences.'
    },
    {
      year: 'Year 02',
      title: 'Backend Engineering & Cloud Architecture',
      position: 'right',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      tags: ['Node.js', 'REST APIs', 'Firebase', 'Databases', 'Cloud Deployment'],
      description:
        'Expanded into backend engineering to power full-stack applications. Specialized in RESTful API development, serverless database integration with Firebase, authentication flows, relational/NoSQL data management, and cloud architecture deployment.'
    },
    {
      year: 'Year 03',
      title: 'Security, Resilience & High Scalability',
      position: 'left',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      tags: ['Security Protocols', 'System Scalability', 'Performance', 'Microservices', 'Cloud Ops'],
      description:
        'Deepened expertise in engineering mission-critical systems designed for high availability and threat protection. Focused on security hardening, data encryption, API rate limiting, load distribution, microservices, and scaling platforms to handle high user volume.'
    }
  ];

  return (
    <section id="journey" className="journey-section">
      {/* Background Watermark */}
      <div className="journey-watermark" aria-hidden="true">
        MY JOURNEY
      </div>

      <div className="journey-container">
        {/* Section Header */}
        <div className="journey-header">
          <div className="journey-tag">
            <span className="tag-pulse"></span>
            <span>// MILESTONES</span>
          </div>
          <h2 className="journey-title">
            MY <span className="text-neon">JOURNEY</span> INTO TECH
          </h2>
          <p className="journey-subtitle">
            A chronological timeline of my evolution as a Full Stack Software Engineer.
          </p>
        </div>

        {/* Timeline Container with Central Dividing Line */}
        <div className="timeline-wrapper">
          {/* Central Vertical Divider Line */}
          <div className="central-divider-line"></div>

          {/* Cards */}
          <div className="timeline-cards">
            {milestones.map((item, index) => (
              <div
                key={index}
                className={`timeline-card-row ${item.position === 'left' ? 'row-left' : 'row-right'}`}
              >
                {/* Node Marker on Divider Line */}
                <div className="timeline-node-marker">
                  <div className="node-outer-glow"></div>
                  <div className="node-inner-dot"></div>
                </div>

                {/* Card Content Box */}
                <div className="journey-card">
                  <div className="journey-card-top">
                    <div className="journey-year-badge">{item.year}</div>
                    <div className="journey-icon-box">{item.icon}</div>
                  </div>

                  <h3 className="journey-card-title">{item.title}</h3>
                  <p className="journey-card-desc">{item.description}</p>

                  <div className="journey-tags-list">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="journey-tag-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

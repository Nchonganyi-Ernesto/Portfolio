import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [watermarkX, setWatermarkX] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax Watermark Scroll Shift
  useEffect(() => {
    const handleScroll = () => {
      setWatermarkX((window.scrollY * 0.04) % 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skillCategories = [
    {
      category: 'Frontend Technologies',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      skills: [
        { name: 'HTML', level: 100 },
        { name: 'CSS', level: 95 },
        { name: 'JavaScript (JS)', level: 80 },
        { name: 'React', level: 80 },
        { name: 'Flutter', level: 75 }
      ]
    },
    {
      category: 'Backend Technologies',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      ),
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'Firebase', level: 90 },
        { name: 'Supabase', level: 90 },
        { name: 'Django', level: 75 }
      ]
    },
    {
      category: 'Tools & Infrastructure',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      ),
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Deployment & Domain Management', level: 80 },
        { name: 'Cloud Infrastructure Integration', level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      {/* Background Watermark with Scroll Parallax */}
      <div
        className="skills-watermark"
        style={{ transform: `translateX(calc(-50% + ${watermarkX}px))` }}
        aria-hidden="true"
      >
        MY SKILLS
      </div>

      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header">
          <div className="skills-tag">
            <span className="tag-pulse"></span>
            <span>// TECH STACK</span>
          </div>
          <h2 className="skills-title">
            TECHNICAL <span className="text-neon">PROFICIENCY</span>
          </h2>
          <p className="skills-subtitle">
            A breakdown of my technical capabilities, languages, frameworks, and deployment workflows.
          </p>
        </div>

        {/* 3 Skill Cards Grid with Staggered Entrance */}
        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`skill-card ${isVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${idx * 0.15 + 0.1}s` }}
            >
              <div className="skill-card-header">
                <div className="skill-card-icon">{cat.icon}</div>
                <h3 className="skill-card-category">{cat.category}</h3>
              </div>

              <div className="skills-list">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%'
                        }}
                      >
                        <span className="progress-glow-tip"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

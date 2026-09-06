import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('soft'); // 'soft' or 'hard'
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
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Hard Skills Data (with Logos, Percentages, and Slider Progress Line)
  const hardSkills = [
    {
      id: 'html',
      name: 'HTML5',
      percentage: 95,
      iconColor: '#e34f26',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.658-13.203-.002.71 8.033h9.027l-.369 4.122-3.16.852-3.18-.854-.202-2.27H6.348l.386 4.368 5.234 1.425 5.214-1.425.722-8.118H8.531z"/>
        </svg>
      )
    },
    {
      id: 'css',
      name: 'CSS3 & Styling',
      percentage: 90,
      iconColor: '#1572b6',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.658-13.203-.002.71 8.033h9.027l-.369 4.122-3.16.852-3.18-.854-.202-2.27H6.348l.386 4.368 5.234 1.425 5.214-1.425.722-8.118H8.531z"/>
        </svg>
      )
    },
    {
      id: 'js',
      name: 'JavaScript (ES6+)',
      percentage: 85,
      iconColor: '#f7df1e',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.091-.645.061-.915.226-.345.721-.495 1.246-.435.586.09 1.05.375 1.336.855.57-.36.57-.36 1.005-.645-.42-.645-.96-1.035-1.65-1.23-.72-.18-1.74-.135-2.415.24-.766.42-1.17 1.155-1.17 2.055 0 1.155.675 1.875 2.146 2.475 1.08.45 1.425.765 1.425 1.305 0 .54-.45.915-1.29.915-.99 0-1.635-.495-2.04-1.245-.51.315-.51.315-1.05.645.6 1.08 1.545 1.695 3.015 1.695 1.755 0 2.955-.84 2.955-2.31 0-.15 0-.3-.045-.455zM12.9 14.506c-.345-.57-.885-.945-1.56-1.11-.585-.15-1.395-.105-1.95.195-.57.315-.885.885-.885 1.56 0 .93.54 1.5 1.71 1.98.855.36 1.14.615 1.14 1.035 0 .435-.36.735-1.035.735-.795 0-1.305-.39-1.635-.99-.405.255-.405.255-.825.51.48.87 1.245 1.365 2.415 1.365 1.41 0 2.37-.675 2.37-1.845 0-.855-.48-1.425-1.62-1.875-.765-.3-1.05-.51-1.05-.885 0-.345.285-.585.825-.585.66 0 1.08.285 1.305.69.375-.24.375-.24.78-.495z"/>
        </svg>
      )
    },
    {
      id: 'react',
      name: 'React.js',
      percentage: 85,
      iconColor: '#61dafb',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
          <ellipse cx="12" cy="12" rx="10" ry="4.5"></ellipse>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"></ellipse>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"></ellipse>
        </svg>
      )
    },
    {
      id: 'firebase',
      name: 'Firebase',
      percentage: 80,
      iconColor: '#ffca28',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.89 15.672L6.56 1.483a.747.747 0 0 1 1.393-.165l2.457 4.707 3.322-6.309a.748.748 0 0 1 1.336.064l4.996 15.892-8.324 4.743a1.5 1.5 0 0 1-1.48 0L3.89 15.672z"/>
        </svg>
      )
    },
    {
      id: 'supabase',
      name: 'Supabase',
      percentage: 80,
      iconColor: '#3ecf8e',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.35 24v-9.67h8.22c.98 0 1.52-1.14.89-1.9L10.65 0v9.67H2.43c-.98 0-1.52 1.14-.89 1.9L13.35 24z"/>
        </svg>
      )
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      percentage: 85,
      iconColor: '#f05032',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.6 10.59L11.4 1.8a2.4 2.4 0 0 1 3.4 0l7.4 7.4a2.4 2.4 0 0 1 0 3.4l-8.8 8.8a2.4 2.4 0 0 1-3.4 0l-7.4-7.4a2.4 2.4 0 0 1 0-3.41zm11.3 9.41l8.8-8.8-7.4-7.4-8.8 8.8 7.4 7.4zm-1.8-7.8a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zm-2.8 4a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zm5.6 0a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z"/>
        </svg>
      )
    },
    {
      id: 'cloud',
      name: 'Cloud Integration & Deployment',
      percentage: 75,
      iconColor: '#38bdf8',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"></path>
        </svg>
      )
    }
  ];

  // Soft Skills Data (Numbered List matching Image 3)
  const softSkills = [
    { number: '01', title: 'Team Leadership & Mentorship' },
    { number: '02', title: 'Project Management & Planning' },
    { number: '03', title: 'Agile & Scrum Methodologies' },
    { number: '04', title: 'Software Architecture & Design' },
    { number: '05', title: 'Technical Problem Solving' },
    { number: '06', title: 'Code Review & Quality Control' },
    { number: '07', title: 'UI/UX Intuition & User Empathy' },
    { number: '08', title: 'Adaptive Learning & Continuous Improvement' }
  ];

  return (
    <section 
      className={`skills-section ${isInView ? 'in-view' : ''}`} 
      id="skills" 
      ref={containerRef}
    >
      <div className="skills-container">
        {/* Header & Mode Switcher Tabs (Soft vs Hard Skills) */}
        <div className="skills-header-row">
          <div className="skills-header-left">
            <div className="skills-code-tag">
              <span className="code-bracket">&lt;/</span>
              <span className="status-text">Competencies &amp; Expertise</span>
              <span className="code-bracket">&gt;</span>
            </div>
            <h2 className="skills-section-title">SKILLS &amp; CAPABILITIES</h2>
          </div>

          {/* Tab Switcher Pills */}
          <div className="skills-tab-switcher">
            <button 
              className={`skills-tab-btn ${activeTab === 'soft' ? 'active' : ''}`}
              onClick={() => setActiveTab('soft')}
            >
              <span>Soft Skills</span>
            </button>
            <button 
              className={`skills-tab-btn ${activeTab === 'hard' ? 'active' : ''}`}
              onClick={() => setActiveTab('hard')}
            >
              <span>Hard Skills</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area: Soft Skills view OR Hard Skills (Bottom-Right Slide-In) */}
        <div className="skills-display-stage">
          {/* 1. SOFT SKILLS VIEW (Numbered 2-column grid matching Image 3) */}
          <div className={`soft-skills-view ${activeTab === 'soft' ? 'active-view' : 'hidden-view'}`}>
            <div className="soft-skills-grid">
              {softSkills.map((skill) => (
                <div key={skill.number} className="soft-skill-item">
                  <span className="soft-skill-num">{skill.number}.</span>
                  <span className="soft-skill-title">{skill.title}</span>
                  <div className="soft-skill-line" />
                </div>
              ))}
            </div>
          </div>

          {/* 2. HARD SKILLS VIEW (Bottom-Right Slide-In covering section, matching Image 1 logos & Image 2 slider lines) */}
          <div className={`hard-skills-view ${activeTab === 'hard' ? 'slide-in-covering' : 'slide-out'}`}>
            <div className="hard-skills-header-info">
              <h3 className="hard-skills-subtitle">Technical Proficiency</h3>
              <p className="hard-skills-desc">
                Core technologies, frontend frameworks, backend BaaS, version control, and cloud deployment pipelines.
              </p>
            </div>

            <div className="hard-skills-grid">
              {hardSkills.map((skill) => (
                <div key={skill.id} className="hard-skill-card">
                  {/* Top Header: Logo + Skill Name + Percentage */}
                  <div className="hard-skill-top">
                    <div className="hard-skill-identity">
                      <div className="hard-skill-icon" style={{ color: skill.iconColor }}>
                        {skill.svg}
                      </div>
                      <span className="hard-skill-name">{skill.name}</span>
                    </div>
                    <span className="hard-skill-percent">{skill.percentage}%</span>
                  </div>

                  {/* Slider Progress Bar Track with Circle Node Handle (Matching Image 2) */}
                  <div className="slider-progress-track">
                    <div 
                      className="slider-progress-fill" 
                      style={{ width: `${skill.percentage}%`, backgroundColor: skill.iconColor }}
                    />
                    <div 
                      className="slider-node-handle" 
                      style={{ left: `${skill.percentage}%`, borderColor: skill.iconColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

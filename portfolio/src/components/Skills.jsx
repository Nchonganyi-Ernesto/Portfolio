import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';

// ---------------------------------------------------------------------------
// 1. Hard Skill Card Component (with Stagger, 0% -> Target% Progress & Counter)
// ---------------------------------------------------------------------------
function HardSkillCard({ skill, index, isCentrallyVisible, isTabActive, isMobile }) {
  const cardRef = useRef(null);
  const [isSelfVisible, setIsSelfVisible] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  // On mobile: observe self centrally. On desktop: coordinated by grid central visibility
  useEffect(() => {
    if (!isMobile || !isTabActive) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSelfVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -20% 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, isTabActive]);

  // Active animation trigger
  const shouldAnimate = isTabActive && (isMobile ? isSelfVisible : isCentrallyVisible);
  // On desktop: sequenced cascading stagger. On mobile: starts immediately when card reaches center
  const staggerDelay = isMobile ? 0 : (0.12 + index * 0.08);

  // Animate counter from 0% up to skill.percentage
  useEffect(() => {
    if (!shouldAnimate) {
      setAnimatedPercent(0);
      return;
    }

    let startTimestamp = null;
    let animFrameId;
    const duration = 1650; // ms (increased animation time for a luxurious lead)
    const delayMs = staggerDelay * 1000;

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic deceleration
        const ease = 1 - Math.pow(1 - progress, 3);
        setAnimatedPercent(Math.round(ease * skill.percentage));

        if (progress < 1) {
          animFrameId = requestAnimationFrame(step);
        }
      };
      animFrameId = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [shouldAnimate, skill.percentage, staggerDelay]);

  return (
    <div 
      ref={cardRef} 
      className={`hard-skill-card ${shouldAnimate ? 'is-animated' : ''}`}
      style={{
        transitionDelay: `${staggerDelay}s`
      }}
    >
      {/* Top Header: Logo + Skill Name + Animated Percentage Counter */}
      <div className="hard-skill-top">
        <div className="hard-skill-identity">
          <div className="hard-skill-icon" style={{ color: skill.iconColor }}>
            {skill.svg}
          </div>
          <span className="hard-skill-name">{skill.name}</span>
        </div>
        <span className="hard-skill-percent">{animatedPercent}%</span>
      </div>

      {/* Slider Progress Bar Track with Circle Node Handle (Leads 0% -> Target%) */}
      <div className="slider-progress-track">
        <div 
          className="slider-progress-fill" 
          style={{ 
            width: `${shouldAnimate ? skill.percentage : 0}%`, 
            backgroundColor: skill.iconColor,
            color: skill.iconColor,
            transition: shouldAnimate 
              ? `width 1.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}s` 
              : 'none'
          }}
        />
        <div 
          className="slider-node-handle" 
          style={{ 
            left: `${shouldAnimate ? skill.percentage : 0}%`, 
            borderColor: skill.iconColor,
            color: skill.iconColor,
            transition: shouldAnimate 
              ? `left 1.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}s` 
              : 'none'
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. Soft Skill Item Component (Independent Observer on Mobile, Stagger on Desktop)
// ---------------------------------------------------------------------------
function SoftSkillItem({ skill, index, isCentrallyVisible, isTabActive, isMobile }) {
  const itemRef = useRef(null);
  const [isSelfVisible, setIsSelfVisible] = useState(false);

  // On mobile: each soft skill item observes itself independently when active
  useEffect(() => {
    if (!isTabActive) {
      setIsSelfVisible(false);
      return;
    }
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSelfVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -20% 0px'
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, isTabActive]);

  // On mobile: animates independently when self is centrally visible
  // On desktop: animates when soft skills grid is centrally visible
  const shouldAnimate = isTabActive && (isMobile ? isSelfVisible : isCentrallyVisible);
  // On desktop: sequential cascade. On mobile: independent entrance
  const staggerDelay = isMobile ? ((index % 2) * 0.08) : (index * 0.11);

  return (
    <div 
      ref={itemRef}
      className={`soft-skill-item ${shouldAnimate ? 'is-animated' : ''}`}
      style={{
        transitionDelay: `${staggerDelay}s`,
        '--stagger-delay': `${staggerDelay}s`
      }}
    >
      <span className="soft-skill-num">{skill.number}.</span>
      <span className="soft-skill-title">{skill.title}</span>
      <div className="soft-skill-line" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Main Skills Component
// ---------------------------------------------------------------------------
export default function Skills() {
  const [activeTab, setActiveTab] = useState('soft'); // 'soft' or 'hard'
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSoftSkillsCentrallyVisible, setIsSoftSkillsCentrallyVisible] = useState(false);
  const [isHardSkillsCentrallyVisible, setIsHardSkillsCentrallyVisible] = useState(false);
  const [isHardHeaderVisible, setIsHardHeaderVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const softSkillsRef = useRef(null);
  const hardSkillsRef = useRef(null);
  const hardHeaderRef = useRef(null);

  // Detect mobile viewport (<= 900px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Header Observer: triggers when header enters central viewport
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

  // 2. Soft Skills Observer: triggers stagger animation ONLY when soft skills elements are centrally in viewport
  useEffect(() => {
    if (activeTab !== 'soft') {
      setIsSoftSkillsCentrallyVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSoftSkillsCentrallyVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-10% 0px -25% 0px'
      }
    );

    if (softSkillsRef.current) {
      observer.observe(softSkillsRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab]);

  // 3. Hard Skills Grid Observer: triggers desktop stagger when hard skills are centrally in viewport
  useEffect(() => {
    if (activeTab !== 'hard') {
      setIsHardSkillsCentrallyVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHardSkillsCentrallyVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-10% 0px -25% 0px'
      }
    );

    if (hardSkillsRef.current) {
      observer.observe(hardSkillsRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab]);

  // 4. Hard Skills Header Info Observer
  useEffect(() => {
    if (activeTab !== 'hard') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHardHeaderVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '-10% 0px -20% 0px'
      }
    );

    if (hardHeaderRef.current) {
      observer.observe(hardHeaderRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab]);

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
      id: 'flutter',
      name: 'Flutter',
      percentage: 75,
      iconColor: '#54c5f8',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.372z"/>
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
      id: 'django',
      name: 'Django',
      percentage: 75,
      iconColor: '#44b78b',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.146 0h3.333v16.146c-1.396.27-2.604.354-3.625.354-3.417 0-4.917-1.417-4.917-4.271 0-3.083 1.833-4.875 4.792-4.875.188 0 .417 0 .417.021V0zm0 10.021c-.23-.021-.438-.021-.646-.021-1.375 0-2.062.812-2.062 2.271 0 1.417.625 2.146 1.896 2.146.27 0 .541-.021.812-.062V10.02zm8.333 7.354c-.958.23-1.688.333-2.625.333-2.146 0-3.146-.917-3.146-2.875V7.479h2.375V14.5c0 .667.312 1.021.979 1.021.25 0 .5-.021.771-.062v1.916h1.646v-10h-2.375v.021h2.375v9.999zM16.854 2.875a1.562 1.562 0 1 1 3.125 0 1.562 1.562 0 0 1-3.125 0z"/>
        </svg>
      )
    },
    {
      id: 'postgres',
      name: 'PostgreSQL',
      percentage: 80,
      iconColor: '#336791',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.905 0C8.595 0 5.438 1.63 3.655 4.39A11.758 11.758 0 0 0 1.5 11.737c0 4.148 2.17 7.973 5.702 10.093l.317.19.145-.341c.214-.5.485-1.135.792-1.782-.693-.5-1.306-1.125-1.808-1.848-.902-1.298-1.385-2.852-1.385-4.453 0-1.802.605-3.52 1.735-4.914 1.13-1.393 2.688-2.317 4.453-2.642.345-.063.69-.095 1.036-.095 2.11 0 4.108.766 5.66 2.175 1.55 1.408 2.454 3.328 2.552 5.424.045.96-.08 1.918-.37 2.825-.33 1.032-.89 1.96-1.633 2.705a7.356 7.356 0 0 1-2.43 1.575c-.328.13-.67.228-1.018.293l-.36.068.14.338c.376.905.81 1.77 1.298 2.58l.19.317 2.13-.578c3.27-1.895 5.285-5.38 5.285-9.155 0-2.482-.876-4.908-2.47-6.848C17.65 1.784 14.862 0 11.905 0z"/>
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
      className={`skills-section ${isHeaderVisible ? 'in-view' : ''}`} 
      id="skills" 
      ref={containerRef}
    >
      <div className="skills-container">
        {/* Header & Mode Switcher Tabs (Soft vs Hard Skills) */}
        <div 
          ref={headerRef} 
          className={`skills-header-row ${isHeaderVisible ? 'is-animated' : ''}`}
        >
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
          {/* 1. SOFT SKILLS VIEW (Numbered 2-column grid matching Image 3 with Staggered Elements) */}
          <div className={`soft-skills-view ${activeTab === 'soft' ? 'active-view' : 'hidden-view'}`}>
            <div 
              ref={softSkillsRef} 
              className="soft-skills-grid"
            >
              {softSkills.map((skill, index) => (
                <SoftSkillItem
                  key={skill.number}
                  skill={skill}
                  index={index}
                  isCentrallyVisible={isSoftSkillsCentrallyVisible}
                  isTabActive={activeTab === 'soft'}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          {/* 2. HARD SKILLS VIEW (Bottom-Right Slide-In covering section, matching Image 1 logos & Image 2 slider lines) */}
          <div className={`hard-skills-view ${activeTab === 'hard' ? 'slide-in-covering' : 'slide-out'}`}>
            <div 
              ref={hardHeaderRef} 
              className={`hard-skills-header-info ${isHardHeaderVisible ? 'is-animated' : ''}`}
            >
              <h3 className="hard-skills-subtitle">Technical Proficiency</h3>
              <p className="hard-skills-desc">
                Core technologies, frontend &amp; mobile frameworks, backend systems, relational databases, and cloud deployment pipelines.
              </p>
            </div>

            <div 
              ref={hardSkillsRef} 
              className="hard-skills-grid"
            >
              {hardSkills.map((skill, index) => (
                <HardSkillCard
                  key={skill.id}
                  skill={skill}
                  index={index}
                  isCentrallyVisible={isHardSkillsCentrallyVisible}
                  isTabActive={activeTab === 'hard'}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

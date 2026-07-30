import React from 'react';
import profileImg from '../assets/porfolio image.png';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        {/* Left Content Column */}
        <div className="hero-content">
          {/* Tagline / H1 Badge */}
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <h1 className="hero-badge-title">FULL STACK DEVELOPER</h1>
          </div>

          {/* Headline */}
          <div className="headline-wrapper">
            <h1 className="hero-title">
              I BUILD <span className="text-highlight">SYSTEMS</span> THAT SCALE.
            </h1>
          </div>

          {/* Intro Paragraph */}
          <div className="intro-wrapper">
            <p className="hero-description">
              Hi, I'm <strong className="developer-name">Nchonganyi Ernesto</strong>. A Full Stack Developer dedicated to engineering high-availability cloud platforms, resilient backend infrastructure, and intuitive user experiences built to empower communities across Africa and globally.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn-primary-glow">
              <span>Explore My Systems</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a href="#contact" className="btn-secondary-glass">
              <span>Contact Me</span>
            </a>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">99.9%</span>
              <span className="metric-label">Uptime Reliability</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">Full-Stack</span>
              <span className="metric-label">Frontend & Cloud Ops</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">Africa</span>
              <span className="metric-label">Global Tech Node</span>
            </div>
          </div>
        </div>

        {/* Right Visual Column (Profile & Ring) */}
        <div className="hero-visual">
          <div className="profile-frame-container">
            {/* Outer Spinning Ring */}
            <div className="animated-ring ring-outer"></div>
            {/* Secondary Dashed Pulse Ring */}
            <div className="animated-ring ring-dashed"></div>

            {/* Profile Image Wrapper */}
            <div className="profile-img-wrapper">
              <img
                src={profileImg}
                alt="Nchonganyi Ernesto - Full Stack Developer"
                className="profile-img"
              />
              <div className="profile-overlay-glow"></div>
            </div>

            {/* Floating Badges */}
            <div className="floating-badge badge-top-left">
              <span className="badge-icon">⚡</span>
              <span>Cloud & System Architecture</span>
            </div>

            <div className="floating-badge badge-bottom-right">
              <span className="badge-status-dot"></span>
              <span>Available for Hire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

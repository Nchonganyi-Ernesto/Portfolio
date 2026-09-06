import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Open mailto link as reliable default fallback
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service || 'New Project'} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service || 'Not specified'}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:nchonganyiernesto27@gmail.com?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });
    }, 4000);
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      className={`contact-section ${isInView ? 'in-view' : ''}`} 
      id="contact"
    >
      {/* Background Image Layer from public/BG IMAGE.png */}
      <div 
        className="contact-bg-layer" 
        style={{ backgroundImage: `url('/BG IMAGE.png')` }}
        aria-hidden="true"
      />

      <div className="contact-container" ref={containerRef}>
        {/* Top Status Tag (Matching Navbar borderless code bracket format) */}
        <div className="contact-code-tag">
          <span className="code-bracket">&lt;/</span>
          <span className="status-text">Available for New Project</span>
          <span className="code-bracket">&gt;</span>
        </div>

        {/* Headline */}
        <h2 className="contact-headline">HAVE A PROJECT IN MIND?</h2>

        {/* Value Proposition Description */}
        <p className="contact-subtext">
          Together, we can create something clear and impactful. Let's collaborate to bring our
          ideas to life in a way that resonates with everyone.
        </p>

        {/* Primary Action Button */}
        <div className="contact-cta-wrapper">
          <button className="contact-cta-btn" onClick={scrollToForm}>
            <span>Contact Me</span>
            <svg 
              width="15" 
              height="15" 
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
          </button>
        </div>

        {/* 2-Column Split Layout: Left Glassmorphism Social Card | Right Form */}
        <div className="contact-split-grid">
          {/* LEFT: Glassmorphism Socials & Contact Card */}
          <div className="contact-glass-card">
            <div className="glass-card-header">
              <div className="glass-avatar-wrapper">
                <img 
                  src="/heroimage.png" 
                  alt="Nchonganyi Ernesto" 
                  className="glass-avatar-img"
                />
              </div>
              <div className="glass-user-info">
                <h3 className="glass-user-name">Nchonganyi Ernesto</h3>
                <p className="glass-user-role">Frontend & UI/UX Developer</p>
              </div>
            </div>

            <p className="glass-bio-text">
              Looking for a dedicated developer to craft modern web apps, fluid animations, or sleek interfaces? Let's connect directly:
            </p>

            {/* Social & Contact Direct Links */}
            <div className="glass-social-list">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/nchonganyi-ernesto-5a3549369/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-social-item"
              >
                <div className="social-item-left">
                  <div className="social-item-icon linkedin-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                    </svg>
                  </div>
                  <div className="social-item-text">
                    <span className="social-label">LinkedIn</span>
                    <span className="social-handle">nchonganyi-ernesto</span>
                  </div>
                </div>
                <span className="social-item-arrow">↗</span>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Nchonganyi-Ernesto/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-social-item"
              >
                <div className="social-item-left">
                  <div className="social-item-icon github-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </div>
                  <div className="social-item-text">
                    <span className="social-label">GitHub</span>
                    <span className="social-handle">Nchonganyi-Ernesto</span>
                  </div>
                </div>
                <span className="social-item-arrow">↗</span>
              </a>

              {/* Email */}
              <a 
                href="mailto:nchonganyiernesto27@gmail.com" 
                className="glass-social-item"
              >
                <div className="social-item-left">
                  <div className="social-item-icon mail-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div className="social-item-text">
                    <span className="social-label">Email</span>
                    <span className="social-handle">nchonganyiernesto27@gmail.com</span>
                  </div>
                </div>
                <span className="social-item-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Input Form Section */}
          <div className="contact-form-column">
            <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
              {/* Your Name */}
              <div className={`floating-group ${formData.name ? 'has-value' : ''}`}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  className="floating-input"
                  autoComplete="name"
                />
                <label htmlFor="name" className="floating-label">Your Name</label>
              </div>

              {/* Email */}
              <div className={`floating-group ${formData.email ? 'has-value' : ''}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  className="floating-input"
                  autoComplete="email"
                />
                <label htmlFor="email" className="floating-label">Email</label>
              </div>

              {/* Service */}
              <div className={`floating-group ${formData.service ? 'has-value' : ''}`}>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="floating-select"
                >
                  <option value="" disabled hidden></option>
                  <option value="Web Design & Dev">Web Design & Development</option>
                  <option value="Motions & Animations">Motions & Interactive Animations</option>
                  <option value="Deployment & Cloud Management">Deployment & Cloud Management</option>
                  <option value="Branding & UI/UX">Branding & UI/UX Design System</option>
                  <option value="Other Project">Other / General Consultation</option>
                </select>
                <label htmlFor="service" className="floating-label">Service</label>
                <div className="select-arrow-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              {/* Project Detail */}
              <div className={`floating-group ${formData.message ? 'has-value' : ''}`}>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  className="floating-textarea"
                ></textarea>
                <label htmlFor="message" className="floating-label">Project Detail</label>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="form-submit-btn">
                  <span>{isSubmitted ? 'Message Sent!' : 'Send Message'}</span>
                  <svg 
                    width="16" 
                    height="16" 
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
                </button>
                {isSubmitted && (
                  <span className="submit-success-msg">Opening your email client...</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

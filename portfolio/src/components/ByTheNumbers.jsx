import React, { useEffect, useRef, useState } from 'react';
import './ByTheNumbers.css';

// Animated number counter with ease-out interpolation
function AnimatedCounter({ target, suffix = '', displayFormat, start, duration = 1600 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp = null;
    let animId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic easing
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [start, target, duration]);

  if (!start) {
    return <span>0{suffix}</span>;
  }

  if (displayFormat && count >= target) {
    return <span>{displayFormat}</span>;
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function ByTheNumbers() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Stats aligned with user specifications & portfolio background
  const stats = [
    {
      value: 5,
      suffix: '+',
      label: 'Clients served'
    },
    {
      value: 1,
      suffix: 'K+',
      displayFormat: '1K+',
      label: 'Users reached'
    },
    {
      value: 3,
      suffix: '+ yrs',
      label: 'Engineering experience'
    },
    {
      value: 100,
      suffix: '%',
      label: 'Hands-on involvement'
    }
  ];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`numbers-section ${isInView ? 'in-view' : ''}`}
      id="by-the-numbers"
      aria-label="By the numbers stats"
    >
      <div className="numbers-container">
        {/* Header Block matching the editorial aesthetic */}
        <div className="numbers-header-group">
          <div className="numbers-title-col">
            {/* Top Dot Indicator */}
            <div className="numbers-dot" aria-hidden="true" />
            
            {/* Category Eyebrow */}
            <span className="numbers-eyebrow">BY THE NUMBERS</span>
            
            {/* Large Editorial Serif Heading */}
            <h2 className="numbers-heading">
              <span>Years of craft,</span>
              <span>distilled into one portfolio.</span>
            </h2>
          </div>

          {/* Right Context Note */}
          <div className="numbers-note-col">
            <p className="numbers-note-text">
              Each number is real. Aggregated across every engagement since 2023.
            </p>
          </div>
        </div>

        {/* Black Floating Stats Container with 4 Dividers */}
        <div className="numbers-card-row">
          {stats.map((stat, idx) => (
            <div key={idx} className="number-stat-item">
              <div className="number-stat-val">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  displayFormat={stat.displayFormat}
                  start={isInView}
                  duration={1600 + idx * 150}
                />
              </div>
              <div className="number-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

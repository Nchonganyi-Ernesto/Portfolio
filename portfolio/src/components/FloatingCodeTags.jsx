import React from 'react';
import './FloatingCodeTags.css';

export default function FloatingCodeTags() {
  const tags = [
    { text: '<h1>', top: '15%', left: '4%', delay: '0s', duration: '12s' },
    { text: '<p>', top: '35%', left: '8%', delay: '2s', duration: '14s' },
    { text: '<div class="scale">', top: '65%', left: '3%', delay: '1s', duration: '16s' },
    { text: 'const system = "scalable";', top: '80%', left: '12%', delay: '3s', duration: '18s' },
    { text: '<section>', top: '20%', right: '5%', delay: '1.5s', duration: '13s' },
    { text: '</span>', top: '50%', right: '8%', delay: '0.5s', duration: '15s' },
    { text: 'await deploySystem();', top: '75%', right: '4%', delay: '2.5s', duration: '17s' },
    { text: '</code >', top: '88%', right: '15%', delay: '4s', duration: '14s' }
  ];

  return (
    <div className="floating-code-container" aria-hidden="true">
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="code-tag-badge"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            animationDelay: tag.delay,
            animationDuration: tag.duration
          }}
        >
          <span className="code-tag-symbol">&lt;/&gt;</span>
          {tag.text}
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useRef } from 'react';

export default function WorldMapBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDots();
    };

    window.addEventListener('resize', handleResize);

    // Approximate landmass dot density map
    // We will generate dots based on continent shapes, emphasizing Africa
    const dots = [];
    const africaPulses = [];
    const arcs = [];

    // Main hub coordinates (normalized 0..1 x, y)
    // Focused hubs in Africa:
    const africaHubs = [
      { x: 0.52, y: 0.52, label: 'Central Africa' },
      { x: 0.48, y: 0.48, label: 'West Africa' },
      { x: 0.55, y: 0.58, label: 'East Africa' },
      { x: 0.52, y: 0.68, label: 'Southern Africa' }
    ];

    // Global destination hubs
    const globalHubs = [
      { x: 0.25, y: 0.38, label: 'North America' },
      { x: 0.49, y: 0.30, label: 'Europe' },
      { x: 0.78, y: 0.42, label: 'Asia' },
      { x: 0.85, y: 0.70, label: 'Australia' },
      { x: 0.32, y: 0.68, label: 'South America' }
    ];

    function isLand(x, y) {
      // x: 0..1 (west to east), y: 0..1 (north to south)
      // North America
      if (x > 0.12 && x < 0.32 && y > 0.20 && y < 0.45) return true;
      // South America
      if (x > 0.28 && x < 0.38 && y > 0.52 && y < 0.82) return true;
      // Europe
      if (x > 0.44 && x < 0.58 && y > 0.18 && y < 0.35) return true;
      // Africa (Higher density)
      if (x > 0.44 && x < 0.60 && y > 0.36 && y < 0.75) return true;
      // Asia
      if (x > 0.58 && x < 0.88 && y > 0.18 && y < 0.52) return true;
      // Australia
      if (x > 0.78 && x < 0.90 && y > 0.62 && y < 0.82) return true;
      return false;
    }

    function isAfrica(x, y) {
      return x > 0.44 && x < 0.60 && y > 0.36 && y < 0.75;
    }

    function initDots() {
      dots.length = 0;
      const step = Math.max(16, Math.floor(width / 70));

      for (let px = 0; px < width; px += step) {
        for (let py = 0; py < height; py += step) {
          const nx = px / width;
          const ny = py / height;
          if (isLand(nx, ny)) {
            const inAfrica = isAfrica(nx, ny);
            dots.push({
              x: px,
              y: py,
              nx,
              ny,
              inAfrica,
              radius: inAfrica ? 1.8 : 1.2,
              baseAlpha: inAfrica ? 0.45 : 0.15,
              pulseOffset: Math.random() * Math.PI * 2
            });
          }
        }
      }

      // Create pulse waves over Africa
      africaPulses.length = 0;
      africaHubs.forEach(hub => {
        africaPulses.push({
          x: hub.x * width,
          y: hub.y * height,
          radius: 0,
          maxRadius: Math.min(width, height) * 0.18,
          speed: 0.6 + Math.random() * 0.4,
          opacity: 1
        });
      });

      // Create glowing connection arcs between Africa & Global hubs
      arcs.length = 0;
      africaHubs.forEach(from => {
        globalHubs.forEach(to => {
          if (Math.random() > 0.4) {
            arcs.push({
              fromX: from.x * width,
              fromY: from.y * height,
              toX: to.x * width,
              toY: to.y * height,
              progress: Math.random(),
              speed: 0.003 + Math.random() * 0.004
            });
          }
        });
      });
    }

    initDots();

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw background ambient dark gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.52, height * 0.55, 50,
        width * 0.52, height * 0.55, Math.max(width, height) * 0.6
      );
      bgGrad.addColorStop(0, 'rgba(0, 230, 82, 0.06)');
      bgGrad.addColorStop(0.5, 'rgba(11, 13, 14, 0.95)');
      bgGrad.addColorStop(1, '#0b0d0e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw dot matrix map
      dots.forEach(dot => {
        const pulse = Math.sin(time * 1.5 + dot.pulseOffset) * 0.2 + 0.8;
        const alpha = dot.baseAlpha * pulse;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

        if (dot.inAfrica) {
          ctx.fillStyle = `rgba(0, 230, 82, ${alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(0, 230, 82, 0.6)';
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Draw Connection Arcs emitting from Africa
      arcs.forEach(arc => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;

        const cpX = (arc.fromX + arc.toX) / 2;
        const cpY = Math.min(arc.fromY, arc.toY) - 50;

        // Curve path
        ctx.beginPath();
        ctx.moveTo(arc.fromX, arc.fromY);
        ctx.quadraticCurveTo(cpX, cpY, arc.toX, arc.toY);
        ctx.strokeStyle = 'rgba(0, 230, 82, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling pulse point
        const t = arc.progress;
        const currX = (1 - t) * (1 - t) * arc.fromX + 2 * (1 - t) * t * cpX + t * t * arc.toX;
        const currY = (1 - t) * (1 - t) * arc.fromY + 2 * (1 - t) * t * cpY + t * t * arc.toY;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00e652';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00e652';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Radar Pulses on Africa hubs
      africaPulses.forEach(p => {
        p.radius += p.speed;
        p.opacity = 1 - p.radius / p.maxRadius;

        if (p.radius >= p.maxRadius) {
          p.radius = 0;
          p.opacity = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 230, 82, ${p.opacity * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Core Hub Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00e652';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00e652';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
}

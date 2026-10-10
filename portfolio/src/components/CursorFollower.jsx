import React, { useEffect, useRef } from 'react';
import './CursorFollower.css';

export default function CursorFollower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices with coarse pointer
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (target and lerped current)
    const mouse = {
      targetX: -100,
      targetY: -100,
      x: -100,
      y: -100,
      prevX: -100,
      prevY: -100,
      speed: 0,
      angle: 0
    };

    let isVisible = false;
    let isHovering = false;
    let isMouseDown = false;
    let currentRadius = 16;
    let targetRadius = 16;

    // Trail particles & click ripples
    const particles = [];
    const ripples = [];
    let animationFrameId;

    // Helper: Draw geometric spark / diamond figure
    const drawDiamondFigure = (context, x, y, size, rotation, alpha) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.moveTo(0, -size);
      context.lineTo(size * 0.65, 0);
      context.lineTo(0, size);
      context.lineTo(-size * 0.65, 0);
      context.closePath();
      context.fillStyle = `rgba(15, 23, 42, ${alpha})`;
      context.fill();
      context.restore();
    };

    const handleMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Check if hovering over clickable / interactive elements
      const target = e.target;
      const interactive = target && target.closest && target.closest(
        'a, button, input, textarea, select, [role="button"], .project-card, .social-pill, .service-card, .filter-chip, .talk-btn, .hamburger-btn, .mobile-nav-link, .nav-link'
      );
      isHovering = !!interactive;
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      if (isVisible) {
        ripples.push({
          x: mouse.targetX,
          y: mouse.targetY,
          radius: 10,
          maxRadius: 40,
          alpha: 0.5
        });
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = (e) => {
      isVisible = true;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastTime = performance.now();

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      if (!isVisible) {
        // Fade out any remaining particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.alpha -= 0.03;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
          } else {
            drawDiamondFigure(ctx, p.x, p.y, p.size, p.rotation, p.alpha);
          }
        }
        return;
      }

      // Physics interpolation (lerp)
      const lerpFactor = 0.16;
      mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

      // Speed & movement angle
      const dx = mouse.targetX - mouse.prevX;
      const dy = mouse.targetY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      if (mouse.speed > 0.5) {
        mouse.angle = Math.atan2(dy, dx);
      }
      mouse.prevX = mouse.targetX;
      mouse.prevY = mouse.targetY;

      // Spawn movement trail figures (spark diamonds) when cursor moves
      if (mouse.speed > 2.5) {
        const count = Math.min(Math.floor(mouse.speed / 8) + 1, 3);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: mouse.x + (Math.random() - 0.5) * 8,
            y: mouse.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5 - Math.cos(mouse.angle) * 0.8,
            vy: (Math.random() - 0.5) * 1.5 - Math.sin(mouse.angle) * 0.8,
            size: Math.random() * 3.5 + 2.5,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.1,
            alpha: Math.random() * 0.35 + 0.35,
            decay: Math.random() * 0.02 + 0.015
          });
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;
        p.size = Math.max(0, p.size - 0.04);

        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
        } else {
          drawDiamondFigure(ctx, p.x, p.y, p.size, p.rotation, p.alpha);
        }
      }

      // Update and draw click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.18;
        r.alpha -= 0.025;
        if (r.alpha <= 0) {
          ripples.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(15, 23, 42, ${r.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Determine target ring radius based on state
      if (isMouseDown) {
        targetRadius = 12;
      } else if (isHovering) {
        targetRadius = 26;
      } else {
        targetRadius = 16;
      }
      currentRadius += (targetRadius - currentRadius) * 0.2;

      // Draw Main Follower Figure (Elastic stretch ellipse with rotational orientation)
      const stretch = Math.min(mouse.speed * 0.03, 0.45);
      const rx = currentRadius * (1 + stretch);
      const ry = currentRadius * (1 - stretch * 0.45);

      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      ctx.rotate(mouse.angle);

      // Trailing aura ring
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(rx, 4), Math.max(ry, 4), 0, 0, Math.PI * 2);
      ctx.strokeStyle = isHovering
        ? 'rgba(15, 23, 42, 0.65)'
        : 'rgba(15, 23, 42, 0.3)';
      ctx.lineWidth = isHovering ? 2 : 1.4;
      ctx.stroke();

      if (isHovering) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fill();
      }

      ctx.restore();

      // Draw Center Lead Dot (tracks target position directly)
      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.targetX, mouse.targetY, isHovering ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.restore();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />;
}

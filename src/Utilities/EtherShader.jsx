import React, { useEffect, useRef } from 'react';

export default function EtherShader({ mousePos }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Orbital plasma nodes bound around the cursor radius
    const particleCount = 20;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (i / particleCount) * Math.PI * 2,
        dist: Math.random() * 140 + 30, // Distance from mouse center
        orbitSpeed: (Math.random() - 0.5) * 0.025,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        baseRadius: Math.random() * 60 + 30,
      });
    }

    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;

    const render = () => {
      // Smooth lerp mouse tracking
      targetMouseX = (mousePos.x + 0.5) * width;
      targetMouseY = (mousePos.y + 0.5) * height;

      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      // Dark background void
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      const spotlightRadius = 320;

      // Draw grid lines illuminated strictly around the mouse position
      const gridSize = 45;
      const startX = Math.floor((currentMouseX - spotlightRadius) / gridSize) * gridSize;
      const endX = Math.ceil((currentMouseX + spotlightRadius) / gridSize) * gridSize;
      const startY = Math.floor((currentMouseY - spotlightRadius) / gridSize) * gridSize;
      const endY = Math.ceil((currentMouseY + spotlightRadius) / gridSize) * gridSize;

      for (let x = startX; x <= endX; x += gridSize) {
        if (x < 0 || x > width) continue;
        for (let y = startY; y <= endY; y += gridSize) {
          if (y < 0 || y > height) continue;
          const dx = x - currentMouseX;
          const dy = y - currentMouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < spotlightRadius * spotlightRadius) {
            const alpha = Math.pow(1 - Math.sqrt(distSq) / spotlightRadius, 2) * 0.12;
            ctx.fillStyle = `rgba(212, 255, 0, ${alpha})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }

      // Draw Main Liquid Plasma Core Glow around Mouse Cursor
      const mouseGlow = ctx.createRadialGradient(
        currentMouseX,
        currentMouseY,
        0,
        currentMouseX,
        currentMouseY,
        spotlightRadius
      );
      mouseGlow.addColorStop(0, 'rgba(212, 255, 0, 0.22)');
      mouseGlow.addColorStop(0.35, 'rgba(212, 255, 0, 0.08)');
      mouseGlow.addColorStop(0.7, 'rgba(160, 220, 0, 0.02)');
      mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(currentMouseX, currentMouseY, spotlightRadius, 0, Math.PI * 2);
      ctx.fill();

      // Render swirling organic plasma blobs localized around cursor
      particles.forEach((p) => {
        p.angle += p.orbitSpeed;
        p.phase += p.pulseSpeed;

        const pulseDist = p.dist + Math.sin(p.phase) * 20;
        const px = currentMouseX + Math.cos(p.angle) * pulseDist;
        const py = currentMouseY + Math.sin(p.angle) * pulseDist;

        const pulseRadius = p.baseRadius + Math.sin(p.phase * 1.5) * 15;

        const nodeGrad = ctx.createRadialGradient(px, py, 0, px, py, pulseRadius);
        nodeGrad.addColorStop(0, 'rgba(212, 255, 0, 0.12)');
        nodeGrad.addColorStop(0.5, 'rgba(212, 255, 0, 0.04)');
        nodeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

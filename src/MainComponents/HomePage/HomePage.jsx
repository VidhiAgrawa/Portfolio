import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../Utilities/Navbar';
import FloatingCard from '../../Utilities/FloatingCard';
import CodeChip from '../../Utilities/CodeChip';
import SplashCursor from '../../Utilities/SplashCursor';
import { Eye, Code2, Sparkles, Briefcase, Cpu, Sparkles as SparklesIcon, Zap } from 'lucide-react';

export default function HomePage() {
  const containerRef = useRef(null);
  const foregroundRef = useRef(null);
  const backgroundRef = useRef(null);

  // Responsive mobile screen check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Splash mode: 'light' (Default) vs 'heavy'
  const [splashMode, setSplashMode] = useState('light');

  // Mouse Parallax tracking
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = e.clientX / innerWidth - 0.5;
      mouseRef.current.targetY = e.clientY / innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const updateParallax = () => {
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.08;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.08;

      const currX = mouseRef.current.currentX;
      const currY = mouseRef.current.currentY;

      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translate3d(${(currX * 24).toFixed(2)}px, ${(currY * 24).toFixed(2)}px, 0px)`;
      }

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate3d(${(currX * -36).toFixed(2)}px, ${(currY * -36).toFixed(2)}px, 0px)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Z-index layer state
  const [zIndices, setZIndices] = useState({
    SIPVision: 20,
    chipAbsolute: 12,
    ReactCard: 22,
    chipThree: 13,
    NextCard: 23,
    badgeDelta: 11,
    Abreonix: 24,
    AIManager: 25,
    chipOpacity: 14,
    fragGlow: 15,
    fragClamp: 16,
    fragHex: 17,
    fragCanvas: 18,
    fragFn: 19,
    fragXYZ: 21,
  });

  const [maxZIndex, setMaxZIndex] = useState(30);

  const bringToFront = (id) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setZIndices((prev) => ({ ...prev, [id]: nextZ }));
  };

  // Splash Cursor props
  const lightSplashProps = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1440,
    DENSITY_DISSIPATION: 4.5,
    VELOCITY_DISSIPATION: 2.5,
    PRESSURE: 0.1,
    CURL: 2,
    SPLAT_RADIUS: 0.12,
    SPLAT_FORCE: 1800,
    COLOR_UPDATE_SPEED: 10,
    USE_NEON_THEME: true,
    NEON_INTENSITY: 0.45,
  };

  const heavySplashProps = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1440,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2,
    PRESSURE: 0.1,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    COLOR_UPDATE_SPEED: 10,
    USE_NEON_THEME: false,
  };

  const activeSplashProps = splashMode === 'light' ? lightSplashProps : heavySplashProps;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#050507] text-white selection:bg-[#D4FF00] selection:text-black flex flex-col justify-between"
    >
      {/* React Bits WebGL Splash Cursor Component (Disabled on Mobile) */}
      {!isMobile && <SplashCursor {...activeSplashProps} />}

      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with Mobile Responsive Brutalist Parallax Typography */}
      <main className="relative flex-1 flex items-center justify-center pointer-events-none select-none px-4 sm:px-8 z-10">
        {/* Ghosted Outlined Layer Behind (Desktop Only) */}
        <div
          ref={backgroundRef}
          className="hidden md:flex absolute inset-0 flex-col items-center justify-center font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-[115px] xl:text-[135px] leading-[0.88] tracking-tight uppercase opacity-40 text-stroke-neon gpu-accelerated"
        >
          <div>VIDHI</div>
          <div>AGRAWAL</div>
          <div>MODERN</div>
          <div>FRONTEND</div>
        </div>

        {/* Foreground Solid Neon Typography Layer */}
        <div
          ref={foregroundRef}
          className="relative z-5 flex flex-col items-center justify-center font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-[115px] xl:text-[135px] leading-[0.88] tracking-tight uppercase text-[#D4FF00] md:drop-shadow-[0_0_35px_rgba(212,255,0,0.25)] drop-shadow-none gpu-accelerated"
        >
          <div>VIDHI</div>
          <div>AGRAWAL</div>
          <div>MODERN</div>
          <div>FRONTEND</div>
        </div>
      </main>

      {/* FULL-SCREEN DRAGGABLE PLAYGROUND LAYER (Mobile Optimized Positions) */}
      <div className="absolute inset-0 pointer-events-auto z-20 overflow-hidden">
        {/* Card 1: SIPVision */}
        <FloatingCard
          id="SIPVision"
          title="SIPVision"
          subtitle="PROJECT"
          icon={Eye}
          initialPos={isMobile ? { top: '15%', left: '5%' } : { top: '14%', left: '6.5%' }}
          zIndex={zIndices.SIPVision}
          onBringToFront={bringToFront}
        />

        {/* Chip 2: <div className="absolute"/> */}
        <CodeChip
          id="chipAbsolute"
          code='<div className="absolute"/>'
          initialPos={isMobile ? { top: '10%', left: '48%' } : { top: '9%', left: '42%' }}
          zIndex={zIndices.chipAbsolute}
          onBringToFront={bringToFront}
        />

        {/* Card 3: React */}
        <FloatingCard
          id="ReactCard"
          title="React"
          icon={Code2}
          initialPos={isMobile ? { top: '18%', left: '56%' } : { top: '14.5%', left: '65.5%' }}
          zIndex={zIndices.ReactCard}
          onBringToFront={bringToFront}
        />

        {/* Chip 4: import * as THREE */}
        <CodeChip
          id="chipThree"
          code="import * as THREE"
          initialPos={isMobile ? { top: '34%', left: '4%' } : { top: '30.5%', left: '8.5%' }}
          zIndex={zIndices.chipThree}
          onBringToFront={bringToFront}
        />

        {/* Card 5: Next.js */}
        <FloatingCard
          id="NextCard"
          title="Next.js"
          icon={Sparkles}
          initialPos={isMobile ? { top: '72%', left: '54%' } : { top: '41.5%', left: '79.5%' }}
          zIndex={zIndices.NextCard}
          onBringToFront={bringToFront}
        />

        {/* Badge 6: Δ Delta badge */}
        <CodeChip
          id="badgeDelta"
          code="Δ"
          initialPos={isMobile ? { top: '42%', left: '82%' } : { top: '49.5%', left: '92%' }}
          zIndex={zIndices.badgeDelta}
          onBringToFront={bringToFront}
        />

        {/* Card 7: Abreonix */}
        <FloatingCard
          id="Abreonix"
          title="Abreonix"
          subtitle="EXPERIENCE"
          icon={Briefcase}
          initialPos={isMobile ? { top: '72%', left: '5%' } : { top: '69.5%', left: '26.5%' }}
          zIndex={zIndices.Abreonix}
          onBringToFront={bringToFront}
        />

        {/* Card 8: AI Manager */}
        <FloatingCard
          id="AIManager"
          title="AI Manager"
          subtitle="PROJECT"
          icon={Cpu}
          initialPos={isMobile ? { top: '46%', left: '8%' } : { top: '61.5%', left: '75%' }}
          zIndex={zIndices.AIManager}
          onBringToFront={bringToFront}
        />

        {/* Chip 9: { opacity: 0.8 } */}
        <CodeChip
          id="chipOpacity"
          code="{ opacity: 0.8 }"
          initialPos={isMobile ? { top: '82%', left: '52%' } : { top: '78.5%', left: '61%' }}
          zIndex={zIndices.chipOpacity}
          onBringToFront={bringToFront}
        />

        {/* TECH FRAGMENTS (Hidden on small mobile screens to keep layout clean) */}
        {!isMobile && (
          <>
            <CodeChip
              id="fragGlow"
              code="vec4 glow = vec4(0.8);"
              initialPos={{ top: '22%', left: '26%' }}
              zIndex={zIndices.fragGlow}
              onBringToFront={bringToFront}
            />

            <CodeChip
              id="fragClamp"
              code="GL_CLAMP_TO_EDGE"
              initialPos={{ top: '84%', left: '12%' }}
              zIndex={zIndices.fragClamp}
              onBringToFront={bringToFront}
            />

            <CodeChip
              id="fragHex"
              code="0x7F"
              initialPos={{ top: '56%', left: '5%' }}
              zIndex={zIndices.fragHex}
              onBringToFront={bringToFront}
            />

            <CodeChip
              id="fragCanvas"
              code="<Canvas />"
              initialPos={{ top: '82%', left: '44%' }}
              zIndex={zIndices.fragCanvas}
              onBringToFront={bringToFront}
            />

            <CodeChip
              id="fragFn"
              code="fn(x, y)"
              initialPos={{ top: '38%', left: '70%' }}
              zIndex={zIndices.fragFn}
              onBringToFront={bringToFront}
            />

            <CodeChip
              id="fragXYZ"
              code="[x, y, z]"
              initialPos={{ top: '86%', left: '80%' }}
              zIndex={zIndices.fragXYZ}
              onBringToFront={bringToFront}
            />
          </>
        )}
      </div>

      {/* Footer Center Text */}
      <footer className="relative z-20 pb-6 sm:pb-8 text-center pointer-events-auto">
        <div className="inline-block font-display font-extrabold text-[10px] sm:text-xs md:text-sm tracking-[0.3em] text-[#D4FF00] uppercase hover:scale-105 transition-transform duration-200 cursor-default drop-shadow-[0_0_15px_rgba(212,255,0,0.4)]">
          DRAG EVERYTHING.
        </div>
      </footer>

      {/* Rightmost Bottom Corner Toggle Button (Desktop Only) */}
      <div className="hidden md:block fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto">
        <button
          onClick={() => setSplashMode((prev) => (prev === 'light' ? 'heavy' : 'light'))}
          className="glass-card px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#D4FF00]/50 hover:border-[#D4FF00] hover:scale-105 active:scale-95 text-[10px] sm:text-xs font-mono-code font-bold tracking-wider text-[#D4FF00] flex items-center space-x-2 sm:space-x-2.5 cursor-pointer shadow-[0_0_20px_rgba(212,255,0,0.25)] transition-all duration-200 group"
          title="Click to toggle Splash Mode"
        >
          {splashMode === 'light' ? (
            <>
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4FF00] group-hover:scale-110 transition-transform" />
              <span>LIGHT SPLASH</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span className="text-cyan-300">HEAVY SPLASH</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

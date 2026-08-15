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

  // Splash mode: 'light' (Default: Light neon lime splash) vs 'heavy' (Toggled: Full React Bits splash cursor)
  const [splashMode, setSplashMode] = useState('light');

  // Mouse Parallax tracking via useRef to avoid React state re-render overhead
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
      // Smooth linear interpolation (lerp)
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.08;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.08;

      const currX = mouseRef.current.currentX;
      const currY = mouseRef.current.currentY;

      // Direct GPU-accelerated DOM style updates (60/120 FPS buttery smooth)
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translate3d(${(currX * 28).toFixed(2)}px, ${(currY * 28).toFixed(2)}px, 0px)`;
      }

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate3d(${(currX * -42).toFixed(2)}px, ${(currY * -42).toFixed(2)}px, 0px)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Z-index layer state for bring-to-front on drag
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

  // Light subtle neon lime splash props for Default mode
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

  // Heavy full React Bits splash cursor props for Toggled mode
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
      {/* React Bits WebGL Splash Cursor Component */}
      <SplashCursor {...activeSplashProps} />

      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with Brutalist Parallax Typography */}
      <main className="relative flex-1 flex items-center justify-center pointer-events-none select-none px-4 z-10">
        {/* Ghosted Outlined Layer Behind (Ultra-smooth GPU Parallax) */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 flex flex-col items-center justify-center font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[135px] leading-[0.86] tracking-tight uppercase opacity-45 z-1 text-stroke-neon gpu-accelerated"
        >
          <div>VIDHI</div>
          <div>AGRAWAL</div>
          <div>MODERN</div>
          <div>FRONTEND</div>
        </div>

        {/* Foreground Solid Neon Typography Layer (Ultra-smooth GPU Parallax) */}
        <div
          ref={foregroundRef}
          className="relative z-5 flex flex-col items-center justify-center font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[135px] leading-[0.86] tracking-tight uppercase text-[#D4FF00] drop-shadow-[0_0_40px_rgba(212,255,0,0.2)] gpu-accelerated"
        >
          <div>VIDHI</div>
          <div>AGRAWAL</div>
          <div>MODERN</div>
          <div>FRONTEND</div>
        </div>
      </main>

      {/* FULL-SCREEN DRAGGABLE PLAYGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-auto z-20 overflow-hidden">
        {/* Card 1: SIPVision */}
        <FloatingCard
          id="SIPVision"
          title="SIPVision"
          subtitle="PROJECT"
          icon={Eye}
          initialPos={{ top: '14%', left: '6.5%' }}
          zIndex={zIndices.SIPVision}
          onBringToFront={bringToFront}
        />

        {/* Chip 2: <div className="absolute"/> */}
        <CodeChip
          id="chipAbsolute"
          code='<div className="absolute"/>'
          initialPos={{ top: '9%', left: '42%' }}
          zIndex={zIndices.chipAbsolute}
          onBringToFront={bringToFront}
        />

        {/* Card 3: React */}
        <FloatingCard
          id="ReactCard"
          title="React"
          icon={Code2}
          initialPos={{ top: '14.5%', left: '65.5%' }}
          zIndex={zIndices.ReactCard}
          onBringToFront={bringToFront}
        />

        {/* Chip 4: import * as THREE */}
        <CodeChip
          id="chipThree"
          code="import * as THREE"
          initialPos={{ top: '30.5%', left: '8.5%' }}
          zIndex={zIndices.chipThree}
          onBringToFront={bringToFront}
        />

        {/* Card 5: Next.js */}
        <FloatingCard
          id="NextCard"
          title="Next.js"
          icon={Sparkles}
          initialPos={{ top: '41.5%', left: '79.5%' }}
          zIndex={zIndices.NextCard}
          onBringToFront={bringToFront}
        />

        {/* Badge 6: Δ Delta badge */}
        <CodeChip
          id="badgeDelta"
          code="Δ"
          initialPos={{ top: '49.5%', left: '92%' }}
          zIndex={zIndices.badgeDelta}
          onBringToFront={bringToFront}
        />

        {/* Card 7: Abreonix */}
        <FloatingCard
          id="Abreonix"
          title="Abreonix"
          subtitle="EXPERIENCE"
          icon={Briefcase}
          initialPos={{ top: '69.5%', left: '26.5%' }}
          zIndex={zIndices.Abreonix}
          onBringToFront={bringToFront}
        />

        {/* Card 8: AI Manager */}
        <FloatingCard
          id="AIManager"
          title="AI Manager"
          subtitle="PROJECT"
          icon={Cpu}
          initialPos={{ top: '61.5%', left: '75%' }}
          zIndex={zIndices.AIManager}
          onBringToFront={bringToFront}
        />

        {/* Chip 9: { opacity: 0.8 } */}
        <CodeChip
          id="chipOpacity"
          code="{ opacity: 0.8 }"
          initialPos={{ top: '78.5%', left: '61%' }}
          zIndex={zIndices.chipOpacity}
          onBringToFront={bringToFront}
        />

        {/* DENSITY EXTENSIONS: TECH FRAGMENTS */}
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
      </div>

      {/* Footer Center Text */}
      <footer className="relative z-20 pb-8 text-center pointer-events-auto">
        <div className="inline-block font-display font-extrabold text-xs md:text-sm tracking-[0.35em] text-[#D4FF00] uppercase hover:scale-105 transition-transform duration-200 cursor-default drop-shadow-[0_0_15px_rgba(212,255,0,0.4)]">
          DRAG EVERYTHING.
        </div>
      </footer>

      {/* Rightmost Bottom Corner Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <button
          onClick={() => setSplashMode((prev) => (prev === 'light' ? 'heavy' : 'light'))}
          className="glass-card px-4 py-2.5 rounded-xl border border-[#D4FF00]/50 hover:border-[#D4FF00] hover:scale-105 active:scale-95 text-xs font-mono-code font-bold tracking-wider text-[#D4FF00] flex items-center space-x-2.5 cursor-pointer shadow-[0_0_20px_rgba(212,255,0,0.25)] transition-all duration-200 group"
          title="Click to toggle Splash Mode"
        >
          {splashMode === 'light' ? (
            <>
              <Zap className="w-4 h-4 text-[#D4FF00] group-hover:scale-110 transition-transform" />
              <span>LIGHT SPLASH</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span className="text-cyan-300">HEAVY SPLASH</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

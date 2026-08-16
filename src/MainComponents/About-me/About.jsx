import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const TECH_CHIPS = ['JAVASCRIPT', 'REACT.JS', 'NODE.JS', 'J2SE', 'DSA', 'MONGODB', 'EXPRESS.JS', 'HTML5 & CSS3', 'GIT & GITHUB', 'TYPESCRIPT', 'TAILWIND CSS', 'FIGMA', 'FRAMER MOTION', 'GSAP'];

const TICKER_ITEMS = [
  'GIT & GITHUB',
  'JAVASCRIPT',
  'REACT.JS',
  'NODE.JS',
  'FIGMA',
  'FRAMER MOTION',
  'HTML5 & CSS3',
  'MONGODB',
  'EXPRESS.JS',
  'TAILWIND CSS',
  'J2SE',
  'DSA',
  'TYPESCRIPT',
  'GSAP',
];

export default function About() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const rectRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // GSAP Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        '.about-back-btn',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.3 }
      )
        .fromTo(
          '.about-headline',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.35 },
          '-=0.2'
        )
        .fromTo(
          '.about-para',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3 },
          '-=0.2'
        )
        .fromTo(
          '.about-chip',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.02 },
          '-=0.2'
        )
        .fromTo(
          '.about-ticker',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3 },
          '-=0.15'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // High-performance direct DOM tracking for mouse cursor (0% React re-render overhead)
  const mousePosRef = useRef({ x: 300, y: 250, targetX: 300, targetY: 250 });

  // Preload portrait image asset instantly on component mount
  useEffect(() => {
    const img = new Image();
    img.src = '/about_portrait.jpg';
  }, []);

  // Continuous 120 FPS requestAnimationFrame lerp loop (Direct DOM style mutation)
  useEffect(() => {
    let animId;
    const updatePosition = () => {
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.18;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.18;

      if (imgRef.current) {
        imgRef.current.style.left = `${mousePosRef.current.x.toFixed(1)}px`;
        imgRef.current.style.top = `${mousePosRef.current.y.toFixed(1)}px`;
      }
      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Cache bounding box to avoid synchronous forced reflows on every mouse move
  useEffect(() => {
    const updateRect = () => {
      if (cardRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  // Zero-re-render passive mouse tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!rectRef.current) {
        if (cardRef.current) rectRef.current = cardRef.current.getBoundingClientRect();
        else return;
      }
      const rect = rectRef.current;

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        mousePosRef.current.targetX = e.clientX - rect.left;
        mousePosRef.current.targetY = e.clientY - rect.top;

        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          setIsHovered(true);
        }
      } else {
        if (isHoveredRef.current) {
          isHoveredRef.current = false;
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const duplicatedTicker = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS], []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden select-none pb-8 sm:pb-14">
      {/* Top Main Canvas Container */}
      <div
        ref={cardRef}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-6 sm:pt-10 pb-8 sm:pb-12 flex-1 flex flex-col justify-between group"
      >
        {/* Top Left Canvas Button */}
        <div className="relative z-20">
          <button
            onClick={() => navigate('/')}
            className="about-back-btn px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 border border-zinc-300 text-zinc-800 font-mono-code text-xs font-bold uppercase tracking-wider flex items-center transition-colors duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Center Layout Container */}
        <div className="relative min-h-[420px] sm:min-h-[520px] flex items-center justify-center">
          
          {/* DESKTOP GPU-ACCELERATED MOUSE-FOLLOWING PORTRAIT IMAGE */}
          <div
            ref={imgRef}
            style={{
              transform: isHovered
                ? 'translate(-50%, -50%) scale(1)'
                : 'translate(-50%, -50%) scale(0.92)',
              transition: 'opacity 0.3s ease-out',
              willChange: 'left, top, opacity',
            }}
            className={`hidden md:block absolute w-[360px] lg:w-[400px] h-[460px] lg:h-[500px] z-0 overflow-hidden shadow-2xl rounded-2xl pointer-events-none gpu-accelerated ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/about_portrait2.jpeg"
              alt="Portrait"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
            />
          </div>

          {/* Centered Block with Left-Aligned Text Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-left flex flex-col items-start px-2 sm:px-0">
            {/* Headline */}
            <h1 className="about-headline font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] mb-4 sm:mb-6 text-left">
              <span className="block md:text-gray-950 lg:text-gray-100">FRONTEND</span>
              <span
                className="block"
                style={{
                  WebkitTextStroke: '1.5px rgb(226 221 221 / 60%)',
                  color: 'transparent',
                }}
              >
                MASTERY
              </span>
              <span className="block text-[#CCFF00] drop-shadow-[0_2px_8px_rgba(204,255,0,0.35)]">
                & BEYOND.
              </span>
            </h1>

            {/* Paragraph Body Text */}
            <p className="about-para font-mono-code text-xs sm:text-sm md:text-base text-gray-100 font-medium leading-relaxed max-w-2xl mb-6 sm:mb-8 text-left">
              A dense, focused exploration of interactive web experiences. Driven by a deep passion for blurring the lines between design and engineering, combining the raw performance of Next.js and React with a robust, analytical foundation in Java and Data Structures. Every pixel is calculated; every motion is deliberate.
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap justify-start gap-2.5 sm:gap-3">
              {TECH_CHIPS.map((chip, idx) => (
                <span
                  key={idx}
                  className="about-chip px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-zinc-300 bg-white/90 text-zinc-800 font-mono-code text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4 sm:h-6" />
      </div>

      {/* Full-Width Wall-to-Wall Black Marquee Ticker Box */}
      <div className="about-ticker w-full bg-black py-6 sm:py-8 md:py-12 border-t border-b border-zinc-800 overflow-hidden select-none mt-8 sm:mt-12 mb-2 z-50">
        <div className="animate-marquee flex items-center whitespace-nowrap gpu-accelerated">
          {duplicatedTicker.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4 sm:space-x-6 mx-3 sm:mx-4">
              <span className="font-display font-black text-4xl sm:text-7xl md:text-9xl text-[#CCFF00] tracking-tight uppercase">
                {item}
              </span>
              <span className="text-2xl sm:text-4xl text-zinc-700 font-mono-code">★</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

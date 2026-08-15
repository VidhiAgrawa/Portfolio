import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const TECH_CHIPS = ['NEXT.JS', 'REACT', 'JAVA', 'DSA', 'FRAMER MOTION'];

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
  'JAVA CORE',
  'DSA',
  'TYPESCRIPT',
  'GSAP',
];

export default function About() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  // High-performance direct DOM tracking for mouse cursor (0% React re-render overhead)
  const mousePosRef = useRef({ x: 300, y: 250, targetX: 300, targetY: 250 });

  // Preload portrait image asset instantly on component mount
  useEffect(() => {
    const img = new Image();
    img.src = '/about_portrait.jpg';
  }, []);

  // 120 FPS requestAnimationFrame lerp loop
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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mousePosRef.current.targetX = e.clientX - rect.left;
    mousePosRef.current.targetY = e.clientY - rect.top;
  };

  const handleMouseEnter = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;
      mousePosRef.current.targetX = posX;
      mousePosRef.current.targetY = posY;
      mousePosRef.current.x = posX;
      mousePosRef.current.y = posY;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const duplicatedTicker = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS], []);

  return (
    <div className="relative min-h-screen w-full bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden select-none pb-8 sm:pb-14">
      {/* Top Main Canvas Container */}
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-6 sm:pt-10 pb-8 sm:pb-12 flex-1 flex flex-col justify-between group"
      >
        {/* Top Left Canvas Button */}
        <div className="relative z-20">
          <button
            onClick={() => navigate('/')}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 border border-zinc-300 text-zinc-800 font-mono-code text-xs font-bold uppercase tracking-wider flex items-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 mb-6 sm:mb-8"
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
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              willChange: 'left, top, transform, opacity',
            }}
            className={`hidden md:block absolute w-[360px] lg:w-[400px] h-[460px] lg:h-[500px] z-0 overflow-hidden shadow-2xl rounded-2xl pointer-events-none gpu-accelerated ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/about_portrait.jpg"
              alt="Portrait"
              loading="eager"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
            />
          </div>

          {/* MOBILE CENTERED BACKDROP PORTRAIT IMAGE */}
          <div
            className={`md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] xs:w-[310px] h-[360px] xs:h-[400px] z-0 overflow-hidden shadow-xl rounded-xl pointer-events-none transition-all duration-400 ease-out ${
              isHovered ? 'opacity-35 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <img
              src="/about_portrait.jpg"
              alt="Portrait"
              loading="eager"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
            />
          </div>

          {/* Centered Block with Left-Aligned Text Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-left flex flex-col items-start px-2 sm:px-0">
            {/* Headline */}
            <h1 className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] mb-4 sm:mb-6 text-left">
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
            <p className="font-mono-code text-xs sm:text-sm md:text-base md:text-gray-800 lg:text-gray-100 font-medium leading-relaxed max-w-2xl mb-6 sm:mb-8 text-left">
              A dense, focused exploration of interactive web experiences. Driven by a deep passion for blurring the lines between design and engineering, combining the raw performance of Next.js and React with a robust, analytical foundation in Java and Data Structures. Every pixel is calculated; every motion is deliberate.
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap justify-start gap-2.5 sm:gap-3">
              {TECH_CHIPS.map((chip, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-zinc-300 bg-white/90 text-zinc-800 font-mono-code text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all cursor-pointer hover:scale-105 active:scale-95"
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
      <div className="w-full bg-black py-6 sm:py-8 md:py-12 border-t border-b border-zinc-800 overflow-hidden select-none mt-8 sm:mt-12 mb-2 z-50">
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

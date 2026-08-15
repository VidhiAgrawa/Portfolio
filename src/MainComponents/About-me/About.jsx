import React, { useState, useRef } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const [imgPos, setImgPos] = useState({ x: 200, y: 250 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setImgPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden select-none pb-20">
      {/* Top Main Canvas Container */}
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-7xl mx-auto px-6 md:px-16 pt-10 pb-12 flex-1 flex flex-col justify-between"
      >
        {/* Top Left Canvas Button */}
        <div className="relative z-20">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 border border-zinc-300 text-zinc-800 font-mono-code text-xs font-bold uppercase tracking-wider flex items-center  transition-all duration-200 cursor-pointer shadow-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Center Layout: Mouse-Following Portrait Photo + Centered Container with Left-Aligned Text */}
        <div className="relative min-h-[520px] flex items-center justify-center">
          {/* Square Monochrome Portrait Image (Follows mouse cursor smoothly!) */}
          <div
            style={{
              left: `${imgPos.x}px`,
              top: `${imgPos.y}px`,
              transform: isHovered
                ? 'translate(-50%, -50%) scale(1)'
                : 'translate(-50%, -50%) scale(0.9)',
              transition: isHovered
                ? 'left 0.12s ease-out, top 0.12s ease-out, opacity 0.3s ease-out, transform 0.3s ease-out'
                : 'opacity 0.4s ease-out, transform 0.4s ease-out',
            }}
            className={`absolute w-[320px] sm:w-[380px] h-[400px] sm:h-[480px] z-0 overflow-hidden shadow-2xl rounded-xl pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/about_portrait.jpg"
              alt="Portrait"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
            />
          </div>

          {/* Centered Block with Left-Aligned Text Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-left flex flex-col items-start">
            {/* Huge Brutalist Headline (Left-Aligned Text) */}
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] mb-6 text-left">
              <span className="block text-gray-100">FRONTEND</span>
              <span
                className="block"
                style={{
                  WebkitTextStroke: '2px rgb(226 221 221 / 60%)',
                  color: 'transparent',
                }}
              >
                MASTERY
              </span>
              <span className="block text-[#CCFF00] drop-shadow-[0_2px_8px_rgba(204,255,0,0.35)]">
                & BEYOND.
              </span>
            </h1>

            {/* Left-Aligned Paragraph Body Text */}
            <p className="font-mono-code text-xs sm:text-sm md:text-base text-gray-100 font-medium leading-relaxed max-w-2xl mb-8 text-left">
              A dense, focused exploration of interactive web experiences. Driven by a deep passion for blurring the lines between design and engineering, combining the raw performance of Next.js and React with a robust, analytical foundation in Java and Data Structures. Every pixel is calculated; every motion is deliberate.
            </p>

            {/* Left-Aligned Tech Stack Chips */}
            <div className="flex flex-wrap justify-start gap-3">
              {TECH_CHIPS.map((chip, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 rounded-xl border border-zinc-300 bg-white/90 text-zinc-800 font-mono-code text-xs font-bold uppercase tracking-wider shadow-sm hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all cursor-pointer"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-6" />
      </div>

      {/* Full-Width Wall-to-Wall Black Marquee Ticker Box */}
      <div className="w-full bg-black py-8 md:py-12 border-t border-b border-zinc-800 overflow-hidden select-none mt-12 mb-4 z-50">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-6 mx-4">
              <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-[#CCFF00] tracking-tight uppercase">
                {item}
              </span>
              <span className="text-4xl text-zinc-700 font-mono-code">★</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

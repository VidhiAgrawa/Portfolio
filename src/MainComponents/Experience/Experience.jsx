import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../Utilities/Navbar';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';

const MILESTONES = [
  {
    id: '01',
    tag: '01 / MILESTONE',
    tagColor: 'text-cyan-400',
    title: 'DASHBOARD UI ARCHITECTURE',
    description:
      'Spearheaded the implementation of robust, highly responsive cybersecurity dashboards. Translated complex backend threat data into actionable, clean user interfaces using React and modern CSS paradigms.',
  },
  {
    id: '02',
    tag: '02 / MILESTONE',
    tagColor: 'text-cyan-400',
    title: 'REAL-TIME THREAT VIZ',
    description:
      'Integrated WebSockets with specialized charting libraries to visualize live network threats. Focused on high-performance rendering to ensure zero UI blocking during heavy data influx.',
  },
  {
    id: '03',
    tag: '03 / MILESTONE',
    tagColor: 'text-cyan-400',
    title: 'PERFORMANCE & 3D INTERACTION',
    description:
      'Engineered 3D kinetic micro-interactions and WebGL canvas components using Three.js & GSAP. Optimized asset loading pipelines to achieve sub-second load times and 120 FPS rendering.',
  },
];

// Cyber Text Glitch Effect Component
const ScrambleText = ({ text, isHovered }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      let ticks = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        ticks++;
        setDisplayText(
          text
            .split('')
            .map((char) => {
              if (char === ' ') return ' ';
              return Math.random() > 0.85 ? '|' : char;
            })
            .join('')
        );

        if (ticks > 15) {
          clearInterval(intervalRef.current);
          setDisplayText(text);
        }
      }, 30);
    } else {
      clearInterval(intervalRef.current);
      setDisplayText(text);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, text]);

  return <>{displayText}</>;
};

// High-Performance 3D Magnetic Tilt Milestone Card Component
function MilestoneCard({ milestone }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    });
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 12;
    const rotateX = -(y / (rect.height / 2)) * maxTilt;
    const rotateY = (x / (rect.width / 2)) * maxTilt;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(204, 255, 0, 0.35)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        ...transformStyle,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
          : 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="relative p-5 sm:p-7 md:p-8 bg-[#111215] hover:bg-[#15161b] flex flex-col justify-between group rounded-sm overflow-hidden cursor-crosshair gpu-accelerated"
    >
      {/* Yellow Corner Ticks (┌ and ┘ in #CCFF00) ONLY APPEAR ON HOVER */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20" />

      <div className="relative z-20">
        {/* Milestone Tag */}
        <div
          className={`font-mono-code text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-4 ${milestone.tagColor}`}
        >
          {milestone.tag}
        </div>

        {/* Milestone Title */}
        <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white tracking-tight uppercase leading-tight mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors">
          {milestone.title}
        </h3>

        {/* Milestone Description with Scramble Effect */}
        <p className="font-mono-code text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <ScrambleText text={milestone.description} isHovered={isHovered} />
        </p>
      </div>
    </div>
  );
}

export default function Experience({ isModal = false, onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-white p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between overflow-x-hidden select-none">
      {/* Top Navbar if viewed as main page */}
      {!isModal && <Navbar />}

      {/* Dark Tactical Grain Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise-pattern pointer-events-none opacity-100 z-0" />
      <div className="absolute top-1/3 left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#CCFF00]/5 blur-[160px] pointer-events-none" />

      {/* Top Header Row with Title & Bright Neon Close Button */}
      <div className="relative z-10 pt-16 sm:pt-20 flex items-start justify-between">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-none">
            ABREONIX
          </h1>
          <p className="font-mono-code text-cyan-400 font-semibold text-base sm:text-xl md:text-2xl mt-1.5 sm:mt-2 tracking-wide">
            Developer Intern
          </p>
        </div>

        {/* Square Neon Lime Close Button */}
        <button
          onClick={handleClose}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-[#CCFF00] hover:bg-[#bce400] text-black font-extrabold flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)] shrink-0 ml-4 z-50"
          title="Close / Back to Home"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>
      </div>

      {/* Middle Section: 3D Magnetic Tilt Milestone Cards */}
      <div className="relative z-10 my-8 sm:my-12 lg:my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {MILESTONES.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>

      {/* Bottom Footer Watermark */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-zinc-600 font-mono-code text-[11px] sm:text-xs uppercase tracking-widest space-y-2 sm:space-y-0">
        <span>01 EXPLORED</span>
        <span>ABREONIX // INTERNSHIP</span>
      </div>
    </div>
  );
}
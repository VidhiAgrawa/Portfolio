import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '../../Utilities/Navbar';
import { X, FileText, FileCheck, Download, Calendar } from 'lucide-react';
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
const MilestoneCard = React.memo(function MilestoneCard({ milestone }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardRef.current.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 12;
    const rotateX = -(y / (rect.height / 2)) * maxTilt;
    const rotateY = (x / (rect.width / 2)) * maxTilt;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(204, 255, 0, 0.35)';
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="exp-card relative p-5 sm:p-7 md:p-8 bg-[#111215] hover:bg-[#15161b] flex flex-col justify-between group rounded-sm overflow-hidden cursor-crosshair gpu-accelerated transition-shadow duration-200"
    >
      {/* Yellow Corner Ticks (┌ and ┘ in #CCFF00) ONLY APPEAR ON HOVER */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20" />

      <div className="relative z-20">
        {/* Milestone Tag */}
        <div
          className={`exp-card-text font-mono-code text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-4 ${milestone.tagColor}`}
        >
          {milestone.tag}
        </div>

        {/* Milestone Title */}
        <h3 className="exp-card-text font-display font-black text-lg sm:text-xl md:text-2xl text-white tracking-tight uppercase leading-tight mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors">
          {milestone.title}
        </h3>

        {/* Milestone Description with Scramble Effect */}
        <p className="exp-card-text font-mono-code text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <ScrambleText text={milestone.description} isHovered={isHovered} />
        </p>
      </div>
    </div>
  );
});

export default function Experience({ isModal = false, onClose }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [pdfViewer, setPdfViewer] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        '.exp-title-text',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.35 }
      )
        .fromTo(
          '.exp-subtitle-text',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.3 },
          '-=0.2'
        )
        .fromTo(
          '.exp-close-btn',
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.25 },
          '-=0.2'
        )
        .fromTo(
          '.exp-card',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, clearProps: 'transform' },
          '-=0.2'
        )
        .fromTo(
          '.exp-card-text',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.02, clearProps: 'transform' },
          '-=0.25'
        )
        .fromTo(
          '.exp-btn-group',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.3, clearProps: 'transform' },
          '-=0.2'
        )
        .fromTo(
          '.exp-footer',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.2 },
          '-=0.15'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#050507] text-white p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between overflow-x-hidden select-none">
      {/* Top Navbar if viewed as main page */}
      {!isModal && <Navbar />}

      {/* Dark Tactical Grain Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise-pattern pointer-events-none opacity-100 z-0" />
      <div className="absolute top-1/3 left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#CCFF00]/5 blur-[160px] pointer-events-none" />

      {/* Top Header Row with Title, Internship Dates & Bright Neon Close Button */}
      <div className="relative z-10 pt-10 sm:pt-12 flex items-start justify-between">
        <div className="exp-header">
          <div className="inline-flex items-center space-x-2 font-mono-code text-[11px] text-[#CCFF00] tracking-widest uppercase mb-3 bg-[#CCFF00]/10 px-3 py-1 rounded-full border border-[#CCFF00]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>INTERNSHIP EXPERIENCE</span>
          </div>
          <h1 className="exp-title-text font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-none">
            ABREONIX
          </h1>
          
          {/* Subtitle & Dates */}
          <div className="exp-subtitle-text flex flex-wrap items-center gap-2.5 sm:gap-4 mt-3">
            <span className="font-mono-code text-cyan-400 font-bold text-base sm:text-xl md:text-2xl tracking-wide">
              Developer Intern
            </span>
            <span className="text-zinc-600 text-sm hidden xs:inline">•</span>
            <div className="font-mono-code text-xs sm:text-sm text-zinc-300 bg-zinc-900/90 px-3.5 py-1.5 rounded-lg border border-zinc-800 flex items-center space-x-2 tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>1 NOVEMBER 2025 – 15 FEBRUARY 2026 <strong className="text-[#CCFF00]">(3 MONTHS)</strong></span>
            </div>
          </div>
        </div>

        {/* Square Neon Lime Close Button */}
        {/* <button
          onClick={handleClose}
          className="exp-close-btn w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-[#CCFF00] hover:bg-[#bce400] text-black font-extrabold flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)] shrink-0 ml-4 z-50"
          title="Close / Back to Home"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button> */}
      </div>

      {/* Middle Section: 3D Magnetic Tilt Milestone Cards */}
      <div className="relative z-10 my-8 sm:my-12 lg:my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {MILESTONES.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>

      {/* Bottom Document Buttons: Completion Certificate & Offer Letter */}
      <div className="exp-btn-group relative z-10 max-w-7xl mx-auto w-full mb-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <button
          onClick={() => setPdfViewer({ title: 'OFFER LETTER', url: '/Offer-letter.pdf' })}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 font-mono-code text-xs sm:text-sm font-extrabold tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:scale-105 active:scale-95"
        >
          <FileCheck className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
          <span>SEE MY OFFER LETTER</span>
        </button>
        <button
          onClick={() => setPdfViewer({ title: 'COMPLETION CERTIFICATE', url: '/Completion-Certificate.pdf' })}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#CCFF00] hover:bg-[#bce400] text-black font-mono-code text-xs sm:text-sm font-extrabold tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(204,255,0,0.3)] hover:scale-105 active:scale-95"
        >
          <FileText className="w-4 h-4 text-black stroke-[2.5]" />
          <span>SEE MY COMPLETION CERTIFICATE</span>
        </button>

      </div>

      {/* Bottom Footer Watermark */}
      <div className="exp-footer relative z-10 flex flex-col sm:flex-row items-center justify-between text-zinc-600 font-mono-code text-[11px] sm:text-xs uppercase tracking-widest space-y-2 sm:space-y-0 pt-4 border-t border-zinc-900/80">
        <span>01 EXPLORED</span>
        <span>ABREONIX // 3-MONTH INTERNSHIP</span>
      </div>

      {/* IN-WEBSITE EMBEDDED PDF MODAL VIEWER */}
      {pdfViewer && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#0c0d11] border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/90 border-b border-zinc-800 shrink-0">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-[#CCFF00]" />
                <span className="font-mono-code text-xs sm:text-sm font-bold tracking-widest uppercase text-white">
                  ABREONIX // {pdfViewer.title}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={pdfViewer.url}
                  download
                  className="hidden xs:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono-code transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD</span>
                </a>
                <button
                  onClick={() => setPdfViewer(null)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Close PDF Viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF View Engine */}
            <div className="flex-1 w-full h-full bg-zinc-950 relative">
              <object
                data={pdfViewer.url}
                type="application/pdf"
                className="w-full h-full border-0 rounded-b-2xl"
              >
                <embed
                  src={pdfViewer.url}
                  type="application/pdf"
                  className="w-full h-full border-0 rounded-b-2xl"
                />
                <iframe
                  src={pdfViewer.url}
                  className="w-full h-full border-0 rounded-b-2xl"
                  title={pdfViewer.title}
                />
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
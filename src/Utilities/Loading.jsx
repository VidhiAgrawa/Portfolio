import React, { useState, useEffect, useRef } from 'react';

const SYSTEM_LOGS = [
  { threshold: 5, text: '> CRITICAL_FAILURE_DETECTED' },
  { threshold: 15, text: '> [WARN] MEMORY_CORRUPTION_DETECTED' },
  { threshold: 25, text: '> SEGMENTATION_FAULT (core dumped)' },
  { threshold: 40, text: '> SYSTEM_HALTED_AT_0x45FA9' },
  { threshold: 55, text: '> ATTEMPTING_RECOVERY_PROTOCOL...' },
  { threshold: 70, text: '> KERNEL_PANIC' },
  { threshold: 82, text: '> CRITICAL_ERROR: OVERRIDE_FAILED' },
  { threshold: 92, text: '> MANUAL_INTERVENTION_REQUIRED' },
  { threshold: 100, text: '> SYSTEM_LOCKED_' },
];

const generateBinaryLine = () =>
  Array.from({ length: 8 }, () => (Math.random() > 0.5 ? '1' : '0')).join('');

export default function Loading({ onComplete }) {
  const consoleRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Mutating background binary stream
  const [binaryStream, setBinaryStream] = useState([
    '10100101',
    '01101001',
    '11010010',
    '00111001',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBinaryStream(Array.from({ length: 4 }, () => generateBinaryLine()));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let start = null;
    const duration = 4000; // 4 seconds loading duration

    const animateProgress = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 1200);
      }
    };

    const animId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  const visibleLogs = SYSTEM_LOGS.filter((log) => progress >= log.threshold);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [visibleLogs.length]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#07080a] text-white flex flex-col items-center justify-center p-4 select-none overflow-hidden transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 🎨 CSS for Strong Cyberpunk Chromatic Glitch Animation */}
      <style>{`
        @keyframes strong-glitch-anim {
          0% {
            text-shadow: 4px 0 0 #06b6d4, -4px 0 0 #ff0055, 2px 2px 0 #CCFF00;
            transform: translate(0);
          }
          15% {
            text-shadow: -5px -2px 0 #06b6d4, 5px 2px 0 #ff0055, -2px -2px 0 #CCFF00;
            transform: translate(-3px, 2px) skewX(4deg);
          }
          30% {
            text-shadow: 5px 2px 0 #06b6d4, -5px -2px 0 #ff0055, 3px -1px 0 #CCFF00;
            transform: translate(3px, -2px) skewX(-4deg);
          }
          45% {
            text-shadow: -4px 3px 0 #06b6d4, 4px -3px 0 #ff0055, -3px 2px 0 #CCFF00;
            transform: translate(-2px, -1px);
          }
          60% {
            text-shadow: 6px -1px 0 #06b6d4, -6px 1px 0 #ff0055, 2px 3px 0 #CCFF00;
            transform: translate(2px, 3px) skewX(6deg);
          }
          75% {
            text-shadow: -3px 2px 0 #06b6d4, 3px -2px 0 #ff0055, -4px -1px 0 #CCFF00;
            transform: translate(-3px, 1px) skewX(-3deg);
          }
          90% {
            text-shadow: 5px -3px 0 #06b6d4, -5px 3px 0 #ff0055, 1px -2px 0 #CCFF00;
            transform: translate(1px, -2px);
          }
          100% {
            text-shadow: 4px 0 0 #06b6d4, -4px 0 0 #ff0055, 2px 2px 0 #CCFF00;
            transform: translate(0);
          }
        }
        .glitch-text-strong {
          animation: strong-glitch-anim 0.08s infinite linear alternate-reverse;
          display: inline-block;
        }
      `}</style>

      {/* 🌌 Dynamic Cyberpunk Background Design System */}

      {/* 1. Deep Neon Lime & Cyan Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.14)_0%,rgba(6,182,212,0.07)_45%,transparent_75%)] pointer-events-none" />

      {/* 2. Tactical Matrix Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* 3. CRT Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* 4. Background Rotating HUD Concentric Reticle Rings with Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[480px] h-[480px] sm:w-[680px] sm:h-[680px] md:w-[820px] md:h-[820px] rounded-full border border-cyan-500/20 flex items-center justify-center relative animate-hud-spin gpu-accelerated">
          <div className="w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] rounded-full border-2 border-[#CCFF00]/30 border-dashed flex items-center justify-center shadow-[0_0_50px_rgba(204,255,0,0.1)]">
            <div className="w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] rounded-full border border-cyan-400/20" />
          </div>

          {/* Crosshairs Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-cyan-500/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-[1px] bg-cyan-500/20" />
          </div>
        </div>
      </div>

      {/* 5. Four Cyberpunk Corner L-Brackets */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#CCFF00]/80 pointer-events-none hidden xs:block" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#CCFF00]/80 pointer-events-none hidden xs:block" />
      <div className="absolute bottom-14 left-6 w-8 h-8 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none hidden xs:block" />
      <div className="absolute bottom-14 right-6 w-8 h-8 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none hidden xs:block" />

      {/* 6. Corner HUD Metadata & Mutating Binary Watermarks */}
      <div className="absolute top-10 left-10 z-10 font-mono-code text-[10px] sm:text-xs text-[#CCFF00]/70 tracking-widest uppercase hidden md:block">
        <div>SYS_RECOVERY // CORE-04</div>
        <div className="text-[9px] text-zinc-500">X: 094.2 // Y: 184.8</div>
      </div>

      <div className="absolute top-10 right-10 z-10 font-mono-code text-[10px] sm:text-xs text-cyan-400/80 tracking-widest text-right tabular-nums hidden md:block">
        {binaryStream.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      {/* 🖥️ Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pb-16">
        
        {/* ⭕ Central Ring & Typography Display */}
        <div className="relative flex flex-col items-center justify-center mb-16">
          
          {/* Minimalist Arc Ring */}
          <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full border border-zinc-800 pointer-events-none flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border-t border-r border-[#CCFF00] opacity-70 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          {/* 💥 Typography Display (White Text 2x Larger than Neon Lime ERR) */}
          <div className="relative z-10 flex items-baseline justify-center whitespace-nowrap">
            {progress < 100 ? (
              <div className="flex items-baseline space-x-2 sm:space-x-4">
                {/* Large Solid White Number */}
                <span 
                  className="font-display font-black text-7xl xs:text-8xl sm:text-[140px] md:text-[160px] text-white tracking-tighter leading-none"
                  style={{ textShadow: '0 0 25px rgba(255,255,255,0.4)' }}
                >
                  {progress}
                </span>
                {/* Compact Neon Lime ERR */}
                <span 
                  className="font-display font-black text-3xl xs:text-4xl sm:text-[70px] md:text-[80px] text-[#CCFF00] tracking-widest leading-none"
                  style={{ textShadow: '0 0 25px rgba(204,255,0,0.6)' }}
                >
                  ERR
                </span>
              </div>
            ) : (
              <div className="flex items-baseline space-x-2 sm:space-x-4">
                {/* Large Solid White ERR with Strong Chromatic Glitch Animation */}
                <span 
                  className="font-display font-black text-7xl xs:text-8xl sm:text-[140px] md:text-[160px] text-white tracking-widest leading-none glitch-text-strong"
                >
                  ERR
                </span>
                {/* Compact Neon Lime ERR */}
                <span 
                  className="font-display font-black text-3xl xs:text-4xl sm:text-[70px] md:text-[80px] text-[#CCFF00] tracking-widest leading-none"
                  style={{ textShadow: '0 0 30px rgba(204,255,0,0.7)' }}
                >
                  ERR
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 📜 System Log Console Box */}
        <div
          ref={consoleRef}
          className="w-[90%] max-w-[450px] max-h-[160px] overflow-y-auto border border-[#CCFF00]/30 border-t-8 rounded-sm p-4 font-mono text-[11px] sm:text-sm text-zinc-400 space-y-1.5 backdrop-blur-md scroll-smooth bg-black/60 shadow-[0_0_15px_rgba(204,255,0,0.05)]"
        >
          {visibleLogs.map((log, idx) => (
            <div
              key={idx}
              className={`${
                idx === visibleLogs.length - 1
                  ? 'text-[#CCFF00] font-bold animate-pulse'
                  : 'text-zinc-500'
              }`}
            >
              {log.text}
            </div>
          ))}
        </div>
      </div>

      {/* 🚧 Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-r from-[#CCFF00]/90 to-[#CCFF00] text-[#07080a] flex justify-between items-center px-4 sm:px-8 font-mono text-xs sm:text-sm font-bold uppercase z-50">
        <div className="flex items-center space-x-2">
          <span className="animate-pulse">⚠</span>
          <span>RECOVERING_SYSTEM...</span>
        </div>
        <div className="opacity-80 tracking-widest">
          STATUS: OFFLINE
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router';

const STEPS = [
  { key: 'email', label: 'INPUT_EMAIL', prompt: 'ENTER YOUR EMAIL:' },
  { key: 'message', label: 'INPUT_MESSAGE', prompt: 'ENTER YOUR MESSAGE / TRANSMISSION:' },
];

const SOCIAL_LINKS = [
  { name: 'GITHUB', url: 'https://github.com/VidhiAgrawa' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/vidhiagrawa/' },
  { name: 'LEETCODE', url: 'https://leetcode.com/u/Vidhi_Agrawal_/' },
  { name: 'EMAIL', url: 'mailto:vidhi.agrawal.tech@gmail.com' },
];

const generateBinaryLine = () =>
  Array.from({ length: 8 }, () => (Math.random() > 0.5 ? '1' : '0')).join('');

export default function Terminal() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const historyContainerRef = useRef(null);
  const containerRef = useRef(null);
  const clockRef = useRef(null);
  const binaryContainerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });
  const [history, setHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [viewsCount, setViewsCount] = useState(1);

  // GSAP Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        '.term-header',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
        .fromTo(
          '.term-center',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, clearProps: 'transform' },
          '-=0.2'
        )
        .fromTo(
          '.term-footer',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.25 },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Screen size detection for adaptive performance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic View Counter tracking
  useEffect(() => {
    try {
      const KEY = 'portfolio_site_views';
      const SESSION_KEY = 'portfolio_site_session';
      const storedViews = localStorage.getItem(KEY);
      let currentViews = storedViews !== null ? parseInt(storedViews, 10) : 0;

      const hasVisitedSession = sessionStorage.getItem(SESSION_KEY);
      if (!hasVisitedSession) {
        currentViews += 1;
        localStorage.setItem(KEY, currentViews.toString());
        sessionStorage.setItem(SESSION_KEY, 'true');
      }

      setViewsCount(currentViews);
    } catch {
      setViewsCount(1);
    }
  }, []);

  // Direct DOM Mutating binary stream (0 React re-renders!)
  useEffect(() => {
    if (isMobile) return;

    const binaryInterval = setInterval(() => {
      if (binaryContainerRef.current) {
        const lines = Array.from({ length: 6 }, () => generateBinaryLine());
        binaryContainerRef.current.innerText = lines.join('\n');
      }
    }, 120);

    return () => clearInterval(binaryInterval);
  }, [isMobile]);

  // Direct DOM Mutating Digital Clock (0 React re-renders!)
  useEffect(() => {
    const clockInterval = isMobile ? 1000 : 50;
    const timer = setInterval(() => {
      if (!clockRef.current) return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      if (isMobile) {
        clockRef.current.textContent = `${hh}:${mm}:${ss}`;
      } else {
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
        clockRef.current.textContent = `${hh}:${mm}:${ss}:${ms}`;
      }
    }, clockInterval);

    return () => clearInterval(timer);
  }, [isMobile]);

  // ESC Key listener for ABORT
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Keep input focused automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStepIndex, isCompleted]);

  // Internal history div scroll when history expands
  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  // CLI Command Parser (exit, abort, etc.)
  const executeCLICommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();

    if (cleanCmd === 'exit' || cleanCmd === 'abort') {
      navigate('/');
      return true;
    }

    if (cleanCmd === 'projects') {
      navigate('/projects');
      return true;
    }

    if (cleanCmd === 'about') {
      navigate('/about');
      return true;
    }

    return false;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const value = currentInput.trim();

    // Check if user entered a CLI command first
    const isCommand = executeCLICommand(value);
    setCurrentInput('');
    if (isCommand) return;

    if (isCompleted) {
      setHistory((prev) => [
        ...prev,
        { type: 'user', text: `> ${value}` },
        { type: 'system', text: `Command not recognized: "${value}".` },
      ]);
      return;
    }

    // Process Form Input Step
    const currentStep = STEPS[currentStepIndex];

    // Log the answer into history
    setHistory((prev) => [
      ...prev,
      {
        type: 'answer',
        label: currentStep.label,
        prompt: currentStep.prompt,
        value: value,
      },
    ]);

    const updatedFormData = { ...formData, [currentStep.key]: value };
    setFormData(updatedFormData);

    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      setHistory((prev) => [
        ...prev,
        { type: 'success', text: '✔ TRANSMISSION DISPATCH SUCCESSFUL (200 OK).' },
        { type: 'system', text: 'ALL CONTACT DATA ENCRYPTED & TRANSMITTED TO DEVELOPER.' },
      ]);
    }
  };

  const currentStep = STEPS[currentStepIndex];

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current && inputRef.current.focus()}
      className="fixed inset-0 w-screen h-screen bg-black text-[#CCFF00] font-mono-code p-4 sm:p-8 md:p-14 overflow-hidden select-none flex flex-col justify-between z-50 cursor-crosshair"
    >
      {/* Scanline Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-60 z-10" />

      {/* BACKGROUND HUD CONCENTRIC RADAR RETICLE (Rotates 360° on Large View / Stationary on Mobile) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className={`w-[320px] h-[340px] xs:w-[420px] xs:h-[420px] sm:w-[720px] sm:h-[720px] md:w-[840px] md:h-[840px] rounded-full border border-cyan-500/30 flex items-center justify-center relative gpu-accelerated ${
            !isMobile ? 'animate-hud-spin' : ''
          }`}
        >
          <div className="w-[240px] h-[260px] xs:w-[300px] xs:h-[320px] sm:w-[540px] sm:h-[540px] md:w-[640px] md:h-[640px] rounded-full border-2 border-[#CCFF00]/40 flex items-center justify-center shadow-[0_0_50px_rgba(204,255,0,0.1)] border-dashed">
            <div className="w-[170px] h-[180px] xs:w-[200px] xs:h-[220px] sm:w-[380px] sm:h-[380px] rounded-full border border-cyan-400/20" />
          </div>

          {/* Crosshairs Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-cyan-500/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-[1px] bg-cyan-500/30" />
          </div>

          {/* HUD Coordinates Watermark */}
          <div className="absolute top-16 right-16 sm:top-28 sm:right-28 text-[9px] sm:text-[11px] text-[#CCFF00]/80 font-mono-code tracking-widest text-right">
            <div>X: 124.9</div>
            <div>Y: 088.2</div>
          </div>
        </div>
      </div>

      {/* TOP HEADER BAR */}
      <div className="term-header relative z-20 flex items-start justify-between w-full pt-2 sm:pt-0">
        {/* Top Left ABORT Button: [ ESC // ABORT ] */}
        <button
          onClick={() => navigate('/')}
          className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-sm border border-[#CCFF00]/60 bg-black/80 text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black font-mono-code text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.15)]"
        >
          [ ESC // ABORT ]
        </button>

        {/* Top Right Mutating Binary Stream Loop */}
        <div
          ref={binaryContainerRef}
          className="text-[9px] sm:text-[11px] font-mono-code text-[#CCFF00]/80 tracking-widest leading-snug text-right tabular-nums select-none whitespace-pre"
        >
          00011101{'\n'}10100100{'\n'}01001100{'\n'}11010010{'\n'}00110001{'\n'}10101011
        </div>
      </div>

      {/* CENTER DYNAMICALLY GROWING HORIZONTAL BAND */}
      <div className="relative flex-1 flex items-center justify-center w-full z-20 my-auto">
        <div className="term-center w-full bg-black/95 border-y border-[#CCFF00]/25 flex items-center justify-between px-4 sm:px-12 md:px-24 py-5 sm:py-8 shadow-2xl transition-all duration-300">
          
          {/* Left Side: CORE_INJECTION_PROTOCOL, Dynamic History & Input */}
          <div className="flex-1 max-w-4xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold text-[#CCFF00] tracking-widest uppercase pb-0.5 border-b-2 border-[#CCFF00] inline-block">
                CORE_INJECTION_PROTOCOL
              </span>

              {/* Mobile-Only Current Step Badge */}
              <span className="sm:hidden text-[9px] font-bold text-cyan-400 tracking-wider uppercase">
                {isCompleted ? 'COMPLETE' : currentStep.label}
              </span>
            </div>

            {/* Rendered History Items */}
            {history.length > 0 && (
              <div
                ref={historyContainerRef}
                className="space-y-1 font-mono-code text-[11px] sm:text-sm max-h-[140px] sm:max-h-[160px] overflow-y-auto pr-2 mb-2 sm:mb-3 scroll-smooth"
              >
                {history.map((item, idx) => (
                  <div key={idx}>
                    {item.type === 'answer' ? (
                      <div className="text-cyan-300">
                        <span className="text-[#CCFF00] font-bold">&gt; {item.label}: </span>
                        <span className="text-white font-semibold">{item.value}</span>
                      </div>
                    ) : item.type === 'success' ? (
                      <div className="text-[#CCFF00] font-bold">{item.text}</div>
                    ) : (
                      <div className="text-zinc-400">{item.text}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ACTIVE TERMINAL INPUT PROMPT */}
            {!isCompleted ? (
              <form onSubmit={handleFormSubmit} className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                  <span className="text-xl sm:text-2xl text-[#CCFF00] font-mono font-bold select-none">┊</span>
                  <span className="text-2xl sm:text-4xl font-black text-[#CCFF00]">&gt;</span>
                </div>

                <input
                  ref={inputRef}
                  type={
                    currentStep.key === 'email'
                      ? 'email'
                      : currentStep.key === 'number'
                      ? 'tel'
                      : 'text'
                  }
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={currentStep.prompt}
                  className="w-full bg-transparent border-none outline-none text-[#CCFF00] font-mono-code text-base sm:text-2xl md:text-3xl font-bold tracking-wider caret-[#CCFF00] placeholder-zinc-700"
                  autoFocus
                />
              </form>
            ) : (
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                {SOCIAL_LINKS.map((link) => {
                  const label = link.name || link.email || 'EMAIL';
                  const rawUrl = link.url || '';
                  const href = rawUrl.includes('@') && !rawUrl.startsWith('mailto:')
                    ? `mailto:${rawUrl}`
                    : rawUrl;
                  const isMail = href.startsWith('mailto:');

                  return (
                    <a
                      key={label}
                      href={href}
                      target={isMail ? '_self' : '_blank'}
                      rel="noreferrer"
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded border border-[#CCFF00]/60 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black font-mono-code text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors shadow-lg"
                    >
                      {label} ↗
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Side: STATUS & INPUT STEP NAME Indicator (Desktop) */}
          <div className="hidden sm:block text-right pl-6 shrink-0">
            <div className="text-xs font-bold text-[#CCFF00]/80 tracking-widest uppercase mb-1">
              STATUS: {isCompleted ? 'DISPATCHED' : 'AWAITING'}
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#CCFF00] tracking-wider uppercase">
              {isCompleted ? 'PROTOCOL_COMPLETE' : currentStep.label}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER HUD DIAGNOSTICS & TICKING CLOCK */}
      <div className="term-footer relative z-20 w-full flex items-end justify-between text-[10px] sm:text-xs font-mono-code pb-1 sm:pb-0">
        {/* Bottom Left System Core Diagnostics */}
        <div className="space-y-0.5 sm:space-y-1 text-[#CCFF00]/90">
          <div className="font-bold text-xs sm:text-sm tracking-wider text-[#CCFF00]">
            SYS.CORE // ACTIVE
          </div>
          <div className="text-[10px] sm:text-xs tracking-wider">NODE: ALPHA-7</div>
          <div className="text-[10px] sm:text-xs tracking-wider">LATENCY: 15MS</div>
          <div className="text-[10px] sm:text-xs tracking-wider">ENCRYPT: RSA-4096</div>
        </div>

        {/* Bottom Right Digital Sequence, TOTAL VIEWS & High-Frequency Clock */}
        <div className="text-right space-y-0.5 sm:space-y-1">
          <div className="text-[9px] sm:text-xs text-[#CCFF00]/80 tracking-widest">
            SEQ. 492.11.X
          </div>
          
          {/* TOTAL VIEWS COUNTER */}
          <div className="text-[10px] sm:text-xs font-bold text-cyan-400 tracking-widest uppercase flex items-center justify-end space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>TOTAL_VIEWS: {viewsCount.toLocaleString()}</span>
          </div>

          <div
            ref={clockRef}
            className="font-display font-black text-xl sm:text-3xl md:text-4xl text-[#CCFF00] tracking-wider leading-none"
          >
            21:01:24:76
          </div>
          <div className="text-[9px] sm:text-xs text-[#CCFF00]/90 tracking-widest uppercase">
            {isCompleted ? 'TRANSMISSION_DISPATCHED' : 'AWAITING_INPUT'}
          </div>
        </div>
      </div>
    </div>
  );
}

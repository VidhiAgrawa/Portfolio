import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const STEPS = [
  { key: 'name', label: 'INPUT_NAME', prompt: 'ENTER YOUR NAME:' },
  { key: 'email', label: 'INPUT_EMAIL', prompt: 'ENTER YOUR EMAIL:' },
  { key: 'number', label: 'INPUT_NUMBER', prompt: 'ENTER YOUR PHONE NUMBER:' },
  { key: 'message', label: 'INPUT_MESSAGE', prompt: 'ENTER YOUR MESSAGE / TRANSMISSION:' },
];

const SOCIAL_LINKS = [
  { name: 'GITHUB', url: 'https://github.com/VidhiAgrawa' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/vidhiagrawa/' },
  { name: 'LEETCODE', url: 'https://leetcode.com/u/Vidhi_Agrawal_/' },
  // { name: 'TWITTER', url: 'https://twitter.com' },
];

const generateBinaryLine = () =>
  Array.from({ length: 8 }, () => (Math.random() > 0.5 ? '1' : '0')).join('');

export default function Terminal() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const historyContainerRef = useRef(null);

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
  const [currentTime, setCurrentTime] = useState('');

  // Mutating binary stream state
  const [binaryStream, setBinaryStream] = useState([
    '00011101',
    '10100100',
    '01001100',
    '11010010',
    '00110001',
    '10101011',
  ]);

  useEffect(() => {
    const binaryInterval = setInterval(() => {
      setBinaryStream(Array.from({ length: 6 }, () => generateBinaryLine()));
    }, 110);

    return () => clearInterval(binaryInterval);
  }, []);

  // Live High-Frequency Digital Clock (HH:MM:SS:MS)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setCurrentTime(`${hh}:${mm}:${ss}:${ms}`);
    }, 40);

    return () => clearInterval(timer);
  }, []);

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

    // Log the answer into history (this expands the box dynamically)
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
      onClick={() => inputRef.current && inputRef.current.focus()}
      className="fixed inset-0 w-screen h-screen bg-black text-[#CCFF00] font-mono-code p-6 sm:p-10 md:p-14 overflow-hidden select-none flex flex-col justify-between z-50 cursor-crosshair"
    >
      {/* Scanline Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-60 z-10" />

      {/* BACKGROUND HUD CONCENTRIC RADAR RETICLE WITH CONTINUOUS 360° ROTATION LOOP */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[580px] h-[580px] sm:w-[720px] sm:h-[720px] md:w-[840px] md:h-[840px] rounded-full border border-cyan-500/30 flex items-center justify-center relative animate-hud-spin gpu-accelerated">
          <div className="w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] md:w-[640px] md:h-[640px] rounded-full border-2 border-[#CCFF00]/40 flex items-center justify-center shadow-[0_0_50px_rgba(204,255,0,0.1)] border-dashed">
            <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-cyan-400/20" />
          </div>

          {/* Crosshairs Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-cyan-500/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-[1px] bg-cyan-500/30" />
          </div>

          {/* HUD Coordinates Watermark */}
          <div className="absolute top-28 right-28 text-[11px] text-[#CCFF00]/80 font-mono-code tracking-widest text-right">
            <div>X: 124.9</div>
            <div>Y: 088.2</div>
          </div>
        </div>
      </div>

      {/* TOP HEADER BAR */}
      <div className="relative z-20 flex items-start justify-between w-full">
        {/* Top Left ABORT Button: [ ESC // ABORT ] */}
        <button
          onClick={() => navigate('/')}
          className="px-4 py-1.5 rounded-sm border border-[#CCFF00]/60 bg-black/80 text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black font-mono-code text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.15)]"
        >
          [ ESC // ABORT ]
        </button>

        {/* Top Right Mutating Binary Stream Loop */}
        <div className="text-[11px] font-mono-code text-[#CCFF00]/80 tracking-widest leading-snug text-right tabular-nums select-none">
          {binaryStream.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>

      {/* CENTER DYNAMICALLY GROWING HORIZONTAL BAND (Zero Empty Spaces in Advance) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full bg-black/95 border-y border-[#CCFF00]/25 flex items-center justify-between px-6 sm:px-16 md:px-24 py-6 md:py-8 z-20 shadow-2xl transition-all duration-300">
        
        {/* Left Side: CORE_INJECTION_PROTOCOL, Dynamic History & Input */}
        <div className="flex-1 max-w-4xl">
          <div className="mb-3">
            <span className="text-xs font-bold text-[#CCFF00] tracking-widest uppercase pb-0.5 border-b-2 border-[#CCFF00] inline-block">
              CORE_INJECTION_PROTOCOL
            </span>
          </div>

          {/* Rendered History Items (ONLY rendered when history has entries - box expands dynamically as items are added!) */}
          {history.length > 0 && (
            <div
              ref={historyContainerRef}
              className="space-y-1.5 font-mono-code text-xs sm:text-sm max-h-[160px] overflow-y-auto pr-2 mb-3 scroll-smooth"
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
            <form onSubmit={handleFormSubmit} className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-2xl text-[#CCFF00] font-mono font-bold select-none">┊</span>
                <span className="text-3xl sm:text-4xl font-black text-[#CCFF00]">&gt;</span>
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
                className="w-full bg-transparent border-none outline-none text-[#CCFF00] font-mono-code text-xl sm:text-3xl font-bold tracking-wider caret-[#CCFF00] placeholder-zinc-700"
                autoFocus
              />
            </form>
          ) : (
            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded border border-[#CCFF00]/60 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black font-mono-code text-xs font-bold tracking-widest uppercase transition-colors shadow-lg"
                >
                  {link.name} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: STATUS & INPUT STEP NAME Indicator */}
        <div className="hidden sm:block text-right pl-6 shrink-0">
          <div className="text-xs font-bold text-[#CCFF00]/80 tracking-widest uppercase mb-1">
            STATUS: {isCompleted ? 'DISPATCHED' : 'AWAITING'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#CCFF00] tracking-wider uppercase">
            {isCompleted ? 'PROTOCOL_COMPLETE' : currentStep.label}
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER HUD DIAGNOSTICS & TICKING CLOCK */}
      <div className="relative z-20 w-full flex items-end justify-between text-xs font-mono-code">
        {/* Bottom Left System Core Diagnostics */}
        <div className="space-y-1 text-[#CCFF00]/90">
          <div className="font-bold text-sm tracking-wider text-[#CCFF00]">
            SYS.CORE // ACTIVE
          </div>
          <div className="text-xs tracking-wider">NODE: ALPHA-7</div>
          <div className="text-xs tracking-wider">LATENCY: 15MS</div>
          <div className="text-xs tracking-wider">ENCRYPT: RSA-4096</div>
        </div>

        {/* Bottom Right Digital Sequence & High-Frequency Clock */}
        <div className="text-right space-y-1">
          <div className="text-xs text-[#CCFF00]/80 tracking-widest">
            SEQ. 492.11.X
          </div>
          <div className="font-display font-black text-3xl sm:text-4xl text-[#CCFF00] tracking-wider leading-none">
            {currentTime || '21:01:24:76'}
          </div>
          <div className="text-xs text-[#CCFF00]/90 tracking-widest uppercase">
            {isCompleted ? 'TRANSMISSION_DISPATCHED' : 'AWAITING_INPUT'}
          </div>
        </div>
      </div>
    </div>
  );
}

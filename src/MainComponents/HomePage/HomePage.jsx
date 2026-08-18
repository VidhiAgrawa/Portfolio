import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useLocation, useNavigate } from 'react-router';
import Navbar from '../../Utilities/Navbar';
import FloatingCard from '../../Utilities/FloatingCard';
import CodeChip from '../../Utilities/CodeChip';
import SplashCursor from '../../Utilities/SplashCursor';
import {
  Eye,
  Code2,
  Sparkles,
  Briefcase,
  Cpu,
  Sparkles as SparklesIcon,
  Zap,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Trophy,
  Award,
  Terminal as TerminalIcon,
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

const TECH_CATEGORIES = [
  {
    title: 'FRONTEND ENGINEERING',
    skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'HTML5 & CSS3', 'Framer Motion', 'GSAP', 'Three.js'],
  },
  {
    title: 'BACKEND & DATABASE',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'WebSockets'],
  },
  {
    title: 'CORE & CS FUNDAMENTALS',
    skills: ['Java (J2SE)', 'Data Structures & Algorithms', 'Git & GitHub', 'Figma', 'System Design'],
  },
];

const TICKER_ITEMS = [
  'REACT.JS',
  'NEXT.JS',
  'JAVASCRIPT',
  'JAVA & DSA',
  'NODE.JS',
  'MONGODB',
  'TAILWIND CSS',
  'TYPESCRIPT',
  'GSAP',
  'FIGMA',
  'EXPRESS.JS',
  'GIT & GITHUB',
];

const EDUCATION_DATA = [
  {
    type: 'COLLEGE / UNIVERSITY DEGREE',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science with Specialization in Full Stack Development & Blockchain',
    institution: 'Shri Vaishnav Vidhyapeeth Vishwavidyalaya',
    duration: '2023 - 2027',
    status: 'PURSUING',
    icon: GraduationCap,
    highlights: [
      'Specialized in Software Architecture, Web Engineering, and Data Structures.',
      'Active developer & contributor in campus tech hackathons and coding events.',
      'Strong foundational mastery in Java, Object-Oriented Design, and Web Systems.',
    ],
  },
  {
    type: 'HIGH SCHOOL FOUNDATION',
    degree: 'Higher Secondary Education (12th Grade)',
    field: 'Science & Mathematics (PCM)',
    institution: 'Mount Carmel Hr.Sec School',
    duration: '2021 - 2023',
    status: 'COMPLETED',
    icon: BookOpen,
    highlights: [
      'Built a solid foundation in Mathematics, Analytical Logic, and Physics.',
      'Discovered passion for software, basic programming, and web technology.',
      'Excelled in computer science coursework and practical lab projects.',
    ],
  },
];

const HACKATHONS_AND_EXPERIENCES = [
  {
    badge: 'COLLEGE HACKATHON',
    title: '24-HOUR RAPID PROTOTYPING HACKATHON',
    role: 'Lead Frontend Developer & UI Architect',
    description: 'Collaborated in an intense 24-hour sprint to design and engineer a full-stack real-time web application solving real-world challenges under strict deadlines.',
    achievements: [
      'Crafted 100% of the interactive responsive frontend',
      'Integrated WebSockets for live data flow',
      'Engineered clean user flow & fluid UI motion',
    ],
    icon: Trophy,
  },
  {
    badge: 'COLLEGE ACADEMIC PROJECT',
    title: 'STUDEX - Student Management Platform',
    role: 'Creator & Lead Engineer',
    description: 'Built a modern, dynamic, and highly interactive online platform to simplify student lifecycle management for teachers, faculty, and administrators.',
    achievements: [
      'Manage student records, grades, assignments, and attendance.',
      'Real-time notifications and secure, role-based dashboards.',
      'Engineered clean user flow & fluid UI motion',
    ],
    icon: Award,
  },
];

export default function HomePage({ isLoading = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const foregroundRef = useRef(null);
  const backgroundRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [splashMode, setSplashMode] = useState('light');

  // Auto-scroll to #about if path or hash requests it
  useEffect(() => {
    if (location.hash === '#about' || location.pathname === '/about' || location.pathname === '/about-me') {
      const timer = setTimeout(() => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Screen size detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Entrance GSAP Animation on mount
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (navRef.current) {
        tl.fromTo(navRef.current, { opacity: 0, y: -25 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      const heroTargets = [foregroundRef.current, backgroundRef.current].filter(Boolean);
      if (heroTargets.length > 0) {
        tl.fromTo(
          heroTargets,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 },
          '-=0.3'
        );
      }

      const cards = gsap.utils.toArray('.home-card');
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform' },
          '-=0.35'
        );
      }

      const chips = gsap.utils.toArray('.home-chip');
      if (chips.length > 0) {
        tl.fromTo(
          chips,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, clearProps: 'transform' },
          '-=0.3'
        );
      }

      if (footerRef.current) {
        tl.fromTo(footerRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Parallax tracking
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

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

  // Z-Index layer management
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
    fragClamp: 16,
    fragHex: 17,
    fragCanvas: 18,
  });

  const [maxZIndex, setMaxZIndex] = useState(30);

  const bringToFront = (id) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setZIndices((prev) => ({ ...prev, [id]: nextZ }));
  };

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
  const duplicatedTicker = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS], []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-[#050507] text-white selection:bg-[#D4FF00] selection:text-black flex flex-col justify-between"
    >
      {/* TOP HERO CONTAINER (FULL SCREEN PLAYGROUND) */}
      <div className="relative w-full h-screen flex flex-col justify-between overflow-hidden shrink-0">
        {/* React Bits WebGL Splash Cursor (Desktop Only - Hero Section Only) */}
        {!isMobile && <SplashCursor {...activeSplashProps} />}

        {/* Top Navbar */}
        <div ref={navRef} className="w-full z-50">
          <Navbar />
        </div>

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

        {/* FULL-SCREEN DRAGGABLE PLAYGROUND LAYER */}
        <div className="absolute inset-0 pointer-events-auto z-20 overflow-hidden">
          <FloatingCard
            id="SIPVision"
            title="SIPVision"
            subtitle="PROJECT"
            icon={Eye}
            initialPos={isMobile ? { top: '15%', left: '5%' } : { top: '14%', left: '6.5%' }}
            zIndex={zIndices.SIPVision}
            onBringToFront={bringToFront}
            onDoubleClick={() => navigate('/project')}
            className="home-card"
          />

          <CodeChip
            id="chipAbsolute"
            code='<div className="absolute"/>'
            initialPos={isMobile ? { top: '10%', left: '48%' } : { top: '9%', left: '42%' }}
            zIndex={zIndices.chipAbsolute}
            onBringToFront={bringToFront}
            className="home-chip"
          />

          <FloatingCard
            id="Education"
            title="Education"
            icon={GraduationCap}
            initialPos={isMobile ? { top: '18%', left: '56%' } : { top: '14.5%', left: '65.5%' }}
            zIndex={zIndices.Education}
            onBringToFront={bringToFront}
            onDoubleClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
            className="home-card"
          />

          <CodeChip
            id="chipThree"
            code="import * as THREE"
            initialPos={isMobile ? { top: '34%', left: '4%' } : { top: '30.5%', left: '8.5%' }}
            zIndex={zIndices.chipThree}
            onBringToFront={bringToFront}
            className="home-chip"
          />

          <FloatingCard
            id="TechStack"
            title="TechStack"
            icon={Code2}
            initialPos={isMobile ? { top: '72%', left: '54%' } : { top: '41.5%', left: '79.5%' }}
            zIndex={zIndices.TechStack}
            onBringToFront={bringToFront}
            onDoubleClick={() => document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })}
            className="home-card"
          />

          <CodeChip
            id="badgeDelta"
            code="Δ"
            initialPos={isMobile ? { top: '42%', left: '82%' } : { top: '49.5%', left: '92%' }}
            zIndex={zIndices.badgeDelta}
            onBringToFront={bringToFront}
            className="home-chip"
          />

          <FloatingCard
            id="Abreonix"
            title="Abreonix"
            subtitle="EXPERIENCE"
            icon={Briefcase}
            initialPos={isMobile ? { top: '72%', left: '5%' } : { top: '69.5%', left: '26.5%' }}
            zIndex={zIndices.Abreonix}
            onBringToFront={bringToFront}
            onDoubleClick={() => navigate('/experience')}
            className="home-card"
          />

          <FloatingCard
            id="EnzoSkills"
            title="EnzoSkills"
            subtitle="PROJECT"
            icon={Cpu}
            initialPos={isMobile ? { top: '46%', left: '8%' } : { top: '61.5%', left: '75%' }}
            zIndex={zIndices.EnzoSkills}
            onBringToFront={bringToFront}
            onDoubleClick={() => navigate('/project')}
            className="home-card"
          />

          <CodeChip
            id="chipOpacity"
            code="{ opacity: 0.8 }"
            initialPos={isMobile ? { top: '82%', left: '52%' } : { top: '78.5%', left: '61%' }}
            zIndex={zIndices.chipOpacity}
            onBringToFront={bringToFront}
            className="home-chip"
          />

          {!isMobile && (
            <>
              <CodeChip
                id="fragClamp"
                code="GL_CLAMP_TO_EDGE"
                initialPos={{ top: '84%', left: '12%' }}
                zIndex={zIndices.fragClamp}
                onBringToFront={bringToFront}
                className="home-chip"
              />

              <CodeChip
                id="fragHex"
                code="0x7F"
                initialPos={{ top: '56%', left: '5%' }}
                zIndex={zIndices.fragHex}
                onBringToFront={bringToFront}
                className="home-chip"
              />

              <CodeChip
                id="fragCanvas"
                code="<Canvas />"
                initialPos={{ top: '82%', left: '44%' }}
                zIndex={zIndices.fragCanvas}
                onBringToFront={bringToFront}
                className="home-chip"
              />
            </>
          )}
        </div>

        {/* Footer Center Text & UX Guidance Hints */}
        <footer ref={footerRef} className="relative z-20 pb-6 sm:pb-8 text-center pointer-events-auto flex flex-col items-center space-y-2">
          <div className="inline-block font-display font-extrabold text-[10px] sm:text-xs md:text-xs tracking-[0.25em] text-[#D4FF00] uppercase hover:scale-105 transition-transform duration-200 cursor-default drop-shadow-[0_0_15px_rgba(212,255,0,0.4)]">
            DRAG CARDS FREELY • DOUBLE-CLICK TO EXPLORE ↗
          </div>
          <button
            onClick={scrollToAbout}
            className="group flex items-center space-x-1.5 text-[10px] font-mono-code text-zinc-400 hover:text-[#D4FF00] transition-colors cursor-pointer pt-1"
          >
            <span className="tracking-widest uppercase">SCROLL DOWN</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D4FF00] animate-bounce" />
          </button>
        </footer>

        {/* Bottom Right Splash Mode Toggle */}
        {/* <div className="hidden md:block fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto">
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
        </div> */}
      </div>

      {/* ========================================================================= */}
      {/* MERGED ABOUT & BIO SECTION (SCROLLABLE UNDERNEATH HERO) */}
      {/* ========================================================================= */}
      <section
        id="about"
        className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#07080c] border-t border-zinc-800/80 z-30 pointer-events-auto"
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#D4FF00]/5 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28">
          
          {/* 1. WHO I AM // BIO HEADER */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 font-mono-code text-[11px] text-[#D4FF00] tracking-widest uppercase bg-[#D4FF00]/10 px-3.5 py-1.5 rounded-full border border-[#D4FF00]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
              <span>01 // WHO I AM</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-none text-white">
                  CREATIVE <span className="text-[#D4FF00]">DEVELOPER</span> & FRONTEND ARCHITECT.
                </h2>
                <p className="font-mono-code text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
                  I specialize in crafting high-impact, interactive web applications that blur the boundary between engineering and digital art. Driven by a deep passion for modern frontend technology (React, Next.js, GSAP, WebGL), paired with rigorous foundational mastery in Java and Data Structures & Algorithms.
                </p>
                <p className="font-mono-code text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Every motion is calculated, every component modularized, and every pixel engineered with mathematical precision.
                </p>
              </div>

              {/* Bio Highlights Quick Card */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl shadow-2xl space-y-4">
                <div className="font-mono-code text-xs font-bold text-[#D4FF00] tracking-widest uppercase flex items-center space-x-2">
                  <TerminalIcon className="w-4 h-4 text-[#D4FF00]" />
                  <span>DEV_IDENTITY // OVERVIEW</span>
                </div>
                <div className="space-y-3 font-mono-code text-xs text-zinc-300">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">LOCATION</span>
                    <span className="font-bold text-white">INDIA</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">DEGREE</span>
                    <span className="font-bold text-cyan-400">B.TECH (CSE)</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">FOCUS</span>
                    <span className="font-bold text-[#D4FF00]">FRONTEND & CORE CS</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-zinc-500">INTERNSHIP</span>
                    <span className="font-bold text-white">DEVELOPER INTERN @ ABREONIX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. TECH STACKS & MATRIX */}
          <div id="tech-stack" className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 font-mono-code text-[11px] text-cyan-400 tracking-widest uppercase bg-cyan-400/10 px-3.5 py-1.5 rounded-full border border-cyan-400/30">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>02 // TECH STACKS & SKILLS</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                ENGINEERING TOOLS & PARADIGMS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TECH_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-[#D4FF00]/50 transition-all duration-200 space-y-4 group"
                >
                  <div className="font-mono-code text-xs font-extrabold text-[#D4FF00] tracking-widest uppercase border-b border-zinc-800 pb-3 group-hover:text-cyan-400 transition-colors">
                    {cat.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono-code text-xs font-semibold hover:border-[#D4FF00] hover:text-[#D4FF00] hover:scale-105 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Marquee Ticker */}
            <div className="w-full bg-black py-4 sm:py-6 rounded-2xl border border-zinc-800 overflow-hidden select-none">
              <div className="animate-marquee flex items-center whitespace-nowrap gpu-accelerated">
                {duplicatedTicker.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 mx-4">
                    <span className="font-display font-black text-2xl sm:text-4xl text-[#D4FF00] tracking-tight uppercase">
                      {item}
                    </span>
                    <span className="text-xl text-zinc-700 font-mono-code">★</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. ACADEMIC DEGREE & EDUCATION */}
          <div id="education" className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 font-mono-code text-[11px] text-[#D4FF00] tracking-widest uppercase bg-[#D4FF00]/10 px-3.5 py-1.5 rounded-full border border-[#D4FF00]/30">
                <GraduationCap className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>03 // ACADEMIC & EDUCATION</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                COLLEGE & HIGHER SECONDARY JOURNEY
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {EDUCATION_DATA.map((edu, idx) => {
                const IconComponent = edu.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 space-y-5 relative overflow-hidden group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-mono-code text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
                          {edu.type}
                        </span>
                        <h4 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight uppercase">
                          {edu.degree}
                        </h4>
                        <div className="font-mono-code text-xs text-[#D4FF00] font-semibold">
                          {edu.field}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-800 text-[#D4FF00] group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-mono-code text-xs text-zinc-400 border-t border-b border-zinc-800/80 py-2.5">
                      <span className="font-bold text-zinc-200">{edu.institution}</span>
                      <span className="bg-zinc-800 px-2.5 py-1 rounded text-cyan-300 font-bold">
                        {edu.duration}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start space-x-2.5 font-mono-code text-xs text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. COLLEGE HACKATHONS & FEATURED COLLEGE PROJECTS */}
          <div id="projects-section" className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 font-mono-code text-[11px] text-cyan-400 tracking-widest uppercase bg-cyan-400/10 px-3.5 py-1.5 rounded-full border border-cyan-400/30">
                <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                <span>04 // HACKATHONS & COLLEGE PROJECTS</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                COLLEGE EXPERIENCES & BUILD HIGHLIGHTS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {HACKATHONS_AND_EXPERIENCES.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-[#D4FF00]/50 transition-all duration-300 space-y-5 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-mono-code text-[10px] font-bold text-[#D4FF00] tracking-widest uppercase bg-[#D4FF00]/10 px-2.5 py-0.5 rounded border border-[#D4FF00]/30 inline-block">
                          {item.badge}
                        </span>
                        <h4 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight uppercase pt-1">
                          {item.title}
                        </h4>
                        <div className="font-mono-code text-xs text-cyan-400 font-bold">
                          {item.role}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-800 text-cyan-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                    </div>

                    <p className="font-mono-code text-xs text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-zinc-800">
                      <div className="font-mono-code text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        KEY HIGHLIGHTS
                      </div>
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-center space-x-2 font-mono-code text-xs text-zinc-300">
                          <span className="text-[#D4FF00] font-bold">➢</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION FOOTER CTA */}
          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between font-mono-code text-xs text-zinc-500 space-y-4 sm:space-y-0">
            <div>VIDHI AGRAWAL // PORTFOLIO 2026</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[#D4FF00] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

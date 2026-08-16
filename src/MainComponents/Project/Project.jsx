import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import Navbar from '../../Utilities/Navbar';
import ProjectDetail from './ProjectDetail';
import {
  GraduationCap,
  GitMerge,
  Eye,
  Box,
  ArrowUpRight,
  CheckCircle2,
  Info,
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PROJECTS_DATA = [
  {
    id: 'enzo-skills',
    title: 'EnzoSkills',
    titlePart1: 'ENZO',
    titlePart2: 'SKILLS',
    category: ['FULLSTACK', 'AI'],
    subtitle: 'Skill Development Platform',
    description:
      'A comprehensive and interactive platform designed to facilitate skill development and collaborative learning environments.',
    icon: GraduationCap,
    image: '/Enzoskills/HomePage.png',
    images: [
      '/Enzoskills/HomePage.png',
      '/Enzoskills/Dashboard.png',
      '/Enzoskills/Aboutus.png',
    ],
    tech: ['REACT', 'NEXT.JS', 'TAILWIND CSS'],
    metrics: ['Live Skill Tracking', 'Custom Learning Paths', 'Progress Analytics', 'Real-time Dashboards'],
    featured: true,
    github: 'https://github.com/Codomania-Legends/EnzoSkills.git',
    demo: 'https://enzo-skills.vercel.app',
    challenge:
      'EnzoSkills was created to revolutionize developer education by solving the fragmented learning experience. Existing tools in the market were cluttered and failed to provide hands-on, real-time feedback for engineers. The challenge was building an ultra-fast, responsive dashboard capable of tracking live skill nodes, code execution progress, and collaborative coding rooms without UI bottlenecks.',
    architectureIntro:
      'Leveraging Next.js for server-side rendering and static asset generation, EnzoSkills ensures lightning-fast initial load times. The UI is constructed with a bespoke Tailwind CSS v4 configuration, translating brutalist design principles into a functional interface.',
    architectureBullets: [
      {
        label: 'State Management',
        detail: 'Implemented Zustand & React Context state logic to handle live learning node updates smoothly.',
      },
      {
        label: 'Interactive Code Lab',
        detail: 'Integrated Monaco Editor & Web Workers to evaluate client-side code exercises in sandbox environments.',
      },
      {
        label: 'Performance',
        detail: 'Achieved a 99 Lighthouse score through rigorous code splitting and asset optimization.',
      },
    ],
    quote:
      'EnzoSkills fundamentally transformed how our tech cohort monitors skill progression. The brutalist interface forces focus directly on key learning nodes.',
    quoteAuthor: 'SENIOR TECH LEAD',
  },
  {
    id: 'contri-zee',
    title: 'ContriZee',
    titlePart1: 'CONTRI',
    titlePart2: 'ZEE',
    category: 'OPEN SOURCE',
    subtitle: 'Contribution Tracking System',
    description:
      'A streamlined platform designed to track, manage, and gamify open-source contributions for developer communities.',
    icon: GitMerge,
    image: '/Contrizee/Summary.png',
    images: [
      '/Contrizee/Summary.png',
      '/Contrizee/Tripcreation.png',
      '/Contrizee/cleardept.png',
    ],
    tech: ['REACT', 'TYPESCRIPT', 'MONGODB'],
    metrics: ['AI-Powered Reminders', 'Live Currency Conversion', 'Instant UPI QR', 'Seamless Settlements'],
    featured: true,
    github: 'https://github.com/Codomania-Legends/ContriZee.git',
    demo: 'https://contri-zee.vercel.app',
    challenge:
      'Managing open-source bounties, tracking team contributions, and settling micro-payments across international teams often results in administrative friction. ContriZee was built to automate contribution tracking, gamify pull-request reviews, and streamline instant UPI settlements for open-source communities.',
    architectureIntro:
      'Constructed on a high-throughput React & TypeScript frontend paired with Express and MongoDB, ContriZee delivers sub-second dashboard synchronization.',
    architectureBullets: [
      {
        label: 'Contribution Heatmap',
        detail: 'Built custom SVG & D3 wrappers to log GitHub commits and PR reviews in real-time.',
      },
      {
        label: 'Live Settlement System',
        detail: 'Integrated instant UPI QR code generation and automated payment reconciliation.',
      },
      {
        label: 'Automated Reminders',
        detail: 'Cron-driven AI assistant notifying team members of pending code reviews and open bounties.',
      },
    ],
    quote:
      'ContriZee made open-source contribution tracking effortless and transparent. The instant UPI settlements cut payout times by 90%.',
    quoteAuthor: 'OPEN SOURCE MAINTAINER',
  },
  {
    id: 'sipvision',
    title: 'SIPVision',
    titlePart1: 'SIP',
    titlePart2: 'VISION',
    category: 'AI',
    subtitle: 'Computer Vision Telemetry',
    description:
      'AI-powered Computer Vision & Real-time Telemetry Suite processing live video feeds with sub-30ms object detection and analytics.',
    icon: Eye,
    image: '/Sipvision/home.png',
    images: [
      '/Sipvision/home.png',
      '/Sipvision/detail.png',
      '/Sipvision/form.png',
    ],
    tech: ['REACT', 'NEXT.JS', 'TAILWIND'],
    metrics: ['30ms Latency', '99.4% Accuracy', 'Dynamic Visualizations'],
    featured: true,
    github: 'https://github.com/Codomania-Legends/SIPVision.git',
    demo: 'https://sip-vision.vercel.app',
    challenge:
      'SIPVision is an innovative project designed to streamline and enhance the visualization of complex network protocols. The existing tools in the market were cluttered, unintuitive, and failed to provide real-time, actionable insights for network engineers. The challenge was to build a highly performant, visually stark dashboard capable of parsing massive data streams without dropping frames, all while adhering to a strict, modern design system.',
    architectureIntro:
      'Leveraging the power of Next.js for server-side rendering and static site generation, SIPVision ensures lightning-fast initial load times. The UI is constructed with a bespoke Tailwind CSS configuration, translating brutalist design principles into a functional interface.',
    architectureBullets: [
      {
        label: 'State Management',
        detail: 'Implemented complex state logic to handle real-time WebSocket data updates smoothly.',
      },
      {
        label: 'Data Visualization',
        detail: 'Custom D3.js wrappers to render massive datasets in highly customized, interactive charts.',
      },
      {
        label: 'Performance',
        detail: 'Achieved a 99 Lighthouse score through rigorous code splitting and asset optimization.',
      },
    ],
    quote:
      'SIPVision fundamentally changed how we monitor our SIP trunks. The brutalist interface isn\'t just an aesthetic choice; it forces focus on the critical data.',
    quoteAuthor: 'LEAD NETWORK ENGINEER',
  },
  {
    id: 'craft-rume',
    title: 'CraftRume',
    titlePart1: 'CRAFT',
    titlePart2: 'RUME',
    category: 'UTILITY',
    subtitle: 'Professional Resume Builder',
    description:
      'A dynamic and intuitive resume builder designed to help users craft professional and visually appealing resumes with ease.',
    icon: Box,
    image: '/Craftrume/home.png',
    images: [
      '/Craftrume/home.png',
      '/Craftrume/templete.png',
      '/Craftrume/about.png',
    ],
    tech: ['REACT', 'TAILWIND', 'VITE'],
    metrics: ['Dynamic UI', 'Responsive Design', 'Template Library'],
    featured: true,
    github: 'https://github.com/VidhiAgrawa/Craft-Rume.git',
    demo: 'https://craft-rume.vercel.app',
    challenge:
      'CraftRume addresses the frustration of rigid, outdated resume builders. Job seekers needed a flexible, design-forward tool allowing real-time document styling, instant PDF compilation, and template switching without losing typed content or layout formatting.',
    architectureIntro:
      'Developed with React, Vite, and Framer Motion for liquid 60fps animations and instant vector PDF exports.',
    architectureBullets: [
      {
        label: 'Real-Time Preview',
        detail: 'Built a dual-pane canvas system syncing form inputs to print-ready CSS PDF layouts instantly.',
      },
      {
        label: 'Template Engine',
        detail: 'Modular React template architecture supporting modern, minimal, and brutalist document styles.',
      },
      {
        label: 'Export Engine',
        detail: 'Client-side HTML-to-PDF rendering engine producing crisp vector text documents ready for ATS scanners.',
      },
    ],
    quote:
      'CraftRume allowed me to build a standout, ATS-friendly resume in under 10 minutes. The real-time preview is unmatched.',
    quoteAuthor: 'CREATIVE DIRECTOR',
  },
];

const CATEGORIES = ['ALL', 'FULLSTACK', 'OPEN SOURCE', 'AI', 'UTILITY'];

export default function Project() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        '.project-tag',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
        .fromTo(
          '.project-title-text',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 },
          '-=0.2'
        )
        .fromTo(
          '.project-cat-btn',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.02 },
          '-=0.2'
        )
        .fromTo(
          '.project-card',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, clearProps: 'transform' },
          '-=0.2'
        )
        .fromTo(
          '.project-card-text',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.02, clearProps: 'transform' },
          '-=0.25'
        )
        .fromTo(
          '.project-footer',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, clearProps: 'transform' },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'ALL'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter((p) =>
            Array.isArray(p.category)
              ? p.category.includes(activeCategory)
              : p.category === activeCategory
          ),
    [activeCategory]
  );

  return (
    <section
      ref={containerRef}
      id="project"
      className="relative min-h-screen w-full bg-[#050507] text-white py-28 px-6 md:px-16 overflow-x-hidden border-t border-zinc-900"
    >
      {/* Top Navbar */}
      <Navbar />

      {/* Background Subtle Grid & Neon Glow */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#D4FF00]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 pt-10 pb-20">
        {/* Section Header */}
        <div className="project-header flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="project-tag inline-flex items-center space-x-2 font-mono-code text-xs text-[#D4FF00] tracking-widest uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
              <span>// FEATURED WORKS & PROJECTS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white leading-tight">
              <div className="project-title-text">CRAFTED WITH</div>
              <div className="project-title-text text-[#D4FF00]">PRECISION.</div>
            </h2>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`project-cat-btn px-4 py-2 rounded-xl text-xs font-mono-code font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-[#D4FF00]/10 border-[#D4FF00] text-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.15)]'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MAIN GRID VIEW (Restored Original Project Card Layout & Styling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const IconComp = project.icon;

            return (
              <div
                key={project.id}
                className="project-card glass-card rounded-2xl p-6 md:p-7 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-200 relative overflow-hidden"
              >
                {/* Subtle Top Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4FF00]/10 rounded-full blur-2xl group-hover:bg-[#D4FF00]/25 transition-all duration-300" />

                <div>
                  {/* Header: Icon & Category Badges */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/40 flex items-center justify-center text-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(212,255,0,0.15)]">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {Array.isArray(project.category) ? (
                        project.category.map((cat) => (
                          <span
                            key={cat}
                            className="font-mono-code text-[10px] tracking-widest text-[#D4FF00] bg-[#D4FF00]/10 px-2.5 py-0.5 rounded-full border border-[#D4FF00]/30 uppercase"
                          >
                            {cat}
                          </span>
                        ))
                      ) : (
                        <span className="font-mono-code text-[10px] tracking-widest text-[#D4FF00] bg-[#D4FF00]/10 px-3 py-1 rounded-full border border-[#D4FF00]/30 uppercase">
                          {project.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="project-card-text font-display font-extrabold text-2xl text-white group-hover:text-[#D4FF00] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <div className="project-card-text font-mono-code text-xs text-zinc-400 mb-4">
                    {project.subtitle}
                  </div>

                  {/* Description */}
                  <p className="project-card-text text-zinc-300 text-xs md:text-sm font-mono-code leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-1.5 bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-zinc-800 text-[11px] font-mono-code text-zinc-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#D4FF00]" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-zinc-800/80">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono-code text-zinc-400 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer Actions: VIEW DETAILS & Links */}
                  <div className="flex items-center justify-between pt-2 gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#D4FF00]/10 hover:bg-[#D4FF00] text-[#D4FF00] hover:text-black border border-[#D4FF00]/40 font-mono-code text-[11px] font-bold tracking-wider uppercase flex items-center space-x-1.5 transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(212,255,0,0.1)]"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>VIEW DETAILS</span>
                    </button>

                    <div className="flex items-center space-x-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors p-1"
                        title="Source Code"
                      >
                        <GithubIcon className="w-4 h-4 fill-current" />
                      </a>

                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D4FF00] hover:scale-110 transition-transform p-1"
                        title="Live Demo"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Section Footer Banner */}
        <div className="project-footer mt-16 sm:mt-24 p-6 sm:p-10 md:p-12 rounded-2xl bg-[#0b0c10] border border-zinc-800/80 relative overflow-hidden group shadow-2xl">
          {/* Neon Corner Accents */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4FF00] opacity-80" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4FF00] opacity-80" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 font-mono-code text-[11px] text-[#D4FF00] tracking-widest uppercase mb-3 bg-[#D4FF00]/10 px-3 py-1 rounded-full border border-[#D4FF00]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
                <span>EXPERIENCE_GAINED</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight uppercase mb-3">
                BUILDING TO LEARN. LEARNING TO EXCEL.
              </h3>
              <p className="font-mono-code text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Every project featured in this showcase represents a core milestone in my engineering growth. From architecting complex full-stack applications and integrating custom AI models to optimizing real-time 60 FPS graphics, constructing these solutions provided hands-on experience in problem solving, UI performance optimization, and scalable code design.
              </p>
            </div>

            {/* Micro Feature Pills */}
            <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
              <div className="px-3.5 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono-code text-zinc-300 flex items-center space-x-2">
                <span className="text-[#D4FF00]">✓</span>
                <span>HANDS-ON ARCHITECTURE</span>
              </div>
              <div className="px-3.5 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono-code text-zinc-300 flex items-center space-x-2">
                <span className="text-cyan-400">✓</span>
                <span>REAL-WORLD PROBLEM SOLVING</span>
              </div>
              <div className="px-3.5 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono-code text-zinc-300 flex items-center space-x-2">
                <span className="text-[#D4FF00]">✓</span>
                <span>PERFORMANCE OPTIMIZATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEPARATED PROJECT DETAIL MODAL COMPONENT */}
      <ProjectDetail
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

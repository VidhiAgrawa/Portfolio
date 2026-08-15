import React, { useEffect } from 'react';
import { X, Play, ArrowUpRight } from 'lucide-react';

export default function ProjectDetail({ selectedProject, onClose }) {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050507]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10">
      {/* Close button top right */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700 hover:border-[#D4FF00] text-zinc-300 hover:text-[#D4FF00] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl group"
        title="Close Modal"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
      </button>

      <div className="w-full max-w-6xl mx-auto my-auto relative z-10 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* COLUMN 1: Vertical Stack of Images (Desktop Only - Hidden on Mobile Size) */}
          <div className="hidden lg:block lg:col-span-6 space-y-6">
            {selectedProject.images && selectedProject.images.length > 0 ? (
              selectedProject.images.map((imgUrl, imgIdx) => (
                <div
                  key={imgIdx}
                  className="relative glass-card rounded-2xl overflow-hidden border-2 border-zinc-800 hover:border-[#D4FF00]/60 transition-colors shadow-2xl group bg-zinc-950"
                >
                  <img
                    src={imgUrl}
                    alt={`${selectedProject.title} screenshot ${imgIdx + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                  />
                </div>
              ))
            ) : (
              <div className="relative glass-card rounded-2xl overflow-hidden border-2 border-zinc-800 hover:border-[#D4FF00]/60 transition-colors shadow-2xl group bg-zinc-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                />
              </div>
            )}
          </div>

          {/* COLUMN 2: Sticky Description & Details Column */}
          <div className="lg:col-span-6 space-y-7 lg:sticky lg:top-10">
            {/* Huge Dual-Tone Brutalist Title */}
            <div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-none">
                <span className="text-white block">{selectedProject.titlePart1}</span>
                <span className="text-[#D4FF00] block mt-1">{selectedProject.titlePart2}</span>
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-lg bg-[#D4FF00] text-black font-display font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2 hover:bg-[#bce400] transition-colors shadow-[0_0_20px_rgba(212,255,0,0.3)] cursor-pointer"
                >
                  <span>LIVE PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-lg bg-zinc-900/90 border border-zinc-700 hover:border-[#D4FF00] text-white font-mono-code font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>SOURCE CODE &lt;&gt;</span>
                </a>
              </div>
            </div>

            {/* Section 1: THE CHALLENGE */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center space-x-2 font-display font-bold text-sm tracking-wider text-[#D4FF00] uppercase">
                <span>— THE CHALLENGE</span>
              </div>
              <p className="text-zinc-300 font-mono-code text-xs sm:text-sm leading-relaxed">
                {selectedProject.challenge}
              </p>
            </div>

            {/* Section 2: THE ARCHITECTURE */}
            <div className="space-y-3.5 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center space-x-2 font-display font-bold text-sm tracking-wider text-[#D4FF00] uppercase">
                <span>— THE ARCHITECTURE</span>
              </div>
              <p className="text-zinc-300 font-mono-code text-xs sm:text-sm leading-relaxed">
                {selectedProject.architectureIntro}
              </p>

              <ul className="space-y-2 font-mono-code text-xs sm:text-sm text-zinc-300">
                {selectedProject.architectureBullets &&
                  selectedProject.architectureBullets.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <span className="text-[#D4FF00] font-bold mt-0.5">▪</span>
                      <span>
                        <strong className="text-white">{item.label}: </strong>
                        {item.detail}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Testimonial Quote Box */}
            <div className="glass-card rounded-xl p-5 md:p-6 border border-zinc-800 bg-zinc-900/60 shadow-xl space-y-3">
              <p className="font-mono-code text-xs sm:text-sm italic text-zinc-200 leading-relaxed">
                "{selectedProject.quote}"
              </p>
              <div className="font-mono-code text-[11px] font-bold tracking-widest text-[#D4FF00] uppercase">
                — {selectedProject.quoteAuthor}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

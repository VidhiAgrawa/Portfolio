import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME', path: '/' },
  { name: 'PROJECTS', path: '/project' },
  { name: 'EXPERIENCE', path: '/experience' },
  { name: 'ABOUT', path: '/about' },
  { name: 'TERMINAL', path: '/terminal' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between pointer-events-auto">
      {/* Left Logo / Tag */}
      <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
        <div className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
        <span className="font-mono-code text-[11px] sm:text-xs tracking-widest text-zinc-400 group-hover:text-white uppercase transition-colors">
          Vidhi Agrawal <span className="text-zinc-600">//</span> <span className="hidden sm:inline">Portfolio</span>
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.path === '/project'
              ? location.pathname === '/project' || location.pathname === '/projects'
              : location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs lg:text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
                isActive ? 'text-[#D4FF00]' : 'text-zinc-300 hover:text-[#D4FF00]'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Hamburger Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black transition-all cursor-pointer shadow-lg"
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Glassmorphic Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-[#050507]/95 backdrop-blur-2xl z-50 flex flex-col p-6 space-y-4 border-t border-zinc-800 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.path === '/project'
                ? location.pathname === '/project' || location.pathname === '/projects'
                : location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-4 rounded-xl border font-mono-code text-sm font-bold tracking-widest uppercase transition-all ${
                  isActive
                    ? 'bg-[#D4FF00]/10 border-[#D4FF00] text-[#D4FF00]'
                    : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-300 hover:text-[#D4FF00] hover:border-zinc-700'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex items-center justify-between pointer-events-auto">
      {/* Left Logo / Tag */}
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
        <span className="font-mono-code text-xs tracking-widest text-zinc-400 group-hover:text-white uppercase transition-colors">
          Vidhi Agrawal <span className="text-zinc-600">//</span> Portfolio
        </span>
      </Link>

      {/* Right Navigation Links using React Router Link */}
      <nav className="flex items-center space-x-8 md:space-x-12">
        <Link
          to="/"
          className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
            location.pathname === '/' ? 'text-[#D4FF00]' : 'text-zinc-300 hover:text-[#D4FF00]'
          }`}
        >
          HOME
        </Link>

        <Link
          to="/project"
          className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
            location.pathname === '/project' || location.pathname === '/projects'
              ? 'text-[#D4FF00]'
              : 'text-zinc-300 hover:text-[#D4FF00]'
          }`}
        >
          PROJECTS
        </Link>

        <Link
          to="/experience"
          className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
            location.pathname === '/experience' ? 'text-[#D4FF00]' : 'text-zinc-300 hover:text-[#D4FF00]'
          }`}
        >
          EXPERIENCE
        </Link>

        <Link
          to="/about"
          className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
            location.pathname === '/about' ? 'text-[#D4FF00]' : 'text-zinc-300 hover:text-[#D4FF00]'
          }`}
        >
          ABOUT
        </Link>

        <Link
          to="/terminal"
          className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
            location.pathname === '/terminal' ? 'text-[#D4FF00]' : 'text-zinc-300 hover:text-[#D4FF00]'
          }`}
        >
          TERMINAL
        </Link>
      </nav>
    </header>
  );
}

import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import HomePage from './MainComponents/HomePage/HomePage';
import Project from './MainComponents/Project/Project';
import Experience from './MainComponents/Experience/Experience';
import About from './MainComponents/About-me/About';
import Terminal from './MainComponents/Terminal/Terminal';
import Loading from './Utilities/Loading';

function LoadingRoute() {
  const navigate = useNavigate();
  return <Loading onComplete={() => navigate('/')} />;
}

// In-memory module flag that is true ONLY on fresh browser window load/reload
let isInitialWindowLoad = true;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isInitialWindowLoad) {
      isInitialWindowLoad = false;
      if (location.pathname !== '/loading') {
        navigate('/loading', { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="w-full min-h-screen bg-[#050507] text-white selection:bg-[#D4FF00] selection:text-black overflow-x-hidden overflow-y-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingRoute />} />
        <Route path="/project" element={<Project />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-me" element={<About />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/contact" element={<Terminal />} />
      </Routes>
    </div>
  );
}

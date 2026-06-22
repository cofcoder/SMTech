import React, { useState, useEffect } from 'react';
import Helmet from './components/Helmet.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Gallery from './components/Gallery.tsx';
import About from './components/About.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
import CommandPalette from './components/CommandPalette.tsx';
import SVGLogo from './components/SVGLogo.tsx';
import { Terminal, Shield, Cpu, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Synchronize design theme on initial boot
  useEffect(() => {
    // We want default dark theme (it is super modern and high-performance looking)
    const storedTheme = localStorage.getItem('smtech-theme');
    const prefersLight = storedTheme === 'light';
    
    if (prefersLight) {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('smtech-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('smtech-theme', 'light');
    }
  };

  // Global listener for Cmd+K and Ctrl+K command menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-[#070913] dark:text-slate-100 min-h-screen font-sans transition-colors duration-300 relative selection:bg-indigo-500 selection:text-white w-full max-w-full overflow-x-hidden">
      
      {/* Dynamic Document Head SEO/Meta Controller */}
      <Helmet />

      {/* Dynamic Floating Command Palette modal */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
        toggleTheme={toggleTheme} 
      />

      {/* Floating Head Header Navigation Bar */}
      <Header 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
        onOpenCommandPalette={() => setCommandPaletteOpen(true)} 
      />

      {/* Grid Alignment Backbone styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_75%,transparent_100%)] pointer-events-none z-0" />

      {/* Main Structural container blocks */}
      <main className="relative z-10">
        
        {/* HERO HEADER REGION */}
        <Hero />

        {/* GALLERIES PORTFOLIO REGION */}
        <Gallery />

        {/* ABOUT PROFILE BENTO REGION */}
        <About />

        {/* PROJECTS REGION */}
        <Projects />

        {/* SECURE DIRECTORY CONTACT REGION */}
        <Contact />

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/60 dark:border-gray-800/60 py-12 bg-white/40 dark:bg-[#090c17]/30 backdrop-blur-sm relative z-10 text-left text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2.5">
            <SVGLogo size={28} />
            <div className="flex flex-col">
              <span className="font-extrabold text-[13px] bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                SMTech Systems Corp.
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                Active Client Hydration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
            <Cpu size={12} className="text-cyan-500" />
            <span>Compiled with Vite • React 19 • TailwindCSS v4 v4.1.14</span>
          </div>

          <p className="text-slate-400 font-mono text-[10px]">
            © {new Date().getFullYear()} SMTech. All rights reserved. London/Trowbridge UK.
          </p>

        </div>
      </footer>

    </div>
  );
}

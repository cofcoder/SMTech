import React, { useState, useEffect } from 'react';
import SVGLogo from './SVGLogo.tsx';
import { Search, Sun, Moon, Menu, X, Terminal } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onOpenCommandPalette: () => void;
}

export default function Header({ darkMode, toggleTheme, onOpenCommandPalette }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Systems Gallery", href: "#gallery" },
    { name: "Philosophy Profile", href: "#about" },
    { name: "Project Showroom", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-305 ${
        scrolled
          ? "bg-white/80 dark:bg-[#070913]/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <SVGLogo size={38} className="transform group-hover:rotate-12 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-sans">
                SMTech
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase leading-none font-bold">
                FREELANCE WEB DEVELOPER
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links Container */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action buttons (Command palette trig, Dark mode switch, Mobile drawer) */}
          <div className="flex items-center gap-2">
            
            {/* Search command bar trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="p-1 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-gray-800 rounded-lg flex items-center gap-2 transition-all group"
              title="Activate search workspace"
            >
              <Search size={13} className="group-hover:text-indigo-500 transition-colors" />
              <span className="text-[11px] font-medium hidden sm:inline">Commands</span>
              <kbd className="bg-white dark:bg-gray-900 px-1 py-0.2 rounded border border-slate-300 dark:border-gray-700 text-[9px] font-mono text-slate-400 shadow-sm">
                ⌘K
              </kbd>
            </button>

            {/* Dark & Light System Mode switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 border border-slate-200 dark:border-gray-800/40 rounded-lg transition-all"
              aria-label="Toggle Design Color Palette"
              id="theme-toggler-btn"
            >
              {darkMode ? (
                <Sun size={15} className="animate-spin-slow" />
              ) : (
                <Moon size={15} />
              )}
            </button>

            {/* Mobile Drawer trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/65 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawers */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-[#0c0f1d]/95 backdrop-blur-lg border-b border-slate-200 dark:border-gray-800 shadow-2xl py-4 px-6 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-slate-700 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 text-sm font-semibold transition-colors py-1.5 border-b border-slate-100 dark:border-gray-800/40"
              >
                {link.name}
              </a>
            ))}
            
            {/* Quick stats for mobile */}
            <div className="flex items-center gap-1.5 pt-2 text-[10px] text-slate-400 font-mono">
              <Terminal size={12} className="text-indigo-500" />
              <span>SYSTEM ENTRANCE DIRECTORIES REGISTERED</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

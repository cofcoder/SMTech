import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, User, FolderGit2, Mail, SunMoon, CircleHelp, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
}

export default function CommandPalette({ isOpen, onClose, toggleTheme }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearch("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const items = [
    {
      id: 'gallery',
      name: 'Go to Systems Gallery',
      desc: 'View WebP optimized diagnostic system mockups and architecture assets',
      icon: <Compass size={16} className="text-indigo-500" />,
      action: () => {
        const el = document.getElementById('gallery');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'about',
      name: 'Go to Systems Profile (About)',
      desc: 'About SMTech, local UK timezone clock, philosophy, bento layout and skill matrices',
      icon: <User size={16} className="text-cyan-500" />,
      action: () => {
        const el = document.getElementById('about');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'projects',
      name: 'Go to Project Showroom',
      desc: 'Browse multi-region collaborative tools and open-source packages',
      icon: <FolderGit2 size={16} className="text-amber-500" />,
      action: () => {
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'contact',
      name: 'Go to Contact Interface',
      desc: 'Instantiate transactional message payload and consult social pipeline coordinates',
      icon: <Mail size={16} className="text-emerald-500" />,
      action: () => {
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'theme',
      name: 'Switch Design Mode (Light / Dark)',
      desc: 'Invert high-contrast color scheme, preserving in-memory local preferences',
      icon: <SunMoon size={16} className="text-fuchsia-500" />,
      action: () => {
        toggleTheme();
        onClose();
      }
    }
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      id="command-menu-overlay"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#070913]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Main command palette modal box */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0c0f1d] border border-slate-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search header container */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-gray-800/80">
          <Search size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command to execute..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none text-sm font-sans"
          />
          <kbd className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-gray-700 text-[10px] font-mono text-slate-400 dark:text-gray-500 shadow-sm hidden sm:inline-block">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X size={15} />
          </button>
        </div>

        {/* List items */}
        <div className="max-h-[340px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
              <CircleHelp size={28} className="text-slate-350 dark:text-slate-600 mb-2 animate-bounce" />
              <p className="text-xs font-sans">No matching commands discovered in this namespace.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 pl-3">SYSTEM COMMANDS</span>
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full text-left p-3 rounded-lg flex items-start gap-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all"
                >
                  <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-650/15 group-hover:text-indigo-500 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 self-center">
                    ↵ RUN
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="bg-slate-50 dark:bg-[#070913]/30 px-4 py-2.5 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1">
            <kbd className="px-1 py-0.2 rounded bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800">⌘K</kbd>
            <span>or</span>
            <kbd className="px-1 py-0.2 rounded bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800">Ctrl+K</kbd>
            <span className="ml-1">to toggle menu</span>
          </div>
          <span>Active Session Trowbridge UK</span>
        </div>

      </div>
    </div>
  );
}

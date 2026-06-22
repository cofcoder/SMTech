import React from 'react';
import InteractiveKanban from './InteractiveKanban.tsx';
import { Sparkles, Terminal, ArrowRight, Kanban, Laptop, Workflow } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-36 lg:pb-24 flex flex-col lg:flex-row items-stretch justify-between gap-8 z-10"
    >
      
      {/* Visual background details */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-fuchsia-500/10 blur-3xl rounded-full -z-10 pointer-events-none" />

      {/* Hero Text details in a gorgeous Bento layout card */}
      <div className="flex-1 bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="z-10 space-y-6">
          {/* Availability Badge tag */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider animate-pulse">
            <Sparkles size={11} className="mr-1.5" />
            // Active Developer Showroom
          </span>

          {/* Dynamic Display Header */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-slate-900 dark:text-white">
            We build the future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">collaborative</span> <br/>
            software.
          </h1>

          {/* Short, elegant synopsis */}
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
            SMTech designs low-allocating web engines, WebP-optimized media pipelines, and elegant bento layouts. Every pixel here represents high performance, fluid state handling, and keyboard-first system utility.
          </p>

          {/* Features / Achievements Bullet grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Terminal size={14} className="text-indigo-500 shrink-0" />
              <span className="font-sans">Optimized WebP Assets</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Workflow size={14} className="text-cyan-500 shrink-0" />
              <span className="font-sans">Interactive State Flow</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Laptop size={14} className="text-amber-500 shrink-0" />
              <span className="font-sans">Keyboard Command Palette</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Sparkles size={14} className="text-pink-500 shrink-0" />
              <span className="font-sans">Bento Mesh Layouts</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollToSection('gallery')}
              className="px-6 py-3 bg-indigo-600 dark:bg-white text-white dark:text-black font-extrabold rounded-lg hover:bg-indigo-550 dark:hover:bg-slate-200 transition-colors text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              Explore Systems
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-bold text-slate-700 dark:text-slate-350 transition-colors text-xs cursor-pointer"
            >
              Request Pipeline Brief
            </button>
          </div>
        </div>

      </div>

      {/* Hero Kanban column - sits equally tall in stretch/flex block */}
      <div className="flex-1 w-full max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col justify-center animate-fade-in">
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-550 to-pink-500 opacity-20 blur-md pointer-events-none" />
          <InteractiveKanban />
        </div>
      </div>

    </section>
  );
}

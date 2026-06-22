import React, { useState, useEffect } from 'react';
import { Calendar, Compass, Terminal, ShieldAlert, Cpu, Heart, Code, Network } from 'lucide-react';

export default function About() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format specifically to Europe/London (Trowbridge UK Timezone)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setTime(now.toLocaleTimeString("en-GB", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const careerTimeline = [
    {
      year: "2024 - Present",
      role: "Lead Systems & UI Architect",
      company: "SMTech",
      desc: "Designed sub-15ms edge routing interfaces and collaborative canvas architectures for high-performance productivity workspaces."
    },
    {
      year: "2021 - 2024",
      role: "Senior Full Stack Engineer",
      company: "Synergy Flow Systems",
      desc: "Developed real-time operational transposing pipelines in TypeScript and Rust, decreasing WebSocket allocation spikes by 45%."
    },
    {
      year: "2019 - 2021",
      role: "Frontend Systems Specialist",
      company: "Vertex Labs",
      desc: "Engineered scalable bento-box dashboards and customized design components optimized for high-compliance healthcare directories."
    }
  ];

  return (
    <section 
      id="about" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800 relative"
    >
      {/* Background glowing decorations */}
      <div className="absolute left-10 bottom-0 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header element */}
      <div className="text-left space-y-2 mb-10">
        <span className="text-xs uppercase tracking-widest font-mono text-indigo-500 font-bold">
          // THE ARCHITECT PHILOSOPHY
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          System Engineering Profile
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          We combine low-level systems logic with high-fidelity digital interfaces to build products that load instantly and perform fluidly. 
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* BENTO BOX 1: BIOGRAPHY AND TECH STACK (occupies 2 columns) */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Code size={16} className="text-indigo-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 font-mono">
                // engineering philosophy
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white font-sans">
              Removing human cognitive friction through high-performance compilers.
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              We design real-time systems that operate without delay bounds. Cleared memory blocks, concurrency nodes, and asset bundling strategies allow our web engines to render within microseconds. 
            </p>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              By using Rust for low-level system threads, TypeScript for structural client architecture, and Tailwind for fluid grids, SMTech establishes reliable, high-contrast, beautiful, and accessible environments for cross-functional groups worldwide.
            </p>
          </div>

          <div className="mt-8">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-3 pl-0.5">ACTIVE WORKSPACE CORE TECH STACK</span>
            <div className="flex flex-wrap gap-2">
              {["React 19", "Vite JS", "Rust VM", "TypeScript", "Node.js", "WebSockets", "Tailwind v4", "Docker Containers", "D3.js / Recharts"].map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 rounded-md text-xs font-semibold font-mono transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE SIDEBAR COLUMNS */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* BENTO BOX 2: UK CLOCK */}
          <div className="bg-white/60 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm relative overflow-hidden text-left flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Compass size={15} className="text-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 font-mono">// real-time zone</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">Trowbridge, UK</h4>
            </div>

            <div className="my-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090b16]/50 flex items-center justify-between shadow-inner">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Current Local Time</p>
                <p className="font-mono text-2xl font-bold tracking-tight text-indigo-500">
                  {time || "13:58:20"}
                </p>
              </div>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Operating synchronously across Western European, GMT London, and transatlantic sprint cycles.
            </p>
          </div>

          {/* BENTO BOX 3: PERFORMANCE METRICS */}
          <div className="bg-white/60 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm relative overflow-hidden text-left space-y-4">
            <div className="flex items-center gap-2">
              <Network size={15} className="text-cyan-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 font-mono">// load throughput</span>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  <span>Vite Assets Build Compress</span>
                  <span className="text-indigo-500">99.8%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full w-[99.8%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  <span>State Sync Consensus Rate</span>
                  <span className="text-cyan-500">100.0%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  <span>Dynamic Frame Sync Accuracy</span>
                  <span className="text-pink-500">60 FPS</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full w-[92%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* CAREER TIMELINE SUB-SECTION */}
      <div className="mt-16 text-left">
        <h3 className="text-lg font-extrabold mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
          <Calendar size={16} className="text-indigo-500" />
          Engineering Timeline
        </h3>
        
        <div className="relative border-l border-slate-200 dark:border-gray-800 ml-4 pl-6 space-y-8 max-w-4xl">
          {careerTimeline.map((item, index) => (
            <div key={index} className="relative group">
              {/* Bullet Node */}
              <div className="absolute -left-[31px] top-1.5 bg-white dark:bg-[#070913] border-2 border-indigo-600 rounded-full h-4 w-4 transform group-hover:scale-125 transition-transform" />
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">
                    {item.role}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{item.company}</p>
                </div>
                <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-500 px-2.5 py-0.5 rounded-full uppercase shrink-0 border border-indigo-500/10 self-start">
                  {item.year}
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2 max-w-2xl font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

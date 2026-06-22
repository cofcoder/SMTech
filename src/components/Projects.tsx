import React, { useState } from 'react';
import { PROJECTS_ITEMS } from '../data.ts';
import { ProjectItem } from '../types.ts';
import { Github, ExternalLink, ShieldCheck, Clock, Layers3, Flame } from 'lucide-react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "React", "Rust", "TypeScript", "Tailwind"];

  const filteredProjects = PROJECTS_ITEMS.filter((project) => {
    if (activeFilter === "All") return true;
    return project.tags.includes(activeFilter);
  });

  return (
    <section 
      id="projects" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800 relative"
    >
      {/* Visual glowing layout gradients */}
      <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* Header section element */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left space-y-2">
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-500 font-bold">
            // ACTIVE PACKAGES & SHOWROOM
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Project Showroom
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Browse our open-source utility libraries, real-time collaboration engines, and container frameworks built specifically to handle high concurrent client sessions.
          </p>
        </div>

        {/* Dynamic Project Technology Filters */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-end">
          {filters.map((filt) => (
            <button
              key={filt}
              onClick={() => setActiveFilter(filt)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === filt
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              }`}
            >
              {filt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-slate-200 dark:border-gray-800 rounded-2xl">
          <p className="text-sm text-slate-500 italic">No packages matching this compilation filter were detected.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/60 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-xl group transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Card Title Header */}
              <div className="space-y-4 text-left">
                
                {/* Upper row: Active indicator or tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {project.status === "active" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-green-500/10 text-green-500 border border-green-550/15">
                        <Flame size={9} className="mr-1 inline animate-pulse" />
                        Active Dev Build
                      </span>
                    ) : project.status === "completed" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-indigo-500/10 text-indigo-500 border border-indigo-550/15">
                        <ShieldCheck size={9} className="mr-1 inline" />
                        Production Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-amber-500/10 text-amber-500 border border-amber-550/15">
                        <Clock size={9} className="mr-1 inline" />
                        Planned Build
                      </span>
                    )}
                  </div>
                  <span className="text-[10.5px] font-mono text-indigo-500 font-semibold">{project.metrics}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                  {project.title}
                </h3>

                {/* Description info */}
                <p className="text-[12px] text-slate-500 dark:text-slate-450 leading-relaxed font-sans font-light min-h-[72px]">
                  {project.desc}
                </p>

                {/* Sub Technology badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100/80 dark:bg-slate-800/60 rounded text-[10px] text-slate-500 dark:text-gray-400 font-semibold font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Actions Footer links */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">{project.date}</span>
                
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    className="p-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-md transition-colors flex items-center gap-1.5 text-xs font-mono select-none"
                    title="Explore project pipeline codebase"
                  >
                    <Github size={13} />
                    Code
                  </a>
                  
                  <a
                    href={project.demoUrl || "#"}
                    className="p-1 px-2 bg-indigo-600/10 dark:bg-indigo-600/10 text-indigo-500 hover:bg-indigo-600 hover:text-white rounded-md transition-all flex items-center gap-1.5 text-xs font-bold select-none cursor-pointer"
                    title="Inspect live collaborative sandbox"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}

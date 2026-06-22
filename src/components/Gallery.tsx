import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data.ts';
import { GalleryItem } from '../types.ts';
import OptimizedImage from './OptimizedImage.tsx';
import { Search, ZoomIn, ZoomOut, Maximize2, ShieldAlert, Crosshair, ArrowRight, Download, Activity, Calendar } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  
  // Lightbox utility states
  const [zoomScale, setZoomScale] = useState(1);
  const [showMetadata, setShowMetadata] = useState(true);

  const tabs = ["All", "System Design", "UI/UX Design", "Web Engineering"];

  const handleOpenLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
    setZoomScale(1);
  };

  const handleCloseLightbox = () => {
    setLightboxItem(null);
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.75));
  };

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesTab = activeTab === "All" || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section 
      id="gallery" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800 relative"
    >
      {/* Background accents */}
      <div className="absolute right-10 top-0 w-72 h-72 bg-purple-500/5 blur-2xl rounded-full pointer-events-none" />

      {/* Header element */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left space-y-2">
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-500 font-bold">
            // SYSTEMS DESIGN PORTFOLIO
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Curated Systems Gallery
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Explore diagnostic blueprints, telemetry interface systems, and vector assets. All graphics are compression-optimized using real Unsplash WebP pipelines with high fluid responsiveness.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-end">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearchQuery("");
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-slate-100 dark:bg-gray-850 hover:bg-slate-200 dark:hover:bg-gray-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 border border-transparent hover:border-slate-200 dark:hover:border-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Search Bar */}
      <div className="mb-8 max-w-md relative flex items-center">
        <div className="absolute left-3.5 text-slate-400">
          <Search size={15} />
        </div>
        <input
          type="text"
          placeholder="Filter assets by keyword or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-2.5 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 font-sans shadow-sm backdrop-blur-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 text-[10px] uppercase font-mono text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-slate-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center">
          <p className="text-sm text-slate-450 italic mb-2">No matching asset directories located in the sandbox framework.</p>
          <button
            onClick={() => {
              setActiveTab("All");
              setSearchQuery("");
            }}
            className="text-xs text-indigo-505 font-bold hover:underline"
          >
            Refresh query filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="group bg-white/60 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer transition-all duration-300 flex flex-col h-[320px] relative"
            >
              {/* Image Container */}
              <div className="h-44 relative overflow-hidden">
                <OptimizedImage 
                  src={item.src} 
                  alt={item.title} 
                  className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-700 ease-out" 
                />
                <span className="absolute top-3 left-3 bg-[#070913]/70 backdrop-blur-md text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider font-extrabold text-white border border-gray-700/50">
                  {item.category}
                </span>

                {/* Simulated Metadata payload badge */}
                <div className="absolute bottom-2.5 right-3 px-2 py-0.5 bg-black/60 rounded backdrop-blur-sm text-[9px] font-mono text-indigo-300 border border-indigo-500/20">
                  {item.info}
                </div>
              </div>

              {/* Text Container */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-white line-clamp-1 group-hover:text-indigo-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                {/* Size stats footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-gray-850/60 text-[10px] font-mono text-slate-400">
                  <span className="uppercase">Index ID: 00{item.id}</span>
                  <span className="text-indigo-500 font-bold">{item.bytes}</span>
                </div>
              </div>

              {/* Overlay hover effect icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg">
                <Maximize2 size={12} />
              </div>

            </div>
          ))}
        </div>
      )}

      {/* SYSTEM IMMERSIVE LIGHTBOX OVERLAY MODAL */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
          
          {/* Header bar */}
          <div className="p-4 border-b border-gray-800/80 flex items-center justify-between text-white bg-slate-900/50 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="bg-indigo-650/40 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono px-2.5 py-0.5 rounded font-bold uppercase">
                {lightboxItem.category}
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold truncate max-w-xs">{lightboxItem.title}</h3>
            </div>
            
            {/* Toolbar buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              
              <span className="text-[10px] font-mono text-gray-400 px-1 select-none">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              
              <button
                onClick={() => setShowMetadata(!showMetadata)}
                className={`p-1.5 rounded-lg transition-colors ${showMetadata ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800 text-gray-400 hover:text-white'}`}
                title="Toggle Telemetry Sidebar"
              >
                <Activity size={16} />
              </button>

              <div className="w-px h-5 bg-gray-800 mx-1" />

              <button
                onClick={handleCloseLightbox}
                className="p-1.5 bg-gray-850 hover:bg-red-650 text-gray-400 hover:text-white rounded-lg transition-all cursor-pointer"
                title="Close Lightbox (ESC)"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Main area splits image and mock telemetry sidebar helper */}
          <div className="flex-1 flex overflow-hidden relative">
            
            {/* Image Canvas Panel */}
            <div className="flex-1 flex items-center justify-center overflow-auto p-4 relative" onClick={handleCloseLightbox}>
              <div 
                className="relative max-w-full max-h-full transition-transform duration-200"
                style={{ transform: `scale(${zoomScale})` }}
                onClick={(e) => e.stopPropagation()} // Prevent clicking image triggering close
              >
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[80vh] max-w-full rounded-lg shadow-2xl object-fit pointer-events-none"
                />
              </div>
            </div>

            {/* Sidebar analytics panel when toggled */}
            {showMetadata && (
              <div className="w-80 border-l border-gray-800/80 bg-[#090b14] py-6 px-5 flex flex-col justify-between text-left text-gray-300 hidden lg:flex animate-in slide-in-from-right duration-250">
                <div className="space-y-6">
                  
                  {/* Title block */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block font-bold">// Telemetry Specs</span>
                    <h4 className="text-base font-extrabold text-white">{lightboxItem.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{lightboxItem.desc}</p>
                  </div>

                  {/* Metadata key value list */}
                  <div className="space-y-3.5 pt-4 border-t border-gray-850/60 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Asset Payload:</span>
                      <span className="text-white font-semibold">{lightboxItem.bytes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Optimizing:</span>
                      <span className="text-indigo-400 font-semibold">{lightboxItem.info}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Hydration Link:</span>
                      <span className="text-emerald-400 font-semibold">Ready (WebP_v2)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Host Source:</span>
                      <span className="text-cyan-400">Unsplash CDN</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Encoding Rate:</span>
                      <span className="text-white">WebP 80% lossy</span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap">
                      <span className="text-gray-500">Proxy Coords:</span>
                      <span className="bg-gray-900 px-1 py-0.5 rounded text-[10px] text-fuchsia-400">Trowbridge_UK_Node1</span>
                    </div>
                  </div>

                  {/* System alert notice */}
                  <div className="flex gap-2.5 p-3 rounded-lg bg-indigo-950/20 border border-indigo-850/40 text-[11px] text-indigo-300">
                    <ShieldAlert size={14} className="shrink-0 text-indigo-400" />
                    <span>Assets are automatically hydrated in lazy pipelines to enforce fast client load bounds.</span>
                  </div>

                </div>

                {/* Source trigger button */}
                <a
                  href={lightboxItem.src}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-full text-center py-2.5 rounded-lg bg-gray-850 hover:bg-gray-800 text-xs font-semibold text-white border border-gray-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download size={13} />
                  Open High-Resolution Assets
                </a>

              </div>
            )}

          </div>

          {/* Little metadata block on mobile */}
          <div className="p-4 border-t border-gray-800/80 bg-slate-900/40 backdrop-blur text-left text-gray-400 text-xs sm:hidden">
            <p className="font-bold text-white text-xs">{lightboxItem.title}</p>
            <p className="text-[11px] mt-1">{lightboxItem.desc}</p>
            <p className="text-[10px] font-mono mt-2 text-indigo-400">{lightboxItem.info} • ID: 00{lightboxItem.id}</p>
          </div>

        </div>
      )}

    </section>
  );
}

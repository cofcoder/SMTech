import React, { useState } from 'react';
import { KanbanBoard, KanbanCard, KanbanColumn } from '../types.ts';
import { INITIAL_KANBAN_BOARD } from '../data.ts';
import { Plus, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function InteractiveKanban() {
  const [board, setBoard] = useState<KanbanBoard>(INITIAL_KANBAN_BOARD);
  const [inputText, setInputText] = useState("");
  const [activeTag, setActiveTag] = useState("Feature");

  const tags = ["Performance", "UI", "Asset", "Security", "Feature", "Docs"];

  // Add card to Backlog
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newCard: KanbanCard = {
      id: Date.now(),
      text: inputText.trim(),
      tag: activeTag
    };

    setBoard(prev => ({
      ...prev,
      backlog: [...prev.backlog, newCard]
    }));
    setInputText("");
  };

  // Shift card sequentially: backlog -> inProgress -> done -> delete or back to backlog
  const handleCardClick = (id: number, currentColumn: KanbanColumn) => {
    let cardToMove: KanbanCard | undefined;
    
    if (currentColumn === 'backlog') {
      cardToMove = board.backlog.find(c => c.id === id);
      if (cardToMove) {
        setBoard(prev => ({
          ...prev,
          backlog: prev.backlog.filter(c => c.id !== id),
          inProgress: [...prev.inProgress, cardToMove!]
        }));
      }
    } else if (currentColumn === 'inProgress') {
      cardToMove = board.inProgress.find(c => c.id === id);
      if (cardToMove) {
        setBoard(prev => ({
          ...prev,
          inProgress: prev.inProgress.filter(c => c.id !== id),
          done: [...prev.done, cardToMove!]
        }));
      }
    } else {
      cardToMove = board.done.find(c => c.id === id);
      if (cardToMove) {
        // Recycle back to backlog
        setBoard(prev => ({
          ...prev,
          done: prev.done.filter(c => c.id !== id),
          backlog: [...prev.backlog, cardToMove!]
        }));
      }
    }
  };

  // Move a card specifically to the left
  const moveLeft = (e: React.MouseEvent, id: number, currentColumn: KanbanColumn) => {
    e.stopPropagation(); // Avoid triggering full card click
    let cardToMove: KanbanCard | undefined;
    
    if (currentColumn === 'inProgress') {
      cardToMove = board.inProgress.find(c => c.id === id);
      if (cardToMove) {
        setBoard(prev => ({
          ...prev,
          inProgress: prev.inProgress.filter(c => c.id !== id),
          backlog: [...prev.backlog, cardToMove!]
        }));
      }
    } else if (currentColumn === 'done') {
      cardToMove = board.done.find(c => c.id === id);
      if (cardToMove) {
        setBoard(prev => ({
          ...prev,
          done: prev.done.filter(c => c.id !== id),
          inProgress: [...prev.inProgress, cardToMove!]
        }));
      }
    }
  };

  // Move a card specifically to the right
  const moveRight = (e: React.MouseEvent, id: number, currentColumn: KanbanColumn) => {
    e.stopPropagation(); // Avoid triggering full card click
    let cardToMove: KanbanCard | undefined;

    if (currentColumn === 'backlog') {
      cardToMove = board.backlog.find(c => c.id === id);
      if (cardToMove) {
        setBoard(prev => ({
          ...prev,
          backlog: prev.backlog.filter(c => c.id !== id),
          inProgress: [...prev.inProgress, cardToMove!]
        }));
      }
    } else if (currentColumn === 'inProgress') {
      cardToMove = board.inProgress.find(c => c.id === id);
      if (cardToMove) {
        setBoard(prev => ({
          ...prev,
          inProgress: prev.inProgress.filter(c => c.id !== id),
          done: [...prev.done, cardToMove!]
        }));
      }
    }
  };

  // Reset Board to defaults
  const resetBoard = () => {
    setBoard(INITIAL_KANBAN_BOARD);
  };

  return (
    <div id="kanban-widget" className="w-full bg-[#fafbfc] dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Glossy lights */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold">
            SMTech Workspace Task_Manager.io
          </span>
        </div>
        <button
          onClick={resetBoard}
          className="p-1 px-2 text-[10px] font-mono text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-gray-800/50 rounded flex items-center gap-1 transition-all"
          title="Reset board to initial demo"
        >
          <RefreshCw size={10} />
          Reset State
        </button>
      </div>

      {/* Quick Appender */}
      <form onSubmit={handleAddTask} className="mb-5 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new task..."
            maxLength={60}
            className="flex-1 text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-slate-100 font-sans shadow-sm"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
        
        {/* Tag choice */}
        <div className="flex flex-wrap gap-1 items-center">
          <span className="text-[10px] font-mono text-slate-400 mr-2 uppercase">Tag:</span>
          {tags.map(t => (
            <button
              type="button"
              key={t}
              onClick={() => setActiveTag(t)}
              className={`text-[9px] font-mono px-2 py-0.5 rounded transition-all ${
                activeTag === t 
                  ? 'bg-indigo-600/15 text-indigo-500 border border-indigo-500/30 font-bold' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </form>

      {/* Grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* COLUMN: BACKLOG */}
        <div className="bg-slate-50/50 dark:bg-[#090c17]/50 rounded-xl p-2 md:p-3 border border-slate-150 dark:border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              [01] Backlog
            </span>
            <span className="bg-slate-100 dark:bg-slate-800 text-[10px] px-1.5 py-0.2 rounded font-mono text-slate-500">
              {board.backlog.length}
            </span>
          </div>

          <div className="space-y-2 min-h-[160px] max-h-[280px] overflow-y-auto pr-0.5">
            {board.backlog.length === 0 ? (
              <div className="h-[160px] flex items-center justify-center border border-dashed border-slate-200 dark:border-gray-800 rounded-lg text-[10px] text-slate-400 italic">
                Backlog empty.
              </div>
            ) : (
              board.backlog.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id, 'backlog')}
                  className="bg-white dark:bg-[#12162a] p-2.5 rounded-lg border border-slate-200 dark:border-gray-800/80 text-xs shadow-sm cursor-pointer hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 relative group"
                  title="Click to advance status"
                >
                  <p className="font-sans font-medium text-slate-800 dark:text-slate-200 leading-tight pr-6">
                    {item.text}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-550/10 text-indigo-500 border border-indigo-550/10 font-bold">
                      {item.tag}
                    </span>
                    
                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => moveRight(e, item.id, 'backlog')}
                        className="p-0.5 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded text-slate-400 hover:text-indigo-600 transition-all"
                        title="Move straight to In Progress"
                      >
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN: IN PROGRESS */}
        <div className="bg-slate-50/50 dark:bg-[#090c17]/50 rounded-xl p-2 md:p-3 border border-slate-150 dark:border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              [02] Active
            </span>
            <span className="bg-amber-500/10 text-amber-500 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
              {board.inProgress.length}
            </span>
          </div>

          <div className="space-y-2 min-h-[160px] max-h-[280px] overflow-y-auto pr-0.5">
            {board.inProgress.length === 0 ? (
              <div className="h-[160px] flex items-center justify-center border border-dashed border-slate-200 dark:border-gray-800 rounded-lg text-[10px] text-slate-400 italic">
                Active Empty.
              </div>
            ) : (
              board.inProgress.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id, 'inProgress')}
                  className="bg-white dark:bg-[#12162a] p-2.5 rounded-lg border border-slate-200 dark:border-gray-800/80 text-xs shadow-sm cursor-pointer hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 relative group"
                  title="Click to advance status"
                >
                  <p className="font-sans font-medium text-slate-800 dark:text-slate-200 leading-tight pr-6">
                    {item.text}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-550/10 text-amber-500 rounded font-semibold">
                      {item.tag}
                    </span>
                    
                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => moveLeft(e, item.id, 'inProgress')}
                        className="p-0.5 hover:bg-slate-100 dark:hover:bg-gray-800 rounded text-slate-400 hover:text-slate-600 transition-all"
                        title="Move to Backlog"
                      >
                        <ArrowLeft size={11} />
                      </button>
                      <button
                        onClick={(e) => moveRight(e, item.id, 'inProgress')}
                        className="p-0.5 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded text-slate-400 hover:text-indigo-600 transition-all"
                        title="Move to Done"
                      >
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN: DONE */}
        <div className="bg-slate-50/50 dark:bg-[#090c17]/50 rounded-xl p-2 md:p-3 border border-slate-150 dark:border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              [03] Done
            </span>
            <span className="bg-green-500/10 text-green-500 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
              {board.done.length}
            </span>
          </div>

          <div className="space-y-2 min-h-[160px] max-h-[280px] overflow-y-auto pr-0.5">
            {board.done.length === 0 ? (
              <div className="h-[160px] flex items-center justify-center border border-dashed border-slate-200 dark:border-gray-800 rounded-lg text-[10px] text-slate-400 italic">
                Done Empty.
              </div>
            ) : (
              board.done.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id, 'done')}
                  className="bg-white/80 dark:bg-[#0d1222]/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-sm cursor-pointer opacity-70 hover:opacity-100 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300 relative group"
                  title="Click to cycle back to Backlog"
                >
                  <p className="font-sans font-medium text-slate-700 dark:text-slate-400 leading-tight pr-6 line-through decoration-slate-350 dark:decoration-slate-700">
                    {item.text}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-green-500/10 text-green-500 rounded font-semibold">
                      {item.tag}
                    </span>
                    
                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => moveLeft(e, item.id, 'done')}
                        className="p-0.5 hover:bg-slate-100 dark:hover:bg-gray-800 rounded text-slate-400 hover:text-slate-600 transition-all"
                        title="Move to Active"
                      >
                        <ArrowLeft size={11} />
                      </button>
                      <CheckCircle2 size={11} className="text-green-500 mr-0.5" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <p className="text-[10px] font-mono text-center text-slate-400 dark:text-slate-500 mt-4 italic bg-slate-50 dark:bg-gray-900/30 py-1.5 rounded border border-slate-100 dark:border-slate-800/60">
        🖱️ Tip: Click any task directly to cycle its status column sequentially.
      </p>
    </div>
  );
}

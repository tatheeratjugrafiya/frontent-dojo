import React from 'react';
import { 
  BookOpen, Palette, Cpu, Trophy, FileText, Search, 
  Sparkles, CheckCircle2, Award, Zap
} from 'lucide-react';

export function Navbar({ 
  activeView, 
  setActiveView, 
  completedLessons = [], 
  totalLessons = 10,
  xp = 0,
  onOpenSearch,
  onOpenCheatSheet 
}) {
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  const navItems = [
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'tailwind', label: 'Tailwind Studio', icon: Palette },
    { id: 'hooks', label: 'Hooks Visualizer', icon: Cpu },
    { id: 'projects', label: 'Capstone Projects', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('curriculum')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                ⚛
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">Frontend Dojo</span>
              <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                React + Tailwind
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Zero to Production Mastery</p>
          </div>
        </div>

        {/* Center Nav Views */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/80 rounded-2xl border border-slate-800/80">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Stats & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* XP Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 rounded-xl text-amber-400 text-xs font-bold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{xp} XP</span>
          </div>

          {/* Progress Tracker */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-300 font-bold">{progressPercent}%</span>
          </div>

          {/* Quick CheatSheet button */}
          <button
            onClick={onOpenCheatSheet}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-medium transition"
            title="Open Quick Cheat Sheet"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Cheat Sheet</span>
          </button>
        </div>
      </div>
    </header>
  );
}

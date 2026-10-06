import React from 'react';
import { 
  CheckCircle2, Circle, Atom, Layers, Palette, Sliders, 
  Zap, Cpu, CheckSquare, Globe, Compass, Rocket, ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Atom,
  Layers,
  Palette,
  Sliders,
  Zap,
  Cpu,
  CheckSquare,
  Globe,
  Compass,
  Rocket
};

export function Sidebar({ 
  modules, 
  activeModuleId, 
  onSelectModule, 
  completedLessons = [] 
}) {
  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4">
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Curriculum Path</span>
          <span className="text-[11px] font-mono font-bold text-sky-400">
            {completedLessons.length} / {modules.length} Completed
          </span>
        </div>

        <nav className="space-y-1.5">
          {modules.map((m) => {
            const Icon = ICON_MAP[m.icon] || Atom;
            const isSelected = activeModuleId === m.id;
            const isCompleted = completedLessons.includes(m.id);

            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all group ${
                  isSelected
                    ? 'bg-sky-500/15 border border-sky-500/30 text-white shadow-sm'
                    : 'bg-slate-950/40 hover:bg-slate-850 hover:bg-slate-800/50 border border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-semibold uppercase text-slate-500">
                        M0{m.moduleNumber}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-medium">
                        {m.readTime}
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold truncate mt-0.5 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {m.title}
                    </h4>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-700'}`} />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { TailwindPlayground } from './components/TailwindPlayground';
import { HooksVisualizer } from './components/HooksVisualizer';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { JSRunnerPlayground } from './components/JSRunnerPlayground';
import { CheatSheetModal } from './components/CheatSheetModal';
import { CURRICULUM_MODULES } from './data/curriculumData';
import { JS_CURRICULUM_MODULES } from './data/jsCurriculumData';
import { BASIC_JS_CURRICULUM_MODULES } from './data/basicJSCurriculumData';
import { Sparkles, Trophy, BookOpen, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';

export function App() {
  const [activeView, setActiveView] = useState('basic-js');
  const [activeBasicJSModuleId, setActiveBasicJSModuleId] = useState(BASIC_JS_CURRICULUM_MODULES[0].id);
  const [activeReactModuleId, setActiveReactModuleId] = useState(CURRICULUM_MODULES[0].id);
  const [activeJSModuleId, setActiveJSModuleId] = useState(JS_CURRICULUM_MODULES[0].id);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  // Persistence for user progress & XP
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('dojo_completed_lessons');
      return saved ? JSON.parse(saved) : ['bjs-01-syntax', '01-foundations-jsx', 'js-01-foundations'];
    } catch {
      return ['bjs-01-syntax', '01-foundations-jsx', 'js-01-foundations'];
    }
  });

  const [xp, setXp] = useState(() => {
    try {
      const saved = localStorage.getItem('dojo_xp');
      return saved ? Number(saved) : 250;
    } catch {
      return 250;
    }
  });

  useEffect(() => {
    localStorage.setItem('dojo_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('dojo_xp', String(xp));
  }, [xp]);

  const handleCompleteLesson = (moduleId, earnedXp = 50) => {
    if (!completedLessons.includes(moduleId)) {
      setCompletedLessons(prev => [...prev, moduleId]);
      setXp(prev => prev + earnedXp);
    }
  };

  const totalAllLessons = BASIC_JS_CURRICULUM_MODULES.length + JS_CURRICULUM_MODULES.length + CURRICULUM_MODULES.length;

  // Basic JS Module calculation
  const activeBasicJSModule = BASIC_JS_CURRICULUM_MODULES.find(m => m.id === activeBasicJSModuleId) || BASIC_JS_CURRICULUM_MODULES[0];
  const activeBasicJSIndex = BASIC_JS_CURRICULUM_MODULES.findIndex(m => m.id === activeBasicJSModuleId);
  const hasNextBasicJS = activeBasicJSIndex < BASIC_JS_CURRICULUM_MODULES.length - 1;

  // React Module calculation
  const activeReactModule = CURRICULUM_MODULES.find(m => m.id === activeReactModuleId) || CURRICULUM_MODULES[0];
  const activeReactIndex = CURRICULUM_MODULES.findIndex(m => m.id === activeReactModuleId);
  const hasNextReact = activeReactIndex < CURRICULUM_MODULES.length - 1;

  // Advanced JS Module calculation
  const activeJSModule = JS_CURRICULUM_MODULES.find(m => m.id === activeJSModuleId) || JS_CURRICULUM_MODULES[0];
  const activeJSIndex = JS_CURRICULUM_MODULES.findIndex(m => m.id === activeJSModuleId);
  const hasNextJS = activeJSIndex < JS_CURRICULUM_MODULES.length - 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        completedLessons={completedLessons}
        totalLessons={totalAllLessons}
        xp={xp}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Track 1: Basic JavaScript (Beginner 101) */}
        {activeView === 'basic-js' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <Sidebar
              modules={BASIC_JS_CURRICULUM_MODULES}
              activeModuleId={activeBasicJSModuleId}
              onSelectModule={(id) => {
                setActiveBasicJSModuleId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              completedLessons={completedLessons}
            />

            <LessonViewer
              module={activeBasicJSModule}
              onCompleteLesson={handleCompleteLesson}
              isCompleted={completedLessons.includes(activeBasicJSModule.id)}
              onNextLesson={() => {
                if (hasNextBasicJS) {
                  setActiveBasicJSModuleId(BASIC_JS_CURRICULUM_MODULES[activeBasicJSIndex + 1].id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              hasNext={hasNextBasicJS}
            />
          </div>
        )}

        {/* Track 2: Modern JavaScript (Advanced & ES6+) */}
        {activeView === 'js-curriculum' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <Sidebar
              modules={JS_CURRICULUM_MODULES}
              activeModuleId={activeJSModuleId}
              onSelectModule={(id) => {
                setActiveJSModuleId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              completedLessons={completedLessons}
            />

            <LessonViewer
              module={activeJSModule}
              onCompleteLesson={handleCompleteLesson}
              isCompleted={completedLessons.includes(activeJSModule.id)}
              onNextLesson={() => {
                if (hasNextJS) {
                  setActiveJSModuleId(JS_CURRICULUM_MODULES[activeJSIndex + 1].id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              hasNext={hasNextJS}
            />
          </div>
        )}

        {/* Track 3: React 18 & Tailwind Curriculum */}
        {activeView === 'curriculum' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <Sidebar
              modules={CURRICULUM_MODULES}
              activeModuleId={activeReactModuleId}
              onSelectModule={(id) => {
                setActiveReactModuleId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              completedLessons={completedLessons}
            />

            <LessonViewer
              module={activeReactModule}
              onCompleteLesson={handleCompleteLesson}
              isCompleted={completedLessons.includes(activeReactModule.id)}
              onNextLesson={() => {
                if (hasNextReact) {
                  setActiveReactModuleId(CURRICULUM_MODULES[activeReactIndex + 1].id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              hasNext={hasNextReact}
            />
          </div>
        )}

        {/* Live JavaScript REPL & Sandbox */}
        {activeView === 'js-sandbox' && <JSRunnerPlayground />}

        {/* Tailwind Visual Sandbox */}
        {activeView === 'tailwind' && <TailwindPlayground />}

        {/* React Hooks Inspector */}
        {activeView === 'hooks' && <HooksVisualizer />}

        {/* Capstone Projects Showcase */}
        {activeView === 'projects' && <ProjectsShowcase />}
      </main>

      {/* Cheat Sheet Modal */}
      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Frontend Dojo • Master JavaScript from Ground Zero, React 18 & Tailwind CSS.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white transition cursor-pointer" onClick={() => setActiveView('basic-js')}>JS Basics</span>
            <span className="hover:text-white transition cursor-pointer" onClick={() => setActiveView('js-curriculum')}>JS Advanced</span>
            <span className="hover:text-white transition cursor-pointer" onClick={() => setActiveView('curriculum')}>React Dojo</span>
            <span className="hover:text-white transition cursor-pointer" onClick={() => setActiveView('js-sandbox')}>JS REPL</span>
            <span className="hover:text-white transition cursor-pointer" onClick={() => setIsCheatSheetOpen(true)}>Cheat Sheet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

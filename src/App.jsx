import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { TailwindPlayground } from './components/TailwindPlayground';
import { HooksVisualizer } from './components/HooksVisualizer';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CheatSheetModal } from './components/CheatSheetModal';
import { CURRICULUM_MODULES } from './data/curriculumData';
import { Sparkles, Trophy, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export function App() {
  const [activeView, setActiveView] = useState('curriculum');
  const [activeModuleId, setActiveModuleId] = useState(CURRICULUM_MODULES[0].id);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  // Persistence for user progress & XP
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('dojo_completed_lessons');
      return saved ? JSON.parse(saved) : ['01-foundations-jsx'];
    } catch {
      return ['01-foundations-jsx'];
    }
  });

  const [xp, setXp] = useState(() => {
    try {
      const saved = localStorage.getItem('dojo_xp');
      return saved ? Number(saved) : 150;
    } catch {
      return 150;
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

  const activeModule = CURRICULUM_MODULES.find(m => m.id === activeModuleId) || CURRICULUM_MODULES[0];
  const activeModuleIndex = CURRICULUM_MODULES.findIndex(m => m.id === activeModuleId);
  const hasNext = activeModuleIndex < CURRICULUM_MODULES.length - 1;

  const handleNextLesson = () => {
    if (hasNext) {
      setActiveModuleId(CURRICULUM_MODULES[activeModuleIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        completedLessons={completedLessons}
        totalLessons={CURRICULUM_MODULES.length}
        xp={xp}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'curriculum' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Module Directory */}
            <Sidebar
              modules={CURRICULUM_MODULES}
              activeModuleId={activeModuleId}
              onSelectModule={(id) => {
                setActiveModuleId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              completedLessons={completedLessons}
            />

            {/* Active Lesson Content */}
            <LessonViewer
              module={activeModule}
              onCompleteLesson={handleCompleteLesson}
              isCompleted={completedLessons.includes(activeModule.id)}
              onNextLesson={handleNextLesson}
              hasNext={hasNext}
            />
          </div>
        )}

        {activeView === 'tailwind' && <TailwindPlayground />}
        {activeView === 'hooks' && <HooksVisualizer />}
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
          <p>© 2026 Frontend Dojo • Master React 18 & Tailwind CSS from Ground Up.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white transition cursor-pointer" onClick={() => setActiveView('curriculum')}>Curriculum</span>
            <span className="hover:text-white transition cursor-pointer" onClick={() => setActiveView('tailwind')}>Tailwind Studio</span>
            <span className="hover:text-white transition cursor-pointer" onClick={() => setIsCheatSheetOpen(true)}>Cheat Sheet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

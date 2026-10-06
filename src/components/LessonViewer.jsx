import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Code2, HelpCircle, Check, Copy, 
  ChevronRight, ArrowRight, Lightbulb, CheckCircle2, XCircle, 
  Trophy, RotateCcw, Zap
} from 'lucide-react';
import { InteractiveWidget } from './InteractiveWidget';
import { JSInteractiveWidget } from './JSInteractiveWidget';
import { BasicJSInteractiveWidget } from './BasicJSInteractiveWidget';

export function LessonViewer({ 
  module, 
  onCompleteLesson, 
  isCompleted, 
  onNextLesson,
  hasNext 
}) {
  const [activeTab, setActiveTab] = useState('notes');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleCopy = (text, type = 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedSolution(true);
      setTimeout(() => setCopiedSolution(false), 2000);
    }
  };

  const handleSelectQuizAnswer = (qIndex, optionIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    module.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score === module.quiz.length) {
      onCompleteLesson(module.id, 100);
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="flex-1 space-y-6 min-w-0">
      {/* Header Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold">
            MODULE 0{module.moduleNumber}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            {module.tag}
          </span>
          <span className="text-slate-500 text-xs">• {module.readTime}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
          {module.title}
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
          {module.subtitle}
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
          {[
            { id: 'notes', label: '📖 Theory & Notes', icon: BookOpen },
            { id: 'demo', label: '⚡ Live Interactive Demo', icon: Sparkles },
            { id: 'challenge', label: '💻 Coding Challenge', icon: Code2 },
            { id: 'quiz', label: '🧠 Knowledge Check', icon: HelpCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.02]'
                    : 'bg-slate-950/70 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Theory & Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Overview */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" /> Deep Dive Summary
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {module.overview}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Key Engineering Principles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {module.takeaways.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" /> Reference Implementation
              </h3>
              <button
                onClick={() => handleCopy(module.codeExample, 'code')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed">
              <code>{module.codeExample}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Demo */}
      {activeTab === 'demo' && (
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-xl animate-fadeIn space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" /> Live Interactive Sandbox
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Interact with the live widget below to see how state, props, and styling react instantly.
              </p>
            </div>
          </div>
          {module.id.startsWith('bjs-') ? (
            <BasicJSInteractiveWidget moduleId={module.id} />
          ) : module.id.startsWith('js-') ? (
            <JSInteractiveWidget moduleId={module.id} />
          ) : (
            <InteractiveWidget moduleId={module.id} />
          )}
        </div>
      )}

      {/* Tab 3: Coding Challenge */}
      {activeTab === 'challenge' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" /> Hands-On Challenge
              </h3>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                +50 XP
              </span>
            </div>
            <p className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              {module.challenge.instruction}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold block">Starter Template:</span>
              <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <code>{module.challenge.starterCode}</code>
              </pre>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold transition"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-bold transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
              </button>
            </div>

            {showHint && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-300 animate-fadeIn">
                💡 <strong className="font-bold">Hint:</strong> {module.challenge.hint}
              </div>
            )}

            {showSolution && (
              <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Reference Solution:</span>
                  <button
                    onClick={() => handleCopy(module.challenge.solution, 'sol')}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-900 text-slate-300 rounded-lg text-xs font-semibold"
                  >
                    {copiedSolution ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSolution ? 'Copied' : 'Copy Solution'}</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-emerald-300 overflow-x-auto">
                  <code>{module.challenge.solution}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Knowledge Check / Quiz */}
      {activeTab === 'quiz' && (
        <div className="p-6 md:p-8 bg-slate-900/70 border border-slate-800 rounded-3xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-400" /> Knowledge Check Quiz
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Test your comprehension for Module 0{module.moduleNumber}</p>
            </div>
            {quizSubmitted && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Score: {quizScore} / {module.quiz.length}</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {module.quiz.map((q, qIndex) => {
              const selectedOption = quizAnswers[qIndex];
              const isCorrect = selectedOption === q.answer;

              return (
                <div key={qIndex} className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-3">
                  <h4 className="font-bold text-white text-sm">
                    {qIndex + 1}. {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOption === optIndex;
                      let optionClasses = 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800';

                      if (quizSubmitted) {
                        if (optIndex === q.answer) {
                          optionClasses = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          optionClasses = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                        }
                      } else if (isSelected) {
                        optionClasses = 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold';
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectQuizAnswer(qIndex, optIndex)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIndex === q.answer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 bg-slate-900/90 rounded-xl text-xs text-slate-400 border border-slate-800">
                      💡 <strong className="text-slate-200">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < module.quiz.length}
                className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-sky-500/25"
              >
                Submit Answers
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
                {quizScore === module.quiz.length && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 px-3 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    🎉 Perfect Score! +100 XP
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between p-6 bg-slate-900/80 border border-slate-800 rounded-3xl">
        <button
          onClick={() => onCompleteLesson(module.id, 50)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? '✓ Lesson Completed' : 'Mark as Completed (+50 XP)'}</span>
        </button>

        {hasNext && (
          <button
            onClick={onNextLesson}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-sky-500/25"
          >
            <span>Next Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

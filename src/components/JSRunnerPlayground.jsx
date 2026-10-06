import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

const PRESET_TEMPLATES = [
  {
    id: 'closure',
    name: '1. Private Closure Counter',
    code: `function createCounter(initial = 0) {
  let count = initial; // Private enclosed state
  return {
    inc() { return ++count; },
    dec() { return --count; },
    get() { return count; }
  };
}

const counter = createCounter(10);
console.log('Increment:', counter.inc());
console.log('Increment:', counter.inc());
console.log('Current value:', counter.get());`
  },
  {
    id: 'pipeline',
    name: '2. Array Pipeline (Filter-Map-Reduce)',
    code: `const students = [
  { name: 'Alex', score: 85, passed: true },
  { name: 'Mia', score: 40, passed: false },
  { name: 'Ken', score: 92, passed: true },
  { name: 'Elena', score: 98, passed: true }
];

// Pipeline: Average score of students who passed
const passingScores = students
  .filter(s => s.passed)
  .map(s => s.score);

const avgScore = passingScores.reduce((acc, score) => acc + score, 0) / passingScores.length;

console.log('Passing scores:', passingScores);
console.log('Class passing average:', avgScore.toFixed(2));`
  },
  {
    id: 'async',
    name: '3. Async / Await Simulator',
    code: `const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function fetchUserData() {
  console.log('1. Starting async network request...');
  await delay(600);
  console.log('2. Request finished successfully!');
  return { id: 42, role: 'Lead Architect', belt: 'Black Belt' };
}

fetchUserData().then(user => {
  console.log('3. Received user payload:', JSON.stringify(user));
});`
  },
  {
    id: 'debounce',
    name: '4. Hand-Rolled Debounce',
    code: `function debounce(fn, delay = 200) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const logSearch = debounce((query) => {
  console.log('⚡ Debounced Search Executed for:', query);
}, 300);

logSearch('react');
logSearch('react tailwind');
logSearch('react tailwind dojo'); // Only this one will execute after 300ms!`
  }
];

export function JSRunnerPlayground() {
  const [code, setCode] = useState(PRESET_TEMPLATES[0].code);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleRunCode = () => {
    setLogs([]);
    setError(null);

    const capturedLogs = [];
    const customConsole = {
      log: (...args) => {
        capturedLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      },
      error: (...args) => {
        capturedLogs.push(`[ERROR] ` + args.join(' '));
      },
      warn: (...args) => {
        capturedLogs.push(`[WARN] ` + args.join(' '));
      }
    };

    try {
      // Evaluate within safe function wrapper injecting customConsole
      const runFn = new Function('console', code);
      runFn(customConsole);
      setLogs(capturedLogs.length ? capturedLogs : ['Code executed successfully (no console.log emitted).']);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
            <Terminal className="w-3.5 h-3.5" /> Live Sandbox
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">JavaScript Interactive REPL</h2>
          <p className="text-sm text-slate-400 mt-1">
            Write, execute, and experiment with real modern JavaScript code with live console capture.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs transition shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {/* Preset Pickers */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Presets:</span>
        {PRESET_TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => setCode(t.code)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-medium transition"
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Code Editor & Live Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Area */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-amber-400" /> script.js
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold hover:text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={14}
            className="w-full flex-1 p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-xs text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output Console */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400">Captured Console Logs</span>
            <button
              onClick={() => { setLogs([]); setError(null); }}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 overflow-y-auto min-h-[260px]">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!error && logs.length === 0 && (
              <div className="text-slate-600 italic">Click "Run Code" to execute script...</div>
            )}

            {!error && logs.map((log, index) => (
              <div key={index} className="text-emerald-300 leading-relaxed border-b border-slate-800/40 pb-1">
                &gt; {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, RotateCcw, Copy, Check, Sparkles, Terminal, Activity, 
  Layers, Sliders, Zap, Cpu, CheckSquare, Globe, Compass, 
  Rocket, ArrowRight, ShieldCheck, RefreshCw, Send, AlertCircle
} from 'lucide-react';

// --- Widget JS-01: Scope & TDZ Sandbox ---
function ScopeLab() {
  const [activeScope, setActiveScope] = useState('block');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" /> Scope Model Selector
          </h4>
          <div className="flex gap-2">
            {[
              { id: 'block', label: 'Block Scope (let/const)' },
              { id: 'function', label: 'Function Scope (var)' },
              { id: 'tdz', label: 'Temporal Dead Zone' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setActiveScope(s.id)}
                className={`flex-1 py-2 px-2 text-xs font-semibold rounded-xl transition ${
                  activeScope === s.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            {activeScope === 'block' && (
              <p>Variables declared with <code className="text-amber-400 font-mono">let</code> and <code className="text-amber-400 font-mono">const</code> are scoped strictly to the nearest enclosing <code className="text-sky-400 font-mono">{'{ ... }'}</code> block.</p>
            )}
            {activeScope === 'function' && (
              <p>Variables declared with <code className="text-rose-400 font-mono">var</code> escape block statements (<code className="text-sky-400 font-mono">if</code>, <code className="text-sky-400 font-mono">for</code>) and are scoped only by whole functions or the global scope.</p>
            )}
            {activeScope === 'tdz' && (
              <p>The <strong className="text-amber-400 font-semibold">Temporal Dead Zone</strong> is the window from entering a scope until the declaration is evaluated. Accessing the variable before its line throws <code className="text-rose-400 font-mono">ReferenceError</code>.</p>
            )}
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center font-mono text-xs text-amber-300">
          <div className="text-[10px] uppercase font-mono text-slate-500 mb-2 font-bold">Execution Simulation</div>
          {activeScope === 'block' && (
            <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 leading-relaxed">
{`{
  const score = 100;
  console.log(score); // ✅ 100
}
console.log(score); 
// ❌ ReferenceError: score is not defined`}
            </pre>
          )}
          {activeScope === 'function' && (
            <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 leading-relaxed">
{`if (true) {
  var userRole = 'admin'; // ⚠️ Escapes block!
}
console.log(userRole); // 'admin' (leaked)`}
            </pre>
          )}
          {activeScope === 'tdz' && (
            <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 leading-relaxed">
{`// --- TDZ Starts Here ---
console.log(xp); 
// ❌ ReferenceError: Cannot access 'xp' before initialization
const xp = 500; 
// --- TDZ Ends Here ---`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Widget JS-02: Closure Memory Inspector ---
function ClosureLab() {
  const [balance, setBalance] = useState(500);
  const [history, setHistory] = useState([
    { id: 1, action: 'Initialized Account', amount: 500, time: '10:00:00 AM' }
  ]);
  const [amountInput, setAmountInput] = useState('100');

  const handleDeposit = () => {
    const val = Number(amountInput) || 0;
    if (val <= 0) return;
    const next = balance + val;
    setBalance(next);
    setHistory(prev => [
      { id: Date.now(), action: 'Deposit (+)', amount: val, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  const handleWithdraw = () => {
    const val = Number(amountInput) || 0;
    if (val <= 0 || val > balance) return;
    const next = balance - val;
    setBalance(next);
    setHistory(prev => [
      { id: Date.now(), action: 'Withdrawal (-)', amount: val, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Closure Methods Controller</h4>
          
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Private Lexical Variable (let balance)</span>
            <div className="text-3xl font-mono font-bold text-amber-400 my-2">${balance}</div>
            <p className="text-[11px] text-slate-400">Encapsulated inside createBankAccount() closure</p>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={amountInput}
              onChange={e => setAmountInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
            />
            <button
              onClick={handleDeposit}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs"
            >
              deposit()
            </button>
            <button
              onClick={handleWithdraw}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-xs"
            >
              withdraw()
            </button>
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span className="font-bold uppercase">Closure Call Log</span>
            <span className="text-[10px] text-slate-500">{history.length} transactions</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl h-44 overflow-y-auto space-y-1.5 font-mono text-xs">
            {history.map(item => (
              <div key={item.id} className="flex justify-between items-center text-[11px] border-b border-slate-800/60 pb-1">
                <span className={item.action.includes('Deposit') ? 'text-emerald-400 font-semibold' : item.action.includes('Withdraw') ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                  {item.action}
                </span>
                <span className="text-white font-bold">${item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget JS-03: Destructuring & Spread Studio ---
function DestructuringLab() {
  const [role, setRole] = useState('Frontend Architect');
  const [extraSkills, setExtraSkills] = useState(['TypeScript', 'GraphQL']);
  const [newSkill, setNewSkill] = useState('');

  const developerObject = {
    name: 'Alex Vance',
    role,
    contact: { email: 'alex@dojo.dev', country: 'Germany' },
    skills: ['JavaScript', 'React', ...extraSkills]
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    setExtraSkills(prev => [...prev, newSkill.trim()]);
    setNewSkill('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Object & Array Controls</h4>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Update Role</label>
            <input
              type="text"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
            />
          </div>

          <form onSubmit={handleAddSkill} className="space-y-2">
            <label className="text-xs text-slate-400 block">Spread In New Skill (...skills)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="e.g. Next.js"
                className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                + Spread
              </button>
            </div>
          </form>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Destructured Representation</span>
          <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto max-h-56">
            {JSON.stringify(developerObject, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

// --- Widget JS-04: Functional Array Pipeline Lab ---
function ArrayPipelineLab() {
  const [filterThreshold, setFilterThreshold] = useState(50);
  const [multiplier, setMultiplier] = useState(2);

  const rawNumbers = [12, 45, 60, 85, 30, 95, 20];
  const filtered = rawNumbers.filter(n => n >= filterThreshold);
  const mapped = filtered.map(n => n * multiplier);
  const totalSum = mapped.reduce((acc, n) => acc + n, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Pipeline Operators</h4>
          
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Filter: n &gt;= {filterThreshold}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={filterThreshold}
              onChange={e => setFilterThreshold(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Map: n * {multiplier}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 5].map(m => (
                <button
                  key={m}
                  onClick={() => setMultiplier(m)}
                  className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-xl transition ${
                    multiplier === m ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  x{m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">1. Initial Array:</span>
            <span className="text-slate-300">[{rawNumbers.join(', ')}]</span>
          </div>

          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] text-sky-400 uppercase block font-bold">2. After .filter(n &gt;= {filterThreshold}):</span>
            <span className="text-sky-300">[{filtered.join(', ') || 'none'}]</span>
          </div>

          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] text-indigo-400 uppercase block font-bold">3. After .map(n * {multiplier}):</span>
            <span className="text-indigo-300">[{mapped.join(', ') || 'none'}]</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30 flex justify-between items-center">
            <span className="text-[10px] text-amber-400 uppercase font-bold">4. Final .reduce(sum):</span>
            <span className="text-xl font-bold text-amber-400">{totalSum}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget JS-05: Async & Promise Studio ---
function AsyncLab() {
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState(['Ready to execute async pipeline']);

  const runSinglePromise = () => {
    setStatus('loading');
    setLogs(['[Promise] Created pending promise...', 'Waiting for 1500ms API latency...']);

    setTimeout(() => {
      setStatus('success');
      setLogs(prev => [...prev, '✓ [Resolved] API Payload: { id: 101, status: "OK" }', 'Promise fulfilled!']);
    }, 1500);
  };

  const runParallelPromises = () => {
    setStatus('loading');
    setLogs(['[Promise.all] Spawning 3 parallel async tasks...']);

    setTimeout(() => {
      setStatus('success');
      setLogs(prev => [
        ...prev,
        '✓ Task 1 (Auth Token) resolved',
        '✓ Task 2 (User Profile) resolved',
        '✓ Task 3 (Course Feed) resolved',
        '🎉 Promise.all completed concurrently!'
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-center">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Promise Combinator Launcher</h4>
          
          <div className="py-2">
            <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full font-mono ${
              status === 'loading' ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
              status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
              'bg-slate-800 text-slate-400'
            }`}>
              State: {status}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={runSinglePromise}
              disabled={status === 'loading'}
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition"
            >
              Run async / await
            </button>
            <button
              onClick={runParallelPromises}
              disabled={status === 'loading'}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition"
            >
              Run Promise.all()
            </button>
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Execution Stream Console</span>
          <div className="p-3 bg-slate-900 rounded-xl h-40 overflow-y-auto space-y-1 font-mono text-[11px]">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('✓') || log.includes('🎉') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget JS-08: Event Loop & Microtasks Visualizer ---
function EventLoopLab() {
  const [step, setStep] = useState(0);

  const steps = [
    { title: '1. Call Stack (Sync Code)', desc: 'console.log("1. Stack Start") executes immediately on the main thread.', active: 'stack' },
    { title: '2. Web API & Task Queue', desc: 'setTimeout(..., 0) registers timer in Web APIs and queues a Macrotask.', active: 'webapi' },
    { title: '3. Microtask Queue', desc: 'Promise.then(...) adds callback to high-priority Microtask Queue.', active: 'microtask' },
    { title: '4. Stack Finishes', desc: 'console.log("2. Stack End") executes on Call Stack.', active: 'stack' },
    { title: '5. Event Loop drains Microtasks', desc: 'Event Loop executes Promise.then() before any Macrotasks!', active: 'microtask' },
    { title: '6. Event Loop runs Macrotask', desc: 'Finally, setTimeout callback executes.', active: 'macrotask' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Event Loop Step-by-Step Inspector</h4>
          <span className="text-xs font-mono font-bold text-amber-400">Step {step + 1} / {steps.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border text-center transition-all ${
            steps[step].active === 'stack' ? 'bg-amber-500/20 border-amber-500/50 scale-105 shadow-lg shadow-amber-500/10' : 'bg-slate-950 border-slate-800 opacity-60'
          }`}>
            <span className="text-xs font-bold uppercase text-amber-400 block mb-1">Call Stack</span>
            <p className="text-[11px] text-slate-400">Single-threaded LIFO execution</p>
          </div>

          <div className={`p-4 rounded-2xl border text-center transition-all ${
            steps[step].active === 'microtask' ? 'bg-emerald-500/20 border-emerald-500/50 scale-105 shadow-lg shadow-emerald-500/10' : 'bg-slate-950 border-slate-800 opacity-60'
          }`}>
            <span className="text-xs font-bold uppercase text-emerald-400 block mb-1">Microtask Queue</span>
            <p className="text-[11px] text-slate-400">Promises, queueMicrotask</p>
          </div>

          <div className={`p-4 rounded-2xl border text-center transition-all ${
            steps[step].active === 'macrotask' || steps[step].active === 'webapi' ? 'bg-sky-500/20 border-sky-500/50 scale-105 shadow-lg shadow-sky-500/10' : 'bg-slate-950 border-slate-800 opacity-60'
          }`}>
            <span className="text-xs font-bold uppercase text-sky-400 block mb-1">Macrotask Queue</span>
            <p className="text-[11px] text-slate-400">setTimeout, DOM events</p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <h5 className="font-bold text-white text-xs">{steps[step].title}</h5>
            <p className="text-xs text-slate-400 mt-0.5">{steps[step].desc}</p>
          </div>
          <button
            onClick={() => setStep(s => (s + 1) % steps.length)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition ml-4 shrink-0"
          >
            Next Step ➔
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Widget JS-10: Debounce & Throttle Live Visualizer ---
function DebounceLab() {
  const [rawClickCount, setRawClickCount] = useState(0);
  const [debouncedCount, setDebouncedCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);

  const debounceTimerRef = useRef(null);
  const throttleFlagRef = useRef(false);

  const handleRapidClick = () => {
    setRawClickCount(c => c + 1);

    // Debounce (fires 500ms after last click)
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedCount(c => c + 1);
    }, 500);

    // Throttle (fires at most once per 600ms)
    if (!throttleFlagRef.current) {
      setThrottledCount(c => c + 1);
      throttleFlagRef.current = true;
      setTimeout(() => {
        throttleFlagRef.current = false;
      }, 600);
    }
  };

  const handleReset = () => {
    setRawClickCount(0);
    setDebouncedCount(0);
    setThrottledCount(0);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-5 text-center">
        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Debounce vs Throttle Rate Limiting</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Raw Input Events</span>
            <div className="text-3xl font-mono font-black text-rose-400 my-2">{rawClickCount}</div>
            <p className="text-[10px] text-slate-500">Every single user trigger</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-amber-400">Debounced (500ms quiet)</span>
            <div className="text-3xl font-mono font-black text-amber-400 my-2">{debouncedCount}</div>
            <p className="text-[10px] text-slate-500">Fires only after clicking stops</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Throttled (600ms cap)</span>
            <div className="text-3xl font-mono font-black text-emerald-400 my-2">{throttledCount}</div>
            <p className="text-[10px] text-slate-500">Fires at regulated maximum speed</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRapidClick}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-lg shadow-amber-500/20 active:scale-95"
          >
            ⚡ Click Me Rapidly!
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export function JSInteractiveWidget({ moduleId }) {
  switch (moduleId) {
    case 'js-01-foundations': return <ScopeLab />;
    case 'js-02-functions-closures': return <ClosureLab />;
    case 'js-03-objects-destructuring': return <DestructuringLab />;
    case 'js-04-array-methods-fp': return <ArrayPipelineLab />;
    case 'js-05-async-promises': return <AsyncLab />;
    case 'js-08-event-loop-memory': return <EventLoopLab />;
    case 'js-10-interview-polyfills': return <DebounceLab />;
    default: return <ScopeLab />;
  }
}

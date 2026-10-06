import React, { useState } from 'react';
import { 
  Play, RotateCcw, Copy, Check, Terminal, Sliders, 
  Layers, CheckSquare, RefreshCw, Cpu, Globe, Zap, ArrowRight 
} from 'lucide-react';

// --- Widget BJS-01: Live Console Simulator ---
function ConsoleLab() {
  const [logInput, setLogInput] = useState('Hello from JavaScript!');
  const [logs, setLogs] = useState(['Hello from JavaScript!']);

  const handleSend = (e) => {
    e.preventDefault();
    if (!logInput.trim()) return;
    setLogs(prev => [...prev, logInput]);
    setLogInput('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">console.log() Input</h4>
          <form onSubmit={handleSend} className="space-y-3">
            <input
              type="text"
              value={logInput}
              onChange={e => setLogInput(e.target.value)}
              placeholder='Type something to log (e.g. "My Dojo XP: " + 100)'
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
            />
            <button
              type="submit"
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition"
            >
              console.log(value)
            </button>
          </form>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="font-bold">Developer Console Output</span>
            <button onClick={() => setLogs([])} className="text-slate-500 hover:text-slate-300">Clear</button>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl h-36 overflow-y-auto space-y-1 font-mono text-xs text-emerald-400">
            {logs.map((log, i) => (
              <div key={i} className="border-b border-slate-800/50 pb-0.5">&gt; {log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget BJS-02: Math & Variables Calculator ---
function MathLab() {
  const [numA, setNumA] = useState(12);
  const [numB, setNumB] = useState(4);
  const [operator, setOperator] = useState('+');

  const calculate = () => {
    switch (operator) {
      case '+': return numA + numB;
      case '-': return numA - numB;
      case '*': return numA * numB;
      case '/': return numB !== 0 ? (numA / numB).toFixed(2) : 'Error (div by 0)';
      case '%': return numB !== 0 ? numA % numB : 'Error';
      default: return numA + numB;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Arithmetic Variables</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">let numA = {numA}</label>
              <input 
                type="number" 
                value={numA} 
                onChange={e => setNumA(Number(e.target.value))} 
                className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">let numB = {numB}</label>
              <input 
                type="number" 
                value={numB} 
                onChange={e => setNumB(Number(e.target.value))} 
                className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Operator</label>
            <div className="flex gap-2">
              {['+', '-', '*', '/', '%'].map(op => (
                <button
                  key={op}
                  onClick={() => setOperator(op)}
                  className={`flex-1 py-1.5 rounded-xl font-mono text-xs font-bold transition ${
                    operator === op ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Evaluated Result</span>
          <div className="text-4xl font-mono font-black text-emerald-400 my-2">{calculate()}</div>
          <p className="text-xs font-mono text-slate-400">
            let result = {numA} {operator} {numB};
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Widget BJS-03: String Transformer ---
function StringLab() {
  const [text, setText] = useState('Frontend Dojo');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">String Input</h4>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
          />
          <p className="text-xs text-slate-500">
            Strings are immutable sequences of characters with built-in utility methods.
          </p>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-400">.length:</span>
            <span className="text-emerald-400 font-bold">{text.length}</span>
          </div>
          <div className="flex justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-400">.toUpperCase():</span>
            <span className="text-amber-300 font-bold">{text.toUpperCase()}</span>
          </div>
          <div className="flex justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-400">.toLowerCase():</span>
            <span className="text-sky-300 font-bold">{text.toLowerCase()}</span>
          </div>
          <div className="flex justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-400">Template literal:</span>
            <span className="text-purple-300 font-bold">{`Learner: ${text}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget BJS-04: Conditionals Decision Tree ---
function ConditionalsLab() {
  const [score, setScore] = useState(82);

  const getRank = () => {
    if (score >= 90) return { grade: '🥋 Black Belt Master', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (score >= 70) return { grade: '⚡ Green Belt Apprentice', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' };
    if (score >= 50) return { grade: '🌱 White Belt Novice', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    return { grade: '❌ Needs More Practice', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const rank = getRank();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Conditionals Input</h4>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Exam Score: {score}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={score}
              onChange={e => setScore(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Active Branch Result</span>
          <div className={`mt-2 p-4 rounded-2xl border text-sm font-bold ${rank.color}`}>
            {rank.grade}
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2">
            score = {score} ({score >= 50 ? 'Pass' : 'Fail'})
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Widget BJS-05: Loop Step Ticker ---
function LoopLab() {
  const [maxCount, setMaxCount] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep = () => {
    setCurrentStep(s => (s + 1) % (maxCount + 1));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-center">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">For-Loop Controller</h4>
          
          <div className="py-2">
            <span className="text-3xl font-mono font-bold text-emerald-400">i = {currentStep}</span>
            <p className="text-xs text-slate-400 mt-1">Condition: i &lt; {maxCount}</p>
          </div>

          <div className="flex gap-2 justify-center">
            <button
              onClick={handleStep}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition"
            >
              Step (i++) ➔
            </button>
            <button
              onClick={() => setCurrentStep(0)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
          <span className="text-[10px] uppercase text-slate-500 font-bold block">Iteration Stream</span>
          <div className="p-3 bg-slate-900 rounded-xl space-y-1 max-h-36 overflow-y-auto">
            {Array.from({ length: currentStep }).map((_, idx) => (
              <div key={idx} className="text-emerald-400 text-[11px]">
                ✓ Iteration #{idx + 1}: Executed loop body with i = {idx}
              </div>
            ))}
            {currentStep === 0 && (
              <div className="text-slate-600 italic">Click Step to start loop...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget BJS-07: Array Stack Visualizer ---
function ArrayLab() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);
  const [newItem, setNewItem] = useState('');

  const handlePush = () => {
    if (!newItem.trim()) return;
    setItems(prev => [...prev, newItem.trim()]);
    setNewItem('');
  };

  const handlePop = () => {
    setItems(prev => prev.slice(0, -1));
  };

  return (
    <div className="space-y-6">
      <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
          <div className="flex gap-2 flex-1 w-full">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              placeholder="Item name..."
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs flex-1"
            />
            <button
              onClick={handlePush}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs"
            >
              .push()
            </button>
            <button
              onClick={handlePop}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-xs"
            >
              .pop()
            </button>
          </div>
          <span className="text-xs font-mono text-slate-400 font-bold">Length: {items.length}</span>
        </div>

        {/* Array Items */}
        <div className="flex flex-wrap gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] items-center">
          {items.map((item, idx) => (
            <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white flex items-center gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-800 text-emerald-400 rounded">
                [{idx}]
              </span>
              <span>"{item}"</span>
            </div>
          ))}
          {items.length === 0 && <span className="text-xs text-slate-600">Array is empty []</span>}
        </div>
      </div>
    </div>
  );
}

// --- Widget BJS-08: Object Inspector ---
function ObjectLab() {
  const [user, setUser] = useState({
    username: 'CodeNinja',
    rank: 'Green Belt',
    xp: 350
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Object Properties</h4>
          <div>
            <label className="text-xs text-slate-400 block mb-1">user.username</label>
            <input
              type="text"
              value={user.username}
              onChange={e => setUser(u => ({ ...u, username: e.target.value }))}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">user.xp</label>
            <input
              type="number"
              value={user.xp}
              onChange={e => setUser(u => ({ ...u, xp: Number(e.target.value) }))}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono"
            />
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs">
          <span className="text-[10px] uppercase text-slate-500 font-bold block mb-2">Memory JSON Structure</span>
          <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export function BasicJSInteractiveWidget({ moduleId }) {
  switch (moduleId) {
    case 'bjs-01-syntax': return <ConsoleLab />;
    case 'bjs-02-variables-math': return <MathLab />;
    case 'bjs-03-strings': return <StringLab />;
    case 'bjs-04-conditionals': return <ConditionalsLab />;
    case 'bjs-05-loops': return <LoopLab />;
    case 'bjs-07-basic-arrays': return <ArrayLab />;
    case 'bjs-08-basic-objects': return <ObjectLab />;
    default: return <ConsoleLab />;
  }
}

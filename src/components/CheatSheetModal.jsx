import React, { useState } from 'react';
import { X, Copy, Check, FileText, Search } from 'lucide-react';

export function CheatSheetModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('react');
  const [filter, setFilter] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const reactItems = [
    { id: 'r1', title: 'useState hook', code: 'const [state, setState] = useState(initialVal);' },
    { id: 'r2', title: 'useEffect hook with cleanup', code: 'useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, [dep]);' },
    { id: 'r3', title: 'useRef for DOM focus', code: 'const inputRef = useRef(null);\ninputRef.current?.focus();' },
    { id: 'r4', title: 'Context creation & consumption', code: 'const ThemeCtx = createContext();\nconst theme = useContext(ThemeCtx);' },
    { id: 'r5', title: 'useMemo expensive computation', code: 'const memoized = useMemo(() => computeHeavy(data), [data]);' },
    { id: 'r6', title: 'useCallback stable function', code: 'const handleClick = useCallback(() => doSomething(id), [id]);' },
    { id: 'r7', title: 'Conditional rendering ternary', code: '{isLoggedIn ? <Dashboard /> : <LoginForm />}' },
    { id: 'r8', title: 'List mapping with unique key', code: '{items.map(item => <Item key={item.id} {...item} />)}' },
  ];

  const tailwindItems = [
    { id: 't1', title: 'Centered Flexbox', code: 'flex items-center justify-center gap-4' },
    { id: 't2', title: 'Responsive 3-Column Grid', code: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
    { id: 't3', title: 'Modern Glass Card', code: 'bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6' },
    { id: 't4', title: 'Interactive Button with Hover/Active', code: 'bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl transition shadow-lg shadow-sky-500/25' },
    { id: 't5', title: 'Gradient Text Clipping', code: 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400' },
    { id: 't6', title: 'Pill Status Badge', code: 'px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
  ];

  const jsItems = [
    { id: 'j1', title: 'Nullish Coalescing & Optional Chaining', code: 'const city = user?.location?.city ?? "Default City";' },
    { id: 'j2', title: 'Encapsulated Closure Counter', code: 'function counter(i = 0) {\n  let c = i;\n  return { inc: () => ++c, get: () => c };\n}' },
    { id: 'j3', title: 'Array Pipeline (Filter + Map + Reduce)', code: 'const sum = items\n  .filter(x => x.active)\n  .map(x => x.price)\n  .reduce((acc, p) => acc + p, 0);' },
    { id: 'j4', title: 'Async/Await with Error Catching', code: 'async function loadData() {\n  try {\n    const res = await fetch("/api/data");\n    return await res.json();\n  } catch (err) {\n    console.error(err.message);\n  }\n}' },
    { id: 'j5', title: 'Debounce Utility', code: 'function debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}' },
    { id: 'j6', title: 'Deep Clone with structuredClone', code: 'const deepCopy = structuredClone(originalObject);' },
  ];

  const currentList = (activeTab === 'react' ? reactItems : activeTab === 'js' ? jsItems : tailwindItems).filter(item => 
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    item.code.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cheat Sheet & Quick Reference</h3>
              <p className="text-xs text-slate-400">Essential syntax and patterns ready to copy</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row gap-3">
          <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('react')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'react' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              React 18
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'js' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              JavaScript ES6+
            </button>
            <button
              onClick={() => setActiveTab('tailwind')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'tailwind' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tailwind CSS
            </button>
          </div>

          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search cheat sheet patterns..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {currentList.map(item => (
            <div 
              key={item.id}
              className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.title}</span>
                <button
                  onClick={() => handleCopy(item.code, item.id)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-[11px] font-semibold transition"
                >
                  {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 rounded-xl text-[11px] font-mono text-sky-300 overflow-x-auto">
                <code>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

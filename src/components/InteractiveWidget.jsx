import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from 'react';
import { 
  Play, RotateCcw, Copy, Check, Sparkles, Terminal, Flame, 
  Layers, Palette, Sliders, Zap, Cpu, CheckSquare, Globe, 
  Compass, Rocket, Eye, ShieldCheck, RefreshCw, Star, Heart
} from 'lucide-react';

// --- Widget 1: JSX & Virtual DOM Explorer ---
function JSXExplorer() {
  const [name, setName] = useState('Alex');
  const [role, setRole] = useState('Frontend Ninja');
  const [isOnline, setIsOnline] = useState(true);
  const [theme, setTheme] = useState('sky');

  const themeClasses = {
    sky: 'from-sky-500 to-indigo-600 border-sky-500/30 text-sky-400',
    emerald: 'from-emerald-500 to-teal-600 border-emerald-500/30 text-emerald-400',
    purple: 'from-purple-500 to-pink-600 border-purple-500/30 text-purple-400',
    amber: 'from-amber-500 to-orange-600 border-amber-500/30 text-amber-400',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" /> Interactive Props Controller
          </h4>
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Learner Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Specialization</label>
            <input 
              type="text" 
              value={role} 
              onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Online Status</span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                isOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isOnline ? '● Online' : '○ Offline'}
            </button>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block mb-1.5">Color Accent</span>
            <div className="flex gap-2">
              {['sky', 'emerald', 'purple', 'amber'].map(c => (
                <button
                  key={c}
                  onClick={() => setTheme(c)}
                  className={`w-7 h-7 rounded-lg capitalize text-xs font-bold transition border ${
                    theme === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  } ${c === 'sky' ? 'bg-sky-500' : c === 'emerald' ? 'bg-emerald-500' : c === 'purple' ? 'bg-purple-500' : 'bg-amber-500'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Rendered Component */}
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Real DOM Preview
          </div>
          
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs w-full transition-all duration-300">
            <div className="relative">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${themeClasses[theme].split(' ')[0]} ${themeClasses[theme].split(' ')[1]} flex items-center justify-center font-bold text-white shadow-lg`}>
                {name.charAt(0) || 'U'}
              </div>
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-slate-900 ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'
              }`} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-base truncate">{name || 'Unnamed Learner'}</h3>
              <p className="text-xs text-slate-400 truncate">{role || 'Enthusiast'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget 2: Props & Children Composition Lab ---
function PropsLab() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('md');
  const [badgeText, setBadgeText] = useState('NEW');
  const [showIcon, setShowIcon] = useState(true);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Props Configuration</h4>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Variant</label>
            <div className="flex gap-2">
              {['primary', 'secondary', 'danger', 'glass'].map(v => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                    variant === v ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Size</label>
            <div className="flex gap-2">
              {['sm', 'md', 'lg'].map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition ${
                    size === s ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Show Icon Child</span>
            <button 
              onClick={() => setShowIcon(!showIcon)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${showIcon ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'}`}
            >
              {showIcon ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <div className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Composable Component
          </div>

          <button className={`font-semibold rounded-xl transition-all duration-150 flex items-center gap-2 active:scale-95 ${
            variant === 'primary' ? 'bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/25' :
            variant === 'secondary' ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' :
            variant === 'danger' ? 'bg-rose-500 text-white hover:bg-rose-400 shadow-lg shadow-rose-500/25' :
            'bg-slate-900/60 backdrop-blur-md border border-white/10 text-white hover:bg-slate-800/80 shadow-xl'
          } ${
            size === 'sm' ? 'px-3 py-1.5 text-xs' :
            size === 'md' ? 'px-4 py-2 text-sm' :
            'px-6 py-3 text-base'
          }`}>
            {showIcon && <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>Click Action Button</span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-white/20 rounded-md">
              {badgeText}
            </span>
          </button>

          <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-400 w-full text-center">
            {`<Button variant="${variant}" size="${size}" hasIcon={${showIcon}}>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// --- Widget 3: Tailwind Live Interactive Styler ---
function TailwindStyler() {
  const [padding, setPadding] = useState('p-6');
  const [rounded, setRounded] = useState('rounded-2xl');
  const [shadow, setShadow] = useState('shadow-xl');
  const [bgGradient, setBgGradient] = useState('from-sky-500 to-indigo-600');

  const fullClasses = `${padding} ${rounded} ${shadow} bg-gradient-to-r ${bgGradient} text-white transition-all duration-200`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Tailwind Utility Controls</h4>
          
          <div>
            <label className="text-xs text-slate-400 block mb-1">Padding Scale</label>
            <div className="flex gap-2">
              {['p-2', 'p-4', 'p-6', 'p-8'].map(p => (
                <button
                  key={p}
                  onClick={() => setPadding(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                    padding === p ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Border Radius</label>
            <div className="flex gap-2">
              {['rounded-none', 'rounded-lg', 'rounded-2xl', 'rounded-full'].map(r => (
                <button
                  key={r}
                  onClick={() => setRounded(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                    rounded === r ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Color Palette</label>
            <div className="flex gap-2">
              {[
                { label: 'Sky/Indigo', grad: 'from-sky-500 to-indigo-600' },
                { label: 'Emerald/Teal', grad: 'from-emerald-500 to-teal-700' },
                { label: 'Rose/Orange', grad: 'from-rose-500 to-amber-500' },
                { label: 'Violet/Fuchsia', grad: 'from-violet-600 to-fuchsia-600' }
              ].map(g => (
                <button
                  key={g.label}
                  onClick={() => setBgGradient(g.grad)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    bgGradient === g.grad ? 'bg-white text-slate-900 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center items-center space-y-4">
          <div className={fullClasses}>
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 animate-bounce text-amber-300" />
              <div>
                <h3 className="font-bold text-lg">Tailwind In Action</h3>
                <p className="text-xs opacity-90">Atomic styling preview</p>
              </div>
            </div>
          </div>

          <div className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block mb-1 font-bold">Generated ClassName</span>
            <code className="text-xs font-mono text-sky-400 break-all">{fullClasses}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget 4: State & Immutable Array Lab ---
function StateLab() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, text: 'Learn JSX Mental Model', done: true },
    { id: 2, text: 'Master useState immutability', done: false },
    { id: 3, text: 'Build interactive Dojo project', done: false }
  ]);
  const [inputVal, setInputVal] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), text: inputVal.trim(), done: false }]);
    setInputVal('');
  };

  const toggleItem = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const completedCount = items.filter(i => i.done).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* State Counter with step */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Number State</h4>
            <span className="text-xl font-mono font-bold text-sky-400">{count}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCount(c => c - 1)}
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition"
            >
              -1
            </button>
            <button 
              onClick={() => setCount(0)}
              className="px-4 py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-400 rounded-xl text-xs"
            >
              Reset
            </button>
            <button 
              onClick={() => setCount(c => c + 1)}
              className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold transition shadow-lg shadow-sky-500/20"
            >
              +1
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Uses functional updater <code className="text-sky-400">setCount(c =&gt; c + 1)</code> for predictable updates.
          </p>
        </div>

        {/* Array State Manager */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Immutable Array State</h4>
            <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full">
              {completedCount} / {items.length} Done
            </span>
          </div>

          <form onSubmit={addItem} className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Add task to state..."
              className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl"
            >
              Add
            </button>
          </form>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {items.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800/80 text-xs"
              >
                <button 
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center gap-2 text-left ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}
                >
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${
                    item.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600'
                  }`}>
                    {item.done && '✓'}
                  </span>
                  {item.text}
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="text-slate-500 hover:text-rose-400 font-bold px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget 5: Effect & Lifecycle Ticker ---
function EffectLab() {
  const [isRunning, setIsRunning] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [logs, setLogs] = useState(['[Mount] useEffect registered timer']);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const toggleRunning = () => {
    if (isRunning) {
      setLogs(prev => [...prev, `[Cleanup] Timer cleared at ${seconds}s`]);
    } else {
      setLogs(prev => [...prev, `[Effect] Timer resumed`]);
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Live Effect Execution</h4>
          <div className="py-4">
            <span className="text-4xl font-mono font-bold text-sky-400">{seconds}s</span>
            <p className="text-xs text-slate-400 mt-1">
              Status: <span className={isRunning ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {isRunning ? 'RUNNING' : 'PAUSED (CLEANED UP)'}
              </span>
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={toggleRunning}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
                isRunning ? 'bg-amber-500 text-white shadow-amber-500/20' : 'bg-emerald-500 text-white shadow-emerald-500/20'
              }`}
            >
              {isRunning ? '⏸ Pause Timer' : '▶ Start Timer'}
            </button>
            <button
              onClick={() => { setSeconds(0); setLogs(['[Reset] Counter reset to 0']); }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="w-4 h-4 text-emerald-400" /> Lifecycle Events Console
          </div>
          <div className="p-3 bg-slate-900 rounded-xl h-36 overflow-y-auto font-mono text-[11px] space-y-1">
            {logs.map((log, index) => (
              <div key={index} className={log.includes('Cleanup') ? 'text-amber-400' : 'text-emerald-400'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Widget 6: Hooks Visualizer (useRef vs useState) ---
function HooksLab() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  const inputRef = useRef(null);
  const [renderCount, setRenderCount] = useState(1);

  const incrementRef = () => {
    refCount.current += 1;
    // Note: will NOT re-render UI until next state change!
    alert(`Ref value is now ${refCount.current} (UI will not re-render until a state change occurs!)`);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">useState (Triggers Re-render)</h4>
          <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl">
            <span className="text-xs text-slate-400">State Value</span>
            <span className="text-xl font-bold font-mono text-sky-400">{stateCount}</span>
          </div>
          <button
            onClick={() => { setStateCount(c => c + 1); setRenderCount(r => r + 1); }}
            className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-sky-500/20"
          >
            Update State (+1)
          </button>
          <p className="text-[11px] text-slate-500">Component Render Count: <span className="text-white font-mono">{renderCount}</span></p>
        </div>

        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">useRef (DOM & Silent Memory)</h4>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Target input for DOM ref..."
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
            />
            <button
              onClick={focusInput}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
            >
              Focus Ref
            </button>
          </div>
          <button
            onClick={incrementRef}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs border border-slate-700"
          >
            Mutate ref.current (No Re-render)
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Widget 7: Form & Validation Lab ---
function FormLab() {
  const [form, setForm] = useState({ username: '', email: '', role: 'Developer' });
  const [touched, setTouched] = useState({});

  const errors = {
    username: form.username.length < 3 ? 'Username must be at least 3 characters' : null,
    email: !form.email.includes('@') ? 'Enter a valid email address' : null
  };

  const isValid = !errors.username && !errors.email;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Controlled Form</h4>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Username</label>
            <input
              type="text"
              value={form.username}
              onBlur={() => setTouched(t => ({ ...t, username: true }))}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="e.g. dev_alex"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            {touched.username && errors.username && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="alex@example.com"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            {touched.email && errors.email && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
            )}
          </div>

          <button
            disabled={!isValid}
            className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs transition shadow-lg shadow-sky-500/20"
          >
            {isValid ? '✓ Ready to Submit' : 'Fix Validation Errors'}
          </button>
        </div>

        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
          <span className="text-[10px] uppercase font-mono text-slate-500 block mb-2 font-bold">State Payload Preview</span>
          <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-sky-400 overflow-x-auto">
            {JSON.stringify({ form, isValid, errors }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

// --- Widget 8: Global Context Broadcast Lab ---
const GlobalTestContext = createContext(null);

function ContextLab() {
  const [learnerXp, setLearnerXp] = useState(350);
  const [badgeRank, setBadgeRank] = useState('Green Belt');

  return (
    <GlobalTestContext.Provider value={{ learnerXp, setLearnerXp, badgeRank, setBadgeRank }}>
      <div className="space-y-6">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Top-Level Provider Tree</h4>
            <button
              onClick={() => setLearnerXp(x => x + 50)}
              className="px-3 py-1 bg-sky-500 text-white rounded-lg text-xs font-bold shadow"
            >
              +50 XP from Root
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <ContextChildLevelA />
            <ContextChildLevelB />
          </div>
        </div>
      </div>
    </GlobalTestContext.Provider>
  );
}

function ContextChildLevelA() {
  const { learnerXp } = useContext(GlobalTestContext);
  return (
    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
      <span className="text-[10px] uppercase text-slate-500 font-mono">Consumer Component A</span>
      <h4 className="text-white font-bold text-sm mt-1">Learner Progress</h4>
      <p className="text-2xl font-mono font-bold text-emerald-400 mt-2">{learnerXp} XP</p>
    </div>
  );
}

function ContextChildLevelB() {
  const { badgeRank, setBadgeRank } = useContext(GlobalTestContext);
  return (
    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
      <span className="text-[10px] uppercase text-slate-500 font-mono">Consumer Component B</span>
      <h4 className="text-white font-bold text-sm">Dojo Rank: <span className="text-sky-400">{badgeRank}</span></h4>
      <div className="flex gap-1.5">
        {['White Belt', 'Green Belt', 'Black Belt'].map(b => (
          <button
            key={b}
            onClick={() => setBadgeRank(b)}
            className={`px-2 py-1 rounded text-[10px] font-bold ${badgeRank === b ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Widget 9: Simulated SPA Router ---
function RouterLab() {
  const [path, setPath] = useState('/dashboard');

  return (
    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
      {/* Fake Browser URL Bar */}
      <div className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
        <span className="flex gap-1.5 px-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
        </span>
        <span className="text-slate-500">https://dojo.dev</span>
        <span className="text-sky-400 font-bold">{path}</span>
      </div>

      <div className="flex gap-2">
        {[
          { p: '/dashboard', label: '📊 Dashboard' },
          { p: '/lessons/react-hooks', label: '📚 /lessons/:id' },
          { p: '/settings/profile', label: '⚙️ Settings' }
        ].map(item => (
          <button
            key={item.p}
            onClick={() => setPath(item.p)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              path === item.p ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center">
        <h4 className="text-white font-bold">Mounted View: <span className="text-sky-400 font-mono">{path}</span></h4>
        <p className="text-xs text-slate-400 mt-1">Instant view transition with no full-page browser refresh.</p>
      </div>
    </div>
  );
}

// --- Widget 10: Capstone Project Showcase Launcher ---
function ProductionLab() {
  const [featureFlags, setFeatureFlags] = useState({
    darkTheme: true,
    instantSearch: true,
    gamificationXP: true
  });

  const toggleFlag = (flag) => {
    setFeatureFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Production Feature Flags</h4>
      <div className="space-y-2">
        {Object.entries(featureFlags).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <div>
              <span className="font-mono text-xs text-white capitalize">{key}</span>
              <p className="text-[10px] text-slate-500">Live feature toggle in application context</p>
            </div>
            <button
              onClick={() => toggleFlag(key)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                value ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {value ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InteractiveWidget({ moduleId }) {
  switch (moduleId) {
    case '01-foundations-jsx': return <JSXExplorer />;
    case '02-components-props': return <PropsLab />;
    case '03-tailwind-mastery': return <TailwindStyler />;
    case '04-state-events': return <StateLab />;
    case '05-effects-lifecycle': return <EffectLab />;
    case '06-essential-hooks': return <HooksLab />;
    case '07-forms-validation': return <FormLab />;
    case '08-context-state': return <ContextLab />;
    case '09-routing-navigation': return <RouterLab />;
    case '10-production-projects': return <ProductionLab />;
    default: return <JSXExplorer />;
  }
}

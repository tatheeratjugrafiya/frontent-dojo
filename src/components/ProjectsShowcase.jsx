import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Trash2, Plus, Sparkles, TrendingUp, TrendingDown, 
  Search, Kanban, ListTodo, Activity, ArrowRight, ArrowLeft, Tag, Trophy
} from 'lucide-react';

// ==========================================
// Project 1: FocusFlow Task & Streak Engine
// ==========================================
function FocusFlowProject() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('dojo_tasks');
      return saved ? JSON.parse(saved) : [
        { id: 1, title: 'Complete Module 1: JSX Foundations', category: 'Study', done: true },
        { id: 2, title: 'Practice Flexbox alignment in Tailwind Sandbox', category: 'Design', done: true },
        { id: 3, title: 'Build custom useLocalStorage hook', category: 'Code', done: false }
      ];
    } catch {
      return [];
    }
  });

  const [inputTitle, setInputTitle] = useState('');
  const [category, setCategory] = useState('Study');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('dojo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;
    setTasks(prev => [
      { id: Date.now(), title: inputTitle.trim(), category, done: false },
      ...prev
    ]);
    setInputTitle('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 max-w-2xl mx-auto shadow-2xl">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-sky-400" /> FocusFlow Task Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Built with useState, useEffect, localStorage & Tailwind</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Completion</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{progressPercent}%</span>
          </div>
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={inputTitle}
          onChange={e => setInputTitle(e.target.value)}
          placeholder="What do you want to accomplish?"
          className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-2xl text-white text-xs font-semibold focus:outline-none"
        >
          <option value="Study">📚 Study</option>
          <option value="Code">💻 Code</option>
          <option value="Design">🎨 Design</option>
        </select>
        <button
          type="submit"
          className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-2xl transition shadow-lg shadow-sky-500/25 flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Filter Tabs */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition ${
                filter === f ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-slate-500 font-mono">{tasks.length} tasks total</span>
      </div>

      {/* Task List */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filteredTasks.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">No tasks found in this view.</div>
        ) : (
          filteredTasks.map(t => (
            <div
              key={t.id}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                t.done ? 'bg-slate-950/60 border-slate-900 opacity-60' : 'bg-slate-800/80 border-slate-700/80 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => toggleTask(t.id)}
                  className="text-sky-400 hover:scale-110 transition shrink-0"
                >
                  {t.done ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-slate-500" />}
                </button>
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${t.done ? 'line-through text-slate-400' : 'text-white'}`}>
                    {t.title}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-400/80">
                    {t.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteTask(t.id)}
                className="text-slate-500 hover:text-rose-400 p-1.5 transition rounded-lg hover:bg-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// Project 2: CryptoPulse Market Tracker
// ==========================================
function CryptoPulseProject() {
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState([
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 64230, change: 2.45, cap: '1.26T', icon: '₿' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3480, change: -1.15, cap: '418B', icon: 'Ξ' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', price: 148.5, change: 8.92, cap: '68B', icon: '◎' },
    { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.48, change: -0.84, cap: '17B', icon: '₳' },
    { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.20, change: 4.12, cap: '10B', icon: '●' },
    { id: 'avax', name: 'Avalanche', symbol: 'AVAX', price: 28.4, change: 3.80, cap: '11B', icon: '▲' },
  ]);

  // Simulate live price ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prev => prev.map(coin => {
        const delta = (Math.random() - 0.48) * (coin.price * 0.004);
        const newPrice = Math.max(0.01, +(coin.price + delta).toFixed(2));
        const newChange = +((coin.change + (Math.random() - 0.5) * 0.2).toFixed(2));
        return { ...coin, price: newPrice, change: newChange };
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 max-w-4xl mx-auto shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" /> CryptoPulse Live Ticker
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time simulation of asynchronous state updates & market grids</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search coin..."
            className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCoins.map(coin => (
          <div 
            key={coin.id}
            className="p-5 bg-slate-950/80 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-white text-sm">
                  {coin.icon}
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm leading-tight">{coin.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">{coin.symbol}</span>
                </div>
              </div>

              <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                coin.change >= 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
              }`}>
                {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {coin.change >= 0 ? '+' : ''}{coin.change}%
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-slate-900">
              <span className="text-lg font-mono font-black text-white">
                ${coin.price.toLocaleString()}
              </span>
              <span className="text-[11px] font-mono text-slate-500">Cap: {coin.cap}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Project 3: Kanban Sprint Board
// ==========================================
function KanbanBoardProject() {
  const [columns, setColumns] = useState({
    todo: [
      { id: 'c1', title: 'Design Glassmorphism Navbar', tag: 'UI' },
      { id: 'c2', title: 'Write unit tests for custom hook', tag: 'Testing' }
    ],
    inProgress: [
      { id: 'c3', title: 'Implement React Router dynamic params', tag: 'Core' },
      { id: 'c4', title: 'Add dark mode persistence in Context', tag: 'State' }
    ],
    done: [
      { id: 'c5', title: 'Setup Vite + Tailwind CSS project', tag: 'Setup' }
    ]
  });

  const moveCard = (cardId, fromCol, toCol) => {
    const card = columns[fromCol].find(c => c.id === cardId);
    if (!card) return;

    setColumns(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
      [toCol]: [...prev[toCol], card]
    }));
  };

  const colNames = [
    { key: 'todo', label: '📋 Backlog', color: 'border-sky-500/40' },
    { key: 'inProgress', label: '⚡ In Progress', color: 'border-amber-500/40' },
    { key: 'done', label: '🎉 Done', color: 'border-emerald-500/40' }
  ];

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 max-w-5xl mx-auto shadow-2xl">
      <div>
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Kanban className="w-5 h-5 text-indigo-400" /> Kanban Sprint Engine
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Multi-column state management & interactive transitions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {colNames.map(col => (
          <div 
            key={col.key}
            className={`p-4 bg-slate-950 rounded-2xl border ${col.color} space-y-3 flex flex-col min-h-[300px]`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">{col.label}</h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-800 rounded-full text-slate-300">
                {columns[col.key].length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1">
              {columns[col.key].map(card => (
                <div 
                  key={card.id}
                  className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 shadow-sm hover:border-slate-700 transition"
                >
                  <p className="text-xs font-semibold text-white">{card.title}</p>
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-sky-400 rounded-md font-semibold">
                      #{card.tag}
                    </span>

                    <div className="flex gap-1">
                      {col.key !== 'todo' && (
                        <button
                          onClick={() => moveCard(card.id, col.key, col.key === 'done' ? 'inProgress' : 'todo')}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                          title="Move Left"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      )}
                      {col.key !== 'done' && (
                        <button
                          onClick={() => moveCard(card.id, col.key, col.key === 'todo' ? 'inProgress' : 'done')}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                          title="Move Right"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState('focus');

  return (
    <div className="space-y-6">
      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
            <Trophy className="w-3.5 h-3.5" /> Full Production Blueprints
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Interactive Capstone Projects</h2>
          <p className="text-sm text-slate-400 mt-1">
            Complete real-world applications featuring clean state architectures, persistence, and Tailwind CSS.
          </p>
        </div>

        <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 gap-1">
          {[
            { id: 'focus', label: '1. FocusFlow Todo', icon: ListTodo },
            { id: 'crypto', label: '2. CryptoPulse Ticker', icon: Activity },
            { id: 'kanban', label: '3. Kanban Board', icon: Kanban },
          ].map(p => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProject(p.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeProject === p.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeProject === 'focus' && <FocusFlowProject />}
      {activeProject === 'crypto' && <CryptoPulseProject />}
      {activeProject === 'kanban' && <KanbanBoardProject />}
    </div>
  );
}

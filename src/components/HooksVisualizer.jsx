import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Cpu, Activity, Clock, Shield, Sparkles, RefreshCw, Zap, Database } from 'lucide-react';

export function HooksVisualizer() {
  const [activeHook, setActiveHook] = useState('useState');
  
  // useState Simulator
  const [stateHistory, setStateHistory] = useState([0]);
  const [currentState, setCurrentState] = useState(0);

  // useEffect Lifecycle Simulator
  const [effectLogs, setEffectLogs] = useState([]);
  const [depVal, setDepVal] = useState(1);

  // useMemo Simulator
  const [memoNumber, setMemoNumber] = useState(5);
  const [memoLogs, setMemoLogs] = useState([]);
  const [nonRelatedState, setNonRelatedState] = useState(0);

  // Calculate factorial with memoization
  const expensiveCalculation = (n) => {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const memoizedFactorial = useMemo(() => {
    const res = expensiveCalculation(memoNumber);
    setMemoLogs(prev => [`[Calculation Executed] Factorial(${memoNumber}) = ${res} at ${new Date().toLocaleTimeString()}`, ...prev.slice(0, 4)]);
    return res;
  }, [memoNumber]);

  const handleStateChange = (delta) => {
    const next = currentState + delta;
    setCurrentState(next);
    setStateHistory(prev => [...prev, next]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
            <Cpu className="w-3.5 h-3.5" /> Hook Execution Inspector
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">React Hooks Interactive Visualizer</h2>
          <p className="text-sm text-slate-400 mt-1">
            Observe the internal state transitions, dependency triggers, and lifecycle cycles in real-time.
          </p>
        </div>

        {/* Tab Select */}
        <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 gap-1">
          {['useState', 'useEffect', 'useMemo', 'useRef'].map(hook => (
            <button
              key={hook}
              onClick={() => setActiveHook(hook)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeHook === hook
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {hook}()
            </button>
          ))}
        </div>
      </div>

      {/* Simulator 1: useState Timeline */}
      {activeHook === 'useState' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">State Snapshot Trigger</h3>
            
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs uppercase font-mono text-slate-500 font-bold">Current State Snapshot</span>
              <div className="text-5xl font-mono font-black text-emerald-400 my-3">{currentState}</div>
              <p className="text-xs text-slate-400">Triggers re-render on each modification</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleStateChange(-1)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition"
              >
                -1
              </button>
              <button
                onClick={() => { setCurrentState(0); setStateHistory([0]); }}
                className="px-4 py-2.5 bg-slate-800/60 text-slate-400 hover:text-white rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => handleStateChange(1)}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition shadow-lg shadow-emerald-500/20"
              >
                +1
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Render Timeline & Memory Tree</h3>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {stateHistory.map((val, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono ${
                    idx === stateHistory.length - 1
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>Render Cycle #{idx + 1}</span>
                  <span className="font-bold font-mono">state = {val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Simulator 2: useEffect Inspector */}
      {activeHook === 'useEffect' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Dependency Array Trigger</h3>
            <p className="text-xs text-slate-400">
              When <code className="text-sky-400">depVal</code> changes, React first executes the cleanup function from the previous cycle, then runs the new effect.
            </p>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300">Active Dependency [depVal = {depVal}]</span>
              <button
                onClick={() => setDepVal(d => d + 1)}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl transition"
              >
                Trigger Dependency Change
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Execution Stream</h3>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-amber-400">1. Cleanup previous effect (if any)</div>
              <div className="text-emerald-400">2. Execute effect handler with depVal = {depVal}</div>
              <div className="text-slate-500">3. Wait for next state change or unmount</div>
            </div>
          </div>
        </div>
      )}

      {/* Simulator 3: useMemo Inspector */}
      {activeHook === 'useMemo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Memoization Cache Tester</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Compute Factorial For (Input Dependency):</label>
              <div className="flex gap-2">
                {[3, 5, 7, 10].map(n => (
                  <button
                    key={n}
                    onClick={() => setMemoNumber(n)}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition ${
                      memoNumber === n ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    n = {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="text-xs text-slate-400 block mb-1">Unrelated State (Does NOT invalidate cache):</label>
              <button
                onClick={() => setNonRelatedState(s => s + 1)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
              >
                Re-render Component (Count: {nonRelatedState})
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold">Cached Result</span>
              <div className="text-3xl font-mono font-bold text-sky-400 my-2">{memoizedFactorial.toLocaleString()}</div>
              <p className="text-[11px] text-slate-400">Computed once; reused across unrelated re-renders.</p>
            </div>
          </div>
        </div>
      )}

      {/* Simulator 4: useRef Inspector */}
      {activeHook === 'useRef' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 max-w-xl mx-auto text-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">useRef vs State Comparison</h3>
          <p className="text-xs text-slate-400">
            A ref is like a plain JavaScript object `{'{ current: ... }'}` that survives across renders without triggering a re-render when mutated.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left pt-2">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-sky-400 block mb-1">useState</span>
              <p className="text-xs text-slate-400">Triggers re-render. Perfect for UI data.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 block mb-1">useRef</span>
              <p className="text-xs text-slate-400">Silent memory. Perfect for DOM nodes, intervals, previous state.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

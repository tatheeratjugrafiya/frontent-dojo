import React, { useState } from 'react';
import { Copy, Check, Sparkles, Layout, Type, Palette, Box, Layers, RefreshCw } from 'lucide-react';

export function TailwindPlayground() {
  const [activeTab, setActiveTab] = useState('flexbox');
  const [copied, setCopied] = useState(false);

  // Flexbox state
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('justify-between');
  const [alignItems, setAlignItems] = useState('items-center');
  const [gap, setGap] = useState('gap-4');
  const [itemCount, setItemCount] = useState(3);

  // Grid state
  const [gridCols, setGridCols] = useState('grid-cols-3');
  const [gridGap, setGridGap] = useState('gap-4');

  // Card Styler state
  const [cardBg, setCardBg] = useState('bg-slate-900');
  const [cardBorder, setCardBorder] = useState('border-slate-800');
  const [cardRounded, setCardRounded] = useState('rounded-2xl');
  const [cardShadow, setCardShadow] = useState('shadow-2xl');
  const [cardPadding, setCardPadding] = useState('p-6');
  const [cardHover, setCardHover] = useState('hover:border-sky-500/50 hover:scale-[1.02]');

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFlexClass = () => `flex flex-${flexDirection} ${justifyContent} ${alignItems} ${gap} p-6 bg-slate-950 rounded-2xl border border-slate-800 min-h-[220px] transition-all`;
  const getGridClass = () => `grid ${gridCols} ${gridGap} p-6 bg-slate-950 rounded-2xl border border-slate-800 transition-all`;
  const getCardClass = `${cardPadding} ${cardBg} ${cardBorder} border ${cardRounded} ${cardShadow} ${cardHover} transition-all duration-200`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Design Studio
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Tailwind Visual Playground</h2>
          <p className="text-sm text-slate-400 mt-1">
            Experiment with layout flexbox, grids, tokens, and generate production-ready utility classes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 gap-1">
          {[
            { id: 'flexbox', label: 'Flexbox Studio', icon: Layout },
            { id: 'grid', label: 'CSS Grid Studio', icon: Box },
            { id: 'card', label: 'Card Component Styler', icon: Layers },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Flexbox Studio */}
      {activeTab === 'flexbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Flexbox Controls</h3>
            
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Direction (flex-direction)</label>
              <div className="grid grid-cols-2 gap-2">
                {['row', 'col'].map(d => (
                  <button
                    key={d}
                    onClick={() => setFlexDirection(d)}
                    className={`py-2 text-xs font-mono rounded-xl font-semibold transition ${
                      flexDirection === d ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    flex-{d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Justify Content (Main Axis)</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['justify-start', 'justify-center', 'justify-between', 'justify-end'].map(j => (
                  <button
                    key={j}
                    onClick={() => setJustifyContent(j)}
                    className={`py-1.5 px-2 text-[11px] font-mono rounded-lg font-medium transition text-left ${
                      justifyContent === j ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Align Items (Cross Axis)</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['items-start', 'items-center', 'items-end', 'items-stretch'].map(a => (
                  <button
                    key={a}
                    onClick={() => setAlignItems(a)}
                    className={`py-1.5 px-2 text-[11px] font-mono rounded-lg font-medium transition text-left ${
                      alignItems === a ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Gap Size</label>
              <div className="flex gap-2">
                {['gap-2', 'gap-4', 'gap-8', 'gap-12'].map(g => (
                  <button
                    key={g}
                    onClick={() => setGap(g)}
                    className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition ${
                      gap === g ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <span className="text-xs text-slate-400">Child Elements</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold"
                >
                  -
                </button>
                <span className="font-mono text-xs text-white py-1">{itemCount} items</span>
                <button 
                  onClick={() => setItemCount(Math.min(6, itemCount + 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Live Canvas */}
          <div className="lg:col-span-2 space-y-4 flex flex-col">
            <div className={getFlexClass()}>
              {Array.from({ length: itemCount }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-500/30 rounded-2xl text-center min-w-[100px] shadow-lg animate-fadeIn"
                >
                  <span className="text-xs font-mono font-bold text-sky-400">Item #{i + 1}</span>
                  <div className="w-8 h-8 mx-auto mt-2 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Generated Code Snippet */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
              <code className="text-xs font-mono text-sky-400 break-all pr-4">
                {`<div className="${getFlexClass().split(' ').filter(c => !c.includes('slate')).join(' ')}">`}
              </code>
              <button
                onClick={() => handleCopy(getFlexClass())}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CSS Grid Studio */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">CSS Grid Controls</h3>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Column Template</label>
              <div className="grid grid-cols-2 gap-2">
                {['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'].map(c => (
                  <button
                    key={c}
                    onClick={() => setGridCols(c)}
                    className={`py-2 text-xs font-mono rounded-xl font-semibold transition ${
                      gridCols === c ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Grid Gap</label>
              <div className="flex gap-2">
                {['gap-2', 'gap-4', 'gap-6', 'gap-8'].map(g => (
                  <button
                    key={g}
                    onClick={() => setGridGap(g)}
                    className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition ${
                      gridGap === g ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className={getGridClass()}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-5 bg-slate-900 border border-slate-800/80 rounded-2xl text-center shadow-lg"
                >
                  <span className="text-xs uppercase font-mono text-slate-500 font-semibold">Column Card</span>
                  <h4 className="text-sm font-bold text-white mt-1">Grid Item {i + 1}</h4>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
              <code className="text-xs font-mono text-sky-400">
                {`<div className="grid ${gridCols} ${gridGap}">`}
              </code>
              <button
                onClick={() => handleCopy(`grid ${gridCols} ${gridGap}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Card Component Styler */}
      {activeTab === 'card' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Token Customizer</h3>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Background Surface</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: 'Solid Dark', c: 'bg-slate-900' },
                  { l: 'Glassy Dark', c: 'bg-slate-900/60 backdrop-blur-xl' },
                  { l: 'Gradient Sky', c: 'bg-gradient-to-tr from-slate-900 to-sky-950' },
                  { l: 'Deep Black', c: 'bg-black' }
                ].map(b => (
                  <button
                    key={b.l}
                    onClick={() => setCardBg(b.c)}
                    className={`py-1.5 px-2 text-xs rounded-xl font-medium transition ${
                      cardBg === b.c ? 'bg-sky-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {b.l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Border Radius</label>
              <div className="flex gap-2">
                {['rounded-lg', 'rounded-2xl', 'rounded-3xl', 'rounded-full'].map(r => (
                  <button
                    key={r}
                    onClick={() => setCardRounded(r)}
                    className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition ${
                      cardRounded === r ? 'bg-sky-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Shadow Depth</label>
              <div className="flex gap-2">
                {['shadow-none', 'shadow-md', 'shadow-2xl', 'shadow-sky-500/20'].map(s => (
                  <button
                    key={s}
                    onClick={() => setCardShadow(s)}
                    className={`flex-1 py-1.5 text-[10px] font-mono rounded-lg transition ${
                      cardShadow === s ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4 flex flex-col justify-center items-center">
            <div className={getCardClass}>
              <div className="flex items-center justify-between gap-6 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xl">
                  ⚛️
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
                  Verified Component
                </span>
              </div>
              <h3 className="text-xl font-black text-white">Modern Card Architecture</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Tokens crafted with Tailwind atomic primitives render fast and look razor-sharp on every display.
              </p>
            </div>

            <div className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
              <code className="text-xs font-mono text-sky-400 break-all pr-4">
                {`<div className="${getCardClass}">`}
              </code>
              <button
                onClick={() => handleCopy(getCardClass)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

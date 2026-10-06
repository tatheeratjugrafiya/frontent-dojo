# Module 04: State & Event Handling

## 1. What is State?
State is a component's personal memory. Unlike regular JavaScript variables that reset when a function finishes executing, React state persists across component re-renders.

```jsx
import { useState } from 'react';

function Counter() {
  // count: current state value
  // setCount: setter function to update state and trigger re-render
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl">
      <button 
        onClick={() => setCount(prev => prev - 1)}
        className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
      >
        -
      </button>
      <span className="text-xl font-bold font-mono text-sky-400 w-12 text-center">{count}</span>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        className="w-8 h-8 rounded-lg bg-sky-500 text-white font-bold hover:bg-sky-400"
      >
        +
      </button>
    </div>
  );
}
```

---

## 2. Event Handling in React
React wraps browser native events with **SyntheticEvent** objects to provide cross-browser consistency.

### Common Event Handlers:
- `onClick` (Buttons, clickable elements)
- `onChange` (Inputs, textareas, selects)
- `onSubmit` (Forms)
- `onKeyDown` / `onKeyUp` (Keyboard navigation)
- `onMouseEnter` / `onMouseLeave` (Hover interactions)

```jsx
function SearchBox() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search lessons & cheat sheets..."
        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      {query && (
        <button 
          onClick={handleClear}
          className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
}
```

---

## 3. The Holy Grail Rule: State Immutability
In React, you MUST NEVER mutate state objects or arrays directly. Always create a new copy!

### Modifying Objects:
```jsx
const [user, setUser] = useState({ name: 'Alex', level: 1, role: 'Apprentice' });

// ❌ WRONG (Direct Mutation - will not trigger re-render):
user.level = 2;

// ✅ CORRECT (Spread operator creates a new object):
setUser(prev => ({
  ...prev,
  level: prev.level + 1
}));
```

### Modifying Arrays:
```jsx
const [tasks, setTasks] = useState([
  { id: 1, title: 'Learn JSX', done: true },
  { id: 2, title: 'Master useState', done: false }
]);

// ✅ Add item:
setTasks(prev => [...prev, { id: 3, title: 'Explore useEffect', done: false }]);

// ✅ Delete item:
setTasks(prev => prev.filter(t => t.id !== targetId));

// ✅ Update item:
setTasks(prev => prev.map(t => t.id === targetId ? { ...t, done: !t.done } : t));
```

---

## 4. Derived State vs Redundant State
If a value can be computed from existing state or props, **do NOT store it in state**.

```jsx
// ❌ BAD: Redundant state
const [items, setItems] = useState([10, 20, 30]);
const [total, setTotal] = useState(60); // Must constantly sync with items

// ✅ GOOD: Derived state computed on every render
const [items, setItems] = useState([10, 20, 30]);
const total = items.reduce((acc, curr) => acc + curr, 0);
const itemCount = items.length;
```

# Module 06: Essential React Hooks

## 1. `useRef`: Mutable Refs & DOM Access
`useRef` returns a mutable object `{ current: initialValue }` whose `.current` property persists across re-renders **WITHOUT** triggering a re-render when changed.

### Use Case 1: Focusing an Input on Mount
```jsx
import { useRef, useEffect } from 'react';

function SearchBar() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input 
      ref={inputRef} 
      type="text" 
      placeholder="Instant focus search..."
      className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
    />
  );
}
```

### Use Case 2: Storing Timer IDs or Previous Values
```jsx
const timerIdRef = useRef(null);

const startTimer = () => {
  timerIdRef.current = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerIdRef.current);
};
```

---

## 2. `useMemo`: Caching Expensive Computations
`useMemo` caches the calculated result of an expensive function between renders until its dependencies change.

```jsx
import { useMemo } from 'react';

function ProductList({ products, searchFilter }) {
  // Only re-runs filtering if products or searchFilter changes
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [products, searchFilter]);

  return (
    <div>
      <p className="text-slate-400 text-sm">Showing {filteredProducts.length} items</p>
      {/* Render list */}
    </div>
  );
}
```

---

## 3. `useCallback`: Memoizing Callback Functions
`useCallback` returns a memoized version of the callback function that only changes if one of the dependencies has changed. Useful when passing callbacks to optimized child components wrapped in `React.memo`.

```jsx
import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  const handleDelete = useCallback((id) => {
    console.log('Deleting item', id);
  }, []); // Re-used across renders!

  return <ChildList onDelete={handleDelete} />;
}
```

---

## 4. Building Custom Hooks
Custom hooks are regular JavaScript functions whose names start with `use` and can call other React hooks. They encapsulate and share reusable stateful logic!

### Example: `useLocalStorage` Custom Hook
```jsx
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }, [key, value]);

  return [value, setValue];
}
```

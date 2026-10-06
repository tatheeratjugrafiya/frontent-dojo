# Module 05: Side Effects & Lifecycle (`useEffect`)

## 1. What is a Side Effect?
A side effect is any operation that reaches outside the pure render cycle of a React component. 

Common examples:
- Fetching data from an API
- Subscribing to browser events (window resize, scroll, timers)
- Manually manipulating the DOM (outside React)
- Setting up WebSockets or Intervals

---

## 2. Anatomy of `useEffect`
```jsx
useEffect(() => {
  // 1. Setup code (runs after render)

  return () => {
    // 2. Cleanup code (runs before unmount or next effect run)
  };
}, [dependencies]); // 3. Dependency Array
```

### The 3 Dependency Array Flavors:
1. **No Dependency Array (`useEffect(fn)`)**:
   - Runs after **every single render**. (Rarely what you want).
2. **Empty Array (`useEffect(fn, [])`)**:
   - Runs **only once** when the component mounts.
3. **With Dependencies (`useEffect(fn, [userId, filter])`)**:
   - Runs on mount AND whenever any dependency value changes (`userId` or `filter`).

---

## 3. Real-World Data Fetching Pattern
Always handle loading, error, and race condition states cleanly:

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController prevents race conditions & memory leaks
    const controller = new AbortController();
    
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();

    return () => controller.abort(); // Cleanup on unmount
  }, []);

  if (loading) return <div className="p-8 text-sky-400 animate-pulse">Loading learners...</div>;
  if (error) return <div className="p-8 text-rose-400">Error: {error}</div>;

  return (
    <ul className="divide-y divide-slate-800">
      {users.map(u => (
        <li key={u.id} className="py-3 flex justify-between items-center text-sm">
          <span className="text-white font-medium">{u.name}</span>
          <span className="text-slate-400">{u.email}</span>
        </li>
      ))}
    </ul>
  );
}
```

---

## 4. Subscribing to Event Listeners & Timers
Always return a cleanup function to avoid memory leaks:

```jsx
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  
  // Cleanup listener
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

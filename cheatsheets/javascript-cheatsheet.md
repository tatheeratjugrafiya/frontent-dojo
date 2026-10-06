# 💛 Modern JavaScript (ES6+ to ES2026) Quick Reference & Cheat Sheet

## 1. Declarations & Operators
```javascript
const immutableBinding = 42;
let reassignable = 'hello';

// Optional Chaining & Nullish Coalescing
const city = user?.address?.city ?? 'Default City';

// Destructuring & Defaults
const { name, age = 18 } = user;
const [first, ...rest] = items;
```

---

## 2. Essential Array Methods
| Method | Mutates? | Returns | Purpose |
| :--- | :--- | :--- | :--- |
| `map(fn)` | ❌ No | New Array | Transform each item |
| `filter(fn)` | ❌ No | New Array | Keep items where `fn(item) === true` |
| `reduce(fn, init)` | ❌ No | Single Value | Accumulate items into total/object/array |
| `find(fn)` | ❌ No | First item/undefined | Find item matching predicate |
| `some(fn)` | ❌ No | Boolean | Check if AT LEAST ONE matches |
| `every(fn)` | ❌ No | Boolean | Check if ALL match |
| `flat(depth)` | ❌ No | New Array | Flatten nested arrays |
| `slice(start, end)` | ❌ No | New Array | Extract sub-array (non-mutating) |
| `splice(start, del, ...ins)` | ✅ Yes | Removed items | Insert/delete in-place (mutates!) |

---

## 3. Async / Await & Promises
```javascript
// Promise creation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Async/Await with try/catch
async function fetchUserData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

// Parallel Execution
const [p1, p2] = await Promise.all([task1(), task2()]);
```

---

## 4. Closures & Scopes
```javascript
function createIdGenerator(prefix = 'id_') {
  let seq = 0; // Private enclosed state
  return () => `${prefix}${++seq}`;
}
const nextId = createIdGenerator('user_');
nextId(); // 'user_1'
nextId(); // 'user_2'
```

---

## 5. Event Loop Priority Rule
```
1. Synchronous Code (Call Stack)
2. Microtask Queue (Promises .then, queueMicrotask)
3. Macrotask Queue (setTimeout, setInterval, DOM events)
```

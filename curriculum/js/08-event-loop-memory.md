# Module JS-08: Deep Dive: Event Loop, Memory Heap & Concurrency

## 1. The V8 Engine Architecture
JavaScript engines (like Google Chrome / Node.js's V8) contain:
- **Memory Heap**: Unstructured memory pool for object allocation.
- **Call Stack**: Single LIFO (Last-In-First-Out) execution stack tracking current function calls.
- **Microtask Queue**: High priority queue (Promises `.then`, `queueMicrotask`, `MutationObserver`).
- **Macrotask Queue / Callback Queue**: Standard queue (`setTimeout`, `setInterval`, DOM events, I/O).

---

## 2. Microtasks vs Macrotasks Execution Order
**Golden Rule**: The Event Loop empties the ENTIRE Microtask Queue before executing the next Macrotask!

```javascript
console.log('1. Synchronous Stack');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('2. Microtask 1 (Promise.then)');
}).then(() => {
  console.log('3. Microtask 2 (Promise.then chained)');
});

console.log('5. Synchronous End');

// Order of execution:
// 1. Synchronous Stack
// 5. Synchronous End
// 2. Microtask 1 (Promise.then)
// 3. Microtask 2 (Promise.then chained)
// 4. Macrotask (setTimeout)
```

---

## 3. Memory Management & Garbage Collection
V8 uses a **Generational Garbage Collector** (Mark-and-Sweep):
- **Roots**: Global variables, currently executing function scopes.
- Objects unreachable from roots are marked for collection.

### Common Memory Leak Pitfalls:
1. Forgotten `setInterval` timers not cleared.
2. Unremoved event listeners on detached DOM elements.
3. Unintentional global variables (`window.heavyCache = ...`).
4. Closures holding large obsolete objects.

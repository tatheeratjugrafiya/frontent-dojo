# Module JS-02: Functions, Arrow Functions & Closures

## 1. Function Declarations vs Arrow Functions

### Function Declarations:
- Hoisted to the top of their scope.
- Have their own dynamic `this`, `arguments` object, and can be used as constructors (`new Func()`).

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

### Arrow Functions (`=>`):
- Not hoisted.
- Do **NOT** have their own `this` — they inherit `this` lexically from the enclosing scope.
- Concise syntax, ideal for callbacks.

```javascript
const add = (a, b) => a + b;
const multiplyByTwo = n => n * 2;
```

---

## 2. What is a Closure?
A **closure** is the combination of a function bundled together with references to its surrounding lexical environment. 

In plain terms: **A function remembers and retains access to variables from its outer scope even after that outer function has finished executing.**

```javascript
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable enclosed in closure!

  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter1 = createCounter(10);
console.log(counter1.increment()); // 11
console.log(counter1.increment()); // 12
console.log(counter1.getValue());  // 12
// count cannot be accessed or manipulated directly from outside!
```

---

## 3. Real-World Closure Use Case: Function Memoization
```javascript
function memoize(fn) {
  const cache = {}; // Enclosed in closure

  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('⚡ Cache hit for:', key);
      return cache[key];
    }
    console.log('⏳ Computing result for:', key);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const square = memoize((n) => n * n);
square(5); // ⏳ Computing... -> 25
square(5); // ⚡ Cache hit! -> 25
```

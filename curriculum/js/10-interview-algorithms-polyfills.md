# Module JS-10: JavaScript Interview Mastery, Algorithms & Polyfills

## 1. Debounce vs Throttle (Must-Know!)

### Debounce:
Delays executing a function until `delay` milliseconds have elapsed since the LAST time it was invoked. (Perfect for search inputs, autocomplete).

```javascript
function debounce(fn, delay = 300) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### Throttle:
Ensures a function is called at most ONCE in any given time window `limit`. (Perfect for scroll handlers, resize events, gaming loops).

```javascript
function throttle(fn, limit = 300) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

---

## 2. Deep Clone Function (Handling Nested Objects & Arrays)

```javascript
// Native standard (Modern Browsers):
// const copy = structuredClone(originalObj);

// Custom Deep Clone Implementation:
function deepClone(obj, hash = new WeakMap()) {
  if (Object(obj) !== obj) return obj; // Primitives
  if (hash.has(obj)) return hash.get(obj); // Handle circular references
  
  const result = Array.isArray(obj) ? [] : {};
  hash.set(obj, result);

  for (const key of Object.keys(obj)) {
    result[key] = deepClone(obj[key], hash);
  }
  return result;
}
```

---

## 3. Polyfilling `Array.prototype.myReduce`

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

const numbers = [1, 2, 3, 4];
console.log(numbers.myReduce((acc, curr) => acc + curr, 0)); // 10
```

---

## 4. Function Currying
Transforms `f(a, b, c)` into `f(a)(b)(c)`.

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

const sumThree = (a, b, c) => a + b + c;
const curriedSum = curry(sumThree);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3));    // 6
```

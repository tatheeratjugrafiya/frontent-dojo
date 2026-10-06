# Module BJS-03: Strings, Concatenation & Template Literals

## 1. Creating Strings
Strings represent text data wrapped in single quotes (`'...'`), double quotes (`"..."`), or backticks (`` `...` ``).

```javascript
const name = 'Alex';
const greeting = "Hello";
```

---

## 2. Template Literals (Backticks `` ` ``)
Template literals allow embedding variables and expressions directly inside `${expression}` without clunky string concatenation (`+`).

```javascript
const firstName = 'Sarah';
const age = 24;

// ❌ Clunky Old Way:
const bioOld = 'My name is ' + firstName + ' and I am ' + age + ' years old.';

// ✅ Modern Template Literal:
const bioNew = `My name is ${firstName} and I am ${age} years old. Next year I will be ${age + 1}.`;
```

---

## 3. Essential String Properties & Methods
```javascript
const text = 'JavaScript Dojo';

console.log(text.length);             // 15 (number of characters)
console.log(text.toUpperCase());        // "JAVASCRIPT DOJO"
console.log(text.toLowerCase());        // "javascript dojo"
console.log(text.includes('Script'));   // true
console.log(text.startsWith('Java'));   // true
console.log(text.slice(0, 4));          // "Java"
console.log('  trim me  '.trim());      // "trim me" (removes outer spaces)
```

# 🟢 JavaScript Basics Quick Reference & Cheat Sheet

## 1. Variables & Types
```javascript
let score = 10;          // Can reassign
const pi = 3.14159;      // Cannot reassign

// Data Types
const name = "Alex";     // String
const age = 25;          // Number
const isOnline = true;   // Boolean
const empty = null;      // Null (empty)
let notAssigned;         // Undefined
```

---

## 2. Arithmetic & Comparison
```javascript
// Math
const sum = 10 + 5;      // 15
const diff = 10 - 5;     // 5
const prod = 10 * 5;     // 50
const div = 10 / 5;      // 2
const rem = 10 % 3;      // 1 (remainder)

// Strict Comparisons
5 === 5;   // true (equal value & type)
5 !== 10;  // true (not equal)
10 > 5;    // true
```

---

## 3. Conditionals (if/else & ternary)
```javascript
if (score >= 90) {
  console.log("Master");
} else if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Retry");
}

// Ternary One-Liner
const status = score >= 50 ? "Pass" : "Fail";
```

---

## 4. Loops
```javascript
// For Loop
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}

// While Loop
let energy = 3;
while (energy > 0) {
  energy--;
}
```

---

## 5. Functions
```javascript
function greet(name = "Learner") {
  return `Hello, ${name}!`;
}

const message = greet("Alex"); // "Hello, Alex!"
```

---

## 6. Arrays & Objects
```javascript
// Array
const fruits = ["Apple", "Banana", "Cherry"];
fruits.push("Mango"); // Add to end
console.log(fruits[0]); // "Apple"

// Object
const user = {
  name: "Sarah",
  rank: "Green Belt",
  xp: 350
};
console.log(user.name); // "Sarah"
user.xp += 50;          // 400
```

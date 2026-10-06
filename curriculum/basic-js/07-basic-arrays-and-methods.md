# Module BJS-07: Basic Arrays & Indexing

## 1. What is an Array?
An Array is an ordered collection of values stored in square brackets `[...]`.

```javascript
const colors = ['red', 'green', 'blue'];
const numbers = [10, 20, 30, 40];
const mixed = ['Alex', 25, true, null];
```

---

## 2. Zero-Based Indexing
Array items are numbered starting from **0**!

```javascript
const fruits = ['Apple', 'Banana', 'Cherry'];

console.log(fruits[0]); // "Apple" (First item)
console.log(fruits[1]); // "Banana" (Second item)
console.log(fruits[2]); // "Cherry" (Third item)

// Total length
console.log(fruits.length); // 3

// Changing an element
fruits[1] = 'Blueberry';
console.log(fruits); // ['Apple', 'Blueberry', 'Cherry']
```

---

## 3. Essential Basic Array Operations
- `.push(item)`: Adds an item to the **end**.
- `.pop()`: Removes and returns the item at the **end**.
- `.unshift(item)`: Adds an item to the **start**.
- `.shift()`: Removes the item at the **start**.
- `.includes(item)`: Returns `true` if item exists in array.

```javascript
const tasks = ['Code'];
tasks.push('Exercise'); // ['Code', 'Exercise']
tasks.push('Read');     // ['Code', 'Exercise', 'Read']
tasks.pop();            // Removes 'Read' -> ['Code', 'Exercise']
```

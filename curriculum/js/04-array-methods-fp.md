# Module JS-04: Array Methods & Functional Programming

## 1. The Core 3: `map`, `filter`, and `reduce`
Modern JavaScript relies heavily on declarative, non-mutating array transformations.

### 1. `map()`: Transform each element
Returns a brand new array with the transformed results.

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]
```

### 2. `filter()`: Select elements matching a condition
Returns a new array containing only elements where the predicate returned `true`.

```javascript
const users = [
  { name: 'Alex', age: 28, active: true },
  { name: 'Mia', age: 17, active: true },
  { name: 'Ken', age: 34, active: false }
];

const adultActiveUsers = users.filter(u => u.active && u.age >= 18);
```

### 3. `reduce()`: Accumulate array into a single value
Transforms an array into a number, object, map, or grouped dictionary.

```javascript
// Grouping items by category using reduce
const inventory = [
  { name: 'Apple', category: 'Fruit' },
  { name: 'Carrot', category: 'Vegetable' },
  { name: 'Banana', category: 'Fruit' }
];

const grouped = inventory.reduce((acc, item) => {
  const cat = item.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(item.name);
  return acc;
}, {});

console.log(grouped);
// { Fruit: ['Apple', 'Banana'], Vegetable: ['Carrot'] }
```

---

## 2. Searching & Checking: `find`, `findIndex`, `some`, `every`, `includes`

```javascript
const scores = [65, 82, 94, 45, 88];

scores.find(s => s >= 90);       // 94 (first match)
scores.findIndex(s => s < 50);   // 3 (index of 45)
scores.some(s => s === 100);     // false (at least one)
scores.every(s => s >= 40);      // true (all match)
scores.includes(82);             // true
```

---

## 3. Flat & FlatMap
Flatten nested multi-dimensional arrays effortlessly:

```javascript
const tags = [['react', 'js'], ['tailwind', ['css', 'design']]];
console.log(tags.flat(2)); // ['react', 'js', 'tailwind', 'css', 'design']
```

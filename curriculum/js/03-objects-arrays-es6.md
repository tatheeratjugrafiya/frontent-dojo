# Module JS-03: Objects, Arrays & Modern Destructuring (ES6+)

## 1. Destructuring Assignment

### Object Destructuring:
Extract properties with optional default values and renaming.

```javascript
const user = {
  id: 101,
  username: 'antigravity_dev',
  details: { role: 'Lead Architect', country: 'Japan' }
};

// Rename 'username' to 'handle', provide default avatar, deep destructure country
const { 
  username: handle, 
  avatar = 'default.png', 
  details: { country } 
} = user;

console.log(handle);  // 'antigravity_dev'
console.log(avatar);  // 'default.png'
console.log(country); // 'Japan'
```

### Array Destructuring:
```javascript
const rgb = [255, 128, 0];
const [r, g, b, alpha = 1.0] = rgb;

// Swapping variables in one line without temp variable!
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1
```

---

## 2. Spread (`...`) vs Rest (`...`) Operators

### Spread Operator (Expands elements):
```javascript
// Clone and merge arrays
const frontend = ['HTML', 'CSS', 'JS'];
const fullstack = [...frontend, 'Node.js', 'PostgreSQL'];

// Clone and merge objects
const baseConfig = { theme: 'dark', port: 3000 };
const prodConfig = { ...baseConfig, port: 8080, ssl: true };
```

### Rest Parameter (Gathers elements into an array):
```javascript
function sumAll(multiplier, ...numbers) {
  return numbers.reduce((acc, n) => acc + (n * multiplier), 0);
}

console.log(sumAll(2, 10, 20, 30)); // (10+20+30) * 2 = 120
```

---

## 3. Dynamic Computed Property Names
```javascript
const dynamicKey = 'status';
const report = {
  id: 42,
  [dynamicKey]: 'APPROVED',
  [`timestamp_${Date.now()}`]: true
};
```

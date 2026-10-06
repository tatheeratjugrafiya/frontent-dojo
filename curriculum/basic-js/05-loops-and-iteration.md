# Module BJS-05: Loops & Iteration (`for`, `while`)

## 1. Why Do We Need Loops?
Loops repeat a block of code multiple times without having to copy-paste it manually.

---

## 2. The Standard `for` Loop
```javascript
// for (initialization; condition; increment)
for (let i = 1; i <= 5; i++) {
  console.log(`Dojo repetition #${i}`);
}
```

---

## 3. The `while` Loop
Repeats as long as its condition remains `true`:

```javascript
let energy = 100;

while (energy > 0) {
  console.log(`Training hard... Energy: ${energy}%`);
  energy -= 25; // Decrement to avoid infinite loops!
}

console.log('Resting period.');
```

---

## 4. `break` and `continue`
- `break`: Immediately exits the loop entirely.
- `continue`: Skips the rest of the current iteration and jumps to the next one.

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) continue; // Skip number 5
  if (i === 8) break;    // Stop loop at 8
  console.log(i); // Logs 1, 2, 3, 4, 6, 7
}
```

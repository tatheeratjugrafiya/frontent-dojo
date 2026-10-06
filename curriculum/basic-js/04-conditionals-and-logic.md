# Module BJS-04: Conditionals & Control Flow (`if`, `else`, `switch`)

## 1. Comparison Operators
| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `===` | Strict equal (Value & Type) | `5 === 5` | `true` |
| `!==` | Strict not equal | `5 !== '5'` | `true` |
| `>` | Greater than | `10 > 3` | `true` |
| `<` | Less than | `4 < 2` | `false` |
| `>=` | Greater than or equal | `10 >= 10` | `true` |
| `<=` | Less than or equal | `8 <= 12` | `true` |

---

## 2. The `if`, `else if`, and `else` Statement
```javascript
const score = 85;

if (score >= 90) {
  console.log('Grade: A - Master');
} else if (score >= 80) {
  console.log('Grade: B - Proficient');
} else if (score >= 70) {
  console.log('Grade: C - Apprentice');
} else {
  console.log('Grade: Needs more practice');
}
```

---

## 3. Logical Operators: `&&` (AND), `||` (OR), `!` (NOT)
```javascript
const isMember = true;
const hasCoupon = false;
const cartTotal = 60;

// AND (&&): True only if BOTH sides are true
if (isMember && cartTotal >= 50) {
  console.log('Eligible for free shipping!');
}

// OR (||): True if AT LEAST ONE side is true
if (isMember || hasCoupon) {
  console.log('Discount applied!');
}

// NOT (!): Inverts the boolean
const isBlocked = false;
if (!isBlocked) {
  console.log('Access granted.');
}
```

---

## 4. The Ternary Operator (`? :`)
A concise, one-line shortcut for simple `if/else`:

```javascript
const age = 20;
const status = age >= 18 ? 'Adult' : 'Minor';
```

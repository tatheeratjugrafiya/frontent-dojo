# Module BJS-02: Variables, Numbers & Arithmetic Operators

## 1. What is a Variable?
A variable is a labeled container that stores a value in computer memory so you can use and update it later.

```javascript
let score = 0;       // 'let' can be reassigned later
const maxLives = 3;  // 'const' is constant and CANNOT be reassigned
```

---

## 2. Arithmetic Operators
| Operator | Name | Example | Result |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `6 * 7` | `42` |
| `/` | Division | `20 / 4` | `5` |
| `%` | Modulo (Remainder) | `10 % 3` | `1` |
| `**` | Exponentiation (Power) | `2 ** 3` | `8` |

---

## 3. Increment `++` & Shortcut Assignment
```javascript
let level = 1;
level++;       // level becomes 2 (equivalent to level = level + 1)
level += 5;    // level becomes 7 (equivalent to level = level + 5)
level -= 2;    // level becomes 5 (equivalent to level = level - 2)
level *= 2;    // level becomes 10 (equivalent to level = level * 2)
```

# Module JS-01: JavaScript Foundations & Modern Syntax (ES6+)

## 1. Variables: `const`, `let`, and `var`
In modern JavaScript, forget `var`. Use `const` by default, and `let` only when you must reassign a value.

| Keyword | Scope | Hoisting | Reassignable | Redeclarable |
| :--- | :--- | :--- | :--- | :--- |
| `const` | Block `{}` | TDZ (Temporal Dead Zone) | ❌ No | ❌ No |
| `let` | Block `{}` | TDZ (Temporal Dead Zone) | ✅ Yes | ❌ No |
| `var` (Legacy) | Function | Hoisted (undefined) | ✅ Yes | ✅ Yes (Bug-prone) |

```javascript
// Temporal Dead Zone (TDZ)
// console.log(age); // ❌ ReferenceError: Cannot access 'age' before initialization
const age = 25;
let score = 100;
score += 10; // ✅ OK
```

---

## 2. Data Types: Primitives vs Objects

### 7 Primitive Types (Passed by Value):
1. `string` (`"hello"`, `'world'`, `` `template` ``)
2. `number` (`42`, `3.14`, `NaN`, `Infinity`)
3. `bigint` (`9007199254740991n`)
4. `boolean` (`true`, `false`)
5. `undefined` (Variable declared without value)
6. `null` (Intentional absence of object value)
7. `symbol` (`Symbol('id')`, unique immutable identifier)

### Reference Type (Passed by Reference):
- `Object` (including Arrays `[]`, Functions `function(){}`, Dates, Maps, Sets).

```javascript
// Primitives: Copied by Value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// Objects: Copied by Reference (Memory Pointer)
const user1 = { name: 'Alex' };
const user2 = user1;
user2.name = 'Sarah';
console.log(user1.name); // 'Sarah' (Both point to the same object!)
```

---

## 3. Strict Equality `===` vs Loose Equality `==`
Always use strict equality `===` to prevent unexpected type coercion.

```javascript
0 == false   // true (coercion!)
0 === false  // false (different types: number vs boolean)

null == undefined  // true
null === undefined // false

"" == 0      // true (coercion!)
"" === 0     // false
```

---

## 4. Modern ES6+ Operators: `?.` and `??`

### Optional Chaining (`?.`):
Safely accesses nested object properties without throwing `TypeError: Cannot read properties of undefined`.

```javascript
const user = { profile: { address: { city: 'Tokyo' } } };
console.log(user?.profile?.address?.city); // 'Tokyo'
console.log(user?.company?.ceo?.name);     // undefined (no error thrown!)
```

### Nullish Coalescing (`??`):
Returns the right-hand value only if left-hand is `null` or `undefined` (unlike `||`, it does NOT treat `0` or `""` as fallback triggers).

```javascript
const speed = 0;
const defaultSpeed1 = speed || 50; // 50 (0 is falsy, bug!)
const defaultSpeed2 = speed ?? 50; // 0  (0 is valid number, correct!)
```

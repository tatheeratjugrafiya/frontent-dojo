# Module BJS-06: Basic Functions & Parameters

## 1. What is a Function?
A function is a reusable block of code designed to perform a specific task. You define it once, and can call (execute) it as many times as you need with different inputs.

```javascript
// Function Declaration
function sayHello() {
  console.log('Welcome to JavaScript basics!');
}

sayHello(); // Calling the function
```

---

## 2. Parameters vs Arguments
- **Parameters**: Variable placeholders listed inside the function definition.
- **Arguments**: Real values passed into the function when you invoke it.

```javascript
function greetUser(name, role = 'Learner') {
  console.log(`Hello ${name}, your current rank is ${role}.`);
}

greetUser('Alex', 'Apprentice'); // name='Alex', role='Apprentice'
greetUser('Sarah');              // name='Sarah', role='Learner' (uses default)
```

---

## 3. Returning Values (`return`)
The `return` keyword sends a value back from the function to wherever it was called and immediately ends function execution.

```javascript
function calculateTotal(price, taxRate = 0.08) {
  const total = price + (price * taxRate);
  return total;
}

const myBill = calculateTotal(100);
console.log(`Your total bill is $${myBill}`); // $108
```

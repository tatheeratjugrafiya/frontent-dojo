export const BASIC_JS_CURRICULUM_MODULES = [
  {
    id: 'bjs-01-syntax',
    moduleNumber: 1,
    title: 'Hello World, Console & Comments',
    subtitle: 'The very first steps: outputting values, writing comments, and understanding syntax rules.',
    icon: 'Terminal',
    tag: 'Absolute Beginner',
    readTime: '8 min',
    overview: `Welcome to JavaScript! In this foundational module, you learn how code executes, how to inspect values using \`console.log()\`, how to write comments, and why JavaScript is case-sensitive.`,
    takeaways: [
      'console.log() prints text, numbers, and data structures to the console.',
      'Single-line comments start with // and multi-line comments are wrapped in /* ... */.',
      'JavaScript is case-sensitive: myVar and myvar are different identifiers.',
      'Statements are separated by semicolons or clean newlines.'
    ],
    codeExample: `// First JavaScript Program
console.log("Welcome to JavaScript Dojo!");
console.log(100 + 200); // Outputs 300

// Single line comment
/*
  Multi-line
  comment block
*/`,
    challenge: {
      instruction: 'Write a script that logs "Hello Dojo Learner" to the console and calculates 5 * 10.',
      starterCode: `function greet() {
  // TODO: Add console.log calls
}`,
      solution: `function greet() {
  console.log("Hello Dojo Learner");
  console.log(5 * 10);
}`,
      hint: 'Use `console.log(...)` inside the function.'
    },
    quiz: [
      {
        question: 'What is the purpose of `console.log()`?',
        options: [
          'To format hard drives',
          'To print output and messages to the developer console for debugging',
          'To send emails',
          'To design buttons'
        ],
        answer: 1,
        explanation: '`console.log()` is the primary tool for printing variables and diagnostics to the browser/terminal console.'
      },
      {
        question: 'How do you write a single-line comment in JavaScript?',
        options: ['# This is a comment', '// This is a comment', '<!-- This is a comment -->', '/* Comment */'],
        answer: 1,
        explanation: 'Two forward slashes `//` designate a single-line comment in JavaScript.'
      },
      {
        question: 'Is JavaScript case-sensitive?',
        options: [
          'No, `score` and `Score` are the same variable',
          'Yes, `score` and `Score` are treated as completely different identifiers',
          'Only when running on Windows',
          'Only in HTML files'
        ],
        answer: 1,
        explanation: 'JavaScript enforces strict case sensitivity for all variable, function, and object names.'
      }
    ]
  },
  {
    id: 'bjs-02-variables-math',
    moduleNumber: 2,
    title: 'Variables, Numbers & Arithmetic',
    subtitle: 'Store values with let and const, and master +, -, *, /, and % math operations.',
    icon: 'Sliders',
    tag: 'Variables & Math',
    readTime: '10 min',
    overview: `Variables are containers for storing data values. In modern JavaScript, we declare reassignable variables with \`let\` and permanent constants with \`const\`. You will master basic arithmetic and assignment shortcuts.`,
    takeaways: [
      'const creates values that cannot be reassigned.',
      'let creates variables that can change over time.',
      'Math operators: + (addition), - (subtraction), * (multiplication), / (division), % (modulo/remainder).',
      'Shortcut operators: +=, -=, *=, ++, --.'
    ],
    codeExample: `const pricePerTicket = 25;
let ticketCount = 2;
let totalCost = pricePerTicket * ticketCount;

console.log('Total:', totalCost); // 50

ticketCount++; // ticketCount is now 3
totalCost = pricePerTicket * ticketCount;
console.log('Updated Total:', totalCost); // 75`,
    challenge: {
      instruction: 'Write a function `calculateArea(width, height)` that returns the area of a rectangle and the perimeter.',
      starterCode: `function calculateArea(width, height) {
  // TODO: return { area, perimeter }
}`,
      solution: `function calculateArea(width, height) {
  const area = width * height;
  const perimeter = 2 * (width + height);
  return { area, perimeter };
}`,
      hint: 'Area is `width * height` and perimeter is `2 * (width + height)`.'
    },
    quiz: [
      {
        question: 'What happens if you try to reassign a `const` variable (e.g. `const x = 5; x = 10;`)?',
        options: [
          'It works smoothly',
          'JavaScript throws a TypeError: Assignment to constant variable',
          'The computer shuts down',
          'It turns into let'
        ],
        answer: 1,
        explanation: 'Variables declared with `const` cannot be reassigned after their initial declaration.'
      },
      {
        question: 'What is the result of `14 % 4`?',
        options: ['3.5', '2', '0', '3'],
        answer: 1,
        explanation: '`%` is the modulo operator. 14 divided by 4 is 3 with a remainder of 2.'
      },
      {
        question: 'What does `score += 10` do?',
        options: [
          'Checks if score equals 10',
          'Adds 10 to the current value of score (equivalent to score = score + 10)',
          'Deletes score',
          'Multiplies score by 10'
        ],
        answer: 1,
        explanation: '`+=` is the addition assignment shortcut.'
      }
    ]
  },
  {
    id: 'bjs-03-strings',
    moduleNumber: 3,
    title: 'Strings & Template Literals',
    subtitle: 'Manipulate text, inspect length, transform casing, and format messages with backtick template literals.',
    icon: 'Layers',
    tag: 'Strings & Text',
    readTime: '10 min',
    overview: `Strings hold textual data. You will master string methods like \`.toUpperCase()\`, \`.includes()\`, \`.slice()\`, and learn how modern template literals (\`\${expression}\`) make string formatting clean and elegant.`,
    takeaways: [
      'Strings can be created with single quotes, double quotes, or backticks.',
      'Template literals allow ${expression} interpolation inside backticks.',
      '.length returns the count of characters in a string.',
      'Strings are immutable; methods like toUpperCase() return new strings.'
    ],
    codeExample: `const learner = 'Alex';
const level = 3;

// Template literal interpolation
const message = \`Welcome back \${learner}! You are currently Level \${level}.\`;
console.log(message);

console.log(learner.toUpperCase()); // "ALEX"
console.log(learner.length);        // 4`,
    challenge: {
      instruction: 'Create a function `formatGreeting(firstName, lastName, xp)` that returns a formatted greeting like: "Welcome, ALEX VANCE! Total XP: 450".',
      starterCode: `function formatGreeting(firstName, lastName, xp) {
  // TODO: Return template literal string
}`,
      solution: `function formatGreeting(firstName, lastName, xp) {
  const fullName = \`\${firstName} \${lastName}\`.toUpperCase();
  return \`Welcome, \${fullName}! Total XP: \${xp}\`;
}`,
      hint: 'Combine `${firstName} ${lastName}` and call `.toUpperCase()`.'
    },
    quiz: [
      {
        question: 'Which quotes enable template literals and `${expression}` embedding?',
        options: ['Single quotes (\'...\')', 'Double quotes ("...")', 'Backticks (`...`)', 'Angle brackets (<...>)'],
        answer: 2,
        explanation: 'Backticks `` `...` `` are required for template literal syntax in JavaScript.'
      },
      {
        question: 'What does `"Dojo".length` return?',
        options: ['3', '4', '5', 'undefined'],
        answer: 1,
        explanation: 'The word "Dojo" contains 4 characters: D-o-j-o.'
      },
      {
        question: 'What does `"hello world".includes("world")` return?',
        options: ['true', 'false', '1', 'null'],
        answer: 0,
        explanation: '`.includes()` returns a boolean indicating whether the substring exists within the string.'
      }
    ]
  },
  {
    id: 'bjs-04-conditionals',
    moduleNumber: 4,
    title: 'Conditionals & Logic (if/else)',
    subtitle: 'Make decisions in code using if, else if, else, strict equality (===), and logical operators.',
    icon: 'CheckSquare',
    tag: 'Logic & Flow',
    readTime: '12 min',
    overview: `Programs make decisions using conditionals. If a condition evaluates to true, one code path runs; otherwise, alternative paths execute. Master comparison operators, logical AND (&&), OR (||), and ternary expressions.`,
    takeaways: [
      'if, else if, else control code branch execution.',
      'Always use === (strict equality) instead of ==.',
      '&& (AND) requires both conditions to be true; || (OR) requires at least one to be true.',
      'The ternary operator condition ? a : b provides a quick inline if/else.'
    ],
    codeExample: `const age = 18;
const hasId = true;

if (age >= 18 && hasId) {
  console.log('✅ Access granted to tournament');
} else {
  console.log('❌ Access denied');
}

// Ternary one-liner
const rank = age >= 21 ? 'Master' : 'Novice';`,
    challenge: {
      instruction: 'Write a function `checkPassFail(score)` that returns "Distinction" for score >= 90, "Pass" for score >= 50, and "Fail" otherwise.',
      starterCode: `function checkPassFail(score) {
  // TODO: Use if / else if / else
}`,
      solution: `function checkPassFail(score) {
  if (score >= 90) return 'Distinction';
  if (score >= 50) return 'Pass';
  return 'Fail';
}`,
      hint: 'Check the highest threshold (score >= 90) first.'
    },
    quiz: [
      {
        question: 'What is the difference between `===` and `==`?',
        options: [
          'They are identical',
          '`===` compares both value and type without coercion, while `==` attempts type conversion',
          '`===` is for strings only',
          '`==` is faster'
        ],
        answer: 1,
        explanation: 'Strict equality `===` ensures both the data type and value match exactly.'
      },
      {
        question: 'What is the result of `true && false`?',
        options: ['true', 'false', 'undefined', 'null'],
        answer: 1,
        explanation: '`&&` (AND) evaluates to `false` because both sides must be true.'
      },
      {
        question: 'What is the ternary equivalent of `if (x) { y = 1; } else { y = 2; }`?',
        options: ['y = x ? 1 : 2;', 'y = x : 1 ? 2;', 'y = if x then 1 else 2;', 'x ? y = 1 : y = 2;'],
        answer: 0,
        explanation: '`const y = x ? 1 : 2;` evaluates `1` if `x` is truthy, and `2` if falsy.'
      }
    ]
  },
  {
    id: 'bjs-05-loops',
    moduleNumber: 5,
    title: 'Loops & Repetition (for, while)',
    subtitle: 'Repeat operations effortlessly with for loops, while loops, break, and continue.',
    icon: 'RefreshCw',
    tag: 'Loops',
    readTime: '12 min',
    overview: `Loops let your computer perform repetitive tasks millions of times per second. You will understand how for-loops work with index counters, how while-loops repeat until a condition changes, and how to avoid infinite loops.`,
    takeaways: [
      'for (let i = 0; i < n; i++) runs a fixed number of iterations.',
      'while (condition) repeats as long as the condition remains true.',
      'break terminates the loop immediately.',
      'continue skips the rest of the current iteration and moves to the next.'
    ],
    codeExample: `// Standard For Loop counting from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(\`Round #\${i}\`);
}

// While Loop
let energy = 30;
while (energy > 0) {
  console.log('Training... Energy remaining:', energy);
  energy -= 10;
}`,
    challenge: {
      instruction: 'Write a function `sumUpTo(n)` that uses a for-loop to calculate the sum of numbers from 1 to n (e.g. sumUpTo(4) = 1 + 2 + 3 + 4 = 10).',
      starterCode: `function sumUpTo(n) {
  // TODO: Use a for loop to calculate the sum
  let sum = 0;
  return sum;
}`,
      solution: `function sumUpTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}`,
      hint: 'Initialize `let sum = 0;` and inside `for (let i = 1; i <= n; i++)` add `sum += i`.'
    },
    quiz: [
      {
        question: 'What are the three parts of a standard `for (A; B; C)` loop header?',
        options: [
          'Variable name, Type, Value',
          'Initialization, Condition check, Increment/Update step',
          'Start, Stop, Delay',
          'Input, Output, Error'
        ],
        answer: 1,
        explanation: '`for (initialization; condition; increment)` defines the loop counter lifecycle.'
      },
      {
        question: 'What keyword immediately exits and stops a loop?',
        options: ['skip', 'break', 'continue', 'halt'],
        answer: 1,
        explanation: '`break` terminates the enclosing loop immediately.'
      },
      {
        question: 'What dangerous bug happens if a `while` loop condition never becomes false?',
        options: [
          'The code becomes faster',
          'An Infinite Loop that freezes the browser or process',
          'Syntax error',
          'Nothing'
        ],
        answer: 1,
        explanation: 'If a while loop condition is never updated, it runs forever, locking up the CPU.'
      }
    ]
  },
  {
    id: 'bjs-06-basic-functions',
    moduleNumber: 6,
    title: 'Basic Functions & Return Values',
    subtitle: 'Write reusable code blocks with parameters, arguments, return statements, and default values.',
    icon: 'Cpu',
    tag: 'Functions',
    readTime: '12 min',
    overview: `Functions are the building blocks of clean software. They group statements together, receive inputs (parameters), perform calculations, and return a result. Writing small, single-purpose functions keeps code organized and reusable.`,
    takeaways: [
      'Define functions with function name(params) { ... }.',
      'return sends a value back and stops function execution.',
      'If a function has no return statement, it implicitly returns undefined.',
      'Default parameters allow fallback values (e.g. role = "Learner").'
    ],
    codeExample: `// Reusable function with parameters and return value
function calculateDiscount(price, discountPercent = 10) {
  const savings = price * (discountPercent / 100);
  const finalPrice = price - savings;
  return finalPrice;
}

const jacket = calculateDiscount(100, 20); // 80
const shirt = calculateDiscount(50);       // 45 (uses 10% default)`,
    challenge: {
      instruction: 'Write a function `celsiusToFahrenheit(celsius)` that converts temperature using the formula `(celsius * 9/5) + 32`.',
      starterCode: `function celsiusToFahrenheit(celsius) {
  // TODO: Return converted temperature
}`,
      solution: `function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}`,
      hint: 'Multiply celsius by 9/5, then add 32.'
    },
    quiz: [
      {
        question: 'What does a function return if there is no `return` keyword?',
        options: ['null', '0', 'undefined', 'false'],
        answer: 2,
        explanation: 'In JavaScript, functions that do not explicitly return a value return `undefined` by default.'
      },
      {
        question: 'What is the difference between parameters and arguments?',
        options: [
          'Parameters are listed in the function definition; Arguments are real values passed into the function when called',
          'Arguments are in the definition; parameters are when calling',
          'They are completely identical',
          'Parameters are numbers only'
        ],
        answer: 0,
        explanation: 'Parameters are the named placeholders in the function header; arguments are the concrete values provided during execution.'
      },
      {
        question: 'Does code after a `return` statement execute inside that function call?',
        options: [
          'Yes, it continues until the end of the block',
          'No, `return` immediately stops function execution and exits',
          'Only if wrapped in a loop',
          'Only in strict mode'
        ],
        answer: 1,
        explanation: 'Executing a `return` statement terminates the function instantly.'
      }
    ]
  },
  {
    id: 'bjs-07-basic-arrays',
    moduleNumber: 7,
    title: 'Basic Arrays & Indexing',
    subtitle: 'Store lists of items, access elements by zero-based index, and use push, pop, and length.',
    icon: 'Layers',
    tag: 'Arrays',
    readTime: '12 min',
    overview: `Arrays are ordered lists of values. In JavaScript, arrays are zero-indexed, meaning the first element is at index 0. You will learn how to create arrays, read items, modify items, and add/remove elements using push and pop.`,
    takeaways: [
      'Arrays are created with square brackets [item1, item2].',
      'Zero-indexed: array[0] is the first item; array[array.length - 1] is the last item.',
      '.push(item) adds to end; .pop() removes from end.',
      '.length returns the number of items in the array.'
    ],
    codeExample: `const fruits = ['Apple', 'Banana', 'Cherry'];

console.log(fruits[0]); // "Apple"
console.log(fruits.length); // 3

fruits.push('Dragonfruit'); // Adds to end
console.log(fruits); // ['Apple', 'Banana', 'Cherry', 'Dragonfruit']

fruits.pop(); // Removes 'Dragonfruit'`,
    challenge: {
      instruction: 'Write a function `getFirstAndLast(arr)` that returns an array containing only the first and last elements of the input array.',
      starterCode: `function getFirstAndLast(arr) {
  // TODO: Return [first, last]
}`,
      solution: `function getFirstAndLast(arr) {
  if (arr.length === 0) return [];
  return [arr[0], arr[arr.length - 1]];
}`,
      hint: 'First element is `arr[0]` and last element is `arr[arr.length - 1]`.'
    },
    quiz: [
      {
        question: 'What is the index of the first item in a JavaScript array?',
        options: ['1', '0', '-1', 'first'],
        answer: 1,
        explanation: 'JavaScript arrays are zero-indexed, so the initial element is stored at index `0`.'
      },
      {
        question: 'What method adds an element to the END of an array?',
        options: ['push()', 'pop()', 'unshift()', 'shift()'],
        answer: 0,
        explanation: '`array.push(item)` appends the new element to the end of the array.'
      },
      {
        question: 'How do you access the last item of an array named `items`?',
        options: ['items[last]', 'items[items.length]', 'items[items.length - 1]', 'items.end()'],
        answer: 2,
        explanation: 'Because indexes start at 0, the last element is at `items.length - 1`.'
      }
    ]
  },
  {
    id: 'bjs-08-basic-objects',
    moduleNumber: 8,
    title: 'Basic Objects & Key-Value Pairs',
    subtitle: 'Group related properties, access values with dot and bracket notation, and update data.',
    icon: 'Globe',
    tag: 'Objects',
    readTime: '12 min',
    overview: `Objects are dictionary-like structures that store data in key-value pairs inside curly braces \`{ ... }\`. Almost everything in JavaScript is an object. Master dot notation, bracket notation, adding properties, and modifying object fields.`,
    takeaways: [
      'Objects store data as { key: value } pairs.',
      'Dot notation (user.name) is clean and standard.',
      'Bracket notation (user["name"]) is used for dynamic variable keys or special characters.',
      'Add or update properties with object.newKey = value.'
    ],
    codeExample: `// Player Object
const player = {
  name: 'Alex',
  rank: 'Green Belt',
  xp: 450,
  isTrained: true
};

// Reading properties
console.log(player.name); // 'Alex'
console.log(player['rank']); // 'Green Belt'

// Updating & adding properties
player.xp += 50; // Now 500
player.location = 'Dojo Main Hall';
console.log(player);`,
    challenge: {
      instruction: 'Write a function `createStudent(name, age, grade)` that returns an object containing those 3 properties plus an `isEnrolled: true` property.',
      starterCode: `function createStudent(name, age, grade) {
  // TODO: Return student object
}`,
      solution: `function createStudent(name, age, grade) {
  return {
    name,
    age,
    grade,
    isEnrolled: true
  };
}`,
      hint: 'Return `{ name: name, age: age, grade: grade, isEnrolled: true }`.'
    },
    quiz: [
      {
        question: 'How do you access the `email` property of an object named `user` using dot notation?',
        options: ['user->email', 'user.email', 'user(email)', 'user::email'],
        answer: 1,
        explanation: '`user.email` accesses the property value via standard dot notation.'
      },
      {
        question: 'When is bracket notation `user[key]` required instead of dot notation?',
        options: [
          'When the property key is stored in a dynamic variable or contains special characters/spaces',
          'Only for numbers',
          'Only in loops',
          'Bracket notation is never required'
        ],
        answer: 0,
        explanation: 'Bracket notation evaluates expressions dynamically, allowing variable lookups (e.g. `user[propName]`).'
      },
      {
        question: 'How do you delete a property named `tempData` from an object named `appState`?',
        options: ['remove appState.tempData;', 'delete appState.tempData;', 'appState.tempData = null;', 'drop appState.tempData;'],
        answer: 1,
        explanation: 'The `delete` operator removes a property completely from an object.'
      }
    ]
  }
];

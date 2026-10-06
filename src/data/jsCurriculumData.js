export const JS_CURRICULUM_MODULES = [
  {
    id: 'js-01-foundations',
    moduleNumber: 1,
    title: 'JS Foundations, Types & Scopes',
    subtitle: 'Master const vs let, temporal dead zone, primitive vs reference types, and modern operators.',
    icon: 'Terminal',
    tag: 'Foundations',
    readTime: '12 min',
    overview: `JavaScript is a dynamically-typed, multi-paradigm language. In modern ES6+, \`const\` and \`let\` provide block scoping and prevent accidental variable re-declarations. Understanding how JavaScript passes primitives by value and objects by reference is critical for avoiding subtle mutations and memory bugs.`,
    takeaways: [
      'Use const by default; use let only when reassigning.',
      'Block scope {} confines let and const within the curly braces.',
      'Primitives (number, string, boolean) are copied by value; Objects are copied by memory reference.',
      'Use === (strict equality) to prevent implicit type coercion bugs.',
      'Use optional chaining (?.) and nullish coalescing (??) for bulletproof data access.'
    ],
    codeExample: `// Modern Variable Declarations & Safe Property Access
const user = {
  id: 42,
  profile: {
    handle: 'coder_99',
    streakDays: 0,
    settings: null
  }
};

// Optional Chaining (?.) & Nullish Coalescing (??)
const streak = user?.profile?.streakDays ?? 1; // Evaluates to 0 (valid number, not fallback!)
const theme = user?.profile?.settings?.theme ?? 'dark-slate';

console.log({ streak, theme });`,
    challenge: {
      instruction: 'Write a function `safeUserSummary(user)` that safely extracts `username`, `city` (defaulting to "Unknown"), and `points` (defaulting to 0 if null/undefined, but keeping 0 if provided).',
      starterCode: `function safeUserSummary(user) {
  // TODO: Use optional chaining (?.) and nullish coalescing (??)
  return {
    username: '',
    city: '',
    points: 0
  };
}`,
      solution: `function safeUserSummary(user) {
  return {
    username: user?.username ?? 'Anonymous',
    city: user?.location?.city ?? 'Unknown',
    points: user?.stats?.points ?? 0
  };
}`,
      hint: 'Use `user?.stats?.points ?? 0` so that a user with 0 points does not get replaced by the fallback.'
    },
    quiz: [
      {
        question: 'What is the Temporal Dead Zone (TDZ) in JavaScript?',
        options: [
          'A browser crash state',
          'The period between entering a block scope and the variable declaration being evaluated where accessing `let` or `const` throws a ReferenceError',
          'A time limit on async functions',
          'The time it takes for garbage collection to run'
        ],
        answer: 1,
        explanation: 'Variables declared with `let` and `const` exist in TDZ from the start of the block until the declaration line is reached.'
      },
      {
        question: 'What is the result of `0 ?? 10` vs `0 || 10`?',
        options: [
          'Both return 0',
          '`0 ?? 10` returns 0; `0 || 10` returns 10',
          'Both return 10',
          'Throws a syntax error'
        ],
        answer: 1,
        explanation: '`||` checks for any falsy value (0, "", false, null, undefined). `??` only falls back for `null` or `undefined`.'
      },
      {
        question: 'How are objects passed in JavaScript functions?',
        options: [
          'Passed by deep copy value',
          'Passed by reference (memory pointer)',
          'Converted to JSON automatically',
          'Passed as immutable constants'
        ],
        answer: 1,
        explanation: 'Objects in JavaScript are reference types. Mutating an object inside a function modifies the original object in memory.'
      }
    ]
  },
  {
    id: 'js-02-functions-closures',
    moduleNumber: 2,
    title: 'Functions, Lexical Scope & Closures',
    subtitle: 'Understand arrow functions, lexical this, function factories, and private variable encapsulation.',
    icon: 'Layers',
    tag: 'Core Logic',
    readTime: '15 min',
    overview: `A **closure** is created when an inner function retains access to variables declared in its outer enclosing scope even after the outer function has completed execution. Closures power private state encapsulation, memoization caches, currying, and functional programming patterns.`,
    takeaways: [
      'Arrow functions inherit `this` lexically from the outer scope.',
      'Closures give functions persistent private memory.',
      'Variables enclosed in closures cannot be accessed or manipulated directly from outside.',
      'Closures are fundamental to React hooks like useState and useEffect.'
    ],
    codeExample: `// Encapsulated Bank Account using Closure (Private State)
function createBankAccount(accountHolder, initialBalance = 0) {
  let balance = initialBalance; // Private variable enclosed in closure!

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error('Deposit must be positive');
      balance += amount;
      return \`Deposited $\${amount}. New balance: $\${balance}\`;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return \`Withdrew $\${amount}. Remaining: $\${balance}\`;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount('Sarah Connor', 500);
console.log(account.deposit(200)); // Deposited $200. New balance: $700
console.log(account.balance);       // undefined (private!)`,
    challenge: {
      instruction: 'Create a function `createLimiter(fn, maxCalls)` that allows `fn` to be called at most `maxCalls` times. On subsequent calls, return "Limit reached".',
      starterCode: `function createLimiter(fn, maxCalls) {
  // TODO: Use closure to track calls
  return function(...args) {
  };
}`,
      solution: `function createLimiter(fn, maxCalls) {
  let calls = 0;
  return function(...args) {
    if (calls < maxCalls) {
      calls++;
      return fn.apply(this, args);
    }
    return "Limit reached";
  };
}`,
      hint: 'Store `let calls = 0;` in the outer function and increment it on each inner invocation.'
    },
    quiz: [
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A method to close browser windows',
          'A function combined with references to its surrounding lexical environment',
          'A syntax error when closing tags are missing',
          'A type of loop'
        ],
        answer: 1,
        explanation: 'A closure enables a function to access and remember variables from an outer scope across executions.'
      },
      {
        question: 'How does `this` work in arrow functions compared to traditional function declarations?',
        options: [
          'Arrow functions bind `this` to document',
          'Arrow functions do not have their own `this`; they inherit it lexically from the surrounding scope',
          'Arrow functions cannot use `this` at all',
          'There is no difference'
        ],
        answer: 1,
        explanation: 'Arrow functions capture the `this` value of the enclosing context when they are defined.'
      },
      {
        question: 'Why are closures useful for data encapsulation?',
        options: [
          'They compress data for faster transmission',
          'Variables declared in the outer function cannot be directly modified or read by external code, creating private properties',
          'They store data in cookies',
          'They convert data to TypeScript'
        ],
        answer: 1,
        explanation: 'Closures hide internal variables from the global scope, providing true data privacy.'
      }
    ]
  },
  {
    id: 'js-03-objects-destructuring',
    moduleNumber: 3,
    title: 'Objects, Arrays & Modern Destructuring',
    subtitle: 'Deep destructuring, rest/spread operators, computed keys, and object transformation.',
    icon: 'Sliders',
    tag: 'Data Structures',
    readTime: '14 min',
    overview: `ES6+ transformed how JavaScript developers work with objects and arrays. Destructuring assignment allows unpacking values from arrays or properties from objects into distinct variables, while the spread and rest operators (\`...\`) enable immutable data manipulation.`,
    takeaways: [
      'Destructuring supports default values and variable renaming (prop: newName).',
      'Spread operator (...) expands iterables for shallow copying and merging.',
      'Rest parameter gathers remaining function arguments or object properties.',
      'Use Object.entries(), Object.keys(), and Object.values() for object iteration.'
    ],
    codeExample: `// Deep Destructuring, Renaming & Default Values
const developer = {
  id: 101,
  profile: {
    fullName: 'Alex Vance',
    contact: { email: 'alex@blackmesa.org' }
  },
  skills: ['JavaScript', 'React', 'Tailwind']
};

const {
  profile: {
    fullName: name,
    contact: { email }
  },
  skills: [primarySkill, ...secondarySkills],
  role = 'Full Stack Engineer'
} = developer;

console.log({ name, email, primarySkill, secondarySkills, role });`,
    challenge: {
      instruction: 'Write a function `mergeConfigs(defaultConfig, userConfig)` that merges two configuration objects immutably, with userConfig overriding defaultConfig while preserving nested options.',
      starterCode: `function mergeConfigs(defaultConfig, userConfig) {
  // TODO: Return a merged configuration object using object spread
}`,
      solution: `function mergeConfigs(defaultConfig, userConfig) {
  return {
    ...defaultConfig,
    ...userConfig,
    settings: {
      ...(defaultConfig.settings || {}),
      ...(userConfig.settings || {})
    }
  };
}`,
      hint: 'Use `{ ...defaultConfig, ...userConfig }` and spread nested objects like settings.'
    },
    quiz: [
      {
        question: 'What is the purpose of the rest parameter `(...args)` in a function signature?',
        options: [
          'To pause function execution for a given time',
          'To collect an indefinite number of arguments as a real JavaScript Array',
          'To delete remaining arguments',
          'To return an object'
        ],
        answer: 1,
        explanation: 'The rest parameter gathers all remaining arguments passed to a function into a genuine array.'
      },
      {
        question: 'Does the spread operator `{ ...originalObj }` perform a deep clone?',
        options: [
          'Yes, it clones all nested levels completely',
          'No, it only creates a shallow clone (top-level properties are copied, nested objects remain shared references)',
          'It only works for strings',
          'It throws a runtime error for objects'
        ],
        answer: 1,
        explanation: 'Spread performs shallow copies. Nested objects inside the cloned object still share references with the original.'
      },
      {
        question: 'How do you swap two variables `a` and `b` in a single line using array destructuring?',
        options: [
          'a = b, b = a;',
          '[a, b] = [b, a];',
          'swap(a, b);',
          'a.swap(b);'
        ],
        answer: 1,
        explanation: '`[a, b] = [b, a];` swaps the values cleanly without requiring a temporary third variable.'
      }
    ]
  },
  {
    id: 'js-04-array-methods-fp',
    moduleNumber: 4,
    title: 'Array Methods & Functional Pipelines',
    subtitle: 'Master map, filter, reduce, find, some, every, flat, and declarative data transformations.',
    icon: 'Cpu',
    tag: 'Functional Prog',
    readTime: '16 min',
    overview: `Functional programming with array methods enables declarative, bug-free data transformations. By chaining pure functions like \`filter\`, \`map\`, and \`reduce\`, you describe what transformation should occur without writing manual \`for\` loops or mutating variables.`,
    takeaways: [
      'map() transforms each item into a new item.',
      'filter() creates a subset of items that satisfy a boolean predicate.',
      'reduce() aggregates array items into any target data structure (number, map, object).',
      'Never mutate input arrays; prefer non-mutating methods like map/filter/toSorted.'
    ],
    codeExample: `// Declarative Data Processing Pipeline
const transactions = [
  { id: 1, type: 'credit', amount: 250, category: 'Freelance' },
  { id: 2, type: 'debit', amount: 50, category: 'Food' },
  { id: 3, type: 'credit', amount: 1200, category: 'Salary' },
  { id: 4, type: 'debit', amount: 120, category: 'Tech' }
];

// Pipeline: Calculate total credit revenue from categorized transactions
const totalCredits = transactions
  .filter(t => t.type === 'credit')
  .map(t => t.amount)
  .reduce((sum, amount) => sum + amount, 0);

console.log('Total Credits:', totalCredits); // 1450`,
    challenge: {
      instruction: 'Write a function `groupUsersByRole(users)` that takes an array of user objects `{ name, role }` and returns an object grouping user names by their role using `reduce()`.',
      starterCode: `function groupUsersByRole(users) {
  // TODO: Use users.reduce() to group names by role
}`,
      solution: `function groupUsersByRole(users) {
  return users.reduce((acc, user) => {
    const role = user.role;
    if (!acc[role]) acc[role] = [];
    acc[role].push(user.name);
    return acc;
  }, {});
}`,
      hint: 'In reduce, initialize accumulator with `{}` and check if `acc[user.role]` exists before pushing.'
    },
    quiz: [
      {
        question: 'Which of the following array methods modifies the original array in place (mutates)?',
        options: ['map()', 'filter()', 'splice()', 'slice()'],
        answer: 2,
        explanation: '`splice()` mutates the original array in-place, whereas `slice()`, `map()`, and `filter()` return new arrays.'
      },
      {
        question: 'What is the initial accumulator value in `array.reduce(callback, initialValue)` if initialValue is omitted?',
        options: [
          '0',
          'null',
          'The first element of the array (and the loop starts from index 1)',
          'undefined'
        ],
        answer: 2,
        explanation: 'If `initialValue` is not supplied, reduce uses `array[0]` as the accumulator and begins iteration at index 1.'
      },
      {
        question: 'What does `[1, [2, [3]]].flat(2)` return?',
        options: ['[1, 2, 3]', '[1, [2, 3]]', '[[1, 2, 3]]', 'Error'],
        answer: 0,
        explanation: '`.flat(2)` flattens sub-arrays up to a recursion depth of 2, producing `[1, 2, 3]`.'
      }
    ]
  },
  {
    id: 'js-05-async-promises',
    moduleNumber: 5,
    title: 'Async JavaScript, Promises & async/await',
    subtitle: 'Event-driven architecture, Promise chaining, async/await patterns, and parallel combinators.',
    icon: 'Zap',
    tag: 'Async JS',
    readTime: '18 min',
    overview: `JavaScript uses an asynchronous, non-blocking I/O model. When an asynchronous operation is triggered (such as a \`fetch\` HTTP request or timer), JavaScript delegates it to the host environment (Browser Web APIs or Node.js runtime) and continues executing the call stack. Promises and \`async\`/\`await\` allow handling asynchronous results cleanly.`,
    takeaways: [
      'Promises have 3 states: pending, fulfilled, and rejected.',
      'async functions always return a Promise automatically.',
      'Use try/catch blocks for clean error handling with async/await.',
      'Use Promise.all() for concurrent parallel operations.'
    ],
    codeExample: `// Parallel Data Fetching with Promise.all and Error Handling
async function fetchDashboardData(userId) {
  try {
    const [userRes, notificationsRes] = await Promise.all([
      fetch(\`/api/users/\${userId}\`),
      fetch(\`/api/users/\${userId}/notifications\`)
    ]);

    if (!userRes.ok || !notificationsRes.ok) {
      throw new Error('Failed to retrieve API payloads');
    }

    const [user, notifications] = await Promise.all([
      userRes.json(),
      notificationsRes.json()
    ]);

    return { user, notifications };
  } catch (err) {
    console.error('API Sync Error:', err.message);
    throw err;
  }
}`,
    challenge: {
      instruction: 'Implement a `fetchWithTimeout(url, timeoutMs)` function that rejects with an "Operation timed out" error if the fetch does not complete within `timeoutMs` milliseconds.',
      starterCode: `async function fetchWithTimeout(url, timeoutMs = 3000) {
  // TODO: Combine fetch with a timeout promise using Promise.race()
}`,
      solution: `async function fetchWithTimeout(url, timeoutMs = 3000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
  });

  return Promise.race([fetch(url), timeoutPromise]);
}`,
      hint: 'Use `Promise.race([fetch(url), timeoutPromise])` where timeoutPromise rejects after `setTimeout`.'
    },
    quiz: [
      {
        question: 'What is the key difference between Promise.all() and Promise.allSettled()?',
        options: [
          'Promise.all() runs sequentially, while Promise.allSettled() runs in parallel',
          'Promise.all() rejects immediately if ANY promise rejects; Promise.allSettled() waits for ALL to settle regardless of success or failure',
          'There is no difference',
          'Promise.allSettled() only works in Node.js'
        ],
        answer: 1,
        explanation: '`Promise.all` fails fast on the first rejection, whereas `Promise.allSettled` waits for all promises to finish and returns their status results.'
      },
      {
        question: 'What does calling an `async` function always return?',
        options: ['A callback', 'A Promise', 'undefined', 'A Generator'],
        answer: 1,
        explanation: 'An `async` function wraps whatever value it returns into a resolved Promise automatically.'
      },
      {
        question: 'Where do Promise `.then()` callbacks get scheduled in the JavaScript runtime?',
        options: ['Macrotask Queue', 'Microtask Queue', 'Directly in the Call Stack', 'In localStorage'],
        answer: 1,
        explanation: 'Promise callbacks are scheduled in the higher-priority Microtask Queue, which executes before the next macrotask (e.g. `setTimeout`).'
      }
    ]
  },
  {
    id: 'js-06-dom-events',
    moduleNumber: 6,
    title: 'DOM Manipulation & Event Delegation',
    subtitle: 'Traversing the DOM, Event Bubbling & Capturing phases, and performant event delegation.',
    icon: 'CheckSquare',
    tag: 'Browser DOM',
    readTime: '15 min',
    overview: `The Document Object Model (DOM) is the tree representation of an HTML document in memory. Understanding event propagation (Capturing ➔ Target ➔ Bubbling) enables you to write highly performant applications using **event delegation**—attaching a single listener to a common ancestor rather than hundreds of listeners to child nodes.`,
    takeaways: [
      'Events propagate in 3 phases: Capturing, Target, and Bubbling.',
      'event.target is the element that originated the event; event.currentTarget is the element handling the listener.',
      'Event delegation attaches one listener to a parent and uses event.target.closest() to identify matches.',
      'e.preventDefault() stops default browser actions (like page reloads on form submit).'
    ],
    codeExample: `// Performant Event Delegation Pattern
const table = document.querySelector('#data-grid');

table.addEventListener('click', (event) => {
  // Check if click was on or inside a delete button
  const deleteBtn = event.target.closest('.btn-delete');
  if (deleteBtn) {
    const row = deleteBtn.closest('tr');
    const rowId = row.dataset.id;
    console.log('Deleting row with ID:', rowId);
    row.remove();
    return;
  }

  // Check if click was on a status badge
  const statusBadge = event.target.closest('.badge-status');
  if (statusBadge) {
    statusBadge.classList.toggle('bg-emerald-500');
    statusBadge.classList.toggle('bg-slate-700');
  }
});`,
    challenge: {
      instruction: 'Write a JavaScript event listener for an accordion container with event delegation so clicking any `.accordion-header` toggles the active class on its parent `.accordion-item`.',
      starterCode: `function setupAccordion(container) {
  // TODO: Add single delegated click listener on container
}`,
      solution: `function setupAccordion(container) {
  container.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;
    const item = header.closest('.accordion-item');
    if (item) {
      item.classList.toggle('is-open');
    }
  });
}`,
      hint: 'Use `e.target.closest(".accordion-header")` to detect if the click occurred on a header element.'
    },
    quiz: [
      {
        question: 'What is Event Delegation?',
        options: [
          'Assigning events to multiple threads',
          'Attaching a single event listener to a parent container to handle events from its child elements using bubbling',
          'Deleting event listeners automatically',
          'Passing events via props in React'
        ],
        answer: 1,
        explanation: 'Event delegation leverages event bubbling to handle events on child elements through a single ancestor listener.'
      },
      {
        question: 'What is the difference between `event.target` and `event.currentTarget`?',
        options: [
          'They are always identical',
          '`event.target` is the actual element that triggered the event; `event.currentTarget` is the element to which the event handler is attached',
          '`event.target` is for mouse clicks only',
          '`event.currentTarget` is deprecated'
        ],
        answer: 1,
        explanation: '`event.target` is the deepest clicked node, while `event.currentTarget` refers to the element listening to the event.'
      },
      {
        question: 'Which method stops an event from continuing to propagate up the DOM tree?',
        options: [
          'event.preventDefault()',
          'event.stopPropagation()',
          'event.cancel()',
          'event.exit()'
        ],
        answer: 1,
        explanation: '`event.stopPropagation()` stops the event from bubbling up or capturing down through subsequent DOM elements.'
      }
    ]
  },
  {
    id: 'js-07-prototypes-oop',
    moduleNumber: 7,
    title: 'Prototypes, Classes & Modern OOP',
    subtitle: 'The prototype chain, ES6 classes, private fields (#), static methods, and inheritance.',
    icon: 'Globe',
    tag: 'OOP & Classes',
    readTime: '16 min',
    overview: `JavaScript is a prototype-based object-oriented language. Unlike class-based languages (like Java or C++), JavaScript objects inherit directly from other objects via the prototype chain. ES6 \`class\` syntax provides clear syntactic sugar over prototype chains while supporting private fields (\`#field\`) and inheritance.`,
    takeaways: [
      'Objects inherit properties and methods from their prototype ([[Prototype]]).',
      'ES6 classes are syntactic sugar over constructor functions and prototype objects.',
      'Use #fieldName for private fields that cannot be accessed outside the class body.',
      'super() must be called in subclass constructors before accessing this.'
    ],
    codeExample: `// Modern ES6+ Class with Private Fields and Encapsulation
class ObservableStore {
  #state; // Private field (ES2022)
  #listeners = new Set();

  constructor(initialState = {}) {
    this.#state = initialState;
  }

  getState() {
    return { ...this.#state }; // Return defensive copy
  }

  setState(update) {
    this.#state = typeof update === 'function' ? update(this.#state) : { ...this.#state, ...update };
    this.#notify();
  }

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener); // Unsubscribe
  }

  #notify() {
    this.#listeners.forEach(fn => fn(this.getState()));
  }
}`,
    challenge: {
      instruction: 'Create a `Stack` class that has `push(item)`, `pop()`, `peek()`, and `size` getter, using a private `#items` array to ensure internal storage cannot be accessed directly.',
      starterCode: `class Stack {
  // TODO: Use private #items array
}`,
      solution: `class Stack {
  #items = [];

  push(item) {
    this.#items.push(item);
  }

  pop() {
    return this.#items.pop();
  }

  peek() {
    return this.#items[this.#items.length - 1];
  }

  get size() {
    return this.#items.length;
  }
}`,
      hint: 'Declare `#items = [];` as a class field and implement methods interacting with `#items`.'
    },
    quiz: [
      {
        question: 'What is at the end of the JavaScript prototype chain?',
        options: ['Object.prototype', 'null', 'undefined', 'window'],
        answer: 1,
        explanation: 'The prototype chain ends at `Object.prototype.__proto__`, which is `null`.'
      },
      {
        question: 'How do you define a truly private field in modern ES6+ classes?',
        options: [
          'Prefix with an underscore `_myField`',
          'Prefix with a hash symbol `#myField`',
          'Use the `private` keyword like TypeScript',
          'Declare inside a closure only'
        ],
        answer: 1,
        explanation: 'JavaScript native private fields use `#` syntax (e.g. `#secret`), enforced at the runtime level.'
      },
      {
        question: 'Why must `super()` be called in a derived class constructor before using `this`?',
        options: [
          'To load external libraries',
          'To initialize the parent class instance and bind `this` properly',
          'It is optional',
          'To clear browser memory'
        ],
        answer: 1,
        explanation: 'In derived classes, `this` is not initialized until `super()` executes the parent constructor.'
      }
    ]
  },
  {
    id: 'js-08-event-loop-memory',
    moduleNumber: 8,
    title: 'Event Loop, Microtasks & Memory Management',
    subtitle: 'Deep dive into Call Stack, Web APIs, Task Queues, Garbage Collection, and avoiding memory leaks.',
    icon: 'Activity',
    tag: 'Engine Internals',
    readTime: '18 min',
    overview: `Understanding the JavaScript runtime engine (V8) unlocks mastery over performance and execution order. The single-threaded Call Stack coordinates with the Microtask Queue (Promises, queueMicrotask) and Macrotask Queue (setTimeout, DOM events) through the Event Loop, while the Garbage Collector frees unreachable heap memory.`,
    takeaways: [
      'Call Stack executes synchronous code one frame at a time (LIFO).',
      'The Event Loop drains the ENTIRE Microtask Queue before running the next Macrotask.',
      'V8 uses Mark-and-Sweep garbage collection starting from Root references.',
      'Always remove event listeners, intervals, and observer instances to prevent memory leaks.'
    ],
    codeExample: `// Event Loop Priority Execution Breakdown
console.log('1. Sync Start');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout 0ms)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('2. Microtask (Promise 1)');
  })
  .then(() => {
    console.log('3. Microtask (Promise 2 chained)');
  });

console.log('5. Sync End');

// Output order: 1 -> 5 -> 2 -> 3 -> 4`,
    challenge: {
      instruction: 'Create a function `predictExecutionOrder()` that returns an array with the numbers [1, 2, 3, 4] representing the execution order of the code snippet above.',
      starterCode: `function predictExecutionOrder() {
  // TODO: Return array of logs in order of execution
  return [];
}`,
      solution: `function predictExecutionOrder() {
  // 1: Sync Start, 5: Sync End, 2: Microtask 1, 3: Microtask 2, 4: Macrotask
  return [1, 5, 2, 3, 4];
}`,
      hint: 'Synchronous stack runs first (1, 5), then all microtasks (2, 3), and finally macrotasks (4).'
    },
    quiz: [
      {
        question: 'Which queue has higher execution priority: Microtask Queue or Macrotask Queue?',
        options: [
          'Macrotask Queue',
          'Microtask Queue (all microtasks are executed before the next macrotask)',
          'They alternate 50/50',
          'It depends on network speed'
        ],
        answer: 1,
        explanation: 'After every synchronous script execution, the engine drains all queued microtasks before proceeding to the next macrotask.'
      },
      {
        question: 'How does the V8 garbage collector determine if an object can be safely freed from memory?',
        options: [
          'By checking how many lines of code the object has',
          'By determining if the object is unreachable from any active Root reference (Mark-and-Sweep algorithm)',
          'By checking the file size on disk',
          'When the user reloads the page only'
        ],
        answer: 1,
        explanation: 'If an object in the heap is not reachable by traversing references from root objects (global window, current stack), it is reclaimed.'
      },
      {
        question: 'Which of the following is a common cause of JavaScript memory leaks?',
        options: [
          'Using const instead of let',
          'Forgotten setInterval timers or lingering event listeners referencing detached DOM elements',
          'Writing pure functions',
          'Using Array.prototype.map'
        ],
        answer: 1,
        explanation: 'Active intervals or event listeners retain references to closures and elements, preventing the garbage collector from reclaiming memory.'
      }
    ]
  },
  {
    id: 'js-09-design-patterns',
    moduleNumber: 9,
    title: 'JavaScript Design Patterns & Architecture',
    subtitle: 'Module, Observer/PubSub, Singleton, Factory, and Proxy/Reflect reactivity patterns.',
    icon: 'Compass',
    tag: 'Architecture',
    readTime: '16 min',
    overview: `Design patterns are battle-tested architectural templates for solving recurring software design challenges. In modern JavaScript, patterns like PubSub (Event Bus), Observer, Module, and Proxy/Reflect enable decoupled architectures, reactive data bindings, and clean abstractions.`,
    takeaways: [
      'Observer/PubSub pattern completely decouples publishers from subscribers.',
      'Singleton pattern ensures a class has only one single shared instance.',
      'Proxy and Reflect intercept fundamental object operations (property reads, writes, deletions).',
      'Module pattern encapsulates private internals and exports explicit interfaces.'
    ],
    codeExample: `// Lightweight Reactive State using Proxy & Reflect
function createReactiveState(initialState, onStateChange) {
  return new Proxy(initialState, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const oldValue = target[prop];
      const success = Reflect.set(target, prop, value, receiver);
      if (success && oldValue !== value) {
        onStateChange(prop, value, oldValue);
      }
      return success;
    }
  });
}

const state = createReactiveState({ count: 0, user: 'Alex' }, (key, next, prev) => {
  console.log(\`⚡ State Changed: [\${key}] \${prev} -> \${next}\`);
});

state.count = 1; // Logs: ⚡ State Changed: [count] 0 -> 1`,
    challenge: {
      instruction: 'Build a PubSub `EventEmitter` class with `on(event, callback)`, `emit(event, ...args)`, and `off(event, callback)` methods.',
      starterCode: `class EventEmitter {
  // TODO: Implement on, emit, off
}`,
      solution: `class EventEmitter {
  #events = {};

  on(event, listener) {
    if (!this.#events[event]) this.#events[event] = [];
    this.#events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (!this.#events[event]) return;
    this.#events[event] = this.#events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.#events[event]) return;
    this.#events[event].forEach(fn => fn(...args));
  }
}`,
      hint: 'Store listeners in a dictionary `#events = {}` where each event key maps to an array of callback functions.'
    },
    quiz: [
      {
        question: 'What is the primary goal of the Observer / PubSub pattern?',
        options: [
          'To connect to a WebSocket server automatically',
          'To decouple publishers from subscribers so components can communicate without direct dependencies',
          'To replace functions with loops',
          'To convert JavaScript to SQL'
        ],
        answer: 1,
        explanation: 'PubSub enables loose coupling by allowing senders to emit events without knowing who or what is listening.'
      },
      {
        question: 'What do JavaScript `Proxy` objects allow you to do?',
        options: [
          'Create VPN connections inside the browser',
          'Intercept and customize fundamental operations on objects (like get, set, deleteProperty)',
          'Speed up math calculations',
          'Encrypt local storage'
        ],
        answer: 1,
        explanation: '`Proxy` allows defining custom traps that intercept core operations like property access and assignment on a target object.'
      },
      {
        question: 'Why is `Reflect` recommended when writing `Proxy` traps?',
        options: [
          'It provides default behaviors that mirror object internal methods, ensuring proper prototype binding and return values',
          'It is required by the browser to prevent syntax errors',
          'It makes objects immutable',
          'It converts objects to arrays'
        ],
        answer: 0,
        explanation: '`Reflect` methods forward default operations correctly, matching the expected boolean return signatures for proxy traps.'
      }
    ]
  },
  {
    id: 'js-10-interview-polyfills',
    moduleNumber: 10,
    title: 'Interview Mastery: Polyfills & Hand-Rolled Utilities',
    subtitle: 'Debounce, Throttle, Deep Clone, Currying, and writing custom polyfills from scratch.',
    icon: 'Rocket',
    tag: 'Interview Prep',
    readTime: '20 min',
    overview: `Senior frontend technical interviews frequently test fundamental JavaScript mechanics by asking candidates to implement utilities from scratch without third-party libraries. In this capstone module, master hand-rolled implementations of Debounce, Throttle, Deep Clone, Currying, and Array polyfills.`,
    takeaways: [
      'Debounce delays execution until a quiet period occurs (e.g. search inputs).',
      'Throttle limits execution rate to at most once per fixed time interval (e.g. scroll handlers).',
      'Deep clone must handle nested objects, arrays, and avoid mutating shared references.',
      'Polyfills provide backwards compatibility by implementing standard APIs on prototypes.'
    ],
    codeExample: `// Production-Grade Debounce with Immediate Option
function debounce(fn, delay = 300, immediate = false) {
  let timerId = null;

  return function(...args) {
    const callNow = immediate && !timerId;

    clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) fn.apply(this, args);
    }, delay);

    if (callNow) fn.apply(this, args);
  };
}`,
    challenge: {
      instruction: 'Implement a custom polyfill for `Array.prototype.myFilter(callback)` that works identically to native `filter()`.',
      starterCode: `Array.prototype.myFilter = function(callback) {
  // TODO: Implement custom filter logic
};`,
      solution: `Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};`,
      hint: 'Loop through `this`, test `callback(this[i], i, this)`, and push matching items to a new array.'
    },
    quiz: [
      {
        question: 'When should you use Debounce instead of Throttle?',
        options: [
          'For a mouse drag-and-drop or high-frequency scroll listener',
          'For an autocomplete search input where you only want to fire the search after the user stops typing for 300ms',
          'For server health check pings every 5 minutes',
          'There is no functional difference'
        ],
        answer: 1,
        explanation: 'Debounce waits for a pause in events (user stops typing), while Throttle fires continuously at a regulated maximum frequency.'
      },
      {
        question: 'What is Function Currying?',
        options: [
          'Adding spice to JavaScript code',
          'Transforming a function that takes multiple arguments `f(a, b, c)` into a sequence of functions that take a single argument `f(a)(b)(c)`',
          'A method to cancel timeouts',
          'Running functions in a worker thread'
        ],
        answer: 1,
        explanation: 'Currying decomposes a multi-argument function into unary (single-argument) nested function calls.'
      },
      {
        question: 'Why does `JSON.parse(JSON.stringify(obj))` fail as a universal deep clone?',
        options: [
          'It loses Functions, `undefined`, `NaN`, `Date` objects, `RegExp`, `Map`, `Set`, and throws on circular references',
          'It only runs in Node.js',
          'It converts all numbers to strings',
          'It requires an internet connection'
        ],
        answer: 0,
        explanation: 'JSON serialization strips functions and symbols, turns Dates into strings, converts NaN to null, and crashes on circular references.'
      }
    ]
  }
];

# Module 01: React Foundations & JSX

## 1. What is React?
React is a declarative, component-based JavaScript library developed by Meta for building dynamic user interfaces. 

### Key Principles:
1. **Declarative**: You describe *what* the UI should look like for a given state, and React handles updating the DOM efficiently.
2. **Component-Based**: Encapsulated pieces of UI that manage their own state and can be composed together.
3. **Learn Once, Write Anywhere**: React mental models apply to Web (React DOM), Mobile (React Native), and Desktop (Electron/Tauri).

---

## 2. The Virtual DOM (VDOM)
Directly manipulating the browser DOM (`document.getElementById`, `innerHTML`) is slow and error-prone. 

- **Virtual DOM**: A lightweight in-memory JavaScript representation of the actual DOM tree.
- **Diffing Algorithm (Reconciliation)**: When state changes, React computes the diff between the previous VDOM and the new VDOM.
- **Batching**: Only the exact changed DOM elements are updated in a single batch pass.

```
[State Change] ➔ [New Virtual DOM] ➔ [Diff with Old Virtual DOM] ➔ [Minimal Real DOM Updates]
```

---

## 3. What is JSX?
**JSX (JavaScript XML)** is a syntax extension for JavaScript that looks like HTML. It gets transpiled into `React.createElement()` calls by Babel / SWC.

```jsx
// What you write (JSX):
const element = <h1 className="text-2xl font-bold text-sky-500">Hello Dojo!</h1>;

// What it compiles to (JavaScript):
const element = React.createElement(
  'h1',
  { className: 'text-2xl font-bold text-sky-500' },
  'Hello Dojo!'
);
```

---

## 4. Fundamental Rules of JSX

### Rule 1: Return a Single Root Element (or Fragment)
A component can only return one top-level element. Use `<React.Fragment>` or shorthand `<>...</>` to group elements without adding extra nodes to the DOM.

```jsx
// ❌ WRONG: Adjacent JSX elements must be wrapped
function UserProfile() {
  return (
    <h2>Sarah Connor</h2>
    <p>Frontend Engineer</p>
  );
}

// ✅ CORRECT: Wrapped in Fragment
function UserProfile() {
  return (
    <>
      <h2 className="text-xl font-bold text-slate-800">Sarah Connor</h2>
      <p className="text-slate-500">Frontend Engineer</p>
    </>
  );
}
```

### Rule 2: Close All Tags
Every tag must be closed, even self-closing HTML tags like `<img>`, `<input>`, `<br>`, and `<hr>`.

```jsx
// ✅ Always self-close tags without children
<input type="text" placeholder="Enter username..." className="px-4 py-2 border rounded-lg" />
<img src="/avatar.jpg" alt="User avatar" className="w-12 h-12 rounded-full" />
```

### Rule 3: CamelCase for HTML Attributes
Since JSX is closer to JavaScript than HTML:
- `class` becomes `className` (because `class` is a reserved JS keyword).
- `for` becomes `htmlFor`.
- `onclick` becomes `onClick`.
- `tabindex` becomes `tabIndex`.

```jsx
<button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-xl transition">
  Click Me
</button>
```

### Rule 4: JavaScript Expressions Inside Curly Braces `{}`
Any valid JavaScript expression (variables, function calls, arithmetic, ternary operators) can be placed inside `{}`:

```jsx
function GreetingCard() {
  const user = { firstName: 'Alex', role: 'Ninja', streakDays: 14 };
  const isPro = true;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
      <h3 className="text-lg font-semibold text-white">
        Welcome back, {user.firstName.toUpperCase()}!
      </h3>
      <p className="text-slate-400 mt-1">
        Current Streak: <span className="text-amber-400 font-bold">{user.streakDays * 24} hours</span>
      </p>
      {isPro ? (
        <span className="inline-block mt-3 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
          PRO MEMBER
        </span>
      ) : (
        <span className="inline-block mt-3 px-3 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded-full">
          FREE TIER
        </span>
      )}
    </div>
  );
}
```

---

## 5. Quick Exercise
1. Open the interactive playground in the web application.
2. Build a user badge component that conditionally renders an "Online" status dot (green) or "Offline" status dot (gray) using JSX curly braces and Tailwind CSS classes!

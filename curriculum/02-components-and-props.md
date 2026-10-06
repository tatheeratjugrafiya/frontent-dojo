# Module 02: Components, Props & Composition

## 1. What are Components?
In React, a component is a reusable JavaScript function that accepts inputs (called **props**) and returns a React element (JSX) describing how a section of the UI should look.

> **Naming Convention**: React components MUST start with an uppercase letter (`Button`, `Card`, `Navbar`). Lowercase tags (`div`, `span`, `p`) are reserved for HTML standard elements.

```jsx
// Simple functional component
function WelcomeHero() {
  return (
    <section className="bg-gradient-to-r from-sky-500 to-indigo-600 p-8 rounded-2xl text-white shadow-xl">
      <h1 className="text-3xl font-extrabold tracking-tight">Level Up Your Frontend</h1>
      <p className="mt-2 text-sky-100 text-sm">Master React and modern styling from scratch.</p>
    </section>
  );
}
```

---

## 2. Passing & Receiving Props
Props (short for *properties*) allow you to pass data from a parent component down to child components. 

> **Crucial Rule**: Props are **read-only** (immutable). A child component must never modify its own props directly.

### Destructuring Props in Function Signature:
```jsx
// Child Component
function StatCard({ label, value, change, isPositive = true }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">{label}</p>
      <div className="flex items-baseline justify-between mt-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
        }`}>
          {isPositive ? '▲ +' : '▼ -'}{change}%
        </span>
      </div>
    </div>
  );
}

// Parent Component
function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard label="Total XP" value="14,250" change={12.4} isPositive={true} />
      <StatCard label="Completed Lessons" value="28 / 40" change={5.0} isPositive={true} />
      <StatCard label="Avg. Bug Rate" value="1.2%" change={0.8} isPositive={false} />
    </div>
  );
}
```

---

## 3. The Special `children` Prop
The `children` prop allows components to wrap arbitrary nested content, enabling powerful container and layout patterns.

```jsx
function ModalCard({ title, children, footerAction }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-md w-full">
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/50">
        <h3 className="font-semibold text-white">{title}</h3>
      </header>
      
      {/* Dynamic children inserted here */}
      <div className="p-6 text-slate-300">
        {children}
      </div>

      {footerAction && (
        <footer className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex justify-end">
          {footerAction}
        </footer>
      )}
    </div>
  );
}
```

---

## 4. Component Composition Over Inheritance
React heavily favors **composition** (combining smaller single-responsibility components together like Lego bricks) over inheritance.

```jsx
<Card>
  <Card.Header>
    <UserAvatar src="/alex.png" />
    <Card.Title>Alex Morgan</Card.Title>
  </Card.Header>
  <Card.Body>
    <p>Completed 15 interactive coding challenges this week!</p>
  </Card.Body>
</Card>
```

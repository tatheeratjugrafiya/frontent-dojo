# Module 03: Tailwind CSS Mastery for React

## 1. Why Utility-First CSS?
Traditional CSS requires naming arbitrary classes (`.card-wrapper-inner-box-v2`) and constantly switching between `.jsx` and `.css` files. 

**Tailwind CSS** provides low-level atomic utility classes that you compose directly inside your React JSX markup.

### Core Benefits:
- **No CSS bloat**: Only classes used in your templates get generated into final CSS.
- **Enforced design tokens**: Built-in harmonic spacing, typography scale, and color palettes.
- **Zero context switching**: Style right where your component logic lives.

---

## 2. The Tailwind Box Model & Spacing
Tailwind uses a 4px scale by default (`1 unit = 0.25rem = 4px`):
- `p-4` = `padding: 1rem (16px)`
- `m-6` = `margin: 1.5rem (24px)`
- `w-1/2` = `width: 50%`
- `max-w-xl` = `max-width: 36rem`
- `gap-3` = `gap: 0.75rem (12px)`

```jsx
<div className="p-6 m-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
  <p className="text-slate-200">Spacing is clean and consistent.</p>
</div>
```

---

## 3. Flexbox and CSS Grid in Tailwind

### Modern Flexbox:
```jsx
<div className="flex items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-xl">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
      TS
    </div>
    <div>
      <h4 className="font-semibold text-white text-sm">TypeScript Fundamentals</h4>
      <p className="text-xs text-slate-400">12 lessons • 45 min</p>
    </div>
  </div>
  <button className="px-3 py-1.5 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition-colors">
    Start
  </button>
</div>
```

### Modern Responsive Grid:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Automatically reflows from 1 column on mobile to 4 on desktop */}
</div>
```

---

## 4. State Modifiers (Hover, Focus, Active, Group-Hover, Dark)

Tailwind uses prefix modifiers for pseudo-classes:
- `hover:bg-sky-600`
- `focus:ring-2 focus:ring-sky-400 focus:outline-none`
- `active:scale-95`
- `disabled:opacity-50 disabled:cursor-not-allowed`
- `dark:bg-slate-950 dark:text-slate-100`

### Group-Hover Pattern:
Hovering on a parent container can change the styling of nested child elements:

```jsx
<div className="group p-5 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/50 rounded-2xl transition cursor-pointer">
  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition flex items-center justify-center">
    ⚡
  </div>
  <h4 className="mt-4 font-bold text-white group-hover:text-sky-400 transition">
    Supercharged Workflows
  </h4>
  <p className="text-slate-400 text-sm mt-1">Interactive state triggers styled effortlessly.</p>
</div>
```

---

## 5. Dynamic Classes with `clsx` and `tailwind-merge`
When dealing with conditional styles, string concatenation can cause conflicting class bugs (e.g. `p-4` vs `p-2`). Use the standard `cn` utility:

```jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Usage in reusable Button component:
function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition active:scale-95 disabled:opacity-50";
  
  const variants = {
    primary: "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/25",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/25",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
```

# 🎨 Tailwind CSS Core Cheat Sheet for React

## 1. Flexbox & Grid
| Class | CSS Equivalent |
| :--- | :--- |
| `flex` | `display: flex;` |
| `flex-col` | `flex-direction: column;` |
| `items-center` | `align-items: center;` |
| `justify-between` | `justify-content: space-between;` |
| `gap-4` | `gap: 1rem (16px);` |
| `grid grid-cols-3` | `display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));` |

---

## 2. Spacing & Sizing
| Class | Values |
| :--- | :--- |
| `p-2, p-4, p-6, p-8` | Padding: 8px, 16px, 24px, 32px |
| `px-4 py-2` | Horizontal 16px, Vertical 8px |
| `w-full, w-1/2, w-64` | 100%, 50%, 256px |
| `h-screen, min-h-[400px]` | 100vh, min height 400px |
| `rounded-lg, rounded-2xl, rounded-full` | Border radius 8px, 16px, 9999px |

---

## 3. Colors & Gradients
| Class | Effect |
| :--- | :--- |
| `bg-slate-900` | Dark slate background |
| `text-sky-400` | Bright blue text |
| `bg-gradient-to-r from-sky-500 to-indigo-600` | Smooth modern gradient |
| `border border-slate-800` | Subtle dark border |
| `shadow-xl shadow-sky-500/10` | Glow / elevation shadow |

---

## 4. Responsive Breakpoints
- `sm:` -> `@media (min-width: 640px)`
- `md:` -> `@media (min-width: 768px)`
- `lg:` -> `@media (min-width: 1024px)`
- `xl:` -> `@media (min-width: 1280px)`

```jsx
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive card
</div>
```

---

## 5. State Pseudo-Classes
- `hover:bg-sky-600` (On mouse hover)
- `focus:ring-2 focus:ring-sky-400` (On keyboard focus)
- `active:scale-95` (On click press)
- `disabled:opacity-50` (When disabled)
- `group-hover:text-sky-400` (When parent group is hovered)

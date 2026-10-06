# Module 10: Production Patterns, Performance & Projects

## 1. Production Best Practices Checklist
- [x] **Component Separation**: Keep components focused on a single responsibility (<150 lines).
- [x] **Clean Folder Structure**: Feature-based folders (`features/todos/`, `components/ui/`, `hooks/`, `utils/`).
- [x] **Keys in Lists**: Always use stable unique IDs (`item.id`), NEVER use array indices (`index`) if the list can be sorted, filtered, or mutated.
- [x] **Code Splitting**: Lazy load routes with `React.lazy` and `Suspense`.
- [x] **Error Boundaries**: Catch runtime JavaScript errors in child trees to prevent full app crashes.

---

## 2. Real-World Project Blueprints Included in this Dojo

### Project 1: FocusFlow Task & Habit Engine
- **Concepts**: `useState`, `useEffect`, `localStorage` persistence, Tailwind animations, filters (All/Active/Completed).
- **Features**: Drag-like priority sorting, completion streaks, confetti celebration.

### Project 2: CryptoMarket Real-Time Dashboard
- **Concepts**: Asynchronous data fetching, `useEffect` cleanup, search filters, dynamic badges, responsive Tailwind grid.

### Project 3: Kanban Sprint Board
- **Concepts**: Complex state with `useReducer`, multi-column cards, modal dialogs, status transitions.

---

## 3. Recommended Folder Structure for Large Apps
```
src/
├── assets/             # Images, SVG icons, fonts
├── components/         # Shared reusable UI primitives (Button, Modal, Input, Badge)
│   └── ui/
├── context/            # Global React Context providers (AuthContext, ThemeContext)
├── hooks/              # Custom reusable hooks (useDebounce, useLocalStorage, useWindowSize)
├── features/           # Feature-sliced modules (lessons, challenges, sandbox)
│   ├── lessons/
│   ├── playground/
│   └── quiz/
├── services/           # API clients and HTTP helper functions
├── utils/              # Helper functions, formatting, constants
├── App.jsx
└── main.jsx
```

# Module 08: Context API & Global State Management

## 1. The Problem: Prop Drilling
When deeply nested components need access to data (e.g. Current User, Theme, Cart Items), passing props through intermediate layers is called **prop drilling**.

```
[App (user)] ➔ [Navbar] ➔ [NavMenu] ➔ [UserProfileButton (needs user!)]
```

---

## 2. React Context API
Context lets a parent component provide data to the entire tree below it, no matter how deep.

### Step 1: Create the Context
```jsx
// ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for convenient consumption
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Step 2: Wrap Application Tree
```jsx
// App.jsx
import { ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
```

### Step 3: Consume in Any Child Component
```jsx
// ThemeToggleButton.jsx
import { useTheme } from './ThemeContext';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
    >
      Current: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

---

## 3. Combining Context with `useReducer` for Complex State
For complex multi-action global state (like a shopping cart or task manager), combining `useReducer` with Context creates a clean, Redux-like architecture without third-party libraries.

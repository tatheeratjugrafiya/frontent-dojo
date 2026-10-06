# ⚡ React 18 Quick Reference & Cheat Sheet

## Component Basics
```jsx
// Standard Functional Component with Props
export function Welcome({ name, role = 'Learner' }) {
  return <h1>Hello, {name} ({role})!</h1>;
}
```

---

## The Essential Hooks
| Hook | Purpose | Example |
| :--- | :--- | :--- |
| `useState` | Local component state | `const [count, setCount] = useState(0);` |
| `useEffect` | Side effects & lifecycle | `useEffect(() => { fetchData(); }, [dep]);` |
| `useRef` | DOM references & mutable values | `const inputRef = useRef(null);` |
| `useContext` | Read context value | `const theme = useContext(ThemeContext);` |
| `useReducer` | Redux-like action reducer | `const [state, dispatch] = useReducer(reducer, init);` |
| `useMemo` | Cache heavy computed values | `const total = useMemo(() => computeTotal(items), [items]);` |
| `useCallback` | Cache callback function instances | `const handleClick = useCallback(() => {}, []);` |
| `useId` | Generate unique accessible IDs | `const id = useId();` |

---

## Conditional Rendering
```jsx
// 1. Ternary Operator
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// 2. Short-Circuit Logical AND (Careful with 0!)
{hasUnreadMessages && <Badge count={unreadCount} />}

// 3. Early Return Guard
if (isLoading) return <Spinner />;
```

---

## List Rendering & Keys
```jsx
<ul>
  {items.map((item) => (
    // ALWAYS provide a unique stable key!
    <li key={item.id} className="py-2">
      {item.title}
    </li>
  ))}
</ul>
```

---

## Event Handling
```jsx
<button onClick={(e) => handleClick(e, item.id)}>Click</button>
<input onChange={(e) => setText(e.target.value)} />
<form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>...</form>
```

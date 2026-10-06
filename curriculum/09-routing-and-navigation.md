# Module 09: Client-Side Routing & Navigation

## 1. What is Client-Side Routing (SPA)?
In a Single Page Application (SPA), navigating between pages does **not** make a full round-trip browser reload to the server. JavaScript intercepts the URL change and dynamically mounts the appropriate view component.

---

## 2. React Router Core Concepts

### Setting up Browser Router & Routes:
```jsx
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <header className="p-4 bg-slate-900 border-b border-slate-800 flex gap-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-sky-400 font-bold" : "text-slate-400 hover:text-white"}
        >
          Home
        </NavLink>
        <NavLink 
          to="/lessons" 
          className={({ isActive }) => isActive ? "text-sky-400 font-bold" : "text-slate-400 hover:text-white"}
        >
          Lessons
        </NavLink>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lessons" element={<LessonsList />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
```

### Reading Dynamic URL Parameters (`useParams`):
```jsx
function LessonDetail() {
  const { id } = useParams();
  return <h2 className="text-xl text-white">Viewing Lesson #{id}</h2>;
}
```

### Programmatic Navigation (`useNavigate`):
```jsx
function CheckoutButton() {
  const navigate = useNavigate();

  const handleFinish = () => {
    // Process order...
    navigate('/success', { replace: true });
  };

  return <button onClick={handleFinish}>Complete Order</button>;
}
```

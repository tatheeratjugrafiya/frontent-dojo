# Module 07: Forms, Input Handling & Validation

## 1. Controlled vs Uncontrolled Components

### Controlled Components (Recommended):
React state is the **single source of truth** for input values. Every keystroke updates state.

```jsx
import { useState } from 'react';

function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    framework: 'react',
    newsletter: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop standard HTML page reload!
    console.log('Submitting data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
```

---

## 2. Client-side Form Validation Pattern
```jsx
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!formData.username.trim()) newErrors.username = 'Username is required';
  if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});
  // Process form...
};
```

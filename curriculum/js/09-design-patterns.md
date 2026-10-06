# Module JS-09: JavaScript Design Patterns & Architecture

## 1. The Module Pattern (ES Modules & IIFE)
Encapsulates private state and exposes only public APIs.

```javascript
// Modern ES Module
const internalSecretKey = 'XYZ-999';

export const AuthService = {
  login(token) {
    return token === internalSecretKey;
  }
};
```

---

## 2. Observer / PubSub Pattern (Event Bus)
Decouples producers from consumers completely.

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.events.get(event) || [];
      this.events.set(event, listeners.filter(l => l !== listener));
    };
  }

  emit(event, ...data) {
    const listeners = this.events.get(event) || [];
    listeners.forEach(fn => fn(...data));
  }
}

const bus = new EventEmitter();
const unsubscribe = bus.on('user:registered', (u) => console.log('Welcome email sent to', u.email));

bus.emit('user:registered', { email: 'alex@dojo.dev' });
unsubscribe();
```

---

## 3. Proxy & Reflect Pattern (Reactivity)
Used by Vue 3 and modern state libraries to detect property reads and writes.

```javascript
const user = { name: 'Sarah', age: 24 };

const reactiveUser = new Proxy(user, {
  get(target, prop) {
    console.log(`🔍 [Read] Property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(`✏️ [Write] Property: ${prop} = ${value}`);
    return Reflect.set(target, prop, value);
  }
});

reactiveUser.age = 25; // ✏️ [Write] Property: age = 25
console.log(reactiveUser.age); // 🔍 [Read] -> 25
```

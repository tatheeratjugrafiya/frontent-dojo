# Module JS-05: Asynchronous JavaScript, Promises & `async`/`await`

## 1. The Asynchronous Nature of JavaScript
JavaScript is a single-threaded runtime with an event-driven, non-blocking I/O model. Long-running tasks (network requests, disk reads, timers) are delegated to browser Web APIs, allowing the main thread to remain responsive.

```
[Call Stack] ➔ [Web APIs (fetch/timers)] ➔ [Microtask / Callback Queue] ➔ [Event Loop] ➔ [Back to Stack]
```

---

## 2. Understanding Promises
A **Promise** represents an eventual completion (or failure) of an asynchronous operation and its resulting value.

### Promise States:
1. `pending`: Initial state, neither fulfilled nor rejected.
2. `fulfilled`: Operation completed successfully (`resolve(data)`).
3. `rejected`: Operation failed (`reject(error)`).

```javascript
function fetchLearnerProfile(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Elena Rostova', belt: 'Black Belt' });
      } else {
        reject(new Error('Invalid Learner ID'));
      }
    }, 1000);
  });
}

// Chaining with .then() and .catch()
fetchLearnerProfile(1)
  .then(profile => console.log('Loaded:', profile))
  .catch(err => console.error('Error:', err.message))
  .finally(() => console.log('Fetch cycle complete.'));
```

---

## 3. Modern `async` and `await`
`async`/`await` is syntactic sugar over Promises that allows asynchronous code to read linearly like synchronous code.

```javascript
async function loadDashboard(userId) {
  try {
    console.log('Loading profile...');
    const user = await fetchLearnerProfile(userId);
    console.log('Profile loaded:', user.name);
    return user;
  } catch (error) {
    console.error('Failed to load dashboard:', error.message);
    throw error;
  }
}
```

---

## 4. Concurrent Promise Combinators

| Combinator | Behavior |
| :--- | :--- |
| `Promise.all([p1, p2])` | Runs in parallel. Resolves when **ALL** resolve; rejects immediately if **ANY** rejects. |
| `Promise.allSettled([p1, p2])` | Runs in parallel. Waits for all to complete regardless of resolution/rejection. |
| `Promise.race([p1, p2])` | Returns the result of whichever promise settles **first** (fastest). |
| `Promise.any([p1, p2])` | Returns the first **successful** fulfillment; ignores rejections until all fail. |

```javascript
// Parallel fetching with Promise.all
const [lessons, stats, user] = await Promise.all([
  fetch('/api/lessons').then(r => r.json()),
  fetch('/api/stats').then(r => r.json()),
  fetch('/api/user').then(r => r.json())
]);
```

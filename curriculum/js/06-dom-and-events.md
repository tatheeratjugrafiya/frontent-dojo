# Module JS-06: DOM Manipulation, Events & Event Delegation

## 1. Querying and Manipulating DOM Elements
```javascript
// Selecting elements
const mainCard = document.querySelector('#feature-card');
const allButtons = document.querySelectorAll('.action-btn');

// Creating and Appending elements
const badge = document.createElement('span');
badge.className = 'px-2 py-1 bg-sky-500 text-white text-xs rounded-full';
badge.textContent = 'PRO';
mainCard.appendChild(badge);
```

---

## 2. Event Bubbling, Capturing & Event Delegation

### The 3 Event Phases:
1. **Capturing Phase**: Event travels down from `window` ➔ `document` ➔ `target`.
2. **Target Phase**: Event arrives at the target element.
3. **Bubbling Phase**: Event bubbles back up from `target` ➔ `document` ➔ `window`.

### Event Delegation Pattern:
Instead of attaching 1,000 separate event listeners to 1,000 table rows or list items, attach **ONE** listener on the parent element and use `event.target.closest()`.

```javascript
const taskList = document.querySelector('#task-list');

// Single efficient listener for all existing and future items!
taskList.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.delete-btn');
  if (deleteBtn) {
    const row = deleteBtn.closest('.task-item');
    row.remove();
    return;
  }

  const toggleBtn = event.target.closest('.toggle-btn');
  if (toggleBtn) {
    toggleBtn.classList.toggle('completed');
  }
});
```

---

## 3. Custom Events & Dispatching
```javascript
// Create a decoupled custom event
const courseCompletedEvent = new CustomEvent('dojo:completed', {
  detail: { courseId: 'react-101', xpEarned: 500 },
  bubbles: true
});

// Dispatch event
document.dispatchEvent(courseCompletedEvent);

// Listen anywhere in the app
document.addEventListener('dojo:completed', (e) => {
  console.log('🎉 XP Awarded:', e.detail.xpEarned);
});
```

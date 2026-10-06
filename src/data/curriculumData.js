export const CURRICULUM_MODULES = [
  {
    id: '01-foundations-jsx',
    moduleNumber: 1,
    title: 'React Foundations & JSX',
    subtitle: 'Understand the Virtual DOM, declarative UI, and JSX mental models from day one.',
    icon: 'Atom',
    tag: 'Core Concept',
    readTime: '10 min',
    overview: `React is a declarative library for building interactive user interfaces. Instead of manually updating browser DOM nodes using imperative JavaScript (\`document.getElementById\`), React allows you to describe **what** the UI should look like for a given state, and automatically synchronizes the real DOM via the Virtual DOM reconciliation algorithm.`,
    takeaways: [
      'React is declarative and component-based.',
      'Virtual DOM minimizes slow browser DOM recalculations.',
      'JSX is syntactic sugar for React.createElement().',
      'All JSX expressions must return a single root element or Fragment (<>...</>).'
    ],
    codeExample: `// A clean, expressive React Component using JSX & Tailwind
export function UserProfileCard({ name, role, isOnline = true }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
          {name.charAt(0)}
        </div>
        <span 
          className={\`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-slate-900 \${
            isOnline ? 'bg-emerald-500' : 'bg-slate-500'
          }\`} 
        />
      </div>
      <div>
        <h3 className="font-semibold text-white text-base leading-tight">{name}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{role}</p>
      </div>
    </div>
  );
}`,
    challenge: {
      instruction: 'Create a JSX User Badge that displays a dynamic username and a status indicator ("Online" with green badge, or "Away" with yellow badge) based on a boolean prop.',
      starterCode: `function StatusBadge({ username = "Alex", isOnline = true }) {
  // TODO: Return JSX with dynamic name and conditional status styling
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      {/* Add your elements here */}
    </div>
  );
}`,
      solution: `function StatusBadge({ username = "Alex", isOnline = true }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
      <span className="font-medium text-white">{username}</span>
      <span className={\`px-2.5 py-1 text-xs font-semibold rounded-full \${
        isOnline 
          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
      }\`}>
        {isOnline ? '● Online' : '○ Away'}
      </span>
    </div>
  );
}`,
      hint: 'Use a template literal or ternary operator in className to conditionally toggle between green and amber color palettes.'
    },
    quiz: [
      {
        question: 'Why do we use className instead of class in JSX?',
        options: [
          'Because React requires longer attribute names for performance',
          'Because class is a reserved keyword in JavaScript',
          'Because Tailwind CSS only listens to className',
          'There is no difference; both work identically'
        ],
        answer: 1,
        explanation: 'In JavaScript, `class` is a reserved keyword for ES6 classes. Since JSX compiles directly into JavaScript functions, React uses `className` to avoid syntax conflicts.'
      },
      {
        question: 'What is the purpose of React Fragments (<> ... </>) ?',
        options: [
          'To create a new <div> in the DOM automatically',
          'To speed up network requests in React',
          'To group multiple JSX elements together without adding extra nodes to the DOM tree',
          'To enable CSS grid properties'
        ],
        answer: 2,
        explanation: 'React Fragments let you group a list of children without adding extra parent nodes (like redundant divs) to the browser DOM.'
      },
      {
        question: 'What does the Virtual DOM do?',
        options: [
          'Directly rewrites the entire HTML document on every user click',
          'Keeps an in-memory representation of UI, diffs it with the previous state, and makes minimal batch updates to the real DOM',
          'Compresses images before rendering them',
          'Stores data in the browser localStorage'
        ],
        answer: 1,
        explanation: 'The Virtual DOM computes the minimal difference (diff) between UI snapshots and applies only necessary mutations to the real browser DOM for high rendering performance.'
      }
    ]
  },
  {
    id: '02-components-props',
    moduleNumber: 2,
    title: 'Components, Props & Composition',
    subtitle: 'Master the Lego-brick architecture of React: reusable components, prop drilling solutions, and children.',
    icon: 'Layers',
    tag: 'Architecture',
    readTime: '12 min',
    overview: `Components are self-contained, reusable blocks of UI. Props are inputs passed down from parent components to child components. Props are immutable (read-only); a component must never alter its own props directly. Combining smaller components using children and composition creates flexible, maintainable design systems.`,
    takeaways: [
      'Component names must always start with an Uppercase letter.',
      'Props flow downward (unidirectional data flow).',
      'The children prop enables flexible container layouts.',
      'Favor composition over inheritance.'
    ],
    codeExample: `// Reusable Button Component with customizable variants & sizes
export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick 
}) {
  const styles = {
    primary: 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    outline: 'border border-sky-500/50 text-sky-400 hover:bg-sky-500/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button 
      onClick={onClick}
      className={\`font-medium rounded-xl transition duration-150 active:scale-95 \${styles[variant]} \${sizes[size]}\`}
    >
      {children}
    </button>
  );
}`,
    challenge: {
      instruction: 'Build a reusable `NotificationCard` component that accepts `title`, `message`, `type` ("info" | "success" | "warning"), and optional `children`.',
      starterCode: `function NotificationCard({ title, message, type = 'info', children }) {
  // TODO: Style dynamically based on type (blue for info, green for success, amber for warning)
  return (
    <div>
      {/* Add notification content */}
    </div>
  );
}`,
      solution: `function NotificationCard({ title, message, type = 'info', children }) {
  const typeStyles = {
    info: 'border-sky-500/30 bg-sky-950/30 text-sky-400',
    success: 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400',
    warning: 'border-amber-500/30 bg-amber-950/30 text-amber-400'
  };

  return (
    <div className={\`p-4 rounded-xl border \${typeStyles[type] || typeStyles.info} shadow-lg\`}>
      <h4 className="font-bold text-white text-sm">{title}</h4>
      <p className="text-slate-300 text-xs mt-1">{message}</p>
      {children && <div className="mt-3 pt-3 border-t border-slate-800">{children}</div>}
    </div>
  );
}`,
      hint: 'Use a dictionary object mapping type strings to Tailwind border and background classes.'
    },
    quiz: [
      {
        question: 'What happens if a child component tries to mutate its props directly?',
        options: [
          'It triggers a parent re-render immediately',
          'It works smoothly without any issues',
          'Props are read-only and mutating them violates React pure function principles, causing bugs',
          'The props are automatically uploaded to the cloud'
        ],
        answer: 2,
        explanation: 'Props in React are strictly read-only. Modifying them breaks the predictable unidirectional data flow.'
      },
      {
        question: 'What is the `children` prop in React?',
        options: [
          'A list of child components loaded from an external API',
          'Whatever JSX content is nested between the opening and closing tags of a component',
          'A special function used only in class components',
          'An array of numbers'
        ],
        answer: 1,
        explanation: 'The `children` prop contains anything placed inside `<Component>...content...</Component>`, enabling container composition.'
      },
      {
        question: 'Why should component names start with an uppercase letter?',
        options: [
          'Because lowercase tags are treated by JSX as built-in HTML elements (like <div> or <p>)',
          'Because JavaScript classes require capital letters',
          'Because Tailwind CSS fails on lowercase components',
          'It is only a personal aesthetic preference'
        ],
        answer: 0,
        explanation: 'JSX treats lowercase tags as standard HTML DOM elements and capitalized tags as custom React components.'
      }
    ]
  },
  {
    id: '03-tailwind-mastery',
    moduleNumber: 3,
    title: 'Tailwind CSS Mastery for React',
    subtitle: 'Atomic utilities, flexbox, responsive grids, hover/focus state variants, and dark mode.',
    icon: 'Palette',
    tag: 'Styling',
    readTime: '15 min',
    overview: `Tailwind CSS provides atomic, low-level utility classes that eliminate the need to write custom CSS files. It offers a structured design system with consistent spacing (4px scale), curated color palettes, flexbox/grid shortcuts, and pseudo-class state variants.`,
    takeaways: [
      'Tailwind scale: 1 unit = 0.25rem = 4px (p-4 is 16px).',
      'Pseudo-classes use prefixes: hover:, focus:, active:, group-hover:.',
      'Responsive design is mobile-first: sm: (640px), md: (768px), lg: (1024px), xl: (1280px).',
      'Use clsx and twMerge (cn helper) to handle dynamic conditional classes cleanly.'
    ],
    codeExample: `// Modern Glassmorphism Feature Card with Group Hover & Responsive Grid
export function FeatureCard({ icon, title, description, badge }) {
  return (
    <div className="group relative p-6 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/50 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center transition-all duration-200">
          {icon}
        </div>
        {badge && (
          <span className="px-2.5 py-0.5 text-xs font-semibold bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-bold text-white text-lg group-hover:text-sky-400 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}`,
    challenge: {
      instruction: 'Create an interactive responsive card with Tailwind that stacks on mobile (`flex-col`) and aligns side-by-side on desktop (`md:flex-row`), featuring a hover glow effect.',
      starterCode: `function ResponsiveCard() {
  // TODO: Add responsive flex classes and hover micro-animations
  return (
    <div className="p-4 bg-slate-900">
      <div>Avatar/Icon</div>
      <div>
        <h3>Responsive Title</h3>
        <p>This layout should adjust smoothly across screen sizes.</p>
      </div>
    </div>
  );
}`,
      solution: `function ResponsiveCard() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-6 bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 rounded-2xl shadow-xl transition-all duration-200 hover:scale-[1.02]">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
        ⚡
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold text-white">Adaptive Design System</h3>
        <p className="text-sm text-slate-400 mt-1">
          Seamlessly adapts from single column on phones to multi-column desktop layouts.
        </p>
      </div>
    </div>
  );
}`,
      hint: 'Use `flex flex-col md:flex-row items-center gap-4` to achieve responsive alignment.'
    },
    quiz: [
      {
        question: 'What does `p-6` evaluate to in standard Tailwind spacing?',
        options: ['6 pixels', '1.5rem (24 pixels)', '60 pixels', '6% padding'],
        answer: 1,
        explanation: 'Tailwind spacing multiplier is 4px per unit. 6 * 4px = 24px (1.5rem).'
      },
      {
        question: 'How does Tailwind handle mobile-first responsiveness?',
        options: [
          'Unprefixed utilities apply to all screens; prefixed utilities (e.g. md:) apply from that breakpoint and up',
          'You must write separate CSS media queries manually',
          'Breakpoints only apply to mobile screens and turn off on desktop',
          'Tailwind automatically detects user screen without classes'
        ],
        answer: 0,
        explanation: 'Tailwind is mobile-first: `w-full md:w-1/2` means 100% width on mobile, and 50% width starting from medium screens (768px+) and larger.'
      },
      {
        question: 'What is the purpose of the group and group-hover utility?',
        options: [
          'To combine multiple HTML elements into a canvas',
          'To style a child element when its parent element is hovered',
          'To merge JavaScript functions',
          'To bundle CSS files'
        ],
        answer: 1,
        explanation: 'Adding `group` to a parent and `group-hover:...` to a child allows changing the child appearance based on parent hover state.'
      }
    ]
  },
  {
    id: '04-state-events',
    moduleNumber: 4,
    title: 'State & Event Handling (`useState`)',
    subtitle: 'Manage dynamic user interactions, updater functions, and immutable state updates.',
    icon: 'Sliders',
    tag: 'Interactivity',
    readTime: '15 min',
    overview: `State allows React components to remember information between renders. When state changes, React automatically re-renders the component to update the UI. Crucially, state in React is immutable: you must never directly mutate objects or arrays in state; always create new copies using the spread operator or array methods like map/filter.`,
    takeaways: [
      'useState returns a pair: [currentValue, setterFunction].',
      'State updates are scheduled and asynchronous.',
      'Use functional state updates (setCount(prev => prev + 1)) when computing next state from previous state.',
      'Never mutate state directly (no array.push() or obj.prop = val).'
    ],
    codeExample: `import { useState } from 'react';

export function InteractiveCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs uppercase font-semibold text-slate-400">Counter Value</span>
        <span className="text-2xl font-mono font-bold text-sky-400">{count}</span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setCount(prev => prev - step)}
          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
        >
          -{step}
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-400 rounded-xl text-xs"
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(prev => prev + step)}
          className="flex-1 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition shadow-lg shadow-sky-500/20"
        >
          +{step}
        </button>
      </div>
    </div>
  );
}`,
    challenge: {
      instruction: 'Build a dynamic tag manager where users can type a tag in an input, hit Add (or Enter), and remove existing tags with a click.',
      starterCode: `function TagManager() {
  const [tags, setTags] = useState(['React', 'Tailwind']);
  const [inputVal, setInputVal] = useState('');

  // TODO: Add handleAddTag and handleRemoveTag functions immutably
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      {/* Input and Tag list */}
    </div>
  );
}`,
      solution: `function TagManager() {
  const [tags, setTags] = useState(['React', 'Tailwind', 'Vite']);
  const [inputVal, setInputVal] = useState('');

  const handleAddTag = (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || tags.includes(inputVal.trim())) return;
    setTags(prev => [...prev, inputVal.trim()]);
    setInputVal('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  };

  return (
    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 max-w-md">
      <form onSubmit={handleAddTag} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="New skill tag..."
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm rounded-xl transition"
        >
          Add
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span 
            key={tag} 
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-lg"
          >
            #{tag}
            <button 
              onClick={() => handleRemoveTag(tag)}
              className="text-slate-400 hover:text-rose-400 ml-1 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}`,
      hint: 'Use `setTags(prev => [...prev, newTag])` to add, and `setTags(prev => prev.filter(t => t !== tagToRemove))` to delete.'
    },
    quiz: [
      {
        question: 'Why is `setCount(count + 1)` called multiple times in a row inside the same event handler not incrementing multiple times?',
        options: [
          'Because React crashes when calling set functions twice',
          'Because React batches state updates, and `count` refers to the snapshot value of the current render',
          'Because numbers in JavaScript cannot be incremented twice',
          'Because useState is synchronous'
        ],
        answer: 1,
        explanation: 'In a single render pass, `count` is a fixed snapshot. Calling `setCount(prev => prev + 1)` with an updater function accesses the latest queued value.'
      },
      {
        question: 'How do you correctly delete an item with id: 3 from an array stored in state?',
        options: [
          'items.splice(3, 1); setItems(items);',
          'delete items[3];',
          'setItems(prev => prev.filter(item => item.id !== 3));',
          'items.pop();'
        ],
        answer: 2,
        explanation: '`filter()` creates a new array excluding the target item without mutating the original array.'
      },
      {
        question: 'What is derived state?',
        options: [
          'State that is downloaded from a remote server',
          'A value computed on-the-fly during render from existing state or props without needing its own useState',
          'State that only works in development mode',
          'State that never updates'
        ],
        answer: 1,
        explanation: 'Derived state is computed directly during rendering (e.g. `const total = items.length;`), eliminating sync bugs.'
      }
    ]
  },
  {
    id: '05-effects-lifecycle',
    moduleNumber: 5,
    title: 'Side Effects & Lifecycle (`useEffect`)',
    subtitle: 'Data fetching, browser subscriptions, cleanup functions, and avoiding infinite loops.',
    icon: 'Zap',
    tag: 'Lifecycle',
    readTime: '15 min',
    overview: `Side effects are operations that reach outside the React component (API calls, subscriptions, manual DOM manipulation, timers). \`useEffect\` schedules these effects to execute after the browser paint, keeping component rendering pure and fast.`,
    takeaways: [
      'useEffect runs after render by default.',
      'An empty dependency array [] runs the effect once on mount.',
      'Always return a cleanup function for intervals, WebSockets, or event listeners.',
      'Ensure all reactive variables used inside the effect are listed in the dependency array.'
    ],
    codeExample: `import { useState, useEffect } from 'react';

export function LiveDigitalClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // 1. Setup interval timer
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // 2. Clean up interval when component unmounts to prevent memory leaks!
    return () => clearInterval(intervalId);
  }, []); // Empty deps = run once on mount

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Local Time</p>
      <p className="text-3xl font-mono font-bold text-sky-400 tracking-wider">{time}</p>
    </div>
  );
}`,
    challenge: {
      instruction: 'Implement an effect that listens to window resize events and displays the current browser window width dynamically with proper cleanup.',
      starterCode: `function WindowTracker() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // TODO: Add useEffect with resize listener and cleanup
  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <p>Window width: {width}px</p>
    </div>
  );
}`,
      solution: `function WindowTracker() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
      <span className="text-xs uppercase font-bold text-slate-400">Viewport Width</span>
      <h3 className="text-2xl font-mono font-bold text-emerald-400 mt-1">{width} px</h3>
      <p className="text-xs text-slate-500 mt-2">Resize your browser window to test live updates</p>
    </div>
  );
}`,
      hint: 'Return a function from inside useEffect that calls `window.removeEventListener("resize", handleResize)`.'
    },
    quiz: [
      {
        question: 'When does the cleanup function returned inside useEffect execute?',
        options: [
          'Before the next effect runs and when the component unmounts',
          'Only when the browser tab is closed',
          'Immediately before the JSX is compiled',
          'Only when an error is thrown'
        ],
        answer: 0,
        explanation: 'React executes the returned cleanup function before running the effect on subsequent renders and when the component is unmounted.'
      },
      {
        question: 'What happens if you omit the dependency array in `useEffect(fn)`?',
        options: [
          'The effect never runs',
          'The effect runs on every single render cycle',
          'The effect runs only once',
          'It throws a syntax error'
        ],
        answer: 1,
        explanation: 'Without a dependency array, useEffect executes after every single render of the component, which can lead to performance degradation or infinite loops if it sets state.'
      },
      {
        question: 'Why should you list all variables used inside useEffect in the dependency array?',
        options: [
          'To prevent stale closures from reading outdated values',
          'Because Tailwind CSS requires them',
          'To increase download speeds',
          'It is completely optional and makes no difference'
        ],
        answer: 0,
        explanation: 'Listing reactive variables in the dependency array ensures the effect re-synchronizes whenever any referenced state or prop changes, avoiding stale closure bugs.'
      }
    ]
  },
  {
    id: '06-essential-hooks',
    moduleNumber: 6,
    title: 'Essential Hooks: `useRef`, `useMemo`, `useCallback`',
    subtitle: 'DOM manipulation without re-rendering, memoized computations, and custom reusable hooks.',
    icon: 'Cpu',
    tag: 'Advanced',
    readTime: '16 min',
    overview: `While useState and useEffect power 80% of React apps, mastery of useRef (DOM access & mutable non-rendering values), useMemo (caching heavy calculations), and useCallback (stable function instances) gives you the superpower to build highly performant, production-ready apps.`,
    takeaways: [
      'useRef stores values that persist across renders without triggering a re-render.',
      'useMemo caches calculated results between renders until dependencies change.',
      'useCallback caches function definitions passed to memoized children.',
      'Custom hooks allow you to package and reuse stateful logic seamlessly.'
    ],
    codeExample: `import { useState, useRef, useMemo } from 'react';

export function QuickSearchDemo() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const allItems = ['React 18', 'Tailwind CSS', 'Vite', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Zustand'];

  // Cache filtered results
  const filtered = useMemo(() => {
    return allItems.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md">
      <div className="flex gap-2 mb-3">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter tech stack..."
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
        />
        <button 
          onClick={handleFocus}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-xl text-xs font-semibold"
        >
          Focus
        </button>
      </div>
      <p className="text-xs text-slate-400 mb-2">Matched: {filtered.length} items</p>
      <div className="flex flex-wrap gap-1.5">
        {filtered.map(item => (
          <span key={item} className="px-2.5 py-1 bg-sky-500/10 text-sky-300 text-xs rounded-lg border border-sky-500/20">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}`,
    challenge: {
      instruction: 'Build a custom hook `useToggle(initialState)` that returns `[value, toggleFunction]` and use it in a card component.',
      starterCode: `// TODO: Implement custom hook useToggle
function useToggle(initialVal = false) {
  // Return state and toggle handler
}

function ToggleCard() {
  const [isOn, toggle] = useToggle(false);
  return (
    <div className="p-4 bg-slate-900">
      <button onClick={toggle}>Current: {isOn ? 'ON' : 'OFF'}</button>
    </div>
  );
}`,
      solution: `function useToggle(initialVal = false) {
  const [state, setState] = useState(initialVal);
  const toggle = () => setState(prev => !prev);
  return [state, toggle];
}

function ToggleCard() {
  const [isOn, toggle] = useToggle(false);
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center max-w-xs">
      <h4 className="text-white font-bold mb-3">Custom Hook Demo</h4>
      <button 
        onClick={toggle}
        className={\`px-6 py-2.5 rounded-xl font-bold transition shadow-lg \${
          isOn 
            ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }\`}
      >
        Status: {isOn ? '⚡ ACTIVE' : '💤 INACTIVE'}
      </button>
    </div>
  );
}`,
      hint: 'Custom hooks start with `use` and can call standard React hooks like `useState`.'
    },
    quiz: [
      {
        question: 'What is the main difference between useState and useRef?',
        options: [
          'useRef can only store strings',
          'Updating a useRef value via ref.current = newValue does NOT trigger a component re-render',
          'useState is only used for forms',
          'useRef is deprecated in React 18'
        ],
        answer: 1,
        explanation: '`useRef` is a mutable container whose value persists across renders without causing re-renders when updated.'
      },
      {
        question: 'When should you use `useMemo`?',
        options: [
          'On every single variable in your component',
          'When caching expensive computations that should only re-calculate when specific dependencies change',
          'To replace useState completely',
          'To connect to a Redux store'
        ],
        answer: 1,
        explanation: '`useMemo` should be used for CPU-intensive calculations or to maintain referential equality of complex objects between renders.'
      },
      {
        question: 'What is a custom hook in React?',
        options: [
          'A special browser extension',
          'A JavaScript function starting with "use" that can invoke other React hooks to share reusable logic',
          'A CSS file that compiles into Tailwind',
          'A third-party server API'
        ],
        answer: 1,
        explanation: 'Custom hooks are functions named with `use...` that compose built-in hooks to isolate and share stateful logic across components.'
      }
    ]
  },
  {
    id: '07-forms-validation',
    moduleNumber: 7,
    title: 'Forms, Controlled Inputs & Validation',
    subtitle: 'Controlled components, form validation patterns, multi-field state, and accessible UX.',
    icon: 'CheckSquare',
    tag: 'Forms',
    readTime: '14 min',
    overview: `Forms are the bridge between users and your application. In React, **controlled components** make React state the single source of truth for all form elements (inputs, textareas, selects, checkboxes), providing real-time validation, disabled submit states, and instant user feedback.`,
    takeaways: [
      'In controlled inputs, value and onChange work together in unison.',
      'Use e.preventDefault() in onSubmit to prevent traditional page reloads.',
      'Manage multi-field forms using a single state object with dynamic keys [name]: value.',
      'Provide clear, accessible error messages and focus outlines.'
    ],
    codeExample: `import { useState } from 'react';

export function RegistrationForm() {
  const [values, setValues] = useState({ name: '', email: '', plan: 'pro' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
        <input
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="e.g. Satoshi Nakamoto"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="satoshi@bitcoin.org"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition"
      >
        {submitted ? '✓ Registered!' : 'Join Dojo'}
      </button>
    </form>
  );
}`,
    challenge: {
      instruction: 'Create a password strength validator form that checks if the password is at least 8 characters long and contains a number, displaying real-time feedback.',
      starterCode: `function PasswordChecker() {
  const [password, setPassword] = useState('');
  // TODO: Compute hasMinLength and hasNumber, and display visual indicators
  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </div>
  );
}`,
      solution: `function PasswordChecker() {
  const [password, setPassword] = useState('');
  
  const hasMinLength = password.length >= 8;
  const hasNumber = /\\d/.test(password);
  const isStrong = hasMinLength && hasNumber;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-sm space-y-3">
      <label className="block text-xs font-bold text-slate-300">Set Security Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password..."
        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <div className="space-y-1.5 text-xs">
        <p className={hasMinLength ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
          {hasMinLength ? '✓' : '○'} At least 8 characters
        </p>
        <p className={hasNumber ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
          {hasNumber ? '✓' : '○'} Contains at least one number
        </p>
      </div>
    </div>
  );
}`,
      hint: 'Use `password.length >= 8` and `/\\d/.test(password)` as derived boolean checks.'
    },
    quiz: [
      {
        question: 'What is a controlled input in React?',
        options: [
          'An input whose value is driven by React state and updated via an onChange handler',
          'An input that cannot be edited by the user',
          'An input generated by a backend database',
          'An input created with pure CSS'
        ],
        answer: 0,
        explanation: 'A controlled component receives its current value from state and updates that state on user keystrokes via onChange.'
      },
      {
        question: 'Why is `e.preventDefault()` called in form submit handlers?',
        options: [
          'To clear all inputs automatically',
          'To prevent the default browser behavior of refreshing the page and sending an HTTP POST',
          'To encrypt the passwords',
          'To validate email addresses'
        ],
        answer: 1,
        explanation: 'In Single Page Applications, calling `e.preventDefault()` prevents standard HTML page reload so React can handle data submission asynchronously via JavaScript.'
      },
      {
        question: 'How do you handle multiple input fields with a single handler function?',
        options: [
          'Create 10 separate functions for each field',
          'Give each input a `name` attribute and update state using `[e.target.name]: e.target.value`',
          'Use document.querySelectorAll in React',
          'It is not possible in React'
        ],
        answer: 1,
        explanation: 'Using computed property names `[e.target.name]: e.target.value` allows one handler function to dynamically update any matching key in the state object.'
      }
    ]
  },
  {
    id: '08-context-state',
    moduleNumber: 8,
    title: 'Context API & Global State',
    subtitle: 'Solve prop-drilling, create custom providers, and manage global themes and user auth.',
    icon: 'Globe',
    tag: 'State Mgmt',
    readTime: '15 min',
    overview: `When data needs to be accessible by many components across different nesting levels (like user auth, theme, language, or shopping cart), passing props manually through every intermediary component is known as **prop drilling**. The React Context API allows you to broadcast state down the entire component tree effortlessly.`,
    takeaways: [
      'createContext() initializes a context container.',
      'Provider component broadcasts values to all nested descendants.',
      'useContext() hook consumes values from the nearest matching provider.',
      'Combine Context with useReducer for clean scalable global state.'
    ],
    codeExample: `import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Consumer Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}`,
    challenge: {
      instruction: 'Create a simple UserContext provider that stores `{ user: { name, xp }, addXp }` and create a button component that increments XP by 50.',
      starterCode: `const UserContext = createContext();

function UserProvider({ children }) {
  // TODO: Setup state and addXp function
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}`,
      solution: `const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alex', xp: 100 });
  const addXp = (amount = 50) => setUser(u => ({ ...u, xp: u.xp + amount }));

  return (
    <UserContext.Provider value={{ user, addXp }}>
      {children}
    </UserContext.Provider>
  );
}

function UserCard() {
  const { user, addXp } = useContext(UserContext);
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
      <h4 className="text-white font-bold">{user.name}</h4>
      <p className="text-sky-400 font-mono text-xl my-2 font-bold">{user.xp} XP</p>
      <button 
        onClick={() => addXp(50)}
        className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs"
      >
        +50 XP
      </button>
    </div>
  );
}`,
      hint: 'Define `user` state and an `addXp` helper in the provider, and wrap child elements.'
    },
    quiz: [
      {
        question: 'What is "Prop Drilling"?',
        options: [
          'A technique to speed up React rendering',
          'Passing props through multiple intermediate components that do not need them just to reach a deeply nested child',
          'Extracting React props into a SQL database',
          'Drilling holes into your computer screen'
        ],
        answer: 1,
        explanation: 'Prop drilling occurs when data has to be passed down through numerous UI levels that do not consume the data themselves.'
      },
      {
        question: 'What hook is used to consume a React Context?',
        options: ['useReducer', 'useContext', 'useEffect', 'useContextState'],
        answer: 1,
        explanation: '`useContext(MyContext)` reads and subscribes to the nearest matching Provider value above it in the tree.'
      },
      {
        question: 'When should you NOT use Context for state?',
        options: [
          'When state updates extremely rapidly (e.g. 60fps cursor coordinates) which could cause widespread unnecessary re-renders',
          'For user authentication',
          'For dark/light theme switching',
          'For multi-language localization'
        ],
        answer: 0,
        explanation: 'Context is great for low-frequency global updates (theme, user, locale). High-frequency state changes (like animations or mouse positions) can trigger re-renders across all consumers.'
      }
    ]
  },
  {
    id: '09-routing-navigation',
    moduleNumber: 9,
    title: 'Client Routing & Navigation',
    subtitle: 'Single Page App (SPA) architecture, dynamic URL parameters, layout routes, and navigation.',
    icon: 'Compass',
    tag: 'Routing',
    readTime: '14 min',
    overview: `In traditional websites, clicking a link causes the browser to fetch a brand new HTML page from the server. In React Single Page Applications, client-side routing intercepts URL changes and dynamically swops the active view component without any full-page reload, delivering an ultra-fast desktop-app feel.`,
    takeaways: [
      'SPAs prevent page reloads for seamless transitions.',
      'Routes map URL path patterns to React components.',
      'useParams() retrieves dynamic parameters (e.g. /lesson/:id).',
      'NavLink provides automatic active styling based on current route.'
    ],
    codeExample: `import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';

export function NavigationDemo() {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
      <nav className="flex gap-2 p-1.5 bg-slate-950 rounded-xl mb-4 max-w-sm">
        <button className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 text-white shadow">
          Dashboard
        </button>
        <button className="flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-white">
          Lessons
        </button>
        <button className="flex-1 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:text-white">
          Projects
        </button>
      </nav>
      <div className="p-4 bg-slate-800/50 rounded-xl text-slate-300 text-sm">
        Active Route Content View
      </div>
    </div>
  );
}`,
    challenge: {
      instruction: 'Build a tab-based navigation bar using dynamic active state styling with Tailwind CSS.',
      starterCode: `function TabNavigator() {
  const [activeTab, setActiveTab] = useState('overview');
  // TODO: Render 3 tabs (overview, lessons, settings) with active styling
  return <div>Tabs</div>;
}`,
      solution: `function TabNavigator() {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'lessons', label: '📚 Lessons' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md">
      <div className="flex p-1 bg-slate-950 rounded-xl gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={\`flex-1 py-2 text-xs font-semibold rounded-lg transition \${
              activeTab === tab.id
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }\`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 bg-slate-800/40 rounded-xl text-slate-300 text-sm">
        Viewing tab: <span className="text-sky-400 font-bold uppercase">{activeTab}</span>
      </div>
    </div>
  );
}`,
      hint: 'Map through the tab array and check if `activeTab === tab.id`.'
    },
    quiz: [
      {
        question: 'What is the primary benefit of Client-Side Routing in React?',
        options: [
          'It re-downloads the entire HTML/CSS on every page change',
          'Instantaneous navigation without full-page reloads, preserving client state and speeding up UX',
          'It eliminates the need for JavaScript',
          'It connects directly to hardware devices'
        ],
        answer: 1,
        explanation: 'Client-side routing updates the URL and replaces view components in-place without initiating a full round-trip page refresh to the server.'
      },
      {
        question: 'How do you access route parameters like `id` from `/courses/:id`?',
        options: [
          'window.location.search',
          'useParams() hook',
          'useQuery() hook',
          'document.getElementById("id")'
        ],
        answer: 1,
        explanation: 'The `useParams()` hook from React Router parses URL dynamic segments matching the defined path pattern into a key-value object.'
      },
      {
        question: 'What component from React Router should be used for clickable links instead of standard HTML `<a href="...">`?',
        options: ['<Link to="...">', '<Anchor>', '<Url>', '<GoTo>'],
        answer: 0,
        explanation: '`<Link to="...">` prevents standard browser page refreshes and handles client-side navigation gracefully.'
      }
    ]
  },
  {
    id: '10-production-projects',
    moduleNumber: 10,
    title: 'Production Architecture & Capstone Projects',
    subtitle: 'Code splitting, performance optimization, custom design systems, and real-world project blueprints.',
    icon: 'Rocket',
    tag: 'Production',
    readTime: '18 min',
    overview: `Take your React and Tailwind skills into production. Learn how professional engineers architect feature folders, optimize bundle sizes using dynamic imports and Suspense, manage data persistence with localStorage, and implement accessible, bulletproof components.`,
    takeaways: [
      'Organize code with feature folders (features/todos, features/auth, components/ui).',
      'Always supply stable keys for lists (never random IDs generated inside JSX).',
      'Lazy load large components with React.lazy and Suspense.',
      'Test your applications interactively using hands-on challenges and live projects!'
    ],
    codeExample: `import React, { Suspense, lazy } from 'react';

// Lazy load feature components on demand
const HeavyAnalyticsChart = lazy(() => import('./HeavyAnalyticsChart'));

export function Dashboard() {
  return (
    <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
      <h2 className="text-xl font-bold text-white mb-4">Production Dashboard</h2>
      <Suspense fallback={
        <div className="p-12 text-center text-sky-400 animate-pulse">
          Loading Analytics Bundle...
        </div>
      }>
        <HeavyAnalyticsChart />
      </Suspense>
    </div>
  );
}`,
    challenge: {
      instruction: 'Build a production-grade Feature Flag Card with toggle state, persistence to localStorage, and animated badge indicator.',
      starterCode: `function FeatureFlagCard({ flagName = "beta_dark_mode" }) {
  // TODO: Read/Write boolean to localStorage
  return <div>Feature Flag</div>;
}`,
      solution: `function FeatureFlagCard({ flagName = "beta_ai_assistant" }) {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(\`flag_\${flagName}\`) === 'true';
    } catch {
      return false;
    }
  });

  const toggleFlag = () => {
    const nextVal = !enabled;
    setEnabled(nextVal);
    try {
      localStorage.setItem(\`flag_\${flagName}\`, String(nextVal));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between max-w-md">
      <div>
        <h4 className="font-bold text-white text-sm font-mono">{flagName}</h4>
        <p className="text-xs text-slate-400 mt-0.5">Persistent across browser restarts</p>
      </div>
      <button
        onClick={toggleFlag}
        className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${
          enabled ? 'bg-sky-500' : 'bg-slate-700'
        }\`}
      >
        <span
          className={\`inline-block h-4 w-4 transform rounded-full bg-white transition-transform \${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }\`}
        />
      </button>
    </div>
  );
}`,
      hint: 'Use lazy state initialization `useState(() => localStorage.getItem(...))` and sync changes in an updater.'
    },
    quiz: [
      {
        question: 'Why should you NOT use array indices (index) as React keys for lists that can be filtered or sorted?',
        options: [
          'Because React will throw a compile error',
          'Because index keys cause state mismatch bugs where child components retain previous state of wrong items',
          'Because Tailwind CSS cannot read numerical keys',
          'There is no reason; indices are always best'
        ],
        answer: 1,
        explanation: 'When a list is re-ordered or filtered, index keys stay 0, 1, 2... causing React to improperly reuse DOM nodes and component state across mismatched items.'
      },
      {
        question: 'What is `React.Suspense` used for?',
        options: [
          'To pause JavaScript execution for 5 seconds',
          'To display a fallback UI (like a skeleton loader) while child components or lazy chunks are loading',
          'To handle HTTP 404 errors',
          'To animate CSS gradients'
        ],
        answer: 1,
        explanation: '`React.Suspense` lets you specify a fallback loading indicator while waiting for asynchronously loaded code chunks or data.'
      },
      {
        question: 'What is the benefit of feature-based folder structure (e.g. `features/auth/`, `features/feed/`)?',
        options: [
          'High cohesion and easy maintainability: all components, hooks, and helpers for a single domain live together',
          'It makes the code execute faster on mobile devices',
          'It prevents TypeScript from checking types',
          'It is required by Vite'
        ],
        answer: 0,
        explanation: 'Feature-based architectures group related UI, logic, and tests into self-contained slices, making large codebases significantly easier to scale.'
      }
    ]
  }
];

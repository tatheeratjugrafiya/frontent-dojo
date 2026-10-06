# 🧭 React Hooks Decision Matrix

## Which Hook Should I Use?

```
Do you need to store data?
 ├─ Yes, and when it changes, the UI should re-render?
 │   ├─ Simple value or independent fields? ➔ useState
 │   └─ Complex state transitions / multiple sub-values? ➔ useReducer
 └─ Yes, but changing it should NOT trigger a re-render (e.g. DOM node, timer ID)?
     └─ ➔ useRef

Do you need to perform a side effect?
 ├─ Fetching API, subscribing, timers, manual DOM updates?
 │   └─ ➔ useEffect
 └─ Synchronous DOM measurements before paint?
     └─ ➔ useLayoutEffect

Do you need to optimize performance?
 ├─ Caching the result of an expensive calculation? ➔ useMemo
 └─ Caching a function definition passed to memoized children? ➔ useCallback

Do you need to share data deeply across components?
 └─ Avoid prop drilling ➔ createContext + useContext
```

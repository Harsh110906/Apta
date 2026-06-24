import type { QuizQuestion } from "@/types";

/**
 * Question Bank — ~30 questions
 * Distribution per difficulty: 2 theory + 4 code-write + 4 debug-fix
 * Difficulties: easy (Bronze–Silver), medium (Gold–Platinum), hard (Diamond–Legend)
 */

export const ALL_QUESTIONS: QuizQuestion[] = [

  // ═══════════════════════════════════════════
  //  EASY (Bronze / Silver / Unranked)
  // ═══════════════════════════════════════════

  // ── Easy Theory ──
  {
    type: "theory",
    id: "t-e1",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "What is the correct way to conditionally render a component in React?",
    options: [
      "if (condition) { <Component /> }",
      "{condition && <Component />}",
      "<Component if={condition} />",
      "render(<Component />, condition)"
    ],
    correctAnswer: 1,
    explanation: "In JSX, you use the logical AND operator (&&) for conditional rendering: {condition && <Component />}. The if-statement syntax doesn't work directly inside JSX."
  },
  {
    type: "theory",
    id: "t-e2",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "Which array method returns a NEW array with elements that pass a test function?",
    options: ["forEach()", "filter()", "find()", "some()"],
    correctAnswer: 1,
    explanation: "filter() creates a new array with all elements that pass the provided test function. forEach() doesn't return anything, find() returns a single element, and some() returns a boolean."
  },

  // ── Easy Code-Write ──
  {
    type: "code-write",
    id: "cw-e1",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "Write a function `reverseString(str)` that returns the string reversed.\n\nExample: reverseString('hello') → 'olleh'",
    starterCode: "function reverseString(str) {\n  // Your code here\n}",
    solutionCode: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "reverseString('hello')", expectedOutput: "'olleh'", isVisible: true },
      { id: "t2", input: "reverseString('abc')", expectedOutput: "'cba'", isVisible: true },
      { id: "t3", input: "reverseString('')", expectedOutput: "''", isVisible: false },
    ],
    hiddenTestCount: 2,
    explanation: "Split the string into an array of characters, reverse the array, then join back into a string."
  },
  {
    type: "code-write",
    id: "cw-e2",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "Write a function `isPalindrome(str)` that returns true if the string reads the same forwards and backwards (case-insensitive).\n\nExample: isPalindrome('Racecar') → true",
    starterCode: "function isPalindrome(str) {\n  // Your code here\n}",
    solutionCode: "function isPalindrome(str) {\n  const cleaned = str.toLowerCase();\n  return cleaned === cleaned.split('').reverse().join('');\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "isPalindrome('Racecar')", expectedOutput: "true", isVisible: true },
      { id: "t2", input: "isPalindrome('hello')", expectedOutput: "false", isVisible: true },
      { id: "t3", input: "isPalindrome('a')", expectedOutput: "true", isVisible: false },
    ],
    hiddenTestCount: 2,
    explanation: "Convert to lowercase for case-insensitive comparison, then check if the string equals its reverse."
  },
  {
    type: "code-write",
    id: "cw-e3",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "Write a function `countVowels(str)` that returns the number of vowels (a, e, i, o, u) in the string.\n\nExample: countVowels('hello world') → 3",
    starterCode: "function countVowels(str) {\n  // Your code here\n}",
    solutionCode: "function countVowels(str) {\n  const matches = str.toLowerCase().match(/[aeiou]/g);\n  return matches ? matches.length : 0;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "countVowels('hello world')", expectedOutput: "3", isVisible: true },
      { id: "t2", input: "countVowels('xyz')", expectedOutput: "0", isVisible: true },
      { id: "t3", input: "countVowels('AEIOU')", expectedOutput: "5", isVisible: false },
    ],
    hiddenTestCount: 2,
    explanation: "Use a regex /[aeiou]/g to match all vowels (case-insensitive with toLowerCase), then count the matches."
  },
  {
    type: "code-write",
    id: "cw-e4",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "Write a function `findMax(arr)` that returns the largest number in an array without using Math.max.\n\nExample: findMax([3, 1, 4, 1, 5]) → 5",
    starterCode: "function findMax(arr) {\n  // Your code here\n}",
    solutionCode: "function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n  }\n  return max;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "findMax([3, 1, 4, 1, 5])", expectedOutput: "5", isVisible: true },
      { id: "t2", input: "findMax([-1, -5, -2])", expectedOutput: "-1", isVisible: true },
      { id: "t3", input: "findMax([42])", expectedOutput: "42", isVisible: false },
    ],
    hiddenTestCount: 2,
    explanation: "Initialize max with the first element, then iterate through the array comparing each element."
  },

  // ── Easy Debug-Fix ──
  {
    type: "debug-fix",
    id: "df-e1",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "This function should return the sum of all numbers in the array, but it always returns 0. Find and fix the bug.",
    buggyCode: "function sumArray(numbers) {\n  let total = 0;\n  for (let i = 0; i <= numbers.length; i++) {\n    total += numbers[i];\n  }\n  return total;\n}",
    bugLine: 3,
    bugHint: "Check the loop boundary condition",
    solutionCode: "function sumArray(numbers) {\n  let total = 0;\n  for (let i = 0; i < numbers.length; i++) {\n    total += numbers[i];\n  }\n  return total;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "sumArray([1, 2, 3, 4])", expectedOutput: "10", isVisible: true },
      { id: "t2", input: "sumArray([10])", expectedOutput: "10", isVisible: true },
      { id: "t3", input: "sumArray([])", expectedOutput: "0", isVisible: false },
    ],
    hiddenTestCount: 2,
    explanation: "The bug is `<=` in the loop condition — it should be `<`. Using `<=` causes the loop to access `numbers[numbers.length]` which is `undefined`, and adding undefined to a number gives NaN."
  },
  {
    type: "debug-fix",
    id: "df-e2",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "This React component should toggle between 'ON' and 'OFF' when clicked, but the state never changes. Find and fix the bug.",
    buggyCode: "function Toggle() {\n  let isOn = false;\n\n  function handleClick() {\n    isOn = !isOn;\n  }\n\n  return (\n    <button onClick={handleClick}>\n      {isOn ? 'ON' : 'OFF'}\n    </button>\n  );\n}",
    bugLine: 2,
    bugHint: "React needs to know when state changes to re-render",
    solutionCode: "function Toggle() {\n  const [isOn, setIsOn] = useState(false);\n\n  function handleClick() {\n    setIsOn(!isOn);\n  }\n\n  return (\n    <button onClick={handleClick}>\n      {isOn ? 'ON' : 'OFF'}\n    </button>\n  );\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "Click button once", expectedOutput: "Displays 'ON'", isVisible: true },
      { id: "t2", input: "Click button twice", expectedOutput: "Displays 'OFF'", isVisible: true },
    ],
    hiddenTestCount: 1,
    explanation: "Regular variables don't trigger re-renders in React. You need useState() to create reactive state that causes the component to re-render when updated."
  },
  {
    type: "debug-fix",
    id: "df-e3",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "This function should capitalize the first letter of each word, but it throws an error. Find and fix the bug.",
    buggyCode: "function capitalizeWords(str) {\n  return str.split(' ').map(word => {\n    return word[0].toUpperCase() + word.slice(1);\n  }).join(' ');\n}",
    bugLine: 3,
    bugHint: "What happens when there's an empty string after splitting?",
    solutionCode: "function capitalizeWords(str) {\n  return str.split(' ').map(word => {\n    if (!word) return word;\n    return word[0].toUpperCase() + word.slice(1);\n  }).join(' ');\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "capitalizeWords('hello world')", expectedOutput: "'Hello World'", isVisible: true },
      { id: "t2", input: "capitalizeWords('hello  world')", expectedOutput: "'Hello  World'", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "When splitting 'hello  world' (double space), you get ['hello', '', 'world']. Accessing [0] on an empty string returns undefined, and calling .toUpperCase() on undefined throws. Add a guard check."
  },
  {
    type: "debug-fix",
    id: "df-e4",
    difficulty: "easy",
    domain: "Frontend Engineering",
    question: "This function should remove duplicate values from an array, but it returns the wrong result. Find and fix the bug.",
    buggyCode: "function removeDuplicates(arr) {\n  const unique = [];\n  for (const item of arr) {\n    if (unique.indexOf(item) === 0) {\n      unique.push(item);\n    }\n  }\n  return unique;\n}",
    bugLine: 4,
    bugHint: "When is indexOf equal to 0 vs -1?",
    solutionCode: "function removeDuplicates(arr) {\n  const unique = [];\n  for (const item of arr) {\n    if (unique.indexOf(item) === -1) {\n      unique.push(item);\n    }\n  }\n  return unique;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "removeDuplicates([1, 2, 2, 3, 3, 3])", expectedOutput: "[1, 2, 3]", isVisible: true },
      { id: "t2", input: "removeDuplicates([1, 1, 1])", expectedOutput: "[1]", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "indexOf returns -1 when element is not found, but the code checks for === 0. This only matches items at index 0 of the unique array. Change to === -1."
  },


  // ═══════════════════════════════════════════
  //  MEDIUM (Gold / Platinum)
  // ═══════════════════════════════════════════

  // ── Medium Theory ──
  {
    type: "theory",
    id: "t-m1",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "What is the output of:\n\nconsole.log(typeof null);",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correctAnswer: 2,
    explanation: "typeof null returns 'object' — this is a well-known JavaScript bug from the first implementation that was never fixed for backwards compatibility."
  },
  {
    type: "theory",
    id: "t-m2",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "In React, when does useEffect with an empty dependency array [] run?",
    options: [
      "Before every render",
      "After every render",
      "Only once after the initial render",
      "Only when state changes"
    ],
    correctAnswer: 2,
    explanation: "useEffect with [] runs only once after the initial render (mount). It's the functional equivalent of componentDidMount in class components."
  },

  // ── Medium Code-Write ──
  {
    type: "code-write",
    id: "cw-m1",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "Write a function `debounce(fn, delay)` that returns a new function which delays invoking `fn` until `delay` ms have passed since the last call.\n\nIf called again before the delay expires, the timer resets.",
    starterCode: "function debounce(fn, delay) {\n  // Your code here\n}",
    solutionCode: "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "const d = debounce(fn, 100); d(); d(); d();", expectedOutput: "fn called once after 100ms", isVisible: true },
      { id: "t2", input: "debounce(fn, 0)()", expectedOutput: "fn called after next tick", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "Store a timer reference. On each call, clear the previous timer and set a new one. Use apply/call to preserve context and arguments."
  },
  {
    type: "code-write",
    id: "cw-m2",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "Write a function `flattenArray(arr)` that takes a nested array and returns a flat array with all values.\n\nExample: flattenArray([1, [2, [3, 4]], 5]) → [1, 2, 3, 4, 5]",
    starterCode: "function flattenArray(arr) {\n  // Your code here\n}",
    solutionCode: "function flattenArray(arr) {\n  const result = [];\n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...flattenArray(item));\n    } else {\n      result.push(item);\n    }\n  }\n  return result;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "flattenArray([1, [2, [3, 4]], 5])", expectedOutput: "[1, 2, 3, 4, 5]", isVisible: true },
      { id: "t2", input: "flattenArray([[1, 2], [3]])", expectedOutput: "[1, 2, 3]", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "Use recursion: iterate through the array, if an item is an array, recursively flatten it and spread the results. Otherwise push the item directly."
  },
  {
    type: "code-write",
    id: "cw-m3",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "Write a function `groupBy(arr, key)` that groups array objects by the given key.\n\nExample: groupBy([{type:'a',v:1},{type:'b',v:2},{type:'a',v:3}], 'type') → {a: [{...}, {...}], b: [{...}]}",
    starterCode: "function groupBy(arr, key) {\n  // Your code here\n}",
    solutionCode: "function groupBy(arr, key) {\n  return arr.reduce((groups, item) => {\n    const groupKey = item[key];\n    if (!groups[groupKey]) groups[groupKey] = [];\n    groups[groupKey].push(item);\n    return groups;\n  }, {});\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "groupBy([{type:'a',v:1},{type:'b',v:2},{type:'a',v:3}], 'type')", expectedOutput: "{a: [{type:'a',v:1},{type:'a',v:3}], b: [{type:'b',v:2}]}", isVisible: true },
      { id: "t2", input: "groupBy([], 'key')", expectedOutput: "{}", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "Use reduce to accumulate groups. For each item, get the value at the key, initialize the group array if needed, then push the item."
  },
  {
    type: "code-write",
    id: "cw-m4",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "Write a function `memoize(fn)` that caches the results of function calls. If called with the same arguments, return the cached result.\n\nExample: const add = memoize((a,b) => a+b); add(1,2) → 3 (computed); add(1,2) → 3 (cached)",
    starterCode: "function memoize(fn) {\n  // Your code here\n}",
    solutionCode: "function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "const m = memoize(x => x*2); m(5); m(5);", expectedOutput: "10 (second call from cache)", isVisible: true },
      { id: "t2", input: "memoize((a,b) => a+b)(1,2)", expectedOutput: "3", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "Use a Map/object to cache results keyed by serialized arguments (JSON.stringify). On each call, check the cache first before computing."
  },

  // ── Medium Debug-Fix ──
  {
    type: "debug-fix",
    id: "df-m1",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "This useEffect creates a memory leak — the interval keeps running even after the component unmounts. Find and fix the bug.",
    buggyCode: "function Timer() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    setInterval(() => {\n      setCount(c => c + 1);\n    }, 1000);\n  }, []);\n\n  return <div>{count}</div>;\n}",
    bugLine: 5,
    bugHint: "What happens to the interval when the component unmounts?",
    solutionCode: "function Timer() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setCount(c => c + 1);\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return <div>{count}</div>;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "Mount component for 3 seconds", expectedOutput: "count = 3, no memory leak", isVisible: true },
      { id: "t2", input: "Unmount component", expectedOutput: "Interval cleared, no errors", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "You must return a cleanup function from useEffect to clear the interval on unmount. Store the interval ID and call clearInterval in the cleanup."
  },
  {
    type: "debug-fix",
    id: "df-m2",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "This async function should fetch user data and handle errors, but the error is never caught. Find and fix the bug.",
    buggyCode: "async function fetchUser(id) {\n  try {\n    const response = fetch(`/api/users/${id}`);\n    const data = response.json();\n    return data;\n  } catch (error) {\n    console.error('Failed:', error);\n    return null;\n  }\n}",
    bugLine: 3,
    bugHint: "fetch() returns a Promise — what are you missing?",
    solutionCode: "async function fetchUser(id) {\n  try {\n    const response = await fetch(`/api/users/${id}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Failed:', error);\n    return null;\n  }\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "fetchUser(1) with valid API", expectedOutput: "Returns user object", isVisible: true },
      { id: "t2", input: "fetchUser(999) with network error", expectedOutput: "Returns null, logs error", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "fetch() and .json() return Promises. Without await, you're assigning Promise objects to variables, not the resolved values. The catch block never fires because there's no rejected promise being awaited."
  },
  {
    type: "debug-fix",
    id: "df-m3",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "This event handler should only fire once when the button is clicked rapidly, but it fires multiple times. Find and fix the bug.",
    buggyCode: "function SearchButton() {\n  const [loading, setLoading] = useState(false);\n\n  async function handleSearch() {\n    setLoading(true);\n    const results = await fetchResults();\n    setLoading(false);\n    setResults(results);\n  }\n\n  return (\n    <button onClick={handleSearch}>\n      {loading ? 'Searching...' : 'Search'}\n    </button>\n  );\n}",
    bugLine: 12,
    bugHint: "The button is still clickable while loading",
    solutionCode: "function SearchButton() {\n  const [loading, setLoading] = useState(false);\n\n  async function handleSearch() {\n    if (loading) return;\n    setLoading(true);\n    const results = await fetchResults();\n    setLoading(false);\n    setResults(results);\n  }\n\n  return (\n    <button onClick={handleSearch} disabled={loading}>\n      {loading ? 'Searching...' : 'Search'}\n    </button>\n  );\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "Click button 5 times rapidly", expectedOutput: "fetchResults called only once", isVisible: true },
      { id: "t2", input: "Button during loading", expectedOutput: "Button disabled, shows 'Searching...'", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "Add an early return guard `if (loading) return` at the top of handleSearch, and add `disabled={loading}` to the button element to prevent double-clicks."
  },
  {
    type: "debug-fix",
    id: "df-m4",
    difficulty: "medium",
    domain: "Frontend Engineering",
    question: "This closure should create separate counters, but all buttons show the same count. Find and fix the bug.",
    buggyCode: "function createCounters(n) {\n  const counters = [];\n  for (var i = 0; i < n; i++) {\n    counters.push({\n      id: i,\n      getCount: function() { return i; }\n    });\n  }\n  return counters;\n}",
    bugLine: 3,
    bugHint: "Think about how `var` scoping works vs `let`",
    solutionCode: "function createCounters(n) {\n  const counters = [];\n  for (let i = 0; i < n; i++) {\n    counters.push({\n      id: i,\n      getCount: function() { return i; }\n    });\n  }\n  return counters;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "createCounters(3)[0].getCount()", expectedOutput: "0", isVisible: true },
      { id: "t2", input: "createCounters(3)[2].getCount()", expectedOutput: "2", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "`var` is function-scoped, so all closures share the same `i` variable (which ends up as `n` after the loop). Changing to `let` makes `i` block-scoped, giving each iteration its own copy."
  },


  // ═══════════════════════════════════════════
  //  HARD (Diamond / Elite / Legend)
  // ═══════════════════════════════════════════

  // ── Hard Theory ──
  {
    type: "theory",
    id: "t-h1",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "What is the time complexity of JavaScript's Array.prototype.sort() in V8 (Chrome)?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "V8 uses TimSort (a hybrid of merge sort and insertion sort) which has O(n log n) average and worst-case time complexity."
  },
  {
    type: "theory",
    id: "t-h2",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "In the React Fiber reconciliation algorithm, what is the purpose of the 'work loop'?",
    options: [
      "To synchronously process all component updates",
      "To break rendering work into interruptible units that can be paused and resumed",
      "To manage the event loop for async operations",
      "To optimize virtual DOM diffing with Web Workers"
    ],
    correctAnswer: 1,
    explanation: "React Fiber's work loop processes rendering in interruptible chunks. This allows high-priority updates (like user input) to interrupt lower-priority work (like offscreen rendering), enabling concurrent features."
  },

  // ── Hard Code-Write ──
  {
    type: "code-write",
    id: "cw-h1",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "Write a function `deepClone(obj)` that creates a deep copy of an object, handling nested objects, arrays, dates, and null values.\n\nDo NOT use JSON.parse/JSON.stringify.",
    starterCode: "function deepClone(obj) {\n  // Your code here\n}",
    solutionCode: "function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (obj instanceof Date) return new Date(obj.getTime());\n  if (Array.isArray(obj)) return obj.map(item => deepClone(item));\n  const clone = {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key]);\n    }\n  }\n  return clone;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "deepClone({a: {b: 1}})", expectedOutput: "{a: {b: 1}} (different reference)", isVisible: true },
      { id: "t2", input: "deepClone([1, [2, 3]])", expectedOutput: "[1, [2, 3]] (different reference)", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "Handle primitives/null as base cases, Dates specially, arrays with map+recurse, and objects by iterating own properties recursively."
  },
  {
    type: "code-write",
    id: "cw-h2",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "Write a function `throttle(fn, interval)` that ensures `fn` is called at most once per `interval` ms. The first call should execute immediately.\n\nUnlike debounce, throttle guarantees regular execution during rapid calls.",
    starterCode: "function throttle(fn, interval) {\n  // Your code here\n}",
    solutionCode: "function throttle(fn, interval) {\n  let lastTime = 0;\n  let timer = null;\n  return function(...args) {\n    const now = Date.now();\n    const remaining = interval - (now - lastTime);\n    if (remaining <= 0) {\n      if (timer) { clearTimeout(timer); timer = null; }\n      lastTime = now;\n      fn.apply(this, args);\n    } else if (!timer) {\n      timer = setTimeout(() => {\n        lastTime = Date.now();\n        timer = null;\n        fn.apply(this, args);\n      }, remaining);\n    }\n  };\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "const t = throttle(fn, 100); t(); t(); t();", expectedOutput: "fn called immediately, then once more after 100ms", isVisible: true },
      { id: "t2", input: "throttle(fn, 0)()", expectedOutput: "fn called immediately", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "Track lastTime of execution. If enough time has passed, execute immediately. Otherwise, schedule a trailing call for the remaining time. Cancel any pending timer on immediate execution."
  },
  {
    type: "code-write",
    id: "cw-h3",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "Write a function `retry(fn, retries, delay)` that calls an async function `fn`, and if it rejects, retries up to `retries` times with `delay` ms between each attempt.\n\nReturns the resolved value or throws the last error.",
    starterCode: "async function retry(fn, retries, delay) {\n  // Your code here\n}",
    solutionCode: "async function retry(fn, retries, delay) {\n  for (let i = 0; i <= retries; i++) {\n    try {\n      return await fn();\n    } catch (err) {\n      if (i === retries) throw err;\n      await new Promise(r => setTimeout(r, delay));\n    }\n  }\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "retry(succeedOnThirdCall, 3, 100)", expectedOutput: "Resolves after 3rd attempt", isVisible: true },
      { id: "t2", input: "retry(alwaysFails, 2, 100)", expectedOutput: "Throws after 3 attempts", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "Loop retries+1 times. On each iteration, try calling fn(). If it succeeds, return. If it fails and we have retries left, wait `delay` ms, then try again. If out of retries, re-throw the error."
  },
  {
    type: "code-write",
    id: "cw-h4",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "Write a custom React hook `useDebounce(value, delay)` that returns the debounced value. The returned value should only update after the user stops changing it for `delay` ms.",
    starterCode: "function useDebounce(value, delay) {\n  // Your code here\n}",
    solutionCode: "function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debouncedValue;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "useDebounce('search', 300) — type rapidly", expectedOutput: "Returns old value until 300ms pause", isVisible: true },
      { id: "t2", input: "useDebounce(initialValue, 0)", expectedOutput: "Returns value immediately", isVisible: true },
    ],
    hiddenTestCount: 2,
    explanation: "Use useState to hold the debounced value. In useEffect, set a timeout to update it when `value` changes. Return a cleanup function to clear the timeout if value changes again before delay expires."
  },

  // ── Hard Debug-Fix ──
  {
    type: "debug-fix",
    id: "df-h1",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "This React component causes an infinite re-render loop. Find and fix the bug.",
    buggyCode: "function UserList({ users }) {\n  const [sorted, setSorted] = useState([]);\n  setSorted([...users].sort((a, b) =>\n    a.name.localeCompare(b.name)\n  ));\n  return (\n    <ul>\n      {sorted.map(u => <li key={u.id}>{u.name}</li>)}\n    </ul>\n  );\n}",
    bugLine: 3,
    bugHint: "State updates during render cause infinite loops",
    solutionCode: "function UserList({ users }) {\n  const sorted = useMemo(\n    () => [...users].sort((a, b) =>\n      a.name.localeCompare(b.name)\n    ),\n    [users]\n  );\n  return (\n    <ul>\n      {sorted.map(u => <li key={u.id}>{u.name}</li>)}\n    </ul>\n  );\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "Render with [{id:1, name:'Zara'}, {id:2, name:'Alex'}]", expectedOutput: "Renders: Alex, Zara (sorted, no loop)", isVisible: true },
      { id: "t2", input: "Render with empty array", expectedOutput: "Renders empty <ul>", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "setSorted is called directly in the component body, running on every render, which triggers a state update, which causes another render — infinite loop. Use useMemo to derive sorted data without triggering re-renders."
  },
  {
    type: "debug-fix",
    id: "df-h2",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "This Promise.all implementation doesn't reject properly when one promise fails. Find and fix the bug.",
    buggyCode: "function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let completed = 0;\n    promises.forEach((p, i) => {\n      p.then(value => {\n        results[i] = value;\n        completed++;\n        if (completed === promises.length) resolve(results);\n      });\n    });\n  });\n}",
    bugLine: 6,
    bugHint: "What happens when a promise rejects?",
    solutionCode: "function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let completed = 0;\n    promises.forEach((p, i) => {\n      p.then(value => {\n        results[i] = value;\n        completed++;\n        if (completed === promises.length) resolve(results);\n      }).catch(reject);\n    });\n  });\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "promiseAll([Promise.resolve(1), Promise.resolve(2)])", expectedOutput: "[1, 2]", isVisible: true },
      { id: "t2", input: "promiseAll([Promise.resolve(1), Promise.reject('error')])", expectedOutput: "Rejects with 'error'", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "The .then() chain has no .catch() handler, so rejected promises are silently swallowed. Add .catch(reject) to propagate rejections to the outer promise."
  },
  {
    type: "debug-fix",
    id: "df-h3",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "This custom hook leaks event listeners on every re-render. Find and fix the bug.",
    buggyCode: "function useWindowSize() {\n  const [size, setSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight\n  });\n\n  useEffect(() => {\n    function handleResize() {\n      setSize({\n        width: window.innerWidth,\n        height: window.innerHeight\n      });\n    }\n    window.addEventListener('resize', handleResize);\n  });\n\n  return size;\n}",
    bugLine: 7,
    bugHint: "useEffect without deps runs every render — and adds a new listener each time",
    solutionCode: "function useWindowSize() {\n  const [size, setSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight\n  });\n\n  useEffect(() => {\n    function handleResize() {\n      setSize({\n        width: window.innerWidth,\n        height: window.innerHeight\n      });\n    }\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n\n  return size;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "Resize window after mount", expectedOutput: "size updates, no listener leak", isVisible: true },
      { id: "t2", input: "Unmount component", expectedOutput: "Listener removed cleanly", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "Two bugs: (1) Missing dependency array [] means useEffect runs on every render, adding a new listener each time. (2) No cleanup function to remove the listener. Add [] and return a cleanup function."
  },
  {
    type: "debug-fix",
    id: "df-h4",
    difficulty: "hard",
    domain: "Frontend Engineering",
    question: "This recursive function should flatten a deeply nested object into dot-notation keys, but it loses nested values. Find and fix the bug.",
    buggyCode: "function flattenObject(obj, prefix = '') {\n  const result = {};\n  for (const key in obj) {\n    const newKey = prefix ? `${prefix}.${key}` : key;\n    if (typeof obj[key] === 'object') {\n      flattenObject(obj[key], newKey);\n    } else {\n      result[newKey] = obj[key];\n    }\n  }\n  return result;\n}",
    bugLine: 6,
    bugHint: "The recursive call returns a result — but what do you do with it?",
    solutionCode: "function flattenObject(obj, prefix = '') {\n  const result = {};\n  for (const key in obj) {\n    const newKey = prefix ? `${prefix}.${key}` : key;\n    if (typeof obj[key] === 'object' && obj[key] !== null) {\n      Object.assign(result, flattenObject(obj[key], newKey));\n    } else {\n      result[newKey] = obj[key];\n    }\n  }\n  return result;\n}",
    language: "javascript",
    testCases: [
      { id: "t1", input: "flattenObject({a: {b: 1, c: {d: 2}}})", expectedOutput: "{'a.b': 1, 'a.c.d': 2}", isVisible: true },
      { id: "t2", input: "flattenObject({x: 1})", expectedOutput: "{x: 1}", isVisible: true },
    ],
    hiddenTestCount: 3,
    explanation: "The recursive call's return value is discarded. You need Object.assign(result, flattenObject(...)) to merge the nested results into the parent result object. Also add a null check since typeof null === 'object'."
  },
];

// Legacy export for backwards compatibility
export const MOCK_QUESTIONS = ALL_QUESTIONS;

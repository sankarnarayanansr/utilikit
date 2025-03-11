# UtilikitJS Documentation

## 📦 Overview

**UtilikitJS** is a lightweight utility toolkit designed to simplify and accelerate JavaScript and TypeScript development. It offers a rich set of utility functions across different domains, including data manipulation, graph operations, HTTP requests, parallel execution, and more.

---

## 📜 Available Utilities

### ✅ Data Utilities (`datapkg`)

#### 1. **ArrayUtils**

**Functions:**
- `unique(array: any[])`: Removes duplicates from an array.
- `chunk(array: any[], size: number)`: Splits an array into chunks of a specified size.
- `flatten(array: any[])`: Flattens a nested array.

#### 2. **DateUtils**

**Functions:**
- `formatDate(date: Date, format: string)`: Formats a date based on the provided format.
- `addDays(date: Date, days: number)`: Adds days to a given date.
- `differenceInDays(date1: Date, date2: Date)`: Returns the difference between two dates.

#### 3. **NumberUtils**

**Functions:**
- `clamp(value: number, min: number, max: number)`: Clamps a number within a range.
- `random(min: number, max: number)`: Generates a random number between min and max.
- `roundTo(value: number, decimals: number)`: Rounds a number to a fixed number of decimals.

#### 4. **ObjectUtils**

**Functions:**
- `deepMerge(obj1: any, obj2: any)`: Deep merges two objects.
- `isEmpty(obj: any)`: Checks if an object is empty.
- `pick(obj: any, keys: string[])`: Picks specific keys from an object.

#### 5. **StringUtils**

**Functions:**
- `capitalize(str: string)`: Capitalizes the first letter of a string.
- `camelCase(str: string)`: Converts a string to camelCase.
- `slugify(str: string)`: Converts a string to a URL-friendly slug.

---

## 📊 Data Structure Utilities (`dspkg`)

#### 6. **GraphUtils**

**Functions:**
- `shortestPath(graph: any, start: string, end: string)`: Finds the shortest path in a graph.
- `topologicalSort(graph: any)`: Performs a topological sort on a graph.

#### 7. **TrieUtils**

**Functions:**
- `insert(word: string)`: Inserts a word into the trie.
- `search(word: string)`: Searches for a word in the trie.
- `startsWith(prefix: string)`: Checks if any word in the trie starts with the given prefix.

---

## 🌐 HTTP Utilities (`httppkg`)

#### 8. **HttpUtils**

**Functions:**
- `get(url: string, options?: RequestOptions)`: Makes a GET request with cache and retry support.
- `post(url: string, body: any, options?: RequestOptions)`: Makes a POST request with cache and retry support.
- `put(url: string, body: any, options?: RequestOptions)`: Makes a PUT request with cache and retry support.
- `delete(url: string, options?: RequestOptions)`: Makes a DELETE request with cache and retry support.
- `debounce(fn: Function, delay: number)`: Creates a debounced function.
- `throttle(fn: Function, delay: number)`: Creates a throttled function.

---

## 🧵 Parallel Execution Utilities (`parallelpkg`)

#### 9. **ParallelUtils**

**Functions:**
- `parallelize(tasks: Function[], limit: number)`: Executes tasks in parallel with a limit on concurrent tasks.
- `batchProcess(tasks: Function[], batchSize: number)`: Processes tasks in batches.

---

## 📜 Usage

### Installation

```shell
npm install utilikitjs
```

or

```shell
yarn add utilikitjs
```

### Example

```typescript
import { ArrayUtils, HttpUtils } from 'utilikitjs';

const uniqueArray = ArrayUtils.unique([1, 2, 2, 3, 4]);
console.log(uniqueArray); // [1, 2, 3, 4]

const data = await HttpUtils.get('https://api.example.com/data');
console.log(data);
```

### Tree-shaking

UtilikitJS supports tree-shaking. You can import only what you need:

```typescript
import { capitalize } from 'utilikitjs/src/datapkg/StringUtils';
console.log(capitalize('hello world'));
```

---

## 💡 Contributing

Contributions are welcome! Please fork the repo and make a PR.

**Repository:** [https://github.com/sankarnarayanansr/utilikit](https://github.com/sankarnarayanansr/utilikit)

## 📜 License

MIT License. See LICENSE file for details.
# Utility Packages Documentation

This document provides a comprehensive overview of the utility packages available in the codebase, including their functions, parameters, return values, and examples.

## Table of Contents

1. [Data Package](#data-package)
   - [ArrayUtils](#arrayutils)
   - [DateUtils](#dateutils)
   - [NumberUtils](#numberutils)
   - [ObjectUtils](#objectutils)
   - [StringUtils](#stringutils)
2. [Data Structures Package](#data-structures-package)
   - [GraphUtils](#graphutils)
   - [TrieUtils](#trieutils)
3. [HTTP Package](#http-package)
   - [HttpUtils](#httputils)
4. [Parallel Package](#parallel-package)
   - [ParallelUtils](#parallelutils)

## Data Package

### ArrayUtils

Collection of utility functions for array manipulation.

#### `removeDuplicates(array)`

Removes duplicates from an array.

**Parameters:**
- `array`: The array to remove duplicates from

**Returns:**
- A new array with unique elements

**Example:**
```typescript
const numbers = [1, 2, 2, 3, 3, 4];
const unique = ArrayUtils.removeDuplicates(numbers);
// Result: [1, 2, 3, 4]
```

#### `intersection(array1, array2)`

Finds the intersection of two arrays.

**Parameters:**
- `array1`: The first array
- `array2`: The second array

**Returns:**
- A new array containing elements present in both arrays

**Example:**
```typescript
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const common = ArrayUtils.intersection(arr1, arr2);
// Result: [3, 4]
```

#### `difference(array1, array2)`

Finds the difference between two arrays.

**Parameters:**
- `array1`: The array to check from
- `array2`: The array to check against

**Returns:**
- A new array containing elements present in array1 but not in array2

**Example:**
```typescript
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const diff = ArrayUtils.difference(arr1, arr2);
// Result: [1, 2]
```

#### `chunk(array, size)`

Chunks an array into smaller arrays of a specified size.

**Parameters:**
- `array`: The array to chunk
- `size`: The size of each chunk

**Returns:**
- An array of chunks

**Example:**
```typescript
const numbers = [1, 2, 3, 4, 5, 6, 7];
const chunks = ArrayUtils.chunk(numbers, 3);
// Result: [[1, 2, 3], [4, 5, 6], [7]]
```

#### `deleteElement(array, element, deleteAll?)`

Deletes an element from an array.

**Parameters:**
- `array`: The array to modify
- `element`: The element to delete
- `deleteAll`: Whether to delete all occurrences of the element (optional)

**Returns:**
- The modified array

**Example:**
```typescript
const numbers = [1, 2, 2, 3, 2, 4];
const result1 = ArrayUtils.deleteElement(numbers.slice(), 2);
// Result1: [1, 2, 3, 2, 4] (deletes first occurrence)

const result2 = ArrayUtils.deleteElement(numbers.slice(), 2, true);
// Result2: [1, 3, 4] (deletes all occurrences)
```

#### `shuffle(array)`

Shuffles an array using the Fisher-Yates algorithm.

**Parameters:**
- `array`: The array to shuffle

**Returns:**
- A new shuffled array

**Example:**
```typescript
const numbers = [1, 2, 3, 4, 5];
const shuffled = ArrayUtils.shuffle(numbers);
// Possible Result: [3, 1, 5, 2, 4]
```

#### `groupBy(array, key)`

Groups the elements of an array by a specified key.

**Parameters:**
- `array`: The array to group
- `key`: The key to group by

**Returns:**
- An object with the grouped elements

**Example:**
```typescript
const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];
const grouped = ArrayUtils.groupBy(people, 'age');
// Result: {
//   "25": [{ name: 'Jane', age: 25 }],
//   "30": [{ name: 'John', age: 30 }, { name: 'Bob', age: 30 }]
// }
```

#### `toNestedObject(array, keys)`

Converts an array of objects into nested objects based on provided keys.

**Parameters:**
- `array`: The array of objects to convert
- `keys`: Array of keys to create the nested structure

**Returns:**
- A nested object structure

**Example:**
```typescript
const data = [
  { country: 'USA', state: 'CA', city: 'LA' },
  { country: 'USA', state: 'NY', city: 'NYC' }
];
const nested = ArrayUtils.toNestedObject(data, ['country', 'state', 'city']);
// Result:
// {
//   USA: {
//     CA: { LA: {} },
//     NY: { NYC: {} }
//   }
// }
```

### DateUtils

Collection of utility functions for date manipulation.

#### `getCurrentDate()`

Gets the current date in YYYY-MM-DD format.

**Returns:**
- Current date as string

**Example:**
```typescript
const today = DateUtils.getCurrentDate();
// If today is January 15, 2024
// Result: "2024-01-15"
```

#### `addDays(date, days)`

Adds specified number of days to a date.

**Parameters:**
- `date`: The starting date
- `days`: Number of days to add

**Returns:**
- New date with added days

**Example:**
```typescript
const date = new Date('2024-01-15');
const newDate = DateUtils.addDays(date, 5);
// Result: 2024-01-20
```

#### `subtractDays(date, days)`

Subtracts specified number of days from a date.

**Parameters:**
- `date`: The starting date
- `days`: Number of days to subtract

**Returns:**
- New date with subtracted days

**Example:**
```typescript
const date = new Date('2024-01-15');
const newDate = DateUtils.subtractDays(date, 5);
// Result: 2024-01-10
```

#### `differenceInDays(date1, date2)`

Calculates the difference in days between two dates.

**Parameters:**
- `date1`: First date
- `date2`: Second date

**Returns:**
- Number of days between the dates

**Example:**
```typescript
const date1 = new Date('2024-01-15');
const date2 = new Date('2024-01-20');
const diff = DateUtils.differenceInDays(date1, date2);
// Result: 5
```

#### `isPast(date)`

Checks if a date is in the past.

**Parameters:**
- `date`: Date to check

**Returns:**
- True if date is in the past

**Example:**
```typescript
const pastDate = new Date('2023-01-15');
const isPast = DateUtils.isPast(pastDate);
// Result: true (assuming current date is after Jan 15, 2023)

const futureDate = new Date('2025-01-15');
const isPastFuture = DateUtils.isPast(futureDate);
// Result: false
```

#### `isFuture(date)`

Checks if a date is in the future.

**Parameters:**
- `date`: Date to check

**Returns:**
- True if date is in the future

**Example:**
```typescript
const futureDate = new Date('2025-01-15');
const isFuture = DateUtils.isFuture(futureDate);
// Result: true (assuming current date is before Jan 15, 2025)

const pastDate = new Date('2023-01-15');
const isFuturePast = DateUtils.isFuture(pastDate);
// Result: false
```

#### `formatDate(date, format)`

Formats a date according to the specified format string.

**Parameters:**
- `date`: Date to format
- `format`: Format string

**Returns:**
- Formatted date string

**Example:**
```typescript
const date = new Date('2024-01-15T14:30:45');

const format1 = DateUtils.formatDate(date, 'YYYY-MM-DD');
// Result: "2024-01-15"

const format2 = DateUtils.formatDate(date, 'DD/MM/YYYY HH:mm:ss');
// Result: "15/01/2024 14:30:45"

const format3 = DateUtils.formatDate(date, 'MM/DD/YYYY');
// Result: "01/15/2024"
```

### NumberUtils

Collection of utility functions for number manipulation.

#### `isEven(num)`

Checks if a number is even.

**Parameters:**
- `num`: Number to check

**Returns:**
- True if number is even

**Example:**
```typescript
const isEven1 = NumberUtils.isEven(4);
// Result: true

const isEven2 = NumberUtils.isEven(7);
// Result: false
```

#### `toNumber(input)`

Converts input to a number or array of numbers.

**Parameters:**
- `input`: String or array of strings to convert

**Returns:**
- Converted number(s)

**Example:**
```typescript
const num = NumberUtils.toNumber("123");
// Result: 123

const nums = NumberUtils.toNumber(["1", "2", "3"]);
// Result: [1, 2, 3]
```

#### `isOdd(num)`

Checks if a number is odd.

**Parameters:**
- `num`: Number to check

**Returns:**
- True if number is odd

**Example:**
```typescript
const isOdd1 = NumberUtils.isOdd(3);
// Result: true

const isOdd2 = NumberUtils.isOdd(4);
// Result: false
```

#### `max(numbers)`

Finds the maximum number in an array.

**Parameters:**
- `numbers`: Array of numbers

**Returns:**
- Maximum value

**Example:**
```typescript
const max = NumberUtils.max([1, 5, 3, 9, 2]);
// Result: 9

const maxNegative = NumberUtils.max([-10, -5, -8]);
// Result: -5
```

#### `min(numbers)`

Finds the minimum number in an array.

**Parameters:**
- `numbers`: Array of numbers

**Returns:**
- Minimum value

**Example:**
```typescript
const min = NumberUtils.min([1, 5, 3, 9, 2]);
// Result: 1

const minNegative = NumberUtils.min([-10, -5, -8]);
// Result: -10
```

#### `sum(numbers)`

Calculates the sum of an array of numbers.

**Parameters:**
- `numbers`: Array of numbers to sum

**Returns:**
- Sum of all numbers

**Example:**
```typescript
const sum1 = NumberUtils.sum([1, 2, 3, 4, 5]);
// Result: 15

const sum2 = NumberUtils.sum([-1, 1, -2, 2]);
// Result: 0
```

#### `average(numbers)`

Calculates the average of an array of numbers.

**Parameters:**
- `numbers`: Array of numbers

**Returns:**
- Arithmetic mean of the numbers

**Example:**
```typescript
const avg1 = NumberUtils.average([1, 2, 3, 4, 5]);
// Result: 3

const avg2 = NumberUtils.average([10, 20, 30]);
// Result: 20
```

#### `round(num, decimalPlaces)`

Rounds a number to a specified number of decimal places.

**Parameters:**
- `num`: Number to round
- `decimalPlaces`: Number of decimal places

**Returns:**
- Rounded number

**Example:**
```typescript
const rounded1 = NumberUtils.round(3.14159, 2);
// Result: 3.14

const rounded2 = NumberUtils.round(10.8675, 3);
// Result: 10.868
```

#### `random(min, max)`

Generates a random integer between min and max (inclusive).

**Parameters:**
- `min`: Minimum value
- `max`: Maximum value

**Returns:**
- Random integer

**Example:**
```typescript
const rand1 = NumberUtils.random(1, 6);
// Result: Random number between 1 and 6 (like rolling a die)

const rand2 = NumberUtils.random(10, 20);
// Result: Random number between 10 and 20
```

#### `formatWithCommas(num)`

Formats a number with commas as thousands separators.

**Parameters:**
- `num`: Number to format

**Returns:**
- Formatted string

**Example:**
```typescript
const formatted1 = NumberUtils.formatWithCommas(1234567);
// Result: "1,234,567"

const formatted2 = NumberUtils.formatWithCommas(1000000000);
// Result: "1,000,000,000"
```

### ObjectUtils

Collection of utility functions for object manipulation.

#### `deepClone(obj)`

Deep clones an object, handling circular references.

**Parameters:**
- `obj`: The object to clone

**Returns:**
- A deep clone of the object

**Example:**
```typescript
const original = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
const clone = ObjectUtils.deepClone(original);
// Result: { a: 1, b: { c: 2 }, d: [1, 2, 3] }

// Handles circular references
const circular = { a: 1 };
circular.self = circular;
const clonedCircular = ObjectUtils.deepClone(circular);
// Result: { a: 1, self: [Circular] }
```

#### `deepMerge(target, source)`

Merges two objects deeply.

**Parameters:**
- `target`: The target object
- `source`: The source object

**Returns:**
- The merged object

**Example:**
```typescript
const target = { a: 1, b: { c: 2 } };
const source = { b: { d: 3 }, e: 4 };
const merged = ObjectUtils.deepMerge(target, source);
// Result: { a: 1, b: { c: 2, d: 3 }, e: 4 }

const arrayMerge = ObjectUtils.deepMerge(
  { arr: [1, 2] },
  { arr: [3, 4] }
);
// Result: { arr: [1, 2, 3, 4] }
```

#### `isEmpty(obj)`

Checks if an object is empty.

**Parameters:**
- `obj`: The object to check

**Returns:**
- True if the object is empty, false otherwise

**Example:**
```typescript
const empty = ObjectUtils.isEmpty({});
// Result: true

const notEmpty = ObjectUtils.isEmpty({ a: 1 });
// Result: false

const arrayNotEmpty = ObjectUtils.isEmpty([]);
// Result: false (arrays are not considered "empty objects")
```

#### `recursiveDeleteKey(obj, keyToDelete)`

Recursively deletes a particular key from an object.

**Parameters:**
- `obj`: The object to modify
- `keyToDelete`: The key to delete

**Example:**
```typescript
const obj = {
  a: 1,
  b: { c: 2, id: 123 },
  d: [{ id: 456 }, { e: 3 }]
};
ObjectUtils.recursiveDeleteKey(obj, 'id');
// Result: {
//   a: 1,
//   b: { c: 2 },
//   d: [{}, { e: 3 }]
// }
```

#### `deletePropertyInPath(obj, path)`

Deletes a property in a given path.

**Parameters:**
- `obj`: The object to modify
- `path`: The path of the property to delete

**Example:**
```typescript
const obj = {
  user: {
    profile: {
      name: 'John',
      age: 30
    }
  }
};
ObjectUtils.deletePropertyInPath(obj, 'user.profile.age');
// Result: {
//   user: {
//     profile: {
//       name: 'John'
//     }
//   }
// }
```

#### `fetchDataInPath(obj, path)`

Fetches data in a given path.

**Parameters:**
- `obj`: The object to fetch data from
- `path`: The path of the property to fetch

**Returns:**
- The value at the given path, or undefined if the path does not exist

**Example:**
```typescript
const obj = {
  user: {
    profile: {
      name: 'John'
    }
  }
};
const name = ObjectUtils.fetchDataInPath(obj, 'user.profile.name');
// Result: "John"

const invalid = ObjectUtils.fetchDataInPath(obj, 'user.settings');
// Result: undefined
```

#### `prettyPrint(obj)`

Pretty prints an object.

**Parameters:**
- `obj`: The object to pretty print

**Returns:**
- A pretty printed string of the object

**Example:**
```typescript
const obj = { user: { name: 'John', age: 30 } };
const pretty = ObjectUtils.prettyPrint(obj);
// Result:
// {
//   "user": {
//     "name": "John",
//     "age": 30
//   }
// }
```

#### `hasProperty(obj, prop)`

Checks if an object has a specific property.

**Parameters:**
- `obj`: The object to check
- `prop`: The property to check for

**Returns:**
- True if the object has the property, false otherwise

**Example:**
```typescript
const obj = { name: 'John', age: 30 };

const hasName = ObjectUtils.hasProperty(obj, 'name');
// Result: true

const hasAddress = ObjectUtils.hasProperty(obj, 'address');
// Result: false
```

#### `mapValues(obj, fn)`

Maps the values of an object to a new object.

**Parameters:**
- `obj`: The object to map
- `fn`: The function to apply to each value

**Returns:**
- A new object with the mapped values

**Example:**
```typescript
const obj = { a: 1, b: 2, c: 3 };
const doubled = ObjectUtils.mapValues(obj, x => x * 2);
// Result: { a: 2, b: 4, c: 6 }

const prices = { shirt: 20, pants: 30 };
const withTax = ObjectUtils.mapValues(prices, price => price * 1.2);
// Result: { shirt: 24, pants: 36 }
```

### StringUtils

Collection of utility functions for string manipulation.

#### `capitalizeFirstLetter(str)`

Capitalizes the first letter of the string.

**Parameters:**
- `str`: The string to capitalize

**Returns:**
- String with first letter capitalized

**Example:**
```typescript
const result1 = StringUtils.capitalizeFirstLetter('hello');
// Result: "Hello"

const result2 = StringUtils.capitalizeFirstLetter('WORLD');
// Result: "WORLD" (remains unchanged)

const result3 = StringUtils.capitalizeFirstLetter('');
// Result: "" (empty string returns empty string)
```

#### `toCamelCase(str)`

Converts a string to camelCase.

**Parameters:**
- `str`: The string to convert

**Returns:**
- Camel case string

**Example:**
```typescript
const result1 = StringUtils.toCamelCase('hello-world');
// Result: "helloWorld"

const result2 = StringUtils.toCamelCase('user_profile_data');
// Result: "userProfileData"

const result3 = StringUtils.toCamelCase('already-Camel-Case');
// Result: "alreadyCamelCase"
```

#### `toKebabCase(str)`

Converts a string to kebab case.

**Parameters:**
- `str`: The string to convert

**Returns:**
- Kebab case string

**Example:**
```typescript
const result1 = StringUtils.toKebabCase('helloWorld');
// Result: "hello-world"

const result2 = StringUtils.toKebabCase('UserProfileData');
// Result: "user-profile-data"

const result3 = StringUtils.toKebabCase('already-kebab-case');
// Result: "already-kebab-case"
```

#### `reverse(str)`

Reverses a string.

**Parameters:**
- `str`: The string to reverse

**Returns:**
- Reversed string

**Example:**
```typescript
const result1 = StringUtils.reverse('hello');
// Result: "olleh"

const result2 = StringUtils.reverse('12345');
// Result: "54321"

const result3 = StringUtils.reverse('');
// Result: "" (empty string returns empty string)
```

#### `isPalindrome(str)`

Checks if a string is a palindrome.

**Parameters:**
- `str`: The string to check

**Returns:**
- True if the string is a palindrome

**Example:**
```typescript
const result1 = StringUtils.isPalindrome('radar');
// Result: true

const result2 = StringUtils.isPalindrome('level');
// Result: true

const result3 = StringUtils.isPalindrome('hello');
// Result: false
```

#### `normalizeWhitespace(str)`

Trims the string and replaces multiple spaces with a single space.

**Parameters:**
- `str`: The string to normalize

**Returns:**
- Normalized string with consistent spacing

**Example:**
```typescript
const result1 = StringUtils.normalizeWhitespace('  hello   world  ');
// Result: "hello world"

const result2 = StringUtils.normalizeWhitespace('\t\nhello\t\tworld\n');
// Result: "hello world"

const result3 = StringUtils.normalizeWhitespace('no  multiple    spaces');
// Result: "no multiple spaces"
```

## Data Structures Package

### GraphUtils

Utility class for graph operations and algorithms.

#### Constructor

```typescript
const graph = new GraphUtils<T>();
```

Initializes an empty graph.

**Example:**
```typescript
const graph = new GraphUtils<number>();
```

#### `addNode(value)`

Adds a node to the graph.

**Parameters:**
- `value`: The value to add

**Returns:**
- The created node

**Example:**
```typescript
const graph = new GraphUtils<number>();
const node1 = graph.addNode(1);
const node2 = graph.addNode(2);
// Graph now contains nodes with values 1 and 2
```

#### `addEdge(source, target, weight?)`

Adds an edge between two nodes with an optional weight.

**Parameters:**
- `source`: Source node
- `target`: Target node
- `weight`: Edge weight (default: 1)

**Example:**
```typescript
const graph = new GraphUtils<number>();
const node1 = graph.addNode(1);
const node2 = graph.addNode(2);
graph.addEdge(node1, node2, 5);
// Adds edge from node1 to node2 with weight 5
```

#### `bfs(start)`

Performs Breadth-First Search starting from a node.

**Parameters:**
- `start`: Starting node

**Returns:**
- Array of nodes in BFS order

**Example:**
```typescript
const graph = new GraphUtils<number>();
const node1 = graph.addNode(1);
const node2 = graph.addNode(2);
const node3 = graph.addNode(3);
graph.addEdge(node1, node2);
graph.addEdge(node2, node3);

const bfsResult = graph.bfs(node1);
// Result: [node1, node2, node3]
```

#### `dfs(start)`

Performs Depth-First Search starting from a node.

**Parameters:**
- `start`: Starting node

**Returns:**
- Array of nodes in DFS order

**Example:**
```typescript
const graph = new GraphUtils<number>();
const node1 = graph.addNode(1);
const node2 = graph.addNode(2);
const node3 = graph.addNode(3);
graph.addEdge(node1, node2);
graph.addEdge(node2, node3);

const dfsResult = graph.dfs(node1);
// Result: [node1, node2, node3]
```

#### `findShortestPath(start, end)`

Finds the shortest path between two nodes using Dijkstra's algorithm.

**Parameters:**
- `start`: Starting node
- `end`: Ending node

**Returns:**
- Array of nodes representing the shortest path, or null if no path exists

**Example:**
```typescript
const graph = new GraphUtils<string>();
const nodeA = graph.addNode("A");
const nodeB = graph.addNode("B");
const nodeC = graph.addNode("C");
graph.addEdge(nodeA, nodeB, 4);
graph.addEdge(nodeB, nodeC, 3);
graph.addEdge(nodeA, nodeC, 8);

const path = graph.findShortestPath(nodeA, nodeC);
// Result: [nodeA, nodeB, nodeC] (path with total weight 7)
```

### TrieUtils

Utility class for Trie data structure operations.

#### Constructor

```typescript
const trie = new TrieUtils();
```

Initializes an empty Trie.

**Example:**
```typescript
const trie = new TrieUtils();
```

#### `insert(word)`

Inserts a word into the trie.

**Parameters:**
- `word`: The word to insert

**Example:**
```typescript
const trie = new TrieUtils();
trie.insert("hello");
trie.insert("help");
// Trie now contains: "hello", "help"
```

#### `search(word)`

Checks if a word exists in the trie.

**Parameters:**
- `word`: The word to search for

**Returns:**
- True if the word exists in the trie

**Example:**
```typescript
const trie = new TrieUtils();
trie.insert("hello");

const exists1 = trie.search("hello");
// Result: true

const exists2 = trie.search("help");
// Result: false
```

#### `startsWith(prefix)`

Checks if there is any word in the trie that starts with the given prefix.

**Parameters:**
- `prefix`: The prefix to search for

**Returns:**
- True if any word starts with the prefix

**Example:**
```typescript
const trie = new TrieUtils();
trie.insert("hello");
trie.insert("help");

const hasPrefix1 = trie.startsWith("hel");
// Result: true

const hasPrefix2 = trie.startsWith("world");
// Result: false
```

#### `getWordsWithPrefix(prefix)`

Gets all words in the trie with the given prefix.

**Parameters:**
- `prefix`: The prefix to search for

**Returns:**
- Array of words with the given prefix

**Example:**
```typescript
const trie = new TrieUtils();
trie.insert("hello");
trie.insert("help");
trie.insert("world");

const words = trie.getWordsWithPrefix("hel");
// Result: ["hello", "help"]
```

#### `remove(word)`

Removes a word from the trie.

**Parameters:**
- `word`: The word to remove

**Returns:**
- True if the word was removed

**Example:**
```typescript
const trie = new TrieUtils();
trie.insert("hello");
trie.insert("help");

const removed = trie.remove("hello");
// Result: true

const exists = trie.search("hello");
// Result: false
```

## HTTP Package

### HttpUtils

Utility class for HTTP operations and network handling.

#### `fetchWithCache(url, options)`

Fetches data with caching and retry capabilities.

**Parameters:**
- `url`: The URL to fetch from
- `options`: Request options including cache and retry settings

**Returns:**
- Promise with the response data

**Example:**
```typescript
// Basic fetch with cache
const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
  cache: { duration: 5000 } // Cache for 5 seconds
});

// Fetch with retry
const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
  retry: { attempts: 3, delay: 1000 } // Retry 3 times with 1s delay
});

// Advanced usage with stale-while-revalidate
const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
  cache: { 
    duration: 60000, // 1 minute cache
    staleWhileRevalidate: true // Return stale data while fetching fresh
  },
  retry: { attempts: 2, delay: 500 },
  headers: { 'Authorization': 'Bearer token' }
});
```

#### `debounce(fn, options)`

Creates a debounced version of a function.

**Parameters:**
- `fn`: Function to debounce
- `options`: Debounce options

**Returns:**
- Debounced function

**Example:**
```typescript
// Basic debounce for search
const searchAPI = (query: string) => fetch(`/api/search?q=${query}`);
const debouncedSearch = HTTPUtils.debounce(searchAPI, { 
  delay: 300,
  leading: true
});

// Advanced usage with leading edge
const expensiveOperation = async (data: any) => {
  const result = await fetch('/api/process', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return result.json();
};

const debouncedOp = HTTPUtils.debounce(expensiveOperation, {
  delay: 1000,
  leading: true // Execute immediately on first call
});

// Usage in event handler
inputElement.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

#### `throttle(fn, options)`

Creates a throttled version of a function.

**Parameters:**
- `fn`: Function to throttle
- `options`: Throttle options

**Returns:**
- Throttled function

**Example:**
```typescript
// Basic throttle for API calls
const saveAPI = (data: any) => fetch('/api/save', { 
  method: 'POST', 
  body: JSON.stringify(data) 
});
const throttledSave = HTTPUtils.throttle(saveAPI, { 
  limit: 1000 // Max one call per second
});

// Advanced usage with trailing edge
const logAnalytics = async (event: any) => {
  await fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(event)
  });
};

const throttledLog = HTTPUtils.throttle(logAnalytics, {
  limit: 2000, // Max one call every 2 seconds
  trailing: true // Ensure last call is executed
});

// Usage in scroll handler
window.addEventListener('scroll', () => {
  throttledLog({ event: 'scroll', position: window.scrollY });
});
```

#### HTTP Request Methods

HTTPUtils provides standard HTTP request methods:

- `get(url, options)`
- `post(url, body, options)`
- `put(url, body, options)`
- `delete(url, options)`

These methods are wrappers around `fetchWithCache` with the appropriate HTTP method set.

## Parallel Package

### ParallelUtils

# ParallelUtil

A utility class for running tasks in parallel using Web Workers (browser) or Worker Threads (Node.js).

## Overview

`ParallelUtil` enables efficient parallel processing by distributing tasks across multiple workers. It automatically detects the execution environment and uses the appropriate worker implementation.

## Methods

### `runParallel<T, R>(tasks: T[], workerFunction: (data: T) => R, numWorkers?: number): Promise<R[]>`

Runs tasks in parallel using Web Workers or Node.js Worker Threads.

**Parameters:**
- `tasks`: Array of task data to be processed
- `workerFunction`: Function to execute on each task
- `numWorkers`: Number of parallel workers to use (defaults to hardware concurrency or 4)

**Returns:**
Promise resolving to array of results in the same order as input tasks

**Examples:**

```typescript
// Process array of data in parallel
const data = [1, 2, 3, 4, 5];
const results = await ParallelUtil.runParallel(data, (num) => {
  return num * num; // Square each number
});
console.log(results); // [1, 4, 9, 16, 25]
```

```typescript
// Image processing with multiple workers
const imageData = [buffer1, buffer2, buffer3];
const processedImages = await ParallelUtil.runParallel(
  imageData,
  (buffer) => applyImageFilter(buffer),
  navigator.hardwareConcurrency
);
```

### `computeAsync<T, R>(computation: (data: T) => R, data: T): Promise<R>`

Executes a single heavy task asynchronously.

**Parameters:**
- `computation`: Function to execute on the data
- `data`: Input data for the computation

**Returns:**
Promise resolving to the result of the computation

**Examples:**

```typescript
// Execute CPU-intensive calculation without blocking the main thread
const result = await ParallelUtil.computeAsync((data) => {
  // Perform expensive calculation
  return fibonacci(data);
}, 42);
```

```typescript
// Process large dataset in background
const processedData = await ParallelUtil.computeAsync((rawData) => {
  // Transform or analyze the data
  return rawData.map(item => transform(item)).filter(item => validate(item));
}, largeDataset);
```

## Private Methods

### `isWebWorkerSupported(): boolean`

Detects if the environment supports Web Workers.

**Returns:**
Boolean indicating if Web Workers are available

### `runParallelWithWebWorker<T, R>(tasks: T[], workerFunction: (data: T) => R, numWorkers: number): Promise<R[]>`

Runs tasks in parallel using Web Workers (for browser environments).

### `runParallelWithNodeWorker<T, R>(tasks: T[], workerFunction: (data: T) => R, numWorkers: number): Promise<R[]>`

Runs tasks in parallel using Node.js Worker Threads (for Node.js environments).


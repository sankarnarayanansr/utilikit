### datapkg/ArrayUtils.ts



---

/**
     * Removes duplicates from an array.
     * @param array The array to remove duplicates from
     * @returns A new array with unique elements
     * 
     * @example
     * const numbers = [1, 2, 2, 3, 3, 4];
     * const unique = ArrayUtils.removeDuplicates(numbers);
     * // Result: [1, 2, 3, 4]
     */

---

/**
     * Finds the intersection of two arrays.
     * @param array1 The first array
     * @param array2 The second array
     * @returns A new array containing elements present in both arrays
     * 
     * @example
     * const arr1 = [1, 2, 3, 4];
     * const arr2 = [3, 4, 5, 6];
     * const common = ArrayUtils.intersection(arr1, arr2);
     * // Result: [3, 4]
     */

---

/**
     * Finds the difference between two arrays.
     * @param array1 The array to check from
     * @param array2 The array to check against
     * @returns A new array containing elements present in array1 but not in array2
     * 
     * @example
     * const arr1 = [1, 2, 3, 4];
     * const arr2 = [3, 4, 5, 6];
     * const diff = ArrayUtils.difference(arr1, arr2);
     * // Result: [1, 2]
     */

---

/**
     * Chunks an array into smaller arrays of a specified size.
     * @param array The array to chunk
     * @param size The size of each chunk
     * @returns An array of chunks
     * 
     * @example
     * const numbers = [1, 2, 3, 4, 5, 6, 7];
     * const chunks = ArrayUtils.chunk(numbers, 3);
     * // Result: [[1, 2, 3], [4, 5, 6], [7]]
     */

---

/**
     * Deletes an element from an array.
     * @param array The array to modify
     * @param element The element to delete
     * @param deleteAll Whether to delete all occurrences of the element
     * @returns The modified array
     * 
     * @example
     * const numbers = [1, 2, 2, 3, 2, 4];
     * const result1 = ArrayUtils.deleteElement(numbers.slice(), 2);
     * // Result1: [1, 2, 3, 2, 4] (deletes first occurrence)
     * 
     * const result2 = ArrayUtils.deleteElement(numbers.slice(), 2, true);
     * // Result2: [1, 3, 4] (deletes all occurrences)
     */

---

/**
     * Shuffles an array using the Fisher-Yates algorithm.
     * @param array The array to shuffle
     * @returns A new shuffled array
     * 
     * @example
     * const numbers = [1, 2, 3, 4, 5];
     * const shuffled = ArrayUtils.shuffle(numbers);
     * // Possible Result: [3, 1, 5, 2, 4]
     */

---

/**
     * Groups the elements of an array by a specified key.
     * @param array The array to group
     * @param key The key to group by
     * @returns An object with the grouped elements
     * 
     * @example
     * const people = [
     *   { name: 'John', age: 30 },
     *   { name: 'Jane', age: 25 },
     *   { name: 'Bob', age: 30 }
     * ];
     * const grouped = ArrayUtils.groupBy(people, 'age');
     * // Result: {
     * //   "25": [{ name: 'Jane', age: 25 }],
     * //   "30": [{ name: 'John', age: 30 }, { name: 'Bob', age: 30 }]
     * // }
     */

---

/**
     * Converts an array of objects into nested objects based on provided keys.
     * @param array The array of objects to convert
     * @param keys Array of keys to create the nested structure
     * @returns A nested object structure
     * 
     * @example
     * const data = [
     *   { country: 'USA', state: 'CA', city: 'LA' },
     *   { country: 'USA', state: 'NY', city: 'NYC' }
     * ];
     * const nested = ArrayUtils.toNestedObject(data, ['country', 'state', 'city']);
     * // Result:
     * // {
     * //   USA: {
     * //     CA: { LA: {} },
     * //     NY: { NYC: {} }
     * //   }
     * // }
     */

---

### datapkg/DateUtils.ts



---

/**
     * Gets the current date in YYYY-MM-DD format.
     * @returns Current date as string
     * 
     * @example
     * const today = DateUtils.getCurrentDate();
     * // If today is January 15, 2024
     * // Result: "2024-01-15"
     */

---

/**
     * Adds specified number of days to a date.
     * @param date The starting date
     * @param days Number of days to add
     * @returns New date with added days
     * 
     * @example
     * const date = new Date('2024-01-15');
     * const newDate = DateUtils.addDays(date, 5);
     * // Result: 2024-01-20
     */

---

/**
     * Subtracts specified number of days from a date.
     * @param date The starting date
     * @param days Number of days to subtract
     * @returns New date with subtracted days
     * 
     * @example
     * const date = new Date('2024-01-15');
     * const newDate = DateUtils.subtractDays(date, 5);
     * // Result: 2024-01-10
     */

---

/**
     * Calculates the difference in days between two dates.
     * @param date1 First date
     * @param date2 Second date
     * @returns Number of days between the dates
     * 
     * @example
     * const date1 = new Date('2024-01-15');
     * const date2 = new Date('2024-01-20');
     * const diff = DateUtils.differenceInDays(date1, date2);
     * // Result: 5
     */

---

/**
     * Checks if a date is in the past.
     * @param date Date to check
     * @returns True if date is in the past
     * 
     * @example
     * const pastDate = new Date('2023-01-15');
     * const isPast = DateUtils.isPast(pastDate);
     * // Result: true (assuming current date is after Jan 15, 2023)
     * 
     * const futureDate = new Date('2025-01-15');
     * const isPastFuture = DateUtils.isPast(futureDate);
     * // Result: false
     */

---

/**
     * Checks if a date is in the future.
     * @param date Date to check
     * @returns True if date is in the future
     * 
     * @example
     * const futureDate = new Date('2025-01-15');
     * const isFuture = DateUtils.isFuture(futureDate);
     * // Result: true (assuming current date is before Jan 15, 2025)
     * 
     * const pastDate = new Date('2023-01-15');
     * const isFuturePast = DateUtils.isFuture(pastDate);
     * // Result: false
     */

---

/**
     * Formats a date according to the specified format string.
     * Supported tokens: YYYY (year), MM (month), DD (day),
     * HH (hours), mm (minutes), ss (seconds)
     * @param date Date to format
     * @param format Format string
     * @returns Formatted date string
     * 
     * @example
     * const date = new Date('2024-01-15T14:30:45');
     * 
     * const format1 = DateUtils.formatDate(date, 'YYYY-MM-DD');
     * // Result: "2024-01-15"
     * 
     * const format2 = DateUtils.formatDate(date, 'DD/MM/YYYY HH:mm:ss');
     * // Result: "15/01/2024 14:30:45"
     * 
     * const format3 = DateUtils.formatDate(date, 'MM/DD/YYYY');
     * // Result: "01/15/2024"
     */

---

### datapkg/NumberUtils.ts



---

/**
     * Checks if a number is even.
     * @param num Number to check
     * @returns True if number is even
     * 
     * @example
     * const isEven1 = NumberUtils.isEven(4);
     * // Result: true
     * 
     * const isEven2 = NumberUtils.isEven(7);
     * // Result: false
     */

---

/**
     * Converts input to a number or array of numbers.
     * @param input String or array of strings to convert
     * @returns Converted number(s)
     * 
     * @example
     * const num = NumberUtils.toNumber("123");
     * // Result: 123
     * 
     * const nums = NumberUtils.toNumber(["1", "2", "3"]);
     * // Result: [1, 2, 3]
     */

---

/**
     * Checks if a number is odd.
     * @param num Number to check
     * @returns True if number is odd
     * 
     * @example
     * const isOdd1 = NumberUtils.isOdd(3);
     * // Result: true
     * 
     * const isOdd2 = NumberUtils.isOdd(4);
     * // Result: false
     */

---

/**
     * Finds the maximum number in an array.
     * @param numbers Array of numbers
     * @returns Maximum value
     * 
     * @example
     * const max = NumberUtils.max([1, 5, 3, 9, 2]);
     * // Result: 9
     * 
     * const maxNegative = NumberUtils.max([-10, -5, -8]);
     * // Result: -5
     */

---

/**
     * Finds the minimum number in an array.
     * @param numbers Array of numbers
     * @returns Minimum value
     * 
     * @example
     * const min = NumberUtils.min([1, 5, 3, 9, 2]);
     * // Result: 1
     * 
     * const minNegative = NumberUtils.min([-10, -5, -8]);
     * // Result: -10
     */

---

/**
     * Calculates the sum of an array of numbers.
     * @param numbers Array of numbers to sum
     * @returns Sum of all numbers
     * 
     * @example
     * const sum1 = NumberUtils.sum([1, 2, 3, 4, 5]);
     * // Result: 15
     * 
     * const sum2 = NumberUtils.sum([-1, 1, -2, 2]);
     * // Result: 0
     */

---

/**
     * Calculates the average of an array of numbers.
     * @param numbers Array of numbers
     * @returns Arithmetic mean of the numbers
     * 
     * @example
     * const avg1 = NumberUtils.average([1, 2, 3, 4, 5]);
     * // Result: 3
     * 
     * const avg2 = NumberUtils.average([10, 20, 30]);
     * // Result: 20
     */

---

/**
     * Rounds a number to a specified number of decimal places.
     * @param num Number to round
     * @param decimalPlaces Number of decimal places
     * @returns Rounded number
     * 
     * @example
     * const rounded1 = NumberUtils.round(3.14159, 2);
     * // Result: 3.14
     * 
     * const rounded2 = NumberUtils.round(10.8675, 3);
     * // Result: 10.868
     */

---

/**
     * Generates a random integer between min and max (inclusive).
     * @param min Minimum value
     * @param max Maximum value
     * @returns Random integer
     * 
     * @example
     * const rand1 = NumberUtils.random(1, 6);
     * // Result: Random number between 1 and 6 (like rolling a die)
     * 
     * const rand2 = NumberUtils.random(10, 20);
     * // Result: Random number between 10 and 20
     */

---

/**
     * Formats a number with commas as thousands separators.
     * @param num Number to format
     * @returns Formatted string
     * 
     * @example
     * const formatted1 = NumberUtils.formatWithCommas(1234567);
     * // Result: "1,234,567"
     * 
     * const formatted2 = NumberUtils.formatWithCommas(1000000000);
     * // Result: "1,000,000,000"
     */

---

### datapkg/ObjectUtils.ts



---

/**
     * Deep clones an object, handling circular references.
     * @param obj The object to clone
     * @returns A deep clone of the object
     * 
     * @example
     * const original = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
     * const clone = ObjectUtils.deepClone(original);
     * // Result: { a: 1, b: { c: 2 }, d: [1, 2, 3] }
     * 
     * // Handles circular references
     * const circular = { a: 1 };
     * circular.self = circular;
     * const clonedCircular = ObjectUtils.deepClone(circular);
     * // Result: { a: 1, self: [Circular] }
     */

---

/**
     * Merges two objects deeply.
     * @param target The target object
     * @param source The source object
     * @returns The merged object
     * 
     * @example
     * const target = { a: 1, b: { c: 2 } };
     * const source = { b: { d: 3 }, e: 4 };
     * const merged = ObjectUtils.deepMerge(target, source);
     * // Result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
     * 
     * const arrayMerge = ObjectUtils.deepMerge(
     *   { arr: [1, 2] },
     *   { arr: [3, 4] }
     * );
     * // Result: { arr: [1, 2, 3, 4] }
     */

---

/**
     * Checks if an object is empty.
     * @param obj The object to check
     * @returns True if the object is empty, false otherwise
     * 
     * @example
     * const empty = ObjectUtils.isEmpty({});
     * // Result: true
     * 
     * const notEmpty = ObjectUtils.isEmpty({ a: 1 });
     * // Result: false
     * 
     * const arrayNotEmpty = ObjectUtils.isEmpty([]);
     * // Result: false (arrays are not considered "empty objects")
     */

---

/**
     * Recursively deletes a particular key from an object.
     * @param obj The object to modify
     * @param keyToDelete The key to delete
     * 
     * @example
     * const obj = {
     *   a: 1,
     *   b: { c: 2, id: 123 },
     *   d: [{ id: 456 }, { e: 3 }]
     * };
     * ObjectUtils.recursiveDeleteKey(obj, 'id');
     * // Result: {
     * //   a: 1,
     * //   b: { c: 2 },
     * //   d: [{}, { e: 3 }]
     * // }
     */

---

/**
     * Deletes a property in a given path.
     * @param obj The object to modify
     * @param path The path of the property to delete
     * 
     * @example
     * const obj = {
     *   user: {
     *     profile: {
     *       name: 'John',
     *       age: 30
     *     }
     *   }
     * };
     * ObjectUtils.deletePropertyInPath(obj, 'user.profile.age');
     * // Result: {
     * //   user: {
     * //     profile: {
     * //       name: 'John'
     * //     }
     * //   }
     * // }
     */

---

/**
     * Fetches data in a given path.
     * @param obj The object to fetch data from
     * @param path The path of the property to fetch
     * @returns The value at the given path, or undefined if the path does not exist
     * 
     * @example
     * const obj = {
     *   user: {
     *     profile: {
     *       name: 'John'
     *     }
     *   }
     * };
     * const name = ObjectUtils.fetchDataInPath(obj, 'user.profile.name');
     * // Result: "John"
     * 
     * const invalid = ObjectUtils.fetchDataInPath(obj, 'user.settings');
     * // Result: undefined
     */

---

/**
     * Pretty prints an object.
     * @param obj The object to pretty print
     * @returns A pretty printed string of the object
     * 
     * @example
     * const obj = { user: { name: 'John', age: 30 } };
     * const pretty = ObjectUtils.prettyPrint(obj);
     * // Result:
     * // {
     * //   "user": {
     * //     "name": "John",
     * //     "age": 30
     * //   }
     * // }
     */

---

/**
     * Checks if an object has a specific property.
     * @param obj The object to check
     * @param prop The property to check for
     * @returns True if the object has the property, false otherwise
     * 
     * @example
     * const obj = { name: 'John', age: 30 };
     * 
     * const hasName = ObjectUtils.hasProperty(obj, 'name');
     * // Result: true
     * 
     * const hasAddress = ObjectUtils.hasProperty(obj, 'address');
     * // Result: false
     */

---

/**
     * Maps the values of an object to a new object.
     * @param obj The object to map
     * @param fn The function to apply to each value
     * @returns A new object with the mapped values
     * 
     * @example
     * const obj = { a: 1, b: 2, c: 3 };
     * const doubled = ObjectUtils.mapValues(obj, x => x * 2);
     * // Result: { a: 2, b: 4, c: 6 }
     * 
     * const prices = { shirt: 20, pants: 30 };
     * const withTax = ObjectUtils.mapValues(prices, price => price * 1.2);
     * // Result: { shirt: 24, pants: 36 }
     */

---

### datapkg/StringUtils.ts



---

/**
     * Capitalizes the first letter of the string.
     * @param str The string to capitalize
     * @returns String with first letter capitalized
     * 
     * @example
     * const result1 = StringUtils.capitalizeFirstLetter('hello');
     * // Result: "Hello"
     * 
     * const result2 = StringUtils.capitalizeFirstLetter('WORLD');
     * // Result: "WORLD" (remains unchanged)
     * 
     * const result3 = StringUtils.capitalizeFirstLetter('');
     * // Result: "" (empty string returns empty string)
     */

---

/**
     * Converts a string to camelCase.
     * @param str The string to convert
     * @returns Camel case string
     * 
     * @example
     * const result1 = StringUtils.toCamelCase('hello-world');
     * // Result: "helloWorld"
     * 
     * const result2 = StringUtils.toCamelCase('user_profile_data');
     * // Result: "userProfileData"
     * 
     * const result3 = StringUtils.toCamelCase('already-Camel-Case');
     * // Result: "alreadyCamelCase"
     */

---

/**
     * Converts a string to kebab case.
     * @param str The string to convert
     * @returns Kebab case string
     * 
     * @example
     * const result1 = StringUtils.toKebabCase('helloWorld');
     * // Result: "hello-world"
     * 
     * const result2 = StringUtils.toKebabCase('UserProfileData');
     * // Result: "user-profile-data"
     * 
     * const result3 = StringUtils.toKebabCase('already-kebab-case');
     * // Result: "already-kebab-case"
     */

---

/**
     * Reverses a string.
     * @param str The string to reverse
     * @returns Reversed string
     * 
     * @example
     * const result1 = StringUtils.reverse('hello');
     * // Result: "olleh"
     * 
     * const result2 = StringUtils.reverse('12345');
     * // Result: "54321"
     * 
     * const result3 = StringUtils.reverse('');
     * // Result: "" (empty string returns empty string)
     */

---

/**
     * Checks if a string is a palindrome.
     * @param str The string to check
     * @returns True if the string is a palindrome
     * 
     * @example
     * const result1 = StringUtils.isPalindrome('radar');
     * // Result: true
     * 
     * const result2 = StringUtils.isPalindrome('level');
     * // Result: true
     * 
     * const result3 = StringUtils.isPalindrome('hello');
     * // Result: false
     */

---

/**
     * Trims the string and replaces multiple spaces with a single space.
     * @param str The string to normalize
     * @returns Normalized string with consistent spacing
     * 
     * @example
     * const result1 = StringUtils.normalizeWhitespace('  hello   world  ');
     * // Result: "hello world"
     * 
     * const result2 = StringUtils.normalizeWhitespace('\t\nhello\t\tworld\n');
     * // Result: "hello world"
     * 
     * const result3 = StringUtils.normalizeWhitespace('no  multiple    spaces');
     * // Result: "no multiple spaces"
     */

---

### dspkg/GraphUtils.ts



---

/**
     * Creates a new graph node.
     * @param value The value to store in the node
     */

---

/**
     * Initializes an empty graph.
     * 
     * @example
     * const graph = new GraphUtils<number>();
     */

---

/**
     * Adds a node to the graph.
     * @param value The value to add
     * @returns The created node
     * 
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * // Graph now contains nodes with values 1 and 2
     */

---

/**
     * Adds an edge between two nodes with an optional weight.
     * @param source Source node
     * @param target Target node
     * @param weight Edge weight (default: 1)
     * 
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * graph.addEdge(node1, node2, 5);
     * // Adds edge from node1 to node2 with weight 5
     */

---

/**
     * Performs Breadth-First Search starting from a node.
     * @param start Starting node
     * @returns Array of nodes in BFS order
     * 
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * const node3 = graph.addNode(3);
     * graph.addEdge(node1, node2);
     * graph.addEdge(node2, node3);
     * 
     * const bfsResult = graph.bfs(node1);
     * // Result: [node1, node2, node3]
     */

---

/**
     * Performs Depth-First Search starting from a node.
     * @param start Starting node
     * @returns Array of nodes in DFS order
     * 
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * const node3 = graph.addNode(3);
     * graph.addEdge(node1, node2);
     * graph.addEdge(node2, node3);
     * 
     * const dfsResult = graph.dfs(node1);
     * // Result: [node1, node2, node3]
     */

---

/**
     * Finds the shortest path between two nodes using Dijkstra's algorithm.
     * @param start Starting node
     * @param end Ending node
     * @returns Array of nodes representing the shortest path, or null if no path exists
     * 
     * @example
     * const graph = new GraphUtils<string>();
     * const nodeA = graph.addNode("A");
     * const nodeB = graph.addNode("B");
     * const nodeC = graph.addNode("C");
     * graph.addEdge(nodeA, nodeB, 4);
     * graph.addEdge(nodeB, nodeC, 3);
     * graph.addEdge(nodeA, nodeC, 8);
     * 
     * const path = graph.findShortestPath(nodeA, nodeC);
     * // Result: [nodeA, nodeB, nodeC] (path with total weight 7)
     */

---

### dspkg/TrieUtils.ts



---

/**
     * Initializes an empty Trie.
     * 
     * @example
     * const trie = new TrieUtils();
     */

---

/**
     * Inserts a word into the trie.
     * @param word The word to insert
     * 
     * @example
     * const trie = new TrieUtils();
     * trie.insert("hello");
     * trie.insert("help");
     * // Trie now contains: "hello", "help"
     */

---

/**
     * Checks if a word exists in the trie.
     * @param word The word to search for
     * @returns True if the word exists in the trie
     * 
     * @example
     * const trie = new TrieUtils();
     * trie.insert("hello");
     * 
     * const exists1 = trie.search("hello");
     * // Result: true
     * 
     * const exists2 = trie.search("help");
     * // Result: false
     */

---

/**
     * Checks if there is any word in the trie that starts with the given prefix.
     * @param prefix The prefix to search for
     * @returns True if any word starts with the prefix
     * 
     * @example
     * const trie = new TrieUtils();
     * trie.insert("hello");
     * trie.insert("help");
     * 
     * const hasPrefix1 = trie.startsWith("hel");
     * // Result: true
     * 
     * const hasPrefix2 = trie.startsWith("world");
     * // Result: false
     */

---

/**
     * Gets all words in the trie with the given prefix.
     * @param prefix The prefix to search for
     * @returns Array of words with the given prefix
     * 
     * @example
     * const trie = new TrieUtils();
     * trie.insert("hello");
     * trie.insert("help");
     * trie.insert("world");
     * 
     * const words = trie.getWordsWithPrefix("hel");
     * // Result: ["hello", "help"]
     */

---

/**
     * Removes a word from the trie.
     * @param word The word to remove
     * @returns True if the word was removed
     * 
     * @example
     * const trie = new TrieUtils();
     * trie.insert("hello");
     * trie.insert("help");
     * 
     * const removed = trie.remove("hello");
     * // Result: true
     * 
     * const exists = trie.search("hello");
     * // Result: false
     */

---

### httppkg/HttpUtils.ts



---

/** Cache duration in milliseconds */

---

/** Whether to return stale data while revalidating */

---

/** Cache configuration */

---

/** Retry configuration */

---

/** Delay in milliseconds */

---

/** Whether to call the function at the leading edge */

---

/** Limit in milliseconds */

---

/** Whether to call the function at the trailing edge */

---

/**
     * Fetches data with caching and retry capabilities.
     * @param url The URL to fetch from
     * @param options Request options including cache and retry settings
     * @returns Promise with the response data
     * 
     * @example
     * // Basic fetch with cache
     * const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
     *   cache: { duration: 5000 } // Cache for 5 seconds
     * });
     * 
     * // Fetch with retry
     * const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
     *   retry: { attempts: 3, delay: 1000 } // Retry 3 times with 1s delay
     * });
     * 
     * // Advanced usage with stale-while-revalidate
     * const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
     *   cache: { 
     *     duration: 60000, // 1 minute cache
     *     staleWhileRevalidate: true // Return stale data while fetching fresh
     *   },
     *   retry: { attempts: 2, delay: 500 },
     *   headers: { 'Authorization': 'Bearer token' }
     * });
     */

---

/**
     * Creates a debounced version of a function.
     * @param fn Function to debounce
     * @param options Debounce options
     * @returns Debounced function
     * 
     * @example
     * // Basic debounce for search
     * const searchAPI = (query: string) => fetch(`/api/search?q=${query}`);
     * const debouncedSearch = HTTPUtils.debounce(searchAPI, { 
     *   delay: 300,
     *   leading: true
     * });
     * 
     * // Advanced usage with leading edge
     * const expensiveOperation = async (data: any) => {
     *   const result = await fetch('/api/process', {
     *     method: 'POST',
     *     body: JSON.stringify(data)
     *   });
     *   return result.json();
     * };
     * 
     * const debouncedOp = HTTPUtils.debounce(expensiveOperation, {
     *   delay: 1000,
     *   leading: true // Execute immediately on first call
     * });
     * 
     * // Usage in event handler
     * inputElement.addEventListener('input', (e) => {
     *   debouncedSearch(e.target.value);
     * });
     */

---

/**
     * Creates a throttled version of a function.
     * @param fn Function to throttle
     * @param options Throttle options
     * @returns Throttled function
     * 
     * @example
     * // Basic throttle for API calls
     * const saveAPI = (data: any) => fetch('/api/save', { 
     *   method: 'POST', 
     *   body: JSON.stringify(data) 
     * });
     * const throttledSave = HTTPUtils.throttle(saveAPI, { 
     *   limit: 1000 // Max one call per second
     * });
     * 
     * // Advanced usage with trailing edge
     * const logAnalytics = async (event: any) => {
     *   await fetch('/api/analytics', {
     *     method: 'POST',
     *     body: JSON.stringify(event)
     *   });
     * };
     * 
     * const throttledLog = HTTPUtils.throttle(logAnalytics, {
     *   limit: 2000, // Max one call every 2 seconds
     *   trailing: true // Ensure last call is executed
     * });
     * 
     * // Usage in scroll handler
     * window.addEventListener('scroll', () => {
     *   throttledLog({ event: 'scroll', position: window.scrollY });
     * });
     */

---

/**
     * Private helper to fetch with retry capability.
     * @param url The URL to fetch from
     * @param options Request options
     * @param cacheKey Key for caching
     * @returns Promise with the response data
     * 
     * @example
     * // Internal usage example:
     * private static async example() {
     *   const url = 'https://api.example.com/data';
     *   const options = {
     *     retry: { attempts: 3, delay: 1000 },
     *     headers: { 'Accept': 'application/json' }
     *   };
     *   const cacheKey = `${url}-${JSON.stringify(options)}`;
     *   
     *   try {
     *     const data = await this.fetchWithRetry(url, options, cacheKey);
     *     return data;
     *   } catch (error) {
     *     console.error('All retry attempts failed:', error);
     *     throw error;
     *   }
     * }
     */

---

/**
     * Private helper to revalidate cached data in the background.
     * @param url The URL to fetch from
     * @param options Request options
     * @param cacheKey Key for caching
     * 
     * @example
     * // Internal usage example:
     * private static async example() {
     *   const url = 'https://api.example.com/data';
     *   const options = {
     *     cache: { duration: 5000 },
     *     headers: { 'Accept': 'application/json' }
     *   };
     *   const cacheKey = `${url}-${JSON.stringify(options)}`;
     *   
     *   // Background revalidation
     *   await this.revalidateCache(url, options, cacheKey);
     *   // Continue execution without waiting for revalidation
     * }
     */

---

/**
     * Makes a GET request
     * @param url The URL to fetch from
     * @param options Additional request options
     * @returns Promise with the response data
     */

---

/**
     * Makes a POST request
     * @param url The URL to fetch from
     * @param body The request body
     * @param options Additional request options
     * @returns Promise with the response data
     */

---

/**
     * Makes a PUT request
     * @param url The URL to fetch from
     * @param body The request body
     * @param options Additional request options
     * @returns Promise with the response data
     */

---

/**
     * Makes a DELETE request
     * @param url The URL to fetch from
     * @param options Additional request options
     * @returns Promise with the response data
     */

---

### parallelpkg/parallelUtils.ts



---

/**
 * Type for a task that can be executed in parallel
 */

---

/**
 * Type for the result of a parallel task
 */

---

/**
     * Detect if environment supports Web Workers
     */

---

/**
     * Runs tasks in parallel using Web Workers or Node.js Worker Threads
     */

---

/**
     * Runs tasks in parallel using Web Workers (for browser)
     */

---

/**
     * Runs tasks in parallel using Node.js Worker Threads
     */

---

/**
     * Executes a single heavy task asynchronously
     */
export class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

export class TrieUtils {
    private root: TrieNode;

    /**
     * Initializes an empty Trie.
     * 
     * @example
     * const trie = new TrieUtils();
     */
    constructor() {
        this.root = new TrieNode();
    }

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
    insert(word: string): void {
        let current = this.root;
        
        for (const char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }
        
        current.isEndOfWord = true;
    }

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
    search(word: string): boolean {
        let current = this.root;
        
        for (const char of word) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }
        
        return current.isEndOfWord;
    }

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
    startsWith(prefix: string): boolean {
        let current = this.root;
        
        for (const char of prefix) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }
        
        return true;
    }

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
    getWordsWithPrefix(prefix: string): string[] {
        const results: string[] = [];
        let current = this.root;

        // Navigate to the node representing the prefix
        for (const char of prefix) {
            if (!current.children.has(char)) {
                return results;
            }
            current = current.children.get(char)!;
        }

        // DFS to find all words with the prefix
        this.dfs(current, prefix, results);
        return results;
    }

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
    remove(word: string): boolean {
        return this.removeHelper(this.root, word, 0);
    }

    private removeHelper(node: TrieNode, word: string, depth: number): boolean {
        if (depth === word.length) {
            if (!node.isEndOfWord) return false;
            
            node.isEndOfWord = false;
            return node.children.size === 0;
        }

        const char = word[depth];
        if (!node.children.has(char)) return false;

        const shouldDeleteChild = this.removeHelper(node.children.get(char)!, word, depth + 1);

        if (shouldDeleteChild) {
            node.children.delete(char);
            return node.children.size === 0 && !node.isEndOfWord;
        }

        return false;
    }

    private dfs(node: TrieNode, prefix: string, results: string[]): void {
        if (node.isEndOfWord) {
            results.push(prefix);
        }

        // Convert Map to array of entries to avoid downlevel iteration error
        const entries = Array.from(node.children.entries());
        for (const [char, childNode] of entries) {
            this.dfs(childNode, prefix + char, results);
        }
    }
}

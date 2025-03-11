export declare class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    constructor();
}
export declare class TrieUtils {
    private root;
    /**
     * Initializes an empty Trie.
     *
     * @example
     * const trie = new TrieUtils();
     */
    constructor();
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
    insert(word: string): void;
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
    search(word: string): boolean;
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
    startsWith(prefix: string): boolean;
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
    getWordsWithPrefix(prefix: string): string[];
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
    remove(word: string): boolean;
    private removeHelper;
    private dfs;
}
//# sourceMappingURL=TrieUtils.d.ts.map
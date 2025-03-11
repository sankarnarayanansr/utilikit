import { TrieUtils } from '../../src/dspkg/TrieUtils';

describe('TrieUtils', () => {
    let trie: TrieUtils;

    beforeEach(() => {
        trie = new TrieUtils();
    });

    describe('insert and search', () => {
        it('should insert and find words', () => {
            trie.insert('hello');
            expect(trie.search('hello')).toBe(true);
            expect(trie.search('help')).toBe(false);
        });
    });

    // Add more tests for other TrieUtils methods...
}); 
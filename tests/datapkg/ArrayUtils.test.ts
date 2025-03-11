import { ArrayUtils } from '../../src/datapkg/ArrayUtils';

describe('ArrayUtils', () => {
    describe('removeDuplicates', () => {
        it('should remove duplicate elements', () => {
            const input = [1, 2, 2, 3, 3, 4];
            const result = ArrayUtils.removeDuplicates(input);
            expect(result).toEqual([1, 2, 3, 4]);
        });

        it('should handle empty array', () => {
            expect(ArrayUtils.removeDuplicates([])).toEqual([]);
        });
    });

    // Add more tests for other ArrayUtils methods...
}); 
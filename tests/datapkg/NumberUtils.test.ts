import { NumberUtils } from '../../src/datapkg/NumberUtils';

describe('NumberUtils', () => {
    describe('isEven', () => {
        it('should identify even numbers', () => {
            expect(NumberUtils.isEven(2)).toBe(true);
            expect(NumberUtils.isEven(4)).toBe(true);
            expect(NumberUtils.isEven(-2)).toBe(true);
            expect(NumberUtils.isEven(0)).toBe(true);
        });

        it('should identify non-even numbers', () => {
            expect(NumberUtils.isEven(1)).toBe(false);
            expect(NumberUtils.isEven(3)).toBe(false);
            expect(NumberUtils.isEven(-1)).toBe(false);
        });
    });

    describe('toNumber', () => {
        it('should convert single string to number', () => {
            expect(NumberUtils.toNumber('123')).toBe(123);
            expect(NumberUtils.toNumber('-456')).toBe(-456);
            expect(NumberUtils.toNumber('0')).toBe(0);
        });

        it('should convert array of strings to numbers', () => {
            expect(NumberUtils.toNumber(['1', '2', '3'])).toEqual([1, 2, 3]);
            expect(NumberUtils.toNumber(['-1', '0', '1'])).toEqual([-1, 0, 1]);
        });

        it('should handle invalid inputs', () => {
            expect(NumberUtils.toNumber('abc')).toBe(NaN);
            expect(NumberUtils.toNumber(['1', 'abc', '3'])).toEqual([1, NaN, 3]);
        });
    });

    describe('isOdd', () => {
        it('should identify odd numbers', () => {
            expect(NumberUtils.isOdd(1)).toBe(true);
            expect(NumberUtils.isOdd(3)).toBe(true);
            expect(NumberUtils.isOdd(-1)).toBe(true);
        });

        it('should identify non-odd numbers', () => {
            expect(NumberUtils.isOdd(2)).toBe(false);
            expect(NumberUtils.isOdd(0)).toBe(false);
            expect(NumberUtils.isOdd(-2)).toBe(false);
        });
    });

    describe('max', () => {
        it('should find maximum in array of numbers', () => {
            expect(NumberUtils.max([1, 5, 3, 9, 2])).toBe(9);
            expect(NumberUtils.max([-1, -5, -3])).toBe(-1);
        });

        it('should handle single element array', () => {
            expect(NumberUtils.max([1])).toBe(1);
        });

        
    });

    describe('min', () => {
        it('should find minimum in array of numbers', () => {
            expect(NumberUtils.min([1, 5, 3, 9, 2])).toBe(1);
            expect(NumberUtils.min([-1, -5, -3])).toBe(-5);
        });

        it('should handle single element array', () => {
            expect(NumberUtils.min([1])).toBe(1);
        });

        
    });

    describe('sum', () => {
        it('should calculate sum of numbers', () => {
            expect(NumberUtils.sum([1, 2, 3, 4, 5])).toBe(15);
            expect(NumberUtils.sum([-1, 1, -2, 2])).toBe(0);
        });

        it('should handle empty array', () => {
            expect(NumberUtils.sum([])).toBe(0);
        });

        it('should handle single element', () => {
            expect(NumberUtils.sum([5])).toBe(5);
        });
    });

    describe('average', () => {
        it('should calculate average of numbers', () => {
            expect(NumberUtils.average([1, 2, 3, 4, 5])).toBe(3);
            expect(NumberUtils.average([10, 20, 30])).toBe(20);
        });

        it('should handle decimal results', () => {
            expect(NumberUtils.average([1, 2])).toBe(1.5);
        });

        
    });

    describe('round', () => {
        it('should round to nearest integer', () => {
            expect(NumberUtils.round(1.4, 0)).toBe(1);
            expect(NumberUtils.round(1.6, 0)).toBe(2);
        });

        it('should round to specified decimal places', () => {
            expect(NumberUtils.round(1.234, 2)).toBe(1.23);
            expect(NumberUtils.round(1.235, 2)).toBe(1.24);
        });
    });

    describe('random', () => {
        it('should generate random number within range', () => {
            const result = NumberUtils.random(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
        });
    });

    describe('formatWithCommas', () => {
        it('should format numbers with commas', () => {
            expect(NumberUtils.formatWithCommas(1234567)).toBe('1,234,567');
            expect(NumberUtils.formatWithCommas(1000000000)).toBe('1,000,000,000');
        });

        it('should handle small numbers', () => {
            expect(NumberUtils.formatWithCommas(123)).toBe('123');
            expect(NumberUtils.formatWithCommas(0)).toBe('0');
        });

        it('should handle negative numbers', () => {
            expect(NumberUtils.formatWithCommas(-1234567)).toBe('-1,234,567');
        });
    });
}); 
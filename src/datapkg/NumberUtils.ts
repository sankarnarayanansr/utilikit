export class NumberUtils {
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
    static isEven(num: number): boolean {
        return num % 2 === 0;
    }

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
    static toNumber(input: string | string[]): number | number[] {
        if (Array.isArray(input)) {
            return input.map(Number);
        }
        return Number(input);
    }

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
    static isOdd(num: number): boolean {
        return num % 2 !== 0;
    }

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
    static max(numbers: number[]): number {
        return Math.max(...numbers);
    }

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
    static min(numbers: number[]): number {
        return Math.min(...numbers);
    }

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
    static sum(numbers: number[]): number {
        return numbers.reduce((acc, curr) => acc + curr, 0);
    }

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
    static average(numbers: number[]): number {
        return NumberUtils.sum(numbers) / numbers.length;
    }

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
    static round(num: number, decimalPlaces: number): number {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(num * factor) / factor;
    }

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
    static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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
    static formatWithCommas(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
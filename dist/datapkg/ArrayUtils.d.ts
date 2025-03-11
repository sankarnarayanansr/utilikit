export declare class ArrayUtils {
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
    static removeDuplicates<T>(array: T[]): T[];
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
    static intersection<T>(array1: T[], array2: T[]): T[];
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
    static difference<T>(array1: T[], array2: T[]): T[];
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
    static chunk<T>(array: T[], size: number): T[][];
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
    static deleteElement<T>(array: T[], element: T, deleteAll?: boolean): T[];
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
    static shuffle<T>(array: T[]): T[];
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
    static groupBy<T>(array: T[], key: keyof T): {
        [key: string]: T[];
    };
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
    static objectsArrayToNestedObject<T extends Record<string, any>>(array: T[], keys: (keyof T)[]): Record<string, any>;
}
//# sourceMappingURL=ArrayUtils.d.ts.map
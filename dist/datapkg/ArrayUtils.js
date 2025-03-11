"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtils = void 0;
class ArrayUtils {
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
    static removeDuplicates(array) {
        return Array.from(new Set(array));
    }
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
    static intersection(array1, array2) {
        return array1.filter(value => array2.includes(value));
    }
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
    static difference(array1, array2) {
        return array1.filter(value => !array2.includes(value));
    }
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
    static chunk(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }
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
    static deleteElement(array, element, deleteAll = false) {
        if (deleteAll) {
            return array.filter(value => value !== element);
        }
        else {
            const index = array.indexOf(element);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        }
    }
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
    static shuffle(array) {
        const result = array.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
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
    static groupBy(array, key) {
        return array.reduce((result, item) => {
            const groupKey = String(item[key]);
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
            return result;
        }, {});
    }
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
    static objectsArrayToNestedObject(array, keys) {
        return array.reduce((result, item) => {
            let current = result;
            keys.forEach((key, index) => {
                const value = String(item[key]);
                if (index === keys.length - 1) {
                    current[value] = current[value] || {};
                }
                else {
                    current[value] = current[value] || {};
                    current = current[value];
                }
            });
            return result;
        }, {});
    }
}
exports.ArrayUtils = ArrayUtils;

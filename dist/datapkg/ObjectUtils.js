"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
class ObjectUtils {
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
    static deepClone(obj) {
        const cloneInternal = (obj, visited) => {
            // Handle null, undefined, and primitive types
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
            // Handle Date objects
            if (obj instanceof Date) {
                return new Date(obj);
            }
            // Handle RegExp objects
            if (obj instanceof RegExp) {
                return new RegExp(obj);
            }
            // Handle Arrays
            if (Array.isArray(obj)) {
                if (visited.has(obj)) {
                    return visited.get(obj);
                }
                const clonedArray = [];
                visited.set(obj, clonedArray);
                clonedArray.push(...obj.map(item => cloneInternal(item, visited)));
                return clonedArray;
            }
            // Handle Objects
            if (visited.has(obj)) {
                return visited.get(obj);
            }
            const clonedObj = Object.create(Object.getPrototypeOf(obj));
            visited.set(obj, clonedObj);
            for (const [key, value] of Object.entries(obj)) {
                clonedObj[key] = cloneInternal(value, visited);
            }
            return clonedObj;
        };
        return cloneInternal(obj, new WeakMap());
    }
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
    static deepMerge(target, source) {
        if (typeof target !== 'object' || typeof source !== 'object') {
            return source;
        }
        for (const key in source) {
            if (source[key] instanceof Array) {
                if (!target[key])
                    target[key] = [];
                target[key] = target[key].concat(source[key]);
            }
            else if (source[key] instanceof Object) {
                if (!target[key])
                    target[key] = {};
                target[key] = ObjectUtils.deepMerge(target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
        return target;
    }
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
    static isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
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
    static recursiveDeleteKey(obj, keyToDelete) {
        if (typeof obj !== 'object' || obj === null)
            return;
        if (Array.isArray(obj)) {
            for (const item of obj) {
                ObjectUtils.recursiveDeleteKey(item, keyToDelete);
            }
        }
        else {
            for (const key in obj) {
                if (key === keyToDelete) {
                    delete obj[key];
                }
                else {
                    ObjectUtils.recursiveDeleteKey(obj[key], keyToDelete);
                }
            }
        }
    }
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
    static deletePropertyInPath(obj, path) {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]])
                return;
            current = current[keys[i]];
        }
        delete current[keys[keys.length - 1]];
    }
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
    static fetchDataInPath(obj, path) {
        const keys = path.split('.');
        let current = obj;
        for (const key of keys) {
            if (!current[key])
                return undefined;
            current = current[key];
        }
        return current;
    }
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
    static prettyPrint(obj) {
        return JSON.stringify(obj, null, 2);
    }
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
    static hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }
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
    static mapValues(obj, fn) {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = fn(obj[key]);
            }
        }
        return result;
    }
}
exports.ObjectUtils = ObjectUtils;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
class StringUtils {
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
    static capitalizeFirstLetter(str) {
        if (!str)
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
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
    static toCamelCase(str) {
        return str.replace(/([-_][a-z])/gi, (match) => {
            return match.toUpperCase().replace('-', '').replace('_', '');
        });
    }
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
    static toKebabCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
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
    static reverse(str) {
        return str.split('').reverse().join('');
    }
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
    static isPalindrome(str) {
        const reversed = str.split('').reverse().join('');
        return str === reversed;
    }
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
    static normalizeWhitespace(str) {
        return str.trim().replace(/\s+/g, ' ');
    }
}
exports.StringUtils = StringUtils;

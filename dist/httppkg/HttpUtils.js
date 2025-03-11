"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPUtils = void 0;
class HTTPUtils {
    /**
     * Fetches data with caching and retry capabilities.
     * @param url The URL to fetch from
     * @param options Request options including cache and retry settings
     * @returns Promise with the response data
     *
     * @example
     * // Basic fetch with cache
     * const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
     *   cache: { duration: 5000 } // Cache for 5 seconds
     * });
     *
     * // Fetch with retry
     * const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
     *   retry: { attempts: 3, delay: 1000 } // Retry 3 times with 1s delay
     * });
     *
     * // Advanced usage with stale-while-revalidate
     * const data = await HTTPUtils.fetchWithCache('https://api.example.com/data', {
     *   cache: {
     *     duration: 60000, // 1 minute cache
     *     staleWhileRevalidate: true // Return stale data while fetching fresh
     *   },
     *   retry: { attempts: 2, delay: 500 },
     *   headers: { 'Authorization': 'Bearer token' }
     * });
     */
    static fetchWithCache(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, options = {}) {
            const cacheKey = `${url}-${JSON.stringify(options)}`;
            const cached = this.cache.get(cacheKey);
            const now = Date.now();
            // Return cached data if valid
            if (cached && options.cache) {
                const isExpired = now - cached.timestamp > options.cache.duration;
                if (!isExpired || options.cache.staleWhileRevalidate) {
                    if (isExpired) {
                        // Revalidate in background
                        this.revalidateCache(url, options, cacheKey);
                    }
                    return cached.data;
                }
            }
            return this.fetchWithRetry(url, options, cacheKey);
        });
    }
    /**
     * Creates a debounced version of a function.
     * @param fn Function to debounce
     * @param options Debounce options
     * @returns Debounced function
     *
     * @example
     * // Basic debounce for search
     * const searchAPI = (query: string) => fetch(`/api/search?q=${query}`);
     * const debouncedSearch = HTTPUtils.debounce(searchAPI, {
     *   delay: 300,
     *   leading: true
     * });
     *
     * // Advanced usage with leading edge
     * const expensiveOperation = async (data: any) => {
     *   const result = await fetch('/api/process', {
     *     method: 'POST',
     *     body: JSON.stringify(data)
     *   });
     *   return result.json();
     * };
     *
     * const debouncedOp = HTTPUtils.debounce(expensiveOperation, {
     *   delay: 1000,
     *   leading: true // Execute immediately on first call
     * });
     *
     * // Usage in event handler
     * inputElement.addEventListener('input', (e) => {
     *   debouncedSearch(e.target.value);
     * });
     */
    static debounce(fn, options) {
        let timeoutId;
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            const context = this;
            if (options.leading && now - lastCall >= options.delay) {
                fn.apply(context, args);
                lastCall = now;
                return;
            }
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn.apply(context, args);
                lastCall = Date.now();
            }, options.delay);
        };
    }
    /**
     * Creates a throttled version of a function.
     * @param fn Function to throttle
     * @param options Throttle options
     * @returns Throttled function
     *
     * @example
     * // Basic throttle for API calls
     * const saveAPI = (data: any) => fetch('/api/save', {
     *   method: 'POST',
     *   body: JSON.stringify(data)
     * });
     * const throttledSave = HTTPUtils.throttle(saveAPI, {
     *   limit: 1000 // Max one call per second
     * });
     *
     * // Advanced usage with trailing edge
     * const logAnalytics = async (event: any) => {
     *   await fetch('/api/analytics', {
     *     method: 'POST',
     *     body: JSON.stringify(event)
     *   });
     * };
     *
     * const throttledLog = HTTPUtils.throttle(logAnalytics, {
     *   limit: 2000, // Max one call every 2 seconds
     *   trailing: true // Ensure last call is executed
     * });
     *
     * // Usage in scroll handler
     * window.addEventListener('scroll', () => {
     *   throttledLog({ event: 'scroll', position: window.scrollY });
     * });
     */
    static throttle(fn, options) {
        let lastCall = 0;
        let timeoutId = null;
        return function (...args) {
            const now = Date.now();
            const context = this;
            if (now - lastCall >= options.limit) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                fn.apply(context, args);
                lastCall = now;
            }
            else if (options.trailing && !timeoutId) {
                timeoutId = setTimeout(() => {
                    fn.apply(context, args);
                    lastCall = Date.now();
                    timeoutId = null;
                }, options.limit - (now - lastCall));
            }
        };
    }
    /**
     * Private helper to fetch with retry capability.
     * @param url The URL to fetch from
     * @param options Request options
     * @param cacheKey Key for caching
     * @returns Promise with the response data
     *
     * @example
     * // Internal usage example:
     * private static async example() {
     *   const url = 'https://api.example.com/data';
     *   const options = {
     *     retry: { attempts: 3, delay: 1000 },
     *     headers: { 'Accept': 'application/json' }
     *   };
     *   const cacheKey = `${url}-${JSON.stringify(options)}`;
     *
     *   try {
     *     const data = await this.fetchWithRetry(url, options, cacheKey);
     *     return data;
     *   } catch (error) {
     *     console.error('All retry attempts failed:', error);
     *     throw error;
     *   }
     * }
     */
    static fetchWithRetry(url, options, cacheKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { retry, cache } = options, fetchOptions = __rest(options, ["retry", "cache"]);
            let lastError = null;
            for (let i = 0; i <= ((retry === null || retry === void 0 ? void 0 : retry.attempts) || 0); i++) {
                try {
                    const response = yield fetch(url, fetchOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = yield response.json();
                    // Cache the successful response
                    if (options.cache) {
                        this.cache.set(cacheKey, {
                            data,
                            timestamp: Date.now()
                        });
                    }
                    return data;
                }
                catch (error) {
                    lastError = error;
                    if (i < ((retry === null || retry === void 0 ? void 0 : retry.attempts) || 0)) {
                        yield new Promise(resolve => setTimeout(resolve, (retry === null || retry === void 0 ? void 0 : retry.delay) || 1000));
                    }
                }
            }
            throw lastError || new Error('Failed to fetch');
        });
    }
    /**
     * Private helper to revalidate cached data in the background.
     * @param url The URL to fetch from
     * @param options Request options
     * @param cacheKey Key for caching
     *
     * @example
     * // Internal usage example:
     * private static async example() {
     *   const url = 'https://api.example.com/data';
     *   const options = {
     *     cache: { duration: 5000 },
     *     headers: { 'Accept': 'application/json' }
     *   };
     *   const cacheKey = `${url}-${JSON.stringify(options)}`;
     *
     *   // Background revalidation
     *   await this.revalidateCache(url, options, cacheKey);
     *   // Continue execution without waiting for revalidation
     * }
     */
    static revalidateCache(url, options, cacheKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cache, retry } = options, fetchOptions = __rest(options, ["cache", "retry"]);
                const response = yield fetch(url, fetchOptions);
                if (response.ok) {
                    const data = yield response.json();
                    this.cache.set(cacheKey, {
                        data,
                        timestamp: Date.now()
                    });
                }
            }
            catch (error) {
                console.error('Background revalidation failed:', error);
            }
        });
    }
    /**
     * Makes a GET request
     * @param url The URL to fetch from
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static get(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, options = {}) {
            return this.fetchWithCache(url, Object.assign(Object.assign({}, options), { method: 'GET' }));
        });
    }
    /**
     * Makes a POST request
     * @param url The URL to fetch from
     * @param body The request body
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static post(url_1, body_1) {
        return __awaiter(this, arguments, void 0, function* (url, body, options = {}) {
            return this.fetchWithCache(url, Object.assign(Object.assign({}, options), { method: 'POST', body: JSON.stringify(body), headers: Object.assign({ 'Content-Type': 'application/json' }, options.headers) }));
        });
    }
    /**
     * Makes a PUT request
     * @param url The URL to fetch from
     * @param body The request body
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static put(url_1, body_1) {
        return __awaiter(this, arguments, void 0, function* (url, body, options = {}) {
            return this.fetchWithCache(url, Object.assign(Object.assign({}, options), { method: 'PUT', body: JSON.stringify(body), headers: Object.assign({ 'Content-Type': 'application/json' }, options.headers) }));
        });
    }
    /**
     * Makes a DELETE request
     * @param url The URL to fetch from
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static delete(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, options = {}) {
            return this.fetchWithCache(url, Object.assign(Object.assign({}, options), { method: 'DELETE' }));
        });
    }
}
exports.HTTPUtils = HTTPUtils;
HTTPUtils.cache = new Map();

interface CacheOptions {
    /** Cache duration in milliseconds */
    duration: number;
    /** Whether to return stale data while revalidating */
    staleWhileRevalidate?: boolean;
}
interface RequestOptions extends Omit<RequestInit, 'cache'> {
    /** Cache configuration */
    cache?: CacheOptions;
    /** Retry configuration */
    retry?: {
        attempts: number;
        delay: number;
    };
}
type DebounceOptions = {
    /** Delay in milliseconds */
    delay: number;
    /** Whether to call the function at the leading edge */
    leading?: boolean;
};
type ThrottleOptions = {
    /** Limit in milliseconds */
    limit: number;
    /** Whether to call the function at the trailing edge */
    trailing?: boolean;
};
export declare class HTTPUtils {
    private static cache;
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
    static fetchWithCache<T>(url: string, options?: RequestOptions): Promise<T>;
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
    static debounce<T extends (...args: any[]) => any>(fn: T, options: DebounceOptions): (...args: Parameters<T>) => void;
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
    static throttle<T extends (...args: any[]) => any>(fn: T, options: ThrottleOptions): (...args: Parameters<T>) => void;
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
    private static fetchWithRetry;
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
    private static revalidateCache;
    /**
     * Makes a GET request
     * @param url The URL to fetch from
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static get<T>(url: string, options?: RequestOptions): Promise<T>;
    /**
     * Makes a POST request
     * @param url The URL to fetch from
     * @param body The request body
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static post<T>(url: string, body: any, options?: RequestOptions): Promise<T>;
    /**
     * Makes a PUT request
     * @param url The URL to fetch from
     * @param body The request body
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static put<T>(url: string, body: any, options?: RequestOptions): Promise<T>;
    /**
     * Makes a DELETE request
     * @param url The URL to fetch from
     * @param options Additional request options
     * @returns Promise with the response data
     */
    static delete<T>(url: string, options?: RequestOptions): Promise<T>;
}
export {};
//# sourceMappingURL=HttpUtils.d.ts.map
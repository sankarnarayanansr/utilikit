export declare class ParallelUtil {
    /**
     * Detect if environment supports Web Workers
     */
    private static isWebWorkerSupported;
    /**
     * Runs tasks in parallel using Web Workers or Node.js Worker Threads
     */
    static runParallel<T, R>(tasks: T[], workerFunction: (data: T) => R, numWorkers?: number): Promise<R[]>;
    /**
     * Runs tasks in parallel using Web Workers (for browser)
     */
    private static runParallelWithWebWorker;
    /**
     * Runs tasks in parallel using Node.js Worker Threads
     */
    private static runParallelWithNodeWorker;
    /**
     * Executes a single heavy task asynchronously
     */
    static computeAsync<T, R>(computation: (data: T) => R, data: T): Promise<R>;
}
//# sourceMappingURL=parallelUtils.d.ts.map
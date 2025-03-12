import { Worker as NodeWorker, isMainThread, parentPort } from 'worker_threads';

/**
 * Type for a task that can be executed in parallel
 */
type ParallelTask<T, R> = {
    data: T;
    taskId: string;
};

/**
 * Type for the result of a parallel task
 */
type ParallelResult<R> = {
    result: R;
    taskId: string;
};

/**
 * Utility class for executing tasks in parallel across multiple workers
 * Supports both browser Web Workers and Node.js Worker Threads
 */
export class ParallelUtil {
    /**
     * Detect if environment supports Web Workers
     * @returns Boolean indicating if Web Workers are available
     */
    private static isWebWorkerSupported(): boolean {
        return typeof window !== 'undefined' && typeof Worker !== 'undefined';
    }

    /**
     * Runs tasks in parallel using Web Workers or Node.js Worker Threads
     * @param tasks Array of task data to be processed
     * @param workerFunction Function to execute on each task
     * @param numWorkers Number of parallel workers to use (defaults to hardware concurrency or 4)
     * @returns Promise resolving to array of results in the same order as input tasks
     * 
     * @example
     * // Process array of data in parallel
     * const data = [1, 2, 3, 4, 5];
     * const results = await ParallelUtil.runParallel(data, (num) => {
     *   return num * num; // Square each number
     * });
     * console.log(results); // [1, 4, 9, 16, 25]
     * 
     * @example
     * // Image processing with multiple workers
     * const imageData = [buffer1, buffer2, buffer3];
     * const processedImages = await ParallelUtil.runParallel(
     *   imageData,
     *   (buffer) => applyImageFilter(buffer),
     *   navigator.hardwareConcurrency
     * );
     */
    static async runParallel<T, R>(
        tasks: T[],
        workerFunction: (data: T) => R,
        numWorkers: number = (typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 4) || 4
    ): Promise<R[]> {
        if (this.isWebWorkerSupported()) {
            return this.runParallelWithWebWorker(tasks, workerFunction, numWorkers);
        }
        return this.runParallelWithNodeWorker(tasks, workerFunction, numWorkers);
    }

    /**
     * Runs tasks in parallel using Web Workers (for browser)
     * @param tasks Array of task data to be processed
     * @param workerFunction Function to execute on each task
     * @param numWorkers Number of parallel workers to use
     * @returns Promise resolving to array of results in the same order as input tasks
     * 
     * @private
     */
    private static async runParallelWithWebWorker<T, R>(
        tasks: T[],
        workerFunction: (data: T) => R,
        numWorkers: number
    ): Promise<R[]> {
        const workerCode = `
            self.onmessage = function(e) {
                const { data, taskId } = e.data;
                const result = (${workerFunction.toString()})(data);
                self.postMessage({ result, taskId });
            }
        `;
        // Create blob and attach the worker code text for our custom environment.
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        (blob as any)._text = workerCode;
        const workerUrl = URL.createObjectURL(blob);

        // For simplicity, create one worker per task.
        const results = new Map<string, R>();
        const promises = tasks.map((data, index) => {
            return new Promise<void>((resolve) => {
                const worker = new Worker(workerUrl);
                worker.onmessage = (e: MessageEvent<ParallelResult<R>>) => {
                    results.set(e.data.taskId, e.data.result);
                    worker.terminate();
                    resolve();
                };
                worker.postMessage({ data, taskId: `task_${index}` });
            });
        });

        await Promise.all(promises);
        URL.revokeObjectURL(workerUrl);
        return tasks.map((_, index) => results.get(`task_${index}`)!);
    }

    /**
     * Runs tasks in parallel using Node.js Worker Threads
     * @param tasks Array of task data to be processed
     * @param workerFunction Function to execute on each task
     * @param numWorkers Number of parallel workers to use
     * @returns Promise resolving to array of results in the same order as input tasks
     * 
     * @private
     */
    private static async runParallelWithNodeWorker<T, R>(
        tasks: T[],
        workerFunction: (data: T) => R,
        numWorkers: number
    ): Promise<R[]> {
        const workerCode = `
            const { parentPort } = require('worker_threads');
            parentPort.on('message', (e) => {
                const func = new Function('data', 'return (' + e.funcString + ')(data)');
                const result = func(e.data);
                parentPort.postMessage({ result, taskId: e.taskId });
            });
        `;
        const workers = Array.from({ length: numWorkers }, () => new NodeWorker(workerCode, { eval: true }));
        const results = new Map<string, R>();

        await Promise.all(tasks.map((data, index) => {
            return new Promise<void>((resolve) => {
                const worker = workers[index % numWorkers];
                worker.on('message', (e: { result: R; taskId: string }) => {
                    results.set(e.taskId, e.result);
                    resolve();
                });
                worker.postMessage({ data, taskId: `task_${index}`, funcString: workerFunction.toString() });
            });
        }));

        workers.forEach(worker => worker.terminate());
        return tasks.map((_, index) => results.get(`task_${index}`)!);
    }

    /**
     * Executes a single heavy task asynchronously
     * @param computation Function to execute on the data
     * @param data Input data for the computation
     * @returns Promise resolving to the result of the computation
     * 
     * @example
     * // Execute CPU-intensive calculation without blocking the main thread
     * const result = await ParallelUtil.computeAsync((data) => {
     *   // Perform expensive calculation
     *   return fibonacci(data);
     * }, 42);
     * 
     * @example
     * // Process large dataset in background
     * const processedData = await ParallelUtil.computeAsync((rawData) => {
     *   // Transform or analyze the data
     *   return rawData.map(item => transform(item)).filter(item => validate(item));
     * }, largeDataset);
     */
    static async computeAsync<T, R>(
        computation: (data: T) => R,
        data: T
    ): Promise<R> {
        return (await this.runParallel([data], computation))[0];
    }
}
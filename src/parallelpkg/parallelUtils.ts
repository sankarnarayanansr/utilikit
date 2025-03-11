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

export class ParallelUtil {
    /**
     * Detect if environment supports Web Workers
     */
    private static isWebWorkerSupported(): boolean {
        return typeof window !== 'undefined' && typeof Worker !== 'undefined';
    }

    /**
     * Runs tasks in parallel using Web Workers or Node.js Worker Threads
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
     */
    static async computeAsync<T, R>(
        computation: (data: T) => R,
        data: T
    ): Promise<R> {
        return (await this.runParallel([data], computation))[0];
    }
}

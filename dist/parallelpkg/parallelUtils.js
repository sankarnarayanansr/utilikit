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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallelUtil = void 0;
const worker_threads_1 = require("worker_threads");
class ParallelUtil {
    /**
     * Detect if environment supports Web Workers
     */
    static isWebWorkerSupported() {
        return typeof window !== 'undefined' && typeof Worker !== 'undefined';
    }
    /**
     * Runs tasks in parallel using Web Workers or Node.js Worker Threads
     */
    static runParallel(tasks_1, workerFunction_1) {
        return __awaiter(this, arguments, void 0, function* (tasks, workerFunction, numWorkers = (typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 4) || 4) {
            if (this.isWebWorkerSupported()) {
                return this.runParallelWithWebWorker(tasks, workerFunction, numWorkers);
            }
            return this.runParallelWithNodeWorker(tasks, workerFunction, numWorkers);
        });
    }
    /**
     * Runs tasks in parallel using Web Workers (for browser)
     */
    static runParallelWithWebWorker(tasks, workerFunction, numWorkers) {
        return __awaiter(this, void 0, void 0, function* () {
            const workerCode = `
            self.onmessage = function(e) {
                const { data, taskId } = e.data;
                const result = (${workerFunction.toString()})(data);
                self.postMessage({ result, taskId });
            }
        `;
            // Create blob and attach the worker code text for our custom environment.
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            blob._text = workerCode;
            const workerUrl = URL.createObjectURL(blob);
            // For simplicity, create one worker per task.
            const results = new Map();
            const promises = tasks.map((data, index) => {
                return new Promise((resolve) => {
                    const worker = new Worker(workerUrl);
                    worker.onmessage = (e) => {
                        results.set(e.data.taskId, e.data.result);
                        worker.terminate();
                        resolve();
                    };
                    worker.postMessage({ data, taskId: `task_${index}` });
                });
            });
            yield Promise.all(promises);
            URL.revokeObjectURL(workerUrl);
            return tasks.map((_, index) => results.get(`task_${index}`));
        });
    }
    /**
     * Runs tasks in parallel using Node.js Worker Threads
     */
    static runParallelWithNodeWorker(tasks, workerFunction, numWorkers) {
        return __awaiter(this, void 0, void 0, function* () {
            const workerCode = `
            const { parentPort } = require('worker_threads');
            parentPort.on('message', (e) => {
                const func = new Function('data', 'return (' + e.funcString + ')(data)');
                const result = func(e.data);
                parentPort.postMessage({ result, taskId: e.taskId });
            });
        `;
            const workers = Array.from({ length: numWorkers }, () => new worker_threads_1.Worker(workerCode, { eval: true }));
            const results = new Map();
            yield Promise.all(tasks.map((data, index) => {
                return new Promise((resolve) => {
                    const worker = workers[index % numWorkers];
                    worker.on('message', (e) => {
                        results.set(e.taskId, e.result);
                        resolve();
                    });
                    worker.postMessage({ data, taskId: `task_${index}`, funcString: workerFunction.toString() });
                });
            }));
            workers.forEach(worker => worker.terminate());
            return tasks.map((_, index) => results.get(`task_${index}`));
        });
    }
    /**
     * Executes a single heavy task asynchronously
     */
    static computeAsync(computation, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.runParallel([data], computation))[0];
        });
    }
}
exports.ParallelUtil = ParallelUtil;

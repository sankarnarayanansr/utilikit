import { ParallelUtil } from '../../src/parallelpkg/parallelUtils';

describe('ParallelUtil (Node.js Worker Threads)', () => {
    it('should execute tasks in parallel using Node.js Worker Threads', async () => {
        const tasks = [1, 2, 3];
        const workerFn = (n: number) => n * 2;

        const result = await ParallelUtil.runParallel(tasks, workerFn);
        expect(result).toEqual([2, 4, 6]);
    });

    it('should handle empty tasks', async () => {
        const result = await ParallelUtil.runParallel([], (n: number) => n * 2);
        expect(result).toEqual([]);
    });
});

import { ParallelUtil } from '../../src/parallelpkg/parallelUtils';

describe('ParallelUtil', () => {
    beforeEach(() => {
        // Mock Worker and URL
        global.Worker = jest.fn().mockImplementation(() => {
            let onmessage: ((e: any) => void) | null = null;
            return {
                postMessage: jest.fn(({ data, taskId }) => {
                    setTimeout(() => {
                        const result = data * 2;
                        if (onmessage) {
                            onmessage({ data: { result, taskId } });
                        }
                    }, 0);
                }),
                terminate: jest.fn(),
                set onmessage(handler: any) {
                    onmessage = handler;
                }
            };
        });

        global.URL.createObjectURL = jest.fn().mockReturnValue('blob:test');
        global.URL.revokeObjectURL = jest.fn();
    });

    describe('runParallel', () => {
        it('should process tasks in parallel', async () => {
            const tasks = [1, 2, 3];
            const workerFn = (n: number) => n * 2;

            const result = await ParallelUtil.runParallel(tasks, workerFn);
            expect(result).toEqual([2, 4, 6]);
        });

        it('should handle empty task array', async () => {
            const result = await ParallelUtil.runParallel([], (n: number) => n * 2);
            expect(result).toEqual([]);
        });

        it('should use fallback when Web Workers are not supported', async () => {
            // Simulate Worker not being supported
            global.Worker = undefined as any;

            const tasks = [1, 2, 3];
            const workerFn = (n: number) => n * 2;

            const result = await ParallelUtil.runParallel(tasks, workerFn);
            expect(result).toEqual([2, 4, 6]);
        });
    });

    describe('computeAsync', () => {
        it('should execute computation in worker thread', async () => {
            const computation = (n: number) => n * n;
            const input = 5;

            const result = await ParallelUtil.computeAsync(computation, input);
            expect(result).toBe(25);
        });

        it('should use fallback when Web Workers are not supported', async () => {
            global.Worker = undefined as any;

            const computation = (n: number) => n * n;
            const input = 5;

            const result = await ParallelUtil.computeAsync(computation, input);
            expect(result).toBe(25);
        });

        
    });
});

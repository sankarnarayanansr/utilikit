/**
 * @jest-environment node
 */
import { ParallelUtil } from '../../src/parallelpkg/parallelUtils';

// Override isWebWorkerSupported to force the fallback
ParallelUtil['isWebWorkerSupported'] = () => false;

describe('ParallelUtil.computeAsync (Fallback)', () => {
  it('should compute asynchronously using fallback', async () => {
    const computation = (n: number) => n * n;
    const result = await ParallelUtil.computeAsync(computation, 5);
    expect(result).toBe(25);
  });
});

import { StringUtils } from '../../src/datapkg/StringUtils';

describe('StringUtils', () => {
    describe('capitalizeFirstLetter', () => {
        it('should capitalize first letter', () => {
            expect(StringUtils.capitalizeFirstLetter('hello')).toBe('Hello');
        });

        it('should handle empty string', () => {
            expect(StringUtils.capitalizeFirstLetter('')).toBe('');
        });
    });

    // Add more tests for other StringUtils methods...
}); 
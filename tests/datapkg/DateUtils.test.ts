import { DateUtils } from '../../src/datapkg/DateUtils';

describe('DateUtils', () => {
    describe('getCurrentDate', () => {
        it('should return current date in YYYY-MM-DD format', () => {
            const result = DateUtils.getCurrentDate();
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            
            const today = new Date();
            const expected = today.toISOString().split('T')[0];
            expect(result).toBe(expected);
        });
    });

    describe('addDays', () => {
        it('should add days to date', () => {
            const date = new Date('2024-01-15');
            const result = DateUtils.addDays(date, 5);
            expect(result.toISOString().split('T')[0]).toBe('2024-01-20');
        });

        it('should handle month rollover', () => {
            const date = new Date('2024-01-30');
            const result = DateUtils.addDays(date, 5);
            expect(result.toISOString().split('T')[0]).toBe('2024-02-04');
        });

        it('should handle year rollover', () => {
            const date = new Date('2024-12-30');
            const result = DateUtils.addDays(date, 5);
            expect(result.toISOString().split('T')[0]).toBe('2025-01-04');
        });

        it('should not modify original date', () => {
            const date = new Date('2024-01-15');
            const original = date.toISOString();
            DateUtils.addDays(date, 5);
            expect(date.toISOString()).toBe(original);
        });
    });

    describe('subtractDays', () => {
        it('should subtract days from date', () => {
            const date = new Date('2024-01-15');
            const result = DateUtils.subtractDays(date, 5);
            expect(result.toISOString().split('T')[0]).toBe('2024-01-10');
        });

        it('should handle month rollback', () => {
            const date = new Date('2024-02-02');
            const result = DateUtils.subtractDays(date, 5);
            expect(result.toISOString().split('T')[0]).toBe('2024-01-28');
        });

        it('should handle year rollback', () => {
            const date = new Date('2024-01-02');
            const result = DateUtils.subtractDays(date, 5);
            expect(result.toISOString().split('T')[0]).toBe('2023-12-28');
        });
    });

    describe('differenceInDays', () => {
        it('should calculate positive difference', () => {
            const date1 = new Date('2024-01-15');
            const date2 = new Date('2024-01-20');
            expect(DateUtils.differenceInDays(date1, date2)).toBe(5);
        });

        it('should calculate negative difference', () => {
            const date1 = new Date('2024-01-20');
            const date2 = new Date('2024-01-15');
            expect(DateUtils.differenceInDays(date1, date2)).toBe(5);
        });

        it('should handle same day', () => {
            const date1 = new Date('2024-01-15');
            const date2 = new Date('2024-01-15');
            expect(DateUtils.differenceInDays(date1, date2)).toBe(0);
        });
    });

    describe('isPast', () => {
        it('should identify past dates', () => {
            const pastDate = new Date(Date.now() - 86400000); // Yesterday
            expect(DateUtils.isPast(pastDate)).toBe(true);
        });

        it('should identify non-past dates', () => {
            const futureDate = new Date(Date.now() + 86400000); // Tomorrow
            expect(DateUtils.isPast(futureDate)).toBe(false);
        });
    });

    describe('isFuture', () => {
        it('should identify future dates', () => {
            const futureDate = new Date(Date.now() + 86400000); // Tomorrow
            expect(DateUtils.isFuture(futureDate)).toBe(true);
        });

        it('should identify non-future dates', () => {
            const pastDate = new Date(Date.now() - 86400000); // Yesterday
            expect(DateUtils.isFuture(pastDate)).toBe(false);
        });
    });

    describe('formatDate', () => {
        it('should format date with YYYY-MM-DD pattern', () => {
            const date = new Date('2024-01-15T14:30:45');
            expect(DateUtils.formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
        });

        it('should format date with DD/MM/YYYY pattern', () => {
            const date = new Date('2024-01-15T14:30:45');
            expect(DateUtils.formatDate(date, 'DD/MM/YYYY')).toBe('15/01/2024');
        });

        it('should format date with time components', () => {
            const date = new Date('2024-01-15T14:30:45');
            expect(DateUtils.formatDate(date, 'YYYY-MM-DD HH:mm:ss'))
                .toBe('2024-01-15 14:30:45');
        });

        it('should handle single digit values', () => {
            const date = new Date('2024-01-05T04:05:06');
            expect(DateUtils.formatDate(date, 'DD/MM/YYYY HH:mm:ss'))
                .toBe('05/01/2024 04:05:06');
        });
    });
}); 
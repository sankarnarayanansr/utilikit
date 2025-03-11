export class DateUtils {
    /**
     * Gets the current date in YYYY-MM-DD format.
     * @returns Current date as string
     * 
     * @example
     * const today = DateUtils.getCurrentDate();
     * // If today is January 15, 2024
     * // Result: "2024-01-15"
     */
    static getCurrentDate(): string {
        const date = new Date();
        return date.toISOString().split('T')[0];
    }

    /**
     * Adds specified number of days to a date.
     * @param date The starting date
     * @param days Number of days to add
     * @returns New date with added days
     * 
     * @example
     * const date = new Date('2024-01-15');
     * const newDate = DateUtils.addDays(date, 5);
     * // Result: 2024-01-20
     */
    static addDays(date: Date, days: number): Date {
        const result = new Date(date.getTime());
        result.setDate(result.getDate() + days);
        return result;
    }

    /**
     * Subtracts specified number of days from a date.
     * @param date The starting date
     * @param days Number of days to subtract
     * @returns New date with subtracted days
     * 
     * @example
     * const date = new Date('2024-01-15');
     * const newDate = DateUtils.subtractDays(date, 5);
     * // Result: 2024-01-10
     */
    static subtractDays(date: Date, days: number): Date {
        return this.addDays(date, -days);
    }

    /**
     * Calculates the difference in days between two dates.
     * @param date1 First date
     * @param date2 Second date
     * @returns Number of days between the dates
     * 
     * @example
     * const date1 = new Date('2024-01-15');
     * const date2 = new Date('2024-01-20');
     * const diff = DateUtils.differenceInDays(date1, date2);
     * // Result: 5
     */
    static differenceInDays(date1: Date, date2: Date): number {
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Checks if a date is in the past.
     * @param date Date to check
     * @returns True if date is in the past
     * 
     * @example
     * const pastDate = new Date('2023-01-15');
     * const isPast = DateUtils.isPast(pastDate);
     * // Result: true (assuming current date is after Jan 15, 2023)
     * 
     * const futureDate = new Date('2025-01-15');
     * const isPastFuture = DateUtils.isPast(futureDate);
     * // Result: false
     */
    static isPast(date: Date): boolean {
        return date < new Date();
    }

    /**
     * Checks if a date is in the future.
     * @param date Date to check
     * @returns True if date is in the future
     * 
     * @example
     * const futureDate = new Date('2025-01-15');
     * const isFuture = DateUtils.isFuture(futureDate);
     * // Result: true (assuming current date is before Jan 15, 2025)
     * 
     * const pastDate = new Date('2023-01-15');
     * const isFuturePast = DateUtils.isFuture(pastDate);
     * // Result: false
     */
    static isFuture(date: Date): boolean {
        return date > new Date();
    }

    /**
     * Formats a date according to the specified format string.
     * Supported tokens: YYYY (year), MM (month), DD (day),
     * HH (hours), mm (minutes), ss (seconds)
     * @param date Date to format
     * @param format Format string
     * @returns Formatted date string
     * 
     * @example
     * const date = new Date('2024-01-15T14:30:45');
     * 
     * const format1 = DateUtils.formatDate(date, 'YYYY-MM-DD');
     * // Result: "2024-01-15"
     * 
     * const format2 = DateUtils.formatDate(date, 'DD/MM/YYYY HH:mm:ss');
     * // Result: "15/01/2024 14:30:45"
     * 
     * const format3 = DateUtils.formatDate(date, 'MM/DD/YYYY');
     * // Result: "01/15/2024"
     */
    static formatDate(date: Date, format: string): string {
        const map: { [key: string]: string } = {
            'YYYY': date.getFullYear().toString(),
            'MM': ('0' + (date.getMonth() + 1)).slice(-2),
            'DD': ('0' + date.getDate()).slice(-2),
            'HH': ('0' + date.getHours()).slice(-2),
            'mm': ('0' + date.getMinutes()).slice(-2),
            'ss': ('0' + date.getSeconds()).slice(-2),
        };

        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, matched => map[matched]);
    }
}
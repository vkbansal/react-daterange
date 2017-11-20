export function callIfExists(callback: any, ...args: any[]) {
    if (typeof callback === 'function') {
        callback(...args);
    }
}

export function range(start: number, end: number, step: number = 1) {
    let index = -1;
    let length = Math.max(Math.ceil((end - start) / step), 0);
    const result = new Array(length);

    while (length--) {
        result[++index] = start;
        start += step;
    }
    return result;
}

export function setDay(date: Date, day: number): Date {
    let newDate = new Date(date.getTime());

    newDate.setDate(day);

    return newDate;
}

export function addDays(date: Date, days: number): Date {
    return setDay(date, date.getDate() + days);
}

export function setMonth(date: Date, month: number): Date {
    let newDate = new Date(date.getTime());

    newDate.setMonth(month);

    return newDate;
}

export function addMonths(date: Date, months: number): Date {
    return setMonth(date, date.getMonth() + months);
}

export function setYear(date: Date, year: number): Date {
    let newDate = new Date(date.getTime());

    newDate.setFullYear(year);

    return newDate;
}

export function startOfMonth(date: Date): Date {
    let newDate = new Date(date.getTime());

    newDate.setDate(1);
    newDate.setHours(0, 0, 0, 0);

    return newDate;
}

export function endOfMonth(date: Date): Date {
    let newDate = new Date(date.getTime());

    newDate.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
    newDate.setHours(23, 59, 59, 999);

    return newDate;
}

export function isSameMonth(dateLeft: Date, dateRight: Date): boolean {
    return (
        dateLeft.getFullYear() === dateRight.getFullYear() &&
        dateLeft.getMonth() === dateRight.getMonth()
    );
}

export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
    return (
        dateLeft.getFullYear() === dateRight.getFullYear() &&
        dateLeft.getMonth() === dateRight.getMonth() &&
        dateLeft.getDate() === dateRight.getDate()
    );
}

export function isDayAfter(date: Date, dateToCompare: Date): boolean {
    let newDate = new Date(date.getTime());
    let newDateToCompare = new Date(dateToCompare.getTime());

    newDate.setHours(0, 0, 0, 0);
    newDateToCompare.setHours(0, 0, 0, 0);

    return newDate.getTime() > newDateToCompare.getTime();
}

export function isDayBefore(date: Date, dateToCompare: Date): boolean {
    let newDate = new Date(date.getTime());
    let newDateToCompare = new Date(dateToCompare.getTime());

    newDate.setHours(0, 0, 0, 0);
    newDateToCompare.setHours(0, 0, 0, 0);

    return newDate.getTime() < newDateToCompare.getTime();
}

export function ISODateString(date: Date): string {
    return date.toISOString().slice(0, 10);
}

export const LOCALE_EN = {
    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
};

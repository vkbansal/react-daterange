const MILLISECONS_IN_WEEKS = 1000 * 60 * 60 * 24 * 7;

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

export function startOfWeek(date: Date, iso?: boolean): Date {
    let sw = new Date(date.getTime());

    sw.setDate(sw.getDate() - sw.getDay() + (iso ? 1 : 0));
    sw.setHours(0, 0, 0, 0);

    return sw;
}

export function startOfYear(date: Date, iso?: boolean): Date {
    let sy = new Date(date.getTime());

    if (iso) {
        sy.setFullYear(sy.getFullYear(), 0, 4);
        sy.setHours(0, 0, 0, 0);

        return sy;
    }

    sy.setFullYear(sy.getFullYear(), 0, 1);
    sy.setHours(0, 0, 0, 0);

    return sy;
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

export function getWeeksInMonth(date: Date, isoWeeks?: boolean): number {
    const sm = startOfMonth(date);
    let fd = sm.getDay();

    if (isoWeeks) fd = (fd + 6) % 7;

    const em = endOfMonth(date);

    return Math.ceil((em.getDate() + fd) / 7);
}

export function getWeekNumber(date: Date, iso?: boolean): number {
    let sw = startOfWeek(date, iso);
    let sy = startOfYear(date, iso);

    if (iso) sy = startOfWeek(sy, true);

    const diff = Math.round((sw.getTime() - sy.getTime()) / MILLISECONS_IN_WEEKS);

    return diff + 1;
}

const padZero = (i: string | number) => `0${i}`.slice(-2);

export function formatDateDefault(date: Date): string {
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
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

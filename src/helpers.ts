import * as parse from 'date-fns/parse';

export const DEFAULT_FORMAT = 'YYYY-MM-DD';

export function parseDate(date: Date | string, format?: string): Date {
    return typeof date === 'string' ? parse(date, format || DEFAULT_FORMAT, new Date()) : date;
}

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

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = { [P in Diff<keyof T, K>]: T[P] };
export type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;

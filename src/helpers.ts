import parse from 'date-fns/parse';

export function parseDate(date: Date | string, format: string): Date {
    return typeof date === 'string' ? parse(date, format, new Date()) : date;
}

export function callIfExists(callback: any, ...args: any[]) {
    if (typeof callback === 'function') {
        callback(...args);
    }
}

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = { [P in Diff<keyof T, K>]: T[P] };
export type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;

import parse from 'date-fns/parse';
import startOfMonth from 'date-fns/startOfMonth';

export function getStartofMonth(date: Date | string, format: string): Date {
    return startOfMonth(typeof date === 'string' ? parse(date, format, new Date()) : date);
}

export function parseDate(date: Date | string, format: string): Date {
    return typeof date === 'string' ? parse(date, format, new Date()) : date;
}

export function callIfExists(callback: any, ...args: any[]) {
    if (typeof callback === 'function') {
        callback(...args);
    }
}

export const padZero = (i: string | number) => `0${i}`.slice(-2);

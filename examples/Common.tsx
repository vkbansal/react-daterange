import glamorous, { CSSProperties } from 'glamorous';
import * as React from 'react';

import { addDays, formatDateDefault } from '../src/helpers';

export const monthNames: Map<string, Array<string>> = new Map([
    // ['en', en.months()],
    // ['es', es.months()],
    // ['fr', fr.months()],
    // ['it', it.months()],
    // ['ja', ja.months()],
    // ['zh-CN', zhCN.months()],
    // ['zh-TW', zhTW.months()]
]);

export const daysOfWeek: Map<string, Array<string>> = new Map([
    // ['en', en.weekdays({ type: 'narrow' })],
    // ['es', es.weekdays({ type: 'narrow' })],
    // ['fr', fr.weekdays({ type: 'narrow' })],
    // ['it', it.weekdays({ type: 'narrow' })],
    // ['ja', ja.weekdays({ type: 'narrow' })],
    // ['zh-CN', zhCN.weekdays({ type: 'narrow' })],
    // ['zh-TW', zhTW.weekdays({ type: 'narrow' })]
]);

export const Wrapper = glamorous('div')({
    display: 'flex'
});

interface ColumnProps {
    position?: CSSProperties['position'];
}

export const Column = glamorous('div')<ColumnProps>(
    {
        width: '50%'
    },
    props => ({
        position: props.position || 'static'
    })
);

export const Checkbox = glamorous('input')({
    margin: '0 8px'
});

export function APIdate(checked: boolean, onChange: (e: any) => void) {
    return (
        <div>
            <h4>
                <code>date?: Date | string</code>
                <Checkbox type="checkbox" name="startDate" onChange={onChange} checked={checked} />
                {formatDateDefault(new Date())}
            </h4>
            <span>This date will be marked as selected date in UI</span>
        </div>
    );
}

export function APIstartDate(checked: boolean, onChange: (e: any) => void) {
    return (
        <div>
            <h4>
                <code>startDate?: Date | string</code>
                <Checkbox type="checkbox" name="startDate" onChange={onChange} checked={checked} />
                {formatDateDefault(new Date())}
            </h4>
            <span>This date will be marked as start date in UI</span>
        </div>
    );
}

export function APIendDate(checked: boolean, onChange: (e: any) => void) {
    return (
        <div>
            <h4>
                <code>endDate?: Date | string</code>
                <Checkbox type="checkbox" name="startDate" onChange={onChange} checked={checked} />
                {formatDateDefault(addDays(new Date(), 7))}
            </h4>
            <span>This date will be marked as end date in UI</span>
        </div>
    );
}

export function APIminDate(checked: boolean, onChange: (e: any) => void) {
    return (
        <div>
            <h4>
                <code>minDate?: Date | string</code>
                <Checkbox type="checkbox" name="minDate" onChange={onChange} checked={checked} />
                {formatDateDefault(addDays(new Date(), -5))}
            </h4>
            <span>The earliest date a user may select</span>
        </div>
    );
}

export function APImaxDate(checked: boolean, onChange: (e: any) => void) {
    return (
        <div>
            <h4>
                <code>maxDate?: Date | string</code>
                <Checkbox type="checkbox" name="minDate" onChange={onChange} checked={checked} />
                {formatDateDefault(addDays(new Date(), 20))}
            </h4>
            <span>The latest date a user may select</span>
        </div>
    );
}

export function APIshowDropdowns(checked: boolean, onChange: (e: any) => void) {
    return (
        <div>
            <h4>
                <code>showDropdowns?: boolean</code>
                <Checkbox
                    type="checkbox"
                    name="showDropdowns"
                    onChange={onChange}
                    checked={checked}
                />
            </h4>
            <span>
                Show year and month select boxes above calendars to jump to a specific month and
                year
            </span>
        </div>
    );
}

export function APIindividualCalendars(checked: boolean, onChange: (e: any) => void) {
    return (
        <div>
            <h4>
                <code>individualCalendars?: boolean</code>
                <Checkbox
                    type="checkbox"
                    name="individualCalendars"
                    onChange={onChange}
                    checked={checked}
                />
            </h4>
            <span>
                By default, the two calendars displayed will always be for two sequential months
                (i.e. January and February), and both will be advanced when clicking the left or
                right arrows above the calendars.<br />
                When enabled, the two calendars can be individually advanced and display any
                month/year.
            </span>
        </div>
    );
}

export function APIlocaleFormat() {
    return (
        <div>
            <h4>
                <code>locale.format?: string</code>
            </h4>
            <span>Format to be used for parsing string date. Default: 'YYYY-MM-DD'</span>
        </div>
    );
}

function map<A, B, C>(m: Map<A, B>, callback: (v: B, k: A, m: Map<A, B>) => C): C[] {
    let array: C[] = [];

    m.forEach((value, key) => {
        array.push(callback(value, key, m));
    });

    return array;
}

export function APIlocaleMonthNames(type: string, onChange: (type: string) => (e: any) => void) {
    return (
        <div>
            <h4>
                <code>{'locale.monthNames?: Array<string>'}</code>
            </h4>
            <span>Localized strings for month names</span>
            <ul>
                {map(monthNames, (months, lang) => {
                    return (
                        <li key={lang}>
                            <details>
                                <summary>
                                    {lang}
                                    <Checkbox
                                        type="radio"
                                        name="monthNames"
                                        onChange={onChange(lang)}
                                        checked={type === lang}
                                    />
                                </summary>
                                <ul>{months.map((m, i) => <li key={i}>{m}</li>)}</ul>
                            </details>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export function APIlocaledaysOfWeek(type: string, onChange: (type: string) => (e: any) => void) {
    return (
        <div>
            <h4>
                <code>{'locale.daysOfWeek?: Array<string>'}</code>
            </h4>
            <span>Localized strings for days of week</span>
            <ul>
                {map(daysOfWeek, (days, lang) => {
                    return (
                        <li key={lang}>
                            <details>
                                <summary>
                                    {lang}
                                    <Checkbox
                                        type="radio"
                                        name="daysOfWeek"
                                        onChange={onChange(lang)}
                                        checked={type === lang}
                                    />
                                </summary>
                                <ul>{days.map((m, i) => <li key={i}>{m}</li>)}</ul>
                            </details>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

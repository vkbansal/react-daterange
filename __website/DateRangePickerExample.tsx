import * as React from 'react';

import { addDays, addMonths, startOfMonth, endOfMonth } from '../src/utils/dateUtils';
import { DateRangePicker, RangeFunctions } from '../src';
import { DateRangePickerDocs } from './data';
import { PropsTable } from './PropsTable';

export interface DateRangePickerExampleProps {}

const ranges: Map<string, RangeFunctions> = new Map([
    [
        'Today',
        {
            startDate: (date: Date) => date,
            endDate: (date: Date) => date
        }
    ],
    [
        'Yesterday',
        {
            startDate: (date: Date) => addDays(date, -1),
            endDate: (date: Date) => addDays(date, -1)
        }
    ],
    [
        'Last 7 Days',
        {
            startDate: (date: Date) => addDays(date, -6),
            endDate: (date: Date) => date
        }
    ],
    [
        'Last 30 Days',
        {
            startDate: (date: Date) => addDays(date, -29),
            endDate: (date: Date) => date
        }
    ],
    [
        'This month',
        {
            startDate: (date: Date) => startOfMonth(date),
            endDate: (date: Date) => endOfMonth(date)
        }
    ],
    [
        'Last month',
        {
            startDate: (date: Date) => startOfMonth(addMonths(date, -1)),
            endDate: (date: Date) => endOfMonth(addMonths(date, -1))
        }
    ]
]);

export class DateRangePickerExample extends React.Component<DateRangePickerExampleProps> {
    render() {
        return (
            <div>
                <h1>DateRangePicker</h1>
                <DateRangePicker alwaysShowCalendars showCustomRangeLabel ranges={ranges} />
                <PropsTable docs={DateRangePickerDocs} />
            </div>
        );
    }
}

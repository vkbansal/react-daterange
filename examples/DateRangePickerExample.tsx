import * as React from 'react';

import { DateRangePicker } from '../src/DateRangePicker';
import { DateRangePickerDocs } from './data';
import { PropsTable } from './PropsTable';

export interface DateRangePickerExampleProps {}

export class DateRangePickerExample extends React.Component<DateRangePickerExampleProps> {
    render() {
        return (
            <div>
                <h1>DateRangePicker</h1>
                <DateRangePicker />
                <PropsTable docs={DateRangePickerDocs} />
            </div>
        );
    }
}

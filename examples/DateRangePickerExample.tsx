import * as React from 'react';

import { DateRangePicker } from '../src/DateRangePicker';
import { DateRangePickerDocs } from './data';
import { PropsTable } from './PropsTable';

export interface DateRangePickerExampleProps {}

export default class DateRangePickerExample extends React.Component<DateRangePickerExampleProps> {
    render() {
        return (
            <div>
                <DateRangePicker />
                <PropsTable docs={DateRangePickerDocs} />
            </div>
        );
    }
}

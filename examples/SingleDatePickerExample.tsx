import * as React from 'react';

import { SingleDatePicker } from '../src/SingleDatePicker';
import { SingleDatePickerDocs } from './data';
import { PropsTable } from './PropsTable';

export interface DateRangePickerExampleProps {}

export class SingleDatePickerExample extends React.Component<DateRangePickerExampleProps> {
    render() {
        return (
            <div>
                <SingleDatePicker />
                <PropsTable docs={SingleDatePickerDocs} />
            </div>
        );
    }
}

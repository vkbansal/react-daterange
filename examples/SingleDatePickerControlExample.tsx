import * as React from 'react';

import { addDays } from '../src/helpers';
import { SingleDatePickerControl } from '../src/SingleDatePickerControl';
import { SingleDatePickerControlDocs } from './data';
import { PropsTable } from './PropsTable';

export interface OwnState {
    showDropdowns: boolean;
    monthNames: string;
    daysOfWeek: string;
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
}

export class SDPControlExample extends React.Component<any, OwnState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showDropdowns: false,
            monthNames: 'en',
            daysOfWeek: 'en'
        };
    }

    handleChange = (e: React.SyntheticEvent<EventTarget>) => {
        const { value, checked, type } = e.target as HTMLInputElement;
        const name = (e.target as HTMLInputElement).name as keyof OwnState;

        this.setState(() => ({
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    handleMonthNamesChange = (lang: string) => () => {
        this.setState({
            monthNames: lang
        });
    };

    handleDaysOfWeekChange = (lang: string) => () => {
        this.setState({
            daysOfWeek: lang
        });
    };

    handleDateChange = (date: Date) => {
        alert(date);
    };

    handleSetDate = (key: 'date' | 'minDate' | 'maxDate') => (
        e: React.SyntheticEvent<EventTarget>
    ) => {
        const { checked } = e.target as HTMLInputElement;

        if (!checked) {
            this.setState(() => ({
                [key]: undefined
            }));
            return;
        }

        let date = new Date();

        if (key === 'minDate') {
            date = addDays(date, -4);
        }

        if (key === 'maxDate') {
            date = addDays(date, 3);
        }

        this.setState(() => ({
            [key]: date
        }));
    };

    render() {
        return (
            <div>
                <SingleDatePickerControl onDateChange={this.handleDateChange} />
                <PropsTable docs={SingleDatePickerControlDocs} />
            </div>
        );
    }
}

export function SingleDatePickerControlExample() {
    return <SDPControlExample />;
}

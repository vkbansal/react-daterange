import * as React from 'react';

import { DateRange, DateRangePickerControl } from '../src/DateRangePickerControl';
import { addDays } from '../src/helpers';
import { DateRangePickerControlDocs } from './data';
import { PropsTable } from './PropsTable';

export interface OwnState {
    showDropdowns: boolean;
    monthNames: string;
    daysOfWeek: string;
    startDate?: Date;
    endDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    individualCalendars: boolean;
}

export class DRPControlExample extends React.Component<any, OwnState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showDropdowns: false,
            monthNames: 'en',
            daysOfWeek: 'en',
            individualCalendars: false
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

    handleDatesChange = (dates: DateRange) => {
        alert(`you have selected ${dates.startDate} and ${dates.endDate}`);
    };

    handleSetDate = (key: 'startDate' | 'endDate' | 'minDate' | 'maxDate') => (
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

        if (key === 'endDate') {
            date = addDays(date, 7);
        }

        if (key === 'minDate') {
            date = addDays(date, -5);
        }

        if (key === 'maxDate') {
            date = addDays(date, 20);
        }

        this.setState(() => ({
            [key]: date
        }));
    };

    render() {
        return (
            <div>
                <h1>DateRangePickerControl</h1>
                <DateRangePickerControl
                    //showISOWeek
                    showWeekNumbers
                    showDropdowns
                    onDatesChange={this.handleDatesChange}
                />
                <PropsTable docs={DateRangePickerControlDocs} />
            </div>
        );
    }
}

export function DateRangePickerControlExample() {
    return <DRPControlExample />;
}

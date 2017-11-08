import addMonths from 'date-fns/addMonths';
import setMonth from 'date-fns/setMonth';
import setYear from 'date-fns/setYear';
import pick from 'lodash.pick';
import * as React from 'react';

import { CalendarMonth, CalendarMonthProps } from './CalendarMonth';
import { getStartofMonth, parseDate } from './helpers';

export interface SingleDatePickerControlLocale
    extends Pick<CalendarMonthProps, 'daysOfWeek' | 'monthNames'> {
    format: string;
}

// type LocaleFields = 'daysOfWeek' | 'monthNames';
type PropFields = 'showDropdowns';

export interface SingleDatePickerControlProps {
    date?: string | Date;
    minDate?: string | Date;
    maxDate?: string | Date;
    onDateChange?: (day: Date) => void;
    locale?: Partial<SingleDatePickerControlLocale>;
    showDropdowns?: boolean;
}

export interface SingleDatePickerControlState {
    month: Date;
}

export class SingleDatePickerControl extends React.Component<
    SingleDatePickerControlProps,
    SingleDatePickerControlState
> {
    private locale: SingleDatePickerControlLocale;

    private minDate?: Date;

    private maxDate?: Date;

    constructor(props: SingleDatePickerControlProps) {
        super(props);

        this.locale = Object.assign(
            {
                format: 'YYYY-MM-DD'
            },
            props.locale
        );

        if (props.minDate) {
            this.minDate = parseDate(props.minDate, this.locale.format);
        }

        if (props.maxDate) {
            this.maxDate = parseDate(props.maxDate, this.locale.format);
        }

        this.state = {
            month: props.date ? getStartofMonth(props.date, this.locale.format) : new Date()
        };
    }

    componentWillReceiveProps(nextProps: SingleDatePickerControlProps) {
        this.locale = Object.assign(
            {
                format: 'YYYY-MM-DD'
            },
            nextProps.locale
        );

        if (nextProps.minDate) {
            this.minDate = parseDate(nextProps.minDate, this.locale.format);
        } else {
            this.minDate = undefined;
        }

        if (nextProps.maxDate) {
            this.maxDate = parseDate(nextProps.maxDate, this.locale.format);
        } else {
            this.maxDate = undefined;
        }
    }

    handleNavClick = (months: number) => () => {
        this.setState<'month'>(state => {
            return {
                month: addMonths(state.month, months)
            };
        });
    };

    handleDayClick = (day: Date) => {
        if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(day);
        }
    };

    handleMonthChange = (month: number) => {
        this.setState<'month'>(state => ({
            month: setMonth(state.month, month)
        }));
    };

    handleYearChange = (year: number) => {
        this.setState<'month'>(state => ({
            month: setYear(state.month, year)
        }));
    };

    render() {
        const pickedProps: Pick<SingleDatePickerControlProps, PropFields> = pick(this.props, [
            'showDropdowns'
        ]);

        return (
            <CalendarMonth
                minDate={this.minDate}
                maxDate={this.maxDate}
                month={this.state.month}
                startDate={
                    this.props.date ? parseDate(this.props.date, this.locale.format) : undefined
                }
                onNextClick={this.handleNavClick(1)}
                onPrevClick={this.handleNavClick(-1)}
                onMonthChange={this.handleMonthChange}
                onYearChange={this.handleYearChange}
                onDayClick={this.handleDayClick}
                monthNames={this.locale.monthNames}
                daysOfWeek={this.locale.daysOfWeek}
                {...pickedProps}
            />
        );
    }
}

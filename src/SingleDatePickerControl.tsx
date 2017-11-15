import addMonths from 'date-fns/addMonths';
import setMonth from 'date-fns/setMonth';
import setYear from 'date-fns/setYear';
import startOfMonth from 'date-fns/startOfMonth';
import pick from 'lodash.pick';
import * as React from 'react';

import { CalendarMonth, CalendarMonthLocale, CalendarMonthProps } from './CalendarMonth';

export interface SingleDatePickerControlLocale extends Partial<CalendarMonthLocale> {
    format: string;
}

export type CalendarMonthPropFields =
    | 'showDropdowns'
    | 'showWeekNumbers'
    | 'showISOWeekNumbers'
    | 'minDate'
    | 'maxDate';

export interface SingleDatePickerControlProps
    extends Pick<CalendarMonthProps, CalendarMonthPropFields> {
    date?: Date;
    onDateChange?: (day: Date) => void;
    locale?: Partial<SingleDatePickerControlLocale>;
}

export interface SingleDatePickerControlState {
    month: Date;
}

export type CalenderMonthLocaleFields = 'daysOfWeek' | 'monthNames';

export class SingleDatePickerControl extends React.Component<
    SingleDatePickerControlProps,
    SingleDatePickerControlState
> {
    constructor(props: SingleDatePickerControlProps) {
        super(props);

        this.state = {
            month: startOfMonth(props.date || new Date())
        };
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
        const pickedProps: Pick<SingleDatePickerControlProps, CalendarMonthPropFields> = pick(
            this.props,
            ['showDropdowns', 'showWeekNumbers', 'showISOWeekNumbers', 'minDate', 'maxDate']
        );

        const locale: Pick<SingleDatePickerControlLocale, CalenderMonthLocaleFields> = pick(
            this.props.locale,
            ['daysOfWeek', 'monthNames']
        );

        const { date } = this.props;

        const otherProps = {
            startDate: date
        };

        return (
            <CalendarMonth
                month={this.state.month}
                onNextClick={this.handleNavClick(1)}
                onPrevClick={this.handleNavClick(-1)}
                onMonthChange={this.handleMonthChange}
                onYearChange={this.handleYearChange}
                onDayClick={this.handleDayClick}
                locale={locale}
                {...pickedProps}
                {...otherProps}
            />
        );
    }
}

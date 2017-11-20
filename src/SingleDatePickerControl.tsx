import * as React from 'react';

import { CalendarMonth, CalendarMonthProps } from './CalendarMonth';
import { addMonths, setMonth, setYear, startOfMonth } from './helpers';

export type CalendarMonthPropFields =
    | 'showDropdowns'
    | 'showWeekNumbers'
    | 'showISOWeekNumbers'
    | 'minDate'
    | 'maxDate'
    | 'daysOfWeek'
    | 'monthNames';

export interface SingleDatePickerControlProps
    extends Pick<CalendarMonthProps, CalendarMonthPropFields> {
    date?: Date;
    onDateChange?: (day: Date) => void;
}

export interface SingleDatePickerControlState {
    month: Date;
}

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
        const {
            date,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers,
            minDate,
            maxDate,
            monthNames,
            daysOfWeek
        } = this.props;

        return (
            <CalendarMonth
                month={this.state.month}
                startDate={date}
                onNextClick={this.handleNavClick(1)}
                onPrevClick={this.handleNavClick(-1)}
                onMonthChange={this.handleMonthChange}
                onYearChange={this.handleYearChange}
                onDayClick={this.handleDayClick}
                showDropdowns={showDropdowns}
                showISOWeekNumbers={showISOWeekNumbers}
                showWeekNumbers={showWeekNumbers}
                minDate={minDate}
                maxDate={maxDate}
                monthNames={monthNames}
                daysOfWeek={daysOfWeek}
            />
        );
    }
}

import * as React from 'react';

import { CalendarMonth, CalendarMonthProps } from './CalendarMonth';
import { addMonths, setMonth, setYear, startOfMonth } from './helpers';

export type CalendarMonthPropFields =
    | 'showDropdowns'
    | 'showWeekNumbers'
    | 'showISOWeek'
    | 'minDate'
    | 'maxDate'
    | 'daysOfWeek'
    | 'monthNames';

export interface SingleDatePickerControlProps
    extends Pick<CalendarMonthProps, CalendarMonthPropFields> {
    /**
     * The initially selected date
     */
    date?: Date;
    /**
     * Callback for when a date is selected
     */
    onDateChange?: (day: Date) => void;
}

export interface SingleDatePickerControlState {
    month: Date;
}

/**
 * SingleDatePickerControl component
 * @example
 *
 * import { SingleDatePickerControl } from 'react-daterange';
 *
 * class MyDatePicker extends React.component {
 *   constructor(props) {
 *     super(props);
 *     this.state = {
 *       date: null
 *     };
 *   }
 *
 *   handleDateChange = (date) => {
 *     this.setState({ date });
 *   }
 *
 *   render() {
 *     return (
 *       <SingleDatePickerControl
 *         onDateChange={this.handleDateChange}
 *       />
 *     );
 *   }
 * }
 */
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
            showISOWeek,
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
                showISOWeek={showISOWeek}
                showWeekNumbers={showWeekNumbers}
                minDate={minDate}
                maxDate={maxDate}
                monthNames={monthNames}
                daysOfWeek={daysOfWeek}
            />
        );
    }
}

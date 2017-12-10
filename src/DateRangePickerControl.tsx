import * as React from 'react';

import { CalendarMonth, CalendarMonthProps } from './CalendarMonth';
import {
    addMonths,
    callIfExists,
    endOfMonth,
    isDayAfter,
    isDayBefore,
    isSameMonth,
    setMonth,
    setYear,
    startOfMonth
} from './helpers';

export interface DateRange {
    startDate: Date;
    endDate?: Date;
}

export type CalenderMonthPropFields =
    | 'showDropdowns'
    | 'showWeekNumbers'
    | 'showISOWeek'
    | 'startDate'
    | 'endDate'
    | 'minDate'
    | 'maxDate'
    | 'daysOfWeek'
    | 'monthNames';

export interface DateRangePickerControlProps
    extends Pick<CalendarMonthProps, CalenderMonthPropFields> {
    /**
     * When enabled, the two calendars can be individually advanced and display any month/year.
     * When disabled, the two calendars displayed will always be for two sequential months
     * (i.e. January and February), and both will be advanced when clicking the left or right
     * arrows above the calendars.
     *
     * @default false
     */
    individualCalendars?: boolean;
    /**
     * Callback when start and/or end dates are changed
     *
     * @param {Object} dates
     * @param {Date} dates.startDate
     * @param {Date | undefined} dates.endDate
     */
    onDatesChange?: (dates: DateRange) => void;
}

export interface DateRangePickerControlState {
    startDate?: Date;
    endDate?: Date;
    monthLeft: Date;
    monthRight: Date;
    selectionActive: boolean;
}

export type CalenderMonthLocaleFields = 'daysOfWeek' | 'monthNames';

/**
 * DateRangePickerControl
 *
 * @example
 *
 * import React from 'react';
 * import { DateRangePickerControl } from 'react-daterange';
 *
 * <DateRangePickerControl {...props} />
 */
export class DateRangePickerControl extends React.Component<
    DateRangePickerControlProps,
    DateRangePickerControlState
> {
    constructor(props: DateRangePickerControlProps) {
        super(props);

        const thisMonth = startOfMonth(new Date());
        const { startDate, endDate } = props;

        this.state = {
            startDate,
            endDate,
            monthLeft: startDate || thisMonth,
            monthRight: props.individualCalendars
                ? endDate || addMonths(thisMonth, 1)
                : addMonths(startDate || thisMonth, 1),
            selectionActive: false
        };
    }

    componentWillReceiveProps(nextProps: DateRangePickerControlProps) {
        const { startDate, endDate } = nextProps;

        this.setState({ startDate, endDate });
    }

    handleNavClick = (months: number, calendar: 'left' | 'right') => () => {
        this.setState<'monthLeft' | 'monthRight'>(state => {
            if (this.props.individualCalendars && calendar === 'left') {
                return {
                    monthLeft: addMonths(state.monthLeft, months),
                    monthRight: state.monthRight
                };
            }

            if (this.props.individualCalendars && calendar === 'right') {
                return {
                    monthLeft: state.monthLeft,
                    monthRight: addMonths(state.monthRight, months)
                };
            }

            return {
                monthLeft: addMonths(state.monthLeft, months),
                monthRight: addMonths(state.monthRight, months)
            };
        });
    };

    handleDayClick = (day: Date) => {
        this.setState<'startDate' | 'endDate' | 'selectionActive'>(state => {
            if (state.startDate && state.selectionActive && isDayAfter(day, state.startDate)) {
                callIfExists(this.props.onDatesChange, {
                    startDate: state.startDate,
                    endDate: day
                });

                return {
                    selectionActive: false,
                    endDate: day
                };
            }

            callIfExists(this.props.onDatesChange, {
                startDate: day,
                endDate: undefined
            });

            return {
                selectionActive: true,
                startDate: day,
                endDate: undefined
            };
        });
    };

    handleDayHover = (day: Date) => {
        this.setState<'endDate'>(state => {
            if (state.selectionActive && state.startDate && !isDayBefore(day, state.startDate)) {
                return {
                    endDate: day
                };
            }

            return {};
        });
    };

    handleMonthChange = (calendar: 'left' | 'right') => (month: number) => {
        this.setState<'monthLeft' | 'monthRight'>(({ monthLeft, monthRight }) => {
            if (this.props.individualCalendars) {
                if (calendar === 'left') {
                    return { monthLeft: setMonth(monthLeft, month), monthRight };
                }

                if (calendar === 'right') {
                    return { monthLeft, monthRight: setMonth(monthRight, month) };
                }
            }

            if (calendar === 'left') {
                const m = setMonth(monthLeft, month);
                return { monthLeft: m, monthRight: addMonths(m, 1) };
            }

            const m = setMonth(monthRight, month);
            return { monthLeft: addMonths(m, -1), monthRight: m };
        });
    };

    handleYearChange = (calendar: 'left' | 'right') => (year: number) => {
        this.setState<'monthLeft' | 'monthRight'>(({ monthLeft, monthRight }) => {
            if (this.props.individualCalendars) {
                if (calendar === 'left') {
                    return { monthLeft: setYear(monthLeft, year), monthRight };
                }

                if (calendar === 'right') {
                    return { monthLeft, monthRight: setYear(monthRight, year) };
                }
            }

            if (calendar === 'left') {
                const m = setYear(monthLeft, year);
                return { monthLeft: m, monthRight: addMonths(m, 1) };
            }

            const m = setYear(monthRight, year);
            return { monthLeft: addMonths(m, -1), monthRight: m };
        });
    };

    render() {
        const { startDate, endDate, monthLeft, monthRight } = this.state;
        const {
            minDate,
            maxDate,
            showDropdowns,
            showISOWeek,
            showWeekNumbers,
            monthNames,
            daysOfWeek
        } = this.props;

        const commonProps = {
            startDate,
            endDate,
            onDayClick: this.handleDayClick,
            onDayHover: this.handleDayHover,
            maxDate,
            monthNames,
            daysOfWeek,
            showDropdowns,
            showISOWeek,
            showWeekNumbers
        };

        return (
            <div className="rdr-range-control-wrapper">
                <CalendarMonth
                    {...commonProps}
                    month={monthLeft}
                    minDate={minDate}
                    onPrevClick={this.handleNavClick(-1, 'left')}
                    onNextClick={this.handleNavClick(1, 'left')}
                    onMonthChange={this.handleMonthChange('left')}
                    onYearChange={this.handleYearChange('left')}
                    hideNextButton={!this.props.individualCalendars}
                />
                <CalendarMonth
                    {...commonProps}
                    month={monthRight}
                    minDate={endOfMonth(monthLeft)}
                    onPrevClick={this.handleNavClick(-1, 'right')}
                    onNextClick={this.handleNavClick(1, 'right')}
                    onMonthChange={this.handleMonthChange('right')}
                    onYearChange={this.handleYearChange('right')}
                    hidePrevButton={
                        !this.props.individualCalendars ||
                        isDayBefore(monthRight, monthLeft) ||
                        isSameMonth(monthRight, monthLeft)
                    }
                />
            </div>
        );
    }
}

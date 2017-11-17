import * as addMonths from 'date-fns/addMonths';
import * as endOfMonth from 'date-fns/endOfMonth';
import * as isAfter from 'date-fns/isAfter';
import * as isBefore from 'date-fns/isBefore';
import * as isSameMonth from 'date-fns/isSameMonth';
import * as setMonth from 'date-fns/setMonth';
import * as setYear from 'date-fns/setYear';
import * as startOfMonth from 'date-fns/startOfMonth';
import glamorous from 'glamorous';
import * as React from 'react';

import { CalendarMonth, CalendarMonthProps } from './CalendarMonth';
import { callIfExists } from './helpers';

const ControlWrapper = glamorous('div')('rdr-range-control', {
    display: 'flex',
    alignItems: 'flex-start'
});

export interface DateRange {
    startDate: Date;
    endDate?: Date;
}

export type CalenderMonthPropFields =
    | 'showDropdowns'
    | 'showWeekNumbers'
    | 'showISOWeekNumbers'
    | 'startDate'
    | 'endDate'
    | 'minDate'
    | 'maxDate'
    | 'locale';

export interface DateRangePickerControlProps
    extends Pick<CalendarMonthProps, CalenderMonthPropFields> {
    individualCalendars?: boolean;
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
            if (state.startDate && state.selectionActive && isAfter(day, state.startDate)) {
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
            if (state.selectionActive && state.startDate && !isBefore(day, state.startDate)) {
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
            locale,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers
        } = this.props;

        const commonProps = {
            startDate,
            endDate,
            onDayClick: this.handleDayClick,
            onDayHover: this.handleDayHover,
            maxDate,
            locale,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers
        };

        return (
            <ControlWrapper>
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
                        isBefore(monthRight, monthLeft) ||
                        isSameMonth(monthRight, monthLeft)
                    }
                />
            </ControlWrapper>
        );
    }
}

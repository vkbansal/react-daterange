import addMonths from 'date-fns/addMonths';
import endOfMonth from 'date-fns/endOfMonth';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameMonth from 'date-fns/isSameMonth';
import setMonth from 'date-fns/setMonth';
import setYear from 'date-fns/setYear';
import glamorous from 'glamorous';
import pick from 'lodash.pick';
import * as React from 'react';

import { CalendarMonth, CalendarMonthProps } from './CalendarMonth';
import { getStartofMonth, parseDate } from './helpers';

const ControlWrapper = glamorous('div')({
    display: 'flex',
    alignItems: 'flex-start'
});

export interface DateRange {
    startDate: Date;
    endDate: Date;
}

export interface DateRangePickerControlLocale
    extends Pick<CalendarMonthProps, 'daysOfWeek' | 'monthNames'> {
    format: string;
}

type LocaleFields = 'daysOfWeek' | 'monthNames';
type PropFields = 'showDropdowns';

export interface DateRangePickerControlProps extends Pick<CalendarMonthProps, 'showDropdowns'> {
    locale?: Partial<DateRangePickerControlLocale>;
    startDate?: Date | string;
    endDate?: Date | string;
    minDate?: string | Date;
    maxDate?: string | Date;
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

export class DateRangePickerControl extends React.Component<
    DateRangePickerControlProps,
    DateRangePickerControlState
> {
    private locale: DateRangePickerControlLocale;

    private minDate?: Date;

    private maxDate?: Date;

    constructor(props: DateRangePickerControlProps) {
        super(props);

        this.locale = Object.assign(
            {
                format: 'YYYY-MM-DD'
            },
            props.locale
        );

        const thisMonth = getStartofMonth(new Date(), this.locale.format);

        if (props.minDate) {
            this.minDate = parseDate(props.minDate, this.locale.format);
        }

        if (props.maxDate) {
            this.maxDate = parseDate(props.maxDate, this.locale.format);
        }

        const startDate = props.startDate
            ? parseDate(props.startDate, this.locale.format)
            : undefined;
        const endDate = props.endDate ? parseDate(props.endDate, this.locale.format) : undefined;

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
        this.locale = Object.assign(
            {
                format: 'YYYY-MM-DD'
            },
            nextProps.locale
        );

        this.minDate = nextProps.minDate
            ? parseDate(nextProps.minDate, this.locale.format)
            : undefined;

        this.maxDate = nextProps.maxDate
            ? parseDate(nextProps.maxDate, this.locale.format)
            : undefined;
        const startDate = nextProps.startDate
            ? parseDate(nextProps.startDate, this.locale.format)
            : undefined;
        const endDate = nextProps.endDate
            ? parseDate(nextProps.endDate, this.locale.format)
            : undefined;

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
                if (typeof this.props.onDatesChange === 'function') {
                    this.props.onDatesChange({
                        startDate: state.startDate,
                        endDate: day
                    });
                }
                return {
                    selectionActive: false,
                    endDate: day
                };
            }

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

            console.log(month);

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
        const pickedProps: Pick<DateRangePickerControlProps, PropFields> = pick(this.props, [
            'showDropdowns'
        ]);
        const locale: Pick<DateRangePickerControlLocale, LocaleFields> = pick(this.props.locale, [
            'daysOfWeek',
            'monthNames'
        ]);

        const commonProps = {
            startDate,
            endDate,
            maxDate: this.maxDate,
            onDayClick: this.handleDayClick,
            onDayHover: this.handleDayHover,
            ...locale,
            ...pickedProps
        };

        return (
            <ControlWrapper>
                <CalendarMonth
                    month={monthLeft}
                    minDate={this.minDate}
                    onPrevClick={this.handleNavClick(-1, 'left')}
                    onNextClick={this.handleNavClick(1, 'left')}
                    onMonthChange={this.handleMonthChange('left')}
                    onYearChange={this.handleYearChange('left')}
                    hideNextButton={!this.props.individualCalendars}
                    {...commonProps}
                />
                <CalendarMonth
                    month={monthRight}
                    onPrevClick={this.handleNavClick(-1, 'right')}
                    onNextClick={this.handleNavClick(1, 'right')}
                    onMonthChange={this.handleMonthChange('right')}
                    onYearChange={this.handleYearChange('right')}
                    hidePrevButton={
                        !this.props.individualCalendars ||
                        isBefore(monthRight, monthLeft) ||
                        isSameMonth(monthRight, monthLeft)
                    }
                    minDate={endOfMonth(monthLeft)}
                    {...commonProps}
                />
            </ControlWrapper>
        );
    }
}

/**
 * TODO:
 * - handle minDate/maxDate props in dropdowns too
 */

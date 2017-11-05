import * as React from 'react';
import addMonths from 'date-fns/addMonths';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameMonth from 'date-fns/isSameMonth';
import parseDate from 'date-fns/parse';
import startOfMonth from 'date-fns/startOfMonth';

import { DateRangePickerProps, DateRangePickerState, Locale } from './types';

import Month from './Month';

const defaultLocale: Locale = {
    format: 'YYYY-MM-DD',
    separator: ' - ',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom',
    weekLabel: 'W',
    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    firstDay: 1
};

export default class DateRangePicker extends React.Component<
    DateRangePickerProps,
    DateRangePickerState
> {
    static defaultProps: Partial<DateRangePickerProps> = {
        locale: {},
        opens: 'left',
        drops: 'down'
    };

    private locale: Locale;

    constructor(props: DateRangePickerProps) {
        super(props);

        const thisMonth = startOfMonth(new Date());

        this.locale = Object.assign({}, defaultLocale, props.locale);
        const startDate = props.startDate
            ? startOfMonth(
                  typeof props.startDate === 'string'
                      ? parseDate(props.startDate, this.locale.format, new Date())
                      : props.startDate
              )
            : undefined;
        const endDate = props.endDate
            ? startOfMonth(
                typeof props.endDate === 'string'
                ? parseDate(props.endDate, this.locale.format, new Date())
                : props.endDate
              )
            : undefined;

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

    handleMonthChange = (months: number, calender: 'left' | 'right') => () => {
        this.setState((state: DateRangePickerState): Partial<DateRangePickerState> => {
            if (this.props.individualCalendars && calender === 'left') {
                return {
                    monthLeft: addMonths(state.monthLeft, months)
                };
            }

            if (this.props.individualCalendars && calender === 'right') {
                return {
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
        this.setState((state: DateRangePickerState): Partial<DateRangePickerState> => {
            if (state.startDate && state.selectionActive && isAfter(day, state.startDate)) {
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
        this.setState((state: DateRangePickerState): Partial<DateRangePickerState> => {
            if (state.selectionActive && state.startDate && !isBefore(day, state.startDate)) {
                return {
                    endDate: day
                };
            }

            return {};
        });
    };

    render() {
        const { startDate, endDate, monthLeft, monthRight } = this.state;
        return (
            <div>
                <Month
                    month={monthLeft}
                    startDate={startDate}
                    endDate={endDate}
                    onPrevClick={this.handleMonthChange(-1, 'left')}
                    onNextClick={this.handleMonthChange(1, 'left')}
                    onDayClick={this.handleDayClick}
                    onDayHover={this.handleDayHover}
                    hideNextButton={!this.props.individualCalendars}
                />
                <Month
                    month={monthRight}
                    startDate={startDate}
                    endDate={endDate}
                    onPrevClick={this.handleMonthChange(-1, 'right')}
                    onNextClick={this.handleMonthChange(1, 'right')}
                    onDayClick={this.handleDayClick}
                    onDayHover={this.handleDayHover}
                    hidePrevButton={
                        !this.props.individualCalendars ||
                        isBefore(monthRight, monthLeft) ||
                        isSameMonth(monthRight, monthLeft)
                    }
                />
            </div>
        );
    }
}

/* tslint:disable:max-line-length */
import * as React from 'react';

import { Day, Row, Cell, NavButton, Weeks, Week, Select, Month } from './GlamorousComponents';
import {
    LOCALE_EN,
    addDays,
    getWeeksInMonth,
    isDayAfter,
    isDayBefore,
    isSameDay,
    isSameMonth,
    setMonth,
    startOfMonth
} from '../utils/dateUtils';
import { callIfExists } from '../utils/otherUtils';

export interface CalendarMonthProps {
    /**
     * Current Month
     */
    month: Date;
    /**
     * The start of the initially selected date range
     */
    startDate?: Date;
    /**
     * The end of the initially selected date range
     */
    endDate?: Date;
    /**
     * The earliest date a user may select
     */
    minDate?: Date;
    /**
     * The latest date a user may select
     */
    maxDate?: Date;
    /**
     * An array of strings, that is used to display the days of the week in the calendar.
     * Note: first day in the array must be a sunday
     * @default ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
     */
    daysOfWeek?: string[];
    /**
     *  An array of strings, that is used to display the month names in the calendar.
     * @default ['January','February','March','April','May','June','July','August','September','October','November','December']
     */
    monthNames?: string[];
    /**
     * If set as `true`, shows **month** and **year** dropdowns above the calendar
     */
    showDropdowns?: boolean;
    /**
     * Callback for when "prev" button is clicked
     */
    onPrevClick?(): void;
    /**
     * Callback for when "next" button is clicked
     */
    onNextClick?(): void;
    /**
     * Callback for when user clicks on a "Day"
     */
    onDayClick?(date: Date): void;
    /**
     * Callback for when user hovers on a "Day"
     */
    onDayHover?(date: Date): void;
    /**
     * Callback for when user selects a month from the dropdown
     * Applicable only when `showDropdowns: true`
     */
    onMonthChange?(month: number): void;
    /**
     * Callback for when user selects a year from the dropdown
     * Applicable only when `showDropdowns: true`
     */
    onYearChange?(year: number): void;
    /**
     * When sets as `true`, hide the "next" button
     */
    hideNextButton?: boolean;
    /**
     * When sets as `true`, hide the "prev" button
     */
    hidePrevButton?: boolean;
    /**
     * TODO: implement this feature
     */
    showWeekNumbers?: boolean;
    /**
     * When enabled, week starts on monday. See [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date)
     */
    showISOWeek?: boolean;
}

export class CalendarMonth extends React.Component<CalendarMonthProps> {
    handlePrevClick = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (typeof this.props.onPrevClick === 'function') {
            this.props.onPrevClick();
        }
    };

    handleNextClick = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        callIfExists(this.props.onNextClick);
    };

    handleDayClick = (day: Date) => (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        callIfExists(this.props.onDayClick, day);
    };

    handleDayHover = (day: Date) => (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        callIfExists(this.props.onDayHover, day);
    };

    handleMonthChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const { value } = e.target as HTMLSelectElement;
        callIfExists(this.props.onMonthChange, parseInt(value, 10));
    };

    handleYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const { value } = e.target as HTMLSelectElement;
        callIfExists(this.props.onYearChange, parseInt(value, 10));
    };

    renderDropDowns = (firstDay: Date) => {
        const { minDate, maxDate, month, monthNames } = this.props;

        const localeMonthNames = monthNames || LOCALE_EN.monthNames;
        const today = new Date();
        const minYear = minDate ? minDate.getFullYear() : today.getFullYear() - 50;
        const maxYear = maxDate ? maxDate.getFullYear() + 1 : today.getFullYear() + 5;

        return (
            <>
                <Select value={firstDay.getMonth()} onChange={this.handleMonthChange}>
                    {localeMonthNames.map((m, i) => {
                        const isDisabled =
                            (minDate && isDayBefore(setMonth(month, i), minDate)) ||
                            (maxDate && isDayAfter(setMonth(month, i), maxDate));

                        return (
                            <option key={i} value={i} disabled={isDisabled}>
                                {m}
                            </option>
                        );
                    })}
                </Select>
                <Select value={firstDay.getFullYear()} onChange={this.handleYearChange}>
                    {Array.from({ length: maxYear - minYear }, (_, i) => {
                        const year = i + minYear;

                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </Select>
            </>
        );
    };

    render() {
        const {
            month,
            startDate,
            endDate,
            hideNextButton,
            hidePrevButton,
            minDate,
            maxDate,
            daysOfWeek,
            monthNames,
            showDropdowns,
            showISOWeek
            // showWeekNumbers
        } = this.props;

        /**
         * 1st of the month
         */
        const firstDate = startOfMonth(month);

        /**
         * Day of week of 1st of the month
         * Sunday = 0
         * Monday = 1
         * Tuesday = 2
         * Wednesday = 3
         * Thursday = 4
         * Friday = 5
         * Saturday = 6
         */
        let firstDayInCurrentMonth = firstDate.getDay();

        /**
         * Since, ISOWeek starts on a Monday and `weeksOfDays` starts on Sunday,
         * we shift the days to left by 1 day
         * Monday = 0
         * Tuesday = 1
         * Wednesday = 2
         * Thursday = 3
         * Friday = 4
         * Saturday = 5
         * Sunday = 6
         */
        if (showISOWeek) {
            firstDayInCurrentMonth = (firstDayInCurrentMonth + 6) % 7;
        }

        const monthName = (monthNames || LOCALE_EN.monthNames)[firstDate.getMonth()];
        const key = `${monthName}-${firstDate.getFullYear()}`;
        const localeDaysOfWeek = daysOfWeek || LOCALE_EN.daysOfWeek;
        const weeks = getWeeksInMonth(firstDate, showISOWeek);
        const today = new Date();

        return (
            <Month>
                <Row>
                    <Cell>
                        {!hidePrevButton && (
                            <NavButton onClick={this.handlePrevClick}>&#8592;</NavButton>
                        )}
                    </Cell>
                    <Cell span={5}>
                        {showDropdowns
                            ? this.renderDropDowns(firstDate)
                            : `${monthName} ${firstDate.getFullYear()}`}
                    </Cell>
                    <Cell>
                        {!hideNextButton && (
                            <NavButton onClick={this.handleNextClick}>&#8594;</NavButton>
                        )}
                    </Cell>
                </Row>
                <Row>
                    {Array.from({ length: 7 }, (_, i) => (
                        <Cell key={`${key}-day-${i}`}>
                            {localeDaysOfWeek[showISOWeek ? (i + 1) % 7 : i]}
                        </Cell>
                    ))}
                </Row>
                <Weeks>
                    {Array.from({ length: weeks }, (_, i) => (
                        <Week key={`${key}-${i}`}>
                            {Array.from({ length: 7 }, (_1, j) => {
                                const day = addDays(firstDate, i * 7 + j - firstDayInCurrentMonth);

                                if (!isSameMonth(firstDate, day)) return null;

                                const inRange =
                                    startDate &&
                                    isDayAfter(day, startDate) &&
                                    endDate &&
                                    isDayBefore(day, endDate);

                                const selected =
                                    (startDate && isSameDay(day, startDate)) ||
                                    (endDate && isSameDay(day, endDate));
                                const isDisabled =
                                    (minDate && isDayBefore(day, minDate)) ||
                                    (maxDate && isDayAfter(day, maxDate));

                                return (
                                    <Day
                                        selected={selected}
                                        inRange={inRange}
                                        today={isSameDay(today, day)}
                                        disabled={isDisabled}
                                        key={`${key}-${i}-${j}`}
                                        onClick={!isDisabled ? this.handleDayClick(day) : undefined}
                                        onMouseEnter={
                                            !isDisabled ? this.handleDayHover(day) : undefined
                                        }
                                    >
                                        {day.getDate()}
                                    </Day>
                                );
                            })}
                        </Week>
                    ))}
                </Weeks>
            </Month>
        );
    }
}

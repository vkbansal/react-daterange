import glamorous, { CSSProperties, ExtraGlamorousProps, GlamorousComponent } from 'glamorous';
import * as React from 'react';

import { NavButton } from './Common';
import {
    LOCALE_EN,
    addDays,
    callIfExists,
    getWeeksInMonth,
    isDayAfter,
    isDayBefore,
    isSameDay,
    isSameMonth,
    range,
    setMonth,
    startOfMonth
} from './helpers';

const SIZE = 38;
const sizeInPixels = `${SIZE}px`;

// explicitly defined type for declarations to work
export const Month: GlamorousComponent<React.HTMLProps<HTMLDivElement>, {}> = glamorous('div')(
    'rdr-calendar-month',
    {
        display: 'inline-flex',
        alignItems: 'flex-start',
        padding: '0 16px',
        background: '#fff',
        minHeight: `${SIZE * 8}px`
    }
);

Month.displayName = 'Month';

export interface RowProps {
    justifyContent?: CSSProperties['justifyContent'];
}

export const Row = glamorous('div')<RowProps>(
    'rdr-calendar-row',
    {
        display: 'flex'
    },
    props => ({
        justifyContent: props.justifyContent || 'flex-start'
    })
);

Row.displayName = 'Row';

export interface CellProps {
    span?: number;
    justifyContent?: CSSProperties['justifyContent'];
}

export const Cell = glamorous('div')<CellProps>(
    'rdr-calendar-cell',
    {
        height: sizeInPixels,
        lineHeight: sizeInPixels,
        fontWeight: 'bold',
        fontSize: '14px',
        textAlign: 'center',
        display: 'flex'
    },
    props => ({
        width: `${SIZE * (props.span || 1)}px`,
        justifyContent: props.justifyContent || 'center'
    })
);

Cell.displayName = 'Cell';

export interface DayProps {
    selected?: boolean;
    inRange?: boolean;
    isDisabled?: boolean;
}

// explicitly defined type for declarations to work
export const Day: GlamorousComponent<
    React.HTMLProps<HTMLDivElement> & object & CellProps & ExtraGlamorousProps & DayProps,
    DayProps
> = glamorous(Cell)<DayProps>(
    'rdr-calendar-day',
    {
        width: `${SIZE + 1}px`,
        height: `${SIZE + 1}px`,
        lineHeight: `${SIZE + 1}px`,
        fontWeight: 'normal',
        border: '1px solid #ddd',
        marginTop: '-1px',
        marginLeft: '-1px',
        '&:last-child': {
            borderRight: '1px solid #ddd'
        }
    },
    props => ({
        cursor: props.isDisabled ? 'not-allowed' : 'pointer',
        textDecoration: props.isDisabled ? 'line-through' : 'none',
        color: props.isDisabled ? '#ddd' : props.selected ? '#fff' : '#222',
        background: props.selected
            ? 'rgb(0, 202, 255)'
            : props.inRange ? 'rgba(0, 202, 255, 0.3)' : 'transparent',
        '&:hover': {
            background: props.isDisabled
                ? 'transparent'
                : props.selected ? 'rgb(0, 202, 255)' : '#ddd'
        }
    })
);

Day.displayName = 'Day';

export const Select = glamorous('select')('rdr-calendar-select', {
    background: 'transparent',
    border: 'none',
    outline: 'none'
});

Select.displayName = 'Select';

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
    daysOfWeek?: Array<string>;
    /**
     *  An array of strings, that is used to display the month names in the calendar.
     * @default ['January','February','March','April','May','June','July','August','September','October','November','December']
     */
    monthNames?: Array<string>;
    /**
     * If set as `true`, shows **month** and **year** dropdowns above the calendar
     */
    showDropdowns?: boolean;
    /**
     * Callback for when "prev" buton is clicked
     */
    onPrevClick?: () => void;
    /**
     * Callback for when "next" buton is clicked
     */
    onNextClick?: () => void;
    /**
     * Callback for when user clicks on a "Day"
     */
    onDayClick?: (date: Date) => void;
    /**
     * Callback for when user hovers on a "Day"
     */
    onDayHover?: (date: Date) => void;
    /**
     * Callback for when user selects a month from the dropdown
     * Applicable only when `showDropdowns: true`
     */
    onMonthChange?: (month: number) => void;
    /**
     * Callback for when user selects a year from the dropdown
     * Applicable only when `showDropdowns: true`
     */
    onYearChange?: (year: number) => void;
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

        return [
            <Select key="months" value={firstDay.getMonth()} onChange={this.handleMonthChange}>
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
            </Select>,
            <Select key="years" value={firstDay.getFullYear()} onChange={this.handleYearChange}>
                {range(
                    minDate ? minDate.getFullYear() : firstDay.getFullYear() - 50,
                    maxDate ? maxDate.getFullYear() + 1 : firstDay.getFullYear() + 5
                ).map(i => {
                    return (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    );
                })}
            </Select>
        ];
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

        return (
            <Month>
                {/* showWeekNumbers && (
                    <div>
                        <Cell />
                        <Cell>Week</Cell>
                        {range(0, weeks).map(i => {
                            const sw = startOfWeek(addDays(firstDate, i * 7), showISOWeek);
                            const weekNum = getWeekNumber(sw, showISOWeek);
                            return <Cell key={i}>{weekNum}</Cell>;
                        })}
                    </div>
                )*/}
                <div>
                    <Row>
                        <Cell>
                            {!hidePrevButton && (
                                <NavButton onClick={this.handlePrevClick}>&#8592;</NavButton>
                            )}
                        </Cell>
                        <Cell span={5} justifyContent={showDropdowns ? 'space-around' : 'center'}>
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
                        {range(0, 7).map(i => (
                            <Cell key={`${key}-day-${i}`}>
                                {localeDaysOfWeek[showISOWeek ? (i + 1) % 7 : i]}
                            </Cell>
                        ))}
                    </Row>
                    {range(0, weeks).map(i => (
                        <Row
                            key={`${key}-${i}`}
                            justifyContent={i === 0 ? 'flex-end' : 'flex-start'}
                        >
                            {range(0, 7).map(j => {
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
                                        key={`${key}-${i}-${j}`}
                                        selected={selected}
                                        inRange={inRange}
                                        onClick={!isDisabled ? this.handleDayClick(day) : undefined}
                                        onMouseEnter={
                                            !isDisabled ? this.handleDayHover(day) : undefined
                                        }
                                        isDisabled={isDisabled}
                                    >
                                        {day.getDate()}
                                    </Day>
                                );
                            })}
                        </Row>
                    ))}
                </div>
            </Month>
        );
    }
}

import addDays from 'date-fns/addDays';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import setMonth from 'date-fns/setMonth';
// import setYear from 'date-fns/setYear';
import startOfMonth from 'date-fns/startOfMonth';
import glamorous, { CSSProperties } from 'glamorous';
import defaults from 'lodash.defaults';
import range from 'lodash.range';
import * as React from 'react';

import { NavButton } from './Common';

const SIZE = 38;
const sizeInPixels = `${SIZE}px`;

export const Month = glamorous('div')('rdr-calendar-month', {
    display: 'inline-block',
    padding: '0 16px',
    background: '#fff',
    minHeight: `${SIZE * 8}px`
});

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

interface CellProps {
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

interface DayProps {
    selected?: boolean;
    inRange?: boolean;
    isDisabled?: boolean;
}

export const Day = glamorous(Cell)<DayProps>(
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

export interface CalendarMonthLocale {
    daysOfWeek: Array<string>;
    monthNames: Array<string>;
}

export interface CalendarMonthProps {
    month: Date;
    startDate?: Date;
    endDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    locale?: Partial<CalendarMonthLocale>;
    showDropdowns?: boolean;
    onPrevClick?: () => void;
    onNextClick?: () => void;
    onDayClick?: (date: Date) => void;
    onDayHover?: (date: Date) => void;
    onMonthChange?: (month: number) => void;
    onYearChange?: (year: number) => void;
    hideNextButton?: boolean;
    hidePrevButton?: boolean;
    showWeekNumbers?: boolean;
    showISOWeekNumbers?: boolean;
}

const defaultLocale: CalendarMonthLocale = {
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
    ]
};

export class CalendarMonth extends React.Component<CalendarMonthProps> {
    private locale: CalendarMonthLocale;

    constructor(props: CalendarMonthProps) {
        super(props);

        if (
            props.locale &&
            props.locale.daysOfWeek &&
            (!Array.isArray(props.locale.daysOfWeek) || props.locale.daysOfWeek.length !== 7)
        ) {
            throw new Error(
                `props.locale.daysofWeek must an array of length 7 but ${
                    props.locale.daysOfWeek
                } given`
            );
        }

        if (
            props.locale &&
            props.locale.monthNames &&
            (!Array.isArray(props.locale.monthNames) || props.locale.monthNames.length !== 12)
        ) {
            throw new Error(
                `props.locale.monthNames must an array of length 7 but ${
                    props.locale.daysOfWeek
                } given`
            );
        }

        this.locale = defaults({}, props.locale, defaultLocale);
    }

    componentWillReceiveProps(nextProps: CalendarMonthProps) {
        this.locale = defaults({}, nextProps.locale, defaultLocale);
    }

    handlePrevClick = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (typeof this.props.onPrevClick === 'function') {
            this.props.onPrevClick();
        }
    };

    handleNextClick = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (typeof this.props.onNextClick === 'function') {
            this.props.onNextClick();
        }
    };

    handleDayClick = (day: Date) => (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (typeof this.props.onDayClick === 'function') {
            this.props.onDayClick(day);
        }
    };

    handleDayHover = (day: Date) => (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (typeof this.props.onDayHover === 'function') {
            this.props.onDayHover(day);
        }
    };

    handleMonthChange = (e: React.SyntheticEvent<EventTarget>) => {
        const { value } = e.target as HTMLOptionElement;
        if (typeof this.props.onMonthChange === 'function') {
            this.props.onMonthChange(parseInt(value, 10));
        }
    };

    handleYearChange = (e: React.SyntheticEvent<EventTarget>) => {
        const { value } = e.target as HTMLOptionElement;
        if (typeof this.props.onYearChange === 'function') {
            this.props.onYearChange(parseInt(value, 10));
        }
    };

    renderDropDowns = (firstDay: Date) => {
        const { minDate, maxDate, month } = this.props;

        return [
            <Select key="months" value={firstDay.getMonth()} onChange={this.handleMonthChange}>
                {this.locale.monthNames.map((m, i) => {
                    const isDisabled =
                        (minDate && isBefore(setMonth(month, i), minDate)) ||
                        (maxDate && isAfter(setMonth(month, i), maxDate));

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
            showDropdowns
        } = this.props;

        const firstDay = startOfMonth(month);
        const firstDayInWeek: number = firstDay.getDay();
        const monthName = this.locale.monthNames[firstDay.getMonth()];
        const key = `${monthName}-${firstDay.getFullYear()}`;

        return (
            <Month>
                <Row>
                    <Cell>
                        {!hidePrevButton && (
                            <NavButton onClick={this.handlePrevClick}>&#8592;</NavButton>
                        )}
                    </Cell>
                    <Cell span={5} justifyContent={showDropdowns ? 'space-around' : 'center'}>
                        {showDropdowns
                            ? this.renderDropDowns(firstDay)
                            : `${monthName} ${firstDay.getFullYear()}`}
                    </Cell>
                    <Cell>
                        {!hideNextButton && (
                            <NavButton onClick={this.handleNextClick}>&#8594;</NavButton>
                        )}
                    </Cell>
                </Row>
                <Row>
                    {range(0, 7).map(i => (
                        <Cell key={`${key}-day-${i}`}>{this.locale.daysOfWeek[i]}</Cell>
                    ))}
                </Row>
                {range(0, 6).map(i => (
                    <Row key={`${key}-${i}`} justifyContent={i === 0 ? 'flex-end' : 'flex-start'}>
                        {range(0, 7).map(j => {
                            const day = addDays(firstDay, i * 7 + j - firstDayInWeek);

                            if (!isSameMonth(firstDay, day)) return null;

                            const inRange =
                                startDate &&
                                isAfter(day, startDate) &&
                                endDate &&
                                isBefore(day, endDate);

                            const selected =
                                (startDate && isSameDay(day, startDate)) ||
                                (endDate && isSameDay(day, endDate));
                            const isDisabled =
                                (minDate && isBefore(day, minDate)) ||
                                (maxDate && isAfter(day, maxDate));

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
            </Month>
        );
    }
}

/**
 * TODO:
 * - add & handle maxDropdownYear prop
 * - add & handle maxDropdownMonth prop
 */

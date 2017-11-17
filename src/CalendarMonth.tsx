import * as addDays from 'date-fns/addDays';
import * as isAfter from 'date-fns/isAfter';
import * as isBefore from 'date-fns/isBefore';
import * as isSameDay from 'date-fns/isSameDay';
import * as isSameMonth from 'date-fns/isSameMonth';
import { localize as en } from 'date-fns/locale/en-US';
import * as setMonth from 'date-fns/setMonth';
import * as startOfMonth from 'date-fns/startOfMonth';
import glamorous, { CSSProperties, ExtraGlamorousProps, GlamorousComponent } from 'glamorous';
import * as React from 'react';

import { NavButton } from './Common';
import { callIfExists, range } from './helpers';

const SIZE = 38;
const sizeInPixels = `${SIZE}px`;

// explicitly defined type for declarations to work
export const Month: GlamorousComponent<React.HTMLProps<HTMLDivElement>, {}> = glamorous('div')(
    'rdr-calendar-month',
    {
        display: 'inline-block',
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
    month: Date; // Current month.
    startDate?: Date; // Start of range.
    endDate?: Date; // End of range.
    minDate?: Date; // Min selectable Date.
    maxDate?: Date; // Max selectable Date.
    locale?: Locale['localize']; // Localization (localize object from date-fns).
    showDropdowns?: boolean; // Whether to show month and year dropdowns.
    onPrevClick?: () => void; // Callback for "prev" button click.
    onNextClick?: () => void; // Callback for "next" button click.
    onDayClick?: (date: Date) => void; // Callback for when "Day" is clicked on.
    onDayHover?: (date: Date) => void; // Callback for "Day" is hovered upon.
    onMonthChange?: (month: number) => void; // Callback for when "month" dropdown is changed
    onYearChange?: (year: number) => void; // Callback for when "year" dropdown is changed
    hideNextButton?: boolean; // Whether to hide "next" button
    hidePrevButton?: boolean; // Whether to hide "prev" button
    showWeekNumbers?: boolean; // TODO: implement this
    showISOWeekNumbers?: boolean; // TODO: implement this
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
        const { minDate, maxDate, month, locale } = this.props;

        const monthNames: string[] = (locale || en).months();

        return [
            <Select key="months" value={firstDay.getMonth()} onChange={this.handleMonthChange}>
                {monthNames.map((m, i) => {
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

        const locale = this.props.locale || en;
        const firstDay = startOfMonth(month);
        const firstDayInWeek: number = firstDay.getDay();
        const monthName = locale.months()[firstDay.getMonth()];
        const key = `${monthName}-${firstDay.getFullYear()}`;
        const daysOfWeek = locale.weekdays({ type: 'narrow' });

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
                    {range(0, 7).map(i => <Cell key={`${key}-day-${i}`}>{daysOfWeek[i]}</Cell>)}
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

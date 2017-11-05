import * as React from 'react';
import glamorous from 'glamorous';
import times from 'lodash.times';
import addDays from 'date-fns/addDays';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import startOfMonth from 'date-fns/startOfMonth';

export const MonthWrapper = glamorous('div')({
    display: 'inline-block',
    padding: '8px 16px',
    background: '#fff'
});

MonthWrapper.displayName = 'MonthWrapper';

export const MonthTable = glamorous('table')({
    tableLayout: 'fixed',
    borderCollapse: 'collapse'
});

MonthTable.displayName = 'MonthTable';

export const Week = glamorous('tr')({
    border: '1px solid #ddd'
});

Week.displayName = 'Week';

interface DayProps {
    inCurrentMonth?: boolean;
    selected?: boolean;
    inRange?: boolean;
}

export const Day = glamorous('td')<DayProps>(
    {
        width: '42px',
        height: '42px',
        lineHeight: '42px',
        fontSize: '16px',
        borderRight: '1px solid #ddd',
        cursor: 'pointer',
        textAlign: 'center',
        '&:last-child': {
            borderRight: 'none'
        }
    },
    props => ({
        color: props.inCurrentMonth ? (props.selected ? '#fff' : '#222') : '#ddd',
        background: (() => {
            if (props.selected && props.inCurrentMonth) {
                return 'rgb(0, 202, 255)';
            }
            if (props.inRange && props.inCurrentMonth) {
                return 'rgba(0, 202, 255, 0.3)';
            }
            return 'transparent';
        })(),
        '&:hover': {
            background: props.selected ? 'rgb(0, 202, 255)' : '#ddd',
            color: props.inCurrentMonth && !props.selected ? '#222' : '#fff'
        }
    })
);

Day.displayName = 'Day';

export const DayName = glamorous('th')({
    width: '42px',
    height: '42px',
    lineHeight: '42px',
    fontWeight: 'bold',
    fontSize: '16px'
});

DayName.displayName = 'DayName';

export const NavButton = glamorous('button')({
    background: 'transparent',
    border: 'none',
    width: '42px',
    height: '42px',
    lineHeight: '42px',
    fontWeight: 'bold',
    fontSize: '18px'
});

NavButton.displayName = 'NavButton';

export const MonthName = glamorous('th')({
    height: '42px',
    lineHeight: '42px',
    fontWeight: 'bold',
    fontSize: '18px',
    textAlign: 'center'
});

export interface MonthProps {
    month: Date;
    startDate?: Date;
    endDate?: Date;
    daysOfWeek?: Array<string>;
    monthNames?: Array<string>;
    onPrevClick?: () => void;
    onNextClick?: () => void;
    onDayClick?: (date: Date) => void;
    onDayHover?: (date: Date) => void;
    hideNextButton?: boolean;
    hidePrevButton?: boolean;
}

export default class Month extends React.Component<MonthProps> {
    static defaultProps = {
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

    constructor(props: MonthProps) {
        super(props);

        if (!Array.isArray(props.daysOfWeek) || props.daysOfWeek.length !== 7) {
            throw new Error(
                `props.daysofWeek must an array of length 7 but ${props.daysOfWeek} given`
            );
        }

        if (!Array.isArray(props.monthNames) || props.monthNames.length !== 12) {
            throw new Error(
                `props.monthNames must an array of length 7 but ${props.daysOfWeek} given`
            );
        }
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

    render() {
        const {
            month,
            daysOfWeek,
            monthNames,
            startDate,
            endDate,
            hideNextButton,
            hidePrevButton
        } = this.props;

        if (!daysOfWeek || !monthNames) return null;

        const firstDay: Date = startOfMonth(month);
        const firstDayInWeek: number = firstDay.getDay();
        const monthName = monthNames[firstDay.getMonth()];
        const key = `${monthName}-${firstDay.getFullYear()}`;

        return (
            <MonthWrapper>
                <MonthTable>
                    <thead>
                        <tr>
                            <th>
                                {!hidePrevButton && (
                                    <NavButton onClick={this.handlePrevClick}>&#8592;</NavButton>
                                )}
                            </th>
                            <MonthName colSpan={5}>
                                {`${monthName} ${firstDay.getFullYear()}`}
                            </MonthName>
                            <th>
                                {!hideNextButton && (
                                    <NavButton onClick={this.handleNextClick}>&#8594;</NavButton>
                                )}
                            </th>
                        </tr>
                        <tr>
                            {times(7, i => (
                                <DayName key={`${key}-day-${i}`}>{daysOfWeek[i]}</DayName>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {times(6, i => (
                            <Week key={`${key}-${i}`}>
                                {times(7, j => {
                                    const day = addDays(firstDay, i * 7 + j - firstDayInWeek);
                                    const selected =
                                        (startDate && isSameDay(day, startDate)) ||
                                        (endDate && isSameDay(day, endDate));
                                    const inRange =
                                        startDate &&
                                        isAfter(day, startDate) &&
                                        endDate &&
                                        isBefore(day, endDate);

                                    return (
                                        <Day
                                            key={`${key}-${i}-${j}`}
                                            inCurrentMonth={isSameMonth(firstDay, day)}
                                            selected={selected}
                                            inRange={inRange}
                                            onClick={this.handleDayClick(day)}
                                            onMouseEnter={this.handleDayHover(day)}>
                                            {day.getDate()}
                                        </Day>
                                    );
                                })}
                            </Week>
                        ))}
                    </tbody>
                </MonthTable>
            </MonthWrapper>
        );
    }
}

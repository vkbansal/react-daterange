import * as React from 'react';
import glamorous from 'glamorous';
import times from 'lodash/times';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import startOfMonth from 'date-fns/startOfMonth';
import isSameMonth from 'date-fns/isSameMonth';

const Wrapper = glamorous('div')({
    display: 'inline-block',
    padding: '8px 16px',
    background: '#fff'
});

const Table = glamorous('table')({
    tableLayout: 'fixed',
    borderCollapse: 'collapse'
});

const Week = glamorous('tr')({
    border: '1px solid #ddd'
});

Week.displayName = 'Week';

interface DayProps {
    inCurrentMonth?: boolean;
    selected?: boolean;
    inRange?: boolean;
}

const Day = glamorous('td')<DayProps>(
    {
        padding: '8px',
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
                return 'rgb(255, 0, 0)';
            }
            if (props.inRange && props.inCurrentMonth) {
                return 'rgba(255, 0, 0, 0.3)';
            }
            return 'transparent';
        })()
    })
);

Day.displayName = 'Day';

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
    selectionActive?: boolean;
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

    // shouldComponentUpdate(nextProps: MonthProps) {
    //     return (
    //         !isSameMonth(this.props.month, nextProps.month) ||
    //         !isSameDay(this.props.startDate, nextProps.startDate) ||
    //         !isSameDay(this.props.endDate, nextProps.endDate)
    //     );
    // }

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
            <Wrapper>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                {!hidePrevButton && (
                                    <button onClick={this.handlePrevClick}>&#8592;</button>
                                )}
                            </th>
                            <th colSpan={5}>{`${monthName} ${firstDay.getFullYear()}`}</th>
                            <th>
                                {!hideNextButton && (
                                    <button onClick={this.handleNextClick}>&#8594;</button>
                                )}
                            </th>
                        </tr>
                        <tr>{times(7, i => <th key={`${key}-day-${i}`}>{daysOfWeek[i]}</th>)}</tr>
                    </thead>
                    <tbody>
                        {times(6, i => (
                            <Week key={`${key}-${i}`}>
                                {times(7, j => {
                                    const day = addDays(firstDay, i * 7 + j - firstDayInWeek);
                                    const selected =
                                        isSameDay(day, startDate) || isSameDay(day, endDate);
                                    const inRange =
                                        isAfter(day, startDate) && isBefore(day, endDate);

                                    return (
                                        <Day
                                            key={`${key}-${i}-${j}`}
                                            inCurrentMonth={isSameMonth(firstDay, day)}
                                            selected={selected}
                                            inRange={inRange}
                                            onClick={this.handleDayClick(day)}
                                            onMouseEnter={this.handleDayHover(day)}
                                        >
                                            {day.getDate()}
                                        </Day>
                                    );
                                })}
                            </Week>
                        ))}
                    </tbody>
                </Table>
            </Wrapper>
        );
    }
}

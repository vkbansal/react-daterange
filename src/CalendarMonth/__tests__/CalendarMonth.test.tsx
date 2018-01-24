import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import { CalendarMonth, CalendarMonthProps } from '../CalendarMonth';
import { Row, Cell, Day } from '../Components';

const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

describe('<CalenderMonth /> tests', () => {
    const month = new Date(2017, 0 /* Jan */, 1, 0, 0, 0, 0);
    test('renders given month', () => {
        const component = shallow(<CalendarMonth month={month} />);
        expect(component).toMatchSnapshot();
    });

    test('renders ISO weeks in month', () => {
        const component = shallow(<CalendarMonth showISOWeek month={month} />);
        expect(component).toMatchSnapshot();
    });

    describe('Localization', () => {
        test('renders given `daysOfWeek`', () => {
            const component = shallow(<CalendarMonth month={month} daysOfWeek={shortDays} />);
            expect(
                component
                    .find(Row)
                    .at(1)
                    .children()
                    .map(c => c.shallow().text())
            ).toEqual(shortDays);
            expect(component).toMatchSnapshot();
        });

        test('renders given `monthNames`', () => {
            const component = shallow(<CalendarMonth month={month} monthNames={shortMonths} />);
            expect(
                component
                    .find(Row)
                    .at(0)
                    .find(Cell)
                    .at(1)
                    .shallow()
                    .text()
            ).toBe(`${shortMonths[month.getMonth()]} ${month.getFullYear()}`);
            expect(component).toMatchSnapshot();
        });
    });

    describe('Dates', () => {
        test.only('shows given `startDate` as selected', () => {
            const component = shallow<CalendarMonthProps>(
                <CalendarMonth
                    month={month}
                    startDate={new Date(2017, 0 /* Jan */, 5, 0, 0, 0, 0)}
                />
            );
            expect(component.find(Day).filter(c => c.prop('selected')).length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('shows range when `startDate` and `endDate` are given', () => {
            const component = shallow(
                <CalendarMonth
                    month={month}
                    startDate={new Date(2017, 0 /* Jan */, 5, 0, 0, 0, 0)}
                    endDate={new Date(2017, 0 /* Jan */, 11, 0, 0, 0, 0)}
                />
            );
            expect(component.find('.rdr-calendar-day--selected').length).toBe(2);
            expect(component.find('.rdr-calendar-day--in-range').length).toBe(5);
            expect(component).toMatchSnapshot();
        });

        test('dates before `minDate` are disabled ', () => {
            const component = shallow(
                <CalendarMonth month={month} minDate={new Date(2017, 0 /* Jan */, 5, 0, 0, 0, 0)} />
            );
            const disabled = component.find('.rdr-calendar-day--disabled');
            expect(disabled.length).toBe(4);
            expect(disabled.map(d => d.text())).toMatchObject(['1', '2', '3', '4']);
            expect(component).toMatchSnapshot();
        });

        test('dates after `maxDate` are disabled ', () => {
            const component = shallow(
                <CalendarMonth
                    month={month}
                    maxDate={new Date(2017, 0 /* Jan */, 20, 0, 0, 0, 0)}
                />
            );
            const disabled = component.find('.rdr-calendar-day--disabled');
            expect(disabled.length).toBe(11);
            expect(disabled.map(d => d.text())).toMatchObject([
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31'
            ]);
            expect(component).toMatchSnapshot();
        });

        test('mouseover on a day triggers callback', () => {
            const onDayHover = jest.fn();
            const component = shallow(<CalendarMonth month={month} onDayHover={onDayHover} />);
            component
                .find('.rdr-calendar-day')
                .at(0)
                .simulate('mouseenter', { preventDefault: jest.fn() });
            expect(onDayHover).toHaveBeenCalledTimes(1);

            component
                .find('.rdr-calendar-day')
                .at(10)
                .simulate('mouseenter', { preventDefault: jest.fn() });
            expect(onDayHover).toHaveBeenCalledTimes(2);

            component
                .find('.rdr-calendar-day')
                .at(23)
                .simulate('mouseenter', { preventDefault: jest.fn() });
            expect(onDayHover).toHaveBeenCalledTimes(3);
        });

        test('click on a day triggers callback', () => {
            const onDayClick = jest.fn();
            const component = shallow(<CalendarMonth month={month} onDayClick={onDayClick} />);

            component
                .find('.rdr-calendar-day')
                .at(0)
                .simulate('click', { preventDefault: jest.fn() });
            expect(onDayClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('Navigation', () => {
        test('`hidePrevButton` hides prev button', () => {
            const component = shallow(<CalendarMonth month={month} hidePrevButton />);
            expect(component.find('.rdr-nav-button').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('`hideNextButton` hides next button', () => {
            const component = shallow(<CalendarMonth month={month} hideNextButton />);
            expect(component.find('.rdr-nav-button').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('click on nav buttons call given functions', () => {
            const onNextClick = jest.fn();
            const onPrevClick = jest.fn();
            const component = shallow(
                <CalendarMonth month={month} onNextClick={onNextClick} onPrevClick={onPrevClick} />
            );
            expect(component.find('.rdr-nav-button').length).toBe(2);
            component
                .find('.rdr-nav-button')
                .at(0)
                .simulate('click', { preventDefault: jest.fn() });
            expect(onPrevClick).toHaveBeenCalledTimes(1);
            component
                .find('.rdr-nav-button')
                .at(1)
                .simulate('click', { preventDefault: jest.fn() });
            expect(onNextClick).toHaveBeenCalledTimes(1);
        });

        test('shows dropdowns for navigation', () => {
            const component = shallow(<CalendarMonth month={month} showDropdowns />);
            expect(component.find('.rdr-calendar-select').length).toBe(2);
            expect(component).toMatchSnapshot();
        });

        test('on dropdowns change, respective callbacks are called', () => {
            const onMonthChange = jest.fn();
            const onYearChange = jest.fn();
            const component = shallow(
                <CalendarMonth
                    month={month}
                    showDropdowns
                    onMonthChange={onMonthChange}
                    onYearChange={onYearChange}
                />
            );

            component
                .find('.rdr-calendar-select')
                .at(0)
                .simulate('change', { target: { value: '9' } });
            expect(onMonthChange).toHaveBeenCalled();

            component
                .find('.rdr-calendar-select')
                .at(1)
                .simulate('change', { target: { value: '2015' } });
            expect(onYearChange).toHaveBeenCalled();
        });
    });
});

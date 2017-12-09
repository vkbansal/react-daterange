import { shallow } from 'enzyme';
import * as React from 'react';

import { CalendarMonth, Cell, Day, Select } from '../CalendarMonth';
import { NavButton } from '../Common';

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

describe('<Month/>', () => {
    const month = new Date(2017, 0 /* Jan */, 1, 0, 0, 0, 0);
    test('renders given month', () => {
        const component = shallow(<CalendarMonth month={month} />);
        expect(component).toMatchSnapshot();
    });

    describe('Localization', () => {
        test('accepts only Array of length 7 for `daysOfWeek`', () => {
            expect(() =>
                shallow(<CalendarMonth month={month} locale={{ daysOfWeek: [] }} />)
            ).toThrow();
            expect(() =>
                shallow(<CalendarMonth month={month} locale={{ daysOfWeek: shortDays }} />)
            ).not.toThrow();
        });

        test('accepts only Array of length 7 for `monthName`', () => {
            expect(() =>
                shallow(<CalendarMonth month={month} locale={{ monthNames: [] }} />)
            ).toThrow();
            expect(() =>
                shallow(<CalendarMonth month={month} locale={{ monthNames: shortMonths }} />)
            ).not.toThrow();
        });

        test('renders given `daysOfWeek`', () => {
            const component = shallow(
                <CalendarMonth month={month} locale={{ daysOfWeek: shortDays }} />
            );
            expect(
                component
                    .find(Cell)
                    .slice(3)
                    .map(c => c.shallow().text())
            ).toEqual(shortDays);
            expect(component).toMatchSnapshot();
        });

        test('renders given `monthNames`', () => {
            const component = shallow(
                <CalendarMonth month={month} locale={{ monthNames: shortMonths }} />
            );
            expect(
                component
                    .find(Cell)
                    .at(1)
                    .shallow()
                    .text()
            ).toBe(`${shortMonths[month.getMonth()]} ${month.getFullYear()}`);
            expect(component).toMatchSnapshot();
        });
    });

    describe('Dates', () => {
        test('shows given `startDate` as selected', () => {
            const component = shallow(
                <CalendarMonth
                    month={month}
                    startDate={new Date(2017, 0 /* Jan */, 5, 0, 0, 0, 0)}
                />
            );
            expect(
                component
                    .find(Day)
                    .map(d => d.prop('selected'))
                    .filter(d => d).length
            ).toBe(1);
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
            expect(
                component
                    .find(Day)
                    .map(d => d.prop('selected'))
                    .filter(d => d).length
            ).toBe(2);
            expect(
                component
                    .find(Day)
                    .map(d => d.prop('inRange'))
                    .filter(d => d).length
            ).toBe(5);
            expect(component).toMatchSnapshot();
        });

        test('mouseover on `Day` triggers callback', () => {
            const onDayHover = jest.fn();
            const component = shallow(<CalendarMonth month={month} onDayHover={onDayHover} />);
            component
                .find(Day)
                .at(0)
                .simulate('mouseenter', { preventDefault: jest.fn() });
            expect(onDayHover).toHaveBeenCalledTimes(1);

            component
                .find(Day)
                .at(10)
                .simulate('mouseenter', { preventDefault: jest.fn() });
            expect(onDayHover).toHaveBeenCalledTimes(2);

            component
                .find(Day)
                .at(23)
                .simulate('mouseenter', { preventDefault: jest.fn() });
            expect(onDayHover).toHaveBeenCalledTimes(3);
        });

        test('click on `Day` triggers callback', () => {
            const onDayClick = jest.fn();
            const component = shallow(<CalendarMonth month={month} onDayClick={onDayClick} />);

            component
                .find(Day)
                .at(0)
                .simulate('click', { preventDefault: jest.fn() });
            expect(onDayClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('Navigation', () => {
        test('`hidePrevButton` hides prev button', () => {
            const component = shallow(<CalendarMonth month={month} hidePrevButton />);
            expect(component.find(NavButton).length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('`hideNextButton` hides next button', () => {
            const component = shallow(<CalendarMonth month={month} hideNextButton />);
            expect(component.find(NavButton).length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('click on nav buttons call given functions', () => {
            const onNextClick = jest.fn();
            const onPrevClick = jest.fn();
            const component = shallow(
                <CalendarMonth month={month} onNextClick={onNextClick} onPrevClick={onPrevClick} />
            );
            expect(component.find(NavButton).length).toBe(2);
            component
                .find(NavButton)
                .at(0)
                .simulate('click', { preventDefault: jest.fn() });
            expect(onPrevClick).toHaveBeenCalledTimes(1);
            component
                .find(NavButton)
                .at(1)
                .simulate('click', { preventDefault: jest.fn() });
            expect(onNextClick).toHaveBeenCalledTimes(1);
        });

        test('shows dropdowns for navigation', () => {
            const component = shallow(<CalendarMonth month={month} showDropdowns />);
            expect(component.find(Select).length).toBe(2);
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
                .find(Select)
                .at(0)
                .simulate('change', { target: { value: '9' } });
            expect(onMonthChange).toHaveBeenCalled();

            component
                .find(Select)
                .at(1)
                .simulate('change', { target: { value: '2015' } });
            expect(onYearChange).toHaveBeenCalled();
        });
    });
});

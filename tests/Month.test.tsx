import * as React from 'react';
import { shallow } from 'enzyme';

import Month, { DayName, MonthName, Day, NavButton } from '../src/Month';

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
    test('accepts only Array of length 7 for `daysOfWeek`', () => {
        expect(() => shallow(<Month month={month} daysOfWeek={[]} />)).toThrow();
        expect(() => shallow(<Month month={month} daysOfWeek={shortDays} />)).not.toThrow();
    });

    test('accepts only Array of length 7 for `monthName`', () => {
        expect(() => shallow(<Month month={month} monthNames={[]} />)).toThrow();
        expect(() => shallow(<Month month={month} monthNames={shortMonths} />)).not.toThrow();
    });

    test('renders given month', () => {
        const component = shallow(<Month month={month} />);
        expect(component).toMatchSnapshot();
    });

    test('renders given `daysOfWeek`', () => {
        const component = shallow(<Month month={month} daysOfWeek={shortDays} />);
        expect(component.find(DayName).map(c => c.shallow().text())).toEqual(shortDays);
        expect(component).toMatchSnapshot();
    });

    test('renders given `monthNames`', () => {
        const component = shallow(<Month month={month} monthNames={shortMonths} />);
        expect(
            component
                .find(MonthName)
                .at(0)
                .shallow()
                .text()
        ).toBe(`${shortMonths[month.getMonth()]} ${month.getFullYear()}`);
        expect(component).toMatchSnapshot();
    });

    test('shows given `startDate` as selected', () => {
        const component = shallow(
            <Month month={month} startDate={new Date(2017, 0 /* Jan */, 5, 0, 0, 0, 0)} />
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
            <Month
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

    test('`hidePrevButton` hides prev button', () => {
        const component = shallow(<Month month={month} hidePrevButton />);
        expect(component.find(NavButton).length).toBe(1);
        expect(component).toMatchSnapshot();
    });

    test('`hideNextButton` hides next button', () => {
        const component = shallow(<Month month={month} hideNextButton />);
        expect(component.find(NavButton).length).toBe(1);
        expect(component).toMatchSnapshot();
    });

    test('click on nav buttons call given functions', () => {
        const onNextClick = jest.fn();
        const onPrevClick = jest.fn();
        const component = shallow(<Month month={month} onNextClick={onNextClick} onPrevClick={onPrevClick} />);
        expect(component.find(NavButton).length).toBe(2);
        component.find(NavButton).at(0).simulate('click', { preventDefault: jest.fn() });
        expect(onPrevClick).toHaveBeenCalledTimes(1);
        component.find(NavButton).at(1).simulate('click', { preventDefault: jest.fn() });
        expect(onNextClick).toHaveBeenCalledTimes(1);
    });

    test('mouseover on `Day` triggers callback', () => {
        const onDayHover= jest.fn();
        const component = shallow(<Month month={month} onDayHover={onDayHover} />);
        component.find(Day).at(0).simulate('mouseenter', { preventDefault: jest.fn() });
        expect(onDayHover).toHaveBeenCalledTimes(1);

        component.find(Day).at(10).simulate('mouseenter', { preventDefault: jest.fn() });
        expect(onDayHover).toHaveBeenCalledTimes(2);

        component.find(Day).at(23).simulate('mouseenter', { preventDefault: jest.fn() });
        expect(onDayHover).toHaveBeenCalledTimes(3);
    });
});

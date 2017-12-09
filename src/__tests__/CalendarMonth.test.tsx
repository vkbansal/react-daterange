import { shallow } from 'enzyme';
import * as React from 'react';

import { CalendarMonth } from '../CalendarMonth';

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

    describe('Localization', () => {
        test('renders given `daysOfWeek`', () => {
            const component = shallow(<CalendarMonth month={month} daysOfWeek={shortDays} />);
            expect(
                component
                    .find('.rdr-calendar-row')
                    .at(1)
                    .children()
                    .map(c => c.text())
            ).toEqual(shortDays);
            expect(component).toMatchSnapshot();
        });

        test('renders given `monthNames`', () => {
            const component = shallow(<CalendarMonth month={month} monthNames={shortMonths} />);
            expect(component.find('.rdr-month-name').text()).toBe(
                `${shortMonths[month.getMonth()]} ${month.getFullYear()}`
            );
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
            expect(component.find('.rdr-calendar-day--selected').length).toBe(1);
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
